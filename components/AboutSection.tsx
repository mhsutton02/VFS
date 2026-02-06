// components/AboutSection.tsx
import Image from "next/image";
import aboutContent from "../content/about.json";
import { Carousel } from "./Carousel";

export function AboutSection() {
  return (
    <section
      id="about"
      className="vf-section vf-bg-blue-accent"
    >
      <div className="vf-container vf-grid-image-left">
        {/* Image first (left on desktop) — constrained to match text column height */}
        <div className="vf-section-media vf-about-media">
          {/* Desktop: soldier dress uniform photo */}
          <Image
            src="/assets/img/hero.jpg"
            alt="Military service members in dress uniform"
            className="vf-media-img vf-about-img-desktop"
            width={800}
            height={600}
            loading="lazy"
            sizes="(max-width: 980px) 0px, 50vw"
            style={{ objectPosition: 'center bottom' }}
          />
          {/* Mobile: abstract gold wave */}
          <Image
            src="/assets/img/contact1.jpg"
            alt="Abstract gold light waves"
            className="vf-media-img vf-about-img-mobile"
            width={800}
            height={450}
            loading="lazy"
            sizes="(max-width: 980px) 100vw, 0px"
          />
        </div>

        {/* Text + carousel */}
        <div>
          <h2 className="vf-h2">{aboutContent.title}</h2>
          <p className="vf-body">{aboutContent.intro}</p>
          <Carousel items={aboutContent.cards} ariaLabel="About carousel" />
        </div>
      </div>
    </section>
  );
}
