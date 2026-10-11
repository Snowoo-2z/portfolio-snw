import { Folio } from '../components/atoms';
import { Specimen } from '../components/Specimen';
import { site } from '../data/site';

export function Cover() {
  return (
    <header className="cover plate" id="couverture">
      <div className="cover__head">
        <span className="cover__head-mark">SNW</span>
        <span>{site.role}</span>
        <span>
          {site.edition.label} — {site.edition.month} {site.edition.year}
        </span>
      </div>

      <Specimen />

      <div className="grid cover__foot">
        <div className="p-1-6 cover__identity">
          <p>
            <b>snw</b> — pseudo
          </p>
          <p>Développeur web</p>
          <p>Développeur de bots Discord</p>
          <p>France</p>
          <p>Relevé des sources — {site.edition.stamp}</p>
        </div>

        <div className="p-8-13 cover__deck">
          {site.coverDeck.map((line) => (
            <p className="deck" key={line}>
              {line}
            </p>
          ))}
          <a className="cover__scroll" href="#sommaire">
            <span className="cover__scroll-line" aria-hidden="true" />
            <span>Descendre au sommaire</span>
          </a>
        </div>
      </div>
    </header>
  );
}

export function Sommaire() {
  return (
    <section className="section" id="sommaire" aria-labelledby="sommaire-title">
      <div className="plate">
        <div className="grid section__head">
          <div className="p-1-7">
            <Folio num="00" label="Sommaire du numéro" />
            <h2 className="title" id="sommaire-title">
              Sommaire
            </h2>
          </div>
          <div className="p-9-13">
            <p className="note">
              Sept chapitres, deux projets présentés en détail, un système d’exploitation en chantier. Chaque
              affirmation de ce numéro est sourcée ; ce qui n’était pas vérifiable est signalé comme tel.
            </p>
          </div>
        </div>

        <div className="grid" style={{ rowGap: 'clamp(1.6rem, 4vw, 3rem)' }}>
          <nav className="p-1-8" aria-label="Chapitres du numéro">
            <div className="toc">
              <a className="toc__row" href="#atome">
                <span className="toc__folio">01</span>
                <span className="toc__title">
                  Atome
                  <span className="toc__leader" aria-hidden="true" />
                  <span className="toc__desc">Étude de cas — site de marque, en ligne</span>
                </span>
              </a>
              <a className="toc__row" href="#ticket-plus">
                <span className="toc__folio">02</span>
                <span className="toc__title">
                  Ticket Plus
                  <span className="toc__leader" aria-hidden="true" />
                  <span className="toc__desc">Bot Discord de support — planche technique</span>
                </span>
              </a>
              <a className="toc__row" href="#hors-serie">
                <span className="toc__folio">H.S.</span>
                <span className="toc__title">
                  Hors-série
                  <span className="toc__leader" aria-hidden="true" />
                  <span className="toc__desc">Astra OS & chantiers ouverts</span>
                </span>
              </a>
              <a className="toc__row" href="#journal">
                <span className="toc__folio">03</span>
                <span className="toc__title">
                  Journal de fabrication
                  <span className="toc__leader" aria-hidden="true" />
                  <span className="toc__desc">Concevoir, construire, éprouver, livrer</span>
                </span>
              </a>
              <a className="toc__row" href="#territoires">
                <span className="toc__folio">04</span>
                <span className="toc__title">
                  Territoires
                  <span className="toc__leader" aria-hidden="true" />
                  <span className="toc__desc">Compétences, chacune avec sa source</span>
                </span>
              </a>
              <a className="toc__row" href="#contact">
                <span className="toc__folio">05</span>
                <span className="toc__title">
                  Écrire
                  <span className="toc__leader" aria-hidden="true" />
                  <span className="toc__desc">Contact — ce que je peux prendre en charge</span>
                </span>
              </a>
            </div>
          </nav>

          <aside className="p-10-13 toc__aside">
            <div className="toc__aside-block">
              <p className="toc__aside-title">Notation</p>
              <ul>
                <li>
                  <b>Relevé</b> — lu dans le code source ou sur le site en ligne.
                </li>
                <li>
                  <b>À préciser</b> — information non publiée, laissée ouverte plutôt que devinée.
                </li>
              </ul>
            </div>

            <div className="toc__aside-block">
              <p className="toc__aside-title">Ce numéro</p>
              <ul>
                <li>Une seule page, sept chapitres, aucune page secondaire.</li>
                <li>Trois voix typographiques : Archivo, Newsreader, IBM Plex Mono.</li>
                <li>Un accent unique, #C9380F, pour les annotations et les repères.</li>
                <li>Aucun traceur, aucun cookie, aucune police distante.</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
