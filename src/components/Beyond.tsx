import { achievements, education } from '../data/profile';
import { trackSpotlight } from '../lib/spotlight';
import { Section } from './ui/Section';
import { Reveal } from './ui/Reveal';

export function Beyond() {
  return (
    <Section id="beyond" eyebrow="Beyond Work" title="Education & the competitive habit.">
      <Reveal>
        <div className="card p-6 md:p-8">
          <p className="font-mono text-[11px] tracking-[0.18em] text-ember uppercase">Education</p>
          <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="text-xl font-semibold tracking-tight text-ink">{education.school}</h3>
            <p className="font-mono text-xs text-faint">{education.period}</p>
          </div>
        </div>
      </Reveal>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {achievements.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.05}>
            <div onPointerMove={trackSpotlight} className="card card-hover h-full p-6">
              <span className="font-mono text-[11px] tabular-nums text-ember/60">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 font-medium text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.detail}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
