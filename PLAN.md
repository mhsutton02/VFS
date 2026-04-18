# Plan: Tier 3 RANGR Design Morph — Link Accent Consistency & Card Grid Standardization
**Date:** 2026-04-18
**Status:** READY FOR IMPLEMENTATION

## Objective
Complete Tier 3 of the RANGR-inspired design morph by standardizing link accent colors and card hover states across the VFS website. Eliminate undefined CSS class references, create utility classes for reusable patterns, and unify interactive UI behaviors to match the design system.

## Context Summary
- **From Review:** Missing `.vf-btn-gold` class definition (referenced in partners page but not defined). Inline accent link colors in forms and careers page. Missing hover transitions on nav links. Inconsistent hover states across card grids (program cards, partner cards, careers cards). Carousel cards lack hover effect before active state.
- **Constraints:** Next.js 14 App Router, relative imports only (no @/ aliases), CSS custom properties in `globals.css`, all edits must use exact find/replace strings (no line-number-only references).
- **Architecture:** Tier 1 (scroll animations, textures, dividers) and Tier 2 (breadcrumbs, heroes, whitespace) are complete. This plan targets P0 and P1 issues plus selected P2 improvements (card grid gap standardization, carousel card hover, logo hover scale).

## Implementation Steps

### 1. `C:\Users\mhsut\DevProjects\VFSsite\app\globals.css`
Define `.vf-btn-gold` class, create `.vf-link-accent` utility, add nav transition, add hover states to all card types, standardize card grid gap, add partner logo hover scale, add carousel card hover.

**Step 1a: Define `.vf-btn-gold` after `.vf-btn-primary`**
- Find the `.vf-btn-ghost` block and replace it with `.vf-btn-gold` definition

**Step 1b: Create `.vf-link-accent` utility class after breadcrumb styles**
- Add new utility class after `.vf-breadcrumb-current` rule

**Step 1c: Add transition to nav links**
- Add `transition: color 0.2s ease;` to `.vf-nav-list a`

**Step 1d: Fix partner card button selector**
- Change `.vf-partner-card .vf-btn-gold` to `.vf-partner-card a`

**Step 1e: Add hover state to program cards**
- Add transition and hover rule to `.vf-program-card`

**Step 1f: Add hover state to partner cards**
- Add transition and hover rule to `.vf-partner-card`

**Step 1g: Add hover state to careers cards**
- Add transition and hover rule to `.vf-careers-card`

**Step 1h: Add hover state to carousel cards**
- Add transition and hover rule to `.vf-card`

**Step 1i: Standardize card grid gap to 24px**
- Change `.vf-card-grid` gap from 20px to 24px

**Step 1j: Add partner logo hover scale**
- Add `transform: scale(1.02);` to `.vf-partners-logos a:hover`

### 2. `C:\Users\mhsut\DevProjects\VFSsite\components\ApplicationForm.tsx`
Replace inline accent link color with `.vf-link-accent` class.

**Step 2a: Replace inline style on email link**
- Replace `style={{ color: "var(--accent)" }}` with `className="vf-link-accent"`

### 3. `C:\Users\mhsut\DevProjects\VFSsite\components\ContactForm.tsx`
Replace inline accent link color with `.vf-link-accent` class.

**Step 3a: Replace inline style on email link**
- Replace `style={{ color: "var(--accent)" }}` with `className="vf-link-accent"`

### 4. `C:\Users\mhsut\DevProjects\VFSsite\app\careers\page.tsx`
Replace inline accent link color with `.vf-link-accent` class.

**Step 4a: Replace inline style on "reach out" link**
- Replace `style={{ color: "var(--accent)" }}` with `className="vf-link-accent"`

## File Inventory
| File | Action | Lines/Functions Affected |
|------|--------|------------------------|
| `C:\Users\mhsut\DevProjects\VFSsite\app\globals.css` | MODIFY | `.vf-btn-gold` (define, L433-437), `.vf-link-accent` (create, after L396), `.vf-nav-list a` (add transition, L262-272), `.vf-partner-card .vf-btn-gold` (fix selector, L1636-1639), `.vf-program-card` (add hover, L1546-1580), `.vf-partner-card` (add hover, L1603-1640), `.vf-careers-card` (add hover, L750-761), `.vf-card` (add hover, L494-540), `.vf-card-grid` (change gap, L1542), `.vf-partners-logos a:hover` (add scale, L605-608) |
| `C:\Users\mhsut\DevProjects\VFSsite\components\ApplicationForm.tsx` | MODIFY | Email link (L158) |
| `C:\Users\mhsut\DevProjects\VFSsite\components\ContactForm.tsx` | MODIFY | Email link (L146) |
| `C:\Users\mhsut\DevProjects\VFSsite\app\careers\page.tsx` | MODIFY | "reach out" link (L131) |

