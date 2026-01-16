// app/page.tsx
import { Header } from "../components/Header.tsx";
import { Footer } from "../components/Footer";
import { HeroSection } from "../components/HeroSection";
import { CarouselSection } from "../components/CarouselSection";
import { AboutSection } from "../components/AboutSection";
import { ContactSection } from "../components/ContactSection";

import whatWeDo from "../content/what_we_do.json";
import whoWeServe from "../content/who_we_Serve.json";
import aiAlignment from "../content/ai_alignment.json";

// NEW: Import Image from next/image (for priority #1 in child components if needed here)
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
          imageSrc="/assets/img/getty-images-MCOxTPW6MJI-unsplash.jpg"
          imageAlt={whatWeDo.imageAlt}
          title={whatWeDo.title}
          intro={whatWeDo.intro}
          ctaText={whatWeDo.bottomCta}
          items={whatWeDo.cards}
          // NEW: Add priority for above-fold LCP image (priority #1 perf win on mobile)
          priority={true}
          // Optional: If CarouselSection supports lazy, add loading="lazy" prop here too
        />

        {/* Carousel 2: who-we-serve */}
        <CarouselSection
          id="who-we-serve"
          reverse
          altBackground
          imageSrc="/assets/img/samuel-schroth-hyPt63Df3Dw-unsplash.jpg"
          imageAlt={whoWeServe.imageAlt}
          title={whoWeServe.title}
          intro={whoWeServe.intro}
          ctaText={whoWeServe.bottomCta}
          items={whoWeServe.cards}
          // NEW: No priority (below fold) → allow lazy loading
        />

        {/* Carousel 3: ai-alignment */}
        <CarouselSection
          id="ai-alignment"
          imageSrc="/assets/img/pexels-tara-winstead-8386440.jpg"
          imageAlt={aiAlignment.imageAlt}
          title={aiAlignment.title}
          intro={aiAlignment.intro}
          ctaText={aiAlignment.bottomCta}
          items={aiAlignment.cards}
          // NEW: Below fold, lazy by default
        />

        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}