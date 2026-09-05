import { skills } from '../data/profile';
import { Section } from './ui/Section';
import { Reveal } from './ui/Reveal';

export function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="The toolkit.">
      <div className="grid gap-4 sm:grid-cols-2">
        {skills.map((group, i) => (
          <Reveal
            key={group.name}
            delay={i * 0.05}
            className={group.name === 'Data & Infrastructure' ? 'sm:col-span-2' : undefined}
          >
            <div className="h-full rounded-2xl border border-line bg-void-2/70 p-6 backdrop-blur-sm transition-colors hover:border-ember/30">
              <h3 className="font-mono text-xs tracking-[0.18em] text-ember uppercase">
                {group.name}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-line bg-void/60 px-3 py-1.5 text-sm text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
