import { formatDate, posts } from '../blog/posts';
import { asset } from '../lib/asset';
import { Section } from './ui/Section';
import { Reveal } from './ui/Reveal';

export function Blog() {
  return (
    <Section id="blog" eyebrow="Blog" title="Things I've been working out.">
      <Reveal>
        <p className="max-w-2xl leading-relaxed text-muted">
          Notes on distributed systems, fraud detection and whatever else I have had to reason
          carefully about lately.
        </p>
      </Reveal>

      <ul className="mt-10 space-y-4">
        {posts.map((post, i) => (
          <li key={post.slug}>
            <Reveal delay={i * 0.05}>
              <a
                href={asset(`blog/${post.slug}/`)}
                className="group block rounded-2xl border border-line bg-void-2/70 p-6 backdrop-blur-sm transition-colors hover:border-ember/40 md:p-8"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-xl font-semibold tracking-tight text-ink transition-colors group-hover:text-ember">
                    {post.title}
                  </h3>
                  <time dateTime={post.date} className="font-mono text-xs text-faint">
                    {formatDate(post.date)}
                  </time>
                </div>

                <p className="mt-3 leading-relaxed text-muted">{post.summary}</p>

                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {post.draft && (
                    <span className="rounded-full border border-ember/40 px-3 py-1 font-mono text-[11px] text-ember">
                      Draft
                    </span>
                  )}
                  {post.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-faint"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="ml-auto text-sm text-faint transition-colors group-hover:text-ember">
                    Read →
                  </span>
                </div>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
