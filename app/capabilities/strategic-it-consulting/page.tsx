import { Metadata } from "next";
import { Banner } from "@/components/Banner";
import { Section } from "@/components/Section";
import { ContactForm } from "@/components/ContactForm";
import bannerData from "@/content/banner.json";
import contentData from "@/content/capabilities/strategic-it-consulting.json";
import contactData from "@/content/contact.json";

export const metadata: Metadata = {
  title: "Strategic IT Consulting | ValorForge Solutions",
  description: "End-to-end IT strategy and execution for complex technology portfolios.",
};

export default function StrategicITConsultingPage() {
  return (
    <main>
      <div className="vf-block" id="banner">
        <Banner data={bannerData} />
      </div>

      <hr />

      <div className="vf-block" id="content">
        <Section data={contentData} />
      </div>

      <hr />

      <div className="vf-block" id="contact">
        <Section data={contactData}>
          <ContactForm />
        </Section>
      </div>
    </main>
  );
}