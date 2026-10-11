import { Chip, Folio } from '../components/atoms';
import { territories, territoriesNote } from '../data/territoires';

export function Territoires() {
  return (
    <section className="section" id="territoires" aria-labelledby="territoires-title">
      <div className="plate">
        <div className="grid section__head">
          <div className="p-1-7">
            <Folio num="04" label="Territoires" />
            <h2 className="title" id="territoires-title">
              Territoires
            </h2>
          </div>
          <div className="p-8-13">
            <p className="lede">
              Quatre terrains de travail. Pour chacun : ce que je fais, et ce qui, dans les projets publiés, le
              prouve. Aucun niveau, aucun pourcentage.
            </p>
            <ul className="note" style={{ marginTop: '1rem' }}>
              <li>
                <strong>Relevé</strong> — {territoriesNote.relevé.replace('Relevé — ', '')}
              </li>
              <li>
                <strong>À préciser</strong> — {territoriesNote.todo.replace('À préciser — ', '')}
              </li>
            </ul>
          </div>
        </div>

        <div style={{ marginTop: 'clamp(1.4rem, 3.5vw, 2.4rem)' }}>
          {territories.map((territory) => (
            <article className="territory" key={territory.index} data-reveal="">
              <div>
                <span className="territory__index">{territory.index}</span>
                <h3 className="territory__name">{territory.name}</h3>
              </div>

              <p className="territory__practice">{territory.practice}</p>

              <div className="territory__evidence">
                <p className="territory__evidence-label--lead">{territory.evidenceLabel}</p>
                <div className="chips">
                  {territory.tags.map((tag) => (
                    <Chip key={tag.label} label={tag.label} kind={tag.kind === 'todo' ? 'todo' : 'plain'} />
                  ))}
                </div>
                <p className="territory__evidence-label">Source — {territory.sources}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
