import { about, person } from '../data/profile';
import { asset } from '../lib/asset';
import { Section } from './ui/Section';
import { Reveal } from './ui/Reveal';

export function About() {
  return (
    <Section id="about" eyebrow="About" title="Fraud is a systems problem.">
      <div className="grid gap-12 md:grid-cols-[260px_1fr] md:gap-14">
        <Reveal>
          <figure className="relative mx-auto w-52 md:sticky md:top-28 md:mx-0 md:w-full">
            {/* The portrait is already lit with a warm rim; this glow continues it
                into the page instead of leaving the photo floating on flat black. */}
            <div
              aria-hidden="true"
              className="absolute -inset-6 rounded-full bg-[radial-gradient(circle,rgba(255,122,24,0.28),transparent_68%)] blur-xl"
            />
            <img
              src={asset(person.photo.small)}
              srcSet={`${asset(person.photo.small)} 640w, ${asset(person.photo.large)} 1280w`}
              sizes="(min-width: 768px) 260px, 208px"
              alt={person.photo.alt}
              width={640}
              height={640}
              loading="lazy"
              decoding="async"
              className="relative w-full rounded-full ring-1 ring-ember/25"
            />
          </figure>
        </Reveal>

        <div className="rounded-2xl border border-line bg-void-2/70 p-6 backdrop-blur-sm md:p-8">
          <div className="space-y-5">
            {about.map((paragraph, i) => (
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
