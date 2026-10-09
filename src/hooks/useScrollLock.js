import { useEffect } from 'react';

let locks = 0;

/** Ref-counted body scroll lock so overlapping overlays don't unlock each other. */
export function useScrollLock(active) {
  useEffect(() => {
    if (!active) return undefined;
    locks += 1;
    document.body.style.overflow = 'hidden';
    return () => {
      locks -= 1;
      if (locks === 0) document.body.style.overflow = '';
    };
  }, [active]);
}
