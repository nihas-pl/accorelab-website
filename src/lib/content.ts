/* Content model shared by the Strapi CMS and the local fallback.
   The site renders from Strapi when it's reachable and from this
   fallback otherwise, so the frontend never renders empty. */

export interface Stat {
  value: string;
  label: string;
  group: "company" | "outcomes";
}

export interface Capability {
  title: string;
  description: string;
  icon: string; // lucide icon name (kebab-case)
  featured: boolean;
}

export interface Project {
  name: string;
  tagline: string;
  description: string;
  icon: string;
  tags: string[];
  featured: boolean;
}

export interface ProductFeature {
  title: string;
  description: string;
  icon: string;
}

export interface ProductStat {
  value: string;
  label: string;
}

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  badge: string;
  icon: string;
  ctaLabel: string;
  /** URL of the product visual; when absent the placeholder renders. */
  image?: string | null;
  features?: ProductFeature[];
  stats?: ProductStat[];
}

/** Local visuals used when the CMS entry has no image uploaded. */
export const productImageOverrides: Record<string, string> = {
  "Fynexxa HR": "/images/hr.png",
  "Fynexxa Finance": "/images/accounts.png",
  "Fynexxa Commerce": "/images/e-commerce.png",
  "Menukite": "/images/menu.png",
};

