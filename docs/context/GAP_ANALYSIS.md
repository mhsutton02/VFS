# Gap Analysis
**Date:** 2026-04-18
**Plan:** PLAN.md
**Verdict:** NEEDS_REVISION

## Ambiguities

- [Step 6, line 295] — plan says replace lines 33-49 in leadership/page.tsx but actual file shows hero section ends at line 49, content is at lines 33-48, and uses `.vf-kicker` not `.vf-hero-badge` — architect must verify exact replacement range and whether to preserve `.vf-kicker` or switch to `.vf-hero-badge`
- [Step 7, line 322] — plan says change line 69 but does not specify find-and-replace string for `.vf-section` padding rule — architect must provide exact old_string to avoid replacing wrong occurrence
- [Step 8, lines 340-357] — plan says change lines 277 and 284 but does not specify if these are two separate Edit calls or one call per rule — architect must clarify execution approach
- [Step 3g, line 224] — plan adds breadcrumb to contact page but does not specify where in file structure (after Header at what line) — architect must provide insertion point or confirm "after Header" is sufficient instruction

## Missing Context

- [Step 3] — plan lists 7 pages for breadcrumb integration but VAULT.md shows palantir page exists at app/capabilities/palantir/page.tsx and lonestar page exists at app/lonestar/page.tsx — both missing from breadcrumb integration plan
- [Step 1, line 33] — breadcrumb label map missing entries for 'palantir' and 'lonestar' routes
- [Step 4, line 258] — plan references `partners.title` and `partners.intro` but does not cite that these exist in partners.json (verified they do exist, but plan should cite source)
- [Step 5, line 288] — plan references `content.headline` and `content.intro` but does not cite that these exist in experience.json (verified they do exist at lines 4-5, but plan should cite source)

## Scope Risks

- [Step 7-10] — plan provides specific line numbers for globals.css edits based on pre-Tier-1 file state but does not acknowledge that Tier 1 may have inserted CSS above these targets causing line drift — if line numbers are wrong, coder will need to search by content string which is not provided for all targets
- [Step 6, line 304] — plan specifies `leadership-hero.jpg` image path (verified it exists) but does not specify fallback behavior if image missing or whether to test image load before deployment
- [Step 2, line 96] — breadcrumb CSS insertion point "after line 350 (after .vf-body definition)" but .vf-body ends at line 351 — if other CSS was inserted between line 350-351 during Tier 1, insertion point is ambiguous

## Assumption Flags

- [Step 4-6] — plan assumes all hero sections should use `.vf-hero-badge` but leadership page currently uses `.vf-kicker` for "Meet the Team" — coder will be forced to decide whether to standardize or preserve existing pattern
- [Step 3] — plan assumes all pages have Header as direct child of fragment and main as next sibling, but does not verify this structure for federal-broadband, program-management, careers, and contact pages
- [Step 7, line 330] — plan says change tablet padding at line 986 from 64px to 80px but does not verify current value is actually 64px (verified it is, but plan should not assume)
- [Step 10, line 390] — plan changes footer CTA padding to 80px but does not specify whether this applies to desktop only or requires responsive overrides for mobile

## Summary

Plan is structurally sound but contains multiple line number ambiguities due to not accounting for Tier 1 CSS insertions, omits two capability pages (palantir, lonestar) from breadcrumb integration, and includes several assumptions about file structure that should be verified. The leadership page hero replacement instruction is unclear about whether to preserve `.vf-kicker` vs. switch to `.vf-hero-badge`. Needs targeted revision to provide exact find-and-replace strings for CSS edits and clarify hero badge naming convention.
