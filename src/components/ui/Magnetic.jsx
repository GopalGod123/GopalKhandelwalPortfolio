import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

const spring = { stiffness: 220, damping: 18, mass: 0.4 };

/** Pulls its child a few pixels towards the pointer, then springs back on leave. */
export default function Magnetic({ children, strength = 0.25, className = 'inline-flex' }) {
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), spring);
  const y = useSpring(useMotionValue(0), spring);

  if (reduce) return children;

  const onMove = (event) => {
    if (event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * strength);
    y.set((event.clientY - rect.top - rect.height / 2) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span style={{ x, y }} onPointerMove={onMove} onPointerLeave={reset} className={className}>
      {children}
    </motion.span>
  );
}
