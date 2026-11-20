// Placeholder posts. Shape mirrors a future Sanity "post" document.
export interface Post { slug: string; title: string; date: string; excerpt: string; hue: number; rw: number; rh: number; body: string[]; image?: string; }
export const posts: Post[] = [
  { slug: 'notes-from-the-studio', title: 'Notes from the studio', date: '2026-11-10', hue: 30, rw: 3, rh: 2,
    excerpt: 'A look at what is on the easel this month and the ideas behind it.',
    body: ['The easel holds a small oil study this month, something quiet and domestic—a table by the window with morning light falling across it. I have been working with a limited palette, mostly ochre, raw umber, and a touch of cadmium red, trying to let the light do the heavy lifting.', 'The process has been slower than usual. I scrape back more than I keep, waiting for the surface to feel settled rather than forced. What comes next is a larger canvas, likely something from the garden, but only once this small piece has told me what it needs to.'] },
  { slug: 'on-color-and-quiet', title: 'On color and quiet', date: '2026-10-22', hue: 200, rw: 3, rh: 2,
    excerpt: 'Why the palette stays restrained, and what a single warm note can do.',
    body: ['I tend to keep the palette restrained—greys, blues, and earth tones for the most part. Color, when it appears, is deliberate rather than decorative. A single warm note, a patch of ochre or a thin line of red, can anchor an entire composition without overwhelming it.', 'This idea comes through clearly in "Ember Field," where the warmth is contained to one corner of the panel. The rest of the work stays cool and quiet, allowing that small heat to do its work without demanding attention.'] },
  { slug: 'behind-quiet-tide', title: 'Behind Quiet Tide', date: '2026-09-30', hue: 260, rw: 3, rh: 2,
    excerpt: 'The story of one painting, from first sketch to the final layer.',
    body: ['"Quiet Tide" began as a small charcoal sketch made during a trip to the coast. I was interested in the flatness of low tide, the way the wet sand held the sky like a mirror, and how the horizon nearly disappeared.', 'The painting changed several times before it settled. Early versions had more detail—boats, a distant figure, a line of rocks—but each addition pulled the eye away from the stillness I was after. In the end I removed them, leaving only water, sand, and light, and the work finally felt finished.'] },
];
export const fmtDate = (d: string) => new Date(d).toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
