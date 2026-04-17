# Code Review
**Date:** 2026-04-16
**Scope:** Pre-implementation review for Palantir/Lonestar upgrade — existing patterns, carousel capacity, navigation sync, and design system readiness

## Verdict: APPROVE

## Critical (P0)
None. The existing architecture supports the planned changes.

## Important (P1)

- **C:/Users/mhsut/DevProjects/VFSsite/hooks/useCarousel.ts:11** — Carousel `visibleCount` is hardcoded to 2. Adding a 7th card to what_we_do.json or 5th to ai_alignment.json is safe (carousel rotates 2-at-a-time, mobile displays all). No overflow risk. No changes needed.

- **C:/Users/mhsut/DevProjects/VFSsite/components/Header.tsx:8-31** — CAPABILITIES_ITEMS dropdown uses vertical menu with subsections. Adding a 3rd capability (Palantir) will increase menu height. Current styling supports this (vf-nav-dropdown-menu is height: auto). Test on mobile to ensure dropdown doesn't exceed viewport height at 760px breakpoint where nav becomes full-screen overlay.

- **C:/Users/mhsut/DevProjects/VFSsite/components/Header.tsx:33-38** — NAV_ITEMS array holds 4 items (Leadership, Partners, Careers, Contact). Adding "Lonestar" creates 5 items at 22px gap (line 204, globals.css). Desktop nav uses flexbox with 22px gap — no overflow risk. Verify mobile hamburger menu layout accommodates 5 items cleanly.

- **C:/Users/mhsut/DevProjects/VFSsite/app/sitemap.ts:3-47** — Sitemap uses hardcoded array of MetadataRoute.Sitemap objects. Must add two new entries: `/capabilities/palantir` (priority 0.9) and `/lonestar` (priority 0.8 or 0.9, align with existing top-level pages). Follow existing canonical URL pattern.

## Suggestions (P2)

- **C:/Users/mhsut/DevProjects/VFSsite/app/globals.css:1338-1391** — Existing `.vf-card-grid` is optimized for 6-card layouts (3x2 desktop, 2x? tablet, 1x? mobile). New pages plan comparison tables and advantages grids. Consider whether these new UI elements should reuse `.vf-card-grid` or get dedicated class names (`.vf-comparison-table`, `.vf-advantage-grid`) to avoid semantic conflicts.

- **C:/Users/mhsut/DevProjects/VFSsite/content/experience.json:22-33** — Palantir Foundry case study currently says "National-Scale Telecom Topology Mapping — Palantir Foundry." Update to add "one of several platform options" framing as planned. Ensure this doesn't create positioning conflict with new Palantir capability page — distinguish between case study (past engagement) and capability page (service offering).

- **C:/Users/mhsut/DevProjects/VFSsite/components/Footer.tsx:6-49** — Footer has simple 2-column layout (title block left, links right). Adding "Lonestar" and "Palantir" requires updating links. Current Footer only links to "Capabilities" (line 16-21, points to /capabilities/federal-broadband). Consider whether Footer should link to all capabilities individually or create a capabilities landing page pattern.

## What's Good

- **Capability page pattern is clean and consistent.** Both existing pages (federal-broadband/page.tsx and program-management/page.tsx) follow the same structure: Hero + content sections + footer CTA. New pages can clone this pattern with zero risk.

- **Design system is comprehensive.** The vf-* CSS classes cover all needed primitives: `.vf-h2`, `.vf-kicker`, `.vf-body`, `.vf-section`, background accents (`.vf-bg-gold-accent`, `.vf-bg-blue-accent`, `.vf-bg-default`), `.vf-card-grid`, `.vf-stat-row`, `.vf-capability-list`, `.vf-credential-badge`, `.vf-program-card`. New content can be styled without adding CSS (unless comparison tables and advantage grids are genuinely new patterns).

- **JSON-driven content model is robust.** All existing pages load metadata and sections from JSON files. The new pages (palantir.json, lonestar.json) follow this pattern cleanly. TypeScript won't complain as long as JSON structure matches usage in TSX.

- **Navigation is modular and extensible.** CAPABILITIES_ITEMS and NAV_ITEMS are clean arrays. Adding Palantir to dropdown and Lonestar to top-level nav is a 2-line change each. Dropdown CSS is height-adaptive, not fixed.

## Action Items

1. Add 7th card to C:/Users/mhsut/DevProjects/VFSsite/content/what_we_do.json (safe, carousel rotates)
2. Add 5th card to C:/Users/mhsut/DevProjects/VFSsite/content/ai_alignment.json (safe, carousel rotates)
3. Update "Palantir Foundry" case study in C:/Users/mhsut/DevProjects/VFSsite/content/experience.json with "one of several platform options" framing
4. Create C:/Users/mhsut/DevProjects/VFSsite/content/palantir.json and C:/Users/mhsut/DevProjects/VFSsite/content/lonestar.json
5. Create C:/Users/mhsut/DevProjects/VFSsite/app/capabilities/palantir/page.tsx (clone federal-broadband pattern)
6. Create C:/Users/mhsut/DevProjects/VFSsite/app/lonestar/page.tsx (clone existing capability page pattern, but top-level route)
7. Add Palantir to CAPABILITIES_ITEMS array in C:/Users/mhsut/DevProjects/VFSsite/components/Header.tsx (line 8-31)
8. Add Lonestar to NAV_ITEMS array in C:/Users/mhsut/DevProjects/VFSsite/components/Header.tsx (line 33-38)
9. Add Lonestar + Palantir links to C:/Users/mhsut/DevProjects/VFSsite/components/Footer.tsx (decide: individual links or capabilities landing page)
10. Add subtle Palantir note to C:/Users/mhsut/DevProjects/VFSsite/components/Footer.tsx as planned
11. Add `/capabilities/palantir` and `/lonestar` entries to C:/Users/mhsut/DevProjects/VFSsite/app/sitemap.ts
12. Define CSS for comparison tables and advantage grids in C:/Users/mhsut/DevProjects/VFSsite/app/globals.css (if new UI patterns; else reuse `.vf-card-grid`)
13. Test dropdown menu height on mobile (760px breakpoint) with 3 capability items
14. Test mobile nav with 5 NAV_ITEMS (4 existing + Lonestar)
