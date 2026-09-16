import { formatDate, posts } from '../blog/posts';
import { asset } from '../lib/asset';
import { trackSpotlight } from '../lib/spotlight';
import { Section } from './ui/Section';
import { Reveal } from './ui/Reveal';
import { IconArrowRight } from './ui/Icons';

export function Blog() {
  return (
    <Section
      id="blog"
      eyebrow="Blog"
      title="Things I've been working out."
      lead="Notes on distributed systems, fraud detection and whatever else I have had to reason carefully about lately."
    >
      <ul className="space-y-4">
        {posts.map((post, i) => (
          <li key={post.slug}>
            <Reveal delay={i * 0.05}>
              <a
                href={asset(`blog/${post.slug}/`)}
                onPointerMove={trackSpotlight}
                className="card card-hover group block p-6 md:p-8"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-xl font-semibold tracking-tight text-ink transition-colors duration-300 group-hover:text-ember">
                    {post.title}
                  </h3>
                  <time dateTime={post.date} className="font-mono text-xs text-faint">
                    {formatDate(post.date)}
                  </time>
                </div>

                <p className="mt-3 leading-relaxed text-muted">{post.summary}</p>

                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {post.draft && <span className="chip border-ember/40 text-ember">Draft</span>}
                  {post.tags?.map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                  <span className="ml-auto inline-flex items-center gap-1.5 text-sm text-faint transition-colors duration-300 group-hover:text-ember">
                    Read
                    <IconArrowRight className="nudge nudge-x h-3.5 w-3.5" />
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
