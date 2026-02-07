# Plan: VFS Website Multi-Part Enhancement
**Date:** 2026-02-07
**Status:** READY FOR IMPLEMENTATION

## Objective
Execute a comprehensive multi-phase update to the ValorForge Solutions Next.js 14 website, creating a new Leadership bio page, enhancing About and Giving Back sections with concrete achievements and real partner logos, fixing the Android PWA download prompt, and improving mobile carousel UX. All changes maintain the existing dark-theme design system with gold/blue accents and vf-* CSS classes.

## Context Summary
- **From Review:** N/A
- **From Research:** Leadership bio pages for small teams work best as single-page layouts with alternating left/right sections. Each bio should be 100-130 words (down from 150-200), third-person voice, factual credentials only. Mobile carousel UX needs simplification. Android PWA prompt triggered by manifest.json display:"standalone" + screenshots array.
- **Constraints:** Next.js 14 App Router, TypeScript, existing vf-* CSS design system. No real headshots available yet (use placeholders). Do NOT fabricate bio content. Only real partner logos with valid URLs. All pages follow Header + main + Footer pattern.

## Implementation Steps

### TASK 1: Leadership Bio Page Creation
1. **C:\Users\Veteran\Documents\dev\VFS\content\leadership.json** — Create JSON with 3 leader bios (Darryl Wilkerson, Erian Laperi, Tim LaFaver). Each bio: name, title, paragraph1, paragraph2 (condensed from bios.txt to ~100-130 words total), imagePath (placeholder). Add page intro text and SEO metadata fields.

2. **C:\Users\Veteran\Documents\dev\VFS\app\leadership\page.tsx** — Create Leadership page. Import leadership.json. Structure: Hero section (intro), then 3 individual bio sections using vf-grid-image-left / vf-grid-image-right alternating pattern. Each section: placeholder image on one side, name (vf-h2), title (vf-kicker with vf-accent color), 2 paragraphs (vf-body). Follow careers page SEO metadata pattern. Import Header/Footer.

3. **C:\Users\Veteran\Documents\dev\VFS\components\Header.tsx** — Add Leadership link to NAV_ITEMS array: `{ href: "/leadership", label: "Leadership" }` (insert after "About", before "Contact").

4. **C:\Users\Veteran\Documents\dev\VFS\components\Footer.tsx** — Add Leadership link to vf-footer-right div: `<Link href="/leadership">Leadership</Link>` (after Careers link).

5. **C:\Users\Veteran\Documents\dev\VFS\app\sitemap.ts** — Add Leadership page entry: `{ url: 'https://valorforgesolutions.com/leadership', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 }`.

### TASK 2: About Section Enhancement
6. **C:\Users\Veteran\Documents\dev\VFS\content\about.json** — Update intro field with enriched content from about_us.txt (integrate concrete achievements: digital twins, AI networks, 15-20% margin gains, 50x productivity gains, national-scale geospatial datasets, military-rooted integrity + Big Four rigor). Keep existing Mission/Vision/Values cards array unchanged.

7. **C:\Users\Veteran\Documents\dev\VFS\components\AboutSection.tsx** — Add "Meet Our Leadership" CTA button after carousel, inside a new div with vf-cta-row class: `<Link href="/leadership" className="vf-btn vf-btn-primary">Meet Our Leadership</Link>`.

### TASK 3: Giving Back Section Overhaul
8. **C:\Users\Veteran\Documents\dev\VFS\content\giving_back.json** — Replace intro text with concise statement: "ValorForge invests a percentage of profits in veteran and community causes, and prioritizes hiring veterans and first responders." Add new partners array with 5 objects: `[{ name: "Vets Who Code", url: "https://vetswhocode.io", logo: "/assets/img/logos/vetswhocode.svg" }, ...]` for all 5 orgs. Remove bottomCta field.

9. **C:\Users\Veteran\Documents\dev\VFS\public\assets\img\logos\** — Create logos directory. Add placeholder comment file noting real logos needed: vetswhocode.svg, commitfoundation.svg, bunkerlabs.svg, hiringourheroes.svg, codeplatoon.svg (or .png fallbacks).

