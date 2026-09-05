# getpepti.app SEO Strategy & Research Report

_Prepared 2026-09-05. Goal: rank #1 for "peptide tracker" and own the surrounding keyword cluster._

## 1. What the research found

### 1.1 The site is invisible today
- `site:getpepti.app` returns **zero** indexed pages. Google does not know the domain exists. Nothing else matters until that is fixed (Section 4).
- Searches for "getpepti" surface **other products**: `pepti.app` ("Pepti GLP-1: Tracker for Mounjaro, Ozempic, and Wegovy"), `hellopepti.com` (peptide telehealth), "Pep AI: Peptide GLP-1 Tracker" and "GLP-1 Tracker: Pep". Brand confusion is real and must be addressed with strong entity signals (Organization + MobileApplication schema, consistent naming across web, App Store and Play, and `sameAs` links).

### 1.2 What the "peptide tracker" SERP looks like (from your screenshots)
1. **Apps carousel** (App Store): Peptide Tracker Log & Reminder (4.9★, 1K), Peptide Tracker – PeptideKit (4.7★, 364), Pep AI (4.7★, 2K). This block is fed by **App Store search ranking**, not web SEO. To be "first" on this SERP you need both ASO and web SEO (Section 6).
2. **peptidetracker.ai** – exact-match domain, title "Peptide Tracker | Peptide tracking app for iOS and Android". Thin site (home + privacy) propped up by PR Newswire press releases.
3. **peptiq.io** – deepest site: /features, /pricing, /download, /about, /help, /clinics, /peptide-apps (comparison page), /blog.
4. **Reddit r/Biohackers** "What are you looking for in Peptide Tracker apps?" (140+ comments).
5. Roundups: helloregimen.com, dosefi.app, mypepcalc.com, lynkdose.com, pepflow.app, peptideassistant.com, milligramapp.com, optipin.app, dosetrack.app – nearly every competitor publishes a "best peptide tracker apps 2026" post, and several publish "X vs Y" pages.
6. shotlee.app ranks with **programmatic per-compound pages** (/peptide-tracker, /tirzepetide-tracker, /tesamorelin-tracker, /glutathione-tracker, /insulin-tracker …).

Takeaway: the niche is young (most sites < 18 months old, low authority), so the #1 organic slot is winnable with a deeper, faster, better-structured site plus a modest link/mention campaign.

### 1.3 Keyword map
| Cluster | Examples | Page on this site |
|---|---|---|
| Head | peptide tracker, peptide tracker app, peptide tracking app, peptide app | `/` |
| Product | peptide tracker features / pricing / download / android | `/features`, `/pricing`, `/download` |
| Calculator (very high volume) | peptide calculator, peptide reconstitution calculator, peptide dosage calculator, bpc-157 dosage calculator, semaglutide units calculator | `/peptide-calculator`, `/peptide-calculator/[slug]` ×24 |
| Per-compound trackers | semaglutide tracker, tirzepatide tracker, retatrutide tracker, bpc-157 tracker, tb-500 tracker, ipamorelin tracker, glutathione tracker, trt tracker … | `/track/[slug]` ×24 |
| GLP-1 (largest adjacent market) | ozempic tracker app, mounjaro tracker, glp-1 tracker, semaglutide titration schedule | `/track/semaglutide`, `/track/tirzepatide`, `/guides/glp-1-dose-schedule-and-titration` |
| Comparison / commercial | best peptide tracker app, peptiq vs, shotsy vs, regimen vs, peptide tracker free vs paid | `/best-peptide-tracker-apps`, `/compare/pepti-vs-*` ×6 |
| Informational | how to track peptide protocol, how to reconstitute peptides, injection site rotation, peptide half life, peptide cycle, how to store peptides, peptide tracking spreadsheet | `/guides/*` ×8 |

Search-demand context from the research: tirzepatide ≈ 1M US searches/month, semaglutide ≈ 450K, BPC-157 ≈ 300K. Per-compound tracker and calculator pages ride that demand; the head term "peptide tracker" alone is small by comparison.

## 2. What was built
A complete static site (Astro 7, zero client framework, system fonts, no third-party requests) with **76 pages**:

