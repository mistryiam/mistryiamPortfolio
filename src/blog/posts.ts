import type { ComponentType } from 'react';
import metadata from './posts.meta.json';

export type PostMeta = {
  slug: string;
  title: string;
  /** ISO date, YYYY-MM-DD. Drives ordering, so it must sort lexicographically. */
  date: string;
  summary: string;
  tags?: string[];
  /** Visible while developing, never built or listed in production. */
  draft?: boolean;
};

/**
 * Lazy loaders, one per file in posts/. Non-eager on purpose: this module is
 * imported by the homepage listing, and an eager glob would pull the full text
 * of every post into the landing bundle.
 */
const loaders = import.meta.glob<{ default: ComponentType }>('./posts/*.tsx');

const byNewestFirst = (a: PostMeta, b: PostMeta) => b.date.localeCompare(a.date);

export const allPosts: PostMeta[] = [...(metadata as PostMeta[])].sort(byNewestFirst);

/**
 * What the site actually shows. The Vite plugin applies the same draft filter
 * when generating pages, so a listed post always has a page and vice versa.
 */
export const posts: PostMeta[] = allPosts.filter((post) => import.meta.env.DEV || !post.draft);

export const hasPosts = posts.length > 0;

export function findPost(slug: string): PostMeta | undefined {
  return posts.find((post) => post.slug === slug);
}

export function loadPost(slug: string) {
  return loaders[`./posts/${slug}.tsx`];
}

export function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
