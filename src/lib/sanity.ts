import { createClient } from '@sanity/client';

// Project ID and dataset are public identifiers (they appear in every public Sanity URL), so no secrets are needed.
// The dataset is public, so published content can be read at build time without a token.
export const sanity = createClient({
  projectId: 't33pzyyd',
  dataset: 'production',
  apiVersion: '2025-02-19',
  useCdn: false, // builds must see the newest content, not a cached copy
  perspective: 'published', // never include drafts
});

export interface SanityImage { url: string; w: number; h: number; }

// Query fragment: reads the document field `field` and returns it under the name `as`
// (the image URL plus its real pixel size, used for the aspect ratio).
export const imageFields = (field: string, as: string = field) =>
  `"${as}": ${field}.asset->{ url, "w": metadata.dimensions.width, "h": metadata.dimensions.height }`;

// Stable placeholder colour for items that have no photo yet.
export const hueFor = (s: string) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) % 360, 7);

// Full-size Sanity CDN URL (Plate adds responsive sizes from it).
export const cdn = (img?: SanityImage | null) => (img?.url ? `${img.url}?w=1600&auto=format&q=82` : undefined);
