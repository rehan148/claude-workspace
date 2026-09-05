import sharp from 'sharp';
import { SITE } from '../config/site';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Wrap text into lines of roughly `max` characters. */
function wrap(text: string, max: number, maxLines: number) {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > max && cur) { lines.push(cur); cur = w; } else { cur = (cur + ' ' + w).trim(); }
  }
  if (cur) lines.push(cur);
  if (lines.length > maxLines) { lines.length = maxLines; lines[maxLines - 1] = lines[maxLines - 1].replace(/\s+\S*$/, '') + '…'; }
  return lines;
}

export async function renderOg(title: string, subtitle = SITE.tagline): Promise<Buffer> {
  const lines = wrap(title, 30, 3);
  const size = lines.length > 2 ? 60 : 72;
  const startY = 250 - ((lines.length - 1) * size) / 2;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0b1220"/><stop offset="1" stop-color="#1e3a8a"/></linearGradient></defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="1050" cy="120" r="220" fill="#2563eb" opacity=".25"/>
  <circle cx="150" cy="560" r="180" fill="#34d399" opacity=".18"/>
  <g transform="translate(80,80)"><rect width="64" height="64" rx="16" fill="#2563eb"/><path d="M20 46V18h13a10 10 0 0 1 0 20h-6" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="44" cy="44" r="5" fill="#34d399"/></g>
  <text x="164" y="126" font-family="-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif" font-size="40" font-weight="800" fill="#fff">${esc(SITE.name)}</text>
  ${lines.map((l, i) => `<text x="80" y="${startY + i * size}" font-family="-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif" font-size="${size}" font-weight="800" fill="#fff">${esc(l)}</text>`).join('')}
  <text x="80" y="${startY + (lines.length - 1) * size + 70}" font-family="-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif" font-size="30" fill="#c7d2fe">${esc(wrap(subtitle, 60, 1)[0] ?? '')}</text>
  <text x="80" y="570" font-family="-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif" font-size="26" fill="#93c5fd">${esc(SITE.url.replace('https://', ''))}</text>
</svg>`;
  return sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
}
