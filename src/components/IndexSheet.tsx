import { useEffect, useRef } from 'react';
import { chapters } from '../data/chapters';
import { site } from '../data/site';

/** Le sommaire plein écran : une vraie page, accessible au clavier. */
export function IndexSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  /* Le défilement de la page est rendu à l'utilisateur à la fermeture. */
  useEffect(() => {
    if (!open) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = previous;
    };
  }, [open]);

  const go = (id: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onClose();
    const target = document.getElementById(id);
    if (!target) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <dialog
      className="index-sheet"
      ref={ref}
      aria-label="Sommaire du numéro"
      onClose={onClose}
      onCancel={onClose}
    >
      <div className="index-sheet__inner">
        <div className="index-sheet__top">
          <span className="folio">
            <span className="folio__num">Sommaire</span>
            <span className="folio__label">{site.edition.label}</span>
          </span>
          <button type="button" className="action" onClick={onClose}>
            <span>Fermer</span>
            <span className="action__arrow" aria-hidden="true">
              ✕
            </span>
          </button>
        </div>

        <nav className="index-sheet__list" aria-label="Chapitres">
          {chapters.map((chapter) => (
            <a key={chapter.id} className="index-sheet__link" href={`#${chapter.id}`} onClick={go(chapter.id)}>
              <span className="index-sheet__folio">{chapter.folio}</span>
              <span>
                {chapter.title}
                <span className="note" style={{ display: 'block', marginTop: '0.4rem' }}>
                  {chapter.desc}
                </span>
              </span>
            </a>
          ))}
        </nav>

        <p className="index-sheet__meta">
          <span>{site.role}</span>
          <span>
            Raccourcis — G : grille · M : animations
          </span>
        </p>
      </div>
    </dialog>
  );
}
