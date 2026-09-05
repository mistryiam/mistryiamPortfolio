import { useEffect, useState } from 'react';
import { person, sections } from '../data/profile';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // Highlight whichever section currently occupies the middle of the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );

    for (const { id } of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled
          ? 'border-b border-line bg-void/80 backdrop-blur-md'
          : 'border-b border-transparent'
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6"
      >
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-gradient-to-br from-ember to-flame" />
          <span className="font-mono text-sm font-medium tracking-tight text-ink">
            {person.name}
          </span>
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {sections.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={active === id ? 'true' : undefined}
                className={`text-sm transition-colors ${
                  active === id ? 'text-ember' : 'text-muted hover:text-ink'
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="rounded-full border border-ember/40 px-4 py-1.5 text-sm text-ember transition-colors hover:bg-ember/10 md:hidden"
        >
          Contact
        </a>
      </nav>
    </header>
  );
}
