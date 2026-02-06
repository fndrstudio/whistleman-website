# Technology Stack

**Analysis Date:** 2026-02-06

## Languages

**Primary:**
- HTML5 - All page structure (`index.html`, `services.html`, `portfolio.html`, `contact.html`, `portfolio/*.html`)
- CSS3 - All styling (`assets/css/main.css` - 3,430 lines)
- JavaScript (ES6+) - All interactivity (`assets/js/main.js` - 507 lines)

**Secondary:**
- PHP - Form processing (`assets/vendor/php-email-form/php-email-form.php`) - NOT USED, site uses Web3Forms API instead

## Runtime

**Environment:**
- Browser-based execution (no server-side runtime)
- Apache web server (production)

**Package Manager:**
- None - no package.json, no npm, no build tools
- All dependencies are vendored or loaded via CDN

## Frameworks

**Core:**
- Bootstrap 5 - CSS framework and component library
  - Location: `assets/vendor/bootstrap/`
  - Full distribution (CSS + JS bundle)

**Carousels/Sliders:**
- Swiper - Touch slider library
  - Location: `assets/vendor/swiper/`
  - Version: bundled minified build

**Lightbox:**
- GLightbox - Image lightbox
  - Location: `assets/vendor/glightbox/`
  - Initialized in `assets/js/main.js` (line 160)

**Animations:**
- PureCounter - Number counter animations
  - Location: `assets/vendor/purecounter/`
  - Initialized in `assets/js/main.js` (line 34)

**Build/Dev:**
- None - static site with no build process
- Serve with any static server

## Key Dependencies

**Bundled (in `assets/vendor/`):**
- Bootstrap 5 (CSS framework)
- Bootstrap Icons (icon font)
- Swiper (carousel/slider)
- GLightbox (lightbox)
- PureCounter (number animations)
- php-email-form (form validation helper - not actively used)

**CDN-loaded:**
- EmailJS (@emailjs/browser@4) - Newsletter form
  - CDN: `https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js`
- Web3Forms client script
  - CDN: `https://web3forms.com/client/script.js`
- Google Fonts (Montserrat, Poppins, Bree Serif)
  - CDN: `https://fonts.googleapis.com/css2?family=...`

## Configuration

**Environment:**
- No environment variables required
- All API keys are hardcoded in HTML (EmailJS, Web3Forms, Google Analytics)
- Credentials in use:
  - EmailJS public key: `xSt4A1yusGFKnSwVo`
  - EmailJS service: `service_g99gf2a`
  - EmailJS template: `template_fno3r68`
  - Web3Forms access key: `d6b5486e-be40-4bae-a530-154b913012d2`
  - Google Analytics: `G-Q33X4CQ5KZ`

**Build:**
- No build configuration
- CSS variables defined in `assets/css/main.css` (lines 8-32)
- Three font families loaded: Bree Serif, Montserrat, Poppins

**Server:**
- Apache configuration in `.htaccess`
  - URL rewriting to remove `.html` extensions
  - Custom 404 page (`/404.html`)

## CSS Architecture

**Variables (`:root` scope):**
```css
/* Fonts */
--default-font: "Bree Serif", system-ui, ...
--heading-font: "Montserrat", sans-serif
--nav-font: "Poppins", sans-serif

/* Colors */
--background-color: #faf9f5
--default-color: #212529
--heading-color: #2d465e
--accent-color: #ff5733
--surface-color: #ffffff
--contrast-color: #ffffff
```

**Theme Classes:**
- `.light-background` - White background variant
- `.dark-background` - Dark theme override

## Platform Requirements

**Development:**
- Any static file server (Python http.server, VS Code Live Server, etc.)
- No Node.js or build tools required

**Production:**
- Apache web server with mod_rewrite enabled
- HTTPS (live at whistlemanmedia.nl)

## File Size Summary

**Code Files:**
- `assets/css/main.css`: ~3,430 lines
- `assets/js/main.js`: ~507 lines
- 11 HTML files (4 root + 7 portfolio case studies)

**Vendor Dependencies:**
- `assets/vendor/`: Contains Bootstrap, Swiper, GLightbox, PureCounter, Bootstrap Icons

---

*Stack analysis: 2026-02-06*
