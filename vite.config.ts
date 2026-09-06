import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// The site is served from https://mistryiam.github.io/mistryiamPortfolio/, so every
// asset URL needs that prefix. Change this if the repo is renamed or a custom
// domain is added (a custom domain serves from the root, so base becomes '/').
const BASE = '/mistryiamPortfolio/';
const ORIGIN = 'https://mistryiam.github.io';

const root = dirname(fileURLToPath(import.meta.url));

type PostMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags?: string[];
  draft?: boolean;
};

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * The shell for one post. Title, description and Open Graph tags are baked in
 * rather than set at runtime, because the crawlers that build link previews for
 * LinkedIn and Slack read the served HTML and never execute the JavaScript.
 */
function postShell(post: PostMeta): string {
  const url = `${ORIGIN}${BASE}blog/${post.slug}/`;
  const title = escapeHtml(post.title);
  const summary = escapeHtml(post.summary);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="${BASE}favicon.svg" />
    <title>${title} — Rohit Mistry</title>
    <meta name="description" content="${summary}" />
    <meta name="author" content="Rohit Mistry" />
    <meta name="theme-color" content="#08070a" />
    <link rel="canonical" href="${url}" />

    <meta property="og:type" content="article" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${summary}" />
    <meta property="og:url" content="${url}" />
    <meta property="article:published_time" content="${post.date}" />
    <meta name="twitter:card" content="summary_large_image" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
      rel="stylesheet"
    />

    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": ${JSON.stringify(post.title)},
        "description": ${JSON.stringify(post.summary)},
        "datePublished": "${post.date}",
        "url": "${url}",
        "author": { "@type": "Person", "name": "Rohit Mistry" }
      }
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/blog/main.tsx"></script>
  </body>
</html>
`;
}

/**
 * Writes one real HTML file per post into blog/<slug>/ and registers each as a
 * build entry, so a shared post link resolves to a genuine 200 page instead of
 * a client-side route the crawler cannot see. The directory is generated and
 * gitignored; posts.meta.json is the source of truth.
 */
function blogPages(): Plugin {
  return {
    name: 'blog-static-pages',
    config(_config, { command }) {
      const isDev = command === 'serve';
      const meta: PostMeta[] = JSON.parse(
        readFileSync(resolve(root, 'src/blog/posts.meta.json'), 'utf8'),
      );
      // Drafts render locally so they can be previewed, and are dropped from
      // the production build. This mirrors the filter in src/blog/posts.ts.
      const published = meta.filter((post) => isDev || !post.draft);

      const outDir = resolve(root, 'blog');
      // Rebuilt from scratch so a renamed or deleted post cannot leave a stale
      // page behind that would still be deployed.
      rmSync(outDir, { recursive: true, force: true });

      const input: Record<string, string> = { main: resolve(root, 'index.html') };
      for (const post of published) {
        const file = resolve(outDir, post.slug, 'index.html');
        mkdirSync(dirname(file), { recursive: true });
        writeFileSync(file, postShell(post));
        input[`blog-${post.slug}`] = file;
      }

      return { build: { rollupOptions: { input } } };
    },
  };
}

export default defineConfig({
  base: BASE,
  plugins: [react(), tailwindcss(), blogPages()],
  build: {
    target: 'es2020',
    // Three.js is inherently large. It is reached only through the lazy import
    // of the scene, so Rollup's own splitting keeps it out of the initial load —
    // naming it in manualChunks actually made things worse by pulling
    // react-reconciler into the eager bundle.
    chunkSizeWarningLimit: 1000,
  },
});
