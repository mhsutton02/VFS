# Gap Analysis
**Date:** 2026-04-16
**Plan:** PLAN.md
**Verdict:** NEEDS_REVISION

## Ambiguities
- [Phase 2 Step 6 lonestar.json intro] — intro array shows 1 paragraph but JSON structure shows intro as array — architect must specify if intro contains single string or array with one element
- [Phase 3 Steps 7-8] — "clone federal-broadband/page.tsx pattern" but exact component import names not specified (HeroSection vs Hero, naming of comparison/advantage section components) — architect must specify component names or confirm cloning includes literal duplication of component structure
- [Phase 4 Step 9 Header.tsx] — "lines 8-31" and "lines 33-38" reference line numbers but does not account for line shifts after insertions — architect must specify insertion order or confirm line references are pre-edit state only
- [Phase 5 Step 12 globals.css] — "after existing vf-partner-grid media queries" at line 1391+ but does not confirm if vf-partner-grid is the immediate predecessor or if other classes exist between 1391 and insertion point — architect must specify exact insertion landmark

## Missing Context
- PLAN.md does not cite or provide content for existing federal-broadband/page.tsx structure that Steps 7-8 will clone — coding agent will need to read this file to understand pattern
- PLAN.md assumes vf-h3 class exists in design system but does not cite globals.css location or confirm class definition — coding agent may need to verify or create
- PLAN.md does not specify how HeroSection component accepts badge/headline/subheadline props (object destructure, individual props, content prop) — coding agent will infer from federal-broadband usage
- PLAN.md does not specify scroll-margin-top value for anchor link targets (#comparison, #advantages) to avoid header clipping — coding agent will need to apply existing scroll behavior or define new value

## Scope Risks
- Phase 1 Step 3 says "update palantir-foundry case study (lines 22-33)" but does not specify exact old_string/new_string for Edit tool — coding agent may need clarification on exact text replacement boundaries
- Phase 1 Step 4 combines two edits into "SINGLE COMBINED EDIT" but does not specify if these are sequential Edit calls or one multi-hunk edit — coding agent may interpret as two separate edits, contradicting "SINGLE" instruction
- Phase 5 Step 12 CSS block includes literal code but does not specify if rgba color values or var(--accent)/var(--border) references must match existing design tokens — coding agent may proceed without verifying token consistency
- Testing Strategy lists 8 test categories but no blocking criteria for what constitutes test failure — coding agent will implement without test validation checkpoints

## Assumption Flags
- Coding agent will assume intro array in lonestar.json contains array with single string element (not bare string) to match palantir.json structure despite "1 paragraph" description
- Coding agent will assume vf-h3 class exists and applies correct sizing/weight for advantage headers without verification
- Coding agent will assume HeroSection component import path is @/components/HeroSection without explicit import statement in Steps 7-8
- Coding agent will assume Footer.tsx "SINGLE COMBINED EDIT" means one Edit tool call with multi-line old_string/new_string encompassing both Lonestar link insertion and Palantir note addition
- Coding agent will assume mobile horizontal scroll for comparison tables requires no additional touch-action or -webkit-overflow-scrolling CSS despite iOS Safari mention in Testing Strategy

## Summary
Plan is structurally complete with clear phase organization and detailed JSON payloads but contains four critical ambiguities around array structure, component naming, line number stability, and CSS insertion landmarks that will force the coding agent to make interpretive decisions. Missing context around cloned file patterns and existing class definitions will require additional file reads during implementation. Verdict is NEEDS_REVISION to resolve intro array structure and clarify "SINGLE COMBINED EDIT" instruction.
