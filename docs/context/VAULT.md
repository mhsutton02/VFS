# Vault — ValorForge Solutions (VFS)

## Directory Structure
```
VFS/
├── app/
│   ├── careers/page.tsx
│   ├── contact/page.tsx
│   ├── partners/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   ├── page.tsx (homepage)
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── AboutSection.tsx
│   ├── Carousel.tsx
│   ├── CarouselSection.tsx
│   ├── ContactForm.tsx
│   ├── ContactSection.tsx
│   ├── Footer.tsx
│   ├── GivingBackSection.tsx
│   ├── Header.tsx
│   └── HeroSection.tsx
├── content/ (JSON data files)
│   ├── about.json, ai_alignment.json, careers.json
│   ├── contact.json, giving_back.json, hero.json
│   ├── what_we_do.json, who_we_serve.json
├── hooks/
│   ├── useCarousel.ts
│   └── useNetlifyForm.ts
├── public/assets/
│   └── bios.txt (source bios for 3 leaders)
├── package.json
├── tailwind.config.ts
└── netlify.toml
```

## Project Summary
ValorForge Solutions (VFS) is a corporate website for an SDVOSB (Service-Disabled Veteran-Owned Small Business) providing strategic IT consulting, AI alignment, and mission-focused technology solutions. Based in Rockwall, TX. Dark-themed marketing site deployed on Netlify.

## Tech Stack
- **Framework:** Next.js 14.2.5 (App Router)
- **Language:** TypeScript, React 18.3.1
- **Styling:** Tailwind CSS 3.4 + custom CSS (globals.css with vf-* class system)
- **Fonts:** Geist Sans
- **Deployment:** Netlify (with @netlify/plugin-nextjs)
- **Content:** JSON files in /content directory
- **Pattern:** Header + main sections + Footer on every page. Pages use vf-section, vf-container, vf-h1/h2/h3, vf-body, vf-lead, vf-kicker class system. Dark theme (#0a0a0a bg, gold accent #f5b74a, blue accent #2b72ff).

## Navigation
Current nav items: What We Do | Who We Serve | AI Alignment | About | Contact
Footer links: Careers

## Existing Pages
- `/` — Homepage (Hero, What We Do, Who We Serve, AI Alignment, Giving Back, About, Contact)
- `/careers` — Careers page (Hero, Culture/Benefits/Opportunities cards, Open Positions)
- `/partners` — Partners page (placeholder)
- `/contact` — Contact page

## Bios Source (public/assets/bios.txt)
Three leadership bios:
1. **Darryl Wilkerson** — Strategic Operations & Cybersecurity Infrastructure Leader. 40+ years experience. Retired Navy Senior Officer. P&L management, GovCon, L-3 Communications, Teledyne Brown Engineering.
2. **Erian Laperi** — CTO, Communications, Media & Technology. 20+ years experience. 13-year AT&T tenure. GenAI, Big Data, ML, Digital Twin. Cognizant CMT practice.
3. **Tim LaFaver** — Head of Strategy & Innovation. 30 years experience. Former CIO/CISO, ISSA Fellow. Cognizant Communications Sector Americas. 5G, IoT, cloud-native.

## Design System
- Dark theme: #0a0a0a backgrounds
- Accent colors: gold (#f5b74a), blue (#2b72ff)
- Text: light (#f4f6fb) with muted (#a7b0c6)
- Glass-morphism cards with subtle borders
- Radial gradient backgrounds per section
- 18px border radius, pill buttons (999px radius)
- Custom CSS class naming: `vf-*` prefix
- Responsive breakpoints: 980px, 760px
