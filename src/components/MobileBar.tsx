import { chapters } from '../data/chapters';

export function MobileBar({
  visible,
  active,
  onOpenIndex,
}: {
  visible: boolean;
  active: string;
  onOpenIndex: () => void;
}) {
  const chapter = chapters.find((item) => item.id === active) ?? chapters[0];

  return (
    <div className="mobile-bar" data-visible={visible}>
      <a className="mobile-bar__mark" href="#couverture" aria-label="Revenir à la couverture">
        snw
      </a>
      <span className="mobile-bar__section" aria-hidden="true">
        {chapter.folio} · {chapter.title}
      </span>
      <button type="button" className="mobile-bar__button" onClick={onOpenIndex}>
        Sommaire
      </button>
    </div>
  );
}
