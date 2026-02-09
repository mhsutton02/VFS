// app/contact/page.tsx
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { ContactSection } from "../../components/ContactSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact ValorForge Solutions for strategic IT consulting, cybersecurity, and mission-focused technology solutions. SDVOSB.",
  alternates: { canonical: "https://valorforgesolutions.com/contact" },
  openGraph: {
    title: "Contact Us | ValorForge Solutions",
    description: "Contact ValorForge Solutions for strategic IT consulting, cybersecurity, and mission-focused technology solutions.",
    url: "https://valorforgesolutions.com/contact",
    type: "website",
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | ValorForge Solutions',
    description: 'Contact ValorForge Solutions for strategic IT consulting, cybersecurity, and mission-focused technology solutions.',
    images: ['/og-image.jpg'],
  },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