## Architecture Decisions
- **Define `.vf-btn-gold` as a new button class** — Active usage in partners page markup (lines 69, 86) requires a defined class. Styling: gold background (`var(--accent)`), dark text (`#0a0a0a`), matching `.vf-btn-primary` intent but semantically distinct for gold CTAs.
- **Create `.vf-link-accent` utility class** — Centralized accent link styling with hover opacity transition (matches breadcrumb link pattern). Applied to all email fallback links and inline "reach out" link.
- **Consistent card hover pattern** — All card types use `transition: border-color 0.2s, background 0.2s;` on base, `border-color: rgba(245, 183, 74, 0.3); background: rgba(255, 255, 255, 0.06);` on hover (program cards, partner cards) or slight variations for careers cards and carousel cards.
- **Nav transition** — Add `transition: color 0.2s ease;` to nav links to smooth color shift on hover (eliminates instant jump).
- **Standardize card grid gap to 24px** — Aligns program cards with partner cards and careers cards for visual consistency.
- **Partner logo hover scale** — Add subtle `scale(1.02)` on hover for additional polish (P2 improvement, low risk).
- **Carousel card hover** — Add subtle border-color change on hover before click to improve interactivity feedback (P2 improvement, low risk).

## Testing Strategy
- **Visual regression** — Compare partners page before/after to verify gold button styling renders correctly.
- **Link hover states** — Test email links in ApplicationForm, ContactForm, and careers page "reach out" link for accent color and hover opacity transition.
- **Nav hover** — Verify nav links transition smoothly on color change (no instant jump).
- **Card hover states** — Test all card grids (program cards on programs page, partner cards on partners page, careers cards on careers page, careers role links, carousel cards on homepage) for consistent hover effects.
- **Card grid gap** — Verify program card grid gap matches partner and careers card grids (24px).
- **Partner logo hover** — Test Giving Back section logos for subtle scale on hover.
- **Carousel hover** — Test homepage carousel cards for border-color shift on hover before click.
- **Mobile responsive** — Verify all changes work on mobile (especially nav transition, card hovers, and link styles).

## Out of Scope
- Removing unused `.vf-btn-ghost` class (P2 cleanup, not critical for consistency).
- Extracting `.vf-disclaimer` utility class for inline disclaimer styles (P2 cleanup, no consistency impact).
- Any other P2 cosmetic improvements not explicitly included above.
- Modifying carousel active state (already functional).
- Changing button markup in partners page (only CSS selector change).

## Acceptance Criteria
- [ ] `.vf-btn-gold` class defined in `globals.css` and renders correctly on partners page CTAs
- [ ] `.vf-link-accent` utility class created and applied to all email links (ApplicationForm, ContactForm) and "reach out" link (careers page)
- [ ] Nav links transition smoothly on hover (color change with 0.2s ease)
- [ ] Program cards have hover state (border-color accent + background tint)
- [ ] Partner cards have hover state (border-color accent + background tint)
- [ ] Careers cards have hover state (border-color accent + background tint)
- [ ] Carousel cards have hover state (subtle border-color shift)
- [ ] Card grid gap standardized to 24px across all card grids
- [ ] Partner logos scale slightly on hover (1.02)
- [ ] No console errors or broken styles
- [ ] All changes use exact find/replace strings (verified in implementation)

---

## Exact Find/Replace Strings

### `C:\Users\mhsut\DevProjects\VFSsite\app\globals.css`

**Edit 1: Replace `.vf-btn-ghost` with `.vf-btn-gold`**
```
OLD:
.vf-btn-ghost {
  background: var(--accent);
  border-color: rgba(0, 0, 0, 0.15);
  color: #0a0a0a;
}

NEW:
.vf-btn-gold {
  background: var(--accent);
  color: #0a0a0a;
  border-color: var(--accent);
}
```

