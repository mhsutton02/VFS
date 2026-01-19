import contactContent from "../content/contact.json";
import { ContactForm } from "./ContactForm";
import { SectionFrames } from "./SectionFrames";

export function ContactSection() {
  return (
    <section id="contact" className="vf-section vf-section-alt vf-section-alt-bg">
      <div className="vf-container" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <SectionFrames
          FORM={
            <div style={{ height: "7.5in", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <h2 className="vf-h2">{contactContent.title}</h2>
              <p className="vf-body">{contactContent.intro}</p>
              <div role="region" aria-labelledby="contact-heading">
                <h2 id="contact-heading" className="sr-only">Contact Form</h2>
                <ContactForm />
              </div>
            </div>
          }
          BUT={
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              {/* Only show Home on Contact page */}
              <a href="/" className="vf-btn vf-btn-ghost" aria-label="Home" style={{ minWidth: 60 }}>Home</a>
            </div>
          }
        />
      </div>
    </section>
  );
}