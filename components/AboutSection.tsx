import { Carousel } from "./Carousel";
import aboutContent from "../content/about.json";
import { SectionFrames } from "./SectionFrames";

export function AboutSection() {
  return (
    <section id="about" className="vf-section vf-section-alt vf-section-carousels-alt">
      <div className="vf-container" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <SectionFrames
          TOP={
            <div>
              <h2 className="vf-h2">{aboutContent.title}</h2>
              <p className="vf-body">{aboutContent.intro}</p>
            </div>
          }
          MID={
            <Carousel items={aboutContent.cards} ariaLabel="About carousel" />
          }
          BUT={
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <a href="/contact" className="vf-btn vf-btn-primary">Contact Us</a>
              <a href="#about" className="vf-btn vf-btn-ghost">Learn More</a>
              <a href="/" className="vf-btn vf-btn-ghost" aria-label="Home" style={{ minWidth: 60 }}>Home</a>
            </div>
          }
        />
      </div>
    </section>
  );
}