import { useLayoutEffect, useRef, useState } from 'react';
import { site } from '../data/site';

type Metrics = {
  size: number;
  inkTop: number;
  baseline: number;
  xHeight: number;
  letters: [number, number, number];
  fitted: boolean;
};

const FALLBACK: Metrics = {
  size: 0,
  inkTop: 0.24,
  baseline: 0.76,
  xHeight: 0,
  letters: [0, 0, 0],
  fitted: false,
};

/**
 * Le pseudo, composé comme une épreuve typographique : les lettres sont
 * ajustées à la largeur du bloc, puis mesurées réellement (hauteur d'œil,
 * ligne de base, avances) pour poser les filets de construction exactement
 * sur les repères du dessin. Rien n'est approximé à l'œil.
 */
export function Specimen() {
  const boxRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLHeadingElement>(null);
  const [metrics, setMetrics] = useState<Metrics>(FALLBACK);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const box = boxRef.current;
    const word = wordRef.current;
    if (!box || !word) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const REF = 100;
    const TRACKING = -0.02;
    let frame = 0;
    let cancelled = false;

    const measure = () => {
      if (cancelled) return;
      const styles = getComputedStyle(word);
      ctx.font = `${styles.fontWeight} ${REF}px ${styles.fontFamily}`;

      const total = ctx.measureText('snw');
      const first = ctx.measureText('s').width / REF;
      const second = ctx.measureText('sn').width / REF;
      const advance = total.width / REF;
      const xHeight = total.actualBoundingBoxAscent / REF;
      const overshoot = total.actualBoundingBoxDescent / REF;
      const fontAscent = total.fontBoundingBoxAscent / REF || 0.75;
      const fontDescent = total.fontBoundingBoxDescent / REF || 0.25;

      const width = box.clientWidth;
      const heightCap = Math.min(window.innerHeight * 0.4, 470);
      const byWidth = width / Math.max(0.2, advance + 3 * TRACKING);
      const byHeight = heightCap / Math.max(0.1, xHeight + overshoot);
      const size = Math.max(58, Math.round(Math.min(byWidth, byHeight)));

      /* Ligne de base dans la boîte de texte (line-height: 1). */
      const halfLeading = (1 - (fontAscent + fontDescent)) / 2;
      const baselineEm = halfLeading + fontAscent;

      setMetrics({
        size,
        inkTop: (baselineEm - xHeight) * size,
        baseline: baselineEm * size,
        xHeight: Math.round(xHeight * size),
        letters: [
          0,
          Math.round(first * size + TRACKING * size),
          Math.round(second * size + 2 * TRACKING * size),
        ],
        fitted: byWidth <= byHeight,
      });
      setReady(true);
    };

    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    schedule();
    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(box);
    window.addEventListener('resize', schedule);

    /* La mesure n'est valable qu'une fois la police réellement disponible. */
    if (document.fonts?.ready) void document.fonts.ready.then(schedule);
    document.fonts?.addEventListener?.('loadingdone', schedule);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener('resize', schedule);
      document.fonts?.removeEventListener?.('loadingdone', schedule);
    };
  }, []);

  const style = ready
    ? ({
        '--wm-size': `${metrics.size}px`,
        '--wm-ink-top': `${metrics.inkTop}px`,
        '--wm-baseline': `${metrics.baseline}px`,
        '--wm-x1': `${metrics.letters[0]}px`,
        '--wm-x2': `${metrics.letters[1]}px`,
        '--wm-x3': `${metrics.letters[2]}px`,
      } as React.CSSProperties)
    : undefined;

  return (
    <div className="specimen" data-ready={ready} style={style}>
      <p className="specimen__measures">
        <span>
          {ready ? (
            <>
              Corps ajusté — <b>{metrics.size} px</b>
            </>
          ) : (
            'Corps ajusté — calcul en cours'
          )}
        </span>
        <span>
          <b>3</b> caractères · aucune ascendante · aucune descendante
        </span>
      </p>

      <div className="specimen__box" ref={boxRef}>
        <h1 className="specimen__word" ref={wordRef}>
          <span className="specimen__guide specimen__guide--top" aria-hidden="true" />
          <span className="specimen__guide specimen__guide--base" aria-hidden="true" />
          <span className="specimen__tag specimen__tag--top">
            hauteur d’œil{ready ? ` — ${metrics.xHeight} px` : ''}
          </span>
          <span className="specimen__tag specimen__tag--base">ligne de base</span>
          {site.letters.map((item) => (
            <span className="specimen__letter" key={item.letter}>
              {item.letter}
            </span>
          ))}
        </h1>
      </div>

      <p className="specimen__legend">
        {site.letters.map((item) => (
          <span className="specimen__legend-item" key={item.letter}>
            <span className="specimen__legend-letter">{item.letter}</span>
            <span>
              {item.verb} <span className="specimen__legend-word">— {item.caption}</span>
            </span>
          </span>
        ))}
      </p>
    </div>
  );
}
