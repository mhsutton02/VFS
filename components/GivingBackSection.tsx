// components/GivingBackSection.tsx
import Image from "next/image";
import givingBack from "../content/giving_back.json";

export function GivingBackSection() {
  return (
    <section
      id="giving-back"
      className="vf-section vf-bg-gold-accent"
    >
      <div className="vf-container" style={{ textAlign: "center" }}>
        <h2 className="vf-h2">{givingBack.title}</h2>
        <p className="vf-body" style={{ maxWidth: "none", margin: "0 auto 18px" }}>{givingBack.intro}</p>

        <div className="vf-partners-logos">
          {givingBack.partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${partner.name} website`}
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={200}
                height={50}
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}