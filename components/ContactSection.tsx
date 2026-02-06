// components/ContactSection.tsx
import contactContent from "../content/contact.json";
import { ContactForm } from "./ContactForm";

export function ContactSection() {
  return (
    <section id="contact" className="vf-section vf-section--contact vf-bg-default">
      <div className="vf-container vf-contact-grid">
        <div className="vf-contact-info">
          <h2 className="vf-h2">{contactContent.title}</h2>
          <p className="vf-body">{contactContent.intro}</p>

          <div className="vf-contact-details">
            <div className="vf-contact-detail">
              <span className="vf-contact-detail-label">Location</span>
              <span className="vf-contact-detail-value">Rockwall, TX</span>
            </div>
            <div className="vf-contact-detail">
              <span className="vf-contact-detail-label">Classification</span>
              <span className="vf-contact-detail-value">SDVOSB</span>
            </div>
            <div className="vf-contact-detail">
              <span className="vf-contact-detail-label">Status</span>
              <span className="vf-contact-detail-value vf-status-ready">Mission Ready</span>
            </div>
          </div>
        </div>

        <div role="region" aria-labelledby="contact-heading">
          <h2 id="contact-heading" className="sr-only">
            Contact Form
          </h2>
          <ContactForm />
          <p className="fineprint">
            By submitting, you agree we may contact you at the email provided.
          </p>
        </div>
      </div>
    </section>
  );
}