**Edit 2: Add `.vf-link-accent` utility class after `.vf-breadcrumb-current`**
```
OLD:
.vf-breadcrumb-current {
  color: var(--accent);
  font-weight: 500;
}

/* Prose Width Utility */

NEW:
.vf-breadcrumb-current {
  color: var(--accent);
  font-weight: 500;
}

/* Link accent utility */
.vf-link-accent {
  color: var(--accent);
  text-decoration: underline;
  transition: opacity 0.2s;
}

.vf-link-accent:hover {
  opacity: 0.8;
}

/* Prose Width Utility */
```

**Edit 3: Add transition to nav links**
```
OLD:
.vf-nav-list a {
  text-decoration: none;
  color: var(--muted);
  font-size: 14px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

NEW:
.vf-nav-list a {
  text-decoration: none;
  color: var(--muted);
  font-size: 14px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: color 0.2s ease;
}
```

**Edit 4: Add hover state to program cards**
```
OLD:
.vf-program-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
}

NEW:
.vf-program-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  transition: border-color 0.2s, background 0.2s;
}

.vf-program-card:hover {
  border-color: rgba(245, 183, 74, 0.3);
  background: rgba(255, 255, 255, 0.06);
}
```

**Edit 5: Add hover state to partner cards**
```
OLD:
.vf-partner-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius);
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

NEW:
.vf-partner-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius);
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: border-color 0.2s, background 0.2s;
}

.vf-partner-card:hover {
  border-color: rgba(245, 183, 74, 0.3);
  background: rgba(255, 255, 255, 0.06);
}
```

**Edit 6: Add hover state to careers cards**
```
OLD:
.vf-careers-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius);
  padding: 32px;
}

NEW:
.vf-careers-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius);
  padding: 32px;
  transition: border-color 0.2s, background 0.2s;
}

.vf-careers-card:hover {
  border-color: rgba(245, 183, 74, 0.4);
  background: rgba(255, 255, 255, 0.07);
}
```

**Edit 7: Add hover state to carousel cards**
```
OLD:
/* Card */
.vf-card {
  flex: 0 0 calc((100% - 14px) / 2);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  padding: 14px 14px 12px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.32);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 288px;
}

NEW:
/* Card */
.vf-card {
  flex: 0 0 calc((100% - 14px) / 2);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  padding: 14px 14px 12px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.32);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 288px;
  transition: border-color 0.15s;
}

.vf-card:hover {
  border-color: rgba(245, 183, 74, 0.25);
}
```

**Edit 8: Standardize card grid gap to 24px**
```
OLD:
.vf-card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 24px;
}

NEW:
.vf-card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 24px;
}
```

**Edit 9: Add partner logo hover scale**
```
OLD:
.vf-partners-logos a:hover {
  filter: grayscale(0%);
  opacity: 1;
}

NEW:
.vf-partners-logos a:hover {
  filter: grayscale(0%);
  opacity: 1;
  transform: scale(1.02);
}
```

**Edit 10: Fix partner card button selector**
```
OLD:
.vf-partner-card .vf-btn-gold {
  align-self: flex-start;
  margin-top: 8px;
}

NEW:
.vf-partner-card a {
  align-self: flex-start;
  margin-top: 8px;
}
```

### `C:\Users\mhsut\DevProjects\VFSsite\components\ApplicationForm.tsx`

**Edit 1: Replace inline style on email link**
```
OLD:
          <a href="mailto:careers@valorforgesolutions.com" style={{ color: "var(--accent)" }}>

NEW:
          <a href="mailto:careers@valorforgesolutions.com" className="vf-link-accent">
```

### `C:\Users\mhsut\DevProjects\VFSsite\components\ContactForm.tsx`

**Edit 1: Replace inline style on email link**
```
OLD:
          <a href="mailto:contact@valorforgesolutions.com" style={{ color: "var(--accent)" }}>

NEW:
          <a href="mailto:contact@valorforgesolutions.com" className="vf-link-accent">
```

### `C:\Users\mhsut\DevProjects\VFSsite\app\careers\page.tsx`

**Edit 1: Replace inline style on "reach out" link**
```
OLD:
                  <Link href="/#contact" style={{ color: "var(--accent)" }}>

NEW:
                  <Link href="/#contact" className="vf-link-accent">
```
