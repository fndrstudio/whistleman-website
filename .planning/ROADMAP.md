# Roadmap: Whistleman Media Website Optimization

## Overview

Transform a bloated 239MB portfolio site into a fast, polished, SEO-optimized showcase. Starting with critical cleanup and image optimization (the biggest wins), then fixing visual bugs, improving code quality, adding SEO, implementing professional animations, and finishing with UX enhancements.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

- [x] **Phase 1: Critical Cleanup** — Delete duplicates, fix vendor paths, remove unused libs
- [x] **Phase 2: Image Optimization** — WebP conversion, lazy loading, responsive srcset
- [x] **Phase 3: Visual Bug Fixes** — Fix overflow, object-position, consistent margins
- [x] **Phase 4: Code Quality** — Memory leaks, throttle/debounce, XSS, fonts
- [x] **Phase 5: SEO Implementation** — OG/Twitter cards, sitemap, JSON-LD, alt texts
- [ ] **Phase 6: Animation & Polish** — Lenis scrolling, GSAP animations, micro-interactions
- [ ] **Phase 7: UX Enhancements** — Mobile nav, CTA visibility, team section

## Phase Details

### Phase 1: Critical Cleanup
**Goal**: Remove bloat and fix folder structure
**Depends on**: Nothing (first phase)
**Requirements**: CLEAN-01, CLEAN-02, CLEAN-03
**Success Criteria** (what must be TRUE):
  1. Site loads without errors (no broken vendor references)
  2. Total site size reduced by ~10MB (duplicate vendor deleted)
  3. All HTML files reference `assets/vendor/` (not `vendor copy`)
**Research**: Unlikely (internal file operations)
**Plans**: 1 plan

Plans:
- [x] 01-01: Delete duplicate vendor, rename folder, update paths

### Phase 2: Image Optimization
**Goal**: Reduce image payload for fast loading
**Depends on**: Phase 1
**Requirements**: PERF-01, PERF-02, PERF-03
**Success Criteria** (what must be TRUE):
  1. All images are WebP format (or have WebP variants)
  2. Below-fold images load lazily (visible in network tab)
  3. Total image size under 30MB (from 196MB)
**Research**: Unlikely (standard optimization patterns)
**Plans**: 1 plan

Plans:
- [x] 02-01: Convert images to WebP and add lazy loading

### Phase 3: Visual Bug Fixes
**Goal**: Fix visual rendering issues
**Depends on**: Phase 2
**Requirements**: VIS-01, VIS-02, VIS-03
**Success Criteria** (what must be TRUE):
  1. No horizontal scrollbar appears on any page
  2. Images in fixed-size containers don't stretch or crop awkwardly
  3. Left margins are consistent across all sections
**Research**: Unlikely (CSS fixes)
**Plans**: 1 plan

Plans:
- [x] 03-01: Fix CSS overflow, object-position, and margin consistency

### Phase 4: Code Quality
**Goal**: Clean, secure, performant JavaScript
**Depends on**: Phase 3
**Requirements**: CODE-01, CODE-02, CODE-03, CODE-04
**Success Criteria** (what must be TRUE):
  1. No memory leaks (event listeners cleaned up)
  2. Scroll handlers are throttled (no performance jank)
  3. No XSS vulnerabilities (innerHTML replaced)
  4. Google Fonts load without render blocking
**Research**: Unlikely (established JS patterns)
**Plans**: 2 plans

Plans:
- [x] 04-01: Fix memory leaks and add throttle/debounce
- [x] 04-02: Fix XSS issues and optimize font loading

### Phase 5: SEO Implementation
**Goal**: Discoverable and shareable on social/search
**Depends on**: Phase 4
**Requirements**: SEO-01, SEO-02, SEO-03, SEO-04
**Success Criteria** (what must be TRUE):
  1. Shared links show proper preview cards (OG/Twitter)
  2. robots.txt and sitemap.xml exist and are valid
  3. JSON-LD validates in Google's testing tool
  4. All images have descriptive alt texts
**Research**: Complete (05-RESEARCH.md)
**Plans**: 2 plans

Plans:
- [x] 05-01-PLAN.md — Add OG/Twitter meta tags to all pages, create robots.txt and sitemap.xml
- [x] 05-02-PLAN.md — Add JSON-LD structured data and fill all image alt texts

### Phase 6: Animation & Polish
**Goal**: Smooth, professional animations throughout
**Depends on**: Phase 5
**Requirements**: ANIM-01, ANIM-02, ANIM-03, ANIM-04
**Success Criteria** (what must be TRUE):
  1. Page scrolling feels smooth and "buttery" (Lenis active)
  2. Sections animate in on scroll with GSAP
  3. Buttons have hover/click micro-interactions
  4. No janky or stuttering animations
**Research**: Likely (new library integration)
**Research topics**: Lenis CDN setup, GSAP ScrollTrigger patterns, scroll animation best practices
**Plans**: TBD

Plans:
- [ ] 06-01: Integrate Lenis smooth scrolling
- [ ] 06-02: Add GSAP ScrollTrigger animations
- [ ] 06-03: Implement micro-interactions

### Phase 7: UX Enhancements
**Goal**: Better user experience, especially mobile
**Depends on**: Phase 6
**Requirements**: UX-01, UX-02, UX-03
**Success Criteria** (what must be TRUE):
  1. Mobile navigation is easy to use and accessible
  2. CTAs stand out visually and invite clicks
  3. About/team information is accessible (if added)
**Research**: Unlikely (internal UX patterns)
**Plans**: TBD

Plans:
- [ ] 07-01: Improve mobile nav and CTA visibility
- [ ] 07-02: Add team/about section (optional)

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6 → 7

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Critical Cleanup | 1/1 | Complete | 2026-02-05 |
| 2. Image Optimization | 1/1 | Complete | 2026-02-05 |
| 3. Visual Bug Fixes | 1/1 | Complete | 2026-02-05 |
| 4. Code Quality | 2/2 | Complete | 2026-02-05 |
| 5. SEO Implementation | 2/2 | Complete | 2026-02-06 |
| 6. Animation & Polish | 0/3 | Not started | - |
| 7. UX Enhancements | 0/2 | Not started | - |

---
*Created: 2026-02-05*
