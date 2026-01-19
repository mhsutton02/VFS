import { Metadata } from "next";
import { Section } from "@/components/Section";
import modernizationData from "@/content/capabilities/modernization-integration.json";
import seoDefaults from "@/content/seo_defaults.json";

export const metadata: Metadata = {
  title: `${modernizationData.title} | ${seoDefaults.siteName}`,
  description: modernizationData.intro,
  alternates: {
    canonical: `${seoDefaults.siteUrl}/capabilities/modernization-integration`,
  },
  openGraph: {
    title: `${modernizationData.title} | ${seoDefaults.siteName}`,
    description: modernizationData.intro,
    url: `${seoDefaults.siteUrl}/capabilities/modernization-integration`,
    type: "website",
  },
};

export default function ModernizationIntegrationPage() {
  return (
    <main>
      <div className="vf-block">
        <Section data={modernizationData} />
      </div>
    </main>
  );
}