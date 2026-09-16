import type { PointerEvent } from 'react';

/**
 * Writes the pointer's position inside an element as `--spot-x` / `--spot-y`,
 * which the `.card` glow reads.
 *
 * The node is touched directly instead of going through state: this fires on
 * every pointer move, and a React render per frame would cost far more than the
 * effect is worth. Only one card can be hovered at a time, so at most one
 * element is ever being measured.
 */
export function trackSpotlight(event: PointerEvent<HTMLElement>): void {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
  el.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
}
