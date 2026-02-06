# Phase 5: SEO Implementation - Research

**Researched:** 2026-02-06
**Domain:** SEO / Meta Tags / Structured Data
**Confidence:** HIGH

## Summary

SEO for static HTML websites in 2026 follows well-established standards with four main pillars: social meta tags (Open Graph + Twitter Cards), crawl/indexing directives (robots.txt + sitemap.xml), structured data (JSON-LD), and accessibility (alt text). The static HTML approach is actually advantageous for SEO - no complex build systems means faster load times and simpler implementation.

The standard approach is to add meta tags directly in the `<head>` of each HTML file, generate sitemaps using online tools (no npm needed), and include JSON-LD script blocks for structured data. For a portfolio website showcasing video production work, the key schemas are Organization (company info), LocalBusiness (physical location), and VideoObject (case study videos).

All major tools for validation are free and web-based: Google Rich Results Test, Facebook Sharing Debugger, and Twitter Card Validator. Implementation is straightforward - copy/paste meta tags with page-specific values.

**Primary recommendation:** Implement Open Graph tags first (immediate social sharing improvement), then robots.txt/sitemap (crawlability), then JSON-LD (rich results), then audit all alt texts (accessibility + image SEO).

## Standard Stack

The established tools and formats for static HTML SEO:

### Core Meta Tag Formats
| Standard | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Open Graph | 1.0 | Social media preview cards | Universal - Facebook, LinkedIn, WhatsApp, others |
| Twitter Cards | Current | Twitter/X-specific previews | Required for Twitter rich cards |
| HTML5 meta | Current | Title, description, viewport | Search engine fundamentals |

### Structured Data
| Format | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| JSON-LD | 1.1 | Structured data in `<script>` tags | Google's recommended format - cleanest for static HTML |
| Schema.org | Latest | Vocabulary for structured data | Industry standard vocabulary |

