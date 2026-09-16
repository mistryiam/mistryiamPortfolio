import { stats } from '../data/profile';
import { CountUp } from './ui/CountUp';
import { Reveal } from './ui/Reveal';

export function Stats() {
  return (
    <section aria-label="Impact at a glance" className="relative mx-auto w-full max-w-5xl px-6">
      <Reveal>
        {/* One panel with hairline gutters rather than six floating cards: these
            numbers are a single readout, and spacing them apart would make each
            one argue for its own attention. */}
        <div className="card overflow-hidden">
          <div className="grid grid-cols-2 gap-px bg-line md:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group bg-void-2/85 px-5 py-6 transition-colors duration-300 hover:bg-void-3/85 md:px-6 md:py-7"
              >
                <p className="text-gradient text-3xl font-semibold tracking-tight md:text-4xl">
                  <CountUp value={stat.value} decimals={stat.decimals} />
                  {stat.suffix}
                </p>
                <p className="mt-2 text-sm font-medium text-ink">{stat.label}</p>
                <p className="mt-0.5 text-xs text-faint transition-colors duration-300 group-hover:text-muted">
                  {stat.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
