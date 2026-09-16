import { about, person } from '../data/profile';
import { asset } from '../lib/asset';
import { Section } from './ui/Section';
import { Reveal } from './ui/Reveal';

export function About() {
  const [lead, ...rest] = about;

  return (
    <Section id="about" eyebrow="About" title="Fraud is a systems problem.">
      <div className="grid gap-12 md:grid-cols-[280px_1fr] md:gap-16">
        <Reveal>
          <figure className="relative mx-auto w-52 md:sticky md:top-28 md:mx-0 md:w-full">
            {/* The portrait is already lit with a warm rim; this glow continues it
                into the page instead of leaving the photo floating on flat black. */}
            <div
              aria-hidden="true"
              className="absolute -inset-6 rounded-full bg-[radial-gradient(circle,rgba(255,122,24,0.26),transparent_68%)] blur-xl"
            />
            {/* A gradient hairline, drawn as a 1px padded ring so the warm edge
                wraps the whole circle instead of sitting on one side of it. */}
            <div className="relative rounded-full bg-gradient-to-br from-ember/60 via-line to-flame/30 p-px">
              <img
                src={asset(person.photo.small)}
                srcSet={`${asset(person.photo.small)} 640w, ${asset(person.photo.large)} 1280w`}
                sizes="(min-width: 768px) 280px, 208px"
                alt={person.photo.alt}
                width={640}
                height={640}
                loading="lazy"
                decoding="async"
                className="w-full rounded-full"
              />
            </div>
          </figure>
        </Reveal>

        <div className="card p-6 md:p-8">
          <Reveal>
            {/* The opening paragraph carries the section, so it is set as a lead
                rather than as the first of four identical grey blocks. */}
            <p className="text-lg leading-relaxed text-ink/90 md:text-xl md:leading-relaxed">
              {lead}
            </p>
          </Reveal>

          <div className="mt-6 space-y-5 border-t border-line pt-6">
            {rest.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p className="leading-relaxed text-muted">{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
