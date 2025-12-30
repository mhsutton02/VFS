// app/page.tsx
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { HeroSection } from "../components/HeroSection";
import { CarouselSection } from "../components/CarouselSection";
import { WhoWeServeSection } from "../components/WhoWeServeSection";
import { AboutSection } from "../components/AboutSection";
import { GivingBackSection } from "../components/GivingBackSection";
// Contact moved to its own page: app/contact/page.tsx

import whatWeDo from "../content/what_we_do.json";
import whoWeServe from "../content/who_we_serve.json";
import aiAlignment from "../content/ai_alignment.json";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />

        <CarouselSection
          id="what-we-do"
          imageSrc="/assets/img/getty-images-MCOxTPW6MJI-unsplash.jpg"
          imageAlt={whatWeDo.imageAlt}
          title={whatWeDo.title}
          intro={whatWeDo.intro}
          ctaText={whatWeDo.bottomCta}
          items={whatWeDo.cards}
        />

        {/* LOCK: who-we-serve layout — text on the LEFT, image on the RIGHT. Do not change unless requested. */}
        <WhoWeServeSection />

        <CarouselSection
          id="ai-alignment"
          imageSrc="/assets/img/pexels-tara-winstead-8386440.jpg"
          imageAlt={aiAlignment.imageAlt}
          title={aiAlignment.title}
          intro={aiAlignment.intro}
          ctaText={aiAlignment.bottomCta}
          items={aiAlignment.cards}
        />
        <GivingBackSection />

        <AboutSection />
      </main>
      <Footer />
    </>
  );
}