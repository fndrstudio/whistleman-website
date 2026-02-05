# Requirements: Whistleman Media Website Optimization

**Defined:** 2026-02-05
**Core Value:** A professional portfolio that loads fast, looks polished, and converts visitors to clients

## v1 Requirements

Requirements for initial optimization. Each maps to roadmap phases.

### Cleanup

- [x] **CLEAN-01**: Delete duplicate vendor directory (save 10MB)
- [x] **CLEAN-02**: Rename `vendor copy` to `vendor`, update all HTML paths
- [x] **CLEAN-03**: Remove unused libraries (Isotope, ImagesLoaded, AOS)

### Performance

- [x] **PERF-01**: Convert images to WebP format (196MB → ~20MB target)
- [x] **PERF-02**: Add lazy loading to all below-fold images
- [ ] **PERF-03**: Add srcset responsive variants for images

### Visual

- [x] **VIS-01**: Fix horizontal overflow (100vw → 100%)
- [x] **VIS-02**: Add object-position to fixed-size images
- [x] **VIS-03**: Standardize left margins with CSS variable

### Code Quality

- [x] **CODE-01**: Fix JavaScript memory leaks
- [x] **CODE-02**: Add throttle/debounce to scroll handlers
- [x] **CODE-03**: Replace innerHTML with textContent (XSS prevention)
- [x] **CODE-04**: Optimize Google Fonts loading

### SEO

- [ ] **SEO-01**: Add Open Graph and Twitter Card meta tags
- [ ] **SEO-02**: Create robots.txt and sitemap.xml
- [ ] **SEO-03**: Add JSON-LD structured data
- [ ] **SEO-04**: Fill in all image alt texts

### Animation

- [ ] **ANIM-01**: Add Lenis for smooth scrolling
- [ ] **ANIM-02**: Add GSAP + ScrollTrigger for animations
- [ ] **ANIM-03**: Implement scroll-triggered section animations
- [ ] **ANIM-04**: Add micro-interactions to buttons

### UX

- [ ] **UX-01**: Improve mobile navigation
- [ ] **UX-02**: Make CTAs more visually distinct
- [ ] **UX-03**: Consider team/about section

## v2 Requirements

Deferred to future updates. Tracked but not in current roadmap.

### Future Enhancements

- **FUT-01**: Testimonials section
- **FUT-02**: Case study video embeds
- **FUT-03**: Client login/portal area
- **FUT-04**: Blog or news section

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| CMS integration | Static site works fine for infrequent portfolio updates |
| Multi-language support | Dutch market only |
| Blog functionality | Not needed for this agency |
| E-commerce features | Not relevant to service business |
| Complete redesign | Optimizing existing design, not replacing it |
| Build tools (npm, webpack) | SCSS via VS Code Easy Compile is sufficient |

## Traceability

Which phases cover which requirements. Updated by create-roadmap.

| Requirement | Phase | Status |
|-------------|-------|--------|
| CLEAN-01 | Phase 1 | Complete |
| CLEAN-02 | Phase 1 | Complete |
| CLEAN-03 | Phase 1 | Complete |
| PERF-01 | Phase 2 | Complete |
| PERF-02 | Phase 2 | Complete |
| PERF-03 | Phase 2 | Pending |
| VIS-01 | Phase 3 | Complete |
| VIS-02 | Phase 3 | Complete |
| VIS-03 | Phase 3 | Complete |
| CODE-01 | Phase 4 | Complete |
| CODE-02 | Phase 4 | Complete |
| CODE-03 | Phase 4 | Complete |
| CODE-04 | Phase 4 | Complete |
| SEO-01 | Phase 5 | Pending |
| SEO-02 | Phase 5 | Pending |
| SEO-03 | Phase 5 | Pending |
| SEO-04 | Phase 5 | Pending |
| ANIM-01 | Phase 6 | Pending |
| ANIM-02 | Phase 6 | Pending |
| ANIM-03 | Phase 6 | Pending |
| ANIM-04 | Phase 6 | Pending |
| UX-01 | Phase 7 | Pending |
| UX-02 | Phase 7 | Pending |
| UX-03 | Phase 7 | Pending |

**Coverage:**
- v1 requirements: 24 total
- Mapped to phases: 24
- Unmapped: 0 ✓

---
*Requirements defined: 2026-02-05*
*Last updated: 2026-02-05 after roadmap creation*
