# Plan: Palantir Content Integration & New Pages (Lonestar + Federal Palantir)
**Date:** 2026-04-16
**Status:** READY FOR IMPLEMENTATION

## Objective
Upgrade the ValorForge Solutions website with subtle Palantir integration across existing content (4 edits) and add two new pages: `/capabilities/palantir` (Federal Palantir capability) and `/lonestar` (Commercial division). This positions VFS as the only SDVOSB Palantir partner while maintaining platform-agnostic messaging and introducing the Lonestar commercial brand.

## Context Summary
- **From Review:** All changes approved. Existing carousel pattern supports adding 7th card to what_we_do and 5th to ai_alignment (carousel rotates 2-at-a-time, no overflow). Header dropdown is height-adaptive and supports 3 capabilities. NAV_ITEMS can accommodate 5 items. Comparison tables and advantage grids require new CSS classes (vf-comparison-table, vf-advantage-grid) to avoid semantic conflict with vf-card-grid. Sitemap requires two new entries. Footer needs Lonestar link + Palantir note.
- **From Research:** N/A
- **Constraints:** Must follow existing vf-* design system (dark backgrounds, gold/blue accents, Geist font). New pages clone federal-broadband pattern (Hero + content sections + footer CTA). Navigation sync is critical (Header.tsx, Footer.tsx, sitemap.ts must all update). JSON-driven content model (no hardcoded content in TSX). Competitor names in comparison tables publish as-is.

## Implementation Steps

### Phase 1: Content Updates (4 files)
1. **content/what_we_do.json** — Add 7th carousel card: id "palantir-foundry", title "Palantir Foundry & AIP Options", body text emphasizing "optional platform capability" framing, no link field (consistent with existing cards).

2. **content/ai_alignment.json** — Add 5th carousel card: id "platform-agnostic-ai", title "Platform-Agnostic AI Integration", body text describing platform-agnostic approach with optional Palantir integration.

3. **content/experience.json** — Update palantir-foundry case study (lines 22-33 per review): add "one of several platform options" framing to situation text. Preserve existing situation/role/outcome structure.

4. **components/Footer.tsx** — SINGLE COMBINED EDIT: (a) Add Lonestar link to footer navigation links array (href="/lonestar", label="Lonestar"). (b) Add small text line BELOW existing footer links: "ValorForge also offers Palantir Foundry and AIP as an optional capability within our broader federal technology solutions." Do NOT add a separate Palantir link — Palantir stays under Capabilities dropdown only.

### Phase 2: New Content Files (2 files)

5. **content/palantir.json** — Create JSON file with the following structure and exact content:

