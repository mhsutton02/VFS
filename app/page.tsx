// app/page.tsx
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { CarouselSection } from "@/components/CarouselSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";

import whatWeDo from "@/content/whatWeDo.json";
import whoWeServe from "@/content/whoWeServe.json";
import aiAlignment from "@/content/aiAlignment.json";

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
        />

        <CarouselSection
          id="ai-alignment"
          imageSrc="/assets/img/pexels-tara-winstead-8386440.jpg"
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