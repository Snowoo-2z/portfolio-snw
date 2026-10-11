import { useCallback, useEffect, useRef, useState } from 'react';

/** Révèle les blocs `data-reveal` à l'entrée dans la fenêtre, une seule fois.
 *  Sans JavaScript (ou sans IntersectionObserver), rien n'est jamais masqué. */
export function useReveal() {
  useEffect(() => {
    const root = document.documentElement;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!nodes.length || !('IntersectionObserver' in window)) return;

    root.setAttribute('data-reveal-ready', '');
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).setAttribute('data-reveal', 'in');
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.1 },
    );

    for (const node of nodes) observer.observe(node);
    return () => {
      observer.disconnect();
      root.removeAttribute('data-reveal-ready');
    };
  }, []);
}

/** Section active : sert au rail, à la barre mobile et au sommaire. */
export function useScrollSpy(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0] ?? '');

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const line = window.scrollY + window.innerHeight * 0.32;
        let current = ids[0] ?? '';
        for (const id of ids) {
          const element = document.getElementById(id);
          if (element && element.offsetTop <= line) current = id;
        }
        setActive((previous) => (previous === current ? previous : current));
      });
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [ids]);

  return active;
}

/** Avancement de lecture écrit directement en variable CSS : aucun rendu React. */
export function useScrollProgress() {
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const value = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
        document.documentElement.style.setProperty('--scroll-progress', value.toFixed(4));
      });
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
}

/** La barre mobile n'apparaft qu'une fois la couverture quittée. */
export function usePastThreshold(fraction = 0.62) {
  const [past, setPast] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setPast(window.scrollY > window.innerHeight * fraction);
      });
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [fraction]);

  return past;
}

/** Heure locale : une seule information vivante, mise à jour sans bruit. */
export function useClock(timeZone = 'Europe/Paris') {
  const read = useCallback(
    () =>
      new Intl.DateTimeFormat('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone,
      }).format(new Date()),
    [timeZone],
  );
  const [time, setTime] = useState(read);

  useEffect(() => {
    setTime(read());
    const id = setInterval(() => setTime(read()), 20000);
    return () => clearInterval(id);
  }, [read]);

  return time;
}

/** Copie vers le presse-papier, avec retour visuel éphémère. */
export function useCopy(duration = 2200) {
  const [done, setDone] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);

  const copy = useCallback(
    async (value: string, key: string) => {
      try {
        await navigator.clipboard.writeText(value);
        setDone(key);
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setDone(null), duration);
      } catch {
        setDone(null);
      }
    },
    [duration],
  );

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return { done, copy };
}

/** Effet de survol qui suit le curseur, écrit en variables CSS (sans rendu). */
export function usePointerVar(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia('(hover: none)').matches) return;

    const move = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      node.style.setProperty('--px', `${((event.clientX - rect.left) / rect.width) * 100}%`);
      node.style.setProperty('--py', `${((event.clientY - rect.top) / rect.height) * 100}%`);
    };

    node.addEventListener('pointermove', move);
    return () => node.removeEventListener('pointermove', move);
  }, [ref]);
}
