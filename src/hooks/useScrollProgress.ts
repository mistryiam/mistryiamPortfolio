import { useEffect, useRef, type MutableRefObject } from 'react';

export type ScrollState = {
  /** 0 at the top of the document, 1 at the bottom. Drives the field's morph. */
  page: number;
  /** 1 while the hero fills the screen, falling to 0 one viewport down. */
  hero: number;
};

/**
 * Scroll position written into a ref rather than state — these values change
 * every frame, and re-rendering React on each one would defeat the point of
 * doing the morph on the GPU.
 */
export function useScrollProgress(): MutableRefObject<ScrollState> {
  const state = useRef<ScrollState>({ page: 0, hero: 1 });

  useEffect(() => {
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      state.current = {
        page: scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0,
        hero: Math.max(0, 1 - window.scrollY / window.innerHeight),
      };
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return state;
}
