// app/leadership/page.tsx
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import leadership from "../../content/leadership.json";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leadership",
  description: "Meet Daryl Wilkerson, Managing Partner of ValorForge Solutions. Retired Navy Commander and cybersecurity executive with 20+ years leading enterprise IT transformation.",
  openGraph: {
    title: "Leadership | ValorForge Solutions",
    description: "Meet Daryl Wilkerson, Managing Partner of ValorForge Solutions. Retired Navy Commander and cybersecurity executive with 20+ years leading enterprise IT transformation.",
    url: "https://valorforgesolutions.com/leadership",
    type: "website",
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leadership | ValorForge Solutions',
    description: 'Meet Daryl Wilkerson, Managing Partner of ValorForge Solutions. Retired Navy Commander and cybersecurity executive with 20+ years leading enterprise IT transformation.',
    images: ['/og-image.jpg'],
  },
};

export default function LeadershipPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="vf-section vf-section-hero">
          <div className="vf-container">
            <div className="vf-kicker">Meet the Team</div>
            <h1 className="vf-h1">{leadership.title}</h1>
            <p className="vf-lead">{leadership.intro}</p>
          </div>
        </section>

        {/* Leader Bio Sections */}
        {leadership.leaders.map((leader, index) => {
          const imageLeft = index % 2 === 0;
          const gridClass = imageLeft ? "vf-grid-image-left" : "vf-grid-image-right";
          const bgClass = imageLeft ? "vf-bg-default" : "vf-bg-gold-accent";

          const imageBlock = (
            <div className="vf-section-media vf-leader-photo">
              <Image
                src={leader.imagePath}
                alt={`${leader.name} — ${leader.title}`}
                className="vf-media-img"
                width={600}
                height={600}
                loading="lazy"
                sizes="(max-width: 980px) 100vw, 50vw"
                quality={85}
                style={{ objectFit: "cover", aspectRatio: "1 / 1" }}
              />
            </div>
          );

          const bioBlock = (
            <div>
              <h2 className="vf-h2">{leader.name}</h2>
              <div className="vf-kicker" style={{ color: "var(--accent)" }}>
                {leader.title}
              </div>
              <p className="vf-body">{leader.paragraph1}</p>
              <p className="vf-body">{leader.paragraph2}</p>
            </div>
          );

          return (
            <section
              key={leader.id}
              id={leader.id}
              className={`vf-section ${bgClass}`}
            >
              <div className={`vf-container ${gridClass}`}>
                {imageLeft ? (
                  <>
                    {imageBlock}
                    {bioBlock}
                  </>
                ) : (
                  <>
                    {bioBlock}
                    {imageBlock}
                  </>
                )}
              </div>
            </section>
          );
        })}
      </main>
      <Footer />
    </>
  );
}
