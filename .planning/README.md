# Whistleman Media Website - Optimization Project

## Quick Reference

| Metric | Current | Target |
|--------|---------|--------|
| Total Size | 239MB | <10MB |
| Largest Image | 19MB | <200KB |
| Duplicate Files | 25MB | 0 |
| CSS Lines | 3,430 | ~1,500 |
| Lighthouse Score | Low | 90+ |

## Tech Stack

- **Framework:** Static HTML (no build tools)
- **Styling:** Bootstrap 5 + Custom SCSS
- **JS:** Vanilla JS + vendor libraries
- **Server:** Apache (.htaccess)
- **Live Site:** https://whistlemanmedia.nl

## Documentation Index

| File | Contents |
|------|----------|
| [performance-audit.md](performance-audit.md) | File sizes, images, fonts, JS issues |
| [visual-bugs.md](visual-bugs.md) | Stretched images, alignment, spacing |
| [seo-audit.md](seo-audit.md) | Missing meta tags, sitemap, robots.txt |
| [ux-analysis.md](ux-analysis.md) | Live site review, best practices |
| [implementation-plan.md](implementation-plan.md) | 7-phase roadmap with tasks |

## Libraries to Add

| Library | Purpose | CDN |
|---------|---------|-----|
| **Lenis** | Smooth scrolling | `unpkg.com/lenis@1.1.13/dist/lenis.min.js` |
| **GSAP** | Animations | `cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js` |
| **ScrollTrigger** | Scroll animations | `cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js` |

## Libraries to Remove

- **AOS** - Replaced by GSAP
- **Isotope** - Unused
- **ImagesLoaded** - Unused

## Top Priority Fixes

1. Delete `/assets/vendor/` (duplicate, 10MB waste)
2. Fix `100vw` causing horizontal overflow
3. Add `object-position: center` to fixed-size images
4. Convert images to WebP (70-80% size reduction)

## Key Files

| File | Purpose |
|------|---------|
| `assets/js/main.js` | Main JS (480 lines) |
| `assets/css/main.css` | Compiled CSS (3,430 lines) |
| `assets/scss/` | SCSS source files |
| `assets/vendor copy/` | Active vendor libs |
| `assets/vendor/` | **UNUSED - DELETE** |

## Implementation Phases

1. **Critical Cleanup** - Delete duplicates, fix paths
2. **Image Optimization** - WebP, compression, lazy load
3. **Visual Bug Fixes** - object-position, 100vw, spacing
4. **Code Quality** - JS fixes, HTML consolidation
5. **SEO** - Meta tags, sitemap, structured data
6. **Animation & Polish** - Lenis, GSAP, micro-interactions
7. **UX Enhancements** - Navigation, CTAs, team section
