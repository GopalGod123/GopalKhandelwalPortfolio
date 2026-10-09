export const ease = [0.22, 1, 0.36, 1];

/** Spread onto a motion element to fade it up once when it scrolls into view. */
export const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease, delay },
});
