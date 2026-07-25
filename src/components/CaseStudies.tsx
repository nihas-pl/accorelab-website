"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import type { CaseStudy } from "@/lib/content";
import { useDemoModal } from "@/context/DemoModalContext";

/* Case studies: a carousel of split cards (blue text panel + image), one per
   view, with prev/next arrows and a "View more" button. */
export function CaseStudies({ caseStudies }: { caseStudies: CaseStudy[] }) {
  const { openModal } = useDemoModal();
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const total = caseStudies.length;

  const go = (dir: number) => {
    const track = trackRef.current;
    if (!track) return;
    const target = Math.min(Math.max(active + dir, 0), total - 1);
    track.scrollTo({ left: target * track.clientWidth, behavior: "smooth" });
    setActive(target);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const w = track.clientWidth || 1;
        setActive(Math.min(Math.max(Math.round(track.scrollLeft / w), 0), total - 1));
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener("scroll", onScroll);
    };
  }, [total]);

  return (
    <section className="cases" id="case-studies">
      <div className="container">
        <div className="cases__head">
          <div>
            <span className="eyebrow" data-reveal>Case studies</span>
            <h2 className="cases__title" data-reveal="words">
              Results our clients can measure
            </h2>
          </div>
          <div className="cases__arrows" data-reveal>
            <button
              className="cases__arrow"
              aria-label="Previous case study"
              onClick={() => go(-1)}
              disabled={active === 0}
            >
              <Icon name="arrow-left" size={18} />
            </button>
            <button
              className="cases__arrow"
              aria-label="Next case study"
              onClick={() => go(1)}
              disabled={active === total - 1}
            >
              <Icon name="arrow-right" size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="container cases__track-wrap">
        <div className="cases__track" ref={trackRef}>
          {caseStudies.map((c) => (
            <article className="case-card" key={c.title}>
              <div className="case-card__panel">
                <div className="case-card__logo">
                  <span className="case-card__logo-mark" aria-hidden="true">
                    <Icon name="layers" size={16} />
                  </span>
                  {c.company}
                </div>
                <h3 className="case-card__title">{c.title}</h3>
                <p className="case-card__sub">{c.subtitle}</p>
                {c.href && /^https?:\/\//.test(c.href) ? (
                  <a
                    className="btn btn--green"
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {c.ctaLabel}
                  </a>
                ) : (
                  <button
                    type="button"
                    className="btn btn--green"
                    onClick={() => openModal(`${c.company} Case Study`)}
                  >
                    {c.ctaLabel}
                  </button>
                )}
              </div>
              <div className="case-card__media">
                {c.image ? (
                  <img src={c.image} alt={c.title} />
                ) : (
                  <span className="case-card__ph" aria-hidden="true">
                    <Icon name="image" size={30} />
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="cases__more">
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => openModal("Explore Solutions")}
          >
            View more <Icon name="arrow-right" size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
