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
        {/* Text + carousel first */}
        <div>
          <h2 className="vf-h2">{aboutContent.title}</h2>
          <p className="vf-body">{aboutContent.intro}</p>
          <Carousel items={aboutContent.cards} ariaLabel="About carousel" />

          {/* Space below carousel before image */}
          <div style={{ height: "48px" }} />
        </div>

        {/* Image now below – same constrained width as Who We Serve */}
        <div
          className="vf-section-media"
          style={{
            maxWidth: "320px",
            margin: "0 auto",
          }}
        >
<Image
  src="/assets/img/aboutnew.jpg"
  alt={aboutContent.imageAlt}
  className="vf-media-img"
  width={400}           // max width: 400px
  height={300}          // max height: 300px (maintains 4:3 ratio)
  loading="lazy"
  sizes="(max-width: 400px) 100vw, 50vw"
  quality={85}
  style={{ maxWidth: '400px', maxHeight: '300px', width: '100%', height: 'auto' }}  // enforces max dimensions
/>
        </div>
      </div>
    </section>
  );
}
