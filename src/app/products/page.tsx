import Link from "next/link";
import { getAllProducts } from "@/lib/content";
import { getSiteContent } from "@/lib/strapi";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Cta } from "@/components/Sections";
import { Icon } from "@/components/Icon";
import { ScrollReveal } from "@/components/ScrollReveal";
import "@/app/home.css";
import "@/app/who-we-are/who-we-are.css";
import "@/app/products/products.css";

export const metadata = {
  title: "Products & Enterprise Software | Accorelab",
  description:
    "Explore Accorelab's suite of business software, custom ERP tools, HR & payroll systems, inventory management, and digital dining POS tools.",
};

export default async function ProductsIndexPage() {
  const products = getAllProducts();
  const { global } = await getSiteContent();

  return (
    <div className="prod-page">
      <ScrollReveal />
      <Header theme="light" />
      <main>
        {/* Hero Banner */}
        <section className="prod-hero" style={{ paddingBottom: "40px" }}>
          <div className="container" style={{ textAlign: "center" }}>
            <div className="prod-hero__badge" data-reveal style={{ margin: "0 auto 24px" }}>
              <Icon name="layers" size={14} />
              <span>Software Suite</span>
            </div>

            <h1 className="prod-hero__title" data-reveal style={{ margin: "0 auto 20px" }}>
              Scalable Tools Built Around How You Work
            </h1>

            <p className="prod-hero__subtitle" data-reveal style={{ margin: "0 auto 36px" }}>
              Engineered for efficiency, reliability, and seamless integration. Discover the software platforms powering growth across enterprises.
            </p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="prod-features" style={{ paddingTop: "20px" }}>
          <div className="container">
            <div className="prod-features__grid">
              {products.map((product, idx) => (
                <div
                  key={product.slug}
                  className="prod-feature-card"
                  data-reveal
                  style={{ "--d": idx + 1 } as React.CSSProperties}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                    <div className="prod-feature-icon" style={{ marginBottom: 0 }}>
                      <Icon name={product.icon} size={24} />
                    </div>
                    <span
                      style={{
                        background: "var(--blue-50)",
                        color: "var(--blue-700)",
                        padding: "4px 12px",
                        borderRadius: "12px",
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    >
                      {product.badge}
                    </span>
                  </div>

                  <h2 className="prod-feature-title">{product.name}</h2>
                  <p className="prod-feature-desc" style={{ marginBottom: "24px" }}>
                    {product.description}
                  </p>

                  {product.image && (
                    <div
                      style={{
                        borderRadius: "16px",
                        overflow: "hidden",
                        marginBottom: "24px",
                        height: "160px",
                        background: "var(--neutral-100)",
                      }}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                  )}

                  <div style={{ marginTop: "auto" }}>
                    <Link href={`/products/${product.slug}`} className="btn--prod-primary" style={{ width: "100%", justifyContent: "center" }}>
                      <span>Explore {product.name}</span>
                      <Icon name="arrow-right" size={16} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Cta global={global} />
      </main>
      <Footer global={global} />
    </div>
  );
}
