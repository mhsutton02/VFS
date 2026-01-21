import { Metadata } from "next";
import { Banner } from "../../components/banner";
import { Section } from "../../components/section";
import bannerData from "../../content/banner.json";
import givingBackData from "../../content/giving_back.json";
import seoDefaults from "../../content/seo_defaults.json";

export const metadata: Metadata = {
  title: `${givingBackData.title} | ${seoDefaults.siteName}`,
  description: givingBackData.intro,
  alternates: {
    canonical: `${seoDefaults.siteUrl}/giving-back`,
  },
  openGraph: {
    title: `${givingBackData.title} | ${seoDefaults.siteName}`,
    description: givingBackData.intro,
    url: `${seoDefaults.siteUrl}/giving-back`,
    type: "website",
  },
};

export default function GivingBackPage() {
  return (
    <main>
      <div className="vf-block" id="banner">
        <Banner data={bannerData} />
      </div>

      <hr />

      <div className="vf-block">
        <Section data={givingBackData}>
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