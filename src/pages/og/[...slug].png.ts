import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { renderOg } from '../../lib/og';
import { SITE } from '../../config/site';
import { PEPTIDES } from '../../data/peptides';
import { COMPETITORS } from '../../data/competitors';

export const getStaticPaths: GetStaticPaths = async () => {
  const guides = await getCollection('guides');
  const items: { slug: string; title: string; subtitle?: string }[] = [
    { slug: 'default', title: SITE.tagline, subtitle: 'Free on iPhone and Android' },
    { slug: 'peptide-calculator', title: 'Peptide reconstitution calculator', subtitle: 'mg/mL, mL and syringe units, free' },
    { slug: 'best-peptide-tracker-apps', title: 'Best peptide tracker apps in 2026', subtitle: '7 apps compared, free and paid' },
    ...PEPTIDES.map((p) => ({ slug: `track-${p.slug}`, title: `${p.name} tracker`, subtitle: `${p.frequency} · ${p.halfLifeText}` })),
    ...PEPTIDES.map((p) => ({ slug: `calc-${p.slug}`, title: `${p.name} dosage calculator`, subtitle: p.doseRangeText })),
    ...COMPETITORS.map((c) => ({ slug: `compare-${c.slug}`, title: `${SITE.name} vs ${c.name.split(' (')[0]}`, subtitle: 'Peptide tracker comparison, 2026' })),
    ...guides.map((g) => ({ slug: `guide-${g.id}`, title: g.data.title, subtitle: 'Peptide tracking guide' })),
  ];
  return items.map((i) => ({ params: { slug: i.slug }, props: i }));
};

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOg(props.title, props.subtitle);
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=31536000, immutable' } });
};
