import type { ReactNode } from 'react';
import { sectionNumber } from '../../lib/sections';
import { Reveal } from './Reveal';

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  /** One line under the heading. Sets up the section before the content lands. */
  lead?: string;
  children: ReactNode;
};

export function Section({ id, eyebrow, title, lead, children }: Props) {
  const number = sectionNumber(id);

  return (
    <section id={id} className="relative mx-auto w-full max-w-5xl px-6 py-24 md:py-32">
      <Reveal>
        <div className="flex items-center gap-3">
          {number && <span className="font-mono text-xs tabular-nums text-ember/70">{number}</span>}
          <span
            aria-hidden="true"
            className="h-px w-7 bg-gradient-to-r from-ember/60 to-ember/10"
          />
          <p className="font-mono text-xs tracking-[0.25em] text-ember uppercase">{eyebrow}</p>
        </div>

        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance text-ink md:text-[2.6rem] md:leading-[1.1]">
          {title}
        </h2>

        {lead && <p className="mt-4 max-w-2xl leading-relaxed text-muted">{lead}</p>}

        <div
          aria-hidden="true"
          className="mt-8 h-px w-full bg-gradient-to-r from-ember/50 via-line to-transparent"
        />
      </Reveal>

      <div className="mt-12">{children}</div>
    </section>
  );
}
