# SEO Changes — Cyvera Portfolio

## Files Added / Modified

### `index.html` (modified)
- **Primary meta tags**: `<meta name="keywords">`, `<meta name="author">`, `<link rel="canonical">`, `<meta name="robots">`
- **Open Graph tags**: `og:type`, `og:url`, `og:title`, `og:description`, `og:image`, `og:site_name`, `og:locale`
  → Controls how your link looks when shared on Facebook, LinkedIn, WhatsApp
- **Twitter/X Card tags**: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- **JSON-LD Structured Data**: Schema.org `Organization`, `WebSite`, `WebPage`, and `ProfessionalService` graphs
  → Enables Google rich results and better entity understanding
- **`<link rel="preconnect">`** to Google Fonts for performance

### `public/robots.txt` (new)
- Tells crawlers they can index all pages
- Points to the sitemap location

### `public/sitemap.xml` (new)
- Lists all key sections with priorities and change frequencies
- Helps Google discover and prioritise crawling

### `src/seo/useSEO.js` (new)
- Lightweight utility that dynamically updates `<title>`, meta description,
  canonical URL, and OG/Twitter tags when the user navigates between views
- `SEO_CONFIGS` object with unique title + description for each service page
- Zero new dependencies — uses plain DOM APIs

### `src/cyvera-portfolio.jsx` (modified)
- Added `useSEO` import
- Added `useEffect(() => { useSEO(SEO_CONFIGS[view]) }, [view])` inside
  `CyveraPortfolio` so meta updates on every view change (home ↔ service detail)

## What To Do After Deploying

1. **Replace placeholder URLs**: Search for `https://cyvera.com.au` in all files
   and confirm it matches your real production domain.

2. **Create an OG image**: Add a 1200×630px branded image at `public/og-image.png`
   so social shares look professional.

3. **Update twitter:site**: Replace `@cyvera` with your real Twitter/X handle.

4. **Update contact email**: Replace `hello@cyvera.com.au` in the JSON-LD with your real email.

5. **Submit sitemap to Google Search Console**:
   Go to https://search.google.com/search-console → Sitemaps → add `https://cyvera.com.au/sitemap.xml`

6. **Validate structured data**:
   Use https://validator.schema.org or Google's Rich Results Test after deploying.

7. **Update `lastmod` dates** in `sitemap.xml` whenever you make significant content changes.
