import type { CSSProperties, ReactNode } from 'react';
import { formations, links, person, resume } from '../data/profile';
import { asset } from '../lib/asset';
import { trackSpotlight } from '../lib/spotlight';
import { IconDownload, IconGithub, IconGraph, IconServer, IconSpark } from './ui/Icons';

/**
 * The hero is on screen before anything scrolls, so its entrance runs off a
 * CSS animation with staggered delays rather than the scroll observer the rest
 * of the page uses. Same curve, no observers, and nothing to mis-fire above the
 * fold on a fast connection.
 */
function Rise({ delay = 0, children }: { delay?: number; children: ReactNode }) {
  return (
    <div className="rise" style={{ animationDelay: `${delay}s` } as CSSProperties}>
      {children}
    </div>
  );
}

const formationIcon = {
  neural: IconSpark,
  cluster: IconGraph,
  scale: IconServer,
} as const;

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center justify-center px-6 pt-28 pb-24"
    >
      <div className="relative w-full max-w-5xl">
        {/* The field runs at full strength behind the hero, so the text column
            carries its own pool of shadow rather than dimming the whole scene. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-6 -inset-y-12 -z-10 sm:-inset-x-10 bg-[radial-gradient(ellipse_72%_60%_at_34%_45%,rgba(8,7,10,0.95)_0%,rgba(8,7,10,0.78)_48%,transparent_80%)] blur-2xl"
        />

        <Rise>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-void-2/60 py-1.5 pr-4 pl-3 font-mono text-[11px] tracking-[0.18em] text-ember uppercase backdrop-blur-sm sm:text-xs">
            <span className="relative flex h-1.5 w-1.5">
              <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-ember" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ember" />
            </span>
            {person.role} · {person.team} @ {person.company}
          </p>
        </Rise>

        <Rise delay={0.08}>
          <h1 className="mt-7 text-[3.25rem] leading-[0.92] font-semibold tracking-[-0.035em] text-balance text-ink sm:text-7xl md:text-8xl">
            {person.name}
          </h1>
        </Rise>

        <Rise delay={0.16}>
          <p className="mt-7 max-w-2xl text-xl leading-snug font-medium tracking-tight text-balance text-ink/90 md:text-2xl">
            {person.tagline}
          </p>
        </Rise>

        <Rise delay={0.24}>
          <p className="mt-5 max-w-xl leading-relaxed text-muted">{person.intro}</p>
        </Rise>

        <Rise delay={0.32}>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#contact" className="btn btn-primary">
              Get in touch
            </a>
            {resume && (
              <a
                href={asset(resume)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                <IconDownload className="h-4 w-4" />
                Résumé
              </a>
            )}
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              <IconGithub className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </Rise>

        <Rise delay={0.42}>
          {/* A legend for the field behind the page: the three shapes it morphs
              through, and what each one stands for. */}
          <ul className="mt-14 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
            {formations.map(({ key, title, blurb }, i) => {
              const Icon = formationIcon[key];
              return (
                <li
                  key={key}
                  onPointerMove={trackSpotlight}
                  className="card card-hover group px-5 py-4"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4 text-ember/70 transition-colors duration-300 group-hover:text-ember" />
                    <span className="font-mono text-[10px] tabular-nums text-faint">0{i + 1}</span>
                  </div>
                  <p className="mt-3 text-sm font-medium text-ink">{title}</p>
                  <p className="mt-1 text-xs text-faint">{blurb}</p>
                </li>
              );
            })}
          </ul>
        </Rise>
      </div>

      <a
        href="#about"
        aria-label="Scroll to content"
        className="group absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2.5"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] text-faint uppercase transition-colors duration-300 group-hover:text-ember">
          Scroll
        </span>
        <span aria-hidden="true" className="relative h-9 w-px overflow-hidden bg-line">
          <span className="scroll-cue absolute inset-0 bg-gradient-to-b from-ember to-transparent" />
        </span>
      </a>
    </section>
  );
}
