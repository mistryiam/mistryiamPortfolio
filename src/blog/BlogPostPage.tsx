import { Suspense, lazy, useEffect, useMemo, useRef } from 'react';
import { asset } from '../lib/asset';
import { person } from '../data/profile';
import { findPost, formatDate, loadPost } from './posts';
import { Footer } from '../components/Footer';
import { IconArrowRight } from '../components/ui/Icons';

type Props = { slug: string };

/** How far through the article you are, as a bar along the header's edge. */
function ReadingProgress() {
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${ratio})`;
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <span
      ref={bar}
      aria-hidden="true"
      style={{ transform: 'scaleX(0)' }}
      className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-ember to-flame"
    />
  );
}

export function BlogPostPage({ slug }: Props) {
  const meta = findPost(slug);
  const loader = loadPost(slug);

  // lazy() must not be re-created on every render or React remounts the post.
  const Post = useMemo(() => (loader ? lazy(loader) : null), [loader]);

  if (!meta || !Post) return <NotFound />;

  return (
    <div className="relative min-h-screen grain">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 ambient" />

      <header className="sticky top-0 z-40 border-b border-line bg-void/85 backdrop-blur-xl">
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 w-full max-w-3xl items-center justify-between px-6"
        >
          <a href={asset('')} className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-gradient-to-br from-ember to-flame" />
            <span className="font-mono text-sm font-medium tracking-tight text-ink">
              {person.name}
            </span>
          </a>
          <a
            href={asset('#blog')}
            className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors duration-300 hover:text-ink"
          >
            <IconArrowRight className="nudge h-3.5 w-3.5 rotate-180 transition-transform duration-300 group-hover:-translate-x-1" />
            All posts
          </a>
        </nav>
        <ReadingProgress />
      </header>

      <main className="relative mx-auto w-full max-w-3xl px-6 py-16 md:py-24">
        <article>
          <p className="font-mono text-xs tracking-[0.2em] text-ember uppercase">
            <time dateTime={meta.date}>{formatDate(meta.date)}</time>
          </p>
          <h1 className="mt-4 text-4xl leading-[1.05] font-semibold tracking-[-0.03em] text-balance text-ink md:text-5xl">
            {meta.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">{meta.summary}</p>

          {meta.tags && meta.tags.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {meta.tags.map((tag) => (
                <li key={tag} className="chip">
                  {tag}
                </li>
              ))}
            </ul>
          )}

          <hr className="mt-10 border-line" />

          <div className="prose mt-10">
            <Suspense fallback={<p className="text-faint">Loading…</p>}>
              <Post />
            </Suspense>
          </div>
        </article>

        <hr className="mt-16 border-line" />

        <a
          href={asset('#blog')}
          className="group mt-8 inline-flex items-center gap-2 text-sm text-ember transition-colors duration-300 hover:text-flame"
        >
          <IconArrowRight className="h-4 w-4 rotate-180 transition-transform duration-300 group-hover:-translate-x-1" />
          Back to all posts
        </a>
      </main>

      <Footer />
    </div>
  );
}

function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center px-6">
      <p className="font-mono text-xs tracking-[0.2em] text-ember uppercase">404</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink">Post not found</h1>
      <p className="mt-4 text-muted">
        That post either moved or was never published. The full list is on the home page.
      </p>
      <a href={asset('#blog')} className="btn btn-primary mt-8 w-fit">
        See all posts
      </a>
    </main>
  );
}
