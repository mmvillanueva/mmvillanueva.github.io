// Placeholder data. Shape mirrors the future Sanity "artwork" schema.
export type Status = 'available' | 'reserved' | 'sold';
export interface Work { no: string; slug: string; title: string; year: number; medium: string;
  size: string; status: Status; price: string; note: string; hue: number; }
export const works: Work[] = [
  { no: '001', slug: 'quiet-tide', title: 'Quiet Tide', year: 2025, medium: 'Oil on canvas', size: '90 × 120 cm', status: 'available', price: '₱ 85,000', note: 'Placeholder description for this work.', hue: 200 },
  { no: '002', slug: 'ember-field', title: 'Ember Field', year: 2025, medium: 'Acrylic on panel', size: '60 × 80 cm', status: 'available', price: '₱ 48,000', note: 'Placeholder description for this work.', hue: 28 },
  { no: '003', slug: 'low-light', title: 'Low Light', year: 2024, medium: 'Charcoal on paper', size: '50 × 70 cm', status: 'reserved', price: '₱ 32,000', note: 'Placeholder description for this work.', hue: 260 },
  { no: '004', slug: 'salt-and-iron', title: 'Salt & Iron', year: 2024, medium: 'Mixed media', size: '100 × 100 cm', status: 'sold', price: '₱ 120,000', note: 'Placeholder description for this work.', hue: 150 },
  { no: '005', slug: 'after-rain', title: 'After Rain', year: 2023, medium: 'Oil on linen', size: '70 × 90 cm', status: 'available', price: '₱ 64,000', note: 'Placeholder description for this work.', hue: 330 },
];
export const artist = { name: 'Artist Name', email: 'hello@example.com',
  statement: 'A short artist statement goes here. Two or three sentences about the work, the process, and what draws the artist to it.' };
