---
phase: 06-animation-polish
plan: 02
subsystem: ui
tags: [gsap, scrolltrigger, hero-animation, parallax, section-reveal, stagger]

# Dependency graph
requires:
  - phase: 06-animation-polish
    provides: GSAP + ScrollTrigger foundation, WMAnimations global, device detection
provides:
  - Hero entrance sequence animation (title -> subtitle -> CTA)
  - Hero parallax background effect (desktop only)
  - Section reveal animations with child stagger
  - Case study simplified animations (fade only)
affects: [06-03-micro-interactions]

# Tech tracking
tech-stack:
  added: []
  patterns: [gsap-timeline-sequence, scrolltrigger-once, autoAlpha-fouc-prevention, section-height-trigger-adjustment]

key-files:
  created: []
  modified:
    - assets/js/animations.js

key-decisions:
  - "autoAlpha for FOUC prevention over opacity alone"
  - "Hero sequence: 0.6s title, 0.5s subtitle, 0.4s CTA with overlapping timing"
  - "Parallax 20% yPercent for subtle depth effect"
  - "Section trigger varies by height: 90% for small, 80% default, 70% for large"
  - "Case study pages: fade only (no slide, no stagger) for cleaner reading"
  - "once:true for all section animations - play once and stay visible"

patterns-established:
  - "autoAlpha pattern: gsap.set initial state then gsap.to for reveal"
  - "Section stagger: 0.08s stagger amount with 'start' direction"
  - "Reduced motion: instant fade (0.1s) without y movement"

# Metrics
duration: 2min
completed: 2026-02-06
---

# Phase 06 Plan 02: Hero + Section Animations Summary

**GSAP hero entrance sequence with parallax, section reveal animations with child stagger, and case study simplified fade animations**

## Performance

- **Duration:** 2 min
- **Started:** 2026-02-06T11:46:43Z
- **Completed:** 2026-02-06T11:48:03Z
- **Tasks:** 2/2
- **Files modified:** 1

## Accomplishments
- Hero entrance sequence animates title, subtitle, CTA in sequence with overlapping timing
- Hero parallax background on desktop (20% slower scroll movement)
- Section reveal animations triggered at 70-90% visibility based on section height
- Child elements stagger with 80ms cascade effect
- Case study pages get simplified fade-only animations for cleaner reading experience
- Full reduced motion support throughout (instant fades, no movement)

## Task Commits

Each task was committed atomically:

1. **Task 1: Add hero entrance sequence animation** - `edfb7b9` (feat)
2. **Task 2: Add section reveal animations with stagger** - `2b3c43d` (feat)

## Files Created/Modified
- `assets/js/animations.js` - Extended from 136 to 334 lines with hero entrance, parallax, section reveals, and card grid animations

## Decisions Made
- Used autoAlpha (visibility + opacity) to prevent FOUC instead of opacity alone
- Hero sequence uses overlapping timing (-=0.3, -=0.2) for fluid entrance
- Parallax uses 20% yPercent for subtle depth without being distracting
- Section trigger point varies by height (small=90%, default=80%, large=70%)
- Case study pages detected via pathname or body class for simplified animations
- Card grid containers get specific animation treatment with 100ms total stagger

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - animations work automatically with existing CDN libraries from Plan 01.

## Next Phase Readiness
- Hero and section animations complete
- Plan 03 (Micro-interactions) can proceed
- animations.js now at 334 lines with complete scroll-triggered animation system
- WMAnimations global still available for any additional customization

---
*Phase: 06-animation-polish*
*Completed: 2026-02-06*

## Self-Check: PASSED
