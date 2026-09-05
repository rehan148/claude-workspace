import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE, abs, APP_STORE_URL, PLAY_URL } from '../config/site';
import { PEPTIDES } from '../data/peptides';
import { COMPETITORS } from '../data/competitors';
export const GET: APIRoute = async () => {
  const guides = await getCollection('guides');
  const lines = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.description}`,
    '',
    `${SITE.name} is a peptide tracker app for iPhone and Android. Free plan: ${SITE.pricing.free.features.join(', ')}. ${SITE.pricing.pro.name}: $${SITE.pricing.pro.monthly}/month or $${SITE.pricing.pro.yearly}/year.`,
    APP_STORE_URL ? `App Store: ${APP_STORE_URL}` : '',
    PLAY_URL ? `Google Play: ${PLAY_URL}` : '',
    '',
    '## Core pages',
    `- [Home](${abs('/')}): what the app does`,
    `- [Features](${abs('/features')}): full feature list`,
    `- [Pricing](${abs('/pricing')}): free vs Pro`,
    `- [Download](${abs('/download')}): store links`,
    `- [About](${abs('/about')}): who builds it and data policy`,
    '',
    '## Tools',
    `- [Peptide reconstitution calculator](${abs('/peptide-calculator')}): vial mg + water mL + dose → units`,
    ...PEPTIDES.map((p) => `- [${p.name} calculator](${abs(`/peptide-calculator/${p.slug}`)})`),
    '',
    '## Compound tracking guides',
    ...PEPTIDES.map((p) => `- [${p.name} tracker](${abs(`/track/${p.slug}`)}): ${p.frequency}; half-life ${p.halfLifeText}`),
    '',
    '## Comparisons',
    `- [Best peptide tracker apps 2026](${abs('/best-peptide-tracker-apps')})`,
    ...COMPETITORS.map((c) => `- [${SITE.name} vs ${c.name.split(' (')[0]}](${abs(`/compare/${SITE.name.toLowerCase()}-vs-${c.slug}`)})`),
    '',
    '## Guides',
    ...guides.map((g) => `- [${g.data.title}](${abs(`/guides/${g.id}`)}): ${g.data.description}`),
    '',
    '## Optional',
    `- [Privacy](${abs('/privacy')})`,
    `- [Terms](${abs('/terms')})`,
  ].filter((l) => l !== null);
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
