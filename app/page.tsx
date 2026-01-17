// app/page.tsx
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { HeroSection } from "../components/HeroSection";
import { CarouselSection } from "../components/CarouselSection";
import { AboutSection } from "../components/AboutSection";
import { ContactSection } from "../components/ContactSection";

import whatWeDo from "../content/what_we_do.json";
import whoWeServe from "../content/who_we_serve.json";  // fixed file name case (was who_we_Serve)
import aiAlignment from "../content/ai_alignment.json";

import Image from 'next/image';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />

        {/* Carousel 1: what-we-do */}
        <CarouselSection
          id="what-we-do"
          imageSrc="/assets/img/whatwedo.jpg"
          imageAlt={whatWeDo.imageAlt}
          title={whatWeDo.title}
          intro={whatWeDo.intro}
          ctaText={whatWeDo.bottomCta}
          items={whatWeDo.cards}
        />

        {/* Carousel 2: who-we-serve */}
        <CarouselSection
          id="who-we-serve"
          imageSrc="/assets/img/whoweserve.jpg"
          imageAlt={whoWeServe.imageAlt}
          title={whoWeServe.title}
          intro={whoWeServe.intro}
          ctaText={whoWeServe.bottomCta}
          items={whoWeServe.cards}
        />

        {/* Carousel 3: ai-alignment */}
        <CarouselSection
          id="ai-alignment"
          imageSrc="/assets/img/aialigned.jpg"
          imageAlt={aiAlignment.imageAlt}
          title={aiAlignment.title}
          intro={aiAlignment.intro}
          ctaText={aiAlignment.bottomCta}
          items={aiAlignment.cards}
        />

        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}