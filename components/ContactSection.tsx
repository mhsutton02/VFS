// components/ContactSection.tsx
import Image from "next/image";
import contactContent from "../content/contact.json";
import { ContactForm } from "./ContactForm";

export function ContactSection() {
  return (
    <section id="contact" className="vf-section vf-section-alt">
      <div className="vf-container vf-section-grid vf-section-grid-even contact-grid">
        {/* Image – optimize for mobile (#1) */}
        <div className="vf-section-media">
          <Image
            src="/assets/img/contact1.jpg"
            alt={contactContent.imageAlt}
            className="vf-media-img"
            width={800}
            height={600}
            // NEW: lazy loading (below fold on most pages) – saves mobile data (#3)
            loading="lazy"
            // NEW: responsive sizes – full width on mobile, half on desktop
            sizes="(max-width: 768px) 100vw, 50vw"
            // NEW: quality balance for good compression
            quality={85}
            // Optional: add priority if this section is above fold on some pages
            // priority={false} // default is lazy anyway
          />
        </div>

        <div>
          <h2 className="vf-h2">{contactContent.title}</h2>
          <p className="vf-body">{contactContent.intro}</p>

          {/* Form wrapper – add role & aria for accessibility (#6) */}
          <div role="region" aria-labelledby="contact-heading">
            <h2 id="contact-heading" className="sr-only">
              Contact Form
            </h2>
            <ContactForm />
          </div>

          <p className="fineprint">
            By submitting, you agree we may contact you at the email provided.
          </p>
        </div>
      </div>
    </section>
  );
}