- Core: `/`, `/features`, `/pricing`, `/download`, `/about`, `/contact`, `/privacy`, `/terms`, `/404`
- Tools: `/peptide-calculator` (interactive, ~1 KB JS) + 24 per-compound calculators
- Compounds: `/track` hub + 24 tracker landing pages
- Commercial: `/best-peptide-tracker-apps`, `/compare` hub + 6 head-to-head pages
- Guides: `/guides` hub + 8 long-form articles (content collection, Article schema)
- Feeds/machine: `sitemap-index.xml`, `robots.txt`, `rss.xml`, `llms.txt`, `manifest.webmanifest`, `humans.txt`

Technical SEO baked in on every page: unique title/description, single H1, canonical, Open Graph + Twitter cards with **build-time generated OG images** (65 PNGs), `BreadcrumbList`, `Organization` + `WebSite` + `WebPage` graph, `MobileApplication`/`SoftwareApplication` with offers, `FAQPage` on every page with an FAQ, `WebApplication` on calculators, `Article` on guides, `ItemList` on the roundup, Apple **Smart App Banner** meta, `ios-app://` / `android-app://` alternate links, theme-color, dark mode, security + cache headers (`_headers`, `vercel.json`), clean-URL redirects, and `.well-known` placeholders for Universal Links / App Links.

Verified locally: `node scripts/seo-check.mjs` → 0 errors (broken links, canonicals, duplicate titles, JSON-LD validity, sitemap integrity). Lighthouse (mobile): Performance 99–100, SEO 100, Best Practices 100, Accessibility 100. LCP 0.7 s, CLS 0.

## 3. Things you must verify before deploy (all in `src/config/site.ts`)
1. **`appStoreId`** – set to `6762200959` (found as "PeptideOS+" on the App Store, matching the `peptideos-ios` repo). If getpepti.app ships under a different listing, change it.
2. **`playPackage`** – set to `com.utilityforge.peptideos`. Same caveat.
3. **`pricing`** – $9.99/mo, $69.99/yr and the free/Pro feature split were taken from the public listing.
4. **`rating.count`** – leave `0` until you have a real rating count; fake `AggregateRating` is a manual-action risk.
5. **`compoundCount`** (75), `founder`, `supportEmail`, `social` handles.
6. `public/.well-known/apple-app-site-association` (Team ID + bundle ID) and `assetlinks.json` (signing cert SHA-256) if you want Universal Links / App Links.
7. Feature claims in `src/pages/index.astro` and `features.astro` – trim anything the app does not actually do. Accuracy is an E-E-A-T signal and an App Store review issue.

## 4. Launch checklist (day 0–7)
1. Deploy `dist/` to Vercel, Netlify or Cloudflare Pages (`npm run build`). All three honour the included headers/redirect files. Point `getpepti.app` apex + `www` (301 www → apex).
2. **Google Search Console**: verify the domain property (DNS TXT), submit `https://getpepti.app/sitemap-index.xml`, request indexing for `/`, `/peptide-calculator`, `/best-peptide-tracker-apps`, `/track/bpc-157`, `/track/semaglutide`.
3. **Bing Webmaster Tools**: import from GSC; enable **IndexNow** (also feeds Yandex/Naver and is increasingly used by AI search).
4. Add the site URL to the **App Store** "Marketing URL" and "Support URL", and to the **Google Play** developer website + "Website" field. These are the two most valuable early backlinks and they also confirm the app ↔ site entity link.
5. Create a **Google Business Profile** only if you have a physical address; otherwise skip.
6. Set up rank tracking for the 30 keywords in Section 1.3 (Google Search Console "Performance" is enough to start; add a rank tracker later).

## 5. Off-page plan (weeks 1–12) – this is what actually moves the head term
The on-page work is done; #1 for "peptide tracker" is now a links-and-mentions problem. In priority order:

