// app/experience/page.tsx
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Breadcrumb } from "../../components/Breadcrumb";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import content from "../../content/experience.json";

export const metadata: Metadata = {
  title: content.seoTitle,
  description: content.seoDescription,
  alternates: { canonical: "https://valorforgesolutions.com/experience" },
  openGraph: {
    title: content.seoTitle,
    description: content.seoDescription,
    url: "https://valorforgesolutions.com/experience",
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

export default function ExperiencePage() {
  const bgClasses = ["vf-bg-default", "vf-bg-gold-accent", "vf-bg-blue-accent"];

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
              alt="ValorForge Solutions experience"
              fill
              priority
              quality={75}
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="vf-hero-content">
            <div className="vf-hero-badge">Mission-Driven Delivery</div>
            <h1 className="vf-h1">{content.headline}</h1>
            <p className="vf-lead">{content.intro}</p>
          </div>
        </section>

        {/* Case Studies */}
        {content.caseStudies.map((cs, idx) => (
          <section
            key={cs.id}
            id={cs.id}
            className={`vf-section ${bgClasses[idx] || "vf-bg-default"}`}
          >
            <div className="vf-container">
              <div className="vf-case-study">
                <div className="vf-case-label">{cs.label}</div>
                <h2 className="vf-h2">{cs.title}</h2>

                <div className="vf-case-sub-heading">Situation</div>
                <p className="vf-body">{cs.situation}</p>

                <div className="vf-case-sub-heading">Our Role</div>
                <p className="vf-body">{cs.role}</p>

                <div className="vf-case-sub-heading">Outcome</div>
                <div className="vf-case-outcome-placeholder">{cs.outcome}</div>

                <div className="vf-case-sub-heading">Capabilities Demonstrated</div>
                <ul className="vf-case-capabilities">
                  {cs.capabilities.map((cap) => (
                    <li key={cap}>{cap}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))}

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
