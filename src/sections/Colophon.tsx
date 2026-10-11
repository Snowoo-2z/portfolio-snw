import { honesty, site, sources } from '../data/site';
import { useClock } from '../lib/hooks';
import { mediaWeight } from '../lib/media';
import { useSettings } from '../lib/settings';

export function Colophon() {
  const time = useClock();
  const { motion, grid, toggleMotion, toggleGrid } = useSettings();
  const weight = mediaWeight();
  const kilo = Math.round(weight.bytes / 1024);

  return (
    <footer className="colophon" id="colophon" aria-labelledby="colophon-title">
      <div className="plate">
        <h2 className="u-visually-hidden" id="colophon-title">
          Colophon
        </h2>
        <p className="colophon__word" aria-hidden="true">
          snw
        </p>

        <div className="grid colophon__cols">
          <div className="colophon__col p-1-4">
            <h3>Composition</h3>
            <p>
              Archivo, Newsreader et IBM Plex Mono, auto-hébergées, sous licence SIL Open Font License. Grille de
              douze colonnes, ligne de base de huit pixels, un seul accent — #C9380F — pour les annotations.
            </p>
          </div>

          <div className="colophon__col p-4-7">
            <h3>Technique</h3>
            <ul>
              <li>Page statique générée avec Vite, écrite en React et TypeScript.</li>
              <li>Aucune bibliothèque d’animation : les mouvements sont en CSS.</li>
              <li>Aucune police ni ressource chargée depuis un domaine tiers.</li>
              <li>Aucun cookie, aucun traceur, aucune mesure d’audience.</li>
              {weight.count > 0 ? (
                <li>
                  Images : {weight.count} variantes WebP générées, {kilo} Ko au total, servies en WebP et AVIF.
                </li>
              ) : null}
            </ul>
          </div>

          <div className="colophon__col p-7-10">
            <h3>Sources</h3>
            <p style={{ marginBottom: '0.6rem' }}>{honesty.text}</p>
            <ul>
              {sources.map((source) => (
                <li key={source.label}>
                  <a className="link" href={source.url} target="_blank" rel="noreferrer noopener">
                    {source.label}
                  </a>{' '}
                  — {source.detail}
                </li>
              ))}
            </ul>
          </div>

          <div className="colophon__col p-10-13">
            <h3>Utilitaires</h3>
            <ul>
              <li>
                <button type="button" className="link" onClick={toggleMotion} aria-pressed={!motion}>
                  Animations : {motion ? 'actives' : 'réduites'}
                </button>{' '}
                <span className="note" style={{ display: 'inline' }}>
                  (M)
                </span>
              </li>
              <li>
                <button type="button" className="link" onClick={toggleGrid} aria-pressed={grid}>
                  Grille de composition : {grid ? 'affichée' : 'masquée'}
                </button>{' '}
                <span className="note" style={{ display: 'inline' }}>
                  (G)
                </span>
              </li>
              <li>
                <a className="link" href="#couverture">
                  Revenir à la couverture
                </a>
              </li>
            </ul>
            <p className="note" style={{ marginTop: '0.8rem' }}>
              Deux réglages, conservés dans le navigateur : les animations et la grille.
            </p>
          </div>
        </div>

        <div className="colophon__foot">
          <span>
            {site.alias} — {site.edition.label} · {site.edition.month} {site.edition.year}
          </span>
          <span className="colophon__clock">Heure locale — {time} · Europe/Paris</span>
          <span>{site.languageNote}</span>
        </div>
      </div>
    </footer>
  );
}
