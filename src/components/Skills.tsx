import type { ComponentType, SVGProps } from 'react';
import { skills } from '../data/profile';
import { trackSpotlight } from '../lib/spotlight';
import { Section } from './ui/Section';
import { Reveal } from './ui/Reveal';
import { IconCode, IconDatabase, IconGraph, IconServer, IconSpark } from './ui/Icons';

/** An icon per group, so the four panels are told apart before they are read. */
const groupIcon: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  Languages: IconCode,
  'Backend & Web': IconServer,
  'Data & Infrastructure': IconDatabase,
  'AI / ML': IconSpark,
  'CS Fundamentals': IconGraph,
};

export function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="The toolkit.">
      <div className="grid gap-4 sm:grid-cols-2">
        {skills.map((group, i) => {
          const Icon = groupIcon[group.name] ?? IconCode;
          return (
            <Reveal
              key={group.name}
              delay={i * 0.05}
              className={group.name === 'Data & Infrastructure' ? 'sm:col-span-2' : undefined}
            >
              <div onPointerMove={trackSpotlight} className="card card-hover group h-full p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-ember/20 bg-ember/8 text-ember transition-colors duration-300 group-hover:border-ember/40 group-hover:bg-ember/15">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="font-mono text-xs tracking-[0.18em] text-ember uppercase">
                    {group.name}
                  </h3>
                  <span className="ml-auto font-mono text-[11px] tabular-nums text-faint">
                    {group.items.length}
                  </span>
                </div>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-line bg-void/50 px-3 py-1.5 text-sm text-muted transition-colors duration-250 hover:border-line-2 hover:text-ink"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
