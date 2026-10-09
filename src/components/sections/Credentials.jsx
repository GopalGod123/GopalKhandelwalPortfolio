import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { certifications, education } from '@/data/portfolio';
import { reveal } from '@/lib/motion';

export default function Credentials() {
  return (
    <section id="credentials" aria-labelledby="credentials-title" className="pb-14 md:pb-20">
      <div className="container-site">
        <div className="grid gap-4 lg:grid-cols-12">
          <motion.article {...reveal()} className="card relative overflow-hidden p-7 md:p-8 lg:col-span-5">
            <GraduationCap aria-hidden="true" className="absolute -bottom-6 -right-6 h-40 w-40 text-line" strokeWidth={1} />
            <p id="credentials-title" className="eyebrow">Education</p>
            <h3 className="mt-6 text-2xl font-medium tracking-tight">{education.degree}</h3>
            <p className="mt-1 text-muted">{education.school}</p>
            <div className="relative mt-8 flex flex-wrap gap-2">
              <span className="chip">{education.period}</span>
              <span className="chip">{education.location}</span>
            </div>
          </motion.article>

          <motion.article {...reveal(0.08)} className="card p-7 md:p-8 lg:col-span-7">
            <p className="eyebrow">Certifications</p>
            <ul className="mt-4">
              {certifications.map((cert) => (
                <li key={cert.name} className="flex items-baseline justify-between gap-4 border-b border-line py-3.5 last:border-0">
                  <span>
                    <span className="font-medium">{cert.name}</span>
                    <span className="block text-sm text-muted sm:inline sm:before:mx-2 sm:before:content-['·']">{cert.issuer}</span>
                  </span>
                  <span className="font-mono text-xs text-faint">{cert.year}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
