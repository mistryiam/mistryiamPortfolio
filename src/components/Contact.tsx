import { email, links, resume } from '../data/profile';
import { asset } from '../lib/asset';
import { Section } from './ui/Section';
import { Reveal } from './ui/Reveal';

type Channel = { label: string; value: string; href: string; external?: boolean };

/** The path a profile URL points at, e.g. "in/rohit-mistry-0563251a0". */
function profilePath(url: string): string {
  return new URL(url).pathname.replace(/^\/|\/$/g, '');
}

/**
 * Labels are derived from the URLs rather than typed alongside them, so a
 * changed profile link can't leave a stale handle displayed next to it.
 */
const channels: Channel[] = [
  { label: 'Email', value: email, href: `mailto:${email}` },
  { label: 'LinkedIn', value: profilePath(links.linkedin), href: links.linkedin, external: true },
  { label: 'GitHub', value: `@${profilePath(links.github)}`, href: links.github, external: true },
  {
    label: 'Instagram',
    value: `@${profilePath(links.instagram)}`,
    href: links.instagram,
    external: true,
  },
];

export function Contact() {
  return (
    <Section id="contact" eyebrow="Contact" title="Let's talk.">
      <Reveal>
        <p className="max-w-2xl leading-relaxed text-muted">
          Happy to talk about fraud detection, distributed systems, or anything that has to stay up
          under a few million requests a minute. Email is the fastest way to reach me.
        </p>
      </Reveal>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {channels.map((channel, i) => (
          <li key={channel.label}>
            <Reveal delay={i * 0.05}>
              <a
                href={channel.href}
                {...(channel.external ? { target: '_blank', rel: 'noopener noreferrer me' } : {})}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-line bg-void-2/70 px-6 py-5 backdrop-blur-sm transition-colors hover:border-ember/40"
              >
                <span className="min-w-0">
                  <span className="block font-mono text-[11px] tracking-[0.18em] text-faint uppercase">
                    {channel.label}
                  </span>
                  <span className="mt-1 block truncate text-ink transition-colors group-hover:text-ember">
                    {channel.value}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="text-faint transition-colors group-hover:text-ember"
                >
                  ↗
                </span>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>

      {resume && (
        <Reveal delay={0.2}>
          <a
            href={asset(resume)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex rounded-full bg-gradient-to-r from-ember to-flame px-6 py-3 text-sm font-medium text-void transition-transform hover:scale-[1.03]"
          >
            Download résumé (PDF)
          </a>
        </Reveal>
      )}
    </Section>
  );
}
