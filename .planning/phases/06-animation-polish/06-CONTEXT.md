# Phase 6: Animation & Polish - Context

**Gathered:** 2026-02-06
**Status:** Ready for planning

<domain>
## Phase Boundary

Implement smooth scrolling (Lenis), scroll-triggered animations (GSAP ScrollTrigger), and micro-interactions throughout the site. This phase adds motion and polish — new features or page content are separate phases.

</domain>

<decisions>
## Implementation Decisions

### Scroll Feel
- **Smoothness:** Butter-smooth with momentum on desktop
- **Mobile:** Native scroll (no Lenis) — let phones use their natural behavior
- **Anchor links:** Quick snap with easing when clicking nav links to sections
- **Hero:** Parallax background effect — hero background moves slower than content
- **Momentum:** Short coast — brief continuation after release, then stops quickly
- **Carousels:** Smooth horizontal scrolling for Swiper carousels
- **Progress indicator:** Thin progress bar at top showing scroll position
- **Page navigation:** Always start at top — no scroll position restoration

### Section Reveals
- **Animation type:** Fade + slide up — content fades in while rising from below
- **Stagger:** Cascade effect — elements animate one after another with slight delay
- **Stagger timing:** Quick (50-100ms) between items
- **Replay:** Play once only — content stays visible after animating in
- **Hero entrance:** Dramatic sequence on page load — title, subtitle, CTA animate in sequence
- **Case studies:** Simplified animations — fewer effects to focus on content

### Animation Intensity
- **Overall vibe:** Dynamic & engaging — noticeable animations that add energy
- **Speed:** Snappy (200-400ms) — quick and responsive
- **Easing:** Ease-in-out — gentle start and end, elegant feel
- **Accessibility:** Simplify for reduced motion preference — keep subtle fades, remove movement

### Micro-interactions
- **Button hover:** Color shift + slight lift — background changes, subtle Y-axis movement and shadow
- **Button click:** Press down effect — button visually presses inward
- **Card hover:** Lift + shadow enhancement combined with overlay reveal — card rises, shadow deepens, info overlay appears
- **Nav hover:** Claude's discretion — based on existing nav design

### Claude's Discretion
- Animation trigger point (20% vs 50% visible) — based on section size
- Slide distance for fade+slide animations — based on section context
- Nav link hover effect — based on existing nav design
- Specific timing and easing values within the established ranges

</decisions>

<specifics>
## Specific Ideas

- Progress bar should be subtle — thin line, doesn't distract from content
- Hero parallax should feel natural, not gimmicky
- Card overlay reveal should complement the lift effect, not compete with it
- Reduced motion users should still get a polished experience, just without movement

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 06-animation-polish*
*Context gathered: 2026-02-06*
