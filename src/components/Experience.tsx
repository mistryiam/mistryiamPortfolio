import { useState } from 'react';
import { experience, type Role } from '../data/profile';
import { trackSpotlight } from '../lib/spotlight';
import { Section } from './ui/Section';
import { Reveal } from './ui/Reveal';

/** Highlights shown before the card asks you to opt into the rest. */
const PREVIEW = 3;

function Highlight({ point }: { point: string }) {
  return (
    <li className="flex gap-3 text-sm leading-relaxed text-muted">
      <span aria-hidden="true" className="mt-[0.5rem] h-1 w-1 shrink-0 rounded-full bg-ember/70" />
      <span>{point}</span>
    </li>
  );
}

function RoleCard({ role }: { role: Role }) {
  const [expanded, setExpanded] = useState(false);
  const preview = role.highlights.slice(0, PREVIEW);
  const hidden = role.highlights.slice(PREVIEW);

  return (
    <article onPointerMove={trackSpotlight} className="card card-hover p-6 md:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
        <h3 className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xl font-semibold tracking-tight text-ink">
          {role.company}
          {role.project && <span className="text-sm font-normal text-faint">{role.project}</span>}
          {role.current && (
            <span className="rounded-full bg-ember/12 px-2 py-0.5 font-mono text-[10px] tracking-wider text-ember uppercase ring-1 ring-ember/25">
              Current
            </span>
          )}
        </h3>
        <p className="font-mono text-xs whitespace-nowrap text-faint">{role.period}</p>
      </div>

      <p className="mt-1.5 text-sm text-ember">
        {role.title}
        {role.location && <span className="text-faint"> · {role.location}</span>}
      </p>

      <p className="mt-4 leading-relaxed text-muted">{role.summary}</p>

      <ul className="mt-5 space-y-3">
        {preview.map((point, i) => (
          <Highlight key={i} point={point} />
        ))}
      </ul>

      {hidden.length > 0 && (
        <>
          {/* Collapsed with a 0fr → 1fr grid row rather than a max-height guess,
              so the reveal animates to the content's real height every time. */}
          <div
            aria-hidden={!expanded}
            className={`grid transition-all duration-500 ease-quint ${
              expanded ? 'mt-3 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
            }`}
          >
            <ul className="space-y-3 overflow-hidden">
              {hidden.map((point, i) => (
                <Highlight key={i} point={point} />
              ))}
            </ul>
          </div>

          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 font-mono text-[11px] tracking-wider text-faint uppercase transition-colors duration-300 hover:border-ember/40 hover:text-ember"
          >
            {expanded ? 'Show less' : `${hidden.length} more`}
            <span
              aria-hidden="true"
              className={`transition-transform duration-500 ease-quint ${expanded ? 'rotate-180' : ''}`}
            >
              ↓
            </span>
          </button>
        </>
      )}

      <ul className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5">
        {role.tags.map((tag) => (
          <li key={tag} className="chip">
            {tag}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I've built things.">
      <ol className="relative space-y-8 pl-7 md:space-y-10 md:pl-12">
        {/* The rail runs the full column and fades out at the bottom, so the
            timeline reads as continuing rather than stopping at the last role. */}
        <div
          aria-hidden="true"
          className="absolute top-3 bottom-3 left-[5px] w-px bg-gradient-to-b from-ember/60 via-line to-transparent"
        />
        {experience.map((role, i) => (
          <li key={`${role.company}-${role.period}`} className="relative">
            <span
              aria-hidden="true"
              className={`absolute top-8 h-[11px] w-[11px] rounded-full -left-7 md:-left-12 ${
                role.current
                  ? 'bg-gradient-to-br from-ember to-flame ring-4 ring-ember/15'
                  : 'border border-line-2 bg-void'
              }`}
            />
            <Reveal delay={i * 0.05}>
              <RoleCard role={role} />
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
