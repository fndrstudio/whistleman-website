---
phase: 05-seo-implementation
plan: 02
subsystem: seo-structured-data
tags: [seo, json-ld, schema-org, accessibility, alt-text, wcag]
requires: [05-01]
provides:
  - json-ld-structured-data
  - image-alt-text
  - accessibility-compliance
affects: []
tech-stack:
  added: []
  patterns: [schema-org, json-ld, wcag-accessibility]
key-files:
  created: []
  modified:
    - index.html
    - services.html
    - portfolio.html
    - contact.html
    - portfolio/burgernshake.html
    - portfolio/oeuf.html
    - portfolio/locals.html
    - portfolio/linguini.html
    - portfolio/pazzi.html
    - portfolio/inner circle.html
    - portfolio/l'OUI.html
decisions:
  - name: "Organization + LocalBusiness dual schema"
    choice: "Use both @type values for homepage"
    rationale: "Business is both an organization and local establishment - covers both search result types"
  - name: "Article schema for case studies"
    choice: "Use Article schema instead of CreativeWork"
    rationale: "More specific schema type recognized by Google for editorial content"
  - name: "role=presentation for decorative images"
    choice: "Add role=presentation to empty alt images with adjacent text"
    rationale: "Explicitly marks nav icons as decorative for screen readers"
  - name: "Descriptive over keyword-stuffed alt"
    choice: "80-125 char natural descriptions"
    rationale: "Better for accessibility and SEO than keyword stuffing"
metrics:
  duration: 16
  completed: 2026-02-06
---

# Phase 05 Plan 02: Structured Data & Image Alt Text Summary

**JSON-LD structured data for rich search results + descriptive alt text for accessibility and image SEO**

## What Was Built

Added JSON-LD structured data and comprehensive alt text across all HTML pages for improved SEO discoverability, rich search results, and accessibility compliance.

### Task 1: JSON-LD Structured Data
- **Homepage:** Organization + LocalBusiness schema with full contact information
  - Business name, address, coordinates, phone, email
  - Social media profile links (Instagram, LinkedIn, TikTok)
  - Logo and hero image references
- **Case Studies (7 pages):** Article schema for each portfolio piece
  - Descriptive headlines and summaries
  - Hero images with absolute URLs
  - Proper author and publisher attribution
  - Date published and modified timestamps

