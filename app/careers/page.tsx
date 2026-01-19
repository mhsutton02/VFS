import { Metadata } from "next";
import { Banner } from "@/components/Banner";
import { Section } from "@/components/Section";
import whatWeDoData from "@/content/what_we_do.json";
import whoWeServeData from "@/content/who_we_serve.json";
import aiAlignmentData from "@/content/ai_alignment.json";
import givingBackData from "@/content/giving_back.json";
import aboutData from "@/content/about.json";
import contactData from "@/content/contact.json";
import seoDefaults from "@/content/seo_defaults.json";

export const metadata: Metadata = {
  title: seoDefaults.defaultTitle,
  description: seoDefaults.defaultDescription,
  alternates: {
    canonical: seoDefaults.siteUrl,
  },
};

export default function Home() {
  return (
    <main>
      <div className="vf-block">
        <Banner />
      </div>

      <div className="vf-block">
        <Section data={whatWeDoData} />
      </div>

      <div className="vf-block">
        <Section data={whoWeServeData} />
      </div>

      <div className="vf-block">
        <Section data={aiAlignmentData} />
      </div>

      <div className="vf-block">
        <Section data={givingBackData} />
      </div>

      <div className="vf-block">
        <Section data={aboutData} />
      </div>

      <div className="vf-block" id="contact">
        <Section data={contactData}>
          {/* Existing contact form component goes here */}
          <p style={{ textAlign: "center", color: "var(--muted)" }}>
            [Contact form component will be integrated here]
          </p>
        </Section>
      </div>
    </main>
  );
}