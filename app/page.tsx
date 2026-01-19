import { Metadata } from "next";
import { Banner } from "@/components/Banner";
import { Section } from "@/components/Section";
import { ContactForm } from "@/components/ContactForm";
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
  openGraph: {
    title: seoDefaults.defaultTitle,
    description: seoDefaults.defaultDescription,
    url: seoDefaults.siteUrl,
    type: "website",
    images: [
      {
        url: seoDefaults.defaultOgImage,
        width: 1200,
        height: 630,
        alt: seoDefaults.siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seoDefaults.defaultTitle,
    description: seoDefaults.defaultDescription,
    images: [seoDefaults.defaultOgImage],
  },
};

export default function Home() {
  return (
    <main>
      <div className="vf-block" id="hero">
        <Banner />
      </div>

      <hr />

      <div className="vf-block" id="what-we-do">
        <Section data={whatWeDoData} />
      </div>

      <div className="vf-block" id="who-we-serve">
        <Section data={whoWeServeData} />
      </div>

      <div className="vf-block" id="ai-alignment">
        <Section data={aiAlignmentData} />
      </div>

      <div className="vf-block" id="giving-back">
        <Section data={givingBackData} />
      </div>

      <div className="vf-block" id="about">
        <Section data={aboutData} />
      </div>

      <div className="vf-block" id="contact">
        <Section data={contactData}>
          <ContactForm />
        </Section>
      </div>
    </main>
  );
}