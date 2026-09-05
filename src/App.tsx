import { Suspense, lazy, useEffect, useState } from 'react';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Beyond } from './components/Beyond';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { useScrollProgress } from './hooks/useScrollProgress';

// Three.js is the largest chunk by far. Loading it separately keeps the hero
// text as the first paint instead of blocking on a WebGL bundle.
const Scene = lazy(() => import('./three/Scene'));

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

export default function App() {
  const scroll = useScrollProgress();
  const [webgl, setWebgl] = useState(false);

  // Deferred to an effect so the first paint is plain HTML, and so the probe
  // canvas is never created during SSR-style rendering or a prerender pass.
  useEffect(() => setWebgl(hasWebGL()), []);

  return (
    <div className="relative min-h-screen grain">
      {/* Layer 1: the field, fixed behind everything. */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 ambient">
        {webgl && (
          <Suspense fallback={null}>
            <Scene scroll={scroll} />
          </Suspense>
        )}
      </div>

      {/* Layer 2: a scrim so body copy keeps its contrast over the brightest
          parts of the field. Without it the particles fight the text. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(8,7,10,0.30)_0%,rgba(8,7,10,0.62)_55%,rgba(8,7,10,0.86)_100%)]"
      />

      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-ember focus:px-4 focus:py-2 focus:text-sm focus:text-void"
      >
        Skip to content
      </a>

      <Nav />

      <main className="relative z-10">
        <Hero />
        <Stats />
        <About />
        <Experience />
        <Skills />
        <Beyond />
        <Contact />
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
