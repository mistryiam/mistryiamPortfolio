/**
 * Resolve a file in `public/` against Vite's base path. The site is served from
 * a subdirectory on GitHub Pages, so a bare "/foo.jpg" would 404 in production
 * while working perfectly in dev — the exact bug this avoids.
 */
export function asset(file: string): string {
  return `${import.meta.env.BASE_URL}${file.replace(/^\//, '')}`;
}
