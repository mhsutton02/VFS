import { Metadata } from "next";
import { Section } from "../../components/section";
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
      <div className="vf-block">
        <Section data={givingBackData} />
      </div>
    </main>
  );
}