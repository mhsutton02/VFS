// components/GivingBackSection.tsx
import Image from "next/image";
import givingBackContent from "../content/giving_back.json";

export function GivingBackSection() {
  return (
    <section id="giving-back" className="vf-section vf-section-alt">
      <div className="vf-container vf-section-grid">
        <div>
          <h2 className="vf-h2">{givingBackContent.title}</h2>
          <p className="vf-body">{givingBackContent.intro}</p>
          <div className="vf-section-bottom">
            <a href="/contact" className="vf-btn vf-btn-ghost">
              {givingBackContent.bottomCta}
            </a>
          </div>
        </div>
        <div className="vf-section-media">
          <Image
            src="/assets/img/partners.png"
            alt={givingBackContent.imageAlt}
            className="vf-media-img"
            width={800}
            height={600}
          />
        </div>
      </div>
    </section>
  );
}