export interface Client {
  name: string;
  industry: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface CaseStudy {
  company: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  href?: string | null;
  /** URL of the right-hand visual; placeholder renders when absent. */
  image?: string | null;
}

export interface Global {
  siteName: string;
  heroTitle: string;
  heroHighlight: string;
  heroBody: string;
  aboutPre?: string | null;
  aboutHighlight?: string | null;
  aboutPost?: string | null;
  ctaTitle: string;
  ctaBody: string;
  email: string;
  phone: string;
  address: string;
}

export interface SiteContent {
  global: Global;
  stats: Stat[];
  capabilities: Capability[];
  projects: Project[];
  products: Product[];
  clients: Client[];
  testimonials: Testimonial[];
  caseStudies: CaseStudy[];
}

export const fallbackContent: SiteContent = {
  global: {
    siteName: "Accorelab",
    heroTitle: "Software your business runs on,",
    heroHighlight: "built around how you work.",
    heroBody:
      "Accorelab designs and ships custom ERP and business software — adapting fast as you scale, backed by a team that owns the outcome.",
    aboutPre: "Whether you need",
    aboutHighlight: "a complete ERP platform",
    aboutPost:
      "or a single connected workflow, Accorelab has the expertise to deliver exceptional results.",
    ctaTitle: "Let's build the software your business runs on.",
    ctaBody:
      "Tell us where your operations slow down. We'll show you what tailored software can do about it.",
    email: "info@accorelab.ae",
    phone: "+971 56 805 8642",
    address: "Al Moosa Tower 2, Sheikh Zayed Road, Trade Center 1, Dubai, UAE",
  },
  stats: [
    { value: "10+", label: "Years building business software", group: "company" },
    { value: "40+", label: "Projects delivered end to end", group: "company" },
    { value: "4", label: "Products of our own in the market", group: "company" },
    { value: "95%", label: "Clients who stay for the next build", group: "company" },
    { value: "38%", label: "Less manual data entry after moving to a tailored ERP", group: "outcomes" },
    { value: "2×", label: "Faster month-end close with connected finance workflows", group: "outcomes" },
    { value: "99.9%", label: "Uptime across the systems we build and operate", group: "outcomes" },
  ],
  capabilities: [
    {
      title: "Custom ERP development",
      description:
        "Finance, inventory, HR, and operations in one system shaped to your processes — not the other way around.",
      icon: "layers",
      featured: true,
    },
    {
      title: "Web & mobile apps",
      description:
        "Product-grade web and mobile applications, from customer portals to field tools your teams use daily.",
      icon: "smartphone",
      featured: false,
    },
    {
      title: "E-commerce platforms",
      description:
        "Storefronts wired straight into your inventory, fulfilment, and accounting so orders run themselves.",
      icon: "shopping-cart",
      featured: false,
    },
    {
      title: "AI & automation",
      description:
        "AI agents and workflow automation — like our Intaali support agent — that take repetitive work off your team.",
      icon: "bot",
      featured: false,
    },
    {
      title: "Cloud & integrations",
      description:
        "Scalable, observable infrastructure and clean integrations between the systems you already rely on.",
      icon: "cloud",
      featured: false,
    },
    {
      title: "Digital transformation",
      description:
        "A practical roadmap from spreadsheets and silos to connected systems — delivered step by step.",
      icon: "route",
      featured: false,
    },
  ],
  projects: [
    {
      name: "Intaali",
      tagline: "AI customer support agent",
      description:
        "An AI agent that answers customers instantly, hands off cleanly to humans, and learns your business.",
      icon: "bot",
      tags: ["AI", "Support"],
      featured: true,
    },
    {
      name: "Job Wizz",
      tagline: "Workforce management",
      description:
        "Scheduling, attendance, and job tracking for teams in the field — one view of who's doing what, where.",
      icon: "users",
      tags: ["ERP", "Operations"],
      featured: false,
    },
    {
      name: "Lead Wizz",
      tagline: "Lead management platform",
      description:
        "Capture, qualify, and follow up on every lead with a pipeline your sales team actually keeps updated.",
      icon: "line-chart",
      tags: ["CRM", "Sales"],
      featured: false,
    },
    {
      name: "Menukite",
      tagline: "Restaurant management",
      description:
        "Menus, orders, and kitchen flow for restaurants — from QR ordering to daily sales you can act on.",
      icon: "utensils",
      tags: ["Hospitality", "POS"],
      featured: false,
    },
  ],
  products: [
    {
      slug: "fynexxa-hr",
      name: "Fynexxa HR",
      tagline: "People, Payroll & Performance in One Platform",
      badge: "Human Resources",
      description: "Automate attendance, seamless WPS payroll, employee self-service, and compliance workflows designed for modern regional operations.",
      icon: "users",
      ctaLabel: "Request a demo",
      image: "/images/hr.png",
      features: [
        {
          title: "Automated WPS Payroll",
          description: "Generate WPS files with zero-error calculation for allowances, deductions, overtime, and EOSB.",
          icon: "calculator",
        },
        {
          title: "Smart Attendance Tracking",
          description: "Biometric, mobile geo-fencing, and shift management syncing real-time with timesheets.",
          icon: "clock",
        },
        {
          title: "Self-Service Mobile Portal",
          description: "Empower employees to apply for leave, view payslips, and submit expense claims directly.",
          icon: "smartphone",
        },
        {
          title: "Document & Compliance Vault",
          description: "Automated alerts for passport, visa, and Emirates ID renewals to keep your business compliant.",
          icon: "shield-check",
        },
      ],
      stats: [
        { value: "85%", label: "Faster payroll processing cycle" },
        { value: "100%", label: "WPS and labor compliance" },
        { value: "0", label: "Manual paper forms required" },
      ],
    },
    {
      slug: "fynexxa-finance",
      name: "Fynexxa Finance",
      tagline: "Intelligent Accounting & VAT-Ready Financial Control",
      badge: "Financial Management",
      description: "Real-time general ledgers, automated multi-currency invoicing, bank reconciliation, and audit-ready reporting without spreadsheets.",
      icon: "calculator",
      ctaLabel: "Request a demo",
      image: "/images/accounts.png",
      features: [
        {
          title: "VAT & Corporate Tax Compliance",
          description: "Instant FTA-compliant tax audit files, VAT returns, and multi-entity consolidation.",
          icon: "file-text",
        },
        {
          title: "Automated Invoicing & Collections",
          description: "Set up automated recurring invoices, payment reminders, and payment gateway links.",
          icon: "credit-card",
        },
        {
          title: "Real-Time Profitability Dashboard",
          description: "Track cash flow, profit margins per project, and operational expenses live.",
          icon: "bar-chart-3",
        },
        {
          title: "Multi-Currency & Bank Sync",
          description: "Connect multiple bank accounts and handle cross-border transactions with live exchange rates.",
          icon: "repeat",
        },
      ],
      stats: [
        { value: "2×", label: "Faster month-end financial close" },
        { value: "99.8%", label: "Accuracy in tax return reporting" },
        { value: "40%", label: "Reduction in overdue invoices" },
      ],
    },
    {
      slug: "fynexxa-commerce",
      name: "Fynexxa Commerce",
      tagline: "Omnichannel Commerce & Multi-Warehouse Fulfillment",
      badge: "E-Commerce & Supply Chain",
      description: "Connect your storefront, inventory tracking, POS terminals, and fulfillment operations in one real-time unified engine.",
      icon: "shopping-cart",
      ctaLabel: "Request a demo",
      image: "/images/e-commerce.png",
      features: [
        {
          title: "Unified Stock & Multi-Location",
          description: "Real-time inventory syncing across online stores, retail branches, and central warehouses.",
          icon: "layers",
        },
        {
          title: "Order Dispatch & Dispatcher Sync",
          description: "Automated route dispatching and courier integration for rapid order delivery.",
          icon: "truck",
        },
        {
          title: "Omnichannel Customer Portal",
          description: "B2B and B2C customer ordering portals with custom price lists and wholesale accounts.",
          icon: "globe",
        },
        {
          title: "Instant Analytics & Demand Forecast",
          description: "Prevent stockouts with automated re-order points and sales trend insights.",
          icon: "trending-up",
        },
      ],
      stats: [
        { value: "3×", label: "Higher order processing volume" },
        { value: "99.9%", label: "Inventory count precision" },
        { value: "-50%", label: "Fulfillment prep time" },
      ],
    },
    {
      slug: "menukite",
      name: "Menukite",
      tagline: "Next-Generation Digital Dining & Kitchen POS System",
      badge: "Hospitality & POS",
      description: "From contactless QR digital menus and direct table ordering to kitchen display systems (KDS) and inventory control.",
      icon: "utensils",
      ctaLabel: "Request a demo",
      image: "/images/menu.png",
      features: [
        {
          title: "Smart QR & Mobile Table Ordering",
          description: "Allow guests to browse high-res visual menus, order, and pay directly from their smartphone.",
          icon: "qr-code",
        },
        {
          title: "Kitchen Display System (KDS)",
          description: "Eliminate paper tickets with color-coded live kitchen screens and course timing management.",
          icon: "layout",
        },
        {
          title: "Recipe & Cost Management",
          description: "Track ingredient depletion in real time to monitor food waste and maintain target profit margins.",
          icon: "pie-chart",
        },
        {
          title: "Multi-Branch Management",
          description: "Manage menu items, prices, and promotional discounts across all restaurant locations centrally.",
          icon: "store",
        },
      ],
      stats: [
        { value: "+22%", label: "Increase in average order ticket" },
        { value: "15 min", label: "Faster table turnaround times" },
        { value: "100%", label: "Order accuracy to kitchen" },
      ],
    },
  ],
  clients: [
    { name: "Al Noor Trading", industry: "Distribution" },
    { name: "Gulf Crest", industry: "Hospitality" },
    { name: "Marina Logistics", industry: "Logistics" },
    { name: "Oryx Retail", industry: "Retail" },
    { name: "Falcon Facilities", industry: "Facility management" },
    { name: "Zahra Foods", industry: "F&B" },
  ],
  testimonials: [
    {
      quote:
        "Accorelab replaced five disconnected tools with one ERP that fits exactly how we work. Month-end that used to take a week now takes an afternoon.",
      author: "Ahmed Al Rashid",
      role: "Operations Director",
      company: "Al Noor Trading",
    },
    {
      quote:
        "They didn't hand us software and walk away — they learned our business, shipped fast, and still support us like part of the team.",
      author: "Layla Haddad",
      role: "IT Manager",
      company: "Gulf Crest Hospitality",
    },
    {
      quote:
        "Real-time visibility across our fleet and warehouses changed how we run. Decisions that were guesswork are now backed by live data.",
      author: "Rajesh Menon",
      role: "Head of Operations",
      company: "Marina Logistics",
    },
    {
      quote:
        "From storefront to stockroom to accounting, everything finally talks to each other. Orders practically run themselves now.",
      author: "Fatima Al Suwaidi",
      role: "Chief Executive",
      company: "Oryx Retail Group",
    },
  ],
  caseStudies: [
    {
      company: "Menukite",
      title: "Gela Cafe runs its entire floor on one platform",
      subtitle:
        "The Dubai café swapped paper menus and delivery-app commissions for QR ordering, tableside checkout, and commission-free online orders — every channel in one dashboard, live in days.",
      ctaLabel: "Read Case Study",
      href: "https://www.menukite.com/case-studies/gela-cafe",
      image: "/images/gela-hero.webp",
    },
    {
      company: "Al Noor Trading",
      title: "Five systems, unified into one ERP",
      subtitle: "How a Dubai distributor cut month-end close from a week to an afternoon.",
      ctaLabel: "Learn More",
      href: "#contact",
    },
    {
      company: "Marina Logistics",
      title: "Real-time visibility across the fleet",
      subtitle: "Live tracking that turned dispatch guesswork into data-driven decisions.",
      ctaLabel: "Learn More",
      href: "#contact",
    },
    {
      company: "Oryx Retail Group",
      title: "Storefront to stockroom, connected",
      subtitle: "An omnichannel platform where orders practically run themselves.",
      ctaLabel: "Learn More",
      href: "#contact",
    },
  ],
};

export function getAllProducts(): Product[] {
  return fallbackContent.products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return fallbackContent.products.find((p) => p.slug === slug);
}
