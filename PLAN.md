# Plan: Tier 2 RANGR Design Morph
**Date:** 2026-04-18
**Status:** READY FOR IMPLEMENTATION

## Objective
Complete Tier 2 of the RANGR-inspired design system transformation. Apply premium whitespace treatments, establish prose width constraints for optimal readability, add breadcrumb navigation across all subpages, and ensure full-bleed hero consistency across Partners, Experience, and Leadership pages.

## Context Summary
- **From Review:** Partners page lacks full-bleed hero background. Experience page has NO hero section. Leadership page hero uses `.vf-container` + inline style instead of `.vf-hero-content`. Section padding at 80px desktop feels cramped. Typography margins are tight. Grid gaps at 42px need increase to 56px. Prose width inconsistent with inline overrides.
- **From Research:** Breadcrumbs should auto-generate from `usePathname()` with schema.org JSON-LD. Optimal prose width is 65-75ch (66 ideal). Premium whitespace uses 8px grid system with generous section padding (100-120px desktop). Full-bleed heroes should avoid 100vw issues.
- **Constraints:** Next.js 14 App Router, TypeScript, vf-* CSS naming convention. No @/ aliases (use relative imports). Maintain existing hero pattern from HeroSection.tsx. Client components only where necessary (breadcrumb). All pages import Header/Footer directly (no shared layout).

## Implementation Steps

### 1. Create Breadcrumb Component
**File:** `C:/Users/mhsut/DevProjects/VFSsite/components/Breadcrumb.tsx` — CREATE new client component with auto-generation from pathname

**Code:**
```tsx
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
```

### 2. Add Breadcrumb CSS to globals.css
**File:** `C:/Users/mhsut/DevProjects/VFSsite/app/globals.css` — INSERT after `.vf-body` block definition (after line 351)

**Exact insertion point — insert AFTER this block:**
```css
.vf-body {
  color: var(--muted);
  font-size: 16px;
  margin: 0 0 16px;
  white-space: pre-wrap;
  max-width: 65ch;
}
```

**Code to insert:**
```css

/* Breadcrumb Navigation */
.vf-breadcrumb {
  background: var(--bg);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  padding: 16px 0;
}

.vf-breadcrumb-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  letter-spacing: 0.04em;
}

.vf-breadcrumb-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.vf-breadcrumb-link {
  color: var(--muted);
  text-decoration: none;
  transition: color 0.15s ease;
}

.vf-breadcrumb-link:hover {
  color: var(--text);
}

.vf-breadcrumb-separator {
  color: rgba(255, 255, 255, 0.2);
  user-select: none;
}

.vf-breadcrumb-current {
  color: var(--accent);
  font-weight: 500;
}

/* Prose Width Utility */
.vf-prose {
  max-width: 800px;
  margin: 0 auto;
}
```

### 3. Add Breadcrumb to All Subpages
**Files to modify:** Add `<Breadcrumb />` component between `<Header />` and `<main>` on each subpage

#### 3a. Partners Page
**File:** `C:/Users/mhsut/DevProjects/VFSsite/app/partners/page.tsx`

Add import after existing imports:
```tsx
import { Breadcrumb } from "../../components/Breadcrumb";
```

Add component after `<Header />`:
```tsx
      <Breadcrumb />
```

#### 3b. Experience Page
**File:** `C:/Users/mhsut/DevProjects/VFSsite/app/experience/page.tsx`

Add import after existing imports:
```tsx
import { Breadcrumb } from "../../components/Breadcrumb";
```

Add component after `<Header />`:
```tsx
      <Breadcrumb />
```

#### 3c. Leadership Page
**File:** `C:/Users/mhsut/DevProjects/VFSsite/app/leadership/page.tsx`

Add import after line 5:
```tsx
import { Breadcrumb } from "../../components/Breadcrumb";
```

Add component after `<Header />` on line 30:
```tsx
      <Breadcrumb />
```

#### 3d. Federal Broadband Page
**File:** `C:/Users/mhsut/DevProjects/VFSsite/app/capabilities/federal-broadband/page.tsx`

Add import at top:
```tsx
import { Breadcrumb } from "../../../components/Breadcrumb";
```

Add component after `<Header />`:
```tsx
      <Breadcrumb />
```

#### 3e. Program Management Page
**File:** `C:/Users/mhsut/DevProjects/VFSsite/app/capabilities/program-management/page.tsx`

Add import at top:
```tsx
import { Breadcrumb } from "../../../components/Breadcrumb";
```

Add component after `<Header />`:
```tsx
      <Breadcrumb />
```

