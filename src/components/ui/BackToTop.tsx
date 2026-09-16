import { useEffect, useRef, useState } from 'react';
import { IconArrowUp } from './Icons';

const RADIUS = 17;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * Appears once the hero is well out of view. The ring around it tracks read
 * progress, so the control answers "how much is left?" as well as "take me
 * back" — the progress is written straight to the SVG attribute rather than
 * held in state, since it changes on every scroll frame.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const ring = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 1.1);

      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0;
      ring.current?.setAttribute('stroke-dashoffset', String(CIRCUMFERENCE * (1 - progress)));
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`group fixed right-5 bottom-5 z-30 grid h-11 w-11 place-items-center rounded-full border border-line bg-void-2/80 text-muted backdrop-blur-md transition-all duration-500 ease-quint hover:border-ember/40 hover:text-ember md:right-8 md:bottom-8 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 40 40"
        className="absolute inset-0 h-full w-full -rotate-90"
      >
        <circle
          ref={ring}
          cx="20"
          cy="20"
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE}
          className="text-ember/70"
        />
      </svg>
      <IconArrowUp className="relative h-4 w-4 transition-transform duration-300 ease-quint group-hover:-translate-y-0.5" />
    </button>
  );
}
