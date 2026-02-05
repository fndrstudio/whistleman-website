# Coding Conventions

**Analysis Date:** 2025-02-05

## Naming Patterns

**Files:**
- HTML pages: lowercase with hyphens or spaces (inconsistent): `index.html`, `portfolio.html`, `inner circle.html`, `l'OUI.html`
- SCSS partials: underscore prefix with kebab-case: `_variables.scss`, `_general.scss`, `_call-to-action.scss`
- SCSS directories: lowercase: `layouts/`, `sections/`
- JavaScript: lowercase: `main.js`
- Images: mixed case with spaces (problematic): `inner circle - case.jpg`, `burger n shakeklogo.png`

**CSS Classes:**
- BEM-like structure NOT used
- Descriptive lowercase with hyphens: `.hero-section`, `.btn-get-started`, `.faq-content`
- Bootstrap utility classes mixed with custom: `.d-flex`, `.col-lg-4`, `.align-items-center`
- Component classes: `.card`, `.testimonial-item`, `.footer-left`

**JavaScript Functions:**
- camelCase: `toggleScrolled()`, `mobileNavToogle()`, `closePopup()`, `showFormDirectly()`
- Note: typo in `mobileNavToogle` (should be `mobileNavToggle`)

**CSS Variables:**
- Semantic naming with double-hyphen prefix: `--background-color`, `--accent-color`, `--heading-font`
- Scoped by purpose: `--nav-color`, `--nav-hover-color`, `--nav-dropdown-background-color`

## Code Style

**Formatting:**
- Tool: VS Code Easy Compile (for SCSS only)
- No Prettier, ESLint, or other formatters configured
- Indentation: 2 spaces (SCSS), mixed (HTML/JS)
- HTML attributes: single line or multi-line (inconsistent)

**Linting:**
- None configured
- No `.eslintrc`, `.prettierrc`, or similar files

**SCSS Structure:**
```scss
// main: ../main.scss  <- Comment indicates compilation target
/*--------------------------------------------------------------
# Section Name
--------------------------------------------------------------*/
.component {
  property: value;

  .child {
    property: value;
  }

  @media (max-width: 768px) {
    property: value;
  }
}
```

## Import Organization

**SCSS Order (`assets/scss/main.scss`):**
1. Variables: `@import './_variables.scss';`
2. Layouts: `@import './layouts/_general.scss';` etc.
3. Sections: via `@import './_sections.scss';` barrel file

**HTML Asset Order:**
1. Google Analytics (in head)
2. Preconnect for fonts
3. Google Fonts stylesheet
4. Vendor CSS (Bootstrap first, then icons, AOS, GLightbox, Swiper)
5. Main CSS file
6. Content
7. Vendor JS (Bootstrap, validation, AOS, GLightbox, imagesloaded, isotope, Swiper, PureCounter)
8. Main JS file
9. External services (EmailJS)
10. Inline scripts

**Vendor Path:**
- Use `assets/vendor copy/` (note space in directory name - legacy issue)
- NOT `assets/vendor/` (unused duplicate)

## Error Handling

**JavaScript Patterns:**
- Guard clauses for missing elements:
```javascript
if (!selectHeader) return;
if (mobileNavToggleBtn) {
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
}
```
- Try/catch for async operations:
```javascript
try {
  const response = await fetch('https://api.web3forms.com/submit', {...});
  // handle response
} catch (error) {
  console.error('Network error:', error);
  showError('Network error. Please check your connection and try again.');
}
```

**Form Validation:**
- Manual validation before submission
- Email regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Visual error feedback via dynamically created DOM elements

## Logging

**Framework:** console (native browser)

**Patterns:**
- Error logging: `console.error('Form submission error:', result.message);`
- Debug logging: `console.log('FAILED...', error);`
- No structured logging or log levels
- No external logging service

## Comments

**SCSS Comments:**
- Section headers use block comments:
```scss
/*--------------------------------------------------------------
# Section Name
--------------------------------------------------------------*/
```
- Inline comments for clarification: `/* For Chrome, Safari, and Edge */`

**JavaScript Comments:**
- JSDoc-style block comments for function descriptions:
```javascript
/**
 * Apply .scrolled class to the body as the page is scrolled down
 */
function toggleScrolled() {...}
```
- Single-line comments for inline notes: `// Set the scroll amount`
- Commented-out code present (should be removed)

**HTML Comments:**
- End-section markers: `<!-- /Hero Section -->`
- Commented-out alternatives: `<!-- <a href="#">Home</a> -->`

## Function Design

**Size:**
- Functions range from 3-50 lines (some too long)
- Popup handling code is ~400 lines in single DOMContentLoaded listener (should be modularized)

**Parameters:**
- Minimal parameters, heavy use of DOM queries within functions
- Event objects passed through: `function(e)` or `function(event)`

**Return Values:**
- Early returns for guard clauses
- No explicit return values for most functions (void/undefined)

## Module Design

**Exports:**
- Not applicable (no ES modules, no bundler)
- All code in IIFE: `(function() { "use strict"; ... })();`

**File Structure:**
- Single JS file (`assets/js/main.js`) contains all functionality
- No code splitting or lazy loading of JS
- SCSS properly modularized into partials

## CSS Specificity Practices

**Use CSS Variables:**
```scss
color: var(--default-color);
background-color: var(--background-color);
font-family: var(--heading-font);
```

**Theme Overrides via Classes:**
```scss
.dark-background {
  --background-color: #060606;
  --default-color: #ffffff;
}
```

**Avoid `!important` except responsiveness:**
```scss
@media (max-width: 640px) {
  padding: 390px 0 0px 0 !important;
}
```

## Inline Styles

**Current State:** Heavily used in HTML (anti-pattern)
```html
<h3 style="font-family: 'bree serif', sans-serif; font-weight: 500;">
<div style="position: absolute; z-index: 2; top: -15px; right: -15px; padding: 12px; border-radius:50%; background-color: #ff5733; border: 3px solid white">
```

**Recommendation:** Move to CSS classes

## Responsive Design

**Breakpoints:**
- 1200px: Desktop nav visible
- 1199px: Mobile nav
- 768px: Tablet adjustments
- 640px: Mobile phone

**Pattern:**
```scss
// Base styles (mobile-first NOT used - desktop-first)
.component {
  // Desktop styles
}

@media (max-width: 768px) {
  .component {
    // Tablet/mobile overrides
  }
}
```

---

*Convention analysis: 2025-02-05*
