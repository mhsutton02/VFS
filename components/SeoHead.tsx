import Head from "next/head";
import seoDefaults from "../content/seo_defaults.json";

interface SeoHeadProps {
  title?: string;
  description?: string;
  ogImage?: string;
  canonical?: string;
  type?: "website" | "article";
  breadcrumbs?: { name: string; url: string }[];
}

export function SeoHead({
  title,
  description,
  ogImage,
  canonical,
  type = "website",
  breadcrumbs,
}: SeoHeadProps) {
  const pageTitle = title || seoDefaults.defaultTitle;
  const pageDescription = description || seoDefaults.defaultDescription;
  const pageOgImage = ogImage || `${seoDefaults.siteUrl}${seoDefaults.defaultOgImage}`;
  const pageCanonical = canonical || seoDefaults.siteUrl;

  const organizationSchema = {
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
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: seoDefaults.siteName,
    url: seoDefaults.siteUrl,
  };

  const breadcrumbSchema = breadcrumbs
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: crumb.name,
          item: `${seoDefaults.siteUrl}${crumb.url}`,
        })),
      }
    : null;

  return (
    <Head>
      {/* Basic Meta */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <link rel="canonical" href={pageCanonical} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageOgImage} />
      <meta property="og:url" content={pageCanonical} />
      <meta property="og:site_name" content={seoDefaults.siteName} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={seoDefaults.twitterHandle} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageOgImage} />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
    </Head>
  );
}