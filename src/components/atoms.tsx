import type { ReactNode } from 'react';

/* --------------------------------------------------------------- folio */

export function Folio({ num, label }: { num: string; label: string }) {
  return (
    <p className="folio">
      <span className="folio__num">{num}</span>
      <span className="folio__label">{label}</span>
    </p>
  );
}

/* ---------------------------------------------------------------- notes */

export function Note({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`note ${className}`.trim()}>{children}</p>;
}

export function MarginNote({ children }: { children: ReactNode }) {
  return <div className="margin-note note">{children}</div>;
}

/* ---------------------------------------------------------------- jetons */

type ChipKind = 'plain' | 'todo' | 'src' | 'accent';

export function Chip({ label, kind = 'plain' }: { label: string; kind?: ChipKind }) {
  const modifier = kind === 'plain' ? '' : ` chip--${kind}`;
  return <span className={`chip${modifier}`}>{label}</span>;
}

/* --------------------------------------------------- emplacement à compléter */

export function Todo({ children, hint }: { children: ReactNode; hint?: string }) {
  return (
    <span className="todo-inline" title={hint}>
      {children}
    </span>
  );
}

/* --------------------------------------------------------------- actions */

export function Action({
  href,
  children,
  accent = false,
  external = true,
  onClick,
}: {
  href: string;
  children: ReactNode;
  accent?: boolean;
  external?: boolean;
  onClick?: () => void;
}) {
  const isExternal = external && /^https?:/.test(href);
  return (
    <a
      className={`action${accent ? ' action--accent' : ''}`}
      href={href}
      {...(isExternal ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      onClick={onClick}
    >
      <span>{children}</span>
      <span className="action__arrow" aria-hidden="true">
        {isExternal ? '↗' : '↓'}
      </span>
    </a>
  );
}

/* ----------------------------------------------------------- fiche technique */

export type FicheRow = {
  key: string;
  value: string | null;
  href?: string;
  todo?: string;
};

export function Fiche({ rows, caption }: { rows: readonly FicheRow[]; caption?: string }) {
  return (
    <div className="fiche">
      {caption ? <p className="note">{caption}</p> : null}
      {rows.map((row) => (
        <div className="fiche__row" key={row.key}>
          <span className="fiche__key">{row.key}</span>
          <span className="fiche__value">
            {row.todo ? (
              <span className="todo-inline" title="Information non publiée : laissée ouverte volontairement.">
                {row.todo}
              </span>
            ) : row.href ? (
              <a className="link" href={row.href} target="_blank" rel="noreferrer noopener">
                {row.value}
              </a>
            ) : (
              row.value
            )}
          </span>
        </div>
      ))}
    </div>
  );
}
