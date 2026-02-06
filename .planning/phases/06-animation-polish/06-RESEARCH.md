# Phase 6: Animation & Polish - Research

**Researched:** 2026-02-06
**Domain:** Smooth scrolling and scroll-triggered animations
**Confidence:** HIGH

## Summary

This research investigated the implementation of smooth scrolling with Lenis and scroll-triggered animations with GSAP ScrollTrigger for a static HTML/CSS/JavaScript site without build tools. The standard approach combines Lenis for butter-smooth desktop scrolling (disabled on mobile for native performance) with GSAP ScrollTrigger for scroll-triggered animations, micro-interactions, and accessibility support via `gsap.matchMedia()` for `prefers-reduced-motion`.

Key findings confirm that both libraries work excellently via CDN, integrate seamlessly when properly synchronized, and provide robust performance when following established patterns. However, several critical pitfalls exist around ScrollTrigger creation order, Lenis-ScrollTrigger integration, and mobile performance that must be carefully addressed.

The user has locked specific implementation decisions (fade+slide animations, snappy timing 200-400ms, desktop-only Lenis, ease-in-out easing) which constrains implementation choices but provides clear direction for planning.

**Primary recommendation:** Use Lenis 1.3.17+ via CDN with mobile detection to disable on touch devices, integrate with GSAP 3.14+ ScrollTrigger using the official synchronization pattern, implement all animations within `gsap.matchMedia()` to respect `prefers-reduced-motion`, and follow ScrollTrigger creation order strictly to avoid pinning/positioning bugs.

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Scroll Feel:**
- Smoothness: Butter-smooth with momentum on desktop
- Mobile: Native scroll (no Lenis) - let phones use their natural behavior
- Anchor links: Quick snap with easing when clicking nav links to sections
- Hero: Parallax background effect - hero background moves slower than content
- Momentum: Short coast - brief continuation after release, then stops quickly
- Carousels: Smooth horizontal scrolling for Swiper carousels
- Progress indicator: Thin progress bar at top showing scroll position
- Page navigation: Always start at top - no scroll position restoration

**Section Reveals:**
- Animation type: Fade + slide up - content fades in while rising from below
- Stagger: Cascade effect - elements animate one after another with slight delay
- Stagger timing: Quick (50-100ms) between items
- Replay: Play once only - content stays visible after animating in
- Hero entrance: Dramatic sequence on page load - title, subtitle, CTA animate in sequence
- Case studies: Simplified animations - fewer effects to focus on content

**Animation Intensity:**
- Overall vibe: Dynamic & engaging - noticeable animations that add energy
- Speed: Snappy (200-400ms) - quick and responsive
- Easing: Ease-in-out - gentle start and end, elegant feel
- Accessibility: Simplify for reduced motion preference - keep subtle fades, remove movement

**Micro-interactions:**
- Button hover: Color shift + slight lift - background changes, subtle Y-axis movement and shadow
- Button click: Press down effect - button visually presses inward
- Card hover: Lift + shadow enhancement combined with overlay reveal - card rises, shadow deepens, info overlay appears
- Nav hover: Claude's discretion - based on existing nav design

### Claude's Discretion
- Animation trigger point (20% vs 50% visible) - based on section size
- Slide distance for fade+slide animations - based on section context
- Nav link hover effect - based on existing nav design
- Specific timing and easing values within the established ranges (200-400ms, 50-100ms stagger)

### Deferred Ideas (OUT OF SCOPE)
None - discussion stayed within phase scope

</user_constraints>

---

## Standard Stack

The established libraries for smooth scrolling and scroll-triggered animations without build tools:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Lenis | 1.3.17+ | Smooth scroll with momentum | Industry standard for premium smooth scroll, lightweight (4KB), actively maintained by Darkroom Engineering, used by GTA VI, Microsoft Design, Shopify |
| GSAP | 3.14.1+ | Animation engine | Industry standard, highly optimized, robust API, 60fps performance, free since Webflow acquisition (2024) |
| ScrollTrigger | 3.14.1+ (plugin) | Scroll-triggered animations | Official GSAP plugin, synchronizes perfectly with GSAP ticker, built-in accessibility support, handles resize/refresh automatically |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| PureCounter | Current | Number animations | Already in use - keep for stats counters |
| Swiper | Current | Carousels | Already in use - ensure smooth integration with Lenis |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Lenis | Locomotive Scroll | More features but heavier, more complex setup, overkill for this project |
| Lenis | Custom smooth scroll | Would need to hand-roll momentum, easing, mobile detection - not recommended |
| ScrollTrigger | AOS (Animate On Scroll) | User already decided to remove AOS - less powerful, limited animation options |
| ScrollTrigger | Intersection Observer API | Would need custom animation logic, no scrub/pin features, more code |

