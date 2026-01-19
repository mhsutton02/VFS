import { Metadata } from "next";
import Link from "next/link";
import seoDefaults from "@/content/seo_defaults.json";

export const metadata: Metadata = {
  title: `Message Sent | ${seoDefaults.siteName}`,
  description: "Thank you for contacting ValorForge Solutions. We'll be in touch soon.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SuccessPage() {
  return (
    <main>
      <div className="vf-block">
        <section className="vf-section">
          <div className="vf-container">
            <div className="vf-section-intro">
              <h1 className="vf-section-title">Message Sent Successfully</h1>
              <p className="vf-section-intro-text">
                Thank you for reaching out to ValorForge Solutions. We've received your message and will respond within 24-48 hours.
              </p>
            </div>
            <div className="vf-section-footer">
              <Link href="/" className="vf-btn vf-btn-primary">
                Return Home
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}