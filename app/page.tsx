// app/page.tsx
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { CarouselSection } from "../components/CarouselSection";
import { AboutSection } from "../components/AboutSection";
import { ContactSection } from "../components/ContactSection";
import { GivingBackSection } from "../components/GivingBackSection";
import { HeroSection } from "../components/HeroSection";

import whatWeDo from "../content/what_we_do.json";
import whoWeServe from "../content/who_we_serve.json";
import aiAlignment from "../content/ai_alignment.json";

import Image from 'next/image';



export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />

        <CarouselSection
          id="what-we-do"
          imageSrc="/assets/img/whatwedo.jpg"
          imageAlt={whatWeDo.imageAlt}
          title={whatWeDo.title}
          intro={whatWeDo.intro}
          ctaText={whatWeDo.bottomCta}
          ctaHref="/construction"
          items={whatWeDo.cards}
        />

        <CarouselSection
          id="who-we-serve"
          imageSrc="/assets/img/whoweserve.jpg"
          imageAlt={whoWeServe.imageAlt}
          title={whoWeServe.title}
          intro={whoWeServe.intro}
          ctaText={whoWeServe.bottomCta}
          ctaHref="/construction"
          items={whoWeServe.cards}
        />

        <CarouselSection
          id="ai-alignment"
          imageSrc="/assets/img/aialigned.jpg"
          imageAlt={aiAlignment.imageAlt}
          title={aiAlignment.title}
          intro={aiAlignment.intro}
          ctaText={aiAlignment.bottomCta}
          ctaHref="/construction"
          items={aiAlignment.cards}
        />

        <GivingBackSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}