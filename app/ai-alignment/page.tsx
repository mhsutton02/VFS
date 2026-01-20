import { Metadata } from "next";
import { Section } from "../../components/section";
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
      <div className="vf-block">
        <Section data={aiAlignmentData} />
      </div>
    </main>
  );
}