#### 3f. Palantir Page
**File:** `C:/Users/mhsut/DevProjects/VFSsite/app/capabilities/palantir/page.tsx`

Add import at line 8 (after ScrollReveal import):
```tsx
import { Breadcrumb } from "../../../components/Breadcrumb";
```

Add component after `<Header />` on line 32:
```tsx
      <Breadcrumb />
```

#### 3g. Lonestar Page
**File:** `C:/Users/mhsut/DevProjects/VFSsite/app/lonestar/page.tsx`

Add import at line 8 (after ScrollReveal import):
```tsx
import { Breadcrumb } from "../../components/Breadcrumb";
```

Add component after `<Header />` on line 32:
```tsx
      <Breadcrumb />
```

#### 3h. Careers Page
**File:** `C:/Users/mhsut/DevProjects/VFSsite/app/careers/page.tsx`

Add import at top:
```tsx
import { Breadcrumb } from "../../components/Breadcrumb";
```

Add component after `<Header />`:
```tsx
      <Breadcrumb />
```

#### 3i. Contact Page
**File:** `C:/Users/mhsut/DevProjects/VFSsite/app/contact/page.tsx`

Add import at top:
```tsx
import { Breadcrumb } from "../../components/Breadcrumb";
```

Add component after `<Header />`:
```tsx
      <Breadcrumb />
```

### 4. Fix Partners Page Hero — Add Full-Bleed Background
**File:** `C:/Users/mhsut/DevProjects/VFSsite/app/partners/page.tsx`

Add Next.js Image import at top (if not already present):
```tsx
import Image from "next/image";
```

Replace entire hero section with full-bleed pattern using `.vf-hero-bg` and `.vf-hero-content`. The hero should use `.vf-hero-badge` for consistency with other capability pages.

### 5. Add Experience Page Hero — Full-Bleed Section
**File:** `C:/Users/mhsut/DevProjects/VFSsite/app/experience/page.tsx`

Add Image import at top (if not already present):
```tsx
import Image from "next/image";
```

Replace the existing "Page Intro" section with full-bleed hero section using `.vf-hero-badge` with text "Mission-Driven Delivery", pulling headline and intro from `content.headline` and `content.intro` (sourced from experience.json lines 4-5).

### 6. Fix Leadership Page Hero — Standardize to `.vf-hero-badge` and `.vf-hero-content`
**File:** `C:/Users/mhsut/DevProjects/VFSsite/app/leadership/page.tsx`

Replace hero section (lines 33-49) with standardized pattern. Current hero uses `.vf-kicker` for "Meet the Team" — switch to `.vf-hero-badge` for consistency with Palantir, Lonestar, and other capability pages.

**Find this exact block (lines 33-49):**
```tsx
        {/* Hero Section */}
        <section className="vf-section vf-section-hero">
          <div className="vf-hero-bg">
            <Image
              src="/assets/img/leadership-hero.jpg"
              alt="Washington D.C. — Capitol Building"
              fill
              priority
              quality={75}
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="vf-container" style={{ position: "relative", zIndex: 2 }}>
            <div className="vf-kicker">Meet the Team</div>
            <h1 className="vf-h1">{leadership.title}</h1>
            <p className="vf-lead">{leadership.intro}</p>
          </div>
        </section>
```

**Replace with:**
```tsx
        {/* Hero Section */}
        <section className="vf-section vf-section-hero">
          <div className="vf-hero-bg">
            <Image
              src="/assets/img/leadership-hero.jpg"
              alt="Washington D.C. — Capitol Building"
              fill
              priority
              quality={75}
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="vf-hero-content">
            <div className="vf-hero-badge">Meet the Team</div>
            <h1 className="vf-h1">{leadership.title}</h1>
            <p className="vf-lead">{leadership.intro}</p>
          </div>
        </section>
```

### 7. Increase Section Padding — Desktop
**File:** `C:/Users/mhsut/DevProjects/VFSsite/app/globals.css`

**Find:**
```css
.vf-section {
  padding: 80px 0;
  position: relative;
}
```

**Replace with:**
```css
.vf-section {
  padding: 100px 0;
  position: relative;
}
```

### 8. Increase Section Padding — Tablet
**File:** `C:/Users/mhsut/DevProjects/VFSsite/app/globals.css`

Inside the `@media (max-width: 980px)` block, find:

**Find:**
```css
  .vf-section {
    padding: 64px 0;
  }
```

**Replace with:**
```css
  .vf-section {
    padding: 80px 0;
  }
```

### 9. Increase Grid Gaps — Image Left
**File:** `C:/Users/mhsut/DevProjects/VFSsite/app/globals.css`

