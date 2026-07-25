import {
  fallbackContent,
  productImageOverrides,
  type Capability,
  type Client,
  type Global,
  type Product,
  type Project,
  type SiteContent,
  type Stat,
  type Testimonial,
  type CaseStudy,
} from "./content";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

async function fetchJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${STRAPI_URL}/api${path}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

/* Strapi v5 returns flat attributes on data entries. */
type Entry = Record<string, unknown>;

/* Product visuals: a CMS-uploaded image wins; otherwise fall back to the
   bundled local file for that product (see productImageOverrides). */
function normalizeProduct(entry: Entry): Product {
  const media = entry.image as { url?: string } | null | undefined;
  const image = media?.url
    ? `${STRAPI_URL}${media.url}`
    : productImageOverrides[entry.name as string] ?? null;
  return { ...(entry as unknown as Product), image };
}

/* Case study visual: prefix a CMS-uploaded media URL; placeholder otherwise. */
function normalizeCaseStudy(entry: Entry): CaseStudy {
  const media = entry.image as { url?: string } | null | undefined;
  const image = media?.url ? `${STRAPI_URL}${media.url}` : null;
  return { ...(entry as unknown as CaseStudy), image };
}

export async function getSiteContent(): Promise<SiteContent> {
  const [global, stats, capabilities, projects, products, clients, testimonials, caseStudies] =
    await Promise.all([
      fetchJson<Entry>("/global"),
      fetchJson<Entry[]>("/stats?sort=order&pagination[pageSize]=100"),
      fetchJson<Entry[]>("/capabilities?sort=order&pagination[pageSize]=100"),
      fetchJson<Entry[]>("/projects?sort=order&pagination[pageSize]=100"),
      fetchJson<Entry[]>("/products?sort=order&populate=image&pagination[pageSize]=100"),
      fetchJson<Entry[]>("/clients?sort=order&pagination[pageSize]=100"),
      fetchJson<Entry[]>("/testimonials?sort=order&pagination[pageSize]=100"),
      fetchJson<Entry[]>("/case-studies?sort=order&populate=image&pagination[pageSize]=100"),
    ]);

  const fb = fallbackContent;
  return {
    global: global ? (global as unknown as Global) : fb.global,
    stats: stats?.length ? (stats as unknown as Stat[]) : fb.stats,
    capabilities: capabilities?.length
      ? (capabilities as unknown as Capability[])
      : fb.capabilities,
    projects: projects?.length ? (projects as unknown as Project[]) : fb.projects,
    products: products?.length ? products.map(normalizeProduct) : fb.products,
    clients: clients?.length ? (clients as unknown as Client[]) : fb.clients,
    testimonials: testimonials?.length
      ? (testimonials as unknown as Testimonial[])
      : fb.testimonials,
    caseStudies: caseStudies?.length ? caseStudies.map(normalizeCaseStudy) : fb.caseStudies,
  };
}
