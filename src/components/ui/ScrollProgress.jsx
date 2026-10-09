import { motion, useScroll, useSpring } from 'framer-motion';

/** Thin ice-gradient bar along the top edge showing how far down the page you are. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-[#0284c7] via-[#38bdf8] to-[#a5f3fc] shadow-[0_0_12px_rgb(56_189_248/0.8)]"
    />
  );
}
