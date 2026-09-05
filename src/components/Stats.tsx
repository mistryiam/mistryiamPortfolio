import { stats } from '../data/profile';
import { CountUp } from './ui/CountUp';
import { Reveal } from './ui/Reveal';

export function Stats() {
  return (
    <section aria-label="Impact at a glance" className="relative mx-auto w-full max-w-5xl px-6">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.05} className="bg-void-2/80 backdrop-blur-sm">
            <div className="px-6 py-7">
              <p className="text-3xl font-semibold tracking-tight text-gradient md:text-4xl">
                <CountUp value={stat.value} decimals={stat.decimals} />
                {stat.suffix}
              </p>
              <p className="mt-2 text-sm font-medium text-ink">{stat.label}</p>
              <p className="mt-0.5 text-xs text-faint">{stat.note}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