10. **C:\Users\Veteran\Documents\dev\VFS\components\GivingBackSection.tsx** — Remove existing image. Update to display: title, intro text, then a horizontal logo row (new vf-partners-logos CSS class). Map over partners array from giving_back.json, render each as linked logo: `<a href={partner.url} target="_blank" rel="noopener"><Image src={partner.logo} alt={partner.name} height={45} /></a>`.

11. **C:\Users\Veteran\Documents\dev\VFS\app\globals.css** — Add new CSS rule `.vf-partners-logos` (lines after vf-company-block, ~line 458): flex row, gap 32px, align-items center, justify-content center, margin-top 24px, flex-wrap. Add media query for mobile: gap 20px, logos max-height 36px. Add `.vf-partners-logos a` with grayscale filter, transition, hover state removes grayscale.

### TASK 4: Android Download Prompt Fix
12. **C:\Users\Veteran\Documents\dev\VFS\public\manifest.json** — Change display field from "standalone" to "browser" (line 6). Remove entire screenshots array (lines 24-39) since files don't exist and this triggers Android install prompt.

### TASK 5: Mobile Carousel UX Improvement
13. **C:\Users\Veteran\Documents\dev\VFS\app\globals.css** — Add media query at mobile breakpoint (760px, after existing mobile carousel rules ~line 770): Hide carousel nav buttons (vf-car-btn display: none), hide carousel grid (vf-carousel display: block), hide vf-car-track flex layout. Add new `.vf-carousel-mobile-stack` styles: display block, each vf-card becomes display block with no flex/grid, margin-bottom 20px, min-height auto, padding 0, background transparent, border none, box-shadow none. vf-card-title becomes vf-h3 size, text-align left, color vf-accent. vf-card-body stays normal paragraph.

14. **C:\Users\Veteran\Documents\dev\VFS\components\Carousel.tsx** — No code changes needed (CSS-only mobile transformation). Alternatively, if CSS approach fails, add conditional rendering: detect mobile viewport (<760px) with useMediaQuery hook, render simple div stack instead of carousel structure on mobile.

### TASK 6: Comprehensive Integration Verification
15. **All modified files** — Final review pass: Ensure Header nav updated (Task 1.3), Footer updated (1.4), sitemap updated (1.5), all vf-* classes consistent, all imports correct, no broken links, placeholder images referenced correctly, TypeScript types satisfied.

## File Inventory
| File | Action | Lines/Functions Affected |
|------|--------|--------------------------|
| C:\Users\Veteran\Documents\dev\VFS\content\leadership.json | CREATE | - (new JSON data file) |
| C:\Users\Veteran\Documents\dev\VFS\app\leadership\page.tsx | CREATE | - (new page component) |
| C:\Users\Veteran\Documents\dev\VFS\components\Header.tsx | MODIFY | NAV_ITEMS array L8-14 (add Leadership) |
| C:\Users\Veteran\Documents\dev\VFS\components\Footer.tsx | MODIFY | vf-footer-right div L15-22 (add link) |
| C:\Users\Veteran\Documents\dev\VFS\app\sitemap.ts | MODIFY | sitemap() return array L4-23 (add entry) |
| C:\Users\Veteran\Documents\dev\VFS\content\about.json | MODIFY | intro field L3 (enrich content) |
| C:\Users\Veteran\Documents\dev\VFS\components\AboutSection.tsx | MODIFY | After Carousel L42 (add CTA button) |
| C:\Users\Veteran\Documents\dev\VFS\content\giving_back.json | MODIFY | Replace intro L3, add partners array, remove bottomCta |
| C:\Users\Veteran\Documents\dev\VFS\public\assets\img\logos\ | CREATE | - (new directory + placeholder comment) |
| C:\Users\Veteran\Documents\dev\VFS\components\GivingBackSection.tsx | MODIFY | Full component rewrite (remove image, add logo row) |
| C:\Users\Veteran\Documents\dev\VFS\app\globals.css | MODIFY | Add .vf-partners-logos ~L458, mobile carousel rules ~L770 |
| C:\Users\Veteran\Documents\dev\VFS\public\manifest.json | MODIFY | display field L6, remove screenshots array L24-39 |
| C:\Users\Veteran\Documents\dev\VFS\components\Carousel.tsx | OPTIONAL MODIFY | Conditional mobile rendering (only if CSS approach insufficient) |

## Architecture Decisions

**Leadership Page Layout:** Single-page stacked layout with alternating left/right image grids (vf-grid-image-left / vf-grid-image-right) follows big-firm best practices for small teams. Avoids over-engineering a card grid for only 3 people.

