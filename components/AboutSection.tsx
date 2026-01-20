import aboutContent from "../content/about.json";
import { SectionFrames } from "./SectionFrames";

export function AboutSection() {
  return (
    <section id="about" className="vf-section vf-section-alt">
      <div className="vf-container" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <SectionFrames
          TOP={
            <div>
              <h2 className="vf-h2">{aboutContent.title}</h2>
              <p className="vf-body">{aboutContent.intro}</p>
            </div>
          }
          MID={
            <div className="vf-section-cards" style={{ marginTop: 24 }}>
              {aboutContent.items?.map((item) => (
                <div className="vf-section-card" key={item.id}>
                  <h3 className="vf-section-card-title">{item.title}</h3>
                  <p className="vf-section-card-body">{item.body}</p>
                </div>
              ))}
            </div>
          }
          BUT={
            <div className="vf-section-nav about-nav-buttons">
              <a href="#hero" className="vf-btn vf-btn-primary about-nav-btn">
                Home
              </a>
              <a href="/what-we-do" className="vf-btn vf-btn-primary about-nav-btn">
                Learn More
              </a>
              <a href="/#contact" className="vf-btn vf-btn-primary about-nav-btn">
                Contact Us
              </a>
            </div>
          }
        />
        <hr style={{ margin: "32px 0 0 0" }} />
      </div>
    </section>
  );
}