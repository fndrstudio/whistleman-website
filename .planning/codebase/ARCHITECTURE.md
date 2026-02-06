# Architecture

**Analysis Date:** 2026-02-06

## Pattern Overview

**Overall:** Static Multi-Page Application (MPA) with no build system

**Key Characteristics:**
- Pure HTML/CSS/JS with no compilation or bundling
- Each page is a self-contained HTML file with duplicated header/footer/scripts
- Bootstrap 5 grid system for layout, custom CSS for theming
- Apache server handles URL rewriting (removes .html extensions)
- Form submissions handled via third-party APIs (Web3Forms, EmailJS)

## Layers

**Presentation Layer:**
- Purpose: HTML pages that render content directly in browser
- Location: `/*.html` (root) and `/portfolio/*.html`
- Contains: Semantic HTML5, inline SVG icons, Bootstrap grid classes
- Depends on: CSS styles, vendor libraries
- Used by: End users via browser

**Styling Layer:**
- Purpose: Visual presentation and responsive design
- Location: `assets/css/main.css` (single source of truth, ~3,430 lines)
- Contains: CSS variables, component styles, responsive breakpoints
- Depends on: Bootstrap CSS foundation
- Used by: All HTML pages

**Behavior Layer:**
- Purpose: Client-side interactivity and DOM manipulation
- Location: `assets/js/main.js` (~507 lines)
- Contains: FAQ toggles, scroll handlers, popup logic, form validation
- Depends on: Vendor libraries (GLightbox, Swiper, PureCounter)
- Used by: All HTML pages via script tag

**Vendor Layer:**
- Purpose: Third-party libraries for UI components
- Location: `assets/vendor/`
- Contains: Bootstrap, Swiper, GLightbox, PureCounter, php-email-form
- Depends on: Nothing (self-contained)
- Used by: HTML pages via script/link tags

## Data Flow

**Page Load Flow:**

1. Browser requests HTML page (e.g., `/portfolio` -> Apache rewrites to `/portfolio.html`)
2. HTML loads vendor CSS (Bootstrap, GLightbox, Swiper)
3. HTML loads custom CSS (`assets/css/main.css`)
4. Browser renders initial content
5. Vendor JS loads (Bootstrap, GLightbox, Swiper, PureCounter)
6. Custom JS loads (`assets/js/main.js`) and initializes components
7. Preloader is removed, page is interactive

**Contact Form Submission Flow:**

1. User fills form on `contact.html`
2. Form submits via POST to `https://api.web3forms.com/submit`
3. Web3Forms processes and forwards to configured email
4. Success/error response displayed to user

**Newsletter Subscription Flow:**

1. User enters email in footer form
2. JavaScript intercepts submit event
3. EmailJS SDK sends data to configured service
4. Popup confirms subscription

**State Management:**
- No global state management - each page is stateless
- Popup visibility controlled via inline CSS `display` property
- FAQ accordion state via CSS class toggling (`faq-active`)
- Scroll position triggers header visibility changes

## Key Abstractions

**Section Pattern:**
- Purpose: Reusable page sections with consistent structure
- Examples: `index.html` (hero, clients, faq, cards, call-to-action, cards-2, faq-2)
- Pattern: `<section id="name" class="name section [dark-background]">...</section>`

**Card Component:**
- Purpose: Portfolio project display with image and info
- Examples: `index.html:418-437`, `portfolio.html:134-151`
- Pattern: `.card > .image-wrapper > (img + .card-body > h3)`

**Header Pattern:**
- Purpose: Dual-header system for transparency effects
- Examples: `index.html:42-67`
- Pattern: `.desktop-header` (fixed dark) + `.desktop-header-2` (absolute transparent)

**Footer Pattern:**
- Purpose: Consistent site footer across all pages
- Examples: `index.html:962-1017`, duplicated in all other pages
- Pattern: Two-column layout with contact info, newsletter, and CTA

## Entry Points

**Homepage:**
- Location: `index.html`
- Triggers: Direct URL access, logo clicks
- Responsibilities: Brand introduction, service overview, portfolio showcase, testimonials

**Services Page:**
- Location: `services.html`
- Triggers: Navigation link clicks
- Responsibilities: Pricing tiers display, service descriptions

**Portfolio Page:**
- Location: `portfolio.html`
- Triggers: Navigation link clicks
- Responsibilities: Grid display of all case studies

**Case Study Pages:**
- Location: `portfolio/*.html` (7 files)
- Triggers: Portfolio card clicks
- Responsibilities: Individual project detail with image gallery

**Contact Page:**
- Location: `contact.html`
- Triggers: CTA buttons, navigation link
- Responsibilities: Contact form with Web3Forms integration

## Error Handling

**Strategy:** Minimal - relies on browser defaults and third-party API responses

**Patterns:**
- Form validation via HTML5 `required` attributes
- Web3Forms handles email validation server-side
- JavaScript errors logged to console (`console.log('FAILED...', error)`)
- No custom 404 styling (Apache serves plain `404.html`)

## Cross-Cutting Concerns

**Logging:** Console-only (`console.log`) for debugging form failures

**Validation:**
- HTML5 native validation (`required`, `type="email"`)
- Web3Forms client-side script validation
- EmailJS pattern matching

**Authentication:** None - public website only

**Analytics:** Google Analytics via gtag.js (only on `index.html`)

**URL Rewriting:** Apache `.htaccess` removes `.html` extensions

---

*Architecture analysis: 2026-02-06*
