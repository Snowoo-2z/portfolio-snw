import { Action, Fiche } from '../components/atoms';
import { MediaPlate } from '../components/Figure';
import { atome } from '../data/atome';
import { media } from '../lib/media';

export function Atome() {
  return (
    <section className="section atome" id="atome" data-skin="void" aria-labelledby="atome-title">
      <div className="plate">
        <div className="atome__band">
          <b>01</b>
          <span>Étude de cas</span>
          <span className="atome__band-line" aria-hidden="true" />
          <span>Cahier noir — fidèle à la marque</span>
        </div>

        <div className="grid atome__head">
          <div className="p-1-9">
            <h2 className="atome__title" id="atome-title">
              Atome
              <span className="atome__type">{atome.type}</span>
            </h2>
          </div>

          <div className="p-10-13 atome__fiche">
            <Fiche rows={atome.fiche} />
          </div>

          <div className="p-1-7">
            <p className="deck">{atome.deck}</p>
          </div>

          <div className="p-8-13">
            <p className="margin-note note">
              Le site existe, il est consultable. Cette page décrit ce qui s’y trouve réellement, relevé le
              11 octobre 2026 — pas ce qu’il pourrait être.
            </p>
          </div>
        </div>

        {/* Le logo du projet est blanc sur noir : il ne peut vivre que sur l'encre. */}
        <div className="grid atome__brand">
          <div className="p-1-4">
            <div className="atome__mark">
              <img
                src="/media/atome/logo-640.webp"
                srcSet="/media/atome/logo-640.webp 640w"
                alt="Logotype Atome : italique blanc traversé par une ellipse."
                width={640}
                height={640}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          <div className="p-5-9">
            <p className="atome__quote">
              {atome.brand.quote}
              <small>Note de la rédaction</small>
            </p>
            <p className="lede" style={{ marginTop: '1rem', color: 'var(--ink-soft)' }}>
              {atome.brand.text}
            </p>
          </div>

          <div className="p-10-13">
            <p className="note">{atome.brand.editorial}</p>
          </div>
        </div>
      </div>

      {/* Encart papier : les planches d'images du projet, sur fond clair. */}
      <div className="atome__insert" data-skin="paper">
        <div className="plate">
          <div className="atome__insert-head">
            <span className="u-mono" style={{ color: 'var(--accent)' }}>
              Planches
            </span>
            <h3 className="atome__insert-title">Le projet, montré tel qu’il est</h3>
            <p className="note atome__insert-note">
              Un emplacement réservé pour la capture d’écran du site, puis les visuels fournis avec le dépôt du
              projet. Aucun n’a été retouché.
            </p>
          </div>

          <div className="grid atome__plates-insert">
            <div className="p-full">
              <MediaPlate
                entry={media.atome.siteCapture}
                fig="Fig. 1"
                caption="Accueil du site — capture à déposer dans assets/drop/site-capture.png"
                source="Aperçu du projet"
                alt="Capture de l’accueil du site Atome : titre WEAR YOUR ENERGY et ensemble porté."
                sizes="(min-width: 900px) 76vw, 100vw"
                slotTag="Image —"
                slotHint="Emplacement réservé : la capture d’écran du site sera déposée ici."
                pan
              />
            </div>

            <div className="p-1-6">
              <MediaPlate
                entry={media.atome.hero}
                fig="Fig. 2"
                caption="L’ensemble Hiver porté, face et dos."
                source="Dépôt atome"
                alt="Deux vues de l’ensemble Atome Hiver porté : face, puis dos avec le motif orbital imprimé."
                sizes="(min-width: 900px) 44vw, 100vw"
              />
            </div>

            <div className="p-7-13">
              <MediaPlate
                entry={media.atome.flat}
                fig="Fig. 3"
                caption="Le même ensemble à plat, dans la présentation de la collection."
                source="Dépôt atome"
                alt="L’ensemble Atome Hiver présenté à plat : hoodie et pantalon noirs, bonnet."
                sizes="(min-width: 900px) 44vw, 100vw"
              />
            </div>

            <div className="p-3-11 atome__detail">
              <MediaPlate
                entry={media.atome.detailPrint}
                fig="Fig. 4"
                caption="Détail — le motif orbital imprimé dans le dos."
                source="Dépôt atome"
                alt="Gros plan du motif orbital imprimé au dos du hoodie Atome."
                sizes="(min-width: 900px) 58vw, 100vw"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="plate">
        <div className="grid atome__actions">
          <div className="p-1-7">
            <div className="actions">
              <Action href={atome.url} accent>
                Visiter le site
              </Action>
              <Action href={atome.discordUrl}>Rejoindre le Discord</Action>
            </div>
          </div>
          <div className="p-8-13">
            <ul className="atome__sources">
              {atome.sources.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
