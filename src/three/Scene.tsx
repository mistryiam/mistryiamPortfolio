import { useEffect, useMemo, useRef, type MutableRefObject } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { SystemsField } from './SystemsField';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import type { ScrollState } from '../hooks/useScrollProgress';

type Props = { scroll: MutableRefObject<ScrollState> };

/** Point and edge budgets scaled to the device, decided once on mount. */
function useFieldBudget() {
  return useMemo(() => {
    if (typeof window === 'undefined') return { count: 4200, edgeCount: 1200, mobile: false };
    const mobile = window.innerWidth < 768;
    const modest = window.innerWidth < 1200;
    if (mobile) return { count: 1500, edgeCount: 420, mobile };
    if (modest) return { count: 3000, edgeCount: 850, mobile };
    return { count: 4200, edgeCount: 1200, mobile };
  }, []);
}

/**
 * Drops the render resolution when r3f's performance monitor reports the frame
 * budget is being missed, and restores it once things recover. Same job as
 * drei's AdaptiveDpr, inlined so the whole drei bundle stays off the wire.
 */
function AdaptivePixelRatio() {
  const current = useThree((s) => s.performance.current);
  const initialDpr = useThree((s) => s.viewport.initialDpr);
  const setDpr = useThree((s) => s.setDpr);

  useEffect(() => {
    setDpr(current * initialDpr);
  }, [current, initialDpr, setDpr]);

  return null;
}

export default function Scene({ scroll }: Props) {
  const { count, edgeCount, mobile } = useFieldBudget();
  const reducedMotion = usePrefersReducedMotion();
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (reducedMotion || mobile) return;
    const onMove = (e: PointerEvent) => {
      pointer.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reducedMotion, mobile]);

  return (
    <Canvas
      camera={{ position: [0, 0.6, 13], fov: 50 }}
      dpr={[1, mobile ? 1.25 : 1.75]}
      performance={{ min: 0.5 }}
      // The field is decoration; keep it out of the tab order and off the pointer.
      style={{ pointerEvents: 'none' }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      // Reduced motion still needs one render, but no continuous loop.
      frameloop={reducedMotion ? 'demand' : 'always'}
    >
      <SystemsField
        count={count}
        edgeCount={edgeCount}
        scroll={scroll}
        pointerLerp={pointer}
        animate={!reducedMotion}
      />
      <AdaptivePixelRatio />
    </Canvas>
  );
}
