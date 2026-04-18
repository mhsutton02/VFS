# Research Summary
**Date:** 2026-04-18
**Query:** Tier 2 design polish best practices for Next.js 14 App Router sites
**Sources:** 4 web searches conducted

## Key Findings

1. **Breadcrumbs should auto-generate from route path using `usePathname()`** — The pattern splits pathname into segments and maps them to links. This scales better than manual configuration for sites with 50+ pages. Schema.org BreadcrumbList JSON-LD is mandatory for SEO; Google uses it to display clean breadcrumb trails in search results instead of raw URLs and to determine topical relevance.

2. **Avoid 100vw for full-bleed sections due to scrollbar width issues** — On all browsers except Firefox, 100vw incorrectly includes the vertical scrollbar width, causing unwanted horizontal scroll. Modern solution: Use CSS Grid with three columns where content stays in middle column, but hero sections span `grid-column: 1 / -1`. Alternative: Container queries with 100cqw (container query width) or 100dvh (dynamic viewport height).

3. **Optimal prose width is 45-75 characters per line, with 66 being ideal** — Use `max-width: 65ch` in CSS for prose containers. The `ch` unit scales with font size automatically, maintaining optimal line length at any text size. WCAG recommends not exceeding 80 characters. Line height should be ~150% of font size, increasing for longer lines to aid reader eye transition.

4. **Premium whitespace uses 8px grid system with "internal ≤ external" spacing rule** — Professional teams use multiples of 8: 8, 16, 24, 32, 40, 48px for all spacing decisions. Items inside components stay snug (less padding), components sit apart from each other (more margin). Generous whitespace signals luxury and reduces cognitive load. In 2026, avoid rigid blocks; introduce subtle spacing variations.

## Code Examples

### Breadcrumb with JSON-LD (Next.js 14 App Router)
```tsx
'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  const breadcrumbs = segments.map((segment, i) => ({
    name: segment.replace(/-/g, ' '),
    path: '/' + segments.slice(0, i + 1).join('/')
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": crumb.name,
      "item": `${process.env.NEXT_PUBLIC_SITE_URL}${crumb.path}`
    }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="flex gap-2 text-sm text-gray-400">
        {breadcrumbs.map((crumb, i) => (
          <span key={crumb.path}>
            {i > 0 && <span className="mx-2">/</span>}
            {i === breadcrumbs.length - 1 ? (
              <span className="text-white">{crumb.name}</span>
            ) : (
              <Link href={crumb.path} className="hover:text-white transition">{crumb.name}</Link>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
```

### Full-Bleed Hero with CSS Grid
```css
.layout {
  display: grid;
  grid-template-columns: 1fr min(1200px, 100%) 1fr;
}

.layout > * {
  grid-column: 2; /* Content stays centered */
}

.hero-full-bleed {
  grid-column: 1 / -1; /* Spans full width */
}
```

## Recommendations

1. Place breadcrumbs below header, inside max-width container. Use `/` separator for dark themes with hover state transitioning from gray-400 to white. Current page should be white/no link.
2. For hero sections with Next.js Image, use `fill` mode with `priority` prop, `object-fit: cover`, and `sizes="100vw"` for optimal LCP.
3. Apply 65ch max-width to all long-form content blocks. Center with `margin: 0 auto`.
4. Define spacing scale in Tailwind config as multiples of 8. Use larger spacing between sections (48-96px desktop, 32-64px mobile) than within sections (16-32px).

## Caveats

- Auto-generated breadcrumbs may produce poor labels from URL slugs; consider maintaining a route-to-label map for important pages.
- CSS `ch` unit width varies slightly by font; test across font families.
- Container queries (100cqw) have limited browser support pre-2023; check caniuse.com if supporting older browsers.
- 8px grid system can feel rigid at small scales; consider 4px increments for tight UI elements.

## Raw Query Log
- Query 1: "Next.js 14 App Router breadcrumb navigation component patterns schema.org JSON-LD 2026" — Found usePathname() pattern, JSON-LD mandatory for SEO, placement below header
- Query 2: "CSS full-bleed hero sections 100vw negative margin constrained layout 2026" — 100vw causes horizontal scroll; use CSS Grid with grid-column: 1/-1 or container queries
- Query 3: "optimal prose width characters per line readability typography ch units 2026" — 45-75 CPL optimal, 66 ideal; use 65ch max-width; line-height 150%
- Query 4: "premium whitespace vertical rhythm section padding professional website design 2026" — 8px grid system standard; internal ≤ external spacing rule; whitespace signals luxury