```json
{
  "seoTitle": "Federal Palantir Services | ValorForge Solutions",
  "seoDescription": "The only SDVOSB Palantir partner engineered for federal missions that cannot fail. CMMC 2.0 Level 2 certified Palantir Foundry and AIP implementation.",
  "hero": {
    "badge": "SDVOSB · CMMC 2.0 Level 2 Certified",
    "headline": "The Only SDVOSB Palantir Partner Engineered for Federal Missions That Cannot Fail",
    "subheadline": "National-scale Palantir Foundry delivery, trusted AI with guide-rail controls, and military-rooted accountability — with compliance built in from day one."
  },
  "intro": [
    "Palantir's trusted service providers each bring something valuable — deep technical expertise, rapid delivery, training excellence, or end-to-end support. ValorForge takes the best of every approach and adds what none of them can match: certified Service-Disabled Veteran-Owned Small Business status, CMMC 2.0 Level 2 compliance baked in from day one, national-scale Palantir Foundry delivery in critical infrastructure, and military-rooted execution discipline fused with Big Four rigor.",
    "We are not another ex-Palantir boutique chasing projects. We are the federal-first partner that delivers Palantir Foundry and AIP as an optional, high-impact capability layered directly onto our core federal broadband program management, modernization, AI governance, and CMMC services — with accountability that missions demand."
  ],
  "comparisonTable": {
    "competitors": [
      "ValorForge Solutions",
      "Foxtrot",
      "RANGR Data",
      "10x Partners",
      "Sibyllians",
      "ForgeSight / Fourth Age",
      "Ontologize / Ethicrithm / Aplos / Others"
    ],
    "rows": [
      {
        "capability": "SDVOSB Certified + Federal Set-Aside / Sole-Source Advantage",
        "ratings": ["Yes", "No", "No", "No", "No", "No", "No"]
      },
      {
        "capability": "CMMC 2.0 Level 2 Certified (built-in from day one)",
        "ratings": ["Yes", "No", "No", "No", "No", "No", "No"]
      },
      {
        "capability": "Veteran-Led + Military Execution Discipline",
        "ratings": ["Yes", "No", "No", "No", "Partial", "No", "No"]
      },
      {
        "capability": "Big Four Methodological Rigor",
        "ratings": ["Yes", "Strong", "Partial", "Strong", "Strong", "Partial", "Varies"]
      },
      {
        "capability": "Trusted AI Deployment with Palantir as the Operating System + Guide-Rail Controls",
        "ratings": ["Yes (Optional consulting & implementation service)", "Strong", "Good", "Good", "Good", "Moderate", "Strong"]
      },
      {
        "capability": "End-to-End Implementation & Integration",
        "ratings": ["Yes", "Strong", "Strong", "Strong", "Strong", "Strong", "Yes"]
      },
      {
        "capability": "Production Sustainment, Optimization & 24/7 Support",
        "ratings": ["Yes", "Yes", "Strong", "Moderate", "Yes", "Strong", "Moderate"]
      },
      {
        "capability": "Self-Sufficiency Training & Enablement",
        "ratings": ["Yes", "Yes", "Strong", "Strong", "Yes", "Strong", "Yes"]
      },
      {
        "capability": "Regulated / Mission-Critical Governance Focus",
        "ratings": ["Yes", "Moderate", "Moderate", "Moderate", "Moderate", "Moderate", "Moderate"]
      }
    ]
  },
  "advantages": [
    {
      "header": "National-Scale Proven Delivery",
      "parenthetical": "(beats boutiques like Foxtrot, ForgeSight, Northslope)",
      "body": "We executed one of the largest Palantir digital-twin deployments in U.S. critical infrastructure history — unifying 1,000+ data sources into real-time operational command centers. This same ontology-first framework is replicable across federal programs, delivering scale that pure-play implementers rarely achieve."
    },
    {
      "header": "Ironclad Compliance & Governance Built In",
      "parenthetical": "(beats everyone, including Ethicrithm and Fourth Age)",
      "body": "CMMC 2.0 Level 2 certified with zero-trust principles and guide-rail controls from the first day. Every Palantir engagement inherits federal-grade security, auditability, and risk management — no retrofitting required."
    },
    {
      "header": "Veteran-Led Discipline & Federal Contracting Superpower",
      "parenthetical": "(beats all ex-Palantir/FDE firms like Sibyllians, 10x Partners, Proxet)",
      "body": "SDVOSB set-aside and sole-source vehicles + military-rooted accountability ensure deadlines are met and outcomes are flawless. We combine senior expertise with the personal commitment only veterans bring."
    },
    {
      "header": "Trusted AI with Palantir as the Operating System",
      "parenthetical": "(beats AI-focused players like Codestrap and Ethicrithm)",
      "body": "Consulting and implementation for enterprise trusted AI models, data wrangling, agent orchestration, and policy-enforced guide rails — all while maintaining full auditability and mission alignment."
    },
    {
      "header": "End-to-End + Self-Sufficiency Focus",
      "parenthetical": "(surpasses Fourth Age, Ontologize, RANGR)",
      "body": "Full lifecycle support plus training and enablement so your teams become self-sufficient — without creating long-term vendor dependency."
    }
  ],
  "closingStatement": "When your federal mission requires Palantir Foundry or AIP, partner with the only provider that combines the best technical depth, training excellence, and rapid delivery of Palantir's service network with the compliance, contracting advantage, and mission discipline that only ValorForge delivers.",
  "footerCta": {
    "text": "Ready to deploy Palantir Foundry or AIP with federal-grade accountability?",
    "buttonText": "Contact ValorForge",
    "buttonHref": "/#contact"
  }
}
```

6. **content/lonestar.json** — Create JSON file with the following structure and exact content:

