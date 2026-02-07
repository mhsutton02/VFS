# Code Review
**Date:** 2026-02-05
**Scope:** VFS codebase SEO and security audit — app/layout.tsx, app/page.tsx, app/careers/page.tsx, next.config.mjs, components/ContactForm.tsx, app/globals.css

## Verdict: NEEDS WORK

## Critical (P0)

- **Missing robots.txt** — No robots.txt file exists in /public or /app. Search engines have no crawl directives. Create /app/robots.ts to export default function returning `{ rules: { userAgent: '*', allow: '/' }, sitemap: 'https://valorforge.com/sitemap.xml' }`.

- **Missing sitemap.xml** — No sitemap exists. Critical for SEO discoverability and crawl efficiency. Create /app/sitemap.ts exporting default function that returns array of URL objects with loc, lastModified, changeFrequency, priority for all routes (/, /careers, /partners).

- **C:\Users\Veteran\Documents\dev\VFS\app\careers\page.tsx:1-94** — Missing metadata export. Page has no title, description, or Open Graph tags. Inherits only root metadata from layout.tsx. Add `export const metadata: Metadata = { title: 'Careers - ValorForge Solutions', description: '[85-char summary of careers page]', openGraph: {...} }`.

- **C:\Users\Veteran\Documents\dev\VFS\app\layout.tsx:6-18** — Missing Twitter Card metadata. Open Graph exists but no twitter:card, twitter:title, twitter:description. Add twitter object to metadata: `twitter: { card: 'summary_large_image', title: '...', description: '...', images: ['...'] }`.

- **C:\Users\Veteran\Documents\dev\VFS\app\layout.tsx:14** — Missing canonical URL property. Add `metadataBase: new URL('https://valorforge.com')` and `alternates: { canonical: '/' }` to metadata export to prevent duplicate content issues.

- **C:\Users\Veteran\Documents\dev\VFS\components\ContactForm.tsx:6-83** — No client-side form validation or sanitization. Relies entirely on Netlify honeypot. No XSS protection on user input. Add maxLength attributes to inputs (name: 100, org: 100, email: 254, phone: 20, message: 2000). Add pattern attribute to email input for regex validation. Consider adding rate limiting or CSRF token.

- **C:\Users\Veteran\Documents\dev\VFS\next.config.mjs:11** — Overly permissive image hostname config. `hostname: '**'` allows any remote image source, creating XSS and phishing vector. Tighten to specific trusted domains: `hostname: 'valorforge.com'` or remove if no remote images used.

## Important (P1)

- **C:\Users\Veteran\Documents\dev\VFS\app\layout.tsx:28-38** — Manual viewport meta tag in head conflicts with viewport export. Next.js 14 exports viewport separately (line 20-24). Remove duplicate `<meta name="viewport".../>` from head JSX to avoid hydration issues.

- **C:\Users\Veteran\Documents\dev\VFS\app\page.tsx:15-66** — No structured data (JSON-LD). Search engines cannot parse business type, services, contact info. Add Organization schema to layout.tsx or page.tsx with `<script type="application/ld+json">` containing name, url, logo, sameAs (social links), contactPoint, address.

- **C:\Users\Veteran\Documents\dev\VFS\app\layout.tsx:6-7** — Generic page title "ValorForge Solutions" with no suffix. Sub-pages will show only root title in browser tabs. Change to template: `title: { default: 'ValorForge Solutions', template: '%s | ValorForge Solutions' }`.

- **C:\Users\Veteran\Documents\dev\VFS\app\careers\page.tsx:23-94** — Semantic HTML issue. No <main> wrapper around sections. Search engines may not identify primary content vs navigation. Wrap all sections in <main> (currently wrapped in layout, but local main would be clearer).

- **C:\Users\Veteran\Documents\dev\VFS\app\page.tsx:19** — Missing semantic landmark. `<main>` exists but no aria-label. Good practice to add `aria-label="Main content"` for screen readers, though not critical since <main> is implicit landmark.

- **C:\Users\Veteran\Documents\dev\VFS\next.config.mjs:42-50** — CSP allows 'unsafe-inline' and 'unsafe-eval' for scripts. Weakens XSS protection. If Netlify forms or analytics require it, add nonce-based CSP. If not required, remove 'unsafe-inline' and 'unsafe-eval' from script-src.

