# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Whistleman Media portfolio website - a static HTML/CSS/JS site with no build system.

**Live site:** https://whistlemanmedia.nl

## Tech Stack

- Pure HTML5, CSS, vanilla JavaScript
- Bootstrap 5 (bundled in vendor)
- SCSS compiled via VS Code "Easy Compile" extension
- Apache server (`.htaccess` for URL rewriting)
- No package.json, no npm, no build tools

## Development

### SCSS Compilation

SCSS is manually compiled using the [Easy Compile](https://marketplace.visualstudio.com/items?itemName=refgd.easy-compile) VS Code extension:

```
assets/scss/main.scss → assets/css/main.css
```

To compile: Save any `.scss` file with the extension installed.

### Local Development

Serve with any static server. The `.htaccess` removes `.html` extensions from URLs.

## Architecture

### File Structure

```
/
├── index.html              # Homepage
├── services.html           # Services page
├── portfolio.html          # Portfolio listing
├── contact.html            # Contact form
├── portfolio/              # 7 case study pages (burgernshake, oeuf, locals, etc.)
├── assets/
│   ├── css/main.css       # Compiled CSS (3,430 lines)
│   ├── js/main.js         # All custom JS (480 lines)
│   ├── scss/              # SCSS source
│   │   ├── main.scss      # Entry point
│   │   ├── _variables.scss
│   │   ├── layouts/       # header, footer, navmenu, general, preloader
│   │   └── sections/      # hero, cards, clients, faq, call-to-action
│   ├── img/               # Images (239MB - needs optimization)
│   └── vendor copy/       # Active vendor libraries (note: has space in name)
└── .htaccess              # Apache URL rewriting
```

### Vendor Libraries (in `assets/vendor copy/`)

- Bootstrap 5 + Bootstrap Icons
- Swiper (carousels)
- GLightbox (image lightbox)
- PureCounter (number animations)
- AOS (scroll animations - loaded but underutilized)
- Isotope + ImagesLoaded (unused - can be removed)

### Key Code Locations

| Component | Location |
|-----------|----------|
| Header/nav styles | `assets/scss/layouts/_header.scss`, `_navmenu.scss` |
| Hero section | `assets/scss/sections/_hero.scss` |
| Card components | `assets/scss/sections/_cards.scss`, `_cards-2.scss` |
| Footer | `assets/scss/layouts/_footer.scss` |
| All JS logic | `assets/js/main.js` |
| CSS variables | `assets/scss/_variables.scss` |

### Forms

- Contact form uses Web3Forms API (`https://api.web3forms.com/submit`)
- Newsletter uses EmailJS

## Known Issues

**Critical:**
- `assets/vendor/` is an unused duplicate of `assets/vendor copy/` (delete it)
- Images are extremely large (19MB single files) - need WebP conversion
- `100vw` usage causes horizontal scrollbar (CSS bug)

**HTML references `vendor copy` not `vendor`** - all HTML files use paths like:
```html
<link href="assets/vendor copy/bootstrap/css/bootstrap.min.css">
```

## CSS Patterns

- Left margins inconsistent: 1%, 50px, 90px, 100px across sections
- Fixed-size images need `object-position: center` added
- Duplicate media queries at 768px breakpoint
