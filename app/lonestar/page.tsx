// app/lonestar/page.tsx
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import content from "../../content/lonestar.json";
import ScrollReveal from "../../components/ScrollReveal"
import { Breadcrumb } from "../../components/Breadcrumb";

export const metadata: Metadata = {
  title: content.seoTitle,
  description: content.seoDescription,
  alternates: { canonical: "https://valorforgesolutions.com/lonestar" },
  openGraph: {
    title: content.seoTitle,
    description: content.seoDescription,
    url: "https://valorforgesolutions.com/lonestar",
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

export default function LonestarPage() {
  return (
    <>
      <Header />
      <Breadcrumb />
      <main>
        {/* Hero */}
        <section className="vf-section vf-section-hero">
          <div className="vf-hero-bg">
            <Image
              src="/assets/img/hero.jpg"
              alt="Lonestar commercial Palantir services"
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
          </div>
        </section>

        {/* Intro */}
        <ScrollReveal animation="vf-fadeInUp">
          <section className="vf-section vf-bg-default vf-content-section vf-texture-dots">
            <div className="vf-container">
              {content.intro.map((paragraph, i) => (
                <p key={i} className="vf-lead" style={{ textAlign: "center", fontSize: "18px", maxWidth: "52ch", margin: "0 auto 20px" }}>{paragraph}</p>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* Comparison Table */}
        <ScrollReveal animation="vf-scaleIn">
          <section id="comparison" className="vf-section vf-bg-blue-accent vf-content-section vf-texture-grid">
            <div className="vf-container">
              <h2 className="vf-h2">Competitor Comparison</h2>
              <table className="vf-comparison-table">
                <thead>
                  <tr>
                    <th>Capability</th>
                    {content.comparisonTable.competitors.map((comp) => (
                      <th key={comp}>{comp}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {content.comparisonTable.rows.map((row) => (
                    <tr key={row.capability}>
                      <td>{row.capability}</td>
                      {row.ratings.map((rating, i) => (
                        <td key={i}>{rating}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </ScrollReveal>

        {/* Advantages */}
        <ScrollReveal animation="vf-fadeInRight">
          <section id="advantages" className="vf-section vf-bg-gold-accent vf-content-section">
            <div className="vf-container">
              <h2 className="vf-h2">Disruptive Advantages</h2>
              <div className="vf-advantage-grid">
                {content.advantages.map((adv) => (
                  <div key={adv.header} className="vf-advantage-card">
                    <h3 className="vf-advantage-header">{adv.header}</h3>
                    <p className="vf-advantage-parenthetical">{adv.parenthetical}</p>
                    <p className="vf-advantage-body">{adv.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Closing Statement */}
        <ScrollReveal animation="vf-fadeInUp">
          <section className="vf-section vf-bg-default vf-content-section">
            <div className="vf-container">
              <p className="vf-lead" style={{ textAlign: "center", fontSize: "22px", maxWidth: "52ch", margin: "0 auto" }}>{content.closingStatement}</p>
            </div>
          </section>
        </ScrollReveal>

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
