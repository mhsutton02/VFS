# Research Summary
**Date:** 2026-04-18
**Query:** Scroll-triggered animations, CSS background textures, and section dividers for Next.js 14 App Router
**Sources:** 5 web search queries

## Key Findings

1. **IntersectionObserver must be client-side** — Use `"use client"` wrapper components around elements that need scroll animation. Server components handle initial data/layout; client components wrap individual reveal targets. The `react-intersection-observer` package provides `<InView>` component that triggers callbacks when elements enter viewport.

2. **CSS-only textures use SVG filters + gradients** — Dot grids: `radial-gradient(circle, #a0aec0 1px, transparent 1px)` with `background-size: 24px 24px`. Noise: inline SVG `<feTurbulence>` filter with `baseFrequency` for granularity. Both render on GPU and weigh <1KB vs 50-200KB images.

3. **clip-path is now responsive with shape()** — Chrome 135+, Safari 18.4+, Firefox (Feb 2026) support `shape()` function for non-polygon responsive clipping. For waves/curves, use inline SVG at section boundaries with CSS `clip-path: path()` for slants. Avoid animating clip-path (causes mobile jank); animate transforms instead.

4. **Only animate transform and opacity** — These properties are GPU-accelerated and don't trigger layout/paint. Use `will-change` sparingly: apply just before animation starts, remove after. Overuse causes GPU memory bloat. Batch DOM reads before writes to avoid layout thrashing (IntersectionObserver helps by batching).

5. **prefers-reduced-motion is mandatory** — Supported in all major browsers (2026). Disable non-essential animations but keep content visible. Pattern: set animation durations to `0s` or use `animation: none` inside `@media (prefers-reduced-motion: reduce)`. Essential animations (loading states) can remain subtle.

## Code Examples

### Reusable IntersectionObserver Hook (Client Component)
```tsx
'use client'
import { useEffect, useRef, useState } from 'react'

export function useScrollReveal(options = {}) {
  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true) // Fallback for old browsers
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect() // Reveal once, then cleanup
        }
      },
      { threshold: 0.1, rootMargin: '50px', ...options }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}

// Usage:
export function RevealSection({ children }) {
  const { ref, isVisible } = useScrollReveal()
  return (
    <section
      ref={ref}
      className={isVisible ? 'reveal-active' : 'reveal-pending'}
    >
      {children}
    </section>
  )
}
```

### CSS Background Textures (Dark Theme)
```css
/* Dot grid */
.bg-dots {
  background-image: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
  background-size: 24px 24px;
}

/* Subtle noise via SVG */
.bg-noise {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E");
}

/* Grid lines */
.bg-grid {
  background-image:
    linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
  background-size: 32px 32px;
}
```

### SVG Section Divider (Slant)
```css
.section-divider {
  position: relative;
}
.section-divider::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background: inherit;
  clip-path: polygon(0 0, 100% 100%, 100% 100%, 0 100%);
}
```

### Animation with Accessibility
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.reveal-pending {
  opacity: 0;
}

.reveal-active {
  animation: fadeInUp 0.6s ease-out forwards;
}

/* Disable for users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  .reveal-active {
    animation: none;
    opacity: 1; /* Keep content visible */
  }
}
```

## Recommendations

1. **Architecture**: Create a client component `<ScrollReveal>` wrapper. Server components render page structure; client wrapper handles intersection logic per section.
2. **Naming**: Use conventional keyframe names: `fadeInUp`, `fadeInDown`, `slideInLeft`, `slideInRight`, `scaleIn`, `blurIn`.
3. **will-change pattern**: Apply via JS only when element is near viewport (via IntersectionObserver with larger `rootMargin`), remove after animation completes.
4. **Dividers**: Use `clip-path: polygon()` for slants, inline SVG `<path>` for organic waves/curves. Position SVG absolutely at section boundaries.
5. **Textures**: Combine multiple gradients (dots + noise) for depth. Use CSS variables for theme switching.

## Caveats

- **IntersectionObserver polyfill**: Not needed for 2026 browser support, but fallback to `isVisible: true` for graceful degradation.
- **shape() function**: Only available in Chrome 135+, Safari 18.4+, Firefox Feb 2026+. Use `@supports` or stick with `polygon()` for broader support.
- **will-change memory**: Each promoted layer consumes GPU memory. Never apply to >10 elements simultaneously or set permanently in CSS.
- **clip-path animation**: Causes mobile performance issues (layout recalc). Animate container `transform` instead.
- **SVG filter performance**: `feTurbulence` noise can be GPU-heavy on mobile. Test frame rates; consider disabling on low-end devices.

## Raw Query Log

- Query 1: "Next.js 14 App Router IntersectionObserver scroll reveal animation patterns server components 2026" — Client component wrappers with `react-intersection-observer`, avoid scrollY in favor of IntersectionObserver API
- Query 2: "CSS only background textures dot grid noise patterns dark theme gradients 2026" — Radial gradients for dots, SVG feTurbulence for noise, oklch interpolation support in modern browsers
- Query 3: "CSS clip-path SVG section dividers wave slant curve responsive 2026" — New shape() function in Feb 2026, inline SVG + transform animations for performance
- Query 4: "CSS animation performance will-change transform GPU acceleration layout thrashing 2026" — Only animate transform/opacity, batch DOM operations, remove will-change after use
- Query 5: "prefers-reduced-motion CSS accessibility disable animations keep content visible 2026" — Mandatory for accessibility, set animation durations to 0s or animation: none, keep content visible
