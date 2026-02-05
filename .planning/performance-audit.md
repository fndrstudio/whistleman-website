# Performance Audit

## Critical: File Size (239MB total)

### Duplicate Vendor Directories (20MB waste)

| Directory | Size | Status |
|-----------|------|--------|
| `/assets/vendor/` | 9.9MB | **UNUSED - DELETE** |
| `/assets/vendor copy/` | 10MB | Active (rename to `vendor`) |

**Action:** Delete `/assets/vendor/`, rename `vendor copy` to `vendor`, update all HTML paths.

### Massive Images (196MB in /cases alone)

| File | Size | Location |
|------|------|----------|
| koffie drinken.jpg | 19MB | /assets/img/cases/locals case photos/ |
| iced matcha & latte.jpg | 19MB | /assets/img/cases/locals case photos/ |
| casefoto-locals.jpg | 18MB | /assets/img/cases/ |
| pancakes.jpg | 17MB | /assets/img/cases/locals case photos/ |
| banner-locals.jpg | 17MB | /assets/img/cases/ |
| hero-services-wmm.jpg | 3.1MB | /assets/img/ |
| hero-bg-wmm.jpg | 2.1MB | /assets/img/ |

**Action:** Convert to WebP, compress to 80% quality, max 1920px width.

### Duplicate Files to Delete

- `/assets/img/clients/` - duplicates of `/assets/img/Logos/blackpng/`
- `/assets/img/Logos/` (non-blackpng versions) - unused
- `/assets/vendor copy/imagesloaded/` - not referenced
- `/assets/vendor copy/isotope-layout/` - not referenced
- `/assets/img/clients/client-1.png` through `client-8.png` - placeholders

---

## Heavy Google Fonts

**Current (index.html:27):**
- Montserrat: 18 weight variants
- Poppins: 18 weight variants

**Optimized:**
```html
<link href="https://fonts.googleapis.com/css2?family=Bree+Serif&family=Montserrat:wght@400;500;600;700&family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
```

---

## Missing Optimizations

### No Lazy Loading
- Only 1 element has `loading="lazy"` (Google Maps iframe)
- All 74+ images in index.html block rendering

**Fix:**
```html
<img src="image.webp" loading="lazy" decoding="async" alt="Description">
```

### No srcset/Responsive Images
- Full resolution loaded on all devices
- No WebP variants

**Fix:**
```html
<img
  srcset="image-640.webp 640w, image-1024.webp 1024w, image-1920.webp 1920w"
  sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1920px"
  src="image-1920.webp"
  alt="Description"
>
```

---

## JavaScript Issues

### Render Blocking
- index.html:1024-1035 - 8 JS files loaded synchronously (no defer/async)

**Fix:** Add `defer` attribute to non-critical scripts.

### Memory Leaks
| Location | Issue |
|----------|-------|
| main.js:180-191 | setTimeout for popup without cleanup |
| main.js:403-419 | Event listeners for dragging never removed |
| main.js:355 | Error auto-remove setTimeout not cleared |

### No Throttle/Debounce
- main.js:15 - Scroll handler fires on every scroll event

---

## CSS Issues

### Large File
- main.css: 3,430 lines (likely contains unused rules)

### Animations in JavaScript
- main.js:450-478 - Keyframes defined via innerHTML instead of CSS

### Expensive Filters
- Portfolio images use `filter: brightness(70%)` (CPU intensive)

---

## Verification Commands

```bash
# Find large images
find assets/img -size +1M -type f

# Check total directory size
du -sh assets/

# Count file lines
wc -l assets/js/main.js assets/css/main.css
```