**Installation:**
```html
<!-- Add to <head> before closing </head> tag -->
<script src="https://unpkg.com/lenis@1.3.17/dist/lenis.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/lenis@1.3.17/dist/lenis.css">
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/ScrollTrigger.min.js"></script>
```

**Note:** Load order matters - GSAP must load before ScrollTrigger. Lenis can load anywhere but must initialize before ScrollTrigger setup.

---

## Architecture Patterns

### Recommended Project Structure
```
assets/
├── js/
│   ├── main.js              # Existing custom JS - keep existing functionality
│   ├── animations.js        # NEW - All GSAP/Lenis animation code
│   └── utils/
│       └── device-detect.js # NEW - Mobile detection utility
└── css/
    └── main.css             # Existing styles - add animation-related utilities
```

### Pattern 1: Lenis Setup with Mobile Detection
**What:** Initialize Lenis only on desktop devices, use native scroll on mobile
**When to use:** Always - user decision locked in
**Example:**
```javascript
// Source: https://github.com/darkroomengineering/lenis (verified official)
// Device detection
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (!isMobile && !isTouch) {
  // Desktop only - initialize Lenis
  const lenis = new Lenis({
    duration: 1.2,        // Scroll duration (higher = smoother, lower = snappier)
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Default easing
    lerp: 0.1,            // Linear interpolation intensity (lower = smoother)
    wheelMultiplier: 1,   // Mouse wheel sensitivity
    touchMultiplier: 0,   // Disable touch smooth scroll
    infinite: false,
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    autoResize: true
  });

  // Integrate with GSAP ticker for ScrollTrigger sync
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0); // Disable lag smoothing for Lenis sync
}
```

### Pattern 2: GSAP ScrollTrigger Setup with Accessibility
**What:** Configure ScrollTrigger with matchMedia for responsive and accessible animations
**When to use:** Always - foundation for all scroll animations
**Example:**
```javascript
// Source: https://gsap.com/docs/v3/GSAP/gsap.matchMedia/ (official docs)
gsap.registerPlugin(ScrollTrigger);

const mm = gsap.matchMedia();

mm.add({
  isDesktop: "(min-width: 768px)",
  isMobile: "(max-width: 767px)",
  reduceMotion: "(prefers-reduced-motion: reduce)"
}, (context) => {
  const { isDesktop, isMobile, reduceMotion } = context.conditions;

  // Animations adapt based on conditions
  // Example: section fade+slide animation
  gsap.utils.toArray('.section-animate').forEach(section => {
    gsap.fromTo(section,
      {
        autoAlpha: 0,
        y: reduceMotion ? 0 : 50 // No movement for reduced motion
      },
      {
        autoAlpha: 1,
        y: 0,
        duration: reduceMotion ? 0.1 : 0.3, // Faster for reduced motion
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
});
```

### Pattern 3: Staggered Fade+Slide Section Reveals
**What:** Animate child elements with cascade effect as section scrolls into view
**When to use:** Main sections, card grids, list items (user decision locked)
**Example:**
```javascript
// Source: https://gsap.com/resources/getting-started/Staggers/ (official docs)
gsap.utils.toArray('.cards .card').forEach(container => {
  const items = container.querySelectorAll('.card');

  gsap.fromTo(items,
    {
      autoAlpha: 0,
      y: 50
    },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.4,
      ease: 'power2.inOut',
      stagger: {
        amount: 0.1,  // 100ms total across all items
        from: 'start' // Animate from first to last
      },
      scrollTrigger: {
        trigger: container,
        start: 'top 75%',
        toggleActions: 'play none none none',
        once: true // Play once only (user decision)
      }
    }
  );
});
```

### Pattern 4: Hero Parallax Effect
**What:** Hero background moves slower than scroll for depth effect
**When to use:** Hero sections only (user decision locked)
**Example:**
```javascript
// Source: https://gsap.com/community/forums/topic/38841-parallax-effect-to-hero/ (community verified)
const heroBackground = document.querySelector('.hero-bg');

gsap.to(heroBackground, {
  yPercent: -30, // Background moves 30% slower than scroll
  ease: 'none',  // Linear for scroll-linked effects
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 0.5 // Smooth scrub with slight delay
  }
});
```

