import sharp from 'sharp';
import { mkdirSync, writeFileSync } from 'node:fs';
const svg = (size) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${size}" height="${size}"><rect width="64" height="64" rx="16" fill="#2563eb"/><path d="M20 46V18h13a10 10 0 0 1 0 20h-6" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="44" cy="44" r="5" fill="#34d399"/></svg>`;
mkdirSync('public/icons', { recursive: true });
writeFileSync('public/favicon.svg', svg(64));
for (const [name, size] of [['icons/icon-192.png', 192], ['icons/icon-512.png', 512], ['icons/apple-touch-icon.png', 180], ['icons/icon-32.png', 32]]) {
  await sharp(Buffer.from(svg(size))).png().toFile(`public/${name}`);
}
// favicon.ico: browsers accept a PNG payload with .ico name poorly; generate a real ICO via sharp is unsupported, so emit 32px PNG bytes wrapped in ICO container.
const png = await sharp(Buffer.from(svg(32))).png().toBuffer();
const header = Buffer.alloc(6); header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4);
const entry = Buffer.alloc(16); entry[0] = 32; entry[1] = 32; entry[2] = 0; entry[3] = 0; entry.writeUInt16LE(1, 4); entry.writeUInt16LE(32, 6); entry.writeUInt32LE(png.length, 8); entry.writeUInt32LE(22, 12);
writeFileSync('public/favicon.ico', Buffer.concat([header, entry, png]));
console.log('icons generated');
