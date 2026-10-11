import { picture, type MediaEntry } from '../lib/media';

type Props = {
  entry: MediaEntry | null;
  alt: string;
  fig?: string;
  caption: string;
  source?: string;
  /** Largeur d'affichage attendue, pour choisir la bonne variante. */
  sizes?: string;
  priority?: boolean;
  pan?: boolean;
  className?: string;
  /** Texte de l'emplacement quand l'image n'est pas encore là. */
  slotHint?: string;
  slotTag?: string;
};

function Caption({ fig, caption, source }: Pick<Props, 'fig' | 'caption' | 'source'>) {
  return (
    <figcaption className="plate-figure__caption">
      {fig ? <span className="plate-figure__fig">{fig}</span> : null}
      <span className="plate-figure__text">{caption}</span>
      {source ? <span className="plate-figure__src">{source}</span> : null}
    </figcaption>
  );
}

/**
 * Une planche d'image. Si le fichier n'existe pas encore, on dessine
 * l'emplacement plutôt que d'afficher une image cassée.
 */
export function MediaPlate({
  entry,
  alt,
  fig,
  caption,
  source,
  sizes = '(min-width: 900px) 60vw, 100vw',
  priority = false,
  pan = false,
  className = '',
  slotHint,
  slotTag = 'Image —',
}: Props) {
  const sources = picture(entry);

  if (!sources) {
    return (
      <div className={`plate-figure ${className}`.trim()}>
        <div className="plate-figure__frame">
          <div className="slot">
            <span className="slot__tag">{slotTag}</span>
            {slotHint ? <span className="slot__hint">{slotHint}</span> : null}
          </div>
        </div>
        <Caption fig={fig} caption={caption} source={source} />
      </div>
    );
  }

  return (
    <figure className={`plate-figure${pan ? ' plate-figure--pan' : ''} ${className}`.trim()}>
      <div className="plate-figure__frame">
        <picture>
          {sources.avif ? <source srcSet={sources.avif} type="image/avif" sizes={sizes} /> : null}
          {sources.webp ? <source srcSet={sources.webp} type="image/webp" sizes={sizes} /> : null}
          <img
            src={sources.src}
            width={sources.width}
            height={sources.height}
            alt={alt}
            sizes={sizes}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
          />
        </picture>
      </div>
      <Caption fig={fig} caption={caption} source={source} />
    </figure>
  );
}

/** Emplacement libre pour les captures à venir (bot Discord, second aperçu). */
export function EmptySlot({ label, hint }: { label: string; hint: string }) {
  return (
    <div className="shots__empty">
      <b>{label}</b>
      <span>{hint}</span>
    </div>
  );
}
