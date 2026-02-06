# Phase 7: UX Enhancements - Research

**Researched:** 2026-02-06
**Domain:** Mobile UX, Bottom Navigation, CTA Design, Touch Interactions
**Confidence:** HIGH

## Summary

This research covers four key areas for Phase 7: mobile bottom navigation redesign, CTA enhancement with shimmer effects, touch interaction improvements, and mobile contact form fixes. The existing codebase already has a bottom navigation bar implementation at 768px breakpoint with icons + labels, but needs enhancement to meet the user's vision of an app-style floating bar with context-aware navigation and a separate contact button.

The project uses pure CSS/vanilla JS (no framework), Bootstrap 5 for icons, and GSAP for animations. All implementations should follow established patterns from Phase 6 micro-interactions.

**Primary recommendation:** Enhance the existing mobile nav structure with improved styling (floating pill shape, shadows), add Bootstrap Icons to replace SVG images, implement context-aware page detection via data attributes, and style the contact button distinctly. Add shimmer animation to primary CTAs and fix mobile form with single-column layout.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Replace hamburger menu with bottom navigation bar (app-style)
- Horizontal layout, floating bar style (rounded corners, shadow, slight gap from edges)
- Nav items: icons + labels for each link
- Contact button: styled as separate button, anchored on the right
- Context-aware: hide current page's link (e.g., no "Home" on homepage)
- Always visible (no hide-on-scroll)
- Breakpoint: mobile only (<768px), tablets+ use desktop nav
- Bold color contrast + commanding size + animation (all three elements) for CTAs
- Strong visual hierarchy: primary CTAs bold/filled, secondary outlined/subtle
- Shimmer/shine animation effect on primary CTAs
- Priority focus: Contact buttons site-wide
- Immediate visual response on tap (no 300ms delay feel)
- Scale-down effect for touch feedback
- Minimum tap target size: 48px (comfortable)
- Swipe gestures: carousels only (no page-level swipe navigation)
- Contact form: Single column stack layout on mobile (all fields full-width, stacked vertically)

### Claude's Discretion
- Specific icon choices for nav items
- Exact shimmer animation timing and style
- Team/about section (user did not select for discussion - skip or minimal implementation)

### Deferred Ideas (OUT OF SCOPE)
None - discussion stayed within phase scope
</user_constraints>

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Bootstrap Icons | 1.13+ | Icon font for nav items | Already in project (assets/vendor/bootstrap-icons) |
| CSS @keyframes | Native | Shimmer animation | No external dependency, performant |
| CSS touch-action | Native | Touch responsiveness | Eliminates 300ms delay, widely supported |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| GSAP | 3.14.1 | Complex animations | Already in project, used sparingly |
| CSS transforms | Native | Touch feedback | Hardware accelerated, instant response |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Bootstrap Icons | SVG icons | More flexibility but adds file overhead; current SVGs work but Bootstrap Icons provide consistency |
| Pure CSS shimmer | GSAP shimmer | GSAP overkill for simple repeating animation; CSS more performant |
| FastClick.js | CSS touch-action | FastClick deprecated; CSS native solution preferred |

**Installation:**
No additional dependencies needed. All tools already in project.

## Architecture Patterns

### Mobile Navigation Structure (Enhanced)
```html
<!-- Current structure (works, needs styling) -->
<nav class="mobile-nav" data-current-page="home">
  <a href="index.html" class="bloc-icon" data-nav="home">
    <i class="bi bi-house-fill"></i>
    <span>Home</span>
  </a>
  <a href="services.html" class="bloc-icon" data-nav="services">
    <i class="bi bi-briefcase"></i>
    <span>Services</span>
  </a>
  <a href="portfolio.html" class="bloc-icon" data-nav="portfolio">
    <i class="bi bi-collection"></i>
    <span>Portfolio</span>
  </a>
  <a href="contact.html" class="mobile-nav-cta" data-nav="contact">
    <i class="bi bi-envelope-fill"></i>
    <span>Contact</span>
  </a>
</nav>
```