### Validation & Testing Tools
| Tool | Purpose | Cost | When to Use |
|------|---------|------|-------------|
| [Google Rich Results Test](https://search.google.com/test/rich-results) | Test JSON-LD structured data | Free | After adding structured data |
| [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) | Test Open Graph tags | Free | After adding OG tags |
| [Twitter Card Validator](https://cards-dev.twitter.com/validator) | Test Twitter Card tags | Free | After adding Twitter meta tags |
| [Schema Markup Validator](https://validator.schema.org/) | Generic schema validation | Free | For detailed JSON-LD debugging |

### Sitemap Generation (No npm required)
| Tool | Purpose | Limit | Cost |
|------|---------|-------|------|
| [XML-Sitemaps.com](https://www.xml-sitemaps.com/) | Generate XML + HTML sitemaps | 500 pages free | Free/Paid |
| [MySitemapGenerator](https://www.mysitemapgenerator.com/) | Multi-format sitemap generator | Varies | Free/Paid |

**Installation:**
No installation needed - all tools are web-based or manual HTML editing.

## Architecture Patterns

### Meta Tags Structure (per page)

```html
<head>
  <!-- Basic SEO -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title - Whistleman Media</title>
  <meta name="description" content="150-160 character description">

  <!-- Open Graph (required for social sharing) -->
  <meta property="og:title" content="Page Title">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://whistlemanmedia.nl/page.html">
  <meta property="og:image" content="https://whistlemanmedia.nl/assets/img/og-image.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Description of the image">
  <meta property="og:description" content="Description for social previews">
  <meta property="og:site_name" content="Whistleman Media">
  <meta property="og:locale" content="en_US">

  <!-- Twitter Cards (falls back to OG if not specified) -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@whistlemanmedia">
  <meta name="twitter:title" content="Page Title">
  <meta name="twitter:description" content="Description for Twitter">
  <meta name="twitter:image" content="https://whistlemanmedia.nl/assets/img/twitter-card.jpg">

  <!-- Canonical URL (self-referencing for each page) -->
  <link rel="canonical" href="https://whistlemanmedia.nl/page.html">

  <!-- JSON-LD Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Whistleman Media",
    "url": "https://whistlemanmedia.nl",
    "logo": "https://whistlemanmedia.nl/assets/img/logo.png"
  }
  </script>
</head>
```

### Pattern 1: Page-Specific Meta Tags

**What:** Each HTML page has unique meta tags that accurately describe that page's content.

**When to use:** Every single page (index, services, portfolio, contact, case studies).

**Example:**
```html
<!-- Homepage: index.html -->
<title>We tell stories that build brands - Whistleman Media</title>
<meta name="description" content="Whistleman Media is a creative social media company specializing in video production, content creation, and social media management in Amsterdam.">
<meta property="og:title" content="We tell stories that build brands">
<meta property="og:image" content="https://whistlemanmedia.nl/assets/img/og-home.jpg">

<!-- Case Study: portfolio/oeuf.html -->
<title>Case Study: Oeuf - Elevating Brunch Culture Online</title>
<meta name="description" content="See how Whistleman Media grew Oeuf Amsterdam's Instagram from 4K to 10K followers in 6 months through strategic social media management.">
<meta property="og:title" content="Oeuf Case Study - Social Media Growth">
<meta property="og:type" content="article">
<meta property="og:image" content="https://whistlemanmedia.nl/assets/img/cases/og-oeuf.jpg">
```

**Source:** [Open Graph Protocol](https://ogp.me/)

### Pattern 2: JSON-LD for Organization + LocalBusiness

**What:** Single JSON-LD block in the homepage `<head>` combining Organization and LocalBusiness schemas.

**When to use:** Homepage only (for company-wide information).

**Example:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "name": "Whistleman Media",
  "legalName": "Whistleman Media",
  "url": "https://whistlemanmedia.nl",
  "logo": "https://whistlemanmedia.nl/assets/img/logo-whiteonblack.png",
  "image": "https://whistlemanmedia.nl/assets/img/hero-bg-wmm.webp",
  "description": "Creative social media company specializing in video production, content creation, and social media management",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Jacob Bontiusplaats 9 AI.AM - The Hubb",
    "addressLocality": "Amsterdam",
    "postalCode": "1018LL",
    "addressCountry": "NL"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "52.371875",
    "longitude": "4.925946"
  },
  "telephone": "+31641867873",
  "email": "contact@whistlemanmedia.nl",
  "openingHours": "Mo-Fr 09:00-17:00",
  "sameAs": [
    "https://www.instagram.com/whistlemanmedia/",
    "https://www.linkedin.com/company/whistlemanmedia/",
    "https://www.tiktok.com/@whistlemanmedia"
  ]
}
</script>
```

**Source:** [Google LocalBusiness Structured Data](https://developers.google.com/search/docs/appearance/structured-data/local-business)

### Pattern 3: VideoObject for Case Studies

**What:** JSON-LD VideoObject schema for portfolio pages that showcase video work.

**When to use:** Each case study page that features embedded videos.

**Example:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Oeuf Amsterdam - Social Media Case Study",
  "description": "See how we grew Oeuf Amsterdam's social media presence through strategic content creation and community engagement",
  "thumbnailUrl": "https://whistlemanmedia.nl/assets/img/cases/oeuf-thumbnail.jpg",
  "uploadDate": "2024-03-15",
  "duration": "PT2M30S",
  "contentUrl": "https://whistlemanmedia.nl/assets/video/oeuf-case-study.mp4",
  "embedUrl": "https://whistlemanmedia.nl/portfolio/oeuf.html"
}
</script>
```

**Source:** [Schema.org VideoObject](https://schema.org/VideoObject)

### Anti-Patterns to Avoid

- **Duplicate meta tags across pages:** Each page must have unique title/description. Copy-pasting the same meta tags to all pages hurts SEO and creates poor social sharing experiences.
- **Missing self-referencing canonical tags:** Every page should have `<link rel="canonical" href="[its own URL]">` to prevent duplicate content issues.
- **Keyword stuffing in alt text:** Alt text should describe what's in the image naturally, not be a list of keywords. Bad: `alt="video production social media marketing amsterdam agency"`. Good: `alt="Behind-the-scenes photo of video shoot at Oeuf restaurant"`.
- **Forgetting og:image dimensions:** Include `og:image:width` and `og:image:height` properties so platforms can pre-allocate space and avoid layout shifts.
- **Multiple conflicting meta tags:** Only one `twitter:card` type per page. If multiple exist, crawlers may ignore all of them.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Sitemap generation | Manual XML file creation | [XML-Sitemaps.com](https://www.xml-sitemaps.com/) or similar | Crawls your site automatically, handles lastmod dates, creates both XML and HTML versions, validates format |
| OG image generation | Custom image creation for each page | Design template + batch export | Consistent branding, proper 1200x630 dimensions, under 1MB file size |
| Schema validation | Manual JSON-LD debugging | [Google Rich Results Test](https://search.google.com/test/rich-results) | Catches syntax errors, shows preview, confirms Google can parse it |
| robots.txt testing | Guessing if rules work | Google Search Console robots.txt tester | Shows exactly what's blocked/allowed per user-agent |

**Key insight:** SEO tools are mature and free. Manually creating sitemaps or debugging JSON-LD wastes time and introduces errors. Use specialized tools.

## Common Pitfalls

### Pitfall 1: Duplicate Meta Tags Across Multiple Pages

**What goes wrong:** Using the same title, description, and og:image on all pages. This confuses search engines about which page to rank for which query, and makes all social shares look identical.

**Why it happens:** Copy-pasting HTML from one page to another without updating the `<head>` content.

**How to avoid:**
- Create a checklist for each new page: unique title, unique description, unique og:image
- Title format: `[Page-Specific Title] - Whistleman Media`
- Description: 150-160 characters describing THIS page's content
- OG image: Page-specific image (case study thumbnail, service illustration, etc.)

**Warning signs:**
- All Google search results for your site show the same description
- All social shares use the same preview image regardless of which page is shared

**Source:** [Duplicate Meta Tags SEO Guide](https://vps.do/duplicate-meta-tags/)

### Pitfall 2: Wrong OG Image Dimensions

**What goes wrong:** Images are too small, wrong aspect ratio, or too large (>8MB), causing cropping or failed previews on social platforms.

**Why it happens:** Using existing hero images without checking social media requirements.

**How to avoid:**
- **Universal standard:** 1200 × 630 pixels (1.91:1 aspect ratio)
- **File size:** Under 1MB (WhatsApp limit is 300KB)
- **Format:** JPG or PNG
- **Safe zone:** Keep important content within central 1080 × 566 pixels (leaving 60px margin on all sides)

**Warning signs:**
- Facebook/LinkedIn crops faces or text out of preview
- Twitter shows broken image icon
- WhatsApp doesn't show preview at all

**Source:** [OG Image Size Guide 2026](https://myogimage.com/blog/og-image-size-meta-tags-complete-guide)

### Pitfall 3: Missing or Empty Alt Text on Images

**What goes wrong:** Screen readers can't describe images to visually impaired users, and search engines can't index image content properly.

**Why it happens:** Forgetting to add alt attributes, or adding `alt=""` to non-decorative images.

**How to avoid:**
- **Content images:** Descriptive alt text (80-125 characters): `alt="Chef Lorenzo Isodoro plating pasta at Linguini restaurant kitchen"`
- **Decorative images:** Empty alt: `alt=""` (tells screen readers to skip)
- **Logos in nav:** Include purpose: `alt="Whistleman Media logo - Return to homepage"`
- **Client logos:** Include company name: `alt="Burger 'n Shake logo"`

**Warning signs:**
- Accessibility audits flag missing alt text
- Images don't appear in Google Image Search
- Screen reader testing shows "image" or filename instead of description

**Source:** [Image Alt Text SEO Best Practices](https://alttext.ai/blog/image-alt-text-seo-best-practices)

### Pitfall 4: Incorrect JSON-LD Syntax

**What goes wrong:** Structured data doesn't validate, preventing rich results in search.

**Why it happens:** Manual JSON editing introduces syntax errors (missing commas, unescaped quotes, wrong date formats).

**How to avoid:**
- Use JSON-LD generators for initial structure
- **Test before publishing:** [Google Rich Results Test](https://search.google.com/test/rich-results)
- **Date format:** ISO 8601 (YYYY-MM-DD or YYYY-MM-DDTHH:MM:SS)
- **Duration format:** ISO 8601 duration (PT2M30S = 2 minutes 30 seconds)
- **No comments:** JSON-LD doesn't support comments - remove them before publishing
- Use absolute URLs (https://...) not relative paths

**Warning signs:**
- Rich Results Test shows "Invalid JSON" or "Not eligible for rich results"
- Console shows JSON parsing errors
- Schema Markup Validator flags errors

**Source:** [Google Rich Results Test Documentation](https://developers.google.com/search/docs/appearance/structured-data)

### Pitfall 5: Forgetting robots.txt and Sitemap Reference

**What goes wrong:** Search engines waste crawl budget on admin pages, or don't discover all pages efficiently.

**Why it happens:** Assuming crawlers will find everything automatically, or not knowing robots.txt best practices.

**How to avoid:**
- **Create robots.txt** at site root (`/robots.txt`)
- **Basic structure:**
  ```
  User-agent: *
  Allow: /
  Disallow: /cgi-bin/
  Disallow: /admin/
  Disallow: /.git/

  Sitemap: https://whistlemanmedia.nl/sitemap.xml
  ```
- **Reference sitemap** at bottom of robots.txt
- **Submit sitemap** to Google Search Console separately (robots.txt reference is backup)
- **Keep it simple:** Only block truly private/useless pages

**Warning signs:**
- Google Search Console shows "Couldn't fetch" errors
- Admin or test pages appear in search results
- Sitemap not discovered by crawlers

**Source:** [Robots.txt SEO Guide 2026](https://searchengineland.com/robots-txt-seo-453779)

### Pitfall 6: Not Testing Social Previews Before Launch

**What goes wrong:** Broken social sharing with missing images, truncated text, or wrong content.

**Why it happens:** Assuming the tags work without testing in the actual platforms.

**How to avoid:**
- **Test each page type:** Homepage, services, portfolio, case studies, contact
- **Test in all validators:**
  - [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
  - [Twitter Card Validator](https://cards-dev.twitter.com/validator)
  - LinkedIn Post Inspector
- **Force cache refresh:** If you update tags, these tools have a "Scrape Again" button to refresh cached metadata
- **Test actual sharing:** Share a link in a private post/DM to see real preview

**Warning signs:**
- Preview shows wrong image or no image
- Description is truncated mid-sentence
- Title shows domain instead of page title

**Source:** [Open Graph Meta Tags Best Practices](https://digitalguider.com/blog/open-graph-meta-tags/)

## Code Examples

Verified patterns from official sources:

### Complete `<head>` for Homepage
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Primary Meta Tags -->
  <title>We tell stories that build brands - Whistleman Media</title>
  <meta name="description" content="Whistleman Media is a creative social media company in Amsterdam specializing in video production, content creation, and full-service social media management.">

  <!-- Canonical URL -->
  <link rel="canonical" href="https://whistlemanmedia.nl/">

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://whistlemanmedia.nl/">
  <meta property="og:title" content="We tell stories that build brands - Whistleman Media">
  <meta property="og:description" content="Creative social media company in Amsterdam. We specialize in storytelling through video production and social media management.">
  <meta property="og:image" content="https://whistlemanmedia.nl/assets/img/og-home.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Whistleman Media - Creative storytelling agency">
  <meta property="og:site_name" content="Whistleman Media">
  <meta property="og:locale" content="en_US">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@whistlemanmedia">
  <meta name="twitter:title" content="We tell stories that build brands">
  <meta name="twitter:description" content="Creative social media company in Amsterdam. Video production, content creation, and social media management.">
  <meta name="twitter:image" content="https://whistlemanmedia.nl/assets/img/twitter-home.jpg">

  <!-- Favicon -->
  <link href="assets/img/logo-whiteonblack.png" rel="icon">
  <link href="assets/img/logo-whiteonblack.png" rel="apple-touch-icon">

  <!-- Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "name": "Whistleman Media",
    "legalName": "Whistleman Media",
    "url": "https://whistlemanmedia.nl",
    "logo": "https://whistlemanmedia.nl/assets/img/logo-whiteonblack.png",
    "image": "https://whistlemanmedia.nl/assets/img/hero-bg-wmm.webp",
    "description": "Creative social media company specializing in video production, content creation, and social media management in Amsterdam",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jacob Bontiusplaats 9 AI.AM - The Hubb",
      "addressLocality": "Amsterdam",
      "postalCode": "1018LL",
      "addressCountry": "NL"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "52.371875",
      "longitude": "4.925946"
    },
    "telephone": "+31641867873",
    "email": "contact@whistlemanmedia.nl",
    "sameAs": [
      "https://www.instagram.com/whistlemanmedia/",
      "https://www.linkedin.com/company/whistlemanmedia/",
      "https://www.tiktok.com/@whistlemanmedia"
    ]
  }
  </script>

  <!-- Existing vendor CSS and fonts... -->
</head>
```

**Source:** [Open Graph Protocol](https://ogp.me/) + [Google LocalBusiness Structured Data](https://developers.google.com/search/docs/appearance/structured-data/local-business)

### robots.txt (Root Directory)
```
# Whistleman Media - robots.txt
# https://whistlemanmedia.nl/robots.txt

User-agent: *
Allow: /
Disallow: /cgi-bin/
Disallow: /.git/
Disallow: /errors/

# Sitemap Location
Sitemap: https://whistlemanmedia.nl/sitemap.xml
```

**Source:** [Google Create robots.txt](https://developers.google.com/crawling/docs/robots-txt/create-robots-txt)

### Sitemap.xml Structure (Generate with Tool)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://whistlemanmedia.nl/</loc>
    <lastmod>2026-02-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://whistlemanmedia.nl/services.html</loc>
    <lastmod>2026-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://whistlemanmedia.nl/portfolio.html</loc>
    <lastmod>2026-01-20</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <!-- ... additional pages ... -->
</urlset>
```

**Note:** Use [XML-Sitemaps.com](https://www.xml-sitemaps.com/) to generate this automatically by crawling the site.

### Case Study Page Meta Tags (portfolio/oeuf.html)
```html
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Case Study: Oeuf - Social Media Growth - Whistleman Media</title>
  <meta name="description" content="See how Whistleman Media grew Oeuf Amsterdam's Instagram from 4,000 to 10,400 followers in 6 months through strategic content creation and community engagement.">

  <link rel="canonical" href="https://whistlemanmedia.nl/portfolio/oeuf.html">

  <!-- Open Graph -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://whistlemanmedia.nl/portfolio/oeuf.html">
  <meta property="og:title" content="Oeuf Case Study: 150% Instagram Growth in 6 Months">
  <meta property="og:description" content="From 4K to 10.4K followers: How we transformed Oeuf Amsterdam's social media presence through strategic storytelling and consistent content.">
  <meta property="og:image" content="https://whistlemanmedia.nl/assets/img/cases/og-oeuf.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Oeuf Amsterdam case study results - social media growth">
  <meta property="og:site_name" content="Whistleman Media">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Oeuf Case Study: 150% Instagram Growth">
  <meta name="twitter:description" content="How we grew Oeuf Amsterdam's Instagram from 4K to 10.4K followers in 6 months.">
  <meta name="twitter:image" content="https://whistlemanmedia.nl/assets/img/cases/twitter-oeuf.jpg">

  <!-- Structured Data for Case Study -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Oeuf Case Study: Social Media Growth Strategy",
    "description": "How Whistleman Media grew Oeuf Amsterdam's Instagram from 4,000 to 10,400 followers in 6 months",
    "image": "https://whistlemanmedia.nl/assets/img/cases/oeuf-hero-foto.webp",
    "datePublished": "2024-09-15",
    "dateModified": "2026-01-10",
    "author": {
      "@type": "Organization",
      "name": "Whistleman Media"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Whistleman Media",
      "logo": {
        "@type": "ImageObject",
        "url": "https://whistlemanmedia.nl/assets/img/logo-whiteonblack.png"
      }
    }
  }
  </script>
</head>
```

**Source:** [Schema.org Article](https://schema.org/Article)

### Image Alt Text Examples
```html
<!-- Hero images -->
<img src="assets/img/hero-bg-wmm.webp" alt="Video production equipment on set at Whistleman Media studio" class="hero-img">

<!-- Client logos in carousel -->
<img src="assets/img/clients/blackpng/burger n shakeklogo.webp" alt="Burger 'n Shake restaurant logo" class="img-fluid" loading="lazy">
<img src="assets/img/clients/blackpng/oeuf-logo.webp" alt="Oeuf Amsterdam brunch restaurant logo" class="img-fluid" loading="lazy">

<!-- Portfolio/case study cards -->
<img src="assets/img/oeuf-case.webp" alt="Oeuf case study - social media management results showing Instagram growth" class="img-fluid" loading="lazy">
<img src="assets/img/burgernshake.webp" alt="Burger 'n Shake case study - content creation and graphic design" class="img-fluid" loading="lazy">

<!-- Team/testimonial photos -->
<img src="assets/img/lorenzoisodoro.webp" alt="Lorenzo Isodoro, Chef at Linguini restaurant" loading="lazy">

<!-- Decorative elements (icons, backgrounds) -->
<img src="assets/img/arrow-diagonal.svg" alt="" role="presentation">
```

**Source:** [Google Image SEO Best Practices](https://developers.google.com/search/docs/appearance/google-images)

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Schema.org Microdata in HTML | JSON-LD in `<script>` tags | ~2018-2020 | Cleaner HTML, easier to maintain, Google's recommended format |
| Separate Twitter + OG tags | Twitter falls back to OG | ~2019 | Can use just OG tags, Twitter reads them if `twitter:*` tags missing |
| Manual sitemap updates | Auto-generated sitemaps | Always best | Reduces errors, always current |
| Meta keywords tag | Removed from SEO | ~2009 | Ignored by all major search engines - don't waste time |
| Schema Markup Validator (old) | Rich Results Test | 2020 | New tool shows actual Google rich result preview |

**Deprecated/outdated:**
- `<meta name="keywords">` - Completely ignored by Google, Bing, others since 2009
- Google+ meta tags (`publisher`, `author` tags for Google+) - Platform shut down in 2019
- Microdata/RDFa for structured data - Still works but JSON-LD is strongly preferred
- Old Twitter Card types (`photo`, `gallery`, `product`) - Consolidated to `summary` and `summary_large_image`

## Open Questions

Things that couldn't be fully resolved:

1. **Exact date for all content publishing**
   - What we know: JSON-LD Article schema requires `datePublished` and `dateModified` fields
   - What's unclear: Are creation dates available for all case studies? If not, what date to use?
   - Recommendation: Use approximate dates (month/year) if exact dates unknown, or use site launch date as fallback. Better to have approximate dates than omit the fields.

2. **Video hosting and VideoObject implementation**
   - What we know: VideoObject schema requires `contentUrl` and `embedUrl`
   - What's unclear: Are case study videos hosted locally, on Vimeo, YouTube, or embedded from social platforms?
   - Recommendation: Audit current video hosting. If videos are only on social media (Instagram/TikTok), VideoObject may not apply. If self-hosted or Vimeo/YouTube embedded, use VideoObject schema.

3. **Hreflang tags for Dutch market**
   - What we know: Site is in English but targets Dutch market (whistlemanmedia.nl domain)
   - What's unclear: Is there a Dutch language version planned? Should hreflang tags be added?
   - Recommendation: If site is English-only targeting Netherlands, use `<html lang="en">` and `og:locale` of `en_NL` (English language, Netherlands region). Only add hreflang if planning multilingual versions.

## Sources

### Primary (HIGH confidence)
- [Open Graph Protocol](https://ogp.me/) - Official OG specification
- [Google LocalBusiness Structured Data](https://developers.google.com/search/docs/appearance/structured-data/local-business) - Official Google docs for business schema
- [Google Rich Results Test](https://support.google.com/webmasters/answer/7445569) - Official validation tool documentation
- [Schema.org Organization](https://schema.org/Organization) - Official schema vocabulary
- [Schema.org VideoObject](https://schema.org/VideoObject) - Official video schema spec
- [Google Create robots.txt](https://developers.google.com/crawling/docs/robots-txt/create-robots-txt) - Official robots.txt guide

### Secondary (MEDIUM confidence)
- [OG Image Size Guide 2026](https://myogimage.com/blog/og-image-size-meta-tags-complete-guide) - Comprehensive dimension guide
- [Image Alt Text SEO Best Practices](https://alttext.ai/blog/image-alt-text-seo-best-practices) - Alt text strategy
- [Robots.txt SEO Guide 2026](https://searchengineland.com/robots-txt-seo-453779) - Search Engine Land best practices
- [Canonical URL Best Practices](https://searchengineland.com/canonicalization-seo-448161) - Canonicalization guide
- [Schema.org sameAs Property](https://schema.org/sameAs) - Social media linking
- [Portfolio Website SEO](https://www.wix.com/blog/portfolio-seo) - Portfolio-specific optimization

### Tertiary (LOW confidence - general guidance)
- [Twitter/X Card Validator](https://cards-dev.twitter.com/validator) - Tool exists but API docs had 404 errors
- Various blog posts on meta description length - Multiple sources agree on 150-160 characters but exact pixel width varies by device

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Open Graph, Twitter Cards, and JSON-LD are industry standards with official documentation
- Architecture patterns: HIGH - All examples verified with official sources (ogp.me, developers.google.com, schema.org)
- OG image dimensions: HIGH - 1200×630px is universally documented across multiple authoritative sources
- Alt text best practices: HIGH - Google official docs + accessibility standards align
- robots.txt/sitemap: HIGH - Google official documentation available
- Meta description length: MEDIUM - Multiple sources agree on 150-160 chars, but exact truncation varies by device/query
- Pitfalls: MEDIUM - Based on web search + common SEO mistakes articles (not direct experience with this project)
- VideoObject implementation: LOW - Depends on actual video hosting setup which needs audit

**Research date:** 2026-02-06
**Valid until:** ~30 days (SEO standards are stable, but should verify OG image dimensions and validation tool URLs before implementation)
