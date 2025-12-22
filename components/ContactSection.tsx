// components/ContactSection.tsx
import Image from "next/image";
import contactContent from "@/content/contact.json";
import { ContactForm } from "./ContactForm";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="vf-section vf-section-alt"
    >
      <div className="vf-container vf-section-grid vf-section-grid-even contact-grid">
        <div className="vf-section-media">
          <Image
            src="/assets/img/pexels-tara-winstead-8386440.jpg"
            alt={contactContent.imageAlt}
            className="vf-media-img"
            width={800}
            height={600}
          />
        </div>
        <div>
          <h2 className="vf-h2">
            {contactContent.title}
          </h2>
          <p className="vf-body">
            {contactContent.intro}
          </p>

          {/* No address/phone/email; only form */}
          <ContactForm />
          <p className="fineprint">
            By submitting, you agree we may contact you at
            the email provided.
          </p>
        </div>
      </div>
    </section>
  );
}