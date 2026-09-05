import { achievements, education } from '../data/profile';
import { Section } from './ui/Section';
import { Reveal } from './ui/Reveal';

export function Beyond() {
  return (
    <Section id="beyond" eyebrow="Beyond Work" title="Education & the competitive habit.">
      <Reveal>
        <div className="rounded-2xl border border-line bg-void-2/70 p-6 backdrop-blur-sm md:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="text-xl font-semibold tracking-tight text-ink">{education.school}</h3>
            <p className="font-mono text-xs text-faint">{education.period}</p>
          </div>
        </div>
      </Reveal>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {achievements.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.05}>
            <div className="h-full rounded-2xl border border-line bg-void-2/70 p-6 backdrop-blur-sm transition-colors hover:border-ember/30">
              <h3 className="font-medium text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.detail}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
