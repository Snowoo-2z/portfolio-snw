import { useSettings } from '../lib/settings';

/** Calque de composition : la grille et la ligne de base du numéro. */
export function GridOverlay() {
  const { grid } = useSettings();

  return (
    <div className="grid-overlay" data-on={grid} aria-hidden="true">
      <div className="grid-overlay__baseline" />
      <div className="grid-overlay__cols">
        {Array.from({ length: 12 }, (_, index) => (
          <span key={index} />
        ))}
      </div>
      <div className="grid-overlay__note">Grille — 12 colonnes · ligne de base 8 px · accent #C9380F</div>
    </div>
  );
}
