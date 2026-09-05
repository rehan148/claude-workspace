import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../config/site';
export const GET: APIRoute = async (context) => {
  const guides = (await getCollection('guides')).sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());
  return rss({
    title: `${SITE.name} guides`,
    description: 'Practical guides on tracking peptide protocols, reconstitution, rotation and cycles.',
    site: context.site!,
    items: guides.map((g) => ({ title: g.data.title, description: g.data.description, pubDate: g.data.publishedAt, link: `/guides/${g.id}` })),
    customData: '<language>en</language>',
  });
};