### CSS Structure for Mobile Nav
```css
/* Location: Add to mobile section in main.css (around line 250-300) */

/* Base floating bar */
.mobile-nav {
  position: fixed;
  bottom: 16px;           /* Gap from edge */
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 32px); /* 16px margin each side */
  max-width: 400px;
  height: 64px;           /* 48px min target + padding */
  background: #14181C;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 32px;    /* Pill shape */
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 8px 12px;
  z-index: 996;
}

/* Context-aware hiding */
.mobile-nav[data-current-page="home"] [data-nav="home"],
.mobile-nav[data-current-page="services"] [data-nav="services"],
.mobile-nav[data-current-page="portfolio"] [data-nav="portfolio"],
.mobile-nav[data-current-page="contact"] [data-nav="contact"] {
  display: none;
}
```

### Shimmer Animation Pattern
```css
/* Location: Add after button styles (around line 3700) */

/* Shimmer effect for primary CTAs */
.shimmer-cta {
  position: relative;
  overflow: hidden;
}

.shimmer-cta::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    120deg,
    transparent 30%,
    rgba(255, 255, 255, 0.3) 50%,
    transparent 70%
  );
  animation: shimmer 3s infinite;
}

@keyframes shimmer {
  0% { left: -100%; }
  20%, 100% { left: 100%; }
}

/* Reduced motion respect */
@media (prefers-reduced-motion: reduce) {
  .shimmer-cta::after {
    animation: none;
  }
}
```

### Touch Feedback Pattern
```css
/* Location: Add to General Styling section */

/* Global touch optimization */
html {
  -webkit-tap-highlight-color: transparent; /* Remove blue flash */
  touch-action: manipulation; /* Disable 300ms delay */
}

/* Touch-active state for interactive elements */
.touch-feedback {
  transition: transform 0.1s ease-out;
  will-change: transform;
}

.touch-feedback:active {
  transform: scale(0.95);
}
```

### Anti-Patterns to Avoid
- **Using display:none for touch feedback:** Breaks accessibility; use opacity or transform
- **Hiding nav on scroll:** User explicitly requested always-visible navigation
- **Multi-column mobile form:** Research shows single-column is 15.4 seconds faster
- **Page-level swipe navigation:** User deferred this; only carousel swipe is allowed

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| 300ms touch delay | FastClick.js polyfill | CSS `touch-action: manipulation` | Native solution, no JS overhead |
| Icon library | Custom SVG management | Bootstrap Icons (already in vendor) | Consistent styling, already loaded |
| Shimmer animation | GSAP timeline | Pure CSS @keyframes | Simpler, more performant for continuous animation |
| Form stacking | Custom flexbox logic | Bootstrap responsive grid | `.col-12` classes already available |
| Touch feedback | JS touchstart handlers | CSS `:active` state | Simpler, no event listener overhead |

**Key insight:** The project already has Bootstrap Icons loaded. Using `bi-*` classes instead of custom SVG images simplifies maintenance and ensures consistent sizing/styling.

## Common Pitfalls

### Pitfall 1: Z-index Stacking Issues
**What goes wrong:** Mobile nav appears behind footer or fixed elements
**Why it happens:** Multiple fixed elements competing for z-index space
**How to avoid:** Use z-index: 996 (already established in current mobile-nav) - below modals (999999) but above content
**Warning signs:** Nav disappears when scrolling to footer

### Pitfall 2: Safe Area Insets Ignored
**What goes wrong:** Nav bar hidden by iPhone notch/home indicator
**Why it happens:** No padding for `env(safe-area-inset-bottom)`
**How to avoid:** Add `padding-bottom: max(16px, env(safe-area-inset-bottom))`
**Warning signs:** Users on iPhone X+ complain about unreachable buttons

### Pitfall 3: Shimmer Animation Performance
**What goes wrong:** Animation causes jank or high CPU usage
**Why it happens:** Animating `left` property triggers layout recalculation
**How to avoid:** Use `transform: translateX()` instead of `left` for animation
**Warning signs:** Animation stutters on scroll

### Pitfall 4: Touch Target Size Violations
**What goes wrong:** Difficult to tap nav items accurately
**Why it happens:** Visual size != actual tap area
**How to avoid:** Ensure 48x48px minimum clickable area (not just visual icon)
**Warning signs:** Users accidentally tap wrong items

### Pitfall 5: Context-Aware Navigation Breaks
**What goes wrong:** Current page link doesn't hide properly
**Why it happens:** Data attribute mismatch or case sensitivity issues
**How to avoid:** Use consistent lowercase data attributes, verify on all pages
**Warning signs:** Home link shows on homepage

