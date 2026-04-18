'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function Breadcrumb() {
  const pathname = usePathname();

  // Don't render on homepage
  if (pathname === '/') return null;

  const segments = pathname.split('/').filter(Boolean);

  // Label map for clean display names
  const labelMap: Record<string, string> = {
    'capabilities': 'Capabilities',
    'federal-broadband': 'Federal Broadband',
    'program-management': 'Program Management',
    'palantir': 'Palantir Foundry & AIP',
    'lonestar': 'Lonestar',
    'leadership': 'Leadership',
    'partners': 'Partners',
    'careers': 'Careers',
    'experience': 'Experience',
    'contact': 'Contact',
  };

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    ...segments.map((segment, i) => ({
      name: labelMap[segment] || segment.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      path: '/' + segments.slice(0, i + 1).join('/')
    }))
  ];

  // Schema.org BreadcrumbList JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": crumb.name,
      "item": `https://valorforgesolutions.com${crumb.path}`
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="vf-breadcrumb" aria-label="Breadcrumb">
        <div className="vf-container">
          <ol className="vf-breadcrumb-list">
            {breadcrumbs.map((crumb, i) => (
              <li key={crumb.path} className="vf-breadcrumb-item">
                {i < breadcrumbs.length - 1 ? (
                  <>
                    <Link href={crumb.path} className="vf-breadcrumb-link">
                      {crumb.name}
                    </Link>
                    <span className="vf-breadcrumb-separator">/</span>
                  </>
                ) : (
                  <span className="vf-breadcrumb-current">{crumb.name}</span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
}
