import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const readVar = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim().split(/\s+/).join(',');
const readSnowColor = () => ({ fill: readVar('--snow'), edge: readVar('--snow-edge') });

/**
 * Ambient snowfall on a single canvas. Three depth layers (size, speed and opacity
 * scale together) with gentle wind sway. Pauses when the tab is hidden and renders
 * nothing for visitors who prefer reduced motion.
 */
export default function Snowfall() {
  const canvasRef = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return undefined;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let flakes = [];
    let raf = null;
    let color = readSnowColor();

    const makeFlake = (startAnywhere) => {
      const depth = Math.random();
      return {
        x: Math.random() * width,
        y: startAnywhere ? Math.random() * height : -10,
        r: 0.6 + depth * 2.4,
        speed: 0.25 + depth * 1.1,
        alpha: 0.25 + depth * 0.6,
        sway: 0.4 + Math.random() * 1.2,
        phase: Math.random() * Math.PI * 2,
      };
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = Math.min(170, Math.round((width * height) / 9000));
      flakes = Array.from({ length: target }, () => makeFlake(true));
    };

    let last = performance.now();
    const tick = (now) => {
      const dt = Math.min(3, (now - last) / 16.67);
      last = now;
      const wind = Math.sin(now / 4000) * 0.35;
      ctx.clearRect(0, 0, width, height);
      for (const flake of flakes) {
        flake.phase += 0.01 * dt;
        flake.y += flake.speed * dt;
        flake.x += (Math.sin(flake.phase) * flake.sway * 0.3 + wind) * dt;
        if (flake.y > height + 10) Object.assign(flake, makeFlake(false));
        if (flake.x > width + 10) flake.x = -10;
        if (flake.x < -10) flake.x = width + 10;
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color.fill},${flake.alpha})`;
        ctx.fill();
        if (flake.r > 1.4) {
          ctx.lineWidth = 0.6;
          ctx.strokeStyle = `rgba(${color.edge},${flake.alpha * 0.6})`;
          ctx.stroke();
        }
      }
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = null;
    };
    const onVisibility = () => (document.hidden ? stop() : start());
    // Re-read the flake colour when the light/dark class flips.
    const themeObserver = new MutationObserver(() => {
      color = readSnowColor();
    });

    resize();
    start();
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      stop();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
      themeObserver.disconnect();
    };
  }, [reduce]);

  if (reduce) return null;
  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1] h-full w-full" />;
}
