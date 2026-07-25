"use client";

import { useEffect, useRef } from "react";
import { Words } from "./Words";
import type { Global } from "@/lib/content";
import { useDemoModal } from "@/context/DemoModalContext";

/* Hero with a scroll-driven 3D crossfade. A tall wrapper pins the stage; a
   constant blue background sits under everything (so the video dissolves into
   blue, never white). As the page scrolls, the video and hero text recede at
   different depths (parallax = pseudo-3D). The blue statement then reveals
   word-by-word as you keep scrolling — a MagicText-style fill (faint underlay,
   each word fading to solid), driven by the same pin progress rather than a
   separate scroll listener so it works inside the pin. */

const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);
const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

export function HeroReveal({ global }: { global: Global }) {
  const { openModal } = useDemoModal();
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const stmtRef = useRef<HTMLDivElement>(null);

  const aboutPre = global.aboutPre || "Whether you need";
  const aboutHighlight = global.aboutHighlight || "a complete ERP platform";
  const aboutPost =
    global.aboutPost ||
    "or a single connected workflow, Accorelab has the expertise to deliver exceptional results.";

  // Flatten the statement into words, flagging the highlighted phrase.
  const words: { w: string; hi: boolean }[] = [
    ...aboutPre.split(" ").map((w) => ({ w, hi: false })),
    ...aboutHighlight.split(" ").map((w) => ({ w, hi: true })),
    ...aboutPost.split(" ").map((w) => ({ w, hi: false })),
  ];

  useEffect(() => {
    const wrap = wrapRef.current;
    const video = videoRef.current;
    const heroText = heroTextRef.current;
    const stmt = stmtRef.current;
    if (!wrap || !video || !heroText || !stmt) return;

    const fills = Array.from(
      stmt.querySelectorAll<HTMLElement>(".mword__fill")
    );
    const N = fills.length;
    const fillMax = (el: HTMLElement) => (el.dataset.hi === "1" ? 1 : 0.85);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      wrap.classList.add("heroreveal--static");
      stmt.style.opacity = "1";
      fills.forEach((el) => (el.style.opacity = String(fillMax(el))));
      return;
    }

    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const track = wrap.offsetHeight - window.innerHeight;
        if (track <= 1) return;
        const p = clamp(-wrap.getBoundingClientRect().top / track, 0, 1);

        // Video: gently zooms and drifts up, fading into the constant blue.
        video.style.opacity = String(1 - smoothstep(0.05, 0.6, p));
        video.style.transform = `scale(${1 + p * 0.16}) translateY(${-p * 26}px)`;

        // Hero text: flies up and tips back in 3D, leaving first.
        heroText.style.opacity = String(1 - smoothstep(0, 0.4, p));
        heroText.style.transform =
          `translateY(${-p * 96}px) translateZ(${-p * 240}px) rotateX(${p * 11}deg)`;
        heroText.style.pointerEvents = p > 0.25 ? "none" : "auto";

        // Statement container: settles into place, then holds while words fill.
        stmt.style.opacity = String(smoothstep(0.4, 0.5, p));
        stmt.style.transform = `translateY(${(1 - smoothstep(0.4, 0.52, p)) * 56}px)`;
        stmt.style.pointerEvents = p > 0.5 ? "auto" : "none";

        // Per-word fill across the tail of the scroll (MagicText-style).
        const sp = clamp((p - 0.5) / (0.98 - 0.5), 0, 1);
        for (let i = 0; i < N; i++) {
          const start = i / N;
          const end = (i + 1) / N;
          const o = clamp((sp - start) / (end - start), 0, 1);
          fills[i].style.opacity = String(o * fillMax(fills[i]));
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
    <div className="heroreveal" ref={wrapRef}>
      <div className="heroreveal__stage">
        {/* Constant blue base */}
        <div className="heroreveal__bg" aria-hidden="true" />

        {/* Hero screen: video + hero text, each parallaxing independently */}
        <div className="heroreveal__hero" id="top">
          <div className="heroreveal__video" ref={videoRef}>
            <video className="hero__video" autoPlay muted loop playsInline aria-hidden="true">
              <source src="/video/heroanimation.mp4" type="video/mp4" />
            </video>
            <div className="hero__scrim" aria-hidden="true" />
          </div>

          <div className="container hero__content heroreveal__herotext" ref={heroTextRef}>
            <h1 className="hero__title" data-reveal="words">
              <Words text={global.heroTitle} />
              <br />
              <Words
                text={global.heroHighlight}
                start={global.heroTitle.split(" ").length}
              />
            </h1>
            <div className="hero__foot">
              <div className="hero__foot-left">
                <a
                  className="hero__phone"
                  href={`tel:${global.phone.replace(/\s/g, "")}`}
                  data-reveal
                  style={{ "--d": 6 } as React.CSSProperties}
                >
                  {global.phone}
                </a>
                <div
                  className="hero__divider"
                  aria-hidden="true"
                  data-reveal
                  style={{ "--d": 7 } as React.CSSProperties}
                />
                <address
                  className="hero__address"
                  data-reveal
                  style={{ "--d": 8 } as React.CSSProperties}
                >
                  {global.siteName}
                  <br />
                  {global.address}
                </address>
              </div>

              <div
                className="hero__cta"
                data-reveal
                style={{ "--d": 9 } as React.CSSProperties}
              >
                <button
                  type="button"
                  className="btn btn--pill-light"
                  onClick={() => openModal("Let's Talk")}
                >
                  Let&apos;s Talk
                </button>
                <a className="btn btn--onblue-outline" href="#case-studies">
                  View Case Studies
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Statement screen: words fill in one by one over the constant blue */}
        <div className="heroreveal__statement" ref={stmtRef} id="about">
          <div className="container">
            <p className="heroreveal__text magictext">
              {words.map((it, i) => (
                <span className="mword" key={i}>
                  <span className="mword__base">{it.w}</span>
                  <span className="mword__fill" data-hi={it.hi ? 1 : 0}>
                    {it.w}
                  </span>
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
