# SEO Audit

## Missing Meta Tags

### No Open Graph (critical for social sharing)

Add to ALL pages:
```html
<meta property="og:title" content="Page Title | Whistleman Media">
<meta property="og:description" content="Description here">
<meta property="og:image" content="https://whistlemanmedia.nl/assets/img/og-image.jpg">
<meta property="og:url" content="https://whistlemanmedia.nl/page">
<meta property="og:type" content="website">
```

### No Twitter Cards

Add to ALL pages:
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Page Title | Whistleman Media">
<meta name="twitter:description" content="Description here">
<meta name="twitter:image" content="https://whistlemanmedia.nl/assets/img/og-image.jpg">
```

### No Canonical URLs

Add to prevent duplicate content issues:
```html
<link rel="canonical" href="https://whistlemanmedia.nl/page">
```

---

## Missing Files

### robots.txt (CREATE)

```
User-agent: *
Allow: /

Sitemap: https://whistlemanmedia.nl/sitemap.xml
```

### sitemap.xml (CREATE)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://whistlemanmedia.nl/</loc></url>
  <url><loc>https://whistlemanmedia.nl/services</loc></url>
  <url><loc>https://whistlemanmedia.nl/portfolio</loc></url>
  <url><loc>https://whistlemanmedia.nl/contact</loc></url>
  <url><loc>https://whistlemanmedia.nl/portfolio/burgernshake</loc></url>
  <url><loc>https://whistlemanmedia.nl/portfolio/oeuf</loc></url>
  <url><loc>https://whistlemanmedia.nl/portfolio/locals</loc></url>
  <url><loc>https://whistlemanmedia.nl/portfolio/linguini</loc></url>
  <url><loc>https://whistlemanmedia.nl/portfolio/pazzi</loc></url>
  <url><loc>https://whistlemanmedia.nl/portfolio/inner-circle</loc></url>
  <url><loc>https://whistlemanmedia.nl/portfolio/loui</loc></url>
</urlset>
```

---

## Missing Structured Data

### Organization Schema

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Whistleman Media",
  "url": "https://whistlemanmedia.nl",
  "logo": "https://whistlemanmedia.nl/assets/img/logo.png",
  "sameAs": [
    "https://instagram.com/whistlemanmedia",
    "https://linkedin.com/company/whistlemanmedia"
  ]
}
</script>
```

### LocalBusiness Schema

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Whistleman Media",
  "description": "Creative social media agency",
  "url": "https://whistlemanmedia.nl",
  "telephone": "+31-XXX-XXXXXX",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Amsterdam",
    "addressCountry": "NL"
  }
}
</script>
```

---

## Image SEO

### Empty Alt Texts (fix all)

| Element | Current | Should Be |
|---------|---------|-----------|
| Client logos | `alt=""` | Company name |
| Portfolio images | `alt=""` | Descriptive text |
| Hero images | `alt=""` | Context of image |

### No Preload for Critical Images

Add for hero/above-fold images:
```html
<link rel="preload" as="image" href="assets/img/hero-bg-wmm.webp">
```

---

## Technical SEO

### Missing DNS Prefetch

```html
<link rel="dns-prefetch" href="//api.web3forms.com">
<link rel="dns-prefetch" href="//www.googletagmanager.com">
<link rel="dns-prefetch" href="//fonts.googleapis.com">
```

### No Critical CSS Inlining
- All CSS loaded synchronously
- Should inline critical above-fold styles

---

## Current SEO (What's Good)

- Title tags present on all pages ✓
- Meta descriptions present (155-160 chars) ✓
- Keywords meta tags present ✓
- Viewport meta tag correct ✓
- Favicons configured ✓
- .htaccess removes .html extensions ✓
- Custom 404 configured ✓

---

## Validation Tools

- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
