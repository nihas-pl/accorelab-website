import "../home.css";
import "./who-we-are.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Cta } from "@/components/Sections";
import { Icon } from "@/components/Icon";
import { ScrollReveal } from "@/components/ScrollReveal";
import { getSiteContent } from "@/lib/strapi";

export const metadata = {
  title: "Who We Are | Accorelab",
  description:
    "Build & growth with scalable tools — AccoreLab is your trusted partner for innovative custom software solutions, ERPs, and digital transformation.",
};

export default async function WhoWeAre() {
  const { global } = await getSiteContent();

  return (
    <>
      <ScrollReveal />
      <Header theme="light" />
      <main>
        {/* Section 1: Hero */}
        <section className="clayo-hero">
          <div className="clayo-hero__extreme-video-wrap" aria-hidden="true">
            <video
              className="clayo-hero__extreme-video"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/video/about.mp4" type="video/mp4" />
            </video>
            <div className="clayo-hero__extreme-video-scrim" />
          </div>

          <div className="container">
            <div className="clayo-hero__grid">
              <div className="clayo-hero__content">
                <h1 className="clayo-hero__title" data-reveal>
                  Build &amp; growth <br />
                  with scalable tools
                </h1>
                <p className="clayo-hero__desc" data-reveal style={{ "--d": 1 } as React.CSSProperties}>
                  Easily adapt to changes and scale your operations with our flexible infrastructure,
                  designed to support your business growth.
                </p>
                <div className="clayo-hero__actions" data-reveal style={{ "--d": 2 } as React.CSSProperties}>
                  <a href="/#contact" className="btn--clayo-purple">
                    Get Started
                  </a>
                </div>
                <div className="clayo-hero__social" data-reveal style={{ "--d": 3 } as React.CSSProperties}>
                  <div className="clayo-hero__avatars">
                    <img
                      src="/images/about_hero_person.png"
                      alt="User"
                      className="clayo-hero__avatar"
                    />
                    <img
                      src="/images/about_bento_team.png"
                      alt="User"
                      className="clayo-hero__avatar"
                    />
                    <div className="clayo-hero__avatar-count">10k+</div>
                  </div>
                  <span className="clayo-hero__social-text">
                    10,000+ operations streamlined across businesses
                  </span>
                </div>
              </div>

              {/* Right Hero Portrait Card */}
              <div className="clayo-hero__card" data-reveal style={{ "--d": 2 } as React.CSSProperties}>
                <img
                  src="/images/about_hero_person.png"
                  alt="AccoreLab Operations"
                  className="clayo-hero__img"
                />
                <div className="clayo-widget">
                  <div className="clayo-widget__lbl">Total balance</div>
                  <div className="clayo-widget__val">$1,204.00</div>
                  <div className="clayo-widget__bars">
                    <div className="clayo-widget__bar" style={{ height: "40%" }} />
                    <div className="clayo-widget__bar" style={{ height: "65%" }} />
                    <div className="clayo-widget__bar clayo-widget__bar--active" style={{ height: "100%" }} />
                    <div className="clayo-widget__bar" style={{ height: "55%" }} />
                    <div className="clayo-widget__bar" style={{ height: "75%" }} />
                    <div className="clayo-widget__bar" style={{ height: "45%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: About AccoreLab Stats Banner */}
        <section className="clayo-banner">
          <div className="container">
            <div className="clayo-eyebrow" data-reveal>
              <span className="clayo-eyebrow__dot" aria-hidden="true" />
              <span>About AccoreLab</span>
            </div>
            <h2 className="clayo-banner__heading" data-reveal style={{ "--d": 1 } as React.CSSProperties}>
              We are passionate about empowering businesses to take control of their operations
              and achieve their strategic financial and operational goals.
            </h2>

            <div className="clayo-banner__stats">
              <div className="clayo-banner__stat-item" data-reveal style={{ "--d": 1 } as React.CSSProperties}>
                <div className="clayo-banner__stat-val">95%</div>
                <div className="clayo-banner__stat-lbl">Complete customer satisfaction</div>
              </div>
              <div className="clayo-banner__stat-item" data-reveal style={{ "--d": 2 } as React.CSSProperties}>
                <div className="clayo-banner__stat-val">10+</div>
                <div className="clayo-banner__stat-lbl">Innovation and valuable insight</div>
              </div>
              <div className="clayo-banner__stat-item" data-reveal style={{ "--d": 3 } as React.CSSProperties}>
                <div className="clayo-banner__stat-val">$10m+</div>
                <div className="clayo-banner__stat-lbl">Highly efficient operational strategies</div>
              </div>
              <div className="clayo-banner__stat-item" data-reveal style={{ "--d": 4 } as React.CSSProperties}>
                <div className="clayo-banner__stat-val">40+</div>
                <div className="clayo-banner__stat-lbl">Enterprise builds delivered worldwide</div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Bento Grid */}
        <section className="clayo-bento">
          <div className="container">
            <div className="clayo-bento__header">
              <h2 className="clayo-bento__title" data-reveal>
                Make operations easy, <br />
                simplify your workflow
              </h2>
              <p className="clayo-bento__sub" data-reveal style={{ "--d": 1 } as React.CSSProperties}>
                Our platform managing business processes or growing your enterprise portfolio,
                our system integrates the latest technology to help you make smarter operational decisions with ease.
              </p>
            </div>

            <div className="clayo-bento__grid">
              {/* Card 1: Team Photo */}
              <div className="clayo-bento__card clayo-bento__card--team" data-reveal style={{ "--d": 1 } as React.CSSProperties}>
                <img
                  src="/images/about_bento_team.png"
                  alt="Team collaboration"
                  className="clayo-bento__img"
                />
              </div>

              {/* Card 2: Dark Stat Card */}
              <div className="clayo-bento__card clayo-bento__card--dark" data-reveal style={{ "--d": 2 } as React.CSSProperties}>
                <div className="clayo-bento__dark-num">10+</div>
                <p className="clayo-bento__dark-text">
                  Years of innovation and valuable insights, empowering businesses to thrive in a competitive market.
                </p>
              </div>

              {/* Card 3: Tall Mobile Image (Right Column) */}
              <div className="clayo-bento__card clayo-bento__card--tall" data-reveal style={{ "--d": 3 } as React.CSSProperties}>
                <img
                  src="/images/about_bento_mobile.png"
                  alt="Mobile application analytics"
                  className="clayo-bento__img"
                />
              </div>

              {/* Card 4: Vibrant Blue Accent Card */}
              <div className="clayo-bento__card clayo-bento__card--blue" data-reveal style={{ "--d": 2 } as React.CSSProperties}>
                <div className="clayo-bento__blue-icon">
                  <Icon name="sparkles" size={20} />
                </div>
                <div className="clayo-bento__blue-num">95%</div>
                <p className="clayo-bento__blue-text">
                  Complete customer satisfaction achieved through personalized solutions, proactive support,
                  and a dedication to meeting the unique needs of every client.
                </p>
              </div>

              {/* Card 5: Photo Person Card */}
              <div className="clayo-bento__card clayo-bento__card--person" data-reveal style={{ "--d": 3 } as React.CSSProperties}>
                <img
                  src="/images/about_hero_person.png"
                  alt="Professional"
                  className="clayo-bento__img"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Expertise / Pillars Grid */}
        <section className="clayo-expertise">
          <div className="container">
            <div className="clayo-expertise__header">
              <div className="clayo-eyebrow" data-reveal style={{ justifyContent: "center" }}>
                <span className="clayo-eyebrow__dot" aria-hidden="true" />
                <span>Expertise</span>
              </div>
              <h2 className="clayo-expertise__title" data-reveal style={{ "--d": 1 } as React.CSSProperties}>
                Empowering and strengthening <br />
                your business success
              </h2>
              <p className="clayo-expertise__sub" data-reveal style={{ "--d": 2 } as React.CSSProperties}>
                Our platform provides advanced tools and insights to help you manage, grow, and secure your business operations.
              </p>
            </div>

            <div className="clayo-expertise__grid">
              {/* Expertise Card 1 */}
              <div className="clayo-expertise__card" data-reveal style={{ "--d": 1 } as React.CSSProperties}>
                <div className="clayo-mockup">
                  <div className="clayo-mockup__header">
                    <span className="clayo-mockup__title">Total balance</span>
                    <Icon name="trending-up" size={16} color="#10b981" />
                  </div>
                  <div className="clayo-mockup__val">$1,204.00</div>
                </div>
                <h3 className="clayo-expertise__card-title">Our Vision</h3>
                <p className="clayo-expertise__card-desc">
                  Our mission at AccoreLab is to deliver cutting-edge software solutions that enable businesses to
                  streamline operations, enhance customer engagement, and achieve their strategic objectives.
                </p>
              </div>

              {/* Expertise Card 2 */}
              <div className="clayo-expertise__card" data-reveal style={{ "--d": 2 } as React.CSSProperties}>
                <div className="clayo-mockup">
                  <div className="clayo-mockup__header">
                    <span className="clayo-mockup__title">Performance</span>
                    <span style={{ fontSize: "12px", color: "#64748b" }}>Income / Expense</span>
                  </div>
                  <div style={{ display: "flex", gap: "16px" }}>
                    <div>
                      <div style={{ fontSize: "11px", color: "#64748b" }}>Income</div>
                      <div style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a" }}>$2,670</div>
                    </div>
                    <div>
                      <div style={{ fontSize: "11px", color: "#64748b" }}>Expense</div>
                      <div style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a" }}>$1,200</div>
                    </div>
                  </div>
                </div>
                <h3 className="clayo-expertise__card-title">What We Do</h3>
                <p className="clayo-expertise__card-desc">
                  At AccoreLab, we specialize in developing custom software solutions tailored to the unique needs of
                  each client. We turn your operational vision into high-performing digital reality.
                </p>
              </div>

              {/* Expertise Card 3 */}
              <div className="clayo-expertise__card" data-reveal style={{ "--d": 3 } as React.CSSProperties}>
                <div className="clayo-mockup">
                  <div className="clayo-mockup__header">
                    <span className="clayo-mockup__title">System Uptime & Trust</span>
                    <Icon name="shield-check" size={18} color="#2563eb" />
                  </div>
                  <div className="clayo-mockup__val">99.9% Reliable</div>
                </div>
                <h3 className="clayo-expertise__card-title">Our Commitment</h3>
                <p className="clayo-expertise__card-desc">
                  At AccoreLab, we are committed to delivering exceptional value to our clients, partners, and stakeholders
                  through long-term relationships based on trust, transparency, and mutual success.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action & Footer */}
        <Cta global={global} />
      </main>
      <Footer global={global} />
    </>
  );
}
