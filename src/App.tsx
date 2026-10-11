import { useCallback, useState } from 'react';
import { GridOverlay } from './components/GridOverlay';
import { IndexSheet } from './components/IndexSheet';
import { MobileBar } from './components/MobileBar';
import { Rail } from './components/Rail';
import { chapterIds } from './data/chapters';
import { usePastThreshold, useReveal, useScrollProgress, useScrollSpy } from './lib/hooks';
import { Atome } from './sections/Atome';
import { Colophon } from './sections/Colophon';
import { Contact } from './sections/Contact';
import { Cover, Sommaire } from './sections/Cover';
import { HorsSerie } from './sections/HorsSerie';
import { Journal } from './sections/Journal';
import { Territoires } from './sections/Territoires';
import { TicketPlus } from './sections/TicketPlus';

export function App() {
  const [indexOpen, setIndexOpen] = useState(false);
  const active = useScrollSpy(chapterIds);
  const pastCover = usePastThreshold(0.72);

  useReveal();
  useScrollProgress();

  const openIndex = useCallback(() => setIndexOpen(true), []);
  const closeIndex = useCallback(() => setIndexOpen(false), []);

  return (
    <>
      <a className="skip-link" href="#atome">
        Aller directement aux projets
      </a>

      <Rail active={active} onOpenIndex={openIndex} />
      <MobileBar visible={pastCover} active={active} onOpenIndex={openIndex} />

      <div className="shell">
        <Cover />
        <Sommaire />
        <main id="contenu">
          <Atome />
          <TicketPlus />
          <HorsSerie />
          <Journal />
          <Territoires />
          <Contact />
        </main>
        <Colophon />
      </div>

      <IndexSheet open={indexOpen} onClose={closeIndex} />
      <GridOverlay />
    </>
  );
}
