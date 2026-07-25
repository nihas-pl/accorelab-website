import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductBySlug, getAllProducts } from "@/lib/content";
import { getSiteContent } from "@/lib/strapi";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Cta } from "@/components/Sections";
import { Icon } from "@/components/Icon";
import { ScrollReveal } from "@/components/ScrollReveal";
import { AppleProductShowcase } from "@/components/AppleProductShowcase";
import { ProductDemoButton } from "@/components/ProductDemoButton";
import "@/app/home.css";
import "@/app/who-we-are/who-we-are.css";
import "@/app/products/products.css";

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found | Accorelab" };

  return {
    title: `${product.name} — ${product.tagline} | Accorelab`,
    description: product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  const allProducts = getAllProducts();

  if (!product) {
    notFound();
  }

  const { global } = await getSiteContent();

  return (
    <div className="prod-page">
      <ScrollReveal />
      <Header theme="light" />
      <main>
        {/* Section 1: Apple Product Hero */}
        <section className="prod-hero">
          <div className="container">
            <div className="prod-hero__badge" data-reveal>
              <Icon name="sparkles" size={14} />
              <span>{product.badge}</span>
            </div>

            <h1 className="prod-hero__title" data-reveal style={{ "--d": 1 } as React.CSSProperties}>
              {product.name}
            </h1>

            <p className="prod-hero__subtitle" data-reveal style={{ "--d": 2 } as React.CSSProperties}>
              {product.tagline}. {product.description}
            </p>

            <div className="prod-hero__actions" data-reveal style={{ "--d": 3 } as React.CSSProperties}>
              <ProductDemoButton productName={product.name} />
              <Link href="/products" className="btn--prod-secondary">
                <span>View All Products</span>
              </Link>
            </div>

            {/* Hero Visual Mockup */}
            {product.image && (
              <div className="prod-hero__visual" data-reveal style={{ "--d": 4 } as React.CSSProperties}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="prod-hero__img"
                />
              </div>
            )}
          </div>
        </section>

        {/* Section 2: Key Capabilities Grid */}
        {product.features && product.features.length > 0 && (
          <section className="prod-features">
            <div className="container">
              <div className="prod-section-header">
                <div className="clayo-eyebrow" data-reveal style={{ justifyContent: "center" }}>
                  <span className="clayo-eyebrow__dot" aria-hidden="true" />
                  <span>Key Capabilities</span>
                </div>
                <h2 className="prod-section-title" data-reveal style={{ "--d": 1 } as React.CSSProperties}>
                  Designed to transform your daily operations
                </h2>
                <p className="prod-section-desc" data-reveal style={{ "--d": 2 } as React.CSSProperties}>
                  Explore how {product.name} connects your workflow, eliminates bottlenecks, and gives you full operational control.
                </p>
              </div>

              <div className="prod-features__grid">
                {product.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="prod-feature-card"
                    data-reveal
                    style={{ "--d": (idx % 2) + 1 } as React.CSSProperties}
                  >
                    <div className="prod-feature-icon">
                      <Icon name={feature.icon} size={24} />
                    </div>
                    <h3 className="prod-feature-title">{feature.title}</h3>
                    <p className="prod-feature-desc">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Section 3: Apple Spec Grid, Interactive AR Workspace, 2-Up Cards & Lineup */}
        <AppleProductShowcase product={product} allProducts={allProducts} />

        {/* Section 4: Call to Action */}
        <Cta global={global} />
      </main>
      <Footer global={global} />
    </div>
  );
}
