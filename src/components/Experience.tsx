import { experience, type Role } from '../data/profile';
import { Section } from './ui/Section';
import { Reveal } from './ui/Reveal';

function RoleCard({ role }: { role: Role }) {
  return (
    <article className="relative rounded-2xl border border-line bg-void-2/70 p-6 backdrop-blur-sm transition-colors hover:border-ember/30 md:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-xl font-semibold tracking-tight text-ink">
          {role.company}
          {role.project && (
            <span className="ml-2 text-sm font-normal text-faint">{role.project}</span>
          )}
        </h3>
        <p className="font-mono text-xs text-faint">{role.period}</p>
      </div>

      <p className="mt-1 text-sm text-ember">
        {role.title}
        {role.location && <span className="text-faint"> · {role.location}</span>}
      </p>

      <p className="mt-4 leading-relaxed text-muted">{role.summary}</p>

      <ul className="mt-5 space-y-3">
        {role.highlights.map((point, i) => (
          <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted">
            <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ember/70" />
            <span>{point}</span>
          </li>
        ))}
      </ul>

      <ul className="mt-6 flex flex-wrap gap-2">
        {role.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-faint"
          >
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
      <ol className="relative space-y-8 md:space-y-10 md:pl-10">
        {/* The rail only exists on desktop, where there's room for it to read as a timeline. */}
        <div
          aria-hidden="true"
          className="absolute top-2 bottom-2 left-[5px] hidden w-px bg-gradient-to-b from-ember/60 via-line to-transparent md:block"
        />
        {experience.map((role, i) => (
          <li key={`${role.company}-${role.period}`} className="relative">
            <span
              aria-hidden="true"
              className={`absolute top-8 -left-10 hidden h-[11px] w-[11px] rounded-full md:block ${
                role.current
                  ? 'bg-gradient-to-br from-ember to-flame ring-4 ring-ember/15'
                  : 'border border-line bg-void'
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