```json
{
  "seoTitle": "Lonestar Commercial Palantir Services | ValorForge Solutions",
  "seoDescription": "The commercial Palantir partner that disrupts the entire service provider market. National-scale proof, veteran discipline, and federal-grade backbone.",
  "hero": {
    "badge": "Commercial Division of ValorForge Solutions",
    "headline": "Lonestar: The Commercial Palantir Partner That Disrupts the Entire Service Provider Market",
    "subheadline": "National-scale telecom digital-twin proof, military-rooted execution discipline, and enterprise governance standards — with independent agility and federal-grade backbone."
  },
  "intro": [
    "Palantir's service providers each excel in one area: ex-Palantir depth, senior-only speed, embedded engineering, self-sufficiency training, or fast ROI. ValorForge Lonestar takes the absolute best from all of them — and adds what the market has been missing: national-scale telecom digital-twin proof at petabyte levels, military-rooted execution discipline, enterprise governance standards inherited from CMMC 2.0, and an independent commercial focus backed by federal-grade backbone. We are not limited by boutique scope, big-firm bureaucracy, or ex-Palantir alumni networks. We deliver faster, more sustainable, cross-industry results with accountability that cannot fail."
  ],
  "comparisonTable": {
    "competitors": [
      "ValorForge Lonestar",
      "Foxtrot",
      "RANGR Data",
      "10x Partners",
      "Sibyllians",
      "ForgeSight / Northslope / Proxet",
      "Codestrap / Aplos / Others"
    ],
    "rows": [
      {
        "capability": "SDVOSB-Backed Federal-Grade Backbone",
        "ratings": ["Yes", "No", "No", "No", "No", "No", "No"]
      },
      {
        "capability": "CMMC-Derived Enterprise Governance & Guide Rails (built-in)",
        "ratings": ["Yes", "Partial", "Good", "Partial", "Good", "Partial", "Moderate"]
      },
      {
        "capability": "Veteran-Led Execution Discipline + Military Tempo",
        "ratings": ["Yes", "No", "No", "No", "Partial", "No", "No"]
      },
      {
        "capability": "Big Four Methodological Rigor",
        "ratings": ["Yes", "Strong", "Partial", "Strong", "Strong", "Good", "Varies"]
      },
      {
        "capability": "Trusted AI + Palantir as the Operating System",
        "ratings": ["Yes (Optional service)", "Strong", "Good", "Good", "Good", "Moderate", "Strong"]
      },
      {
        "capability": "End-to-End Implementation & Rapid Time-to-Value",
        "ratings": ["Yes", "Strong", "Strong", "Strong", "Strong", "Strong", "Yes"]
      },
      {
        "capability": "Production Sustainment & Long-Term Optimization",
        "ratings": ["Yes", "Yes", "Strong", "Moderate", "Yes", "Yes", "Moderate"]
      },
      {
        "capability": "Self-Sufficiency Training & Enablement",
        "ratings": ["Yes", "Yes", "Strong", "Strong", "Yes", "Yes", "Yes"]
      },
      {
        "capability": "Independent Agility (No Acquired-Firm Bureaucracy)",
        "ratings": ["Yes", "Yes", "No (Accenture-owned)", "Yes", "Yes", "Varies", "Yes"]
      }
    ]
  },
  "advantages": [
    {
      "header": "National-Scale Telecom Digital Twin Proof as Your Blueprint",
      "parenthetical": "(surpasses Foxtrot's broad experience and ForgeSight's embedding model)",
      "body": "We have already delivered one of the largest Palantir Foundry deployments in U.S. history. That exact ontology-first, simplification-first architecture is now replicable to healthcare networks, banking risk platforms, manufacturing supply chains, energy logistics, and any regulated enterprise — delivering lower risk and faster time-to-value than any boutique or acquired firm."
    },
    {
      "header": "Senior Expertise + Veteran Discipline That Cannot Fail",
      "parenthetical": "(beats 10x Partners' senior-only teams, Sibyllians' FDE DNA, and Northslope's ROI focus)",
      "body": "Military-rooted accountability and Big Four methodological rigor ensure every engagement meets deadlines, mitigates risks, and drives compounding ROI — with the personal commitment only a veteran-led team delivers."
    },
    {
      "header": "End-to-End + Production Sustainment Excellence",
      "parenthetical": "(exceeds Fourth Age's full lifecycle and RANGR's modern implementation)",
      "body": "From ontology design and AIP agent orchestration to 24/7 monitoring, optimization, and long-term evolution — we keep your Palantir environment sharp for years, reducing vendor reliance while maximizing uptime and returns."
    },
    {
      "header": "Trusted AI Governance & Guide-Rail Controls",
      "parenthetical": "(outperforms Ethicrithm's competitive-advantage focus and Codestrap's AI services)",
      "body": "Palantir as the secure operating system for enterprise AI: data wrangling, model orchestration, policy-enforced guide rails, and full auditability — all with CMMC-derived standards applied commercially from day one."
    },
    {
      "header": "Self-Sufficiency + Rapid Enablement",
      "parenthetical": "(surpasses Ontologize's training model and Proxet's condensed timelines)",
      "body": "Hands-on delivery plus best-in-class user enablement and training so your teams own the platform long-term — delivered with startup speed and enterprise discipline."
    },
    {
      "header": "Independent Agility with Federal-Grade Backbone",
      "parenthetical": "(disrupts every player on Palantir's list)",
      "body": "As ValorForge's dedicated commercial arm, we move faster than acquired firms and deliver deeper scale and compliance than pure-play boutiques — without ever compromising on governance or outcomes."
    }
  ],
  "closingStatement": "TBD",
  "footerCta": {
    "text": "Ready to disrupt your industry with Palantir Foundry or AIP?",
    "buttonText": "Contact Lonestar",
    "buttonHref": "/#contact"
  }
}
```

