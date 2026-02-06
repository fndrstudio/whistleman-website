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

  // ==========================================================================
  // Hero Entrance Sequence
  // ==========================================================================
  // Per user decision: dramatic sequence - title, subtitle, CTA animate in sequence
  // Only on pages with .hero section

  const heroSection = document.querySelector('.hero');

  if (heroSection) {
    const heroTitle = heroSection.querySelector('h1');
    const heroSubtitle = heroSection.querySelector('blockquote, .subtitle, p');
    const heroCTA = heroSection.querySelector('.btn-get-started, .d-flex, .cta-buttons');
    const heroBackground = heroSection.querySelector('img');

    // Set initial states to prevent FOUC (use fromTo pattern per research)
    if (!prefersReducedMotion) {
      if (heroTitle) gsap.set(heroTitle, { autoAlpha: 0, y: 50 });
      if (heroSubtitle) gsap.set(heroSubtitle, { autoAlpha: 0, y: 30 });
      if (heroCTA) gsap.set(heroCTA, { autoAlpha: 0, y: 20 });
    }

    // Create entrance timeline
    const heroTl = gsap.timeline({
      delay: 0.3, // Small delay for page to settle
      defaults: {
        ease: window.WMAnimations.config.ease,
        duration: prefersReducedMotion ? 0.1 : 0.5
      }
    });

    if (prefersReducedMotion) {
      // Reduced motion: instant fade, no movement
      if (heroTitle) heroTl.to(heroTitle, { autoAlpha: 1, duration: 0.1 });
      if (heroSubtitle) heroTl.to(heroSubtitle, { autoAlpha: 1, duration: 0.1 }, '-=0.05');
      if (heroCTA) heroTl.to(heroCTA, { autoAlpha: 1, duration: 0.1 }, '-=0.05');
    } else {
      // Full animation: fade + slide sequence
      if (heroTitle) {
        heroTl.to(heroTitle, {
          autoAlpha: 1,
          y: 0,
          duration: 0.6
        });
      }
      if (heroSubtitle) {
        heroTl.to(heroSubtitle, {
          autoAlpha: 1,
          y: 0,
          duration: 0.5
        }, '-=0.3'); // Overlap with previous
      }
      if (heroCTA) {
        heroTl.to(heroCTA, {
          autoAlpha: 1,
          y: 0,
          duration: 0.4
        }, '-=0.2');
      }
    }

    // ==========================================================================
    // Hero Parallax Background
    // ==========================================================================
    // Per user decision: hero background moves slower than content
    // Only apply parallax on desktop and when not reduced motion

    if (heroBackground && !isMobile && !isTouch && !prefersReducedMotion) {
      gsap.to(heroBackground, {
        yPercent: -20, // Background moves 20% relative to scroll
        ease: 'none',
        scrollTrigger: {
          trigger: heroSection,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5 // Smooth scrub with slight delay
        }
      });
    }
  }

  // ==========================================================================
  // Section Reveal Animations
  // ==========================================================================
  // Per user decision: fade + slide up, cascade stagger (50-100ms), play once
  // Animation trigger: 80% visible (Claude's discretion default)

  // Sections to animate - exclude hero (has its own entrance)
  const sections = document.querySelectorAll('section:not(.hero):not(#hero)');

  sections.forEach(section => {
    // Determine if this is a case study page (simplified animations per user decision)
    const isCaseStudy = document.body.classList.contains('portfolio-details-page') ||
                        window.location.pathname.includes('/portfolio/');

    // Find animatable children within the section
    // Cards, list items, columns, content blocks
    const animatableChildren = section.querySelectorAll(
      '.card, .col-lg-4, .col-lg-6, .col-md-6, .testimonial-item, ' +
      '.faq-item, .service-item, .team-member, .stat-item, ' +
      '.info-item, .contact-item, li, article'
    );

    // Determine animation parameters based on section/page context
    const slideDistance = prefersReducedMotion ? 0 : (isCaseStudy ? 0 : 50);
    const duration = prefersReducedMotion ? 0.1 : (isCaseStudy ? 0.2 : 0.35);
    const staggerAmount = prefersReducedMotion ? 0 : (isCaseStudy ? 0 : 0.08);

    // Determine trigger point based on section height (Claude's discretion)
    const sectionHeight = section.offsetHeight;
    let triggerPoint = '80%'; // Default
    if (sectionHeight < 300) {
      triggerPoint = '90%'; // Small sections - trigger earlier
    } else if (sectionHeight > 800) {
      triggerPoint = '70%'; // Large sections - trigger later
    }

    if (animatableChildren.length > 0 && animatableChildren.length <= 20) {
      // Stagger children
      gsap.set(animatableChildren, {
        autoAlpha: 0,
        y: slideDistance
      });

      gsap.to(animatableChildren, {
        autoAlpha: 1,
        y: 0,
        duration: duration,
        ease: window.WMAnimations.config.ease,
        stagger: {
          amount: staggerAmount,
          from: 'start'
        },
        scrollTrigger: {
          trigger: section,
          start: `top ${triggerPoint}`,
          toggleActions: 'play none none none',
          once: true // Play once only - per user decision
        }
      });
    } else {
      // No suitable children or too many - animate section itself
      gsap.set(section, {
        autoAlpha: 0,
        y: slideDistance
      });

      gsap.to(section, {
        autoAlpha: 1,
        y: 0,
        duration: duration,
        ease: window.WMAnimations.config.ease,
        scrollTrigger: {
          trigger: section,
          start: `top ${triggerPoint}`,
          toggleActions: 'play none none none',
          once: true
        }
      });
    }
  });

  // ==========================================================================
  // Card Grid Specific Animations
  // ==========================================================================
  // Portfolio cards in horizontal scroll containers
  const cardContainers = document.querySelectorAll('.cards .row, .cards-portfolio .row');

  cardContainers.forEach(container => {
    const cards = container.querySelectorAll('.card, .col-lg-4');

    if (cards.length > 0) {
      const slideDistance = prefersReducedMotion ? 0 : 50;
      const duration = prefersReducedMotion ? 0.1 : 0.4;

      gsap.set(cards, {
        autoAlpha: 0,
        y: slideDistance
      });

      gsap.to(cards, {
        autoAlpha: 1,
        y: 0,
        duration: duration,
        ease: window.WMAnimations.config.ease,
        stagger: {
          amount: prefersReducedMotion ? 0 : 0.1, // 100ms total across cards
          from: 'start'
        },
        scrollTrigger: {
          trigger: container,
          start: 'top 75%',
          toggleActions: 'play none none none',
          once: true
        }
      });
    }
  });

})();
