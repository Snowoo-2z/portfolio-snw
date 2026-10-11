import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type Settings = {
  /** Animations du site : true = actives. Respecte d'abord le réglage système. */
  motion: boolean;
  /** Calque de grille : outil de composition, affiché à la demande. */
  grid: boolean;
  toggleMotion: () => void;
  toggleGrid: () => void;
};

const SettingsContext = createContext<Settings | null>(null);

const STORAGE = { motion: 'snw:motion', grid: 'snw:grid' };

function readStored(key: string, fallback: boolean): boolean {
  try {
    const value = window.localStorage.getItem(key);
    return value === null ? fallback : value === 'on';
  } catch {
    return fallback;
  }
}

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [motion, setMotion] = useState(() => !prefersReducedMotion());
  const [grid, setGrid] = useState(false);

  /* Les préférences sont relues après le montage : le premier rendu reste neutre. */
  useEffect(() => {
    setMotion(readStored(STORAGE.motion, !prefersReducedMotion()));
    setGrid(readStored(STORAGE.grid, false));
  }, []);

  useEffect(() => {
    document.documentElement.dataset.motion = motion ? 'on' : 'off';
  }, [motion]);

  const toggleMotion = useCallback(() => {
    setMotion((value) => {
      const next = !value;
      try {
        window.localStorage.setItem(STORAGE.motion, next ? 'on' : 'off');
      } catch {
        /* stockage indisponible : le réglage reste valable pour la session */
      }
      return next;
    });
  }, []);

  const toggleGrid = useCallback(() => {
    setGrid((value) => {
      const next = !value;
      try {
        window.localStorage.setItem(STORAGE.grid, next ? 'on' : 'off');
      } catch {
        /* idem */
      }
      return next;
    });
  }, []);

  /* Raccourcis clavier : G pour la grille, M pour les animations. */
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      if (event.key === 'g' || event.key === 'G') {
        event.preventDefault();
        toggleGrid();
      }
      if (event.key === 'm' || event.key === 'M') {
        event.preventDefault();
        toggleMotion();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [toggleGrid, toggleMotion]);

  const value = useMemo(
    () => ({ motion, grid, toggleMotion, toggleGrid }),
    [motion, grid, toggleMotion, toggleGrid],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings(): Settings {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings doit être utilisé dans SettingsProvider');
  return context;
}
