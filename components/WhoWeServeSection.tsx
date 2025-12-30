// components/WhoWeServeSection.tsx
import Image from "next/image";
import whoWeServe from "../content/who_we_serve.json";

export function WhoWeServeSection() {
  return (
    <section id="who-we-serve" className="vf-section vf-section-carousels vf-section-alt">
      <div className="vf-container vf-section-grid">
        <div>
          <h2 className="vf-h2">{whoWeServe.title}</h2>
          <p className="vf-body">{whoWeServe.intro}</p>
          <ul className="vf-list">
            {whoWeServe.cards.map((c: any) => (
              <li key={c.id}>
                <h3 className="vf-h3">{c.title}</h3>
                <p className="vf-body">{c.body}</p>
              </li>
            ))}
          </ul>
          <div className="vf-section-bottom">
            <a href="/contact" className="vf-btn vf-btn-ghost">
              {whoWeServe.bottomCta}
            </a>
          </div>
        </div>
        <div className="vf-section-media">
          <Image
            src="/assets/img/samuel-schroth-hyPt63Df3Dw-unsplash.jpg"
            alt={whoWeServe.imageAlt}
            className="vf-media-img"
            width={800}
            height={600}
          />
        </div>
      </div>
    </section>
  );
}
