// app/page.tsx
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { HeroSection } from "../components/HeroSection";
import { CarouselSection } from "../components/CarouselSection";
import { AboutSection } from "../components/AboutSection";
import { ContactSection } from "../components/ContactSection";
import { GivingBackSection } from "../components/GivingBackSection";
import ScrollReveal from "../components/ScrollReveal"
import SectionDivider from "../components/SectionDivider"

import whatWeDo from "../content/what_we_do.json";
import whoWeServe from "../content/who_we_serve.json";
import aiAlignment from "../content/ai_alignment.json";


export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />

        <ScrollReveal animation="vf-fadeInUp">
          <CarouselSection
            id="what-we-do"
            imageSrc="/assets/img/whatwedo.jpg"
            imageAlt={whatWeDo.imageAlt}
            title={whatWeDo.title}
            intro={whatWeDo.intro}
            ctaText={whatWeDo.bottomCta}
            items={whatWeDo.cards}
            reverse={false}
            altBackground={false}
            textureClass="vf-texture-dots"
          />
        </ScrollReveal>

        <ScrollReveal animation="vf-fadeInLeft">
          <CarouselSection
            id="who-we-serve"
            imageSrc="/assets/img/whoweserve.jpg"
            imageAlt={whoWeServe.imageAlt}
            title={whoWeServe.title}
            intro={whoWeServe.intro}
            ctaText={whoWeServe.bottomCta}
            items={whoWeServe.cards}
            reverse={true}
            altBackground={true}
            textureClass="vf-texture-grid"
          />
        </ScrollReveal>

        <SectionDivider variant="slant" color="#0a0a0a" />
        <ScrollReveal animation="vf-scaleIn">
          <CarouselSection
            id="ai-alignment"
            imageSrc="/assets/img/aialigned.jpg"
            imageAlt={aiAlignment.imageAlt}
            title={aiAlignment.title}
            intro={aiAlignment.intro}
            ctaText={aiAlignment.bottomCta}
            items={aiAlignment.cards}
            reverse={false}
            altBackground={false}
            textureClass="vf-texture-dots"
          />
        </ScrollReveal>

        <ScrollReveal animation="vf-fadeInRight">
          <GivingBackSection />
        </ScrollReveal>
        <SectionDivider variant="curve" color="#0a0a0a" />
        <ScrollReveal animation="vf-fadeInUp">
          <AboutSection />
        </ScrollReveal>
        <SectionDivider variant="wave" color="#0a0a0a" />
        <ScrollReveal animation="vf-fadeInUp">
          <ContactSection />
        </ScrollReveal>
      </main>
      <Footer />
    </>
  );
}