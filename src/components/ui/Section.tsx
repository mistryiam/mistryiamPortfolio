import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
};

export function Section({ id, eyebrow, title, children }: Props) {
  return (
    <section id={id} className="relative mx-auto w-full max-w-5xl px-6 py-24 md:py-32">
      <Reveal>
        <p className="font-mono text-xs tracking-[0.25em] text-ember uppercase">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl">{title}</h2>
        <div className="mt-6 h-px w-full bg-gradient-to-r from-ember/60 via-line to-transparent" />
      </Reveal>
      <div className="mt-12">{children}</div>
    </section>
  );
}
