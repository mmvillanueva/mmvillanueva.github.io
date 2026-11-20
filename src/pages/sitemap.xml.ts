import type { APIRoute } from 'astro';
import { works } from '../data/works';
import { posts } from '../data/posts';

export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const paths = ['/', '/about/', '/blog/', '/contact/',
    ...works.map((w) => `/works/${w.slug}/`), ...posts.map((p) => `/blog/${p.slug}/`)];
  const urls = paths.map((p) => `  <url><loc>${new URL(base + p, site).href}</loc></url>`).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml' } });
};
