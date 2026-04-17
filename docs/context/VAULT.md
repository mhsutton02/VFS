# Vault — ValorForge Solutions (VFS) Website

## Directory Structure
```
VFSsite/
├── app/
│   ├── admin/jobs/          # Admin job management
│   ├── api/                 # API routes
│   ├── capabilities/
│   │   ├── federal-broadband/
│   │   └── program-management/
│   ├── careers/             # Careers listing + [slug] detail
│   ├── contact/
│   ├── experience/
│   ├── leadership/
│   ├── partners/
│   ├── layout.tsx           # Root layout (Geist Sans, JSON-LD, metadata)
│   ├── page.tsx             # Homepage
│   ├── sitemap.ts
│   └── globals.css
├── components/
│   ├── Header.tsx           # Primary nav: Capabilities dropdown + Leadership/Partners/Careers/Contact
│   ├── Footer.tsx           # Footer nav: Capabilities/Leadership/Careers/Partners/Contact
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── CarouselSection.tsx / Carousel.tsx
│   ├── ContactSection.tsx / ContactForm.tsx
│   ├── ApplicationForm.tsx
│   └── GivingBackSection.tsx
├── content/                 # JSON content files
│   ├── hero.json, about.json, careers.json, contact.json
│   ├── experience.json, leadership.json, partners.json
│   ├── what_we_do.json, who_we_serve.json, giving_back.json
│   ├── federal_broadband.json, program_management.json
│   ├── ai_alignment.json
│   └── jobs/               # Individual job postings
├── hooks/useCarousel.ts
├── lib/auth.ts, github.ts
└── public/assets/img/       # Static images
```

## Project Summary
ValorForge Solutions (VFS) is a professional services website for an SDVOSB (Service-Disabled Veteran-Owned Small Business) providing federal broadband program management, FCC Fabric operations, AI alignment consulting, and cybersecurity services. The site is deployed on Netlify.

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 3.4 + custom CSS classes (vf-* prefix)
- **Font:** Geist Sans
- **Content:** JSON files in `/content/` directory (headless CMS pattern)
- **Hosting:** Netlify (@netlify/plugin-nextjs)
- **PWA:** @ducanh2912/next-pwa
- **Forms:** Web3Forms integration (contact + career applications)

## Current Navigation Structure
**Header:** Capabilities (dropdown: Federal Broadband, Program Management) | Leadership | Partners | Careers | Contact
**Footer:** Capabilities | Leadership | Careers | Partners | Contact
**Sitemap:** Homepage, Federal Broadband, Program Management, Careers, Leadership, Partners, Contact

## Existing Pages
1. `/` — Homepage (hero, about, carousel, what-we-do, who-we-serve, giving-back, contact)
2. `/capabilities/federal-broadband` — Federal Broadband Programs detail
3. `/capabilities/program-management` — Program Management & Delivery detail
4. `/careers` — Careers listing
5. `/careers/[slug]` — Individual job posting
6. `/leadership` — Leadership team
7. `/partners` — Partner organizations
8. `/contact` — Contact page
9. `/experience` — Experience page
10. `/admin/jobs` — Admin job management (internal)
