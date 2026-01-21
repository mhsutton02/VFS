import { Metadata } from "next";
import { Banner } from "../../components/banner";
import { Section } from "../../components/section";
import bannerData from "../../content/banner.json";
import whatWeDoData from "../../content/what_we_do.json";
import seoDefaults from "../../content/seo_defaults.json";

export const metadata: Metadata = {
  title: `${whatWeDoData.title} | ${seoDefaults.siteName}`,
  description: whatWeDoData.intro,
  alternates: {
    canonical: `${seoDefaults.siteUrl}/what-we-do`,
  },
  openGraph: {
    title: `${whatWeDoData.title} | ${seoDefaults.siteName}`,
    description: whatWeDoData.intro,
    url: `${seoDefaults.siteUrl}/what-we-do`,
    type: "website",
  },
};

export default function WhatWeDoPage() {
  return (
    <main>
      <div className="vf-block" id="banner">
        <Banner data={bannerData} />
      </div>

      <hr />

      <div className="vf-block">
        <Section data={whatWeDoData}>
          <div className="vf-section-footer">
            <a href="/" className="vf-btn vf-btn-secondary">Home</a>
            <a href="/#contact" className="vf-btn vf-btn-primary">Contact Us</a>
          </div>
        </Section>
      </div>
    </main>
  );
}