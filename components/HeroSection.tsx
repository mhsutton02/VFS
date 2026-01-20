import heroContent from "../content/hero.json";
import { SectionFrames } from "./SectionFrames";

export function HeroSection() {
  return (
    <section id="hero" className="vf-section">
      <div className="vf-container">
        <div className="vf-section-frames">
          <div className="vf-frame-top">
            <div className="vf-kicker">{heroContent.kicker}</div>
            <h1 className="vf-h1">
              <span className="vf-accent">{heroContent.headline}</span>
            </h1>
            <p className="vf-body">{heroContent.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}