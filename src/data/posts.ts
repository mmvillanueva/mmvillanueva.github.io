// Content comes from Sanity (project t33pzyyd) at build time.
import { sanity, imageFields, hueFor, cdn, type SanityImage } from '../lib/sanity';
export interface Post { slug: string; title: string; date: string; excerpt: string; hue: number; rw: number; rh: number; body: string[]; image?: string; }
const rows = await sanity.fetch<Array<{ slug: string; title: string; date: string; excerpt: string; body: string; img?: SanityImage | null }>>(
  `*[_type == "post" && defined(slug.current)] | order(date desc) {
    "slug": slug.current, title, date, excerpt, body, ${imageFields('image', 'img')}
  }`
);
// The editor writes plain text; a blank line separates paragraphs.
export const posts: Post[] = rows.map(({ img, body, ...p }) => ({
  ...p,
  body: (body ?? '').split(/\n\s*\n/).map((t) => t.trim()).filter(Boolean),
  image: cdn(img),
  hue: hueFor(p.slug),
  rw: img?.w ?? 3,
  rh: img?.h ?? 2,
}));
export const fmtDate = (d: string) => new Date(d).toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
