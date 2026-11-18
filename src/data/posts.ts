// Placeholder posts. Shape mirrors a future Sanity "post" document.
export interface Post { slug: string; title: string; date: string; excerpt: string; hue: number; rw: number; rh: number; body: string[]; image?: string; }
export const posts: Post[] = [
  { slug: 'notes-from-the-studio', title: 'Notes from the studio', date: '2026-11-10', hue: 30, rw: 3, rh: 2,
    excerpt: 'A look at what is on the easel this month and the ideas behind it.',
    body: ['Placeholder text. Write about what you are working on right now, the materials you are using, and what you are trying to figure out.', 'Placeholder text. A second paragraph about the process, the setbacks, and what comes next.'] },
  { slug: 'on-color-and-quiet', title: 'On color and quiet', date: '2026-10-22', hue: 200, rw: 3, rh: 2,
    excerpt: 'Why the palette stays restrained, and what a single warm note can do.',
    body: ['Placeholder text. Explain a choice in your work, such as color, composition, or subject.', 'Placeholder text. Connect it to a specific painting in the gallery.'] },
  { slug: 'behind-quiet-tide', title: 'Behind Quiet Tide', date: '2026-09-30', hue: 260, rw: 3, rh: 2,
    excerpt: 'The story of one painting, from first sketch to the final layer.',
    body: ['Placeholder text. Describe where the painting began and how it changed along the way.', 'Placeholder text. Share what you learned and what you would do differently.'] },
];
export const fmtDate = (d: string) => new Date(d).toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
