import { Carousel } from "./Carousel";
import givingBack from "../content/giving_back.json";
import { SectionFrames } from "./SectionFrames";

export function GivingBackSection() {
  return (
    <section id="giving-back" className="vf-section vf-section-alt vf-section-carousels-alt vf-section-alt-bg">
      <div className="vf-container" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <SectionFrames
          TOP={
            <div>
              <h2 className="vf-h2">{givingBack.title}</h2>
              <p className="vf-body">{givingBack.intro}</p>
            </div>
          }
          MID={
            <Carousel items={givingBack.cards} ariaLabel={givingBack.title + " carousel"} />
          }
          BUT={
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <a href="/contact" className="vf-btn vf-btn-primary">Contact Us</a>
              <a href="#giving-back" className="vf-btn vf-btn-ghost">Learn More</a>
              <a href="/" className="vf-btn vf-btn-ghost" aria-label="Home" style={{ minWidth: 60 }}>Home</a>
            </div>
          }
        />
      </div>
    </section>
  );
}