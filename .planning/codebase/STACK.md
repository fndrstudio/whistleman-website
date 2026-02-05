# Technology Stack

**Analysis Date:** 2025-02-05

## Languages

**Primary:**
- HTML5 - All page content (`index.html`, `services.html`, `portfolio.html`, `contact.html`, `portfolio/*.html`)
- CSS3 - Compiled from SCSS (`assets/css/main.css`)
- JavaScript (ES6) - Vanilla JS (`assets/js/main.js`)

**Secondary:**
- SCSS - CSS preprocessor source files (`assets/scss/`)

## Runtime

**Environment:**
- Browser-based (no server-side runtime)
- Static file hosting

**Package Manager:**
- None - No npm, yarn, or package.json
- Vendor libraries bundled directly in `assets/vendor copy/`

## Frameworks

**Core:**
- Bootstrap 5.3.3 - CSS framework and grid system (`assets/vendor copy/bootstrap/`)

**UI Libraries:**
- Swiper 11.1.12 - Touch slider/carousel (`assets/vendor copy/swiper/`)
- GLightbox - Image lightbox (`assets/vendor copy/glightbox/`)
- AOS - Animate on scroll (CSS loaded but JS not initialized in main.js) (`assets/vendor copy/aos/`)
- PureCounter 1.5.0 - Number counter animations (`assets/vendor copy/purecounter/`)
- Bootstrap Icons - Icon library (`assets/vendor copy/bootstrap-icons/`)

**Unused (can be removed):**
- Isotope Layout (`assets/vendor copy/isotope-layout/`) - Loaded but never used
- ImagesLoaded (`assets/vendor copy/imagesloaded/`) - Loaded but never used

## Key Dependencies

**Critical:**
- Bootstrap 5.3.3 - Grid, utilities, responsive design
- Swiper 11.1.12 - Portfolio carousels
- GLightbox - Image popup viewing

**Infrastructure:**
- Google Fonts (Montserrat, Poppins, Bree Serif) - External CDN
- Font Awesome - Icons in popup form (loaded via CDN in HTML)

## Configuration

**Environment:**
- No environment variables
- No `.env` files
- API keys hardcoded in HTML (Web3Forms access key, EmailJS public key, Google Analytics ID)

**Build:**
- SCSS Compilation: VS Code "Easy Compile" extension
  - Entry: `assets/scss/main.scss`
  - Output: `assets/css/main.css`
  - Comment directive: `// out: ../css/main.css`

**Server:**
- Apache `.htaccess` configuration
  - Removes `.html` extensions from URLs
  - Custom 404 page routing

## Platform Requirements

**Development:**
- Any static file server
- VS Code with Easy Compile extension for SCSS changes
- No Node.js required

**Production:**
- Apache web server (for `.htaccess` support)
- Hosted at: https://whistlemanmedia.nl

## File Sizes

| Asset | Size |
|-------|------|
| Images (`assets/img/`) | 219 MB |
| Vendor active (`assets/vendor copy/`) | 10 MB |
| Vendor duplicate (`assets/vendor/`) | 9.9 MB (DELETE) |
| CSS (`assets/css/main.css`) | 3,430 lines |
| JS (`assets/js/main.js`) | 480 lines |

## SCSS Structure

```
assets/scss/
├── main.scss           # Entry point with imports
├── _variables.scss     # CSS custom properties
├── _sections.scss      # Section imports
├── layouts/
│   ├── _general.scss
│   ├── _header.scss
│   ├── _navmenu.scss
│   ├── _footer.scss
│   ├── _preloader.scss
│   └── _page-titles.scss
└── sections/           # Component styles
```

## CSS Custom Properties

Defined in `assets/scss/_variables.scss`:

```css
:root {
  --default-font: "Bree Serif", system-ui, ...;
  --heading-font: "Montserrat", sans-serif;
  --nav-font: "Poppins", sans-serif;
  --background-color: #faf9f5;
  --default-color: #212529;
  --heading-color: #2d465e;
  --accent-color: #ff5733;
  --surface-color: #ffffff;
  --contrast-color: #ffffff;
}
```

---

*Stack analysis: 2025-02-05*