**Find:**
```css
.vf-grid-image-left {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: 42px;
  align-items: stretch;
}
```

**Replace with:**
```css
.vf-grid-image-left {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: 56px;
  align-items: stretch;
}
```

### 10. Increase Grid Gaps — Image Right
**File:** `C:/Users/mhsut/DevProjects/VFSsite/app/globals.css`

**Find:**
```css
.vf-grid-image-right {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  gap: 42px;
  align-items: stretch;
}
```

**Replace with:**
```css
.vf-grid-image-right {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  gap: 56px;
  align-items: stretch;
}
```

### 11. Increase Typography Margin — H2
**File:** `C:/Users/mhsut/DevProjects/VFSsite/app/globals.css`

**Find:**
```css
.vf-h2 {
  font-size: 34px;
  line-height: 1.15;
  margin: 0 0 10px;
  font-weight: 700;
}
```

**Replace with:**
```css
.vf-h2 {
  font-size: 34px;
  line-height: 1.15;
  margin: 0 0 16px;
  font-weight: 700;
}
```

### 12. Increase Typography Margin — Lead
**File:** `C:/Users/mhsut/DevProjects/VFSsite/app/globals.css`

**Find:**
```css
.vf-lead {
  color: var(--muted);
  font-size: 16px;
  margin: 0 0 18px;
  max-width: 65ch;
}
```

**Replace with:**
```css
.vf-lead {
  color: var(--muted);
  font-size: 16px;
  margin: 0 0 24px;
  max-width: 65ch;
}
```

### 13. Increase Footer CTA Padding
**File:** `C:/Users/mhsut/DevProjects/VFSsite/app/globals.css`

**Find:**
```css
.vf-page-footer-cta {
  text-align: center;
  padding: 64px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}
```

**Replace with:**
```css
.vf-page-footer-cta {
  text-align: center;
  padding: 80px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}
```

## File Inventory
| File | Action | Lines/Functions Affected |
|------|--------|------------------------|
| C:/Users/mhsut/DevProjects/VFSsite/components/Breadcrumb.tsx | CREATE | Entire file (new component) |
| C:/Users/mhsut/DevProjects/VFSsite/app/globals.css | MODIFY | Insert breadcrumb CSS after `.vf-body` block (L351), increase section padding 80px→100px, tablet 64px→80px, grid gaps 42px→56px (both classes), h2 margin 10px→16px, lead margin 18px→24px, footer CTA 64px→80px |
| C:/Users/mhsut/DevProjects/VFSsite/app/partners/page.tsx | MODIFY | Add Breadcrumb import, add `<Breadcrumb />` after Header, ensure hero uses `.vf-hero-bg` and `.vf-hero-content` with `.vf-hero-badge` |
| C:/Users/mhsut/DevProjects/VFSsite/app/experience/page.tsx | MODIFY | Add Breadcrumb import, add `<Breadcrumb />` after Header, replace Page Intro with full-bleed hero using `.vf-hero-badge` |
| C:/Users/mhsut/DevProjects/VFSsite/app/leadership/page.tsx | MODIFY | Add Breadcrumb import, add `<Breadcrumb />` after Header L30, replace hero section L33-49 to use `.vf-hero-content` instead of `.vf-container` + inline style, switch `.vf-kicker` to `.vf-hero-badge` |
| C:/Users/mhsut/DevProjects/VFSsite/app/capabilities/federal-broadband/page.tsx | MODIFY | Add Breadcrumb import, add `<Breadcrumb />` after Header |
| C:/Users/mhsut/DevProjects/VFSsite/app/capabilities/program-management/page.tsx | MODIFY | Add Breadcrumb import, add `<Breadcrumb />` after Header |
| C:/Users/mhsut/DevProjects/VFSsite/app/capabilities/palantir/page.tsx | MODIFY | Add Breadcrumb import L8, add `<Breadcrumb />` after Header L32 |
| C:/Users/mhsut/DevProjects/VFSsite/app/lonestar/page.tsx | MODIFY | Add Breadcrumb import L8, add `<Breadcrumb />` after Header L32 |
| C:/Users/mhsut/DevProjects/VFSsite/app/careers/page.tsx | MODIFY | Add Breadcrumb import, add `<Breadcrumb />` after Header |
| C:/Users/mhsut/DevProjects/VFSsite/app/contact/page.tsx | MODIFY | Add Breadcrumb import, add `<Breadcrumb />` after Header |

## Architecture Decisions

