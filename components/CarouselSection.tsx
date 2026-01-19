import { Carousel, CarouselItem } from "./Carousel";
import { SectionFrames } from "./SectionFrames";

type CarouselSectionProps = {
  id: string;
  altBackground?: boolean;
  reverse?: boolean;
  imageSrc: string;
  imageAlt: string;
  title: string;
  intro: string;
  ctaText: string;
  items: CarouselItem[];
};

export function CarouselSection({
  id,
  altBackground,
  reverse,
  imageSrc,
  imageAlt,
  title,
  intro,
  ctaText,
  items
}: CarouselSectionProps) {
  const sectionBgClass = altBackground
    ? "vf-section vf-section-carousels vf-section-carousels-alt"
    : "vf-section vf-section-carousels";

  return (
    <section id={id} className={sectionBgClass}>
      <div className="vf-container" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <SectionFrames
          TOP={
            <div>
              <h2 className="vf-h2">{title}</h2>
              <p className="vf-body">{intro}</p>
            </div>
          }
          MID={
            <div style={{ width: "100%" }}>
              <Carousel
                items={items}
                ariaLabel={title + " carousel"}
              />
            </div>
          }
          BUT={
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <a href="/contact" className="vf-btn vf-btn-primary">Contact Us</a>
              <a href={`#${id}`} className="vf-btn vf-btn-ghost">Learn More</a>
              <a href="/" className="vf-btn vf-btn-ghost" aria-label="Home" style={{ minWidth: 60 }}>Home</a>
            </div>
          }
        />
      </div>
    </section>
  );
}