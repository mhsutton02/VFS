// components/CarouselSection.tsx
import Image from "next/image";
import { Carousel, CarouselItem } from "./Carousel";

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
    ? "vf-section vf-bg-blue-accent"
    : "vf-section vf-bg-gold-accent";

  return (
    <section id={id} className={sectionBgClass}>
      <div
        className={`vf-container ${
          reverse ? "vf-grid-image-left" : "vf-grid-image-right"
        }`}
      >
        {!reverse && (
          <div className="vf-section-media">
            <Image
              src={imageSrc}
              alt={imageAlt}
              className="vf-media-img"
              width={800}
              height={600}
            />
          </div>
        )}

        <div className="relative">
          <h2 className="vf-h2">{title}</h2>
          <p className="vf-body">{intro}</p>
                <Carousel
                  items={items}
                  ariaLabel={title + " carousel"}
                />
        </div>

        {reverse && (
          <div className="vf-section-media">
            <Image
              src={imageSrc}
              alt={imageAlt}
              className="vf-media-img"
              width={800}
              height={600}
            />
          </div>
        )}
      </div>
    </section>
  );
}