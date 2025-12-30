// components/AboutSection.tsx
import Image from "next/image";
import aboutContent from "../content/about.json";
import { Carousel } from "./Carousel";

export function AboutSection() {
  return (
    <section
      id="about"
      className="vf-section vf-section-alt vf-section-carousels-alt"
    >
      <div className="vf-container vf-section-grid-even">
        <div className="vf-section-media">
          <Image
            src="/assets/img/generated-image-1.png"
            alt={aboutContent.imageAlt}
            className="vf-media-img"
            width={800}
            height={600}
          />
        </div>
        <div>
          <h2 className="vf-h2">{aboutContent.title}</h2>
          <p className="vf-body">{aboutContent.intro}</p>
          <Carousel items={aboutContent.cards} ariaLabel="About carousel" />
          <div className="vf-section-bottom">
            <a href="/#contact" className="vf-btn vf-btn-ghost">
              {aboutContent.bottomCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}