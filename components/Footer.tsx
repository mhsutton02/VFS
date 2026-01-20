"use client";

import Link from "next/link";
import footerData from "../content/footer.json";

export function Footer() {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getSocialIcon = (icon: string) => {
    const icons: { [key: string]: string } = {
      in: "in",
      tw: "𝕏",
      gh: "⚙",
    };
    return icons[icon] || icon;
  };

  return (
    <footer className="vf-site-footer">
      <div className="vf-footer-inner">
        <div className="vf-footer-contact">
          <div className="vf-footer-contact-company">
            {footerData.contact.company}
          </div>
          <div className="vf-footer-contact-item">
            {footerData.contact.address}
          </div>
          <div className="vf-footer-contact-item">
            <a href={`mailto:${footerData.contact.email}`}>
              {footerData.contact.email}
            </a>
          </div>
        </div>

        <div className="vf-footer-back-to-top">
          <button className="vf-btn-back-to-top" onClick={handleBackToTop}>
            Back to Top
          </button>
        </div>

        <div className="vf-footer-social">
          {footerData.social.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="vf-footer-social-link"
              aria-label={social.name}
              title={social.name}
            >
              {getSocialIcon(social.icon)}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}