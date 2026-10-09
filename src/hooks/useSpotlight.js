import { useEffect } from 'react';

/**
 * One document-level listener that feeds the pointer position (as --mx / --my)
 * to whichever `.spotlight` element is under the cursor.
 */
export function useSpotlight() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return undefined;
    let frame = 0;
    let event = null;
    const onMove = (latest) => {
      event = latest;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const el = event.target instanceof Element ? event.target.closest('.spotlight') : null;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
        el.style.setProperty('--my', `${event.clientY - rect.top}px`);
      });
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      document.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
    };
  }, []);
}