1. **Answer the Reddit thread in your screenshot** (r/Biohackers "What are you looking for in Peptide Tracker apps?") and the recurring "best peptide tracker?" threads in r/Peptides, r/Biohackers, r/Semaglutide, r/tirzepatidecompound, r/Mounjaro. Be useful, disclose you build Pepti, link to the **calculator** (not the homepage) – calculators earn upvotes and links.
2. **Get into every roundup** listed in 1.2. Email each with a one-line pitch and the press kit (icon, screenshots, feature list, pricing). Most are competitors, but several (mypepcalc, lynkdose, dosefi, peptideassistant, pinned.life, getmiora) are third-party enough to list you.
3. **Press release** via PR Newswire / EIN Presswire ("Pepti launches free peptide tracker with in-app reconstitution calculator"). peptidetracker.ai's entire authority comes from two of these; they syndicate to Yahoo Finance, Morningstar, etc.
4. **Product Hunt + AlternativeTo + Slashdot/SourceForge app directories + Uneed + BetaList**: cheap, permanent, relevant backlinks.
5. **YouTube**: a 3-minute "how to reconstitute BPC-157 and log it" walkthrough with the calculator; embed on `/peptide-calculator` (add a `VideoObject`). Video results appear on most peptide calculator SERPs.
6. **Calculator embed / widget**: offer a `<iframe>` embed of the calculator to peptide blogs and clinics (they get a free tool, you get a link).
7. **Comparison outreach**: each `/compare/pepti-vs-*` page is a natural target for "alternatives to X" queries; submit them to AlternativeTo.
8. **Brand consistency**: use exactly "Pepti: Peptide Tracker" as the App Store name and "Pepti: Peptide Tracker & Calculator" on Play (30-char limit), matching the site's `productName`. Same icon, same tagline everywhere. Register the X/Instagram/TikTok handles in `SITE.social`.

## 6. ASO – required to appear in the Apps carousel
The carousel at the top of the SERP is Apple App Store search. Ranking factors in 2026 weight **title keywords**, then subtitle, then ratings/retention:
- App name: `Pepti: Peptide Tracker` (keyword in title carries the most weight).
- Subtitle (30 chars): `GLP-1, Dose & Vial Calculator`.
- Keyword field (100 chars): `peptide,tracker,log,reconstitution,calculator,bpc-157,semaglutide,tirzepatide,injection,glp1,trt,vial`.
- Screenshots: first two must show the tracker and the calculator with the words "Peptide tracker" and "Reconstitution calculator" as captions.
- Ratings: prompt for a review after the 5th logged dose (SKStoreReviewController). Volume of recent ratings is the tie-breaker among the three apps in the carousel.
- Google Play: title `Pepti: Peptide Tracker & Calc`, short description with "peptide tracker" and "reconstitution calculator", long description is fully indexed – mirror the homepage copy.

## 7. Content cadence (ongoing)
Publish one guide or compound page per week. Highest-value additions, in order:
1. `/track/` pages for **ozempic**, **wegovy**, **mounjaro**, **zepbound** (brand-name intent, huge volume; aliases of existing pages – create thin-free pages with brand-specific FAQs, canonical to themselves).
2. Guides: "peptide dosage chart" (table page), "how many units is X mg", "BPC-157 + TB-500 stack schedule", "peptide side effects log", "peptide tracker spreadsheet template" (offer a downloadable CSV; earns links).
3. A `/help` centre with real support articles (PeptIQ ranks for dozens of long-tail support queries this way).
4. Refresh `/best-peptide-tracker-apps` quarterly and update `dateModified`.

## 8. Measurement
- Weekly: GSC impressions/clicks for the clusters in 1.3; index coverage (target: all 75 sitemap URLs indexed within 4 weeks).
- Monthly: referring domains (Ahrefs/Semrush free tier), App Store keyword ranks for "peptide tracker" (AppFigures/Astro).
- Realistic timeline for a new domain in this niche: calculator and per-compound pages start ranking in 4–8 weeks; top-3 for "peptide tracker" in 3–6 months with the off-page plan executed; #1 depends on out-earning peptidetracker.ai's press links and peptiq.io's content depth, both achievable.

## 9. Research limitations
- The sandbox's network policy blocked direct fetches of getpepti.app, all competitor sites and the app stores; findings come from search-engine snippets and your screenshots. I could not audit the current site's HTML, so this repo is a complete replacement rather than a patch.
- The private `peptideos-ios` repository could not be attached, so feature claims are based on the public listings; trim anything inaccurate.
