import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BlogPostPage } from './BlogPostPage';
import '../index.css';

/**
 * Every generated post page loads this same entry. Each one is a real HTML file
 * at /blog/<slug>/, so the slug comes from the URL rather than from a router.
 */
function slugFromPath(): string {
  const base = import.meta.env.BASE_URL;
  const path = window.location.pathname;
  const relative = path.startsWith(base) ? path.slice(base.length) : path.replace(/^\//, '');
  return relative
    .replace(/^blog\//, '')
    .replace(/\/?(index\.html)?$/, '')
    .replace(/\/$/, '');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BlogPostPage slug={slugFromPath()} />
  </StrictMode>,
);
