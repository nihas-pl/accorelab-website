import "./home.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Cta, NumbersBand } from "@/components/Sections";
import { HeroReveal } from "@/components/HeroReveal";
import { ProductShowcase } from "@/components/ProductShowcase";
import { Testimonials } from "@/components/Testimonials";
import { CaseStudies } from "@/components/CaseStudies";
import { getSiteContent } from "@/lib/strapi";

export default async function Home() {
  const { global, stats, products, testimonials, caseStudies } = await getSiteContent();

  return (
    <>
      <Header />
      <main>
        <HeroReveal global={global} />
        <ProductShowcase products={products} />
        <NumbersBand stats={stats} />
        <Testimonials testimonials={testimonials} />
        <CaseStudies caseStudies={caseStudies} />
        <Cta global={global} />
      </main>
      <Footer global={global} />
    </>
  );
}
