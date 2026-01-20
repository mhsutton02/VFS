import { Metadata } from "next";
import { Section } from "../../components/section";
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
      <div className="vf-block">
        <Section data={whoWeServeData} />
      </div>
    </main>
  );
}