### Pitfall 6: Footer Overlap on Short Pages
**What goes wrong:** Bottom nav overlaps footer content
**Why it happens:** Fixed nav doesn't account for page height
**How to avoid:** Add `padding-bottom: 80px` to body on mobile
**Warning signs:** Can't tap footer links on contact page

## Code Examples

Verified patterns from official sources and existing project:

### Bottom Navigation - Complete CSS
```css
/* Source: Existing project + Smashing Magazine best practices */
@media (max-width: 767px) {
  .mobile-nav {
    position: fixed;
    bottom: max(16px, env(safe-area-inset-bottom));
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 32px);
    max-width: 420px;
    height: 64px;
    background: #14181C;
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 32px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.35),
                0 0 0 1px rgba(255, 255, 255, 0.05) inset;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 8px 16px;
    z-index: 996;
    gap: 4px;
  }

  /* Navigation items */
  .mobile-nav .bloc-icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 48px;
    min-height: 48px;
    padding: 8px;
    color: #fff;
    text-decoration: none;
    border-radius: 12px;
    transition: background-color 0.2s ease;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }

  .mobile-nav .bloc-icon:active {
    background-color: rgba(255, 255, 255, 0.1);
    transform: scale(0.95);
  }

  .mobile-nav .bloc-icon i {
    font-size: 20px;
    margin-bottom: 2px;
  }

  .mobile-nav .bloc-icon span {
    font-size: 11px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
  }

  /* Separate Contact CTA button */
  .mobile-nav .mobile-nav-cta {
    background: var(--accent-color);
    padding: 8px 16px;
    border-radius: 20px;
    margin-left: auto;
    flex-shrink: 0;
  }

  .mobile-nav .mobile-nav-cta:active {
    background: color-mix(in srgb, var(--accent-color), black 10%);
    transform: scale(0.95);
  }

  /* Context-aware hiding */
  .mobile-nav[data-current-page="home"] [data-nav="home"],
  .mobile-nav[data-current-page="services"] [data-nav="services"],
  .mobile-nav[data-current-page="portfolio"] [data-nav="portfolio"],
  .mobile-nav[data-current-page="contact"] [data-nav="contact"] {
    display: none;
  }

  /* Body padding to prevent content overlap */
  body {
    padding-bottom: 88px; /* Nav height + bottom gap */
  }
}

/* Hide on tablet+ */
@media (min-width: 768px) {
  .mobile-nav {
    display: none;
  }
}
```

### Shimmer Animation - Performance Optimized
```css
/* Source: Dev.to guide + performance optimization */
.hero .btn-get-started,
.contact-btn-header,
.php-email-form button[type="submit"],
.btn-footer {
  position: relative;
  overflow: hidden;
}

.hero .btn-get-started::after,
.php-email-form button[type="submit"]::after,
.btn-footer::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    120deg,
    transparent 40%,
    rgba(255, 255, 255, 0.25) 50%,
    transparent 60%
  );
  transform: translateX(-100%);
  animation: shimmer-sweep 4s ease-in-out infinite;
  pointer-events: none;
}

@keyframes shimmer-sweep {
  0% { transform: translateX(-100%); }
  20%, 100% { transform: translateX(100%); }
}

/* Pause shimmer on hover (button is active) */
.hero .btn-get-started:hover::after,
.php-email-form button[type="submit"]:hover::after,
.btn-footer:hover::after {
  animation-play-state: paused;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .hero .btn-get-started::after,
  .php-email-form button[type="submit"]::after,
  .btn-footer::after {
    animation: none;
    display: none;
  }
}
```

### Mobile Contact Form - Single Column
```css
/* Source: WPForms best practices + existing project patterns */
@media (max-width: 767px) {
  #hero-contact .php-email-form .row {
    flex-direction: column;
  }

  #hero-contact .php-email-form [class*="col-"] {
    width: 100%;
    max-width: 100%;
    flex: 0 0 100%;
    padding-left: 0;
    padding-right: 0;
  }

  #hero-contact .php-email-form {
    padding: 16px;
  }

  #hero-contact .php-email-form input,
  #hero-contact .php-email-form textarea {
    font-size: 16px; /* Prevents iOS zoom on focus */
    padding: 14px 16px;
  }

  #hero-contact .contact-subtitles {
    font-size: 16px;
    margin-bottom: 8px;
  }

  /* Better spacing between fields */
  #hero-contact .php-email-form .gy-4 > * {
    margin-bottom: 16px;
  }

  /* Full-width submit button */
  #hero-contact .php-email-form button[type="submit"] {
    width: 100%;
    padding: 16px;
    font-size: 16px;
  }
}
```

