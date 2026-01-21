import { Metadata } from "next";
import { Banner } from "../../components/banner";
import { Section } from "../../components/section";
import bannerData from "../../content/banner.json";
import aiAlignmentData from "../../content/ai_alignment.json";
import seoDefaults from "../../content/seo_defaults.json";

export const metadata: Metadata = {
  title: `${aiAlignmentData.title} | ${seoDefaults.siteName}`,
  description: aiAlignmentData.intro,
  alternates: {
    canonical: `${seoDefaults.siteUrl}/ai-alignment`,
  },
  openGraph: {
    title: `${aiAlignmentData.title} | ${seoDefaults.siteName}`,
    description: aiAlignmentData.intro,
    url: `${seoDefaults.siteUrl}/ai-alignment`,
    type: "website",
  },
};

export default function AiAlignmentPage() {
  return (
    <main>
      <div className="vf-block" id="banner">
        <Banner data={bannerData} />
      </div>

      <hr />

      <div className="vf-block">
        <Section data={aiAlignmentData}>
          <div className="vf-section-footer">
            <a href="/" className="vf-btn vf-btn-secondary">Home</a>
            <a href="/coming-soon" className="vf-btn vf-btn-primary">Learn More</a>
            <a href="/#contact" className="vf-btn vf-btn-secondary">Contact Us</a>
          </div>
        </Section>
      </div>
    </main>
  );
}