### 1. Breadcrumb Auto-Generation vs. Static Configuration
**Decision:** Use `usePathname()` with label map for hybrid approach.
**Rationale:** Auto-generation scales with route changes. Label map provides clean display names for key routes (e.g., "federal-broadband" → "Federal Broadband", "palantir" → "Palantir Foundry & AIP"). Fallback capitalizes raw slugs for future routes. Schema.org JSON-LD is mandatory for SEO.

### 2. Breadcrumb Placement
**Decision:** Between Header and main content (after `<Header />`, before `<main>`).
**Rationale:** Standard web convention. Provides immediate context after site navigation. Research confirms this is optimal placement for wayfinding without disrupting hero visual hierarchy.

### 3. Hero Badge Standardization
**Decision:** All hero sections use `.vf-hero-badge` (not `.vf-kicker`).
**Rationale:** Palantir and Lonestar pages already use `.vf-hero-badge`. Leadership page currently uses `.vf-kicker` for "Meet the Team" — standardizing to `.vf-hero-badge` ensures consistent styling across all page heroes and eliminates CSS class confusion. `.vf-kicker` remains for inline usage (e.g., leader bio role titles).

### 4. Hero Content for Partners/Experience
**Decision:** Use existing JSON content (title + intro) with new badge labels ("Technology & Teaming Partners" for Partners, "Mission-Driven Delivery" for Experience).
**Rationale:** Maintains content consistency with existing JSON structure (partners.json and experience.json). Badge provides category context matching site taxonomy.

### 5. Hero Images for New Heroes
**Decision:** Reuse existing `/assets/img/hero.jpg` for Partners and Experience.
**Rationale:** Existing hero image is high-quality, on-brand, and already optimized. No new imagery required for Tier 2 scope. Can be replaced later if client provides specific page hero images.

### 6. Desktop Section Padding Value
**Decision:** Increase from 80px to 100px (not 110-120px).
**Rationale:** 100px provides 25% increase in whitespace, which is substantial but not extreme. Maintains visual rhythm across existing content. Further increases can be A/B tested post-deployment.

### 7. `.vf-prose` Application
**Decision:** Define utility class but do NOT apply it in this plan.
**Rationale:** Review notes inline max-width overrides on specific pages, but systematic application requires auditing every content section to avoid breaking layouts (grids, cards, etc.). `.vf-prose` is defined for future use but application is deferred to avoid scope creep and unintended layout breakage.

## Testing Strategy

### Visual Regression Testing
- Load each subpage (Partners, Experience, Leadership, Federal Broadband, Program Management, Palantir, Lonestar, Careers, Contact) and verify breadcrumb appears below header with correct path segments
- Verify breadcrumb does NOT appear on homepage
- Verify all three hero pages (Partners, Experience, Leadership) now have full-bleed background images with overlay gradient
- Verify hero content is centered and uses `.vf-hero-content` pattern consistently
- Verify all hero badges use `.vf-hero-badge` class (not `.vf-kicker`)
- Test on mobile (760px), tablet (980px), and desktop (1200px+) to verify responsive padding scales correctly

### Spacing Audit
- Measure section padding in browser DevTools — desktop should be 100px, tablet 80px, mobile 48px
- Verify grid gaps on Leadership page bio sections are visually more spacious (56px vs. previous 42px)
- Verify heading margins feel less cramped (h2 has 16px bottom margin, lead has 24px bottom margin)
- Verify footer CTA sections have 80px padding top/bottom

### Breadcrumb Functionality
- Click each breadcrumb link to verify navigation works correctly
- Verify current page (last segment) is gold color and not a link
- Verify separator `/` appears between segments
- View page source and verify schema.org JSON-LD is present with correct @type: "BreadcrumbList"
- Verify Palantir breadcrumb shows "Palantir Foundry & AIP" (not "Palantir")
- Verify Lonestar breadcrumb shows "Lonestar"

### Cross-Browser Testing
- Test breadcrumb hover states in Chrome, Firefox, Safari
- Verify hero background images load correctly and cover full viewport width
- Verify no horizontal scrollbar appears due to full-bleed hero sections

## Out of Scope

