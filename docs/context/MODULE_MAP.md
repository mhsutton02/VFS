# Module Map — VFS Components & Pages

## app/layout.tsx
- `RootLayout({ children }): JSX.Element` — Root HTML wrapper, Geist font, JSON-LD schema, metadata

## app/page.tsx
- `HomePage(): JSX.Element` — Header, Hero, 3x CarouselSection, GivingBack, About, Contact, Footer

## app/careers/page.tsx
- `CareersPage(): JSX.Element` — Header, Hero, card grid (3 cards), role list, CTA, Footer
- `metadata: Metadata` — SEO metadata export pattern (template for new pages)

## app/partners/page.tsx
- `PartnersPage(): JSX.Element` — Header, section, Footer (placeholder page)

## app/sitemap.ts
- `sitemap(): MetadataRoute.Sitemap` — Returns array: /, /careers, /partners

## components/Header.tsx ("use client")
- `NAV_ITEMS: Array<{href, label}>` — Navigation links array
- `Header(): JSX.Element` — Sticky header with logo, nav, mobile toggle

## components/Footer.tsx
- `Footer(): JSX.Element` — Company name, SDVOSB, location, Careers link

## components/AboutSection.tsx
- `AboutSection(): JSX.Element` — About section with image + carousel from about.json

## components/CarouselSection.tsx
- `CarouselSection({ id, altBackground?, reverse?, imageSrc, imageAlt, title, intro, ctaText, items }): JSX.Element`

## components/Carousel.tsx ("use client")
- `Carousel({ items: CarouselItem[], ariaLabel }): JSX.Element` — 2-card auto-advancing carousel

## components/HeroSection.tsx
- `HeroSection(): JSX.Element` — Hero with kicker, headline, body, image, CTA

## components/GivingBackSection.tsx
- `GivingBackSection(): JSX.Element` — Image + text + CTA

## components/ContactSection.tsx / ContactForm.tsx
- Contact section with Netlify form

## hooks/useCarousel.ts
- `useCarousel<T>(items, intervalMs?): { index, next, prev, onMouseEnter, onMouseLeave, getVisibleItems }`

## CSS Classes (globals.css, ~869 lines)
- Layout: vf-container, vf-section, vf-section-hero
- Backgrounds: vf-bg-default, vf-bg-gold-accent, vf-bg-blue-accent
- Typography: vf-kicker, vf-h1, vf-h2, vf-h3, vf-lead, vf-body, vf-accent
- Cards: vf-card, vf-card-title, vf-card-body, vf-careers-card
- Grid: vf-grid-image-left, vf-grid-image-right
- Buttons: vf-btn, vf-btn-primary, vf-btn-ghost
- Responsive: 980px (tablet), 760px (mobile)
