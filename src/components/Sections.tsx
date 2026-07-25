"use client";

import { Icon } from "./Icon";
import { Words } from "./Words";
import type { Global, Stat } from "@/lib/content";
import { useDemoModal } from "@/context/DemoModalContext";

/* ---------- Full-blue numbers band ---------- */
export function NumbersBand({ stats }: { stats: Stat[] }) {
  const outcomes = stats.filter((s) => s.group === "outcomes").slice(0, 3);
  return (
    <section className="numbers">
      <div className="container numbers__grid">
        <h2 className="numbers__title" data-reveal="words">
          <Words text="The numbers clients measure" />
        </h2>
        <div>
          <p className="numbers__intro" data-reveal style={{ "--d": 1 } as React.CSSProperties}>
            Teams that replace spreadsheets and disconnected tools with an Accorelab system move
            faster and spend less. Here&apos;s what they report in the first year.
          </p>
          <div className="numbers__cards">
            {outcomes.map((s, i) => (
              <div
                key={s.label}
                className="numbers__card"
                data-reveal
                style={{ "--d": i + 1 } as React.CSSProperties}
              >
                <div className="numbers__value">{s.value}</div>
                <p>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA ---------- */
export function Cta({ global }: { global: Global }) {
  const { openModal } = useDemoModal();
  return (
    <section className="cta" id="contact">
      <div className="container cta__inner">
        <h2 className="cta__title" data-reveal="words">
          <Words text={global.ctaTitle} />
        </h2>
        <p className="cta__body" data-reveal style={{ "--d": 1 } as React.CSSProperties}>
          {global.ctaBody}
        </p>
        <div className="cta__actions" data-reveal style={{ "--d": 2 } as React.CSSProperties}>
          <button
            type="button"
            className="btn btn--lg btn--onblue"
            onClick={() => openModal("Email Us")}
          >
            Email us <Icon name="arrow-right" size={18} />
          </button>
          <a className="btn btn--lg btn--onblue-outline" href={`tel:${global.phone.replace(/\s/g, "")}`}>
            {global.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
