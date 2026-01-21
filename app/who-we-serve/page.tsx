import { Metadata } from "next";
import { Banner } from "../../components/banner";
import { Section } from "../../components/section";
import bannerData from "../../content/banner.json";
import whoWeServeData from "../../content/who_we_serve.json";
import seoDefaults from "../../content/seo_defaults.json";

export const metadata: Metadata = {
  title: `${whoWeServeData.title} | ${seoDefaults.siteName}`,
  description: whoWeServeData.intro,
  alternates: {
    canonical: `${seoDefaults.siteUrl}/who-we-serve`,
  },
  openGraph: {
    title: `${whoWeServeData.title} | ${seoDefaults.siteName}`,
    description: whoWeServeData.intro,
    url: `${seoDefaults.siteUrl}/who-we-serve`,
    type: "website",
  },
};

export default function WhoWeServePage() {
  return (
    <main>
      <div className="vf-block" id="banner">
        <Banner data={bannerData} />
      </div>

      <hr />

      <div className="vf-block">
        <Section data={whoWeServeData}>
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