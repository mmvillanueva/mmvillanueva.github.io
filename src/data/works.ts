// Content comes from Sanity (project t33pzyyd) at build time. Shapes are unchanged so pages need no edits.
import { sanity, imageFields, hueFor, cdn, type SanityImage } from '../lib/sanity';
export type Status = 'available' | 'reserved' | 'sold';
export interface Work { no: string; slug: string; title: string; year: number; medium: string;
  size: string; status: Status; price: number; note: string; hue: number; rw: number; rh: number; image?: string; }
const rows = await sanity.fetch<Array<Omit<Work, 'image' | 'hue' | 'rw' | 'rh'> & { img?: SanityImage | null }>>(
  `*[_type == "artwork" && defined(slug.current)] | order(no asc) {
    no, "slug": slug.current, title, year, medium, size, status, price, note, ${imageFields('image', 'img')}
  }`
);
export const works: Work[] = rows.map(({ img, ...w }) => ({
  ...w,
  image: cdn(img),
  hue: hueFor(w.slug),
  rw: img?.w ?? 4,
  rh: img?.h ?? 5,
}));
export const formatPrice = (n: number) =>
  new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 }).format(n);
type Hotspot = { x: number; y: number };
const defaults = { name: 'Mario Villanueva', email: '', statement: '' };
const a = await sanity.fetch<{ name?: string; email?: string; statement?: string; portrait?: SanityImage | null; studio?: SanityImage | null; portraitHotspot?: Hotspot | null; studioHotspot?: Hotspot | null } | null>(
  `*[_id == "artist"][0] { name, email, statement, ${imageFields('portrait')}, "portraitHotspot": portrait.hotspot{ x, y }, ${imageFields('studio')}, "studioHotspot": studio.hotspot{ x, y } }`
);
// Focus point chosen in the Studio (hotspot), used to decide what stays visible when a photo is cropped to its frame.
const focus = (h?: Hotspot | null) => (h ? `${(h.x * 100).toFixed(1)}% ${(h.y * 100).toFixed(1)}%` : 'center');
const { portrait, studio, portraitHotspot, studioHotspot, ...text } = a ?? {};
export const artist = { ...defaults, ...Object.fromEntries(Object.entries(text).filter(([, v]) => v)),
  portrait: cdn(portrait), studio: cdn(studio), portraitFocus: focus(portraitHotspot), studioFocus: focus(studioHotspot) } as
  typeof defaults & { portrait?: string; studio?: string; portraitFocus: string; studioFocus: string };