### Phase 3: New Page Routes (2 files)

7. **app/capabilities/palantir/page.tsx** — Create page component cloning federal-broadband/page.tsx pattern. Import palantir.json content. Render:
   - HeroSection with hero data (badge, headline, subheadline)
   - Intro section with two paragraphs from intro array
   - Comparison table section (id="comparison") using vf-comparison-table class — render competitors as column headers, rows as capability + ratings array
   - Advantages section (id="advantages") using vf-advantage-grid class — map 5 advantages, each with header (bold vf-h3), parenthetical (italic muted), and body
   - Closing CTA section with closingStatement text and footerCta button
   - Add metadata exports (title: seoTitle, description: seoDescription) for SEO

8. **app/lonestar/page.tsx** — Create top-level route (not under /capabilities). Clone same page pattern as palantir/page.tsx but import lonestar.json. Render hero, intro (single paragraph), comparison table (id="comparison"), 6 advantages (id="advantages"), closing statement "TBD", and footerCta. Add metadata exports.

### Phase 4: Navigation Sync (3 files)

9. **components/Header.tsx** — Add Palantir item to CAPABILITIES_ITEMS array (lines 8-31). Structure:
```js
{
  href: "/capabilities/palantir",
  label: "Palantir Foundry & AIP",
  sections: [
    { href: "/capabilities/palantir#comparison", label: "Competitor Comparison" },
    { href: "/capabilities/palantir#advantages", label: "Disruptive Advantages" }
  ]
}
```
Add Lonestar to NAV_ITEMS array (lines 33-38): `{ href: "/lonestar", label: "Lonestar" }`

10. **components/Footer.tsx** — Already updated in Phase 1 Step 4. Verify Lonestar link added to footer navigation links array and Palantir note added as small text below links.

11. **app/sitemap.ts** — Add two entries to sitemap array:
```js
{
  url: 'https://valorforgellc.com/capabilities/palantir',
  lastModified: new Date(),
  changeFrequency: 'monthly',
  priority: 0.9,
},
{
  url: 'https://valorforgellc.com/lonestar',
  lastModified: new Date(),
  changeFrequency: 'monthly',
  priority: 0.9,
}
```

### Phase 5: CSS Design System (1 file)

12. **app/globals.css** — Add two new component classes at line 1391+ (after existing vf-partner-grid media queries):

