# Codebase Concerns

**Analysis Date:** 2026-02-06

## Tech Debt

**Original Image Files Still Present:**
- Issue: Original JPG/PNG files remain alongside WebP conversions
- Files: `assets/img/**/*.jpg`, `assets/img/**/*.png` (~219MB)
- Impact: Repo size bloat, deployment size, storage costs
- Fix approach: Delete original files before production, keep WebP only

**CSS-SCSS Drift:**
- Issue: `assets/css/main.css` edited directly, SCSS sources now out of sync
- Files: `assets/css/main.css` (3,430 lines)
- Impact: Future SCSS compilation will overwrite CSS fixes made in Phase 3
- Fix approach: Either delete SCSS and use CSS only, or backport CSS changes to SCSS

**Inconsistent Left Margins:**
- Issue: Sections use varying left margins (1%, 50px, 90px, 100px)
- Files: `assets/css/main.css` (lines 939, 947, 975, 1426, 2205, 2582, 2738)
- Impact: Visual inconsistency across sections, maintenance burden
- Fix approach: Consolidate to single CSS variable `--section-margin-left`

**Duplicate HTML Structures:**
- Issue: Cards sections duplicated (container + container-fluid) for different breakpoints
- Files: `index.html` (lines 388-787), `portfolio/burgernshake.html` (similar pattern)
- Impact: Doubled markup, maintenance nightmare, increased DOM size
- Fix approach: Use responsive CSS instead of duplicate HTML structures

**Inline Styles in HTML:**
- Issue: ~38 inline style attributes in index.html alone
- Files: All HTML files (`index.html`, `contact.html`, `portfolio/*.html`)
- Impact: CSS overrides, specificity issues, no caching, hard to maintain
- Fix approach: Extract to CSS classes in main.css

## Known Bugs

**Horizontal Scrollbar Bug:**
- Symptoms: Horizontal scrollbar appears on pages with full-width sections
- Files: `assets/css/main.css` (10 occurrences of `100vw`)
- Trigger: Any viewport with scrollbar, `100vw` includes scrollbar width
- Workaround: Replaced some with `100%`, but some remain in footer (lines 743, 801, 822)

**Missing object-position:**
- Symptoms: Images may crop wrong focal point when using object-fit: cover
- Files: `assets/css/main.css` (9 `object-fit: cover` without `object-position`)
- Trigger: Images with important off-center content
- Workaround: None currently

## Security Considerations

**Exposed API Keys in HTML:**
- Risk: API keys hardcoded in client-side HTML, visible to anyone
- Files: All HTML files
  - Web3Forms: `d6b5486e-be40-4bae-a530-154b913012d2` (`index.html:178`, `contact.html:107`)
  - EmailJS: `xSt4A1yusGFKnSwVo` (all HTML files in newsletter scripts)
- Current mitigation: Web3Forms and EmailJS keys are designed for client-side use
- Recommendations: Monitor for abuse, set up domain restrictions in service dashboards

**Form Without Rate Limiting:**
- Risk: Forms can be spammed with automated submissions
- Files: `index.html` (popup form), `contact.html` (contact form)
- Current mitigation: Web3Forms has basic spam protection, privacy checkbox required
- Recommendations: Add honeypot field, consider CAPTCHA for contact form

## Performance Bottlenecks

**Large CSS File:**
- Problem: Single 3,430-line CSS file blocks rendering
- Files: `assets/css/main.css`
- Cause: All styles in one file, no code splitting, unused rules
- Improvement path: Critical CSS inlining, deferred non-critical styles, or purge unused CSS

**No srcset/Responsive Images:**
- Problem: Full-size images loaded on all devices
- Files: All HTML files, all `<img>` tags
- Cause: Single image source, no responsive variants
- Improvement path: Generate multiple sizes (640w, 1024w, 1920w), add srcset attributes

**Render-Blocking Scripts:**
- Problem: 6 vendor JS files load synchronously
- Files: All HTML files (bottom of body, before main.js)
- Cause: No `defer` or `async` attributes
- Improvement path: Add `defer` to non-critical scripts (purecounter, glightbox, swiper)

**No Critical CSS:**
- Problem: Full CSS file must download before any rendering
- Files: All HTML files reference `assets/css/main.css`
- Cause: No CSS splitting or inlining
- Improvement path: Inline above-the-fold CSS, defer rest

## Fragile Areas

**Popup/Balloon Component:**
- Files: `assets/js/main.js` (lines 175-507), `assets/css/main.css` (lines 2873-3431)
- Why fragile: Complex state management, multiple content states (initial/form/success), drag functionality, CSS animations
- Safe modification: Test all three states and drag on desktop; test mobile dismissal
- Test coverage: None - manual testing required

**Scroll Arrow Buttons:**
- Files: `assets/js/main.js` (lines 58-107)
- Why fragile: Duplicate event listeners attached (lines 58-81 AND 84-107 do same thing), null reference if elements missing
- Safe modification: Consolidate to single handler, add null checks
- Test coverage: None

**Footer Layout:**
- Files: `assets/css/main.css` (lines 518-848)
- Why fragile: Complex flexbox with nested components, many `!important` overrides, media queries at 768px, 920px, 992px, 1100px
- Safe modification: Test all breakpoints, especially footer reordering on mobile
- Test coverage: None

## Scaling Limits

**Image Directory Size:**
- Current capacity: 250MB in `assets/img/`
- Limit: Git performance degrades significantly above 1GB repo size
- Scaling path: Use CDN for images, git-lfs, or remove images from repo

## Dependencies at Risk

**No Package Management:**
- Risk: Vendor libraries have no version tracking or update path
- Impact: Security vulnerabilities may go unpatched
- Migration plan: Optionally add package.json for dependency tracking only (no build system)

**Vendor Libraries Age:**
- Risk: Bootstrap 5 and other libs may be outdated
- Files: `assets/vendor/` (9.8MB)
- Impact: Missing security patches, browser compatibility issues
- Migration plan: Check versions against latest, update as needed

## Missing Critical Features

**No Error Boundary:**
- Problem: JavaScript errors silently fail, no user feedback
- Blocks: Forms fail without indication if API is down

**No Analytics Error Tracking:**
- Problem: Only Google Analytics for pageviews, no JS error tracking
- Blocks: Cannot monitor form failures or JS errors in production

**No 404.html:**
- Problem: Referenced in .htaccess but file may not exist
- Files: `.htaccess:12` references `/404.html`
- Blocks: Broken links show server default error page

## Test Coverage Gaps

**All JavaScript Logic:**
- What's not tested: All 507 lines of main.js
- Files: `assets/js/main.js`
- Risk: Any refactoring could break functionality
- Priority: Medium - code is relatively simple

**Form Submissions:**
- What's not tested: Contact form, popup form, newsletter subscription
- Files: `index.html`, `contact.html`
- Risk: Silent failures, poor UX on errors
- Priority: High - directly impacts conversions

**Responsive Breakpoints:**
- What's not tested: CSS media queries at 640px, 768px, 920px, 991.5px, 992px, 1100px, 1150px, 1199px, 1200px, 1800px, 2000px
- Files: `assets/css/main.css`
- Risk: Layout breaks at specific widths
- Priority: High - affects significant portion of users

**Cross-Browser Compatibility:**
- What's not tested: Safari, Firefox, mobile browsers
- Risk: CSS features like `color-mix()` not supported in older browsers
- Priority: Medium - `color-mix()` used throughout (check browser support)

---

*Concerns audit: 2026-02-06*