### Pattern 5: Scroll Progress Bar
**What:** Thin progress indicator at top showing scroll position
**When to use:** All pages (user decision locked)
**Example:**
```javascript
// HTML: <div class="scroll-progress"></div>
// CSS: .scroll-progress { position: fixed; top: 0; left: 0; width: 0%; height: 3px; background: var(--accent-color); z-index: 9999; }

gsap.to('.scroll-progress', {
  width: '100%',
  ease: 'none',
  scrollTrigger: {
    trigger: 'body',
    start: 'top top',
    end: 'bottom bottom',
    scrub: 0.1
  }
});
```

### Pattern 6: Button Micro-interactions
**What:** Hover lift + color shift, active press down
**When to use:** All buttons (user decision locked)
**Example:**
```javascript
// Source: CSS-based for better performance than GSAP for simple hovers
// CSS approach recommended over GSAP for hover states

// CSS:
.btn {
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.btn:active {
  transform: translateY(1px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Disable movement for reduced motion */
@media (prefers-reduced-motion: reduce) {
  .btn:hover {
    transform: none;
  }
  .btn:active {
    transform: none;
  }
}
```

### Pattern 7: Card Hover Interactions
**What:** Lift + shadow enhancement + overlay reveal
**When to use:** Portfolio cards, service cards (user decision locked)
**Example:**
```javascript
// CSS-based for performance:
.card {
  position: relative;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.card::before {
  /* Existing overlay - enhance on hover */
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.2);
}

.card:hover::before {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .card:hover {
    transform: translateY(-2px); /* Subtle lift only */
  }
}
```

### Pattern 8: Hero Entrance Sequence
**What:** Title, subtitle, CTA animate in sequence on page load
**When to use:** Hero sections (user decision locked)
**Example:**
```javascript
// Source: https://gsap.com/resources/getting-started/Staggers/
const heroTl = gsap.timeline({ delay: 0.3 });

heroTl
  .from('.hero h1', {
    autoAlpha: 0,
    y: 50,
    duration: 0.6,
    ease: 'power2.out'
  })
  .from('.hero .subtitle', {
    autoAlpha: 0,
    y: 30,
    duration: 0.5,
    ease: 'power2.out'
  }, '-=0.3') // Start 0.3s before previous ends
  .from('.hero .cta', {
    autoAlpha: 0,
    y: 20,
    duration: 0.4,
    ease: 'power2.out'
  }, '-=0.2');
```

### Pattern 9: Anchor Link Smooth Scroll
**What:** Clicking nav links smoothly scrolls to sections with easing
**When to use:** All anchor navigation (user decision locked)
**Example:**
```javascript
// Source: https://lenis.darkroom.engineering/ (official docs)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));

    if (target) {
      if (typeof lenis !== 'undefined') {
        // Lenis active (desktop)
        lenis.scrollTo(target, {
          duration: 1.2,
          easing: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t // ease-in-out
        });
      } else {
        // Native scroll (mobile)
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});
```

### Anti-Patterns to Avoid

- **Don't animate same properties in multiple ScrollTriggers** - Causes jumps and caching issues (use `immediateRender: false` or `.fromTo()` for later animations)
- **Don't use single tween for multiple sections** - Each section needs its own ScrollTrigger to animate independently when scrolling into view
- **Don't hard-code start/end values** - Use function-based values `() => \`+=${height}\`` for responsive behavior
- **Don't create ScrollTriggers out of order when pinning** - Create in scroll order or use `refreshPriority`
- **Don't forget ScrollTrigger.refresh() after dynamic content** - AJAX/dynamic content requires manual refresh
- **Don't use `from()` tweens for page load animations** - Causes FOUC (Flash of Unstyled Content), use `set()` first or `fromTo()`
- **Don't nest ScrollTriggers in timeline tweens** - Apply ScrollTrigger to parent timeline, not individual nested tweens
- **Don't animate left/top properties** - Use `x/y` or transforms for GPU acceleration
- **Don't apply Lenis to mobile** - Degrades native scroll performance and UX

---

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Smooth scroll momentum | Custom requestAnimationFrame loop with easing math | Lenis library | Edge cases: iOS momentum conflicts, touch vs wheel events, resize handling, anchor link integration, accessibility, browser inconsistencies - Lenis handles all |
| Scroll-triggered animations | Intersection Observer + manual animation code | GSAP ScrollTrigger | Edge cases: pinning, scrubbing, resize recalculation, multiple triggers per element, snap points, function-based values, horizontal scroll, coordinate systems |
| Stagger timing calculations | Manual delay loops or setTimeout chains | GSAP stagger object | Edge cases: dynamic element counts, responsive grids, different stagger directions (start/center/edges/random), easing per stagger, total duration vs per-item |
| Parallax scroll effects | Transform calculations based on scroll position | GSAP ScrollTrigger with scrub | Edge cases: different scroll speeds, boundaries, multi-layer parallax, performance optimization, mobile handling |
| Reduced motion detection | Manual media query checks and state management | gsap.matchMedia() | Edge cases: dynamic preference changes, animation cleanup/revert, multiple breakpoints, condition combinations, automatic cleanup |
| Easing functions | Custom cubic-bezier or mathematical functions | GSAP built-in eases | Performance: GSAP uses pre-calculated lookup tables, all eases equally fast including bounce/elastic |
| Progress indicators | Manual scroll event listeners with percentage calculations | GSAP ScrollTrigger with scrub to width/scaleX | Edge cases: document height changes, resize, smooth updates, performance throttling |
| Device/touch detection | Single navigator.userAgent check | Combined userAgent + touch capability + matchMedia | Edge cases: hybrid devices, desktop touch screens, iPad with keyboard, browser spoofing |

**Key insight:** Scroll animations have dozens of edge cases (resize, dynamic content, mobile, touch, accessibility, browser differences) that mature libraries have solved through years of real-world use. Custom solutions will hit these edge cases in production. The time saved by using libraries far exceeds the learning curve.

---

## Common Pitfalls

### Pitfall 1: Lenis-ScrollTrigger Synchronization Issues
**What goes wrong:** Animations become offset, pinning breaks, scroll range incorrect, laggy performance
**Why it happens:** Lenis creates a virtual scroll that ScrollTrigger must track. Without proper integration, ScrollTrigger calculates positions based on native scroll while Lenis controls virtual scroll position - they desync
**How to avoid:**
```javascript
// REQUIRED integration pattern (official)
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);
```
**Warning signs:**
- Animations trigger at wrong scroll positions
- Pinned elements don't unpin or jump
- Console shows ScrollTrigger position warnings
- Scroll feels laggy or stuttery

### Pitfall 2: ScrollTrigger Creation Order with Pinning
**What goes wrong:** Later ScrollTriggers calculate positions incorrectly, elements jump, animations don't trigger
**Why it happens:** When a ScrollTrigger pins an element (with default `pinSpacing: true`), it adds extra space to the document. ScrollTriggers created AFTER this don't account for that extra space unless they refresh their calculations
**How to avoid:**
1. Create ScrollTriggers in scroll order (top to bottom)
2. OR set `refreshPriority` to control calculation order
3. OR use `pinSpacing: false` if spacing isn't needed
```javascript
// Option 1: Create in order
gsap.to('.section-1', { scrollTrigger: { pin: true } }); // First
gsap.to('.section-2', { scrollTrigger: { trigger: '.section-2' } }); // After

// Option 2: Use refreshPriority
gsap.to('.section-bottom', {
  scrollTrigger: {
    trigger: '.section-bottom',
    refreshPriority: -1 // Calculate after others
  }
});
```
**Warning signs:**
- Elements animate at unexpected scroll positions
- Scroll distance feels wrong
- Layout shifts after scroll

### Pitfall 3: Mobile Performance Degradation with Lenis
**What goes wrong:** Mobile scrolling feels laggy, janky, or doesn't use native momentum
**Why it happens:** Mobile browsers have highly optimized native scroll with hardware acceleration. Lenis adds JavaScript overhead that can't match native performance, especially on lower-end devices
**How to avoid:** ALWAYS disable Lenis on mobile/touch devices (user decision already locked this in)
```javascript
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (!isMobile && !isTouch) {
  // Only initialize on desktop
  const lenis = new Lenis({ /* config */ });
}
```
**Warning signs:**
- Touch scrolling feels sluggish
- Scroll doesn't coast naturally
- FPS drops on mobile but not desktop

### Pitfall 4: Flash of Unstyled Content (FOUC) with from() Tweens
**What goes wrong:** Elements appear visible for a split second before animating in (opacity flicker)
**Why it happens:** GSAP `from()` tweens don't apply initial styles until JavaScript loads and executes. HTML renders with default CSS (opacity: 1) first, THEN JavaScript sets opacity: 0 to start the animation - visible flicker
**How to avoid:**
```javascript
// BAD - causes FOUC
gsap.from('.hero h1', { opacity: 0, y: 50 });

// GOOD - set initial state first
gsap.set('.hero h1', { opacity: 0, y: 50 });
gsap.to('.hero h1', { opacity: 1, y: 0 });

// OR use fromTo
gsap.fromTo('.hero h1',
  { opacity: 0, y: 50 },  // From
  { opacity: 1, y: 0 }    // To
);
```
**Warning signs:**
- Elements flash visible before animating
- Page load feels janky
- Content "pops" into place

### Pitfall 5: Hard-Coded Values Breaking on Resize
**What goes wrong:** Animations work on initial load but break after window resize - wrong positions, cut off, or don't trigger
**Why it happens:** ScrollTrigger auto-refreshes on resize BUT if you hard-coded values when created (e.g., `element.offsetHeight`), those values don't recalculate
**How to avoid:** Use function-based values that recalculate on refresh
```javascript
// BAD - caches value at creation
const height = element.offsetHeight;
scrollTrigger: {
  end: `+=${height}`
}

// GOOD - recalculates on resize
scrollTrigger: {
  end: () => `+=${element.offsetHeight}`
}
```
**Warning signs:**
- Animations work initially but break after resize
- Mobile rotation breaks animations
- DevTools responsive mode shows different behavior

### Pitfall 6: Animating Same Properties Multiple Times
**What goes wrong:** Element jumps between values, animation stutters, or shows wrong starting position
**Why it happens:** ScrollTriggers cache starting values when created. Second trigger tries to animate from cached value, not current value - causes jump
**How to avoid:**
```javascript
// BAD - second animation jumps
gsap.to('.box', { x: 100, scrollTrigger: { trigger: '.section-1' } });
gsap.to('.box', { x: 200, scrollTrigger: { trigger: '.section-2' } }); // Jumps from 100→0→200

// GOOD - use immediateRender: false
gsap.to('.box', { x: 100, scrollTrigger: { trigger: '.section-1' } });
gsap.to('.box', {
  x: 200,
  immediateRender: false,
  scrollTrigger: { trigger: '.section-2' }
});

// OR use fromTo for later animations
gsap.fromTo('.box',
  { x: 100 },
  { x: 200, scrollTrigger: { trigger: '.section-2' } }
);
```
**Warning signs:**
- Elements jump or teleport mid-scroll
- Animations reset unexpectedly
- Starting position looks wrong

### Pitfall 7: Ignoring prefers-reduced-motion
**What goes wrong:** Users with vestibular disorders, motion sensitivity, or accessibility settings experience nausea, disorientation, or headaches
**Why it happens:** Developers don't test with reduced motion or assume animations are "just nice to have" - but for some users, animations are harmful
**How to avoid:** ALWAYS use `gsap.matchMedia()` with `prefers-reduced-motion: reduce` condition
```javascript
mm.add({
  reduceMotion: "(prefers-reduced-motion: reduce)"
}, (context) => {
  const { reduceMotion } = context.conditions;

  gsap.to('.element', {
    opacity: 1,
    y: reduceMotion ? 0 : 50,        // No movement
    duration: reduceMotion ? 0.1 : 0.4, // Much faster
    ease: 'power2.inOut'
  });
});
```
**Warning signs:**
- No reduced motion testing done
- Animations hardcoded without conditions
- User complaints about motion sickness

### Pitfall 8: Single Tween for Multiple Independent Sections
**What goes wrong:** All sections animate at the same time instead of individually as they scroll into view
**Why it happens:** Using `gsap.to('.section')` targets all `.section` elements in ONE tween with ONE ScrollTrigger - trigger fires, all animate together
**How to avoid:** Loop through elements, create individual ScrollTriggers
```javascript
// BAD - all animate together
gsap.to('.section', {
  opacity: 1,
  scrollTrigger: { trigger: '.section' }
});

// GOOD - each animates independently
gsap.utils.toArray('.section').forEach(section => {
  gsap.to(section, {
    opacity: 1,
    scrollTrigger: { trigger: section }
  });
});
```
**Warning signs:**
- All sections animate at once
- Can't achieve staggered entrance per section
- User scrolls past sections that already animated

