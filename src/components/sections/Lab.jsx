import { lazy, Suspense, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { reveal } from '@/lib/motion';
import SectionHeader from '@/components/ui/SectionHeader';

// Three.js is ~600 kB — only download it when the visitor scrolls near the lab.
const RadarDemo = lazy(() => import('@/components/lab/RadarDemo'));

const notes = [
  ['Kinematic prediction', 'The interceptor aims at where the target will be, not where it is, using a constant-velocity model.'],
  ['Collision detection', 'Each frame checks the missile–target distance against a hit radius and resolves hit or miss in real time.'],
  ['Efficient render loop', 'An orthographic Three.js scene whose animation loop pauses automatically when it’s off-screen.'],
];

function Placeholder() {
  return (
    <div className="grid-bg grid aspect-[4/3] w-full place-items-center rounded-2xl border border-line bg-soft font-mono text-xs text-faint sm:aspect-[16/10]">
      Initialising radar…
    </div>
  );
}

export default function Lab() {
  const ref = useRef(null);
  const near = useInView(ref, { once: true, margin: '400px' });

  return (
    <section id="lab" className="py-14 md:py-20">
      <div className="container-site">
        <SectionHeader index="05" label="Lab" title={<>An interactive experiment: <span className="serif-accent ice-text">radar interception</span>.</>}>
          A small simulation exploring defence-systems thinking: track a moving target, predict its path and intercept it. Try it.
        </SectionHeader>

        <div className="grid gap-10 lg:grid-cols-12">
          <motion.div {...reveal()} ref={ref} className="lg:col-span-8">
            {near ? (
              <Suspense fallback={<Placeholder />}>
                <RadarDemo />
              </Suspense>
            ) : (
              <Placeholder />
            )}
          </motion.div>
          <ol className="space-y-6 lg:col-span-4">
            {notes.map(([title, body], index) => (
              <motion.li key={title} {...reveal(index * 0.06)} className="border-t border-line pt-5">
                <p className="font-mono text-xs text-accent-text">0{index + 1}</p>
                <h3 className="mt-2 font-medium">{title}</h3>
                <p className="mt-1.5 text-sm text-muted">{body}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
