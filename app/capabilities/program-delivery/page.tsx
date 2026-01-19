import { Metadata } from "next";
import { Banner } from "@/components/Banner";
import { Section } from "@/components/Section";
import { ContactForm } from "@/components/ContactForm";
import bannerData from "@/content/banner.json";
import contentData from "@/content/capabilities/program-delivery.json";
import contactData from "@/content/contact.json";

export const metadata: Metadata = {
  title: "Program Delivery & PMO | ValorForge Solutions",
  description: "Disciplined program leadership for on-time, on-budget delivery.",
};

export default function ProgramDeliveryPage() {
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