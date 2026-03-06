// app/capabilities/federal-broadband/page.tsx
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import content from "../../../content/federal_broadband.json";

export const metadata: Metadata = {
  title: content.seoTitle,
  description: content.seoDescription,
  alternates: { canonical: "https://valorforgesolutions.com/capabilities/federal-broadband" },
  openGraph: {
    title: content.seoTitle,
    description: content.seoDescription,
    url: "https://valorforgesolutions.com/capabilities/federal-broadband",
    type: "website",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: content.seoTitle,
    description: content.seoDescription,
    images: ["/og-image.jpg"],
  },
};

export default function FederalBroadbandPage() {
  const fabricOps = content.sections[0];
  const federalPrograms = content.sections[1];
  const stakeholder = content.sections[2];
  const transition = content.sections[3];
  const openData = content.sections[4];

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="vf-section vf-section-hero">
          <div className="vf-hero-bg">
            <Image
              src="/assets/img/hero.jpg"
              alt="Federal broadband program management"
              fill
              priority
              quality={75}
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="vf-hero-content">
            <div className="vf-hero-badge">{content.hero.badge}</div>
            <h1 className="vf-h1">{content.hero.headline}</h1>
            <p className="vf-lead">{content.hero.subheadline}</p>
            <Link href={content.hero.ctaHref} className="vf-btn vf-btn-primary">
              {content.hero.cta}
            </Link>
          </div>
        </section>

        {/* Section 1: Fabric Operations Experience */}
        <section id={fabricOps.id} className="vf-section vf-bg-default vf-content-section">
          <div className="vf-container">
            <h2 className="vf-h2">{fabricOps.heading}</h2>
            <div className="vf-kicker">{fabricOps.subheading}</div>
            <p className="vf-body">{fabricOps.body}</p>
          </div>
        </section>

        {/* Section 2: Federal Program Expertise + 6 cards */}
        <section id={federalPrograms.id} className="vf-section vf-bg-gold-accent vf-content-section">
          <div className="vf-container">
            <h2 className="vf-h2">{federalPrograms.heading}</h2>
            <div className="vf-kicker">{federalPrograms.subheading}</div>
            <p className="vf-body">{federalPrograms.body}</p>

            {"cards" in federalPrograms && (
              <div className="vf-card-grid">
                {(federalPrograms as typeof federalPrograms & { cards: Array<{ id: string; title: string; subtitle: string; funding: string; body: string }> }).cards.map((card) => (
                  <div key={card.id} className="vf-program-card">
                    <div className="vf-program-card-title">{card.title}</div>
                    <div className="vf-program-card-subtitle">{card.subtitle}</div>
                    {card.funding && (
                      <div className="vf-program-card-funding">{card.funding}</div>
                    )}
                    <div className="vf-program-card-body">{card.body}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Section 3: Stakeholder Engagement + stats */}
        <section id={stakeholder.id} className="vf-section vf-bg-blue-accent vf-content-section">
          <div className="vf-container">
            <h2 className="vf-h2">{stakeholder.heading}</h2>
            <div className="vf-kicker">{stakeholder.subheading}</div>
            <p className="vf-body">{stakeholder.body}</p>

            {"stats" in stakeholder && (
              <div className="vf-stat-row">
                {(stakeholder as typeof stakeholder & { stats: Array<{ value: string; label: string }> }).stats.map((stat) => (
                  <div key={stat.label} className="vf-stat-item">
                    <div className="vf-stat-value">{stat.value}</div>
                    <div className="vf-stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Section 4: Transition Management */}
        <section id={transition.id} className="vf-section vf-bg-default vf-content-section">
          <div className="vf-container">
            <h2 className="vf-h2">{transition.heading}</h2>
            <div className="vf-kicker">{transition.subheading}</div>
            <p className="vf-body">{transition.body}</p>
          </div>
        </section>

        {/* Section 5: Open Data */}
        <section id={openData.id} className="vf-section vf-bg-gold-accent vf-content-section">
          <div className="vf-container">
            <h2 className="vf-h2">{openData.heading}</h2>
            <div className="vf-kicker">{openData.subheading}</div>
            <p className="vf-body">{openData.body}</p>
          </div>
        </section>

        {/* Footer CTA */}
        <div className="vf-page-footer-cta">
          <p className="vf-lead">{content.footerCta.text}</p>
          <Link href={content.footerCta.buttonHref} className="vf-btn vf-btn-primary">
            {content.footerCta.buttonText}
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
