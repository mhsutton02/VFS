import { Metadata } from "next";
import { Section } from "@/components/Section";
import strategicItData from "@/content/capabilities/strategic-it-consulting.json";
import seoDefaults from "@/content/seo_defaults.json";

export const metadata: Metadata = {
  title: `${strategicItData.title} | ${seoDefaults.siteName}`,
  description: strategicItData.intro,
  alternates: {
    canonical: `${seoDefaults.siteUrl}/capabilities/strategic-it-consulting`,
  },
  openGraph: {
    title: `${strategicItData.title} | ${seoDefaults.siteName}`,
    description: strategicItData.intro,
    url: `${seoDefaults.siteUrl}/capabilities/strategic-it-consulting`,
    type: "website",
  },
};

export default function StrategicItConsultingPage() {
  return (
    <main>
      <div className="vf-block">
        <Section data={strategicItData} />
      </div>
    </main>
  );
}