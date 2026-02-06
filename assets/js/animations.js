/**
 * Whistleman Media - Animation System
 * Lenis smooth scroll (desktop only) + GSAP ScrollTrigger
 *
 * User decisions (locked):
 * - Desktop: Butter-smooth scroll with momentum
 * - Mobile: Native scroll (no Lenis)
 * - Progress bar at top
 * - Reduced motion: Simplify animations, keep subtle fades
 */
(function() {
  'use strict';

  // ==========================================================================
  // Device Detection
  // ==========================================================================
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ==========================================================================
  // Lenis Smooth Scroll (Desktop Only)
  // ==========================================================================
  let lenis = null;

  if (!isMobile && !isTouch) {
    lenis = new Lenis({
      duration: 1.2,                // Scroll duration - per user decision: short coast
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth easing
      lerp: 0.1,                    // Linear interpolation - lower = smoother
      wheelMultiplier: 1,           // Mouse wheel sensitivity
      touchMultiplier: 0,           // Disable touch smooth scroll
      infinite: false,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      autoResize: true
    });

    // Expose globally for anchor links
    window.lenis = lenis;

    // Always start at top - per user decision: no scroll position restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }

  // ==========================================================================
  // GSAP + ScrollTrigger Setup
  // ==========================================================================
  gsap.registerPlugin(ScrollTrigger);

  // Integrate Lenis with ScrollTrigger (critical for sync - per research)
  if (lenis) {
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0); // Required for Lenis sync
  }

  // ==========================================================================
  // Scroll Progress Bar
  // ==========================================================================
  const progressBar = document.querySelector('.scroll-progress');

  if (progressBar) {
    // Use scaleX for better performance than width
    gsap.set(progressBar, { scaleX: 0, transformOrigin: 'left' });

    gsap.to(progressBar, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.1
      }
    });
  }

  // ==========================================================================
  // Anchor Link Smooth Scroll
  // ==========================================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '#0') return; // Skip empty anchors

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      if (lenis) {
        // Desktop with Lenis - quick snap with easing per user decision
        lenis.scrollTo(target, {
          duration: 1.0,
          easing: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t, // ease-in-out
          offset: 0
        });
      } else {
        // Mobile/touch - native smooth scroll
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ==========================================================================
  // Accessibility: matchMedia Setup
  // ==========================================================================
  // This will be used by Plan 02 for section animations
  // Exported pattern for consistency
  window.WMAnimations = {
    lenis: lenis,
    isMobile: isMobile,
    isTouch: isTouch,
    prefersReducedMotion: prefersReducedMotion,
    // Animation config per user decisions
    config: {
      duration: prefersReducedMotion ? 0.1 : 0.3,
      staggerAmount: prefersReducedMotion ? 0 : 0.08, // 80ms between items
      slideDistance: 50,
      ease: 'power2.inOut'
    }
  };

})();
