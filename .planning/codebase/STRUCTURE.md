# Codebase Structure

**Analysis Date:** 2026-02-06

## Directory Layout

```
wm26backup-2/
├── index.html              # Homepage
├── services.html           # Services/pricing page
├── portfolio.html          # Portfolio listing page
├── contact.html            # Contact form page
├── .htaccess               # Apache URL rewriting rules
├── CLAUDE.md               # AI assistant instructions
├── portfolio/              # Case study detail pages
│   ├── burgernshake.html
│   ├── oeuf.html
│   ├── locals.html
│   ├── linguini.html
│   ├── pazzi.html
│   ├── inner circle.html   # Note: space in filename
│   └── l'OUI.html          # Note: apostrophe in filename
├── assets/
│   ├── css/
│   │   └── main.css        # All custom styles (3,430 lines)
│   ├── js/
│   │   └── main.js         # All custom JavaScript (507 lines)
│   ├── img/                # All images (~239MB)
│   │   ├── cases/          # Case study images by project
│   │   ├── clients/        # Client logos
│   │   ├── services/       # Service page images
│   │   └── Logos/          # Additional logo variants
│   └── vendor/             # Third-party libraries
│       ├── bootstrap/
│       ├── bootstrap-icons/
│       ├── glightbox/
│       ├── swiper/
│       ├── purecounter/
│       └── php-email-form/
└── .planning/              # GSD planning documentation
    ├── codebase/           # Architecture documentation
    ├── phases/             # Implementation phase records
    └── *.md                # Various planning docs
```

## Directory Purposes

**Root (`/`):**
- Purpose: Main site pages
- Contains: Top-level HTML pages, Apache config, project documentation
- Key files: `index.html`, `services.html`, `portfolio.html`, `contact.html`, `.htaccess`

**`/portfolio/`:**
- Purpose: Individual case study detail pages
- Contains: One HTML file per client project (7 total)
- Key files: `burgernshake.html`, `oeuf.html`, `locals.html`
- Note: Uses `../assets/` relative paths for all resources

**`/assets/css/`:**
- Purpose: Custom stylesheet storage
- Contains: Single CSS file with all custom styles
- Key files: `main.css` (3,430 lines, single source of truth)

**`/assets/js/`:**
- Purpose: Custom JavaScript code
- Contains: Single JS file with all interactivity
- Key files: `main.js` (507 lines)

**`/assets/img/`:**
- Purpose: All website imagery
- Contains: Hero images, case photos, client logos, icons
- Subdirectories: `cases/`, `clients/`, `services/`, `Logos/`
- Note: Very large (~239MB total, many oversized originals)

**`/assets/vendor/`:**
- Purpose: Third-party library bundles
- Contains: Bootstrap 5, Swiper, GLightbox, PureCounter, Bootstrap Icons
- Note: Minified versions used in production

**`/.planning/`:**
- Purpose: GSD methodology documentation and tracking
- Contains: Codebase docs, phase plans, verification records
- Generated: Yes (by GSD tools)
- Committed: Yes

## Key File Locations

**Entry Points:**
- `index.html`: Homepage with hero, services overview, portfolio cards
- `services.html`: Pricing tiers and service descriptions
- `portfolio.html`: Full portfolio grid
- `contact.html`: Contact form with Web3Forms

**Configuration:**
- `.htaccess`: Apache rewrite rules (removes .html from URLs)
- `CLAUDE.md`: AI assistant project context

**Core Logic:**
- `assets/js/main.js`: All JavaScript functionality
  - Lines 1-17: Throttle utility
  - Lines 22-31: Scroll header behavior
  - Lines 33-35: PureCounter initialization
  - Lines 38-56: Stats toggle (Before/After)
  - Lines 58-107: Card scroll buttons (duplicated logic)
  - Lines 112-145: Mobile nav toggle
  - Lines 147-171: Preloader, lightbox, FAQ toggles
  - Lines 175-507: Popup form handling (download form)

**Styling:**
- `assets/css/main.css`: All CSS
  - Lines 8-32: CSS custom properties (`:root`)
  - Lines 36-47: Color preset classes
  - Lines 57-86: Base typography
  - Lines 91-256: Header/navigation styles
  - Lines 278-500: Desktop/mobile navmenu
  - Search for: `.hero`, `.cards`, `.faq`, `.footer` for section styles

## Naming Conventions

**HTML Files:**
- Pattern: `kebab-case.html` or `camelCase.html` (inconsistent)
- Examples: `burgernshake.html`, `services.html`
- Exceptions: `inner circle.html` (contains space), `l'OUI.html` (apostrophe)

**CSS Classes:**
- Pattern: BEM-like with hyphens, no strict convention
- Examples: `.desktop-header`, `.faq-content-container`, `.btn-get-started`
- Bootstrap utilities: `.d-flex`, `.col-lg-4`, `.mb-5`

**Image Files:**
- Pattern: Mixed - descriptive names with spaces, hyphens, underscores
- Examples: `hero-bg-wmm.webp`, `inner circle - case.webp`, `BURGER&SHAKE_16OKT-19.webp`
- Note: WebP format for optimized images, JPG/PNG for originals

**JavaScript:**
- Pattern: camelCase for functions and variables
- Examples: `toggleScrolled`, `mobileNavToogle`, `showFormDirectly`

## Where to Add New Code

**New Page:**
1. Create `newpage.html` in root (or `/portfolio/` for case studies)
2. Copy header, mobile nav, footer from existing page
3. Update navigation links in new file and ALL other pages
4. Add page-specific content in `<main>` section
5. Include same vendor/main.js scripts at bottom

**New Section on Existing Page:**
1. Add `<section id="name" class="name section">` to page
2. Add styles to `assets/css/main.css`
3. Use existing section patterns (hero, cards, faq) as templates

**New Component Style:**
1. Add to `assets/css/main.css`
2. Follow existing BEM-like naming: `.component-name`, `.component-name-modifier`
3. Use CSS custom properties from `:root` for colors

**New JavaScript Feature:**
1. Add to `assets/js/main.js`
2. Use DOMContentLoaded listener pattern from existing code
3. Add event listeners with null checks (`if (element) { ... }`)

**New Portfolio Case Study:**
1. Create `portfolio/client-name.html`
2. Copy structure from `portfolio/burgernshake.html`
3. Use `../assets/` prefix for all asset paths
4. Add images to `assets/img/cases/client-name case photos/`
5. Add card link to `portfolio.html` and homepage cards section

**New Images:**
1. Add to appropriate `assets/img/` subdirectory
2. Optimize to WebP format (target: <500KB per image)
3. Use descriptive lowercase names with hyphens

## Special Directories

**`/assets/vendor/`:**
- Purpose: Third-party library code (do not modify)
- Generated: No (manually downloaded)
- Committed: Yes

**`/.planning/`:**
- Purpose: GSD methodology documentation
- Generated: Yes (by GSD commands)
- Committed: Yes

**`/errors/` (untracked):**
- Purpose: Unknown - appears in git status as untracked
- Generated: Possibly by testing
- Committed: No (should investigate)

---

*Structure analysis: 2026-02-06*
