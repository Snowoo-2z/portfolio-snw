import { chapters } from '../data/chapters';
import { useSettings } from '../lib/settings';

/** Trois icônes dessinées, aucun jeu d'icônes chargé. */
const icons = {
  index: (
    <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d="M1 3h14M1 8h14M1 13h9" stroke="currentColor" strokeWidth="1.2" fill="none" />
    </svg>
  ),
  grid: (
    <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <g stroke="currentColor" strokeWidth="1" fill="none">
        <path d="M1 1h14v14H1zM1 5.6h14M1 10.3h14M5.6 1v14M10.3 1v14" />
      </g>
    </svg>
  ),
  motion: (
    <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <g stroke="currentColor" strokeWidth="1.2" fill="none">
        <circle cx="8" cy="8" r="6.4" />
        <path d="M8 4.4V8l2.6 1.8" />
      </g>
    </svg>
  ),
};

export function Rail({ active, onOpenIndex }: { active: string; onOpenIndex: () => void }) {
  const { motion, grid, toggleMotion, toggleGrid } = useSettings();
  const chapter = chapters.find((item) => item.id === active) ?? chapters[0];

  return (
    <div className="rail" role="navigation" aria-label="Repères de lecture">
      <a className="rail__mark" href="#couverture" aria-label="Revenir à la couverture">
        snw
      </a>

      <div className="rail__running" aria-hidden="true">
        <span className="rail__folio">{chapter.folio}</span>
        <span className="rail__current">
          <span key={chapter.id}>{chapter.title}</span>
        </span>
      </div>

      <div className="rail__tools">
        <button
          type="button"
          className="tool"
          onClick={onOpenIndex}
          aria-label="Ouvrir le sommaire"
          title="Sommaire (S)"
        >
          {icons.index}
        </button>
        <button
          type="button"
          className="tool"
          onClick={toggleGrid}
          aria-pressed={grid}
          aria-label="Afficher la grille de composition"
          title="Grille de composition (G)"
        >
          {icons.grid}
        </button>
        <button
          type="button"
          className="tool"
          onClick={toggleMotion}
          aria-pressed={!motion}
          aria-label={motion ? 'Réduire les animations' : 'Rétablir les animations'}
          title="Animations (M)"
        >
          {icons.motion}
        </button>
      </div>

      <div className="rail__progress-track" aria-hidden="true">
        <span className="rail__progress" />
      </div>
    </div>
  );
}
