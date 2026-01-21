interface HeroData {
  kicker: string;
  headline: string;
  body: string;
  ctas?: {
    label: string;
    type: string;
    href: string;
    priority: string;
  }[];
}

interface HeroSectionProps {
  data: HeroData;
}

export function HeroSection({ data }: HeroSectionProps) {
  return (
    <section id="hero" className="vf-section">
      <div className="vf-container">
        <div className="vf-section-frames">
          <div className="vf-frame-top">
            <div className="vf-kicker">{data.kicker}</div>
            <h1 className="vf-h1">
              <span className="vf-accent">{data.headline}</span>
            </h1>
            <p className="vf-body">{data.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}