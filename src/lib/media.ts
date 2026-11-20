// Turns the "Featured media" field of a blog post into something the page can render.
import type { SanityImage } from './sanity';
import { cdn } from './sanity';

export type PostMedia =
  | { type: 'image'; src: string; w: number; h: number; caption?: string }
  | { type: 'linkImage'; src: string; caption?: string }
  | { type: 'video'; src: string; mime: string; poster?: string; caption?: string }
  | { type: 'embed'; src: string; provider: 'YouTube' | 'Vimeo'; caption?: string };

export interface RawMedia {
  kind?: string | null; caption?: string | null; link?: string | null;
  photo?: SanityImage | null; video?: { url: string; mimeType?: string | null } | null; poster?: SanityImage | null;
}

const VIDEO_MIME: Record<string, string> = { mp4: 'video/mp4', m4v: 'video/mp4', mov: 'video/mp4', webm: 'video/webm', ogv: 'video/ogg' };
const IMAGE_EXT = /\.(jpe?g|png|webp|avif|gif)$/i;

// YouTube and Vimeo page links -> privacy-friendly embed addresses. Returns undefined for anything else.
export function parseEmbed(raw: string): { src: string; provider: 'YouTube' | 'Vimeo' } | undefined {
  let u: URL;
  try { u = new URL(raw.trim()); } catch { return undefined; }
  if (u.protocol !== 'https:') return undefined;
  const host = u.hostname.replace(/^(www|m|player)\./, '');
  const parts = u.pathname.split('/').filter(Boolean);
  if (host === 'youtu.be' || host === 'youtube.com') {
    const id = host === 'youtu.be' ? parts[0]
      : u.searchParams.get('v') ?? (['shorts', 'embed', 'live', 'v'].includes(parts[0]) ? parts[1] : undefined);
    return id && /^[\w-]{11}$/.test(id) ? { src: `https://www.youtube-nocookie.com/embed/${id}`, provider: 'YouTube' } : undefined;
  }
  if (host === 'vimeo.com') {
    const [a, b, c] = parts[0] === 'video' ? parts.slice(1) : parts; // vimeo.com/ID, vimeo.com/ID/HASH, player.vimeo.com/video/ID
    const hash = u.searchParams.get('h') ?? (/^[0-9a-f]+$/i.test(b ?? '') ? b : /^[0-9a-f]+$/i.test(c ?? '') ? c : undefined);
    return a && /^\d+$/.test(a)
      ? { src: `https://player.vimeo.com/video/${a}?dnt=1${hash ? `&h=${hash}` : ''}`, provider: 'Vimeo' } : undefined;
  }
  return undefined;
}

export function toMedia(m?: RawMedia | null): PostMedia | undefined {
  if (!m?.kind) return undefined;
  const caption = m.caption?.trim() || undefined;
  if (m.kind === 'image' && m.photo?.url) return { type: 'image', src: cdn(m.photo)!, w: m.photo.w ?? 4, h: m.photo.h ?? 3, caption };
  if (m.kind === 'video' && m.video?.url)
    return { type: 'video', src: m.video.url, mime: m.video.mimeType || 'video/mp4', poster: m.poster?.url ? cdn(m.poster) : undefined, caption };
  if (m.kind === 'link' && m.link) {
    const embed = parseEmbed(m.link);
    if (embed) return { type: 'embed', ...embed, caption };
    let u: URL;
    try { u = new URL(m.link.trim()); } catch { return undefined; }
    if (u.protocol !== 'https:') return undefined;
    const ext = u.pathname.split('.').pop()?.toLowerCase() ?? '';
    if (VIDEO_MIME[ext]) return { type: 'video', src: u.href, mime: VIDEO_MIME[ext], caption };
    if (IMAGE_EXT.test(u.pathname)) return { type: 'linkImage', src: u.href, caption };
  }
  return undefined; // unknown or empty: the page falls back to the cover image
}