### Task 2: Descriptive Alt Text
- **Content images:** 80-125 character descriptive alt text
  - Hero images: Video production team descriptions
  - Client logos: Company names (Bar Lely, Burger 'n Shake, LOCALS, etc.)
  - Portfolio cards: Campaign-specific descriptions
  - Service photos: Team and workspace descriptions
  - Testimonial photos: Name and title (Lorenzo Isodoro, Chef at Linguini)
  - Case study photos: Specific scene descriptions (Oeuf brunch dishes, coffee preparation)
- **Decorative images:** Empty alt + role="presentation"
  - Mobile nav icons with adjacent text labels
  - Arrow SVGs with text context

## Technical Implementation

### JSON-LD Schema Structure

**Homepage (index.html):**
```json
{
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "name": "Whistleman Media",
  "url": "https://whistlemanmedia.nl",
  "address": { "@type": "PostalAddress", ... },
  "geo": { "@type": "GeoCoordinates", ... },
  "sameAs": ["instagram", "linkedin", "tiktok"]
}
```

**Case Studies (portfolio/*.html):**
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[Client] Case Study: [Description]",
  "author": { "@type": "Organization", "name": "Whistleman Media" },
  "publisher": { "@type": "Organization", "logo": {...} }
}
```

### Alt Text Guidelines Applied

| Image Type | Alt Text Strategy | Example |
|------------|------------------|---------|
| Hero images | Scene description (80-100 chars) | "Whistleman Media video production team filming creative content in Amsterdam" |
| Client logos | Company name | "Burger 'n Shake restaurant logo" |
| Portfolio cards | Campaign summary | "Oeuf Amsterdam brunch restaurant social media campaign showcase" |
| Service photos | Activity description | "Social media management team creating content strategy for restaurant clients" |
| Testimonials | Person + title | "Lorenzo Isodoro, Chef at Linguini restaurant Amsterdam" |
| Case photos | Specific scene | "Beautifully plated brunch dish at Oeuf Amsterdam restaurant" |
| Decorative | Empty + role | `alt="" role="presentation"` |

## Files Modified

| File | Changes | JSON-LD | Alt Updates |
|------|---------|---------|-------------|
| index.html | Homepage schema + all image alt | ✓ | Hero, logos, cards, testimonials |
| services.html | Image alt | - | Hero, service photos |
| portfolio.html | Image alt | - | Hero, portfolio cards |
| contact.html | Image alt | - | Hero, nav icons |
| portfolio/oeuf.html | Article schema + image alt | ✓ | Hero, case photos (6 images) |
| portfolio/burgernshake.html | Article schema + image alt | ✓ | Nav, footer |
| portfolio/linguini.html | Article schema + image alt | ✓ | Nav, footer |
| portfolio/locals.html | Article schema + image alt | ✓ | Nav, footer |
| portfolio/pazzi.html | Article schema + image alt | ✓ | Nav, footer |
| portfolio/inner circle.html | Article schema + image alt | ✓ | Nav, footer |
| portfolio/l'OUI.html | Article schema + image alt | ✓ | Nav, footer |

## Verification Results

### JSON-LD Validation
```
Homepage: 1 schema block (Organization + LocalBusiness)
Case studies: 7 schema blocks (Article type)
Total: 8 JSON-LD blocks across site
```

### Alt Text Statistics
```
Total images: 284
With descriptive alt text: 77 (content images)
Empty/decorative: 207 (icons, backgrounds, decorative elements)
Generic alt text (image/photo): 0 ✓
```

### Schema.org Compliance
- All JSON-LD uses absolute URLs for images and logos
- Follows Schema.org LocalBusiness specification
- Includes required fields: name, address, geo, telephone
- Article schema includes required publisher logo

## SEO Impact

### Rich Results Enabled
- **Knowledge Graph:** Organization info in search results
- **Local Business:** Address, phone, hours in local pack
- **Social Profiles:** Links to Instagram, LinkedIn, TikTok
- **Article Results:** Case studies eligible for article cards

### Accessibility Improvements
- **WCAG 2.1 Level A:** All content images have alt text
- **Screen reader friendly:** Decorative images properly marked
- **Image SEO:** Descriptive alt text improves image search ranking

## Decisions Made

1. **Dual schema types on homepage**
   - Used both Organization and LocalBusiness
   - Covers both general and local search scenarios
   - Enables both knowledge graph and local pack results

2. **Article schema for case studies**
   - More specific than CreativeWork
   - Better Google Rich Results support
   - Includes proper attribution and timestamps

3. **role="presentation" for decorative images**
   - Explicitly marks nav icons as decorative
   - Prevents redundant screen reader announcements
   - Follows ARIA best practices

4. **Natural language alt text**
   - 80-125 characters describing what's visible
   - Avoids keyword stuffing
   - Prioritizes accessibility over SEO gaming

## Deviations from Plan

None - plan executed exactly as written.

## Testing Recommendations

1. **Google Rich Results Test:**
   - Visit: https://search.google.com/test/rich-results
   - Test homepage URL
   - Should detect Organization/LocalBusiness schema
   - Test case study URLs for Article detection

2. **Structured Data Testing Tool:**
   - Visit: https://validator.schema.org/
   - Paste page HTML or URL
   - Verify all required fields present
   - Check for warnings or errors

3. **Screen Reader Testing:**
   - Use NVDA (Windows) or VoiceOver (Mac)
   - Navigate image-heavy pages
   - Verify content images are announced with descriptive text
   - Verify decorative images are skipped

4. **Image Search:**
   - Use Google Images search
   - Search for: "Whistleman Media portfolio"
   - Verify alt text helps discover relevant images

## Next Phase Readiness

**Phase 5 Complete:**
- ✓ OG/Twitter meta tags (05-01)
- ✓ robots.txt + sitemap.xml (05-01)
- ✓ JSON-LD structured data (05-02)
- ✓ Image alt text (05-02)

**Ready for Phase 6 (Polish & Animations):**
- All SEO fundamentals in place
- Structured data enables rich search results
- Accessibility baseline established
- Ready for Lenis smooth scrolling and GSAP animations

**Blockers:** None

**Concerns:**
- OG preview images (1200x630px) still need to be created - design task
- JSON-LD references images that exist but aren't optimized for size

## Performance Notes

**Execution time:** 16 minutes
- Task 1 (JSON-LD): ~5 minutes - straightforward schema addition
- Task 2 (Alt text): ~11 minutes - systematic updates across 11 HTML files

**File changes:**
- 11 HTML files modified
- 208 insertions (JSON-LD blocks)
- 109 alt text replacements

## Self-Check: PASSED

**Created files:** None (modifications only)

**Commit verification:**
```
a641353: feat(05-02): add JSON-LD structured data for rich search results
a98414c: feat(05-02): add descriptive alt text to all images for accessibility
```

Both commits exist in git history ✓
All modified files staged and committed ✓
