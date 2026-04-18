# Plan: RANGR Design Morph — Tier 1 (REVISED)
**Date:** 2026-04-18
**Status:** READY FOR IMPLEMENTATION

## Objective
Add scroll-triggered animations, background textures, and section dividers to the VFS website to create depth and visual interest while maintaining performance and accessibility. This is Tier 1 of a multi-phase design enhancement.

## Context Summary
- **From Review:** Codebase is ready. All sections are server components except Header and Carousel. `prefers-reduced-motion` rule exists at globals.css:1065. Background classes (`.vf-bg-*`) use solid colors/gradients at lines 132-150. Section flow in app/page.tsx lines 20-61 is clean. Recommend creating client wrapper component for animations, adding texture modifiers (not replacements), and using consistent 400-600ms animation durations.
- **From Research:** IntersectionObserver must be client-side. Use `threshold: 0.1`, `rootMargin: '50px'` for reveal timing. CSS-only textures via `radial-gradient` (dots), `linear-gradient` (grid), and inline SVG `feTurbulence` (noise). Only animate `transform` and `opacity` for GPU acceleration. Use `clip-path: polygon()` for dividers. Must respect `prefers-reduced-motion` with `animation: none` fallback.
- **From Gap Analysis:** Component wrappers (CarouselSection, AboutSection, GivingBackSection, ContactSection) already render their own `<section>` tags with background classes. ScrollReveal wraps the component call, NOT the internal section. Import paths use relative imports, NOT `@/` aliases. Palantir page has 4 content sections: Intro, Comparison Table, Advantages, Closing Statement (no "Capabilities" section). SectionDivider uses new CSS class `.vf-divider-top` positioned at TOP of each section, not bottom of previous section.
- **Constraints:** Do NOT convert server components to client components. Do NOT modify existing CSS classes. Keep existing `.vf-bg-*` classes intact — textures are additive. No external dependencies. Hero sections do NOT get scroll reveal (immediately visible). All animations disabled when `prefers-reduced-motion: reduce`.

## Implementation Steps

### 1. Create `C:/Users/mhsut/DevProjects/VFSsite/components/ScrollReveal.tsx`
Client component that wraps children and applies scroll-triggered animations using IntersectionObserver.

**Implementation:**
```typescript
'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  animation?: 'vf-fadeInUp' | 'vf-fadeInLeft' | 'vf-fadeInRight' | 'vf-scaleIn'
  delay?: number
  threshold?: number
  className?: string
}

export default function ScrollReveal({
  children,
  animation = 'vf-fadeInUp',
  delay = 0,
  threshold = 0.15,
  className = ''
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    // Fallback for browsers without IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect() // Reveal once, cleanup
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])

  return (
    <div
      ref={ref}
      className={`vf-reveal ${isVisible ? `vf-reveal-visible ${animation}` : ''} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
```

**Key details:**
- Client component (`'use client'`)
- Uses IntersectionObserver with `threshold: 0.15` and `rootMargin: '0px 0px -50px 0px'`
- Disconnects observer after first reveal (performance)
- Applies `.vf-reveal` (pending state) and `.vf-reveal-visible` (animated state) classes
- Supports optional delay prop for staggered animations
- Fallback to `isVisible: true` for old browsers

---

### 2. Create `C:/Users/mhsut/DevProjects/VFSsite/components/SectionDivider.tsx`
Server component that renders decorative SVG dividers between sections.

**Implementation:**
```typescript
interface SectionDividerProps {
  variant: 'wave' | 'slant' | 'curve'
  flip?: boolean
  color?: string
  className?: string
}

