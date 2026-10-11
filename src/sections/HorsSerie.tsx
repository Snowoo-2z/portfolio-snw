import { Action, Folio } from '../components/atoms';
import { horsSerie } from '../data/hors-serie';
import { ticketPlus } from '../data/ticket-plus';

export function HorsSerie() {
  const { astra } = horsSerie;

  return (
    <section className="section" id="hors-serie" aria-labelledby="hors-serie-title">
      <div className="plate">
        <div className="grid section__head">
          <div className="p-1-7">
            <Folio num="H.S." label="Hors-série" />
            <h2 className="title" id="hors-serie-title">
              En chantier
            </h2>
          </div>
          <div className="p-8-13">
            <p className="lede">{horsSerie.deck}</p>
          </div>
        </div>

        <div className="grid" style={{ rowGap: 'clamp(1.6rem, 4vw, 2.6rem)' }}>
          <div className="p-1-5">
            <p className="territory__index">Dossier</p>
            <h3 className="atome__quote" style={{ fontSize: 'clamp(2rem, 5vw, 3.6rem)' }}>
              {astra.name}
              <small>{astra.strapline}</small>
            </h3>
            <div className="actions" style={{ marginTop: '1.4rem' }}>
              <Action href={astra.repo}>Voir le dépôt</Action>
            </div>
          </div>

          <div className="p-6-13">
            <div className="grid">
              <div className="p-1-7">
                <div className="fiche">
                  {astra.fiche.map((row) => (
                    <div className="fiche__row" key={row.key}>
                      <span className="fiche__key">{row.key}</span>
                      <span className="fiche__value">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-8-13">
                <p className="margin-note note">{astra.note}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid" style={{ marginTop: 'clamp(1.8rem, 4.5vw, 3rem)' }}>
          <div className="p-1-7">
            <div className="chantiers">
              <p className="u-mono" style={{ color: 'var(--accent)' }}>
                {horsSerie.chantiersTitle}
              </p>
              {ticketPlus.chantiers.map((item) => (
                <p className="chantiers__item" key={item.name}>
                  <b>{item.name}</b>
                  <span>{item.state}</span>
                </p>
              ))}
            </div>
          </div>
          <div className="p-8-13">
            <p className="margin-note note">{horsSerie.chantiersNote}</p>
            <p className="lede" style={{ marginTop: '1.2rem' }}>
              {horsSerie.closing}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
