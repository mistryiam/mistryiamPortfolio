import { sections } from '../data/profile';
import { hasPosts } from '../blog/posts';

/**
 * The sections that actually exist on the page. With no published posts the
 * Blog section is not rendered, so linking to it — or numbering around it —
 * would point at nothing. Every consumer reads this list rather than the raw
 * one, which is what keeps the nav, the numbering and the page in agreement.
 */
export const visibleSections = sections.filter((section) => section.id !== 'blog' || hasPosts);

/** "01", "02", … for the section's position in the page, or '' if it has none. */
export function sectionNumber(id: string): string {
  const index = visibleSections.findIndex((section) => section.id === id);
  return index < 0 ? '' : String(index + 1).padStart(2, '0');
}
