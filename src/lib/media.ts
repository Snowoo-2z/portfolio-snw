import manifest from '../data/media.generated.json';

export type Variant = {
  src: string;
  width: number | null;
  height: number | null;
  ratio: number | null;
  bytes: number;
};

export type MediaEntry = Variant[];
export type ImageKey = 'hero' | 'flat' | 'logo' | 'detailPrint' | 'detailLogo' | 'siteCapture';

type Manifest = {
  atome: Record<ImageKey, MediaEntry | null>;
  ticketPlus: { shots: { id: string; variants: MediaEntry }[] };
  generatedAt: string | null;
};

export const media = manifest as unknown as Manifest;

export type PictureProps = {
  avif: string;
  webp: string;
  src: string;
  width: number;
  height: number;
};

/** Prépare les attributs d'un <picture> à partir des variantes générées. */
export function picture(entry: MediaEntry | null): PictureProps | null {
  if (!entry?.length) return null;
  const srcSet = (type: string) =>
    entry
      .filter((variant) => variant.src.endsWith(type))
      .map((variant) => `${variant.src} ${variant.width}w`)
      .join(', ');
  const widest = entry.reduce((a, b) => ((a.width ?? 0) >= (b.width ?? 0) ? a : b));
  const avif = srcSet('.avif');
  const webp = srcSet('.webp');
  const fallback = entry.find((variant) => variant.src.endsWith('.webp')) ?? widest;
  if (!avif && !webp) return null;
  return {
    avif,
    webp,
    src: fallback.src,
    width: widest.width ?? 1200,
    height: widest.height ?? Math.round((widest.width ?? 1200) * (widest.ratio ?? 0.66)),
  };
}

/** Poids réel des images du numéro, affiché dans le colophon (mesuré, pas estimé). */
export function mediaWeight(): { count: number; bytes: number } {
  const all: Variant[] = [];
  for (const entry of Object.values(media.atome)) if (entry) all.push(...entry);
  for (const shot of media.ticketPlus.shots) all.push(...shot.variants);
  const webp = all.filter((variant) => variant.src.endsWith('.webp'));
  return { count: webp.length, bytes: webp.reduce((total, variant) => total + variant.bytes, 0) };
}
