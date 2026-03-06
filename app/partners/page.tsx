// app/partners/page.tsx
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import partners from "../../content/partners.json";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "ValorForge Solutions partners with IQGeo, Aavya, and Blue Heron Defense to deliver geospatial network management, digital transformation, and CMMC 2.0 cybersecurity solutions.",
  alternates: { canonical: "https://valorforgesolutions.com/partners" },
  openGraph: {
    title: "Partners | ValorForge Solutions",
    description:
      "Technology and teaming partners powering federal broadband, digital transformation, and cybersecurity missions.",
    url: "https://valorforgesolutions.com/partners",
    type: "website",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Partners | ValorForge Solutions",
    description:
      "Technology and teaming partners powering federal broadband, digital transformation, and cybersecurity missions.",
    images: ["/og-image.jpg"],
  },
};

export default function PartnersPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="vf-section vf-section-hero">
          <div className="vf-container" style={{ position: "relative", zIndex: 2 }}>
            <div className="vf-kicker">Technology &amp; Teaming Partners</div>
            <h1 className="vf-h1">{partners.title}</h1>
            <p className="vf-lead">{partners.intro}</p>
          </div>
        </section>

        {/* Partner Cards */}
        <section className="vf-section vf-bg-gold-accent">
          <div className="vf-container">
            <div className="vf-partner-grid">
              {partners.partners.map((partner) => (
                <div key={partner.id} className="vf-partner-card">
                  <div className="vf-partner-card-logo">{partner.name}</div>
                  <div className="vf-partner-focus">{partner.focus}</div>
                  <p className="vf-body">{partner.body}</p>
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="vf-btn vf-btn-gold"
                  >
                    Visit {partner.name} →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="vf-section vf-bg-default vf-page-footer-cta">
          <div className="vf-container" style={{ textAlign: "center" }}>
            <h2 className="vf-h2">Interested in Partnering?</h2>
            <p className="vf-body" style={{ maxWidth: "600px", margin: "0 auto 24px" }}>
              We&apos;re always looking to connect with organizations that share our commitment to mission-focused execution.
            </p>
            <a href="/#contact" className="vf-btn vf-btn-gold">
              Get in Touch
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
