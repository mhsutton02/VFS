import { Metadata } from "next";
import { Section } from "../../components/section";
import aboutData from "../../content/about.json";
import seoDefaults from "../../content/seo_defaults.json";

export const metadata: Metadata = {
  title: `${aboutData.title} | ${seoDefaults.siteName}`,
  description: aboutData.intro,
  alternates: {
    canonical: `${seoDefaults.siteUrl}/about`,
  },
  openGraph: {
    title: `${aboutData.title} | ${seoDefaults.siteName}`,
    description: aboutData.intro,
    url: `${seoDefaults.siteUrl}/about`,
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <main>
      <div className="vf-block">
        <Section data={aboutData}>
          <div className="vf-section-footer">
            <a href="/#hero" className="vf-btn vf-btn-secondary">Home</a>
            <a href="/what-we-do" className="vf-btn vf-btn-primary">Learn More</a>
            <a href="/#contact" className="vf-btn vf-btn-secondary">Contact Us</a>
          </div>
        </Section>
      </div>
    </main>
  );
}