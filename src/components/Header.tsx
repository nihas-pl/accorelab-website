"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { Icon } from "@/components/Icon";
import { fallbackContent, Product } from "@/lib/content";
import { useDemoModal } from "@/context/DemoModalContext";

/* Fixed header: transparent while over the hero, then a frosted bar once scrolled.
   Features an interactive mega-menu dropdown for Products matching reference UI,
   plus a full responsive mobile drawer navigation. */
export function Header({ theme = "dark" }: { theme?: "dark" | "light" }) {
  const { openModal } = useDemoModal();
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product>(fallbackContent.products[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const hero = document.querySelector(".heroreveal");
    const onScroll = () => {
      const solid = hero
        ? hero.getBoundingClientRect().bottom <= 72
        : window.scrollY > 80;
      setScrolled(solid);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProductsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setProductsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setProductsOpen(false);
    }, 180);
  };

  const isLight = theme === "light";

  return (
    <header
      className={`site-header${isLight ? " site-header--light" : ""}${scrolled ? " is-scrolled" : ""}${productsOpen ? " dropdown-active" : ""}${mobileMenuOpen ? " mobile-active" : ""}`}
      style={
        scrolled || productsOpen || mobileMenuOpen
          ? ({ backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" } as React.CSSProperties)
          : undefined
      }
    >
      <div className="container site-header__inner">
        <Link href="/" aria-label="Accorelab home" onClick={() => setMobileMenuOpen(false)}>
          <Image
            src={isLight ? "/logo-blue.svg" : "/logo-white.svg"}
            alt="Accorelab"
            width={146}
            height={20}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="site-header__nav">
          {/* Products Dropdown Item */}
          <div
            className="site-header__nav-item site-header__nav-item--dropdown"
            ref={dropdownRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              className={`site-header__dropdown-trigger${productsOpen ? " is-open" : ""}`}
              onClick={() => setProductsOpen((prev) => !prev)}
              aria-expanded={productsOpen}
            >
              <span>Products</span>
              <Icon
                name="chevron-down"
                size={14}
                className={`site-header__chevron${productsOpen ? " is-rotated" : ""}`}
              />
            </button>

            {/* Mega Dropdown Panel */}
            {productsOpen && (
              <div className="mega-menu" role="menu">
                <div className="mega-menu__inner">
                  {/* Left Column: Product List */}
                  <div className="mega-menu__col mega-menu__col--list">
                    <div className="mega-menu__label">Products</div>
                    <ul className="mega-menu__products-list">
                      {fallbackContent.products.map((product) => {
                        const isSelected = activeProduct.slug === product.slug;
                        return (
                          <li key={product.slug}>
                            <Link
                              href={`/products/${product.slug}`}
                              className={`mega-menu__product-link${isSelected ? " is-active" : ""}`}
                              onMouseEnter={() => setActiveProduct(product)}
                              onClick={() => setProductsOpen(false)}
                            >
                              <span className="mega-menu__icon-box">
                                <Icon name={product.icon} size={18} />
                              </span>
                              <div className="mega-menu__product-info">
                                <span className="mega-menu__product-name">{product.name}</span>
                                <span className="mega-menu__product-desc">{product.description}</span>
                              </div>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                    <div className="mega-menu__all-link-wrap">
                      <Link
                        href="/products"
                        className="mega-menu__all-link"
                        onClick={() => setProductsOpen(false)}
                      >
                        <span>Explore All Products</span>
                        <Icon name="arrow-right" size={14} />
                      </Link>
                    </div>
                  </div>

                  {/* Middle Column: Active Product Showcase Card */}
                  <div className="mega-menu__col mega-menu__col--preview">
                    <div className="mega-menu__card-preview">
                      <div className="mega-menu__preview-badge">
                        <Icon name="sparkles" size={12} />
                        <span>{activeProduct.badge}</span>
                      </div>
                      <h4 className="mega-menu__preview-title">{activeProduct.name}</h4>
                      <p className="mega-menu__preview-desc">{activeProduct.description}</p>

                      {activeProduct.image && (
                        <div className="mega-menu__preview-media">
                          <img
                            src={activeProduct.image}
                            alt={activeProduct.name}
                            className="mega-menu__preview-img"
                          />
                        </div>
                      )}

                      <Link
                        href={`/products/${activeProduct.slug}`}
                        className="mega-menu__preview-btn"
                        onClick={() => setProductsOpen(false)}
                      >
                        <span>Explore Content</span>
                        <Icon name="arrow-right" size={14} />
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Dark CTA Callout Card */}
                  <div className="mega-menu__col mega-menu__col--cta">
                    <div className="mega-menu__cta-card">
                      <div className="mega-menu__cta-tag">Custom Solutions</div>
                      <h4 className="mega-menu__cta-title">Let&apos;s grow your Brand Together!</h4>
                      <p className="mega-menu__cta-desc">
                        Custom software integration, enterprise workflow automation, and scalable tools tailored for your operations.
                      </p>
                      <button
                        type="button"
                        className="mega-menu__cta-btn"
                        onClick={() => {
                          setProductsOpen(false);
                          openModal("Custom Solution");
                        }}
                      >
                        <span>Schedule Consultation</span>
                        <Icon name="arrow-right" size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link href="/who-we-are">Who We Are</Link>
          <Link href="/#clients">Clients</Link>
          <button
            type="button"
            className="site-header__nav-link"
            onClick={() => openModal("Contact Us")}
          >
            Contact
          </button>
        </nav>

        {/* Desktop CTA Action */}
        <div className="site-header__actions">
          <button
            type="button"
            className={`btn btn--sm ${isLight ? "btn--primary" : "btn--pill-light"}`}
            onClick={() => openModal("Let's Talk")}
          >
            <span className="btn__dot" aria-hidden="true" />
            Let&apos;s talk
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <button
          type="button"
          className="site-header__mobile-toggle"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
        >
          <Icon name={mobileMenuOpen ? "x" : "menu"} size={24} />
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="site-header__mobile-drawer">
          <div className="mobile-drawer__content">
            <div className="mobile-drawer__group">
              <button
                type="button"
                className={`mobile-drawer__trigger${mobileProductsOpen ? " is-open" : ""}`}
                onClick={() => setMobileProductsOpen((prev) => !prev)}
              >
                <span>Products</span>
                <Icon
                  name="chevron-down"
                  size={16}
                  className={`mobile-drawer__chevron${mobileProductsOpen ? " is-rotated" : ""}`}
                />
              </button>
              {mobileProductsOpen && (
                <ul className="mobile-drawer__sublist">
                  {fallbackContent.products.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/products/${p.slug}`}
                        className="mobile-drawer__sublink"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="mobile-drawer__subicon">
                          <Icon name={p.icon} size={16} />
                        </span>
                        <span>{p.name}</span>
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/products"
                      className="mobile-drawer__sublink mobile-drawer__sublink--all"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>Explore All Products</span>
                      <Icon name="arrow-right" size={14} />
                    </Link>
                  </li>
                </ul>
              )}
            </div>

            <Link
              href="/who-we-are"
              className="mobile-drawer__link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Who We Are
            </Link>

            <Link
              href="/#clients"
              className="mobile-drawer__link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Clients
            </Link>

            <button
              type="button"
              className="mobile-drawer__link"
              onClick={() => {
                setMobileMenuOpen(false);
                openModal("Contact Us");
              }}
            >
              Contact
            </button>

            <div className="mobile-drawer__footer">
              <button
                type="button"
                className="btn btn--primary"
                style={{ width: "100%", justifyContent: "center" }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  openModal("Let's Talk");
                }}
              >
                <span className="btn__dot" aria-hidden="true" />
                Let&apos;s talk
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
