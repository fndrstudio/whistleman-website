# Whistleman Media Website Optimization

## What This Is

Portfolio website for Whistleman Media, a creative social media agency based in the Netherlands. Static HTML/CSS/JS site at whistlemanmedia.nl featuring case studies, services, and contact form. Currently bloated at 239MB with performance issues, visual bugs, and SEO gaps.

## Core Value

A professional portfolio that loads fast, looks polished, and converts visitors to clients. Performance, visual quality, and lead generation matter equally.

## Requirements

### Validated

- ✓ Homepage with hero, services overview, client logos — existing
- ✓ Services page with offerings — existing
- ✓ Portfolio page with 7 case studies — existing
- ✓ Individual case study pages (Burger'n Shake, Oeuf, Locals, Linguini, Pazzi, Inner Circle, L'OUI) — existing
- ✓ Contact page with Web3Forms integration — existing
- ✓ Newsletter signup with EmailJS — existing
- ✓ Responsive design with Bootstrap 5 — existing
- ✓ URL rewriting via .htaccess (clean URLs without .html) — existing

### Active

**Phase 1: Critical Cleanup**
- [ ] Delete duplicate vendor directory (save 10MB)
- [ ] Rename `vendor copy` to `vendor`, update all HTML paths
- [ ] Remove unused libraries (Isotope, ImagesLoaded, AOS)

**Phase 2: Image Optimization**
- [ ] Convert images to WebP (196MB → ~20MB)
- [ ] Add lazy loading to all below-fold images
- [ ] Add srcset responsive variants

**Phase 3: Visual Bug Fixes**
- [ ] Fix horizontal overflow (100vw → 100%)
- [ ] Add object-position to fixed-size images
- [ ] Standardize left margins with CSS variable

**Phase 4: Code Quality**
- [ ] Fix JavaScript memory leaks
- [ ] Add throttle/debounce to scroll handlers
- [ ] Replace innerHTML with textContent (XSS)
- [ ] Optimize Google Fonts loading

**Phase 5: SEO Implementation**
- [ ] Add Open Graph and Twitter Card meta tags
- [ ] Create robots.txt and sitemap.xml
- [ ] Add JSON-LD structured data
- [ ] Fill in all image alt texts

**Phase 6: Animation & Polish**
- [ ] Add Lenis for smooth scrolling
- [ ] Add GSAP + ScrollTrigger for animations
- [ ] Implement scroll-triggered section animations
- [ ] Add micro-interactions to buttons

**Phase 7: UX Enhancements**
- [ ] Improve mobile navigation
- [ ] Make CTAs more visually distinct
- [ ] Consider team/about section

### Out of Scope

- CMS integration — static site works fine for portfolio updates
- Multi-language support — Dutch market only
- Blog functionality — not needed for this agency
- E-commerce features — not relevant
- Complete redesign — optimizing existing design, not replacing it

## Context

**Current State:**
- Total size: 239MB (target: <10MB)
- Largest image: 19MB (target: <200KB)
- Lighthouse score: Low (target: 90+)
- 11 HTML files, 480 lines JS, 3,430 lines CSS

**Tech Stack:**
- Static HTML5, CSS, vanilla JavaScript
- Bootstrap 5 (bundled)
- SCSS compiled via VS Code Easy Compile extension
- Apache server with .htaccess

**Known Technical Debt:**
- `/assets/vendor/` is unused duplicate of `/assets/vendor copy/` (naming issue)
- Images are raw from camera (19MB files)
- Memory leaks in main.js (event listeners, timeouts)
- 100vw causing horizontal scrollbar

**Existing Documentation:**
- `.planning/performance-audit.md` — file sizes, images, JS issues
- `.planning/visual-bugs.md` — stretched images, spacing, overflow
- `.planning/seo-audit.md` — missing meta tags, sitemap needs
- `.planning/implementation-plan.md` — 7-phase detailed breakdown

## Constraints

- **No build tools**: Site uses VS Code Easy Compile for SCSS only. No npm, webpack, etc.
- **Apache server**: Hosting requires .htaccess compatibility
- **CDN libraries**: New libraries (Lenis, GSAP) loaded via CDN, not bundled
- **Backwards compatibility**: URLs must not change (SEO preservation)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| GSAP over AOS | More powerful, better performance, industry standard | — Pending |
| WebP images | 70-80% size reduction, broad browser support | — Pending |
| Lenis for scrolling | Smooth, lightweight, widely adopted | — Pending |
| Keep static site | No CMS needed for infrequent portfolio updates | ✓ Good |

---
*Last updated: 2026-02-05 after initialization*