**Bio Content Editing:** Condense from 150-200 words to 100-130 words per bio. Remove marketing fluff ("vital asset", "unshakeable resilience") but keep ALL factual claims (employers, credentials, achievements, military service). Use third-person professional voice.

**Placeholder Images:** Use existing site images (hero.jpg, aboutnew.jpg, careers.jpg) rotated across the 3 bios until real headshots provided. Document this as TODO in leadership.json comments.

**Giving Back Logos:** Create logos directory structure now, use placeholder files with TODO comments. Real logos must be downloaded from partner websites or requested from orgs (prefer SVG, fallback to PNG at ~200-300px width for quality at 40-50px display height).

**Mobile Carousel:** CSS-first approach (hide buttons/cards, convert to heading+paragraph stack). If insufficient, add conditional React rendering with useMediaQuery. CSS approach preferred to avoid hydration issues.

**Manifest Fix:** Simplest solution is removing screenshots array (references non-existent files anyway) + changing display to "browser". This stops Android Chrome from showing "Add to Home Screen" prompt while preserving basic PWA metadata for SEO.

**Component Reusability:** Leadership page reuses existing vf-grid patterns from CarouselSection/AboutSection. No new components needed, keeping architecture simple.

## Testing Strategy
- **Visual Regression:** Compare Leadership page layout to careers page template (hero structure, card styling, spacing, typography hierarchy)
- **Navigation:** Test all Header/Footer links, verify /leadership route works, check sitemap.xml generation
- **Mobile UX:** Test carousel transformation at <760px breakpoint (cards become heading+paragraph, buttons hidden)
- **Android Testing:** Load site in Chrome Android, verify no "Add to Home Screen" banner appears
- **SEO Validation:** Verify Leadership page metadata exports correctly, check sitemap includes new route
- **Logo Display:** Verify Giving Back logos render in uniform row, links open in new tabs, hover effects work
- **Content Accuracy:** Verify all bio content matches factual claims from bios.txt (no fabrication), proper condensing
- **Accessibility:** Test keyboard navigation on Leadership page, screen reader compatibility with bio sections

## Out of Scope
- **Real headshots for Leadership page:** Use placeholders until provided
- **Real partner logos:** Create directory structure + placeholder files; actual logo acquisition separate task
- **Leadership page animations/transitions:** Use static layout matching existing site patterns
- **Dynamic bio filtering/sorting:** Static 3-bio page only
- **Leadership team expansion beyond 3 people:** Current scope fixed to Darryl, Erian, Tim
- **Giving Back detailed program descriptions:** Only org names + links, no expanded content
- **PWA full functionality testing:** Only fixing install prompt, not testing full offline/caching behavior
- **Mobile carousel JavaScript fallback testing:** Implement CSS solution first, JS fallback only if needed
- **Cross-browser carousel testing:** Focus on Chrome/Safari, standard CSS should work universally
- **About section complete rewrite:** Only enhance intro paragraph, keep existing structure/carousel

## Acceptance Criteria
- [ ] Leadership page exists at /leadership with 3 bios in alternating left/right layout
- [ ] Each bio is 100-130 words, third-person voice, factually accurate to bios.txt
- [ ] Leadership link appears in Header nav and Footer
- [ ] /leadership entry in sitemap.ts with priority 0.8
- [ ] About section intro enriched with about_us.txt achievements (digital twins, margins, productivity)
- [ ] "Meet Our Leadership" CTA button in About section links to /leadership
- [ ] Giving Back intro replaced with concise statement about profit investment + veteran hiring
- [ ] Giving Back displays 5 partner logos in horizontal row (placeholders OK if real logos unavailable)
- [ ] Each logo links to correct org URL (target="_blank")
- [ ] Logo hover effects work (grayscale to color transition)
- [ ] manifest.json display changed to "browser", screenshots array removed
- [ ] Android Chrome does NOT show "Add to Home Screen" prompt
- [ ] Mobile carousel (<760px) hides nav buttons and displays cards as simple heading+paragraph stack
- [ ] All existing pages/sections remain unchanged and functional
- [ ] No TypeScript errors, all imports resolve correctly
- [ ] Site builds successfully with `npm run build`
- [ ] All vf-* CSS classes consistent with existing design system
