"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import type { Testimonial } from "@/lib/content";

/* "Clients Success" — a horizontal testimonial carousel with a numbered
   counter (01/04) and prev/next arrows, cards divided by vertical rules. */
export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const total = testimonials.length;

  // Multiple cards are visible at once, so the scroll range is short; map the
  // counter to scroll *progress* across the items (0 → first, 1 → last) so it
  // runs the full 01…0N, and step the arrows evenly across that range.
  const go = (dir: number) => {
    const track = trackRef.current;
    if (!track || total < 2) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (maxScroll <= 0) return;
    const target = Math.min(Math.max(active + dir, 0), total - 1);
    track.scrollTo({ left: (target / (total - 1)) * maxScroll, behavior: "smooth" });
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const maxScroll = track.scrollWidth - track.clientWidth;
        const prog = maxScroll > 0 ? track.scrollLeft / maxScroll : 0;
        setActive(Math.round(prog * (total - 1)));
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener("scroll", onScroll);
    };
  }, [total]);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="testi" id="clients">
      <div className="container">
        <div className="testi__head">
          <h2 className="testi__title" data-reveal="words">
            <span className="testi__title-1">Clients</span>
            <span className="testi__title-2">Success</span>
          </h2>

          <div className="testi__nav" data-reveal>
            <div className="testi__counter" aria-live="polite">
              <span className="testi__counter-cur">{pad(active + 1)}</span>
              <span className="testi__counter-total">/{pad(total)}</span>
            </div>
            <div className="testi__arrows">
              <button
                className="testi__arrow"
                aria-label="Previous testimonial"
                onClick={() => go(-1)}
                disabled={active === 0}
              >
                <Icon name="arrow-left" size={18} />
              </button>
              <button
                className="testi__arrow"
                aria-label="Next testimonial"
                onClick={() => go(1)}
                disabled={active === total - 1}
              >
                <Icon name="arrow-right" size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container testi__track-wrap">
        <div className="testi__track" ref={trackRef}>
          {testimonials.map((t) => (
            <article className="testi__card" key={t.author}>
              <span className="testi__company">{t.company}</span>
              <p className="testi__quote">
                <span className="testi__mark" aria-hidden="true">
                  &ldquo;
                </span>
                {t.quote}
              </p>
              <div className="testi__author">
                <span className="testi__author-name">{t.author}</span>
                <span className="testi__author-role">{t.role}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
