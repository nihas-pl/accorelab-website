"use me";
"use client";

import { useState } from "react";
import Link from "next/link";
import { Product } from "@/lib/content";
import { Icon } from "@/components/Icon";
import { useDemoModal } from "@/context/DemoModalContext";

interface AppleProductShowcaseProps {
  product: Product;
  allProducts: Product[];
}

export function AppleProductShowcase({ product, allProducts }: AppleProductShowcaseProps) {
  const { openModal } = useDemoModal();
  // Interactive model tab state
  const models = [`${product.name} Standard`, `${product.name} Enterprise`, `${product.name} Cloud Pro`];
  const [activeModel, setActiveModel] = useState(models[0]);

  // Color / Variant swatches
  const swatches = [
    { name: "Midnight Navy", color: "#09122c" },
    { name: "Electric Blue", color: "#2563eb" },
    { name: "Starlight White", color: "#f8fafc" },
    { name: "Space Gray", color: "#334155" },
  ];
  const [activeSwatch, setActiveSwatch] = useState(swatches[0]);

  return (
    <div className="apple-product-container">
      {/* ------------------------------------------------------------
         1. APPLE SPEC HIGHLIGHTS GRID ("Compare MacBook Air with M3")
         ------------------------------------------------------------ */}
      <section className="apple-spec-section">
        <div className="container">
          <div className="apple-spec-header" data-reveal>
            <h2 className="apple-spec-title">
              Compare {product.name} with your current workflow.
            </h2>

            {/* Model Selector Dropdown Pill */}
            <div className="apple-model-selector">
              {models.map((model) => (
                <button
                  key={model}
                  type="button"
                  className={`apple-model-chip${activeModel === model ? " is-active" : ""}`}
                  onClick={() => setActiveModel(model)}
                >
                  <span>{model}</span>
                  <Icon name="check-circle" size={14} className="apple-model-chip__icon" />
                </button>
              ))}
            </div>

            <p className="apple-spec-subtitle">
              The new <strong>{activeModel}</strong> gives you:
            </p>
          </div>

          {/* 4-Card Apple Highlights Grid */}
          <div className="apple-spec-grid">
            {/* Card 1: Main Performance Stat */}
            <div className="apple-spec-card" data-reveal style={{ "--d": 1 } as React.CSSProperties}>
              <div className="apple-spec-card__val">
                <span className="apple-spec-card__sub">Up to</span>
                <span className="apple-spec-card__num">
                  {product.stats?.[0]?.value || "13x"}
                </span>
              </div>
              <p className="apple-spec-card__label">
                {product.stats?.[0]?.label || "Faster operational performance"}
              </p>
            </div>

            {/* Card 2: Efficiency & Compliance Stat */}
            <div className="apple-spec-card" data-reveal style={{ "--d": 2 } as React.CSSProperties}>
              <div className="apple-spec-card__icon-wrap">
                <Icon name="shield-check" size={28} />
              </div>
              <div className="apple-spec-card__val-sm">
                {product.stats?.[1]?.value || "100%"}
              </div>
              <p className="apple-spec-card__label">
                {product.stats?.[1]?.label || "Automated compliance & security"}
              </p>
            </div>

            {/* Card 3: Display / Modern Workspace */}
            <div className="apple-spec-card" data-reveal style={{ "--d": 3 } as React.CSSProperties}>
              <div className="apple-spec-card__corner-icon">
                <Icon name="maximize-2" size={20} />
              </div>
              <div className="apple-spec-card__val-sm">Unified Cloud</div>
              <p className="apple-spec-card__label">
                A brighter, real-time responsive dashboard across desktop and mobile
              </p>
            </div>

            {/* Card 4: Camera / Audit Vault */}
            <div className="apple-spec-card" data-reveal style={{ "--d": 4 } as React.CSSProperties}>
              <div className="apple-spec-card__icon-wrap">
                <Icon name="sparkles" size={28} />
              </div>
              <div className="apple-spec-card__val-sm">Zero Paperwork</div>
              <p className="apple-spec-card__label">
                Audit-ready vault with twice the automated tracking precision
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------
         2. INTERACTIVE WORKSPACE SHOWCASE ("Use AR to see MacBook Air")
         ------------------------------------------------------------ */}
      <section className="apple-ar-section">
        <div className="container">
          <div className="apple-ar-card" data-reveal>
            <div className="apple-ar-card__content">
              <div className="apple-ar-card__icon-chip">
                <Icon name="layers" size={22} />
              </div>
              <h2 className="apple-ar-card__title">
                Experience {product.name} live in your workspace.
              </h2>
              <p className="apple-ar-card__desc">
                Seamlessly control {product.description.toLowerCase()} right from any desktop, tablet, or smartphone browser.
              </p>

              {/* Swatches / Palette selector */}
              <div className="apple-swatch-picker">
                <span className="apple-swatch-label">Selected Theme: <strong>{activeSwatch.name}</strong></span>
                <div className="apple-swatch-list">
                  {swatches.map((swatch) => (
                    <button
                      key={swatch.name}
                      type="button"
                      className={`apple-swatch-btn${activeSwatch.name === swatch.name ? " is-active" : ""}`}
                      style={{ backgroundColor: swatch.color }}
                      onClick={() => setActiveSwatch(swatch)}
                      title={swatch.name}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column Device Frame Preview */}
            <div className="apple-ar-card__media">
              <div className="apple-device-frame">
                <div className="apple-device-frame__notch" />
                <img
                  src={product.image || "/images/hr.png"}
                  alt={product.name}
                  className="apple-device-frame__img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------
         3. DUAL APPLE CARDS ("Apple Trade In" & "Apple Card")
         ------------------------------------------------------------ */}
      <section className="apple-dual-section">
        <div className="container">
          <div className="apple-dual-grid">
            {/* Card 1: Migration Credit Card */}
            <div className="apple-promo-card" data-reveal style={{ "--d": 1 } as React.CSSProperties}>
              <div className="apple-promo-card__header">
                <span className="apple-promo-card__eyebrow">Accore Migration</span>
                <h3 className="apple-promo-card__title">
                  Get credit toward migrating to {product.name}.
                </h3>
                <p className="apple-promo-card__desc">
                  Import your legacy databases, spreadsheets, and historical records with zero downtime and free white-glove setup.
                </p>
                <button
                  type="button"
                  className="apple-promo-card__link"
                  style={{ background: "none", border: "none", font: "inherit", cursor: "pointer", padding: 0 }}
                  onClick={() => openModal(`Migration to ${product.name}`)}
                >
                  <span>Schedule migration demo</span>
                  <Icon name="chevron-right" size={14} />
                </button>
              </div>
              <div className="apple-promo-card__visual">
                <img
                  src={product.image || "/images/hr.png"}
                  alt="Migration preview"
                  className="apple-promo-card__img"
                />
              </div>
            </div>

            {/* Card 2: Enterprise Security & Cloud */}
            <div className="apple-promo-card" data-reveal style={{ "--d": 2 } as React.CSSProperties}>
              <div className="apple-promo-card__header">
                <span className="apple-promo-card__eyebrow">Accore Cloud</span>
                <h3 className="apple-promo-card__title">
                  Bank-grade security with 99.99% uptime.
                </h3>
                <p className="apple-promo-card__desc">
                  Scale your operations with automated daily backups, multi-tenant encryption, and audit-ready compliance reporting.
                </p>
                <a href="/#contact" className="apple-promo-card__link">
                  <span>Explore cloud infrastructure</span>
                  <Icon name="chevron-right" size={14} />
                </a>
              </div>
              <div className="apple-promo-card__visual">
                <img
                  src={product.image || "/images/accounts.png"}
                  alt="Cloud security preview"
                  className="apple-promo-card__img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------
         4. LINEUP COMPARISON SECTION ("Which product is right for you?")
         ------------------------------------------------------------ */}
      <section className="apple-lineup-section">
        <div className="container">
          <div className="apple-lineup-header" data-reveal>
            <h2 className="apple-lineup-title">
              Which product is right for your business?
            </h2>
            <Link href="/products" className="apple-lineup-all-link">
              <span>Compare all products</span>
              <Icon name="arrow-right" size={14} />
            </Link>
          </div>

          {/* Lineup Grid */}
          <div className="apple-lineup-grid">
            {allProducts.map((p, idx) => (
              <div
                key={p.slug}
                className={`apple-lineup-card${p.slug === product.slug ? " is-current" : ""}`}
                data-reveal
                style={{ "--d": idx + 1 } as React.CSSProperties}
              >
                <div className="apple-lineup-card__media">
                  <img src={p.image || "/images/hr.png"} alt={p.name} className="apple-lineup-card__img" />
                </div>
                <div className="apple-lineup-card__content">
                  <span className="apple-lineup-card__badge">{p.badge}</span>
                  <h3 className="apple-lineup-card__name">{p.name}</h3>
                  <p className="apple-lineup-card__tagline">{p.tagline}</p>

                  <div className="apple-lineup-card__action">
                    <Link href={`/products/${p.slug}`} className="apple-lineup-card__btn">
                      <span>{p.slug === product.slug ? "Currently viewing" : `Explore ${p.name}`}</span>
                      <Icon name="arrow-right" size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