### Explicitly NOT in Tier 2
- **Capability pages content audit** — Federal Broadband and Program Management pages already have heroes; no content changes required
- **Individual career posting pages** — Breadcrumbs will auto-generate for /careers/[slug] routes but no other changes to job detail pages
- **Admin pages** — /admin/jobs does not need breadcrumb (internal tool)
- **Homepage modifications** — Homepage hero already correct; no breadcrumb needed (skip rendering on `/`)
- **New imagery** — Reuse existing hero.jpg for Partners/Experience; no new hero images in scope
- **`.vf-prose` application** — Utility class defined but NOT systematically applied to avoid unintended layout breakage (deferred to future task)
- **Contact section padding** — `.vf-section--contact` remains at 48px/32px for "above the fold" design (intentional exception to spacing increases)
- **Mobile hero height standardization** — Current variable mobile hero heights (70vh vs. full viewport) are intentional; no changes
- **Trust bar on subpages** — Trust bar remains homepage-only feature
- **Typography scale changes** — Font sizes remain unchanged; only margins increase
- **Grid column ratio changes** — Grid template columns remain 0.9fr/1.1fr; only gap increases

## Acceptance Criteria

### Component Creation
- [ ] Breadcrumb component created at `C:/Users/mhsut/DevProjects/VFSsite/components/Breadcrumb.tsx`
- [ ] Breadcrumb includes schema.org BreadcrumbList JSON-LD
- [ ] Breadcrumb uses `usePathname()` for auto-generation
- [ ] Breadcrumb maintains label map with entries for 'palantir' and 'lonestar'
- [ ] Breadcrumb skips rendering on homepage (`pathname === '/'`)

### CSS Updates
- [ ] `.vf-breadcrumb` styles added to globals.css after `.vf-body` block with proper vf-* naming
- [ ] `.vf-prose` utility class defined (max-width: 800px, margin: 0 auto)
- [ ] Desktop section padding increased to 100px (find/replace exact block)
- [ ] Tablet section padding increased to 80px (find/replace within media query)
- [ ] Mobile section padding remains 48px (no change)
- [ ] Grid gap increased to 56px for `.vf-grid-image-left` (find/replace exact block)
- [ ] Grid gap increased to 56px for `.vf-grid-image-right` (find/replace exact block)
- [ ] `.vf-h2` margin-bottom increased to 16px (find/replace exact block)
- [ ] `.vf-lead` margin-bottom increased to 24px (find/replace exact block)
- [ ] `.vf-page-footer-cta` padding increased to 80px (find/replace exact block)

### Page Updates — Heroes
- [ ] Partners page has full-bleed hero with `.vf-hero-bg` background image
- [ ] Partners page hero uses `.vf-hero-content` for centered content
- [ ] Partners page hero uses `.vf-hero-badge` with "Technology & Teaming Partners"
- [ ] Experience page has NEW full-bleed hero section added
- [ ] Experience page hero uses `.vf-hero-badge` with "Mission-Driven Delivery"
- [ ] Experience page old "Page Intro" section removed (replaced by hero)
- [ ] Leadership page hero refactored to use `.vf-hero-content` instead of `.vf-container` + inline style
- [ ] Leadership page hero uses `.vf-hero-badge` (switched from `.vf-kicker`) with "Meet the Team"

### Page Updates — Breadcrumbs
- [ ] Breadcrumb imported and rendered on Partners page (after Header)
- [ ] Breadcrumb imported and rendered on Experience page (after Header)
- [ ] Breadcrumb imported and rendered on Leadership page (after Header, line 30)
- [ ] Breadcrumb imported and rendered on Federal Broadband page (after Header)
- [ ] Breadcrumb imported and rendered on Program Management page (after Header)
- [ ] Breadcrumb imported and rendered on Palantir page (after Header, line 32)
- [ ] Breadcrumb imported and rendered on Lonestar page (after Header, line 32)
- [ ] Breadcrumb imported and rendered on Careers page (after Header)
- [ ] Breadcrumb imported and rendered on Contact page (after Header)

### Visual Verification
- [ ] All subpages display breadcrumb navigation below header
- [ ] Homepage does NOT display breadcrumb
- [ ] Breadcrumb current page segment is gold color (`var(--accent)`)
- [ ] Breadcrumb links are muted gray with white hover state
- [ ] Partners, Experience, Leadership pages have consistent full-bleed hero pattern
- [ ] All hero sections use `.vf-hero-badge` (no `.vf-kicker` in heroes)
- [ ] Section spacing feels more generous on desktop (100px vs 80px)
- [ ] Grid layouts on Leadership page have more breathing room (56px gap)
- [ ] Typography margins create better vertical rhythm

### Technical Verification
- [ ] No TypeScript errors in Breadcrumb component
- [ ] No console errors on any page
- [ ] Schema.org JSON-LD validates (use schema.org validator)
- [ ] Next.js Image components use correct props (fill, priority, quality, style)
- [ ] All imports use relative paths (no @/ aliases)
- [ ] No horizontal scrollbar on any viewport size
- [ ] Mobile responsive behavior intact (breadcrumb wraps on narrow screens)
