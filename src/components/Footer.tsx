import Image from "next/image";
import type { Global } from "@/lib/content";

const linkHrefs: Record<string, string> = {
  "About us": "/who-we-are",
  "Who we are": "/who-we-are",
  "Capabilities": "/#capabilities",
  "Projects": "/#projects",
  "Clients": "/#clients",
  "Contact": "/#contact",
  "Support": "/#contact",
  "Careers": "/#contact",
  "Intaali": "/#products",
  "Job Wizz": "/#products",
  "Lead Wizz": "/#products",
  "Menukite": "/#products",
};

const cols: [string, string[]][] = [
  ["Company", ["Who we are", "Capabilities", "Projects", "Clients"]],
  ["Products", ["Intaali", "Job Wizz", "Lead Wizz", "Menukite"]],
  ["Get in touch", ["Contact", "Support", "Careers"]],
];

export function Footer({ global }: { global: Global }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div data-reveal>
            <Image src="/logo-white.svg" alt="Accorelab" width={160} height={22} />
            <p className="site-footer__blurb">
              Software that scales with your business. Built by a team that owns the outcome.
            </p>
          </div>
          {cols.map(([title, links], i) => (
            <div key={title} data-reveal style={{ "--d": i + 1 } as React.CSSProperties}>
              <div className="site-footer__col-title">{title}</div>
              {links.map((l) => (
                <a key={l} href={linkHrefs[l] || "/"} className="site-footer__link">
                  {l}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div className="site-footer__bottom">
          <span>© {new Date().getFullYear()} Accorelab. All rights reserved.</span>
          <span>
            {global.address} · {global.email}
          </span>
        </div>
      </div>
    </footer>
  );
}
