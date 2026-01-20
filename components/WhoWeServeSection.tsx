// components/WhoWeServeSection.tsx
import Image from "next/image";
import whoWeServe from "../content/who_we_serve.json";
import { Carousel } from "./Carousel";

export function WhoWeServeSection() {
  return (
    <section
      id="who-we-serve"
      className="vf-section vf-section-alt vf-section-carousels"
    >
      <div className="vf-container vf-section-grid vf-section-grid-even">
        {/* Text + carousel first */}
        <div>
          <h2 className="vf-h2">{whoWeServe.title}</h2>
          <p className="vf-body">{whoWeServe.intro}</p>
          <Carousel items={whoWeServe.items} ariaLabel="Who We Serve carousel" />

          {/* Space below carousel */}
          <div style={{ height: "48px" }} />
        </div>

        {/* Image frame – FIXED SIZE with object-fit: cover (matches About exactly) */}
        <div
          className="vf-section-media"
          style={{
            maxWidth: "640px",
            margin: "0 auto",
          }}
        >
        </div>
      </div>
    </section>
  );
}