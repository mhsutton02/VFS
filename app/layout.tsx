// app/layout.tsx – fixed font import
import "./globals.css";
import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';  // ← Correct import for Geist Sans

export const metadata: Metadata = {
  metadataBase: new URL('https://valorforgesolutions.com'),
  title: {
    default: "ValorForge Solutions | Federal Broadband Programs & SDVOSB Program Management",
    template: "%s | ValorForge Solutions",
  },
  description:
    "ValorForge Solutions is a CMMC 2.0 Level 2 Self-Attest certified, SDVOSB delivering federal broadband program management, FCC Fabric operations expertise, transition planning, stakeholder engagement, and open-data strategy for national-scale broadband mapping.",
  alternates: { canonical: "https://valorforgesolutions.com" },
  openGraph: {
    title: "ValorForge Solutions | Federal Broadband Programs & SDVOSB Program Management",
    description:
      "CMMC 2.0 Level 2 Self-Attest certified SDVOSB delivering federal broadband program management, FCC Fabric operations expertise, and national-scale broadband mapping.",
    url: "https://valorforgesolutions.com/",
    type: "website",
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ValorForge Solutions | Federal Broadband Programs & SDVOSB Program Management',
    description: 'CMMC 2.0 Level 2 Self-Attest certified SDVOSB delivering federal broadband program management, FCC Fabric operations expertise, and national-scale broadband mapping.',
    images: ['/og-image.jpg'],
  },
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

// ... imports and metadata/viewport as before

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ValorForge Solutions',
    url: 'https://valorforgesolutions.com',
    logo: 'https://valorforgesolutions.com/logo.png',
    description: 'SDVOSB providing strategic IT consulting, AI alignment, and mission-focused technology solutions.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Rockwall',
      addressRegion: 'TX',
      addressCountry: 'US',
    },
    sameAs: [],
    additionalType: 'https://schema.org/ServiceDisabledVeteranOwnedSmallBusiness',
  };

  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
