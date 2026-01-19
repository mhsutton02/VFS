import { Metadata } from "next";
import { Section } from "@/components/Section";
import programDeliveryData from "@/content/capabilities/program-delivery.json";
import seoDefaults from "@/content/seo_defaults.json";

export const metadata: Metadata = {
  title: `${programDeliveryData.title} | ${seoDefaults.siteName}`,
  description: programDeliveryData.intro,
  alternates: {
    canonical: `${seoDefaults.siteUrl}/capabilities/program-delivery`,
  },
  openGraph: {
    title: `${programDeliveryData.title} | ${seoDefaults.siteName}`,
    description: programDeliveryData.intro,
    url: `${seoDefaults.siteUrl}/capabilities/program-delivery`,
    type: "website",
  },
};

export default function ProgramDeliveryPage() {
  return (
    <main>
      <div className="vf-block">
        <Section data={programDeliveryData} />
      </div>
    </main>
  );
}