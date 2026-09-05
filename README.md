# getpepti.app — marketing site

SEO-first static site for the Pepti peptide tracker app. Built with [Astro](https://astro.build) (static output, no client framework, no third-party requests).

## Quick start
```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs ./dist
npm run seo:check  # audits ./dist: titles, descriptions, H1s, canonicals, links, JSON-LD, sitemap
```

## Before you deploy
Edit **`src/config/site.ts`** — brand name, App Store ID, Play package, pricing, rating count, founder, social links. Every page, schema block and store button reads from it. See `docs/SEO-STRATEGY.md` §3 for the full checklist.

## Structure
```
src/config/site.ts          single source of truth for brand + store data
src/data/peptides.ts        24 compounds → /track/[slug] and /peptide-calculator/[slug]
src/data/competitors.ts     6 competitors → /compare/pepti-vs-[slug] and the roundup
src/content/guides/*.md     long-form guides (content collection, Article + FAQ schema)
src/components/Seo.astro    canonical, OG/Twitter, smart app banner, Organization/WebSite graph
src/components/AppSchema    MobileApplication / SoftwareApplication JSON-LD
src/pages/og/[...slug].png  build-time OG images (sharp)
public/_headers, vercel.json, public/_redirects   hosting headers + clean-URL redirects
docs/SEO-STRATEGY.md        research, keyword map, launch + off-page + ASO plan
```

## Deploy
Any static host. Build command `npm run build`, output directory `dist`. Vercel reads `vercel.json`; Netlify and Cloudflare Pages read `public/_headers` and `public/_redirects`.
