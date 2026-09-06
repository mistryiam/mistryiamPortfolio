import { Suspense, lazy, useMemo } from 'react';
import { asset } from '../lib/asset';
import { person } from '../data/profile';
import { findPost, formatDate, loadPost } from './posts';
import { Footer } from '../components/Footer';

type Props = { slug: string };

export function BlogPostPage({ slug }: Props) {
  const meta = findPost(slug);
  const loader = loadPost(slug);

  // lazy() must not be re-created on every render or React remounts the post.
  const Post = useMemo(() => (loader ? lazy(loader) : null), [loader]);

  if (!meta || !Post) return <NotFound />;

  return (
    <div className="relative min-h-screen">
      <header className="border-b border-line">
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
          <a href={asset('#blog')} className="text-sm text-muted transition-colors hover:text-ink">
            ← All posts
          </a>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-3xl px-6 py-16 md:py-24">
        <article>
          <p className="font-mono text-xs tracking-[0.2em] text-ember uppercase">
            <time dateTime={meta.date}>{formatDate(meta.date)}</time>
          </p>
          <h1 className="mt-4 text-4xl leading-[1.05] font-semibold tracking-tight text-balance text-ink md:text-5xl">
            {meta.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">{meta.summary}</p>

          {meta.tags && meta.tags.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {meta.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-faint"
                >
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
          className="mt-8 inline-flex text-sm text-ember transition-colors hover:text-flame"
        >
          ← Back to all posts
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
      <a
        href={asset('#blog')}
        className="mt-8 inline-flex w-fit rounded-full bg-gradient-to-r from-ember to-flame px-6 py-3 text-sm font-medium text-void"
      >
        See all posts
      </a>
    </main>
  );
}
