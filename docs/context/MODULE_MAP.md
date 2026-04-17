# Module Map — VFS Website Navigation & Layout

## Navigation Components

### components/Header.tsx
- `CAPABILITIES_ITEMS[]` — Dropdown menu data: Federal Broadband (5 sections), Program Management (5 sections)
- `NAV_ITEMS[]` — Top-level links: Leadership, Partners, Careers, Contact
- `Header()` — Client component with mobile hamburger, capabilities dropdown, standard nav links

### components/Footer.tsx
- `Footer()` — Footer with links: Capabilities, Leadership, Careers, Partners, Contact

## Route Pages (app/**/page.tsx)
- `app/page.tsx` — Homepage
- `app/capabilities/federal-broadband/page.tsx` — Federal Broadband capability
- `app/capabilities/program-management/page.tsx` — Program Management capability
- `app/careers/page.tsx` — Careers listing
- `app/careers/[slug]/page.tsx` — Individual job detail
- `app/leadership/page.tsx` — Leadership team
- `app/partners/page.tsx` — Partners
- `app/contact/page.tsx` — Contact
- `app/experience/page.tsx` — Experience
- `app/admin/jobs/page.tsx` — Admin job editor

## Shared Layout
- `app/layout.tsx` — Root layout: Geist Sans, JSON-LD structured data, metadata/viewport
- `app/globals.css` — Global styles (vf-* design system)
- `app/sitemap.ts` — Sitemap generator (7 public URLs)
- `app/robots.ts` — Robots.txt config

## Content Files (content/*.json)
- hero.json, about.json, careers.json, contact.json, experience.json
- leadership.json, partners.json, what_we_do.json, who_we_serve.json
- giving_back.json, federal_broadband.json, program_management.json, ai_alignment.json
- jobs/ — Individual job posting JSON files

## Key Sync Points (must update when adding pages)
1. `components/Header.tsx` — NAV_ITEMS[] or CAPABILITIES_ITEMS[]
2. `components/Footer.tsx` — Footer link list
3. `app/sitemap.ts` — Public URL entries
4. `app/globals.css` — Any new page-specific styles
