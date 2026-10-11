import { Fragment } from 'react';
import { Action, Folio } from '../components/atoms';
import { EmptySlot, MediaPlate } from '../components/Figure';
import { ticketPlus, type MockBlock } from '../data/ticket-plus';
import { media } from '../lib/media';

function Mock({ blocks }: { blocks: MockBlock[] }) {
  return (
    <div className="mock">
      {blocks.map((block, index) => {
        switch (block.kind) {
          case 'bar':
            return <span className="mock__bar" key={index} aria-hidden="true" />;
          case 'title':
            return (
              <p className="mock__title" key={index}>
                {block.text}
              </p>
            );
          case 'desc':
            return (
              <p className="mock__desc" key={index}>
                {block.text}
              </p>
            );
          case 'footer':
            return (
              <p className="mock__footer" key={index}>
                {block.text}
              </p>
            );
          case 'fields':
            return (
              <div className="mock__fields" key={index}>
                {block.items.map((item) => (
                  <p className="mock__field" key={item.label}>
                    <b>{item.label}</b>
                    {item.value}
                  </p>
                ))}
              </div>
            );
          case 'row':
            return (
              <div className="mock__row" key={index}>
                {block.items.map((item) => (
                  <span className={`mock__btn${item.signal ? ' mock__btn--signal' : ''}`} key={item.label}>
                    {item.label}
                  </span>
                ))}
              </div>
            );
          case 'menu':
            return (
              <div className="mock__menu" key={index}>
                {block.items.map((item) => (
                  <span className="mock__menu-item" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

export function TicketPlus() {
  const shots = media.ticketPlus.shots;

  return (
    <section className="section" id="ticket-plus" aria-labelledby="ticket-plus-title">
      <div className="plate">
        <div className="grid section__head">
          <div className="p-1-7">
            <Folio num="02" label="Développement de bots Discord" />
            <h2 className="title" id="ticket-plus-title">
              Ticket Plus
            </h2>
          </div>
          <div className="p-8-13">
            <div className="releve">
              <p className="releve__head">Relevé dans le dépôt</p>
              <div className="releve__list">
                {ticketPlus.releve.map((row) => (
                  <p className="releve__row" key={row.key}>
                    <span>{row.key}</span>
                    <b>{row.value}</b>
                  </p>
                ))}
              </div>
              <p className="releve__source">{ticketPlus.sources}</p>
            </div>
          </div>
          <div className="p-1-7">
            <p className="deck">{ticketPlus.deck}</p>
          </div>
          <div className="p-8-13">
            <p className="margin-note note">{ticketPlus.schémaNote}</p>
          </div>
        </div>

        <div className="planche grid" style={{ marginTop: 'clamp(1.8rem, 4.5vw, 3rem)' }}>
          {ticketPlus.chain.map((step, index) => (
            <Fragment key={step.id}>
              {index > 0 && step.enter ? (
                <div className="p-full planche__arrow">{step.enter}</div>
              ) : null}

              <div className={`planche__step ${index % 2 === 0 ? 'p-1-6' : 'p-7-13'}`}>
                <div className="planche__step-head">
                  <span className="planche__step-id">{step.id}</span>
                  <span className="planche__step-name">{step.name}</span>
                </div>
                <Mock blocks={step.blocks} />
              </div>

              <div className={`planche__step ${index % 2 === 0 ? 'p-7-13' : 'p-1-6'}`}>
                <div className="planche__step-head" style={{ borderBottomColor: 'var(--rule)' }}>
                  <span className="planche__step-where">{step.where}</span>
                </div>
                <p className="note">{step.note}</p>
              </div>
            </Fragment>
          ))}
        </div>

        <div className="planche__annex grid">
          <div className="p-1-7">
            <div className="mock">
              <p className="mock__title">Journal du serveur — salon de logs</p>
              <p className="mock__desc">
                Chaque action laisse une ligne dans le salon de journaux, avec la couleur d’origine du bot.
              </p>
              <div style={{ marginTop: '0.4rem' }}>
                {ticketPlus.logs.map((log) => (
                  <p className="log-line" key={log.title}>
                    <span className="log-line__swatch" style={{ background: log.hex }} aria-hidden="true" />
                    <span>
                      {log.title} <span className="log-line__hex">— {log.role}</span>
                    </span>
                    <span className="log-line__hex">{log.hex}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="p-8-13">
            <div className="mock">
              <p className="mock__title">{ticketPlus.transcript.title}</p>
              <p className="mock__desc">{ticketPlus.transcript.text}</p>
              <p className="mock__footer">{ticketPlus.transcript.file}</p>
            </div>
          </div>
        </div>

        <div className="grid" style={{ marginTop: 'clamp(2rem, 5vw, 3.2rem)' }}>
          <div className="p-full">
            <table className="registry">
              <caption>Registre des commandes</caption>
              <thead>
                <tr>
                  <th scope="col">Commande</th>
                  <th scope="col">Options</th>
                  <th scope="col">Droits requis</th>
                  <th scope="col">Comportement</th>
                </tr>
              </thead>
              <tbody>
                {ticketPlus.commands.map((command) => (
                  <tr key={command.name}>
                    <td>{command.name}</td>
                    <td>{command.options}</td>
                    <td>{command.rights}</td>
                    <td>{command.behaviour}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid" style={{ marginTop: 'clamp(2rem, 5vw, 3.2rem)', rowGap: '1.4rem' }}>
          <div className="p-1-7">
            <h3 className="u-mono" style={{ color: 'var(--accent)', marginBottom: '0.6rem' }}>
              Mécanismes relevés
            </h3>
            <div className="mech">
              {ticketPlus.mechanisms.slice(0, 4).map((mechanism) => (
                <article className="mech__item" key={mechanism.title}>
                  <div>
                    <h4>{mechanism.title}</h4>
                    <p>{mechanism.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="p-8-13">
            <div className="mech">
              {ticketPlus.mechanisms.slice(4).map((mechanism) => (
                <article className="mech__item" key={mechanism.title}>
                  <div>
                    <h4>{mechanism.title}</h4>
                    <p>{mechanism.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="grid" style={{ marginTop: 'clamp(2rem, 5vw, 3.2rem)' }}>
          <div className="p-full shots">
            {shots.length ? (
              shots.map((shot, index) => (
                <MediaPlate
                  key={shot.id}
                  entry={shot.variants}
                  fig={`Fig. ${index + 5}`}
                  caption="Le bot en service — capture fournie par l’auteur."
                  source="Bot ticket-plus"
                  alt="Capture du bot ticket-plus en fonctionnement sur un serveur Discord."
                  sizes="(min-width: 760px) 40vw, 100vw"
                />
              ))
            ) : (
              <>
                <EmptySlot
                  label="Image —"
                  hint="Capture du panel en service : déposer discord-1.png dans assets/drop/ puis lancer npm run assets."
                />
                <EmptySlot
                  label="Image —"
                  hint="Capture d’un ticket ouvert : déposer discord-2.png. Les captures arriveront quand l’auteur les publiera."
                />
              </>
            )}
          </div>
        </div>

        <div className="grid" style={{ marginTop: 'clamp(1.6rem, 4vw, 2.4rem)' }}>
          <div className="p-1-7">
            <div className="chantiers">
              <p className="u-mono" style={{ color: 'var(--accent)' }}>
                Autres dépôts de bots
              </p>
              {ticketPlus.chantiers.map((chantier) => (
                <p className="chantiers__item" key={chantier.name}>
                  <b>{chantier.name}</b>
                  <span>{chantier.state}</span>
                </p>
              ))}
            </div>
          </div>
          <div className="p-8-13">
            <p className="note">
              Ces dépôts sont publics mais encore vides : ils sont donc listés, pas présentés. Ce numéro ne
              présente que ce qui peut être montré.
            </p>
            <div className="actions" style={{ marginTop: '1.2rem' }}>
              <Action href={ticketPlus.repo}>Lire le code source</Action>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
