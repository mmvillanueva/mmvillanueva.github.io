// Placeholder data. Shape mirrors the future Sanity "artwork" schema.
export type Status = 'available' | 'reserved' | 'sold';
export interface Work { no: string; slug: string; title: string; year: number; medium: string;
  size: string; status: Status; price: string; note: string; hue: number; rw: number; rh: number; image?: string; }
export const works: Work[] = [
  { no: '001', slug: 'quiet-tide', title: 'Quiet Tide', year: 2025, medium: 'Oil on canvas', size: '90 × 120 cm', status: 'available', price: '₱ 85,000', note: 'Placeholder description for this work.', hue: 200, rw: 4, rh: 5 },
  { no: '002', slug: 'ember-field', title: 'Ember Field', year: 2025, medium: 'Acrylic on panel', size: '60 × 80 cm', status: 'available', price: '₱ 48,000', note: 'Placeholder description for this work.', hue: 28, rw: 1, rh: 1 },
  { no: '003', slug: 'low-light', title: 'Low Light', year: 2024, medium: 'Charcoal on paper', size: '50 × 70 cm', status: 'reserved', price: '₱ 32,000', note: 'Placeholder description for this work.', hue: 260, rw: 5, rh: 4 },
  { no: '004', slug: 'salt-and-iron', title: 'Salt & Iron', year: 2024, medium: 'Mixed media', size: '100 × 100 cm', status: 'sold', price: '₱ 120,000', note: 'Placeholder description for this work.', hue: 150, rw: 3, rh: 4 },
  { no: '005', slug: 'after-rain', title: 'After Rain', year: 2023, medium: 'Oil on linen', size: '70 × 90 cm', status: 'available', price: '₱ 64,000', note: 'Placeholder description for this work.', hue: 330, rw: 4, rh: 3 },
  { no: '006', slug: 'night-garden', title: 'Night Garden', year: 2025, medium: 'Oil on canvas', size: '60 × 90 cm', status: 'available', price: '₱ 58,000', note: 'Placeholder description for this work.', hue: 120, rw: 2, rh: 3 },
  { no: '007', slug: 'paper-moon', title: 'Paper Moon', year: 2025, medium: 'Watercolor on paper', size: '30 × 40 cm', status: 'available', price: '₱ 18,000', note: 'Placeholder description for this work.', hue: 45, rw: 3, rh: 4 },
  { no: '008', slug: 'still-water', title: 'Still Water', year: 2024, medium: 'Oil on linen', size: '120 × 80 cm', status: 'sold', price: '₱ 150,000', note: 'Placeholder description for this work.', hue: 190, rw: 3, rh: 2 },
  { no: '009', slug: 'copper-hour', title: 'Copper Hour', year: 2024, medium: 'Acrylic on canvas', size: '80 × 80 cm', status: 'reserved', price: '₱ 72,000', note: 'Placeholder description for this work.', hue: 20, rw: 1, rh: 1 },
  { no: '010', slug: 'fold', title: 'Fold', year: 2024, medium: 'Ink on paper', size: '40 × 60 cm', status: 'available', price: '₱ 22,000', note: 'Placeholder description for this work.', hue: 300, rw: 2, rh: 3 },
  { no: '011', slug: 'harbor-grey', title: 'Harbor Grey', year: 2023, medium: 'Oil on panel', size: '50 × 40 cm', status: 'sold', price: '₱ 45,000', note: 'Placeholder description for this work.', hue: 215, rw: 5, rh: 4 },
  { no: '012', slug: 'last-light', title: 'Last Light', year: 2023, medium: 'Mixed media', size: '100 × 125 cm', status: 'available', price: '₱ 135,000', note: 'Placeholder description for this work.', hue: 60, rw: 4, rh: 5 },
];
export const artist = { name: 'Artist Name', email: 'hello@example.com',
  statement: 'A short artist statement goes here. Two or three sentences about the work, the process, and what draws the artist to it.' };
