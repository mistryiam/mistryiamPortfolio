import { useEffect, useRef, useState } from 'react';
import { person, resume } from '../data/profile';
import { visibleSections } from '../lib/sections';
import { asset } from '../lib/asset';
import { IconClose, IconMenu } from './ui/Icons';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>('');
  const [open, setOpen] = useState(false);

  const listRef = useRef<HTMLUListElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  // Position and width of the pill that sits behind the current section's link.
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      // Read progress, written straight to the element: this runs on every
      // scroll frame and has no business re-rendering the nav.
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0;
      if (progress.current) progress.current.style.transform = `scaleX(${ratio})`;
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
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

    for (const { id } of visibleSections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  // The pill slides between links rather than each link lighting up on its own,
  // so the nav reads as one indicator moving with you down the page.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const measure = () => {
      const link = active ? list.querySelector<HTMLElement>(`[data-section="${active}"]`) : null;
      setPill(link ? { left: link.offsetLeft, width: link.offsetWidth } : null);
    };

    measure();
    // Font loading and viewport changes both move the links under the pill.
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, [active]);

  // An open sheet must not leave the page scrolling underneath it.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Widening past the breakpoint hides the toggle; the sheet must not survive it.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ease-quint ${
        scrolled || open
          ? 'border-b border-line bg-void/85 backdrop-blur-xl'
          : 'border-b border-transparent'
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6"
      >
        <a href="#top" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-ember opacity-0 transition-opacity duration-500 group-hover:opacity-40 group-hover:blur-[3px]" />
            <span className="relative h-2 w-2 rounded-full bg-gradient-to-br from-ember to-flame" />
          </span>
          <span className="font-mono text-sm font-medium tracking-tight text-ink">
            {person.name}
          </span>
        </a>

        <ul ref={listRef} className="relative hidden items-center gap-1 md:flex">
          {pill && (
            <span
              aria-hidden="true"
              className="absolute inset-y-0 left-0 rounded-full border border-ember/20 bg-ember/10 transition-all duration-500 ease-quint"
              style={{ transform: `translateX(${pill.left}px)`, width: pill.width }}
            />
          )}
          {visibleSections.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                data-section={id}
                aria-current={active === id ? 'true' : undefined}
                className={`relative block rounded-full px-3.5 py-1.5 text-sm transition-colors duration-300 ${
                  active === id ? 'text-ember' : 'text-muted hover:text-ink'
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          {resume && (
            <a
              href={asset(resume)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              Résumé
            </a>
          )}
          <a
            href="#contact"
            className="rounded-full border border-ember/40 px-4 py-1.5 text-sm text-ember transition-all duration-300 ease-quint hover:bg-ember/10 hover:shadow-[0_0_20px_-6px_var(--color-ember)]"
          >
            Let&rsquo;s talk
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="-mr-2 grid h-10 w-10 place-items-center rounded-full text-ink transition-colors hover:text-ember md:hidden"
        >
          {open ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Read progress, pinned to the header's own bottom edge. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-ember to-flame"
        ref={progress}
        style={{ transform: 'scaleX(0)' }}
      />

      {/* Tapping anywhere off the sheet closes it. Behind the nav bar, above the page. */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-x-0 top-16 bottom-0 -z-10 bg-void/70 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={`absolute inset-x-0 top-16 origin-top border-b border-line bg-void px-6 pb-6 shadow-[0_24px_48px_-24px_rgb(0_0_0/0.9)] transition-all duration-400 ease-quint md:hidden ${
          open ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-3 opacity-0'
        }`}
      >
        <ul className="flex flex-col">
          {visibleSections.map(({ id, label }, i) => (
            <li key={id}>
              <a
                href={`#${id}`}
                tabIndex={open ? undefined : -1}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${i * 35 + 60}ms` : '0ms' }}
                className={`flex items-baseline gap-4 border-b border-line/70 py-4 text-lg transition-all duration-500 ease-quint ${
                  open ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                } ${active === id ? 'text-ember' : 'text-ink'}`}
              >
                <span className="font-mono text-[11px] tabular-nums text-faint">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="#contact"
            tabIndex={open ? undefined : -1}
            onClick={() => setOpen(false)}
            className="btn btn-primary flex-1"
          >
            Get in touch
          </a>
          {resume && (
            <a
              href={asset(resume)}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={open ? undefined : -1}
              className="btn btn-ghost flex-1"
            >
              Résumé
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