---

## Code Examples

Verified patterns from official sources:

### Complete Lenis + GSAP Setup (Desktop Only)
```javascript
// Source: https://github.com/darkroomengineering/lenis (official)
// Source: https://gsap.com/docs/v3/Plugins/ScrollTrigger/ (official)

(function() {
  'use strict';

  // Device detection
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // Initialize Lenis on desktop only
  let lenis = null;
  if (!isMobile && !isTouch) {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.1,
      wheelMultiplier: 1,
      touchMultiplier: 0,
      infinite: false,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      autoResize: true
    });

    // Integrate with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Expose globally for anchor links
    window.lenis = lenis;
  }

  // GSAP + ScrollTrigger setup
  gsap.registerPlugin(ScrollTrigger);

  // Accessibility and responsive setup
  const mm = gsap.matchMedia();

  mm.add({
    isDesktop: "(min-width: 768px)",
    isMobile: "(max-width: 767px)",
    reduceMotion: "(prefers-reduced-motion: reduce)"
  }, (context) => {
    const { isDesktop, isMobile, reduceMotion } = context.conditions;

    // Example: Section animations
    gsap.utils.toArray('.section-animate').forEach(section => {
      gsap.fromTo(section,
        {
          autoAlpha: 0,
          y: reduceMotion ? 0 : 50
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: reduceMotion ? 0.1 : 0.3,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true
          }
        }
      );
    });
  });

})();
```

### Scroll Progress Bar
```javascript
// HTML: <div class="scroll-progress"></div>

// CSS:
// .scroll-progress {
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 0%;
//   height: 3px;
//   background: var(--accent-color);
//   z-index: 9999;
//   transform-origin: left;
// }

// JavaScript:
gsap.to('.scroll-progress', {
  scaleX: 1,
  transformOrigin: 'left',
  ease: 'none',
  scrollTrigger: {
    trigger: 'body',
    start: 'top top',
    end: 'bottom bottom',
    scrub: 0.1
  }
});
```

### Hero Parallax Background
```javascript
// Source: https://gsap.com/community/forums/topic/38841-parallax-effect-to-hero/

const heroSection = document.querySelector('.hero');
const heroBackground = heroSection.querySelector('.hero-bg');

gsap.to(heroBackground, {
  yPercent: -30,
  ease: 'none',
  scrollTrigger: {
    trigger: heroSection,
    start: 'top top',
    end: 'bottom top',
    scrub: 0.5
  }
});
```

### Staggered Card Grid Animation
```javascript
// Source: https://gsap.com/resources/getting-started/Staggers/

const cardGrid = document.querySelector('.cards .row');
const cards = cardGrid.querySelectorAll('.card');

gsap.fromTo(cards,
  {
    autoAlpha: 0,
    y: 50
  },
  {
    autoAlpha: 1,
    y: 0,
    duration: 0.4,
    ease: 'power2.inOut',
    stagger: {
      amount: 0.1,    // 100ms total
      from: 'start',
      ease: 'power2.inOut'
    },
    scrollTrigger: {
      trigger: cardGrid,
      start: 'top 75%',
      toggleActions: 'play none none none',
      once: true
    }
  }
);
```

### Hero Entrance Sequence
```javascript
// Source: https://gsap.com/docs/v3/GSAP/Timeline/

const heroTl = gsap.timeline({
  delay: 0.3,
  defaults: { ease: 'power2.out' }
});

heroTl
  .from('.hero h1', {
    autoAlpha: 0,
    y: 50,
    duration: 0.6
  })
  .from('.hero .subtitle', {
    autoAlpha: 0,
    y: 30,
    duration: 0.5
  }, '-=0.3')
  .from('.hero .cta-buttons', {
    autoAlpha: 0,
    y: 20,
    duration: 0.4
  }, '-=0.2');
```

### Anchor Link Smooth Scroll
```javascript
// Source: https://lenis.darkroom.engineering/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);

    if (!target) return;

    if (window.lenis) {
      // Desktop with Lenis
      lenis.scrollTo(target, {
        duration: 1.2,
        easing: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
        offset: 0
      });
    } else {
      // Mobile with native scroll
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
```

