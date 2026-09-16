import { links, person } from '../data/profile';
import { visibleSections } from '../lib/sections';
import { IconGithub, IconInstagram, IconLinkedin } from './ui/Icons';

const socials = [
  { label: 'GitHub', href: links.github, icon: IconGithub },
  { label: 'LinkedIn', href: links.linkedin, icon: IconLinkedin },
  { label: 'Instagram', href: links.instagram, icon: IconInstagram },
];

export function Footer() {
  return (
    <footer className="relative border-t border-line">
      {/* A warm seam where the page ends, matching the rule under each section
          heading — the two bookend the content instead of it just stopping. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ember/35 to-transparent"
      />

      <div className="mx-auto w-full max-w-5xl px-6 py-12">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div>
            <a href="#top" className="group flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-gradient-to-br from-ember to-flame" />
              <span className="font-mono text-sm font-medium tracking-tight text-ink">
                {person.name}
              </span>
            </a>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-faint">{person.tagline}</p>
          </div>

          <nav aria-label="Footer" className="flex flex-col items-start gap-2 sm:items-end">
            {visibleSections.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className="text-sm text-muted transition-colors duration-300 hover:text-ember"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          <p className="text-sm text-faint">
            © {new Date().getFullYear()} {person.name}
          </p>

          <ul className="flex items-center gap-2">
            {socials.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer me"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-line text-faint transition-all duration-300 ease-quint hover:-translate-y-0.5 hover:border-ember/40 hover:text-ember"
                >
                  <Icon className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>

          <p className="font-mono text-xs text-faint">Built with React, Three.js and Tailwind</p>
        </div>
      </div>
    </footer>
  );
}
