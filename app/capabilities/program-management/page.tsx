// app/capabilities/program-management/page.tsx
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import { Breadcrumb } from "../../../components/Breadcrumb";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import content from "../../../content/program_management.json";

export const metadata: Metadata = {
  title: content.seoTitle,
  description: content.seoDescription,
  alternates: { canonical: "https://valorforgesolutions.com/capabilities/program-management" },
  openGraph: {
    title: content.seoTitle,
    description: content.seoDescription,
    url: "https://valorforgesolutions.com/capabilities/program-management",
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

export default function ProgramManagementPage() {
  const bgClasses = [
    "vf-bg-default",
    "vf-bg-gold-accent",
    "vf-bg-blue-accent",
    "vf-bg-default",
    "vf-bg-gold-accent",
  ];

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
              alt="Federal program management and delivery"
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

        {/* Content Sections */}
        {content.sections.map((section, idx) => (
          <section
            key={section.id}
            id={section.id}
            className={`vf-section ${bgClasses[idx] || "vf-bg-default"} vf-content-section`}
          >
            <div className="vf-container">
              <h2 className="vf-h2">{section.heading}</h2>
              <p className="vf-body">{section.body}</p>

              {section.capabilities && section.capabilities.length > 0 && (
                <div className="vf-capability-list">
                  {section.capabilities.map((cap) => (
                    <div key={cap.title} className="vf-capability-item">
                      <div className="vf-capability-icon">{cap.icon}</div>
                      <div>
                        <div className="vf-capability-title">{cap.title}</div>
                        <div className="vf-capability-body">{cap.body}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Credentials row on the cybersecurity section */}
              {section.id === "cybersecurity-compliance" && (
                <>
                  <div className="vf-credentials-row" style={{ marginTop: "32px" }}>
                    {content.credentials.map((cred) => (
                      <div key={cred.title} className="vf-credential-badge">
                        <div className="vf-credential-badge-title">{cred.title}</div>
                        <div className="vf-credential-badge-sub">{cred.subtitle}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}
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