### Button Micro-interactions (CSS)
```css
/* Source: https://thelinuxcode.com/css-hover-selector-in-2026-practical-patterns-pitfalls-and-accessible-interactions/ */

.btn {
  transition: transform 0.3s ease-in-out,
              box-shadow 0.3s ease-in-out,
              background-color 0.3s ease-in-out;
  will-change: transform;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background-color: var(--btn-hover-color);
}

.btn:active {
  transform: translateY(1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.btn:focus-visible {
  outline: 2px solid var(--accent-color);
  outline-offset: 2px;
}

/* Accessibility: disable movement for reduced motion */
@media (prefers-reduced-motion: reduce) {
  .btn {
    transition: background-color 0.2s ease-in-out,
                box-shadow 0.2s ease-in-out;
  }

  .btn:hover,
  .btn:active {
    transform: none;
  }
}
```

### Card Hover with Overlay Reveal (CSS)
```css
/* Source: Existing codebase pattern enhanced */

.card {
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease-in-out,
              box-shadow 0.3s ease-in-out;
  will-change: transform;
}

.card::before {
  /* Existing overlay from codebase */
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  z-index: 1;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

.card:hover::before {
  opacity: 1;
}

.card .card-body {
  position: relative;
  z-index: 2;
}

@media (prefers-reduced-motion: reduce) {
  .card {
    transition: box-shadow 0.2s ease-in-out;
  }

  .card:hover {
    transform: translateY(-2px); /* Subtle lift only */
  }
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| AOS (Animate On Scroll) | GSAP ScrollTrigger | 2020-2024 | More powerful API, better performance, pinning/scrub features, ecosystem integration |
| Locomotive Scroll | Lenis | 2022-2024 | Lighter weight (4KB vs 20KB+), simpler API, better performance, more focused library |
| Custom CSS `scroll-behavior: smooth` | Lenis smooth scroll | 2020+ | No momentum control with CSS, limited easing, can't disable on mobile easily |
| jQuery .animate() | GSAP | 2015-2020 | 60fps performance, transforms instead of properties, better mobile support |
| Power2.easeOut (named) | power2.out (lowercase) | GSAP 3.0 (2019) | New naming convention, old still works but lowercase preferred |
| ScrollMagic | GSAP ScrollTrigger | 2020 | ScrollMagic unmaintained, ScrollTrigger official GSAP plugin |
| Individual accessibility checks | gsap.matchMedia() with conditions | GSAP 3.11 (2022) | Automatic cleanup, combined conditions, cleaner code |
| will-change on all animated elements | GSAP handles automatically | GSAP 3.0+ | GSAP optimizes internally, manual will-change often hurts more than helps |

**Deprecated/outdated:**
- **AOS library** - Loaded but never initialized in project, will be removed. GSAP ScrollTrigger replaces functionality with far more power
- **TweenMax/TweenLite/TimelineMax** - Old GSAP 2.x names, now just `gsap` in v3
- **scrollerProxy for Lenis** - Old integration pattern, now use `lenis.on('scroll', ScrollTrigger.update)` with gsap.ticker
- **Power2.easeOut** - Old naming, use `power2.out` (lowercase)
- **Setting will-change manually for GSAP animations** - GSAP handles GPU acceleration internally since v3.0

---

## Open Questions

Things that couldn't be fully resolved:

1. **Existing Swiper carousel integration with Lenis**
   - What we know: Swiper carousels currently use `behavior: 'smooth'` for horizontal scrolling
   - What's unclear: Whether Lenis will interfere with Swiper's internal smooth scrolling or touch events
   - Recommendation: Test Swiper functionality after Lenis implementation. May need to add Swiper containers to Lenis prevent list using `data-lenis-prevent` attribute or prevent function

2. **Nav hover effect specifics**
   - What we know: User gave Claude discretion based on existing nav design
   - What's unclear: Current nav has transitions but unclear what enhancement user expects
   - Recommendation: Planner should inspect current nav transitions (lines 396, 414, 430, 444 in main.css) and propose subtle enhancement (e.g., underline slide, color shift) consistent with existing 0.3s timing

3. **Animation trigger points per section size**
   - What we know: User gave Claude discretion - smaller sections may need different trigger points than large sections
   - What's unclear: Exact threshold for "small" vs "large" section
   - Recommendation: Use 80% trigger (start: 'top 80%') as default, adjust to 90% for sections < 300px tall, 70% for sections > 800px tall (test in planning)

4. **Case study page "simplified animations"**
   - What we know: User wants fewer effects on case study pages to focus on content
   - What's unclear: Which specific effects to remove or simplify
   - Recommendation: Planner should define "simplified" as: no parallax, no stagger (all items at once), no hero entrance sequence, keep fade-in only (no slide), faster durations (200ms max)

5. **Progress bar color/styling**
   - What we know: Should be "subtle, thin, doesn't distract"
   - What's unclear: Exact color - should match existing accent color?
   - Recommendation: Use CSS custom property `var(--accent-color)` from existing codebase, 3px height, no drop shadow

---

## Sources

### Primary (HIGH confidence)
- [Lenis GitHub Repository](https://github.com/darkroomengineering/lenis) - Official documentation, CDN installation, configuration options
- [Lenis Official Site](https://lenis.darkroom.engineering/) - Overview and implementations
- [GSAP ScrollTrigger Documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) - Official API docs, setup instructions
- [GSAP Easing Documentation](https://gsap.com/docs/v3/Eases/) - Official easing reference
- [GSAP matchMedia Documentation](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/) - Accessibility and responsive patterns
- [GSAP Staggers Documentation](https://gsap.com/resources/getting-started/Staggers/) - Official stagger patterns
- [ScrollTrigger Common Mistakes](https://gsap.com/resources/st-mistakes/) - Official pitfalls and solutions
- [GSAP CSS Plugin](https://gsap.com/docs/v3/GSAP/CorePlugins/CSS/) - Transform optimization and will-change handling

### Secondary (MEDIUM confidence)
- [GSAPify ScrollTrigger Guide 2025](https://gsapify.com/gsap-scrolltrigger) - Comprehensive guide with examples, verified against official docs
- [Marmelab GSAP Best Practices](https://marmelab.com/blog/2024/05/30/gsap-in-practice-avoid-the-pitfalls.html) - Real-world patterns and pitfalls
- [TheLinuxCode CSS Hover 2026 Guide](https://thelinuxcode.com/css-hover-selector-in-2026-practical-patterns-pitfalls-and-accessible-interactions/) - Modern accessibility-first hover patterns
- [Medium: Lenis Setup Guide](https://medium.com/@rfrifat6344/how-to-use-lenis-for-smooth-scrolling-d0963691a2fb) - Practical setup walkthrough
- [Medium: Scroll Progress Bar Guide](https://medium.com/@ephreycleophace/build-a-progress-bar-on-scroll-in-vanilla-javascript-5b0cc84b6287) - Vanilla JS implementation patterns
- [GSAP Community Forums - Lenis Integration](https://gsap.com/community/forums/topic/38517-scrolltrigger-and-lenis/) - Integration patterns and troubleshooting
- [GSAP Community Forums - Parallax Hero](https://gsap.com/community/forums/topic/38841-parallax-effect-to-hero/) - Verified parallax implementation
- [GitHub: Lenis Mobile Discussion](https://github.com/darkroomengineering/lenis/discussions/322) - Mobile handling strategies

### Tertiary (LOW confidence - flagged for validation)
- WebSearch results on Lenis mobile performance - anecdotal reports, should verify in testing
- WebSearch results on animation trends - general patterns, not project-specific

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Lenis and GSAP ScrollTrigger are verified industry standards, CDN links confirmed, official documentation reviewed
- Architecture: HIGH - All patterns sourced from official documentation or official community examples, integration pattern verified
- Pitfalls: HIGH - Official GSAP mistakes page reviewed, common issues documented in community forums with verified solutions
- Mobile strategy: HIGH - User decision locked, official Lenis docs confirm approach
- Accessibility: HIGH - gsap.matchMedia() official pattern, prefers-reduced-motion verified
- Micro-interactions: MEDIUM - CSS patterns verified but nav hover specifics deferred to planner discretion
- Swiper integration: MEDIUM - Potential conflict flagged but needs testing to confirm

**Research date:** 2026-02-06
**Valid until:** 2026-03-06 (30 days - stable ecosystem, GSAP 3.x mature, Lenis API stable)

**Notes for planner:**
- User decisions are LOCKED - do not plan alternatives to fade+slide, snappy timing, desktop-only Lenis, ease-in-out easing
- Claude's discretion areas: trigger points (recommend defaults in open questions), slide distances (recommend 50px default, adjust per context), nav hover (inspect existing, propose subtle enhancement)
- All code examples are verified from official sources or official community patterns
- Test Swiper integration after Lenis implementation (open question #1)
- Prioritize accessibility - all animations MUST respect prefers-reduced-motion