- **C:\Users\Veteran\Documents\dev\VFS\app\globals.css:1-846** — No CSS injection concerns found. Uses CSS custom properties and standard Tailwind. No user-controlled class names or inline styles from props. Security posture is good.

- **C:\Users\Veteran\Documents\dev\VFS\components\ContactForm.tsx:11** — Honeypot field named "bot-field" is predictable. Sophisticated bots can detect and skip it. Rename to something less obvious like "website" or "company_url" and label it innocuously.

## Suggestions (P2)

- **C:\Users\Veteran\Documents\dev\VFS\app\layout.tsx:17** — Manifest path "/manifest.json" exists in /public but is not verified. Ensure icons in manifest.json match /public/icon-192.png and /public/icon-512.png. Verify theme_color matches viewport themeColor (#0a0a0a).

- **C:\Users\Veteran\Documents\dev\VFS\next.config.mjs:26** — HSTS header is strong (1 year + preload) but consider adding to HSTS preload list at hstspreload.org for browsers to enforce HTTPS before first visit.

- **C:\Users\Veteran\Documents\dev\VFS\app\careers\page.tsx:84** — CTA link uses hash navigation `href="/#contact"` which may break if user is already on homepage. Use `href={pathname === '/' ? '#contact' : '/#contact'}` logic or absolute path to avoid scroll issues.

- **C:\Users\Veteran\Documents\dev\VFS\components\HeroSection.tsx:14** — Image alt text pulled from JSON (`heroContent.imageAlt`). Verify JSON content for descriptive alt text (not just "hero image"). Same for all CarouselSection images.

- **C:\Users\Veteran\Documents\dev\VFS\app\page.tsx:24-56** — Image paths hardcoded. If image files are renamed or moved, will break. Consider moving to config or verifying file existence in build step.

- **C:\Users\Veteran\Documents\dev\VFS\app\layout.tsx:30** — Head tag usage in app router is not recommended by Next.js docs. Metadata should be fully declarative via exports. Move favicon link to metadata: `icons: { icon: '/favicon.ico' }` and remove <head> wrapper.

- **C:\Users\Veteran\Documents\dev\VFS\next.config.mjs:44** — Googletagmanager and analytics in CSP but no GTM code found in codebase. If not used, remove from CSP to tighten policy. If planned, ensure GTM script uses nonce for CSP compliance.

- **C:\Users\Veteran\Documents\dev\VFS\components\ContactForm.tsx:77-82** — Submit button has no loading state or disabled state during submission. User can double-submit. Add state management: `const [submitting, setSubmitting] = useState(false)` and `disabled={submitting}` on button.

## What's Good

- Security headers are comprehensive (HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, CSP)
- All images use Next.js Image component with proper width/height (prevents CLS)
- Alt text is sourced from JSON content files (centralized and maintainable)
- Honeypot field exists for basic bot protection
- Semantic HTML landmarks present (<header>, <main>, <footer>, <nav>)
- Dark theme with proper contrast ratios (meets WCAG AA)
- Accessible focus states defined (:focus-visible with 3px accent outline)
- Mobile responsive nav with aria-expanded and aria-label
- PWA configured with manifest and service worker (next-pwa)

## Action Items

1. Create /app/robots.ts with crawl rules and sitemap reference (P0)
2. Create /app/sitemap.ts with all routes and metadata (P0)
3. Add metadata export to /app/careers/page.tsx with title, description, OG tags (P0)
4. Add Twitter Card metadata to /app/layout.tsx (P0)
5. Add canonical URL and metadataBase to /app/layout.tsx metadata (P0)
6. Add input validation (maxLength, pattern) to ContactForm.tsx (P0)
7. Tighten next.config.mjs image remotePatterns to specific domains or remove (P0)
8. Remove duplicate viewport meta tag from layout.tsx head (P1)
9. Add Organization JSON-LD structured data to layout or page (P1)
10. Change root title to template format for sub-page differentiation (P1)
11. Review and reduce CSP 'unsafe-inline'/'unsafe-eval' if possible (P1)
12. Rename honeypot field to less obvious name (P1)
