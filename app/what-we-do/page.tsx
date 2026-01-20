import { Metadata } from "next";
import { Section } from "../../components/section";
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
      <div className="vf-block">
        <Section data={whatWeDoData} />
      </div>
    </main>
  );
}