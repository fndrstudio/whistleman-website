# Architecture

**Analysis Date:** 2026-02-05

## Pattern Overview

**Overall:** Static Multi-Page Website (No Build System)

**Key Characteristics:**
- Pure HTML/CSS/JS with no framework or build pipeline
- Component patterns achieved through repeated HTML blocks across pages
- SCSS for styling with manual compilation via VS Code extension
- Server-side URL rewriting via Apache `.htaccess`
- Forms handled by third-party APIs (Web3Forms, EmailJS)

## Layers

**Presentation Layer (HTML):**
- Purpose: Page structure and content markup
- Location: `/*.html` (root) and `/portfolio/*.html` (case studies)
- Contains: Semantic HTML5 with Bootstrap grid classes, inline SVG icons
- Depends on: CSS, JS, vendor libraries
- Used by: Browser rendering

**Styling Layer (SCSS/CSS):**
- Purpose: Visual styling and responsive design
- Location: `assets/scss/` (source), `assets/css/main.css` (compiled)
- Contains: Variables, layouts, section-specific styles
- Depends on: CSS variables defined in `_variables.scss`
- Used by: All HTML pages

**Behavior Layer (JavaScript):**
- Purpose: Interactive functionality and third-party integrations
- Location: `assets/js/main.js`
- Contains: DOM event handlers, popup logic, scroll effects, form handling
- Depends on: Vendor libraries (Bootstrap, GLightbox, PureCounter, etc.)
- Used by: All HTML pages

**Static Assets:**
- Purpose: Media content and third-party libraries
- Location: `assets/img/`, `assets/vendor copy/`
- Contains: Images (JPG, PNG, WebP), vendor CSS/JS bundles
- Depends on: Nothing
- Used by: HTML pages, CSS background-images

## Data Flow

**Page Request Flow:**

1. Browser requests URL (e.g., `/services`)
2. Apache `.htaccess` rewrites to `/services.html`
3. HTML page loads, references CSS and vendor assets
4. Browser parses HTML, loads `assets/css/main.css`
5. JavaScript initializes on `DOMContentLoaded` and `window.load`

**Contact Form Flow:**

1. User fills form on `contact.html`
2. Form submits to `https://api.web3forms.com/submit` via POST
3. Web3Forms API processes and forwards to configured email
4. No server-side code involved

**Newsletter Form Flow:**

1. User enters email in footer newsletter form
2. JavaScript intercepts submit event
3. EmailJS SDK sends form data via `emailjs.sendForm()`
4. Success popup displays confirmation

**State Management:**
- No client-side state management library
- DOM state managed through class toggles (`.active`, `.faq-active`, `.scrolled`)
- Popup visibility via inline `style.display` manipulation

## Key Abstractions

**Page Templates:**
- Purpose: Consistent page structure across site
- Examples: All HTML files share identical `<head>`, header, mobile-nav, and footer blocks
- Pattern: Copy-paste template (no templating engine)

**Section Components:**
- Purpose: Reusable visual blocks (hero, cards, FAQ, CTA)
- Examples: `#hero`, `#cards`, `#faq`, `#call-to-action`, `#cards-2`, `#faq-2`
- Pattern: HTML section elements with matching SCSS files

**Card Component:**
- Purpose: Portfolio item display with image, tags, title
- Examples: `index.html` lines 419-559, repeated across pages
- Pattern: Bootstrap grid columns with nested `.card > .image-wrapper > .usp-faq + img + .card-body`

**Header Components:**
- Purpose: Desktop and mobile navigation
- Examples: `.desktop-header`, `.desktop-header-2`, `.mobile-nav`, `.mobile-logo`
- Pattern: Two desktop headers (one transparent, one solid on scroll), fixed mobile bottom nav

## Entry Points

**Homepage:**
- Location: `index.html`
- Triggers: Direct visit or root URL
- Responsibilities: Hero, client logos, service overview, portfolio preview, testimonials, FAQ

**Services Page:**
- Location: `services.html`
- Triggers: Nav link
- Responsibilities: Pricing tiers, service descriptions, portfolio preview

**Portfolio Listing:**
- Location: `portfolio.html`
- Triggers: Nav link
- Responsibilities: Grid of all case study cards

**Case Study Pages:**
- Location: `portfolio/*.html` (7 files)
- Triggers: Card clicks from portfolio/homepage
- Responsibilities: Individual project details, image galleries, related work

**Contact Page:**
- Location: `contact.html`
- Triggers: CTA buttons, nav link
- Responsibilities: Contact form, company info

**JavaScript Entry:**
- Location: `assets/js/main.js`
- Triggers: Script load at end of `<body>`
- Responsibilities: All interactive behavior initialization

## Error Handling

**Strategy:** Minimal - relies on browser defaults and third-party services

**Patterns:**
- Form validation via HTML5 `required` attributes
- JavaScript try/catch for Web3Forms API calls in popup form
- Console logging for EmailJS failures (`console.log('FAILED...', error)`)
- 404 errors handled by Apache via `ErrorDocument 404 /404.html`

## Cross-Cutting Concerns

**Logging:** Console-only (`console.log` for email failures)

**Validation:** HTML5 form validation (`required`, `type="email"`)

**Authentication:** None (static site, no user accounts)

**Analytics:** Google Analytics 4 via gtag.js (`G-Q33X4CQ5KZ`) on homepage only

**URL Handling:** Apache mod_rewrite removes `.html` extensions

---

*Architecture analysis: 2026-02-05*
