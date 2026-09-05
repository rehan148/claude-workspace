/**
 * Static SEO audit of ./dist. Fails (exit 1) on hard errors, prints warnings otherwise.
 * Checks: title/description presence and length, exactly one H1, canonical == expected URL,
 * internal links resolve to built files, JSON-LD parses, OG image exists, no duplicate titles/descriptions.
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = 'dist';
const SITE = 'https://getpepti.app';
const errors = [], warns = [];
const files = [];
(function walk(d) { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && files.push(p); } })(DIST);

const exists = (path) => {
  const clean = path.split('#')[0].split('?')[0];
  if (clean === '/' || clean === '') return existsSync(join(DIST, 'index.html'));
  const p = clean.replace(/^\//, '').replace(/\/$/, '');
  return existsSync(join(DIST, p)) || existsSync(join(DIST, p + '.html')) || existsSync(join(DIST, p, 'index.html'));
};
const titles = new Map(), descs = new Map();
for (const f of files) {
  const html = readFileSync(f, 'utf8');
  const rel = '/' + relative(DIST, f).replace(/\\/g, '/').replace(/index\.html$/, '').replace(/\.html$/, '');
  const url = rel === '/' ? '/' : rel.replace(/\/$/, '');
  const is404 = url === '/404';
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  const canon = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || '';
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  const og = (html.match(/<meta property="og:image" content="([^"]*)"/) || [])[1] || '';
  if (!title) errors.push(`${url}: missing <title>`);
  if (title.length > 70) warns.push(`${url}: title ${title.length} chars (>70): "${title}"`);
  if (!desc) errors.push(`${url}: missing meta description`);
  if (desc.length > 165) warns.push(`${url}: description ${desc.length} chars (>165)`);
  if (desc.length && desc.length < 70) warns.push(`${url}: description short (${desc.length})`);
  if (h1s !== 1) errors.push(`${url}: ${h1s} <h1> tags`);
  if (!is404 && canon !== SITE + (url === '/' ? '/' : url)) errors.push(`${url}: canonical mismatch: ${canon}`);
  if (og && og.startsWith(SITE) && !exists(og.slice(SITE.length))) errors.push(`${url}: og:image not built: ${og}`);
  if (!is404) { if (titles.has(title)) errors.push(`${url}: duplicate title with ${titles.get(title)}`); titles.set(title, url); }
  if (!is404) { if (descs.has(desc)) errors.push(`${url}: duplicate description with ${descs.get(desc)}`); descs.set(desc, url); }
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { const j = JSON.parse(m[1]); if (!j['@context']) errors.push(`${url}: JSON-LD missing @context`); } catch (e) { errors.push(`${url}: invalid JSON-LD: ${e.message}`); }
  }
  for (const m of html.matchAll(/href="(\/[^"]*)"/g)) { if (!exists(m[1])) errors.push(`${url}: broken internal link ${m[1]}`); }
  for (const m of html.matchAll(/src="(\/[^"]*)"/g)) { if (!exists(m[1])) errors.push(`${url}: missing asset ${m[1]}`); }
  if (/<a [^>]*href="https?:\/\/(?!getpepti\.app)[^"]*"(?![^>]*rel=)/.test(html)) warns.push(`${url}: external link without rel attribute`);
  if (!/<html lang="en">/.test(html)) errors.push(`${url}: missing lang`);
  if (!/<meta name="viewport"/.test(html)) errors.push(`${url}: missing viewport`);
}
for (const req of ['robots.txt', 'sitemap-index.xml', 'sitemap-0.xml', 'manifest.webmanifest', 'llms.txt', 'rss.xml', 'favicon.ico', 'og/default.png', '.well-known/apple-app-site-association']) {
  if (!existsSync(join(DIST, req))) errors.push(`missing ${req}`);
}
const sm = existsSync(join(DIST, 'sitemap-0.xml')) ? readFileSync(join(DIST, 'sitemap-0.xml'), 'utf8') : '';
const smUrls = [...sm.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1]);
for (const u of smUrls) { const p = u.replace(SITE, ''); if (!exists(p || '/')) errors.push(`sitemap URL not built: ${u}`); if (/\.html$/.test(u)) errors.push(`sitemap URL has .html: ${u}`); }
console.log(`Checked ${files.length} pages, ${smUrls.length} sitemap URLs.`);
warns.forEach((w) => console.log('WARN', w));
errors.forEach((e) => console.log('ERROR', e));
console.log(`${errors.length} errors, ${warns.length} warnings`);
process.exit(errors.length ? 1 : 0);
