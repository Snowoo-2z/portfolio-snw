import { Folio } from '../components/atoms';
import { journal } from '../data/journal';

export function Journal() {
  return (
    <section className="section" id="journal" aria-labelledby="journal-title">
      <div className="plate">
        <div className="grid section__head">
          <div className="p-1-6">
            <Folio num="03" label="Journal de fabrication" />
            <h2 className="title" id="journal-title">
              Journal
            </h2>
          </div>
          <div className="p-7-13">
            <p className="lede">{journal.deck}</p>
          </div>
        </div>

        <div className="steps" style={{ marginTop: 'clamp(1.4rem, 3.5vw, 2.4rem)' }}>
          {journal.steps.map((step) => (
            <article className="step" key={step.num} data-reveal="">
              <span className="step__num" aria-hidden="true">
                {step.num}
              </span>
              <div>
                <h3 className="step__title">{step.title}</h3>
                <div className="step__body">
                  {step.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
              <p className="step__trace">
                <b>{step.trace[0]}</b>
                <span>{step.trace[1]}</span>
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