```css
/* ═══════════════════════════════════════════ */
/* Comparison Table                           */
/* ═══════════════════════════════════════════ */
.vf-comparison-table {
  width: 100%;
  border-collapse: collapse;
  margin: 24px 0;
  font-size: 14px;
}

.vf-comparison-table th {
  background: var(--bg);
  border: 1px solid var(--border);
  padding: 12px 16px;
  text-align: left;
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.04em;
}

.vf-comparison-table th:first-child {
  background: rgba(245, 183, 74, 0.08);
  color: var(--accent);
  font-weight: 800;
}

.vf-comparison-table td {
  border: 1px solid var(--border);
  padding: 10px 14px;
  color: var(--muted);
  font-size: 14px;
  vertical-align: top;
}

.vf-comparison-table td:first-child {
  background: rgba(255, 255, 255, 0.02);
  font-weight: 600;
  color: var(--text);
}

.vf-comparison-table tr:nth-child(even) {
  background: rgba(255, 255, 255, 0.015);
}

@media (max-width: 760px) {
  .vf-comparison-table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
  .vf-comparison-table th,
  .vf-comparison-table td {
    min-width: 140px;
  }
}

/* ═══════════════════════════════════════════ */
/* Advantage Grid                             */
/* ═══════════════════════════════════════════ */
.vf-advantage-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin: 24px 0;
}

.vf-advantage-card {
  background: rgba(43, 114, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.vf-advantage-card:nth-child(odd) {
  background: rgba(245, 183, 74, 0.04);
}

.vf-advantage-header {
  font-size: 20px;
  font-weight: 700;
  color: var(--text);
  margin: 0;
}

.vf-advantage-parenthetical {
  font-size: 14px;
  font-style: italic;
  color: var(--muted);
  margin: 0 0 8px;
}

.vf-advantage-body {
  font-size: 15px;
  color: var(--muted);
  line-height: 1.55;
  margin: 0;
}

@media (max-width: 760px) {
  .vf-advantage-grid {
    grid-template-columns: 1fr;
  }
}
```

Note: vf-bg-blue-accent (line 144-150) and vf-bg-gold-accent (line 136-142) already exist in globals.css. These classes will be applied to sections, not individual cards. Advantage cards use rgba backgrounds in vf-advantage-card class above.

## File Inventory
| File | Action | Lines/Functions Affected |
|------|--------|--------------------------|
| content/what_we_do.json | MODIFY | Add 7th object to array (after id: "giving-back") |
| content/ai_alignment.json | MODIFY | Add 5th object to array (after id: "ai-policy-development") |
| content/experience.json | MODIFY | Update palantir-foundry case study situation text (L22-33) |
| components/Footer.tsx | MODIFY | Add Lonestar link to nav array + Palantir note text below links (footer body, ~L16-49) |
| content/palantir.json | CREATE | Full file (seoTitle, seoDescription, hero, intro[2], comparisonTable, advantages[5], closingStatement, footerCta) |
| content/lonestar.json | CREATE | Full file (seoTitle, seoDescription, hero, intro[1], comparisonTable, advantages[6], closingStatement: "TBD", footerCta) |
| app/capabilities/palantir/page.tsx | CREATE | Full file (clone federal-broadband pattern, import palantir.json, render sections with vf-comparison-table, vf-advantage-grid) |
| app/lonestar/page.tsx | CREATE | Full file (clone capability page pattern, import lonestar.json, render sections with vf-comparison-table, vf-advantage-grid) |
| components/Header.tsx | MODIFY | CAPABILITIES_ITEMS array (~L8-31): add Palantir with 2 subsections. NAV_ITEMS array (~L33-38): add Lonestar |
| app/sitemap.ts | MODIFY | Add 2 entries to sitemap array (~L3-47): /capabilities/palantir, /lonestar |
| app/globals.css | MODIFY | Add .vf-comparison-table and .vf-advantage-grid classes (~L1391+) |

