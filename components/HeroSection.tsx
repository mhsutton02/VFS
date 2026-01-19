import Image from "next/image";
import heroContent from "../content/hero.json";
import { SectionFrames } from "./SectionFrames";

export function HeroSection() {
  return (
    <section id="hero" className="vf-section vf-section-hero vf-section-alt-bg">
      <div className="vf-container" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <SectionFrames
          TOP={
            <div>
              <div className="vf-kicker">{heroContent.kicker}</div>
              <h1 className="vf-h1">
                <span className="vf-accent">{heroContent.headlineLine1}</span>
              </h1>
              <p className="vf-body">{heroContent.body}</p>
            </div>
          }
          MID={
            <Image
              src="/assets/img/hero.jpg"
              alt={heroContent.imageAlt}
              width={800}
              height={600}
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
              priority
            />
          }
          BUT={
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <a href="/contact" className="vf-btn vf-btn-primary">Contact Us</a>
              <a href="#what-we-do" className="vf-btn vf-btn-ghost">Learn More</a>
              <a href="/" className="vf-btn vf-btn-ghost" aria-label="Home" style={{ minWidth: 60 }}>Home</a>
            </div>
          }
        />
      </div>
    </section>
  );
}