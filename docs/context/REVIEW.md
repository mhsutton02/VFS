# Code Review
**Date:** 2026-04-18
**Scope:** VFS website readiness for Tier 1 RANGR-inspired design morph (scroll animations, background textures, section dividers)

## Verdict: APPROVE

The codebase is **ready for Tier 1 implementation** with minimal architectural changes. The design system, component boundaries, and accessibility infrastructure are well-positioned to absorb scroll-triggered animations, background textures, and section dividers.

## Critical (P0)
None — no blocking issues identified.

## Important (P1)

- **globals.css:1065** — `prefers-reduced-motion` rule already exists and correctly disables animations. When adding new @keyframes, ensure they're included in the wildcard selector (`animation: none !important`).

- **components/*.tsx (all sections)** — All major sections are **server components** (HeroSection, CarouselSection, AboutSection, GivingBackSection, ContactSection). IntersectionObserver requires client-side code. Create a new `<AnimatedSection>` wrapper client component that accepts children and applies scroll-triggered animations. Keep existing components server-rendered to preserve performance.

- **globals.css:132-150** — Background classes (`.vf-bg-default`, `.vf-bg-gold-accent`, `.vf-bg-blue-accent`) use solid colors and radial gradients. Add new modifier classes (`.vf-bg-texture-dots`, `.vf-bg-texture-grid`, `.vf-bg-texture-wave`) that can be **composed** with existing background classes. Avoid replacing current backgrounds — layer textures on top.

- **app/page.tsx:20-61** — Section flow is clean but abrupt. Insert SVG/CSS divider elements between `<section>` tags. Consider a `<SectionDivider variant="wave" />` component that can be dropped between sections without disrupting layout.

## Suggestions (P2)

- **globals.css:372** — Carousel already has a fade/translate transition (`.vf-car-track`). Use this as a template for scroll-triggered animation timing (200ms duration, ease curve). Keep animation durations consistent across the site.

- **globals.css:190, 499, 715, 825** — Multiple hover transitions exist (0.15s–0.3s). New scroll animations should use longer durations (400–600ms) to feel less jarring than hover states.

- **components/Header.tsx:1** — Header is the only major client component. Consider adding a `useReducedMotion` hook that reads `prefers-reduced-motion` and provides a boolean to child components. This avoids inline media queries in every animated component.

- **globals.css:62-86** — `.vf-section` and `.vf-container` are well-structured base classes. Add animation classes that target these existing wrappers (`.vf-section.vf-animate-fade-in-bottom`) rather than creating new wrapper divs. Keeps DOM clean.

- **app/lonestar/page.tsx & app/capabilities/palantir/page.tsx:34** — Both use identical hero structure. When adding scroll animations, ensure consistency across all page templates (homepage, capability pages, lonestar).

## What's Good

- **CSS naming convention** — The `vf-*` prefix is consistent across 2162 lines. New animation classes (e.g., `vf-reveal-fade`, `vf-bg-texture-dots`) will integrate seamlessly.

- **Server/client boundaries** — Clean separation. Only Header and Carousel are client components. This makes it easy to add a single `<AnimatedSection>` client wrapper without infecting the component tree.

- **Accessibility** — Focus states (line 1073-1086), scroll-margin-top (line 1106-1113), and `prefers-reduced-motion` (line 1065) are already implemented. Tier 1 animations won't degrade a11y.

- **Transition infrastructure** — The `.vf-car-track-exit` / `.vf-car-track-enter` pattern (line 375-383) in the carousel shows a working state-based transition system. Apply this pattern to scroll animations.

- **Background system** — The three-background pattern (`default`, `gold-accent`, `blue-accent`) is applied consistently in `app/page.tsx` (lines 31, 43, 55). Adding optional texture modifiers won't disrupt the existing rhythm.

## Action Items

1. **Create `components/AnimatedSection.tsx`** — Client component that wraps children, uses IntersectionObserver, and applies a CSS class on scroll-in. Reads `prefers-reduced-motion` to conditionally enable animations.

2. **Add @keyframes to `globals.css`** — Define `fade-in-bottom`, `fade-in-left`, `fade-in-right`, `zoom-in` animations with 400–600ms durations and ease curves. Ensure line 1067 disables them for reduced-motion users.

3. **Add texture modifier classes** — `.vf-bg-texture-dots`, `.vf-bg-texture-grid`, `.vf-bg-texture-wave` using CSS background patterns or inline SVG data URIs. Make them composable with existing `.vf-bg-*` classes.

4. **Create `components/SectionDivider.tsx`** — Server component that renders decorative SVG/CSS dividers. Props: `variant: "wave" | "slant" | "arrow"`. Keep inline in JSX or extract to separate component based on complexity.

5. **Test on capability pages** — After implementing on `app/page.tsx`, apply same patterns to `app/capabilities/palantir/page.tsx` and `app/lonestar/page.tsx` to ensure consistency.

6. **Verify mobile behavior** — Existing mobile breakpoint at 760px (line 1012) may need adjustments for dividers. Test that SVG dividers scale correctly and don't create layout shifts.
