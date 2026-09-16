import { useEffect, useRef, useState, type ComponentType, type SVGProps } from 'react';
import { email, links, resume } from '../data/profile';
import { asset } from '../lib/asset';
import { trackSpotlight } from '../lib/spotlight';
import { Section } from './ui/Section';
import { Reveal } from './ui/Reveal';
import {
  IconCheck,
  IconCopy,
  IconDownload,
  IconExternal,
  IconGithub,
  IconInstagram,
  IconLinkedin,
  IconMail,
} from './ui/Icons';

type Channel = {
  label: string;
  value: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  external?: boolean;
};

/** The path a profile URL points at, e.g. "in/rohit-mistry-0563251a0". */
function profilePath(url: string): string {
  return new URL(url).pathname.replace(/^\/|\/$/g, '');
}

/**
 * Labels are derived from the URLs rather than typed alongside them, so a
 * changed profile link can't leave a stale handle displayed next to it.
 */
const channels: Channel[] = [
  { label: 'Email', value: email, href: `mailto:${email}`, icon: IconMail },
  {
    label: 'LinkedIn',
    value: profilePath(links.linkedin),
    href: links.linkedin,
    icon: IconLinkedin,
    external: true,
  },
  {
    label: 'GitHub',
    value: `@${profilePath(links.github)}`,
    href: links.github,
    icon: IconGithub,
    external: true,
  },
  {
    label: 'Instagram',
    value: `@${profilePath(links.instagram)}`,
    href: links.instagram,
    icon: IconInstagram,
    external: true,
  },
];

function ChannelBody({ channel }: { channel: Channel }) {
  const Icon = channel.icon;
  return (
    <>
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line bg-void/50 text-muted transition-colors duration-300 group-hover:border-ember/40 group-hover:text-ember">
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-mono text-[11px] tracking-[0.18em] text-faint uppercase">
          {channel.label}
        </span>
        <span className="mt-0.5 block truncate text-ink transition-colors duration-300 group-hover:text-ember">
          {channel.value}
        </span>
      </span>
    </>
  );
}

/**
 * The email card carries two actions — open a client, or take the address. A
 * button nested inside an anchor is invalid, so the anchor stretches its own
 * ::after over the card and the copy button is lifted above it.
 */
function EmailCard({ channel }: { channel: Channel }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(channel.value);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked (insecure context, or denied). The mailto still works.
    }
  };

  return (
    <div
      onPointerMove={trackSpotlight}
      className="card card-hover group flex items-center gap-4 px-5 py-4"
    >
      <a
        href={channel.href}
        className="flex min-w-0 flex-1 items-center gap-4 after:absolute after:inset-0"
      >
        <ChannelBody channel={channel} />
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? 'Email address copied' : 'Copy email address'}
        className="relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-faint transition-colors duration-300 hover:border-ember/40 hover:text-ember"
      >
        {copied ? <IconCheck className="h-4 w-4 text-ember" /> : <IconCopy className="h-4 w-4" />}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? 'Email address copied to clipboard' : ''}
      </span>
    </div>
  );
}

export function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's talk."
      lead="Happy to talk about fraud detection, distributed systems, or anything that has to stay up under a few million requests a minute. Email is the fastest way to reach me."
    >
      <ul className="grid gap-4 sm:grid-cols-2">
        {channels.map((channel, i) => (
          <li key={channel.label}>
            <Reveal delay={i * 0.05}>
              {channel.label === 'Email' ? (
                <EmailCard channel={channel} />
              ) : (
                <a
                  href={channel.href}
                  {...(channel.external ? { target: '_blank', rel: 'noopener noreferrer me' } : {})}
                  onPointerMove={trackSpotlight}
                  className="card card-hover group flex items-center gap-4 px-5 py-4"
                >
                  <ChannelBody channel={channel} />
                  <IconExternal className="nudge nudge-xy h-4 w-4 shrink-0 text-faint transition-colors duration-300 group-hover:text-ember" />
                </a>
              )}
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
            className="btn btn-primary mt-8"
          >
            <IconDownload className="h-4 w-4" />
            Download résumé (PDF)
          </a>
        </Reveal>
      )}
    </Section>
  );
}