export default function SectionDivider({
  variant,
  flip = false,
  color = 'currentColor',
  className = ''
}: SectionDividerProps) {
  const svgPaths = {
    wave: 'M0,32 C160,80 320,0 480,48 C640,96 800,16 960,64 L960,0 L0,0 Z',
    slant: 'M0,0 L960,64 L960,0 Z',
    curve: 'M0,0 C320,80 640,80 960,0 L960,0 L0,0 Z'
  }

  return (
    <div className={`vf-divider-top ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 960 64"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transform: flip ? 'scaleY(-1)' : 'none'
        }}
      >
        <path d={svgPaths[variant]} fill={color} />
      </svg>
    </div>
  )
}
```

**Key details:**
- Server component (no 'use client')
- Three variants: wave (organic curves), slant (diagonal), curve (smooth arc)
- `flip` prop mirrors the divider vertically
- `color` prop defaults to `currentColor` (inherits from parent)
- Uses `preserveAspectRatio="none"` for full-width scaling
- Marked `aria-hidden="true"` (decorative only)
- Uses `.vf-divider-top` class for positioning at TOP of section

---

### 3. Modify `C:/Users/mhsut/DevProjects/VFSsite/app/globals.css`

**Add @keyframes animations after line 1063 (before prefers-reduced-motion block):**

```css
/* Scroll reveal animations */
@keyframes vf-fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes vf-fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes vf-fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes vf-scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Reveal states */
.vf-reveal {
  opacity: 0;
}

.vf-reveal-visible {
  opacity: 1;
}

.vf-reveal-visible.vf-fadeInUp {
  animation: vf-fadeInUp 600ms ease-out forwards;
}

.vf-reveal-visible.vf-fadeInLeft {
  animation: vf-fadeInLeft 500ms ease-out forwards;
}

.vf-reveal-visible.vf-fadeInRight {
  animation: vf-fadeInRight 500ms ease-out forwards;
}

.vf-reveal-visible.vf-scaleIn {
  animation: vf-scaleIn 550ms ease-out forwards;
}
```

**Add background texture classes after line 150 (after existing .vf-bg-* classes):**

```css
/* Background textures (composable with .vf-bg-* classes) */
.vf-texture-dots {
  position: relative;
}

.vf-texture-dots::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(255, 255, 255, 0.06) 1.5px, transparent 1.5px);
  background-size: 24px 24px;
  pointer-events: none;
  z-index: 0;
}

.vf-texture-grid {
  position: relative;
}

.vf-texture-grid::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
  background-size: 32px 32px;
  pointer-events: none;
  z-index: 0;
}

.vf-texture-noise {
  position: relative;
}

.vf-texture-noise::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 0;
}

/* Ensure child content sits above textures */
.vf-texture-dots > *,
.vf-texture-grid > *,
.vf-texture-noise > * {
  position: relative;
  z-index: 1;
}
```

**Add divider positioning after line 1063 (with reveal animations):**

```css
/* Section dividers */
.vf-divider-top {
  position: absolute;
  top: -1px;
  left: 0;
  width: 100%;
  height: 60px;
  pointer-events: none;
  z-index: 5;
}

.vf-divider-top svg {
  display: block;
  width: 100%;
  height: 100%;
}

@media (min-width: 760px) {
  .vf-divider-top {
    height: 80px;
  }
}
```

**Update the prefers-reduced-motion block at line 1065:**

Find:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }
}
```

Replace with:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }

  /* Ensure reveal content is visible */
  .vf-reveal {
    opacity: 1 !important;
  }
}
```

---

### 4. Modify `C:/Users/mhsut/DevProjects/VFSsite/components/CarouselSection.tsx`

**Add textureClass prop to component interface (line 5-15):**

Find:
```typescript
type CarouselSectionProps = {
  id: string;
  altBackground?: boolean;
  reverse?: boolean;
  imageSrc: string;
  imageAlt: string;
  title: string;
  intro: string;
  ctaText: string;
  items: CarouselItem[];
};
```

Replace with:
```typescript
type CarouselSectionProps = {
  id: string;
  altBackground?: boolean;
  reverse?: boolean;
  imageSrc: string;
  imageAlt: string;
  title: string;
  intro: string;
  ctaText: string;
  items: CarouselItem[];
  textureClass?: string;
};
```

**Add textureClass to function parameters and className (line 17-33):**

Find:
```typescript
export function CarouselSection({
  id,
  altBackground,
  reverse,
  imageSrc,
  imageAlt,
  title,
  intro,
  ctaText,
  items
}: CarouselSectionProps) {
  const sectionBgClass = altBackground
    ? "vf-section vf-bg-blue-accent"
    : "vf-section vf-bg-gold-accent";

  return (
    <section id={id} className={sectionBgClass}>
```

Replace with:
```typescript
export function CarouselSection({
  id,
  altBackground,
  reverse,
  imageSrc,
  imageAlt,
  title,
  intro,
  ctaText,
  items,
  textureClass
}: CarouselSectionProps) {
  const sectionBgClass = altBackground
    ? "vf-section vf-bg-blue-accent"
    : "vf-section vf-bg-gold-accent";

  return (
    <section id={id} className={`${sectionBgClass}${textureClass ? ` ${textureClass}` : ''}`}>
```

---

### 5. Modify `C:/Users/mhsut/DevProjects/VFSsite/components/AboutSection.tsx`

**Add texture class to section className (line 9-11):**

Find:
```typescript
    <section
      id="about"
      className="vf-section vf-bg-blue-accent"
    >
```

Replace with:
```typescript
    <section
      id="about"
      className="vf-section vf-bg-blue-accent vf-texture-noise"
    >
```

---

### 6. Modify `C:/Users/mhsut/DevProjects/VFSsite/components/GivingBackSection.tsx`

**Add texture class to section className (line 7-9):**

Find:
```typescript
    <section
      id="giving-back"
      className="vf-section vf-bg-gold-accent"
    >
```

Replace with:
```typescript
    <section
      id="giving-back"
      className="vf-section vf-bg-gold-accent vf-texture-grid"
    >
```

---

### 7. Modify `C:/Users/mhsut/DevProjects/VFSsite/components/ContactSection.tsx`

**Add texture class to section className (line 7):**

Find:
```typescript
    <section id="contact" className="vf-section vf-section--contact vf-bg-default">
```

Replace with:
```typescript
    <section id="contact" className="vf-section vf-section--contact vf-bg-default vf-texture-dots">
```

---

### 8. Modify `C:/Users/mhsut/DevProjects/VFSsite/app/page.tsx`

**Import ScrollReveal and SectionDivider at top (line 1-9):**

Add after existing imports:
```typescript
import ScrollReveal from "../components/ScrollReveal"
import SectionDivider from "../components/SectionDivider"
```

**Wrap What We Do CarouselSection (line 22-32):**

Find:
```typescript
        <CarouselSection
          id="what-we-do"
          imageSrc="/assets/img/whatwedo.jpg"
          imageAlt={whatWeDo.imageAlt}
          title={whatWeDo.title}
          intro={whatWeDo.intro}
          ctaText={whatWeDo.bottomCta}
          items={whatWeDo.cards}
          reverse={false}
          altBackground={false}
        />
```

Replace with:
```typescript
        <ScrollReveal animation="vf-fadeInUp">
          <CarouselSection
            id="what-we-do"
            imageSrc="/assets/img/whatwedo.jpg"
            imageAlt={whatWeDo.imageAlt}
            title={whatWeDo.title}
            intro={whatWeDo.intro}
            ctaText={whatWeDo.bottomCta}
            items={whatWeDo.cards}
            reverse={false}
            altBackground={false}
            textureClass="vf-texture-dots"
          />
        </ScrollReveal>
```

**Wrap Who We Serve CarouselSection (line 34-44):**

Find:
```typescript
        <CarouselSection
          id="who-we-serve"
          imageSrc="/assets/img/whoweserve.jpg"
          imageAlt={whoWeServe.imageAlt}
          title={whoWeServe.title}
          intro={whoWeServe.intro}
          ctaText={whoWeServe.bottomCta}
          items={whoWeServe.cards}
          reverse={true}
          altBackground={true}
        />
```

Replace with:
```typescript
        <ScrollReveal animation="vf-fadeInLeft">
          <CarouselSection
            id="who-we-serve"
            imageSrc="/assets/img/whoweserve.jpg"
            imageAlt={whoWeServe.imageAlt}
            title={whoWeServe.title}
            intro={whoWeServe.intro}
            ctaText={whoWeServe.bottomCta}
            items={whoWeServe.cards}
            reverse={true}
            altBackground={true}
            textureClass="vf-texture-grid"
          />
        </ScrollReveal>
```

**Wrap AI Alignment CarouselSection (line 46-56):**

Find:
```typescript
        <CarouselSection
          id="ai-alignment"
          imageSrc="/assets/img/aialigned.jpg"
          imageAlt={aiAlignment.imageAlt}
          title={aiAlignment.title}
          intro={aiAlignment.intro}
          ctaText={aiAlignment.bottomCta}
          items={aiAlignment.cards}
          reverse={false}
          altBackground={false}
        />
```

Replace with:
```typescript
        <ScrollReveal animation="vf-scaleIn">
          <CarouselSection
            id="ai-alignment"
            imageSrc="/assets/img/aialigned.jpg"
            imageAlt={aiAlignment.imageAlt}
            title={aiAlignment.title}
            intro={aiAlignment.intro}
            ctaText={aiAlignment.bottomCta}
            items={aiAlignment.cards}
            reverse={false}
            altBackground={false}
            textureClass="vf-texture-dots"
          />
        </ScrollReveal>
```

**Wrap GivingBackSection (line 59):**

Find:
```typescript
        <GivingBackSection />    {/* Now before About */}
```

Replace with:
```typescript
        <ScrollReveal animation="vf-fadeInRight">
          <GivingBackSection />
        </ScrollReveal>
```

**Wrap AboutSection (line 60):**

Find:
```typescript
        <AboutSection />
```

Replace with:
```typescript
        <ScrollReveal animation="vf-fadeInUp">
          <AboutSection />
        </ScrollReveal>
```

**Wrap ContactSection (line 61):**

Find:
```typescript
        <ContactSection />
```

Replace with:
```typescript
        <ScrollReveal animation="vf-fadeInUp">
          <ContactSection />
        </ScrollReveal>
```

**Add SectionDividers between sections:**

Between Who We Serve and AI Alignment (after line 44 in modified version), add:
```typescript
        <SectionDivider variant="slant" color="#0a0a0a" />
```

Between GivingBackSection and AboutSection (after line 61 in modified version), add:
```typescript
        <SectionDivider variant="curve" color="#0a0a0a" />
```

Between AboutSection and ContactSection (after line 64 in modified version), add:
```typescript
        <SectionDivider variant="wave" color="#0a0a0a" />
```

**Note:** SectionDividers should be placed BETWEEN the `</ScrollReveal>` closing tag of one section and the `<ScrollReveal>` opening tag of the next section. This ensures the divider is positioned at the TOP of the next section via `.vf-divider-top` CSS class.

---

### 9. Modify `C:/Users/mhsut/DevProjects/VFSsite/app/capabilities/palantir/page.tsx`

**Import ScrollReveal at top (line 1-8):**

Add after existing imports:
```typescript
import ScrollReveal from "../../../components/ScrollReveal"
```

**Wrap Intro section (line 52-59):**

Find:
```typescript
        {/* Intro */}
        <section className="vf-section vf-bg-default vf-content-section">
          <div className="vf-container">
            {content.intro.map((paragraph, i) => (
              <p key={i} className="vf-lead" style={{ textAlign: "center", fontSize: "18px", maxWidth: "52ch", margin: "0 auto 20px" }}>{paragraph}</p>
            ))}
          </div>
        </section>
```

Replace with:
```typescript
        {/* Intro */}
        <ScrollReveal animation="vf-fadeInUp">
          <section className="vf-section vf-bg-default vf-content-section vf-texture-dots">
            <div className="vf-container">
              {content.intro.map((paragraph, i) => (
                <p key={i} className="vf-lead" style={{ textAlign: "center", fontSize: "18px", maxWidth: "52ch", margin: "0 auto 20px" }}>{paragraph}</p>
              ))}
            </div>
          </section>
        </ScrollReveal>
```

**Wrap Comparison Table section (line 61-86):**

Find:
```typescript
        {/* Comparison Table */}
        <section id="comparison" className="vf-section vf-bg-blue-accent vf-content-section">
```

Replace with:
```typescript
        {/* Comparison Table */}
        <ScrollReveal animation="vf-scaleIn">
          <section id="comparison" className="vf-section vf-bg-blue-accent vf-content-section vf-texture-grid">
```

And add closing `</ScrollReveal>` after the section closing tag (line 86).

**Wrap Advantages section (line 88-102):**

Find:
```typescript
        {/* Advantages */}
        <section id="advantages" className="vf-section vf-bg-gold-accent vf-content-section">
```

Replace with:
```typescript
        {/* Advantages */}
        <ScrollReveal animation="vf-fadeInRight">
          <section id="advantages" className="vf-section vf-bg-gold-accent vf-content-section">
```

And add closing `</ScrollReveal>` after the section closing tag (line 102).

**Wrap Closing Statement section (line 104-109):**

Find:
```typescript
        {/* Closing Statement */}
        <section className="vf-section vf-bg-default vf-content-section">
```

Replace with:
```typescript
        {/* Closing Statement */}
        <ScrollReveal animation="vf-fadeInUp">
          <section className="vf-section vf-bg-default vf-content-section">
```

And add closing `</ScrollReveal>` after the section closing tag (line 109).

---

### 10. Modify `C:/Users/mhsut/DevProjects/VFSsite/app/lonestar/page.tsx`

**Same pattern as palantir page:**

1. Import ScrollReveal: `import ScrollReveal from "../../components/ScrollReveal"`
2. Wrap Intro section in `<ScrollReveal animation="vf-fadeInUp">`, add `vf-texture-dots` to className
3. Wrap Comparison Table section in `<ScrollReveal animation="vf-scaleIn">`, add `vf-texture-grid` to className
4. Wrap Advantages section in `<ScrollReveal animation="vf-fadeInRight">`
5. Wrap Closing Statement section in `<ScrollReveal animation="vf-fadeInUp">`

**Note:** Lonestar page is at `app/lonestar/page.tsx` (2 levels deep), so import path is `"../../components/ScrollReveal"` (not `"../../../components/ScrollReveal"` like palantir).

---

## File Inventory

| File | Action | Lines/Functions Affected |
|------|--------|------------------------|
| `components/ScrollReveal.tsx` | CREATE | Full file (~60 lines) |
| `components/SectionDivider.tsx` | CREATE | Full file (~40 lines) |
| `components/CarouselSection.tsx` | MODIFY | Lines 5-15 (add textureClass prop), 17-33 (use prop in className) |
| `components/AboutSection.tsx` | MODIFY | Line 11 (add vf-texture-noise) |
| `components/GivingBackSection.tsx` | MODIFY | Line 9 (add vf-texture-grid) |
| `components/ContactSection.tsx` | MODIFY | Line 7 (add vf-texture-dots) |
| `app/globals.css` | MODIFY | Lines 150+ (textures), 1063+ (animations, divider), 1065+ (a11y) |
| `app/page.tsx` | MODIFY | Lines 1-9 (imports), 22-61 (wrap sections, add dividers) |
| `app/capabilities/palantir/page.tsx` | MODIFY | Imports + section wrappers (lines 1-8, 52-109) |
| `app/lonestar/page.tsx` | MODIFY | Imports + section wrappers |

## Architecture Decisions

**Why client wrapper vs client sections?**
Keep all section components (AboutSection, CarouselSection, etc.) as server components for performance. ScrollReveal is a minimal client wrapper that only handles IntersectionObserver logic. This preserves server rendering benefits.

**Why ::before pseudo-elements for textures?**
Allows textures to layer on top of existing backgrounds without modifying background-image properties. Keeps `.vf-bg-*` classes pure and composable. z-index stacking ensures content readability.

**Why inline SVG paths vs external files?**
Dividers are ~50 bytes each as inline SVG. No HTTP request overhead, no flash of unstyled content. Easy to customize color per section via props.

**Why opacity: 0 as default reveal state?**
Content is hidden until IntersectionObserver fires. In prefers-reduced-motion mode, CSS overrides opacity to 1 immediately, so content is never hidden for accessibility users.

**Why disconnect observer after first reveal?**
Animations only trigger once (on scroll-in). Disconnecting saves memory and CPU cycles. If re-triggering on scroll-up is needed later (Tier 2), remove disconnect call.

**Why `.vf-divider-top` at top of section instead of bottom of previous?**
Cleaner separation of concerns — each section owns its own divider. Avoids complex relative positioning math. Easier to add/remove sections without affecting adjacent dividers.

**Why textureClass prop for CarouselSection instead of hardcoded?**
CarouselSection is used three times on homepage with different textures. Prop pattern allows per-instance customization. AboutSection/GivingBackSection/ContactSection appear once, so hardcoded textures are simpler.

**Why relative imports instead of @/ alias?**
Codebase uses relative imports (verified in app/page.tsx and component files). No @/ alias configured in tsconfig.json. Consistency with existing patterns prevents build errors.

## Testing Strategy

**Functional:**
- Sections animate in as user scrolls down homepage
- Hero section is immediately visible (no animation)
- Palantir and Lonestar pages animate correctly
- Textures are visible but subtle (not distracting)
- Dividers render at section boundaries without layout shift

**Accessibility:**
- With prefers-reduced-motion enabled, all content is visible immediately
- No animations trigger with prefers-reduced-motion
- Keyboard navigation works (ScrollReveal doesn't intercept focus)
- Screen readers announce content normally (no aria-live conflicts)

**Performance:**
- No jank during scroll (Chrome DevTools Performance tab: 60fps)
- IntersectionObserver cleanup verified (no memory leaks)
- Texture pseudo-elements don't cause repaint issues

**Browser support:**
- Test in Chrome, Firefox, Safari, Edge (latest)
- Verify SVG dividers scale on mobile (320px - 1920px)
- Test on iOS Safari (texture rendering, scroll performance)

**Visual regression:**
- Textures don't obscure text (contrast check)
- Dividers align correctly on all breakpoints
- Animation timing feels natural (not too fast/slow)

## Out of Scope

- Hover animations (handled in Tier 2)
- Parallax effects (Tier 3)
- Animated SVG paths or morphing shapes
- Page transition animations
- Will-change CSS property (add only if performance issues found)
- Loading state animations (skeleton screens)
- Staggered animation for child elements within sections
- Custom easing curves beyond ease-out

## Acceptance Criteria

- [ ] ScrollReveal component created and wraps homepage sections
- [ ] SectionDivider component created with 3 variants
- [ ] 4 @keyframes animations added to globals.css
- [ ] 3 texture modifier classes added to globals.css
- [ ] `.vf-divider-top` CSS class added for divider positioning
- [ ] prefers-reduced-motion disables all animations but keeps content visible
- [ ] Homepage sections (What We Do, Who We Serve, AI Alignment, Giving Back, About, Contact) animate on scroll
- [ ] SectionDividers placed between Who We Serve/AI Alignment, Giving Back/About, About/Contact
- [ ] Palantir page: 4 content sections (Intro, Comparison Table, Advantages, Closing Statement) have scroll animations and textures
- [ ] Lonestar page: same pattern as Palantir
- [ ] Hero sections do NOT animate (immediately visible)
- [ ] No visual regression: existing styles intact, textures subtle
- [ ] No console errors or warnings
- [ ] 60fps scroll performance on desktop and mobile
- [ ] CarouselSection accepts textureClass prop and applies it correctly
- [ ] All imports use relative paths (no @/ aliases)