### Touch Interaction Enhancement
```css
/* Source: Chrome DevBlog + research */
/* Global touch optimization */
html {
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

/* Apply to all interactive elements */
a, button, input, textarea, select,
.bloc-icon, .card, .btn-get-started {
  touch-action: manipulation;
}

/* Immediate visual feedback */
.bloc-icon,
.btn-get-started,
.btn-footer,
.contact-btn-header,
.php-email-form button[type="submit"],
.mobile-nav-cta {
  transition: transform 0.1s ease-out,
              background-color 0.15s ease;
}

/* Active/pressed state */
.bloc-icon:active,
.btn-get-started:active,
.btn-footer:active,
.mobile-nav-cta:active {
  transform: scale(0.95);
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Hamburger menu | Bottom tab bar | 2020+ | Higher engagement on mobile |
| FastClick.js | CSS touch-action | 2015+ | No JS needed, better performance |
| Custom SVG icons | Icon fonts (Bootstrap Icons) | 2021+ | Easier maintenance, smaller payload |
| Multi-column mobile forms | Single column | Always | 15.4s faster completion |
| Animation with `left` | Animation with `transform` | 2016+ | GPU accelerated, no jank |

**Deprecated/outdated:**
- FastClick.js: Deprecated, CSS touch-action preferred
- Hamburger menus on mobile: Still work but bottom nav has better UX metrics
- AOS library: Already removed in earlier phases, GSAP is standard now

## Open Questions

Things that couldn't be fully resolved:

1. **Icon choice for Services**
   - What we know: Options include `bi-briefcase`, `bi-gear`, `bi-grid`, `bi-menu-button`
   - What's unclear: User hasn't specified preference
   - Recommendation: Use `bi-briefcase` (business-focused, matches brand)

2. **Shimmer animation timing**
   - What we know: User wants shimmer/shine effect on primary CTAs
   - What's unclear: Exact cycle duration (2s, 3s, 4s?)
   - Recommendation: 4 seconds with 20% active, 80% rest (not too distracting)

3. **Footer CTA button treatment**
   - What we know: `.btn-footer` exists with micro-interactions
   - What's unclear: Should it get shimmer too?
   - Recommendation: Yes, include in shimmer group for consistency

4. **Portfolio case study pages nav**
   - What we know: 7 portfolio pages exist in /portfolio/
   - What's unclear: Should these show Portfolio as current or use different context?
   - Recommendation: Keep "Portfolio" visible on case study pages (they're not the main portfolio listing)

## Sources

### Primary (HIGH confidence)
- Existing project CSS: `/assets/css/main.css` - current mobile nav implementation (lines 250-300)
- Existing project JS: `/assets/js/animations.js` - touch detection patterns
- [Smashing Magazine - Golden Rules of Mobile Navigation Design](https://www.smashingmagazine.com/2016/11/the-golden-rules-of-mobile-navigation-design/) - tap target sizes, item count limits

### Secondary (MEDIUM confidence)
- [Chrome DevBlog - 300ms tap delay gone](https://developer.chrome.com/blog/300ms-tap-delay-gone-away) - touch-action best practices
- [Dev.to - Button Shine Animation Guide](https://dev.to/designyff/button-with-shine-animation-step-by-step-guide-15l5) - shimmer CSS implementation
- [Bootstrap Icons Library](https://icons.getbootstrap.com/) - icon class names
- [WPForms - Single Column Forms](https://wpforms.com/single-column-forms-examples-and-inspiration/) - mobile form layout patterns

### Tertiary (LOW confidence)
- WebSearch results for 2026 mobile navigation patterns - general trends confirmed
- WebSearch results for shimmer effects - implementation patterns verified with primary sources

## Metadata

**Confidence breakdown:**
- Mobile navigation: HIGH - Pattern exists in codebase, research confirms best practices
- Shimmer animation: HIGH - CSS implementation well-documented, verified against multiple sources
- Touch interactions: HIGH - CSS touch-action widely supported, documented in Chrome DevBlog
- Contact form fix: HIGH - Bootstrap grid classes already available, straightforward CSS

**Research date:** 2026-02-06
**Valid until:** 2026-03-06 (30 days - stable patterns)
