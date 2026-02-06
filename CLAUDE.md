# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Whistleman Media portfolio website - a static HTML/CSS/JS site with no build system.

**Live site:** https://whistlemanmedia.nl

## Tech Stack

- Pure HTML5, CSS, vanilla JavaScript
- Bootstrap 5 (bundled in vendor)
- Apache server (`.htaccess` for URL rewriting)
- No package.json, no npm, no build tools

## Development

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
│   ├── css/main.css       # All styles (3,430 lines) - single source of truth
│   ├── js/main.js         # All custom JS (480 lines)
│   ├── img/               # Images (239MB - needs optimization)
│   └── vendor/            # Vendor libraries (Bootstrap, Swiper, etc.)
└── .htaccess              # Apache URL rewriting
```

### Vendor Libraries (in `assets/vendor/`)

- Bootstrap 5 + Bootstrap Icons
- Swiper (carousels)
- GLightbox (image lightbox)
- PureCounter (number animations)
- php-email-form (contact form validation)

### Key Code Locations

| Component | Location in main.css |
|-----------|---------------------|
| CSS variables | Lines 8-32 (`:root` blocks) |
| Header/nav | Lines 91-500 (`.header`, `.navmenu`, `.desktop-header`) |
| Hero section | Search for `.hero` |
| Card components | Search for `.cards`, `.cards-2`, etc. |
| Footer | Search for `.footer` |
| All JS logic | `assets/js/main.js` |

### Forms

- Contact form uses Web3Forms API (`https://api.web3forms.com/submit`)
- Newsletter uses EmailJS

## Known Issues

**Remaining:**
- Images are extremely large (19MB single files) - need WebP conversion
- `100vw` usage causes horizontal scrollbar (CSS bug)
- Fixed-size images need `object-position: center` added

## CSS Notes

- **Single source of truth:** Edit `assets/css/main.css` directly
- Left margins inconsistent: 1%, 50px, 90px, 100px across sections
- Duplicate media queries at 768px breakpoint could be consolidated
