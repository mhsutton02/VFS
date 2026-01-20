import type { Metadata } from "next";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import "./globals.css";
import designTokens from "../content/design_tokens.json";
import seoDefaults from "../content/seo_defaults.json";

export const metadata: Metadata = {
  title: seoDefaults.defaultTitle,
  description: seoDefaults.defaultDescription,
  metadataBase: new URL(seoDefaults.siteUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: seoDefaults.siteUrl,
    siteName: seoDefaults.siteName,
    title: seoDefaults.defaultTitle,
    description: seoDefaults.defaultDescription,
    images: [
      {
        url: seoDefaults.defaultOgImage,
        width: 1200,
        height: 630,
        alt: seoDefaults.siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: seoDefaults.twitterHandle,
    title: seoDefaults.defaultTitle,
    description: seoDefaults.defaultDescription,
    images: [seoDefaults.defaultOgImage],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <style>{`
          :root {
            --max: ${designTokens.maxWidth}px;
            --page-x: ${designTokens.spacing.pageX}px;
            --block-y: ${designTokens.spacing.blockY}px;
            --bg: ${designTokens.colors.background};
            --surface: ${designTokens.colors.surface};
            --text: ${designTokens.colors.text};
            --muted: ${designTokens.colors.muted};
            --accent: ${designTokens.colors.accent};
            --accent2: ${designTokens.colors.accent2};
            --font-primary: ${designTokens.typography.fontFamilyPrimary};
          }
        `}</style>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: seoDefaults.organization.name,
              legalName: seoDefaults.organization.legalName,
              url: seoDefaults.organization.url,
              logo: seoDefaults.organization.logo,
              foundingDate: seoDefaults.organization.foundingDate,
              contactPoint: {
                "@type": "ContactPoint",
                telephone: seoDefaults.organization.contactPoint.telephone,
                email: seoDefaults.organization.contactPoint.email,
                contactType: seoDefaults.organization.contactPoint.contactType,
                areaServed: seoDefaults.organization.contactPoint.areaServed,
              },
              address: {
                "@type": "PostalAddress",
                streetAddress: seoDefaults.organization.address.streetAddress,
                addressLocality: seoDefaults.organization.address.addressLocality,
                addressRegion: seoDefaults.organization.address.addressRegion,
                postalCode: seoDefaults.organization.address.postalCode,
                addressCountry: seoDefaults.organization.address.addressCountry,
              },
              sameAs: seoDefaults.organization.sameAs,
            }),
          }}
        />
      </head>
      <body>
        <div className="vf-block">
          <Header />
        </div>
        {children}
        <div className="vf-block">
          <Footer />
        </div>
      </body>
    </html>
  );
}