import { motion, useScroll, useSpring } from 'framer-motion';

/** Thin sapphire-gradient bar along the top edge showing how far down the page you are. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-[rgb(var(--accent-lo))] via-accent to-[rgb(var(--accent-hi))] shadow-[0_0_12px_rgb(var(--accent)/0.6)]"
    />
  );
}