## Architecture Decisions
- **New CSS classes instead of reusing vf-card-grid:** Comparison tables and advantage grids are semantically distinct from card grids. Using dedicated classes (vf-comparison-table, vf-advantage-grid) avoids semantic conflict and allows specific responsive behavior (tables scroll horizontally on mobile, advantages collapse to 1-col).
- **Lonestar as top-level route:** Lonestar is a distinct brand/division, not a capability under VFS Capabilities dropdown. Top-level route /lonestar matches its positioning as a separate commercial offering.
- **Palantir under /capabilities:** Federal Palantir capability is a service offering within VFS capabilities, consistent with federal-broadband and program-management.
- **Competitor names publish as-is:** Per instruction, comparison tables use actual competitor names without redaction or pseudonyms.
- **No link on what_we_do Palantir card:** Consistent with existing cards in what_we_do.json, which have no href field.
- **Mobile comparison table behavior:** Horizontal scroll (overflow-x: auto) on mobile. This is simpler than column collapsing and ensures all 7 competitor columns + row headers remain visible and readable at 320px+ viewport widths.
- **Palantir subsections in Header:** Two subsections matching page section IDs: "Competitor Comparison" (#comparison), "Disruptive Advantages" (#advantages). Follows existing pattern of Federal Broadband and Program Management capabilities with 2-5 subsections.
- **Footer single edit:** Phase 1 Step 4 and Phase 4 Step 10 are the same edit. Footer.tsx receives ONE combined edit: add Lonestar link to navigation links array, add Palantir note as small text below links. No separate Palantir link — Palantir remains under Capabilities dropdown only.
- **Lonestar closing CTA:** Uses placeholder "TBD" per user instruction. This is a deferred decision and does not block implementation. The closingStatement field in lonestar.json contains the literal string "TBD".

## Testing Strategy
- **Carousel rotation:** Verify 7th card in what_we_do and 5th in ai_alignment rotate correctly at 2-at-a-time visibleCount. Test mobile view (all cards display in vertical stack).
- **Navigation:** Test Header dropdown with 3 capabilities (Federal Broadband, Program Management, Palantir Foundry & AIP). Verify height doesn't exceed viewport at 760px mobile breakpoint. Test NAV_ITEMS with 5 items (Leadership, Partners, Careers, Contact, Lonestar) in mobile hamburger menu.
- **Responsive tables:** Test vf-comparison-table on mobile (320px, 375px, 760px). Verify horizontal scroll enables at <760px. Scroll right to verify all 7 competitor columns + row headers are readable. Test on iOS Safari for smooth scrolling behavior.
- **Advantage grid:** Verify 2-col layout on desktop (>760px), 1-col on mobile (≤760px). Check alternating gold/blue accent backgrounds on advantage cards.
- **Sitemap:** Verify /capabilities/palantir and /lonestar appear in generated sitemap.xml with priority 0.9, changeFrequency monthly.
- **Footer:** Verify Lonestar link navigates correctly to /lonestar. Verify Palantir note text displays below footer links as small text (13px, muted color).
- **SEO metadata:** Verify new pages export metadata for title/description. Check OpenGraph tags render in page head using View Source.
- **Anchor links:** Test Header subsection links (Competitor Comparison, Disruptive Advantages) navigate to #comparison, #advantages section IDs on /capabilities/palantir page without header clipping (scroll-margin-top applies).

## Out of Scope
- Creating a /capabilities landing page (Footer links directly to individual capabilities)
- Updating admin/jobs or any backend functionality
- Adding analytics tracking or conversion pixels to new pages
- Implementing interactive elements on comparison tables (sortable columns, filters, expandable rows)
- Adding images/screenshots to new pages (content is text-only per instruction)
- Updating partners.json or leadership.json with Palantir partnership details
- Creating a dedicated Lonestar logo or brand assets (uses VFS branding/theme)
- Building mobile-specific comparison table views beyond horizontal scroll (no column collapsing, no vertical stacking of table data)
- Finalizing Lonestar closing CTA text (remains "TBD" placeholder)

## Acceptance Criteria
- [ ] 7th card appears in What We Do carousel with "optional platform capability" framing
- [ ] 5th card appears in AI Alignment carousel with platform-agnostic messaging
- [ ] Palantir case study in experience.json includes "one of several platform options" framing
- [ ] Footer displays Lonestar link AND Palantir capability note (small text below links)
- [ ] /capabilities/palantir page renders with hero, intro (2 paragraphs), comparison table (7 competitors, 9 rows), 5 advantages, closing statement, CTA
- [ ] /lonestar page renders with hero, intro (1 paragraph), comparison table (7 competitors, 9 rows), 6 advantages, closing "TBD", CTA
- [ ] Header Capabilities dropdown includes "Palantir Foundry & AIP" with 2 subsections (Competitor Comparison, Disruptive Advantages)
- [ ] Header NAV_ITEMS includes Lonestar
- [ ] Sitemap includes /capabilities/palantir and /lonestar entries with priority 0.9
- [ ] vf-comparison-table class styles competitor tables with dark theme, gold accent on first column, 1px borders, horizontal scroll on mobile (<760px)
- [ ] vf-advantage-grid class styles advantages as 2-col desktop (>760px), 1-col mobile (≤760px) with alternating gold/blue accent card backgrounds
- [ ] All pages follow existing vf-* design system (Geist font, consistent spacing, color palette)
- [ ] No broken links in navigation (all hrefs resolve correctly)
- [ ] Mobile navigation accommodates 3 capability items and 5 top-level nav items without overflow
- [ ] Comparison tables display all 7 competitor columns + row headers on mobile via horizontal scroll
- [ ] Anchor links from Header subsections navigate to #comparison and #advantages sections without header clipping
