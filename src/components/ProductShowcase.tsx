"use client";

import { useEffect, useRef } from "react";
import { Icon } from "./Icon";
import type { Product } from "@/lib/content";
import { useDemoModal } from "@/context/DemoModalContext";

/* Products: the image column is pinned on the left and drifts slowly while the
   text scrolls up on the right (bottom-anchored). All product images are
   stacked in the pinned frame; as one product's text scrolls past, its image
   fades out and the next fades in — synced to the next text arriving. Images
   are placeholders until a product's `image`/video is supplied. */

const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);

/* Frame contents: the real visual when present, otherwise the placeholder. */
function Frame({ product }: { product: Product }) {
  return product.image ? (
    <div className="product-frame__visual">
      <img
        src={product.image}
        alt={product.name}
        className="product-frame__img"
      />
    </div>
  ) : (
    <div className="ph" data-badge={product.badge}>
      <div className="ph__title">{product.name}</div>
      <div className="ph__sub">{product.description}</div>
    </div>
  );
}

export function ProductShowcase({ products }: { products: Product[] }) {
  const { openModal } = useDemoModal();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const mobile = window.matchMedia("(max-width: 860px)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (mobile || reduce) return; // stacked layout; media column hidden

    const flow = root.querySelector<HTMLElement>(".products__flow");
    const imgs = Array.from(root.querySelectorAll<HTMLElement>(".pimg"));
    if (!flow || imgs.length === 0) return;
    const N = imgs.length;

    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const vh = window.innerHeight;
        // continuous product index: 0 at section top, +1 per viewport scrolled
        const cidx = clamp(-flow.getBoundingClientRect().top / vh, 0, N - 1);
        for (let i = 0; i < N; i++) {
          const d = cidx - i;
          imgs[i].style.opacity = String(clamp(1 - Math.abs(d), 0, 1));
          imgs[i].style.transform = `translateY(${d * -34}px)`; // slow drift
        }
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section className="products" id="products" ref={rootRef}>
      {/* Left: pinned, drifting, crossfading image stack */}
      <div className="products__media">
        <div className="products__media-inner">
          {products.map((p, i) => (
            <div className="pimg" key={p.name} data-i={i}>
              <Frame product={p} />
            </div>
          ))}
        </div>
      </div>

      {/* Right: scrolling, bottom-anchored text blocks */}
      <div className="products__flow">
        {products.map((p, i) => (
          <div className="ptext" key={p.name}>
            {/* placeholder shown only on mobile, where the media column is hidden */}
            <div className="ptext__ph">
              <Frame product={p} />
            </div>
            <div className="ptext__body">
              <span className="eyebrow product-panel__num">
                Product {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="product-panel__title">{p.name}</h2>
              <p className="product-panel__desc">{p.description}</p>
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => openModal(`${p.name} Demo`)}
              >
                {p.ctaLabel} <Icon name="arrow-right" size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
