# Visual Bugs & Layout Issues

## Stretched Images

### Missing object-position

Images have `object-fit: cover` but no `object-position: center`:

| Location | Element | Size |
|----------|---------|------|
| main.css:1825-1831 | `.cards-2 .testimonial-item img` | 150x150px |
| main.css:1892-1897 | Responsive variant | 100x100px |
| main.css:1955-1960 | Mobile variant | 100x100px |
| main.css:2368-2375 | `#hero-contact .hero-bg` | Full width |
| main.css:3019-3023 | `.preview-image img` | 70x90px |

**Fix:**
```css
.cards-2 .testimonial-item img,
#hero-contact .hero-bg,
.preview-image img {
  object-position: center;
}
```

### Intentional Overflow (120% width)
- main.css:2269 - `.cards-portfolio .card { width: 120%; }` - Cards break container

---

## Inconsistent Horizontal Margins

Different left margins used across sections:

| Location | Value | Section |
|----------|-------|---------|
| main.css:939 | 1% | General sections |
| main.css:1126 | 50px | Clients |
| main.css:1210 | 100px | FAQ |
| main.css:1426 | 100px | Cards |
| main.css:2205 | 90px | Portfolio cards |
| main.css:2582 | 90px | Cards-4 |
| main.css:2737 | 90px | Cards-5 |

**Fix:** Standardize with CSS variable:
```css
:root {
  --section-margin-left: 90px;
}
```

---

## 100vw Overflow Bug (Critical)

Using `100vw` ignores scrollbar width (~15-17px overflow):

| Location | Issue |
|----------|-------|
| main.css:1439 | `.cards .row { width: 100vw; }` |
| main.css:2224 | Portfolio cards similar issue |

**Fix:** Replace `100vw` with `100%`

---

## Footer Layout Breaking

| Location | Issue |
|----------|-------|
| main.css:536 | `.footer-left { width: 50vw; }` |
| main.css:640 | `.footer-right { width: 50vw; }` |

**Total = 100vw + padding = OVERFLOW**

Mobile makes it worse:
- main.css:741-744 - Both set to `width: 100vw;` (double width!)

**Fix:**
```css
.footer-left, .footer-right {
  width: calc(50% - 20px);
}
```

---

## Extreme Mobile Spacing Jumps

| Property | Desktop | Mobile | Reduction |
|----------|---------|--------|-----------|
| Cards gap | 30px | 10px | 67% |
| Container padding | 100px | 15px | 85% |
| Footer width | 50vw | 100vw | 2x |

**Lines:** main.css:1440 vs 1578 (gap), main.css:1425 vs 2320 (padding)

**Fix:** Use proportional scaling (e.g., 30px → 20px instead of 30px → 10px)

---

## Double Left Spacing

**main.css:1022-1023** - `.hero .container`:
```css
padding-left: 50px;
margin-left: 40px;
/* Total: 90px left offset - likely unintentional */
```

---

## Z-Index Stacking Confusion

| Element | Z-index | Line | Issue |
|---------|---------|------|-------|
| `.hero:after` | 990 | 993-1003 | - |
| `.hero img` | 995 | 1007-1016 | - |
| `.hero .container` | 996 | 1018-1024 | - |
| `.mobile-nav` | 996 | 233 | **Conflicts with hero** |

---

## Duplicate Media Queries

- main.css:1558 - `@media (max-width: 768px)`
- main.css:1588 - Same breakpoint again (should consolidate)

---

## Cards Container Conflict

| Location | Rule | Issue |
|----------|------|-------|
| main.css:1426 | `.cards .container { margin-left: 100px; }` | Sets container margin |
| main.css:1444 | `.cards .row { width: 100vw; }` | **Ignores container!** |

The row breaks out of its container due to 100vw.
