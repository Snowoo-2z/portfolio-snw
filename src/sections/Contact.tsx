import { Folio } from '../components/atoms';
import { site } from '../data/site';
import { useCopy } from '../lib/hooks';

export function Contact() {
  const { done, copy } = useCopy();
  const { discord, github, email } = site.contact;

  return (
    <section className="section" id="contact" aria-labelledby="contact-title">
      <div className="plate">
        <div className="grid section__head">
          <div className="p-1-6">
            <Folio num="05" label="Écrire" />
            <h2 className="u-visually-hidden" id="contact-title">
              Contact
            </h2>
            <p className="contact__ask">Un site à concevoir, un bot à mettre en service, une idée à clarifier&nbsp;?</p>
          </div>
          <div className="p-8-13">
            <div className="contact__scope">
              <p className="u-mono" style={{ color: 'var(--accent)' }}>
                Ce que je peux prendre en charge
              </p>
              <ul>
                {site.scope.map((item, index) => (
                  <li key={item}>
                    <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="grid" style={{ marginTop: 'clamp(1.8rem, 4.5vw, 3rem)', rowGap: '1.4rem' }}>
          <div className="p-1-7">
            <div className="contact__channels">
              <div className="channel">
                <span className="channel__key">Discord</span>
                <span className="channel__value">{discord.handle}</span>
                <button
                  type="button"
                  className="channel__copy"
                  data-done={done === 'discord'}
                  onClick={() => void copy(discord.handle, 'discord')}
                >
                  {done === 'discord' ? 'Copié' : 'Copier'}
                </button>
              </div>

              <div className="channel">
                <span className="channel__key">GitHub</span>
                <span className="channel__value">
                  <a className="link" href={github.url} target="_blank" rel="noreferrer noopener">
                    {github.handle}
                  </a>
                </span>
                <a className="channel__copy" href={github.url} target="_blank" rel="noreferrer noopener">
                  Ouvrir ↗
                </a>
              </div>

              <div className="channel channel--todo">
                <span className="channel__key">Courriel</span>
                <span className="channel__value">à compléter — src/data/site.ts</span>
                <span aria-hidden="true" />
              </div>
            </div>

            <p className="note" style={{ marginTop: '1rem' }}>
              Le pseudo Discord suffit pour écrire. L’adresse électronique est laissée ouverte : elle n’est
              affichée que si son auteur la publie.
            </p>
            <span className="u-visually-hidden" aria-live="polite">
              {done === 'discord' ? 'Pseudo Discord copié dans le presse-papier.' : ''}
            </span>
          </div>

          <aside className="p-8-13">
            <div className="margin-note note">
              <p>
                Réponse sur Discord ou GitHub. Ce site ne collecte rien : pas de formulaire, pas de traceur, pas
                de mesure d’audience, aucune requête vers un domaine tiers.
              </p>
              <p style={{ marginTop: '0.8rem' }}>
                {email ? (
                  <a className="link" href={`mailto:${email}`}>
                    {email}
                  </a>
                ) : (
                  <>Adresse électronique : emplacement réservé dans le code, en attente d’être renseigné.</>
                )}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
