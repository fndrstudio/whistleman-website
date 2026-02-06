# Coding Conventions

**Analysis Date:** 2026-02-06

## Naming Patterns

**Files:**
- HTML pages: lowercase with hyphens (exception: spaces exist in `portfolio/inner circle.html`, `portfolio/l'OUI.html` - inconsistent)
- CSS: lowercase (`main.css`)
- JavaScript: lowercase (`main.js`)
- Images: lowercase with hyphens (`hero-bg-wmm.webp`, `burgernshake-hero-photo.webp`)

**CSS Classes:**
- BEM-lite approach: component-based naming with hyphens
- Examples: `.desktop-header`, `.mobile-nav`, `.btn-get-started`, `.faq-container`, `.cards-portfolio`
- Numbered variants for similar sections: `.cards`, `.cards-2`, `.cards-4`, `.cards-5`
- State classes: `.faq-active`, `.mobile-nav-active`, `.balloon-entrance`, `.balloon-exit`

**CSS Variables:**
- Semantic naming with double-hyphens: `--background-color`, `--accent-color`, `--heading-font`
- Category prefixes: `--nav-color`, `--nav-hover-color`, `--nav-dropdown-background-color`

**JavaScript Functions:**
- camelCase: `toggleScrolled()`, `mobileNavToogle()`, `closePopup()`, `showFormDirectly()`, `ensurePopupVisible()`
- Note: typo in `mobileNavToogle` (should be `mobileNavToggle`)

**JavaScript Variables:**
- camelCase: `selectBody`, `selectHeader`, `mobileNavToggleBtn`, `scrollAmount`
- Constants: camelCase (no UPPER_SNAKE_CASE used)

## Code Style

**Formatting:**
- No automated formatter configured (no `.prettierrc`, `.editorconfig`)
- Indentation: 2 spaces in HTML/CSS, mixed in JS (mostly 2 spaces with some 4-space blocks)
- Line length: No enforced limit

**Linting:**
- No ESLint or other linter configured
- No TypeScript (pure vanilla JavaScript)

**HTML Structure:**
- DOCTYPE with lang="en"
- Meta charset utf-8, viewport meta tag
- Consistent head structure: Google Analytics > meta tags > favicons > fonts > vendor CSS > main CSS
- Body class indicating page type: `class="index-page"`

## Import Organization

**HTML Head Order:**
1. Google Analytics script
2. Meta tags (charset, viewport, title, description, keywords)
3. Favicons
4. Google Fonts preconnect + stylesheet
5. Vendor CSS (Bootstrap, Bootstrap Icons, GLightbox, Swiper)
6. Main CSS

**HTML Footer Scripts Order:**
1. Vendor JS (Bootstrap, Swiper, GLightbox, PureCounter)
2. Main JS

**CSS Import Order:**
- Single file approach - all CSS in `assets/css/main.css`
- Internal organization: Variables > Global > Header > Navigation > Footer > Components > Page-specific

## Error Handling

**Patterns:**
- Guard clauses for missing elements:
  ```javascript
  if (!selectHeader) return;
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }
  ```
- Try/catch for async operations (form submission):
  ```javascript
  try {
    const response = await fetch('https://api.web3forms.com/submit', {...});
    // handle response
  } catch (error) {
    console.error('Network error:', error);
    showError('Network error. Please check your connection and try again.');
  }
  ```
- User-facing error messages via DOM insertion (not alerts)

**Missing Error Handling:**
- Some event listeners assume elements exist without null checks (scroll buttons)
- No global error boundary or error logging service

## Logging

**Framework:** Browser console only

**Patterns:**
- `console.error()` for caught errors:
  ```javascript
  console.error('Form submission error:', result.message);
  console.error('Network error:', error);
  ```
- No `console.log()` debug statements in production code
- No structured logging or log levels

## Comments

**When to Comment:**
- Section headers in CSS (block comments with dashes):
  ```css
  /*--------------------------------------------------------------
  # Global Header
  --------------------------------------------------------------*/
  ```
- JSDoc-style comments for utility functions:
  ```javascript
  /**
   * Throttle utility - limits function execution to once per specified interval
   * Used for performance optimization on scroll/resize handlers
   */
  ```
- Inline comments for non-obvious behavior

**CSS Comment Style:**
- Section dividers with `#` prefix: `# Font & Color Variables`, `# Global Footer`
- Inline explanations in `/* comment */` format

**JavaScript Comment Style:**
- Block comments for function descriptions
- Single-line `//` for inline explanations
- Commented-out code present (should be removed):
  ```javascript
  // document.addEventListener('click', function(event) { ... });
  ```

## Function Design

**Size:**
- Most functions under 30 lines
- Exception: Form submission handler (~80 lines) - could be split

**Parameters:**
- Minimal parameters (most functions rely on closure scope or DOM queries)
- Event handlers receive event object: `function(e)` or `function(event)`

**Return Values:**
- No explicit returns for side-effect functions
- Guard clause returns: `if (!selectHeader) return;`

## Module Design

**Exports:**
- None - no ES modules, no CommonJS
- All code in global scope or IIFE

**IIFE Pattern:**
- Main code wrapped in IIFE with `"use strict"`:
  ```javascript
  (function() {
    "use strict";
    // code here
  })();
  ```
- Additional DOMContentLoaded listeners outside IIFE (inconsistent)

**Global Dependencies:**
- Vendor libraries assumed global: `GLightbox`, `PureCounter`
- No explicit dependency declaration

## CSS Patterns

**Layout:**
- Flexbox for navigation and card layouts
- CSS Grid for form layouts and FAQ content reveal
- Bootstrap grid for page structure (`col-xl-5`, `col-lg-4`)

**Responsive Design:**
- Mobile-first approach in some sections
- Common breakpoints: 768px, 991.5px, 1100px, 1199px, 1200px, 1800px
- Duplicate media queries at same breakpoints (consolidation opportunity)

**CSS Nesting:**
- Modern CSS nesting used (not SCSS):
  ```css
  .footer {
    .container { ... }
    .footer-left {
      .logo-text-footer { ... }
    }
  }
  ```

**Vendor Prefix:**
- None manually added (relies on browser support)

**Units:**
- Mix of: px, rem, %, vw, vh
- Inconsistent margins: `1%`, `50px`, `90px`, `100px` across sections

## HTML Patterns

**Semantic Elements:**
- `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- Section IDs for navigation: `id="hero"`, `id="hero-contact"`

**Class Usage:**
- Multiple classes per element common: `class="hero section dark-background"`
- Bootstrap utility classes: `d-flex`, `col-xl-5`, `align-items-center`

**Data Attributes:**
- Used for component configuration: `data-target="stats-1"`
- Vendor data attributes: `data-bs-toggle` (Bootstrap)

**Inline Styles:**
- Present but discouraged: `style="font-family: 'bree serif', sans-serif; font-weight: 500;"`
- Should be moved to CSS classes

## Security Patterns

**XSS Prevention:**
- Safe DOM manipulation using `textContent` instead of `innerHTML`:
  ```javascript
  const text = document.createElement('span');
  text.textContent = message;  // Safe: textContent escapes HTML
  ```
- One exception: Dynamic keyframe injection uses `innerHTML` (low risk - not user input)

**External Resources:**
- Google Fonts over HTTPS
- Web3Forms API over HTTPS
- CDN resources should have integrity hashes (missing)

---

*Convention analysis: 2026-02-06*
