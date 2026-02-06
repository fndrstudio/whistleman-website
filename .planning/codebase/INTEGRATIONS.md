# External Integrations

**Analysis Date:** 2026-02-06

## APIs & External Services

**Form Submission:**
- **Web3Forms** - Contact form and download form submissions
  - Endpoint: `https://api.web3forms.com/submit`
  - Access Key: `d6b5486e-be40-4bae-a530-154b913012d2` (hardcoded in HTML)
  - Usage locations:
    - `contact.html` (line 105-107) - Main contact form
    - `index.html` (line 177) - Download popup form
  - Features used: Email notification on submission
  - Client script: `https://web3forms.com/client/script.js`

**Email Services:**
- **EmailJS** - Newsletter subscription
  - SDK: `https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js`
  - Public Key: `xSt4A1yusGFKnSwVo`
  - Service ID: `service_g99gf2a`
  - Template ID: `template_fno3r68`
  - Usage: Footer newsletter form on ALL pages
  - Implementation: Inline `<script>` block after vendor JS
  - Files: All 11 HTML files contain EmailJS initialization

## Analytics & Tracking

**Google Analytics 4:**
- Measurement ID: `G-Q33X4CQ5KZ`
- Implementation: gtag.js
- Location: `index.html` only (lines 5-13)
- Note: Only homepage has analytics; other pages are NOT tracked

```html
<!-- Only in index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-Q33X4CQ5KZ"></script>
```

## Data Storage

**Databases:**
- None - static site with no backend

**File Storage:**
- **Google Drive** - Downloadable assets
  - Marketing guide PDF: `https://drive.google.com/file/d/1EL1ZZ8dnxT_-eR0f1Un-oidhAw0O2XDn/view`
  - Privacy Policy PDF: `https://drive.google.com/file/d/1lHhayhRr0u0OVzcOyeRdvAojtwcincNp/view`

**Caching:**
- None - browser caching only

## Authentication & Identity

**Auth Provider:**
- None - public website with no user accounts

## Maps & Location

**Google Maps Embed:**
- Embedded iframe in footer on all pages
- Location: Jacob Bontiusplaats 9, 1018 LL Amsterdam
- Implementation: Static iframe embed (no API key required)

```html
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2435.919763984961!2d4.925946277387852!3d52.37187487202289..." />
```

## Fonts & Assets

**Google Fonts:**
- Preconnect: `fonts.googleapis.com`, `fonts.gstatic.com`
- Font families loaded:
  - Montserrat (weights: 300, 400, 500, 600, 700)
  - Poppins (weights: 300, 400, 500, 600, 700)
  - Bree Serif (default weight)

## Social Media Links

**Outbound Links (footer on all pages):**
- TikTok: `https://www.tiktok.com/@whistlemanmedia`
- Instagram: `https://www.instagram.com/whistlemanmedia/`
- LinkedIn: `https://www.linkedin.com/company/whistlemanmedia/`
- Twitter/X: Commented out in HTML

## Monitoring & Observability

**Error Tracking:**
- None implemented

**Logs:**
- Browser console only (console.log/console.error in `assets/js/main.js`)

## CI/CD & Deployment

**Hosting:**
- Apache web server
- Domain: whistlemanmedia.nl
- SSL: Yes (HTTPS)

**CI Pipeline:**
- None - manual deployment

## Environment Configuration

**Required env vars:**
- None - all credentials hardcoded

**Secrets in HTML (hardcoded):**
- Web3Forms access key: `d6b5486e-be40-4bae-a530-154b913012d2`
- EmailJS public key: `xSt4A1yusGFKnSwVo`
- Google Analytics ID: `G-Q33X4CQ5KZ`

**Note:** These are public/client-side keys, not server secrets.

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- Web3Forms sends email notifications on form submission
- EmailJS sends newsletter confirmation emails

## Integration Summary Table

| Integration | Purpose | Auth Method | Files |
|-------------|---------|-------------|-------|
| Web3Forms | Contact/download forms | Access key in HTML | `contact.html`, `index.html` |
| EmailJS | Newsletter signup | Public key in JS | All 11 HTML files |
| Google Analytics | Homepage tracking | Property ID | `index.html` only |
| Google Maps | Location embed | No auth (iframe) | All 11 HTML files |
| Google Fonts | Typography | No auth | All 11 HTML files |
| Google Drive | PDF downloads | Public links | `index.html`, `contact.html` |

## Known Issues

1. **Google Analytics only on homepage** - Other 10 pages have no tracking
2. **EmailJS code duplicated** - Same initialization code in all 11 HTML files
3. **No error tracking** - No Sentry, LogRocket, or similar
4. **Hardcoded credentials** - Cannot rotate keys without editing HTML files

---

*Integration audit: 2026-02-06*
