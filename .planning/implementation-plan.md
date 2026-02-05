# Implementation Plan

## Phase Overview

| Phase | Goal | Priority |
|-------|------|----------|
| 1 | Critical Cleanup | Immediate |
| 2 | Image Optimization | High |
| 3 | Visual Bug Fixes | High |
| 4 | Code Quality | Medium |
| 5 | SEO Implementation | Medium |
| 6 | Animation & Polish | Final |
| 7 | UX Enhancements | Final |

---

## Phase 1: Critical Cleanup

**Goal:** Reduce site from 239MB to ~50MB

- [ ] Delete `/assets/vendor/` directory
- [ ] Rename `/assets/vendor copy/` to `/assets/vendor/`
- [ ] Update all HTML files vendor paths (`vendor copy` → `vendor`)
- [ ] Delete duplicate client logos directory
- [ ] Delete unused Logos directory
- [ ] Delete unused vendor libraries (isotope, imagesloaded)
- [ ] Remove duplicate header components from all pages
- [ ] Remove AOS library (will be replaced by GSAP)

**Files to update:**
- index.html
- services.html
- contact.html
- portfolio.html
- All 7 portfolio case study pages

---

## Phase 2: Image Optimization

**Goal:** Reduce images from 196MB to ~20MB

- [ ] Convert all case study images to WebP
- [ ] Resize images to max 1920px width
- [ ] Compress to 80% quality
- [ ] Add `loading="lazy"` to all below-fold images
- [ ] Add `decoding="async"` to non-critical images
- [ ] Add `srcset` responsive variants (640px, 1024px, 1920px)
- [ ] Optimize hero images specifically
- [ ] Add preload for critical above-fold images

---

## Phase 3: Fix Visual Bugs

**Goal:** Consistent, non-broken layouts

- [ ] Add `object-position: center` to all fixed-size images
- [ ] Standardize left margins with CSS variable (90px)
- [ ] Replace all `100vw` with `100%`
- [ ] Fix footer width calculations (`calc(50% - 20px)`)
- [ ] Remove/fix 120% card width
- [ ] Smooth out mobile spacing jumps
- [ ] Fix double left spacing on hero
- [ ] Clean up z-index stacking
- [ ] Consolidate duplicate media queries (768px)

---

## Phase 4: Code Quality

**Goal:** Clean, maintainable codebase

- [ ] Consolidate duplicate card sections in index.html
- [ ] Fix JavaScript memory leaks:
  - setTimeout cleanup for popup
  - Remove drag event listeners on close
  - Clear error timeout on navigation
- [ ] Add throttle/debounce to scroll handlers
- [ ] Use event delegation for FAQ items
- [ ] Replace innerHTML with textContent (XSS fix)
- [ ] Optimize Google Fonts loading (reduce weights)
- [ ] Add `defer` to non-critical scripts

---

## Phase 5: SEO Implementation

**Goal:** Proper search engine optimization

- [ ] Add Open Graph meta tags to all pages
- [ ] Add Twitter Card meta tags to all pages
- [ ] Add canonical URLs to all pages
- [ ] Create robots.txt
- [ ] Create sitemap.xml
- [ ] Add JSON-LD structured data (Organization, LocalBusiness)
- [ ] Fill in all image alt texts
- [ ] Add DNS prefetch for external resources
- [ ] Add preload for critical images

---

## Phase 6: Animation & Polish

**Goal:** Smooth, polished user experience

- [ ] Add Lenis for smooth scrolling
```javascript
const lenis = new Lenis();
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
```

- [ ] Add GSAP + ScrollTrigger
```javascript
gsap.registerPlugin(ScrollTrigger);
```

- [ ] Implement scroll-triggered animations:
  - Section headings (fade up)
  - Cards (stagger in)
  - Portfolio items (scale in)
  - Stats/counters (animate)

- [ ] Add button hover micro-interactions (lift, shadow, scale)
- [ ] Add page transition effects (fade between pages)
- [ ] Fix popup CLS issue (delay until after paint)
- [ ] Add keyboard focus indicators (`:focus-visible`)
- [ ] Create skip-to-content link
- [ ] Add ARIA labels to interactive elements

---

## Phase 7: UX Enhancements

**Goal:** Match industry best practices for creative agencies

- [ ] Fix mobile nav - add text labels to icon buttons
- [ ] Remove redundant navigation elements
- [ ] Make CTAs more visually distinct (contrast, size)
- [ ] Move newsletter signup higher on page
- [ ] Consolidate repeated section headers
- [ ] Add team/about section (human-centric)
- [ ] Consider bento grid layout for services
- [ ] Improve case study structure: goals → process → results
- [ ] Add video content consideration for future

---

## Files to Modify

### HTML Files (11 total)
- `index.html` - Homepage (1,072 lines)
- `services.html` - Services page (702 lines)
- `contact.html` - Contact page
- `portfolio.html` - Portfolio listing
- `portfolio/burgernshake.html`
- `portfolio/oeuf.html`
- `portfolio/locals.html`
- `portfolio/linguini.html`
- `portfolio/pazzi.html`
- `portfolio/inner circle.html`
- `portfolio/l'OUI.html`

### JavaScript
- `assets/js/main.js` - Main JS (480 lines)

### CSS/SCSS
- `assets/css/main.css` - Compiled CSS (3,430 lines)
- `assets/scss/main.scss` - SCSS entry point
- `assets/scss/_variables.scss` - CSS variables
- `assets/scss/layouts/*.scss` - Layout partials
- `assets/scss/sections/*.scss` - Section partials

### New Files to Create
- `robots.txt`
- `sitemap.xml`

### New Libraries to Add
```html
<script src="https://unpkg.com/lenis@1.1.13/dist/lenis.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
```

### Directories to Delete
- `/assets/vendor/` (after renaming vendor copy)
- `/assets/img/clients/` (duplicate logos)
- `/assets/img/Logos/` (unused non-blackpng)
- `/assets/vendor copy/imagesloaded/`
- `/assets/vendor copy/isotope-layout/`
- `/assets/vendor copy/aos/` (after implementing GSAP)

---

## Verification Checklist

### Performance
- [ ] Lighthouse Performance > 90
- [ ] Total page weight < 2MB
- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s

### Visual
- [ ] No horizontal scrollbar on any page
- [ ] Images not stretched in any viewbox
- [ ] Consistent spacing across all sections
- [ ] Smooth scrolling with Lenis
- [ ] GSAP animations trigger correctly

### SEO
- [ ] Facebook Sharing Debugger validates
- [ ] Twitter Card Validator passes
- [ ] Google Rich Results Test passes
- [ ] sitemap.xml accessible
- [ ] robots.txt accessible

### Code Quality
- [ ] No console errors
- [ ] No memory leaks in Performance monitor
- [ ] Clean HTML validation (W3C)

### Accessibility
- [ ] axe DevTools audit passes
- [ ] Keyboard navigation works
- [ ] All images have appropriate alt text
