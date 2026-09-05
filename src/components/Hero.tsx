import { formations, links, person } from '../data/profile';
import { asset } from '../lib/asset';
import { Reveal } from './ui/Reveal';

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center justify-center px-6 pt-24 pb-16"
    >
      <div className="relative w-full max-w-5xl">
        {/* The field runs at full strength behind the hero, so the text column
            carries its own pool of shadow rather than dimming the whole scene. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-10 -inset-y-12 -z-10 bg-[radial-gradient(ellipse_72%_60%_at_34%_45%,rgba(8,7,10,0.95)_0%,rgba(8,7,10,0.78)_48%,transparent_80%)] blur-2xl"
        />

        <Reveal>
          <p className="flex items-center gap-2.5 font-mono text-xs tracking-[0.22em] text-ember uppercase">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ember" />
            </span>
            {person.role} · {person.team} @ {person.company}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="mt-6 text-5xl leading-[0.95] font-semibold tracking-tight text-balance text-ink sm:text-6xl md:text-7xl lg:text-8xl">
            {person.name}
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-balance text-muted md:text-xl">
            {person.tagline}
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">{person.intro}</p>
        </Reveal>

        <Reveal delay={0.32}>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="rounded-full bg-gradient-to-r from-ember to-flame px-6 py-3 text-sm font-medium text-void transition-transform hover:scale-[1.03]"
            >
              Get in touch
            </a>
            <a
              href={asset(person.resume)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-line px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ember/50 hover:text-ember"
            >
              Résumé ↗
            </a>
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-line px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ember/50 hover:text-ember"
            >
              GitHub ↗
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.42}>
          <ul className="mt-16 grid max-w-3xl grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
            {formations.map(({ key, title, blurb }) => (
              <li key={key} className="bg-void-2/70 px-5 py-4 backdrop-blur-sm">
                <p className="text-sm font-medium text-ink">{title}</p>
                <p className="mt-1 text-xs text-faint">{blurb}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <span
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.3em] text-faint uppercase"
      >
        Scroll
      </span>
    </section>
  );
}
