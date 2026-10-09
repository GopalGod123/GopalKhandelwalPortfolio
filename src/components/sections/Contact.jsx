import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CalendarDays, Check, Copy, Linkedin, Phone } from 'lucide-react';
import { profile } from '@/data/portfolio';
import { reveal } from '@/lib/motion';
import Modal from '@/components/ui/Modal';
import { GlacierRange } from '@/components/ui/Glacier';
import Magnetic from '@/components/ui/Magnetic';
import SplitText from '@/components/ui/SplitText';
import ContactForm from './ContactForm';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [scheduling, setScheduling] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden py-14 md:py-20">
      <div className="container-site">
        <div className="ice-surface spotlight relative overflow-hidden rounded-[2rem] border border-line px-6 py-16 text-ink shadow-[0_40px_80px_-40px_rgb(var(--shadow)/0.5),inset_0_1px_0_rgb(var(--gloss-hi)/0.7)] sm:px-10 md:px-16 md:py-24">
          <div aria-hidden="true" className="orb -top-40 left-[5%] h-[26rem] w-[40rem] animate-drift bg-[rgb(var(--aurora-1)/0.4)] blur-[120px]" />
          <div aria-hidden="true" className="orb -bottom-32 right-0 h-[22rem] w-[40rem] animate-drift-slow bg-[rgb(var(--aurora-3)/0.4)] blur-[120px]" />
          <GlacierRange water={false} className="pointer-events-none absolute inset-x-0 bottom-0 h-28 w-full opacity-90 dark:opacity-50 md:h-40" />
          <div aria-hidden="true" className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgb(var(--line)/0.6)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--line)/0.6)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

          <div className="relative grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
            <motion.p {...reveal()} className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
              <span className="text-accent-text">08</span> / Contact
            </motion.p>

            <h2 className="mt-8 text-[clamp(2.5rem,5.6vw,5rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
              <SplitText inView className="block">Let’s build</SplitText>
              <SplitText inView delay={0.15} className="block">
                something that <span className="serif-accent ice-text">ships.</span>
              </SplitText>
            </h2>

            <motion.p {...reveal(0.15)} className="mt-8 max-w-xl text-lead text-muted">
              Whether you are taking an AI product from idea to launch or scaling one that already has users, I partner with teams that need it to perform in the real world. Let’s talk about yours.
            </motion.p>

            <motion.div {...reveal(0.2)} className="mt-10 flex flex-col gap-6 border-t border-line pt-8">
              <div className="flex min-w-0 items-center gap-3">
                <a href={`mailto:${profile.email}`} className="min-w-0 truncate text-[clamp(1.15rem,2.4vw,1.75rem)] font-medium tracking-tight transition-colors hover:text-accent-text">
                  {profile.email}
                </a>
                <button
                  onClick={copyEmail}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors hover:border-ink/30 hover:text-ink"
                  aria-label={copied ? 'Email copied' : 'Copy email address'}
                >
                  {copied ? <Check size={16} className="text-accent-text" /> : <Copy size={16} />}
                </button>
                <span role="status" className="sr-only">{copied ? 'Email copied to clipboard' : ''}</span>
              </div>

              <div className="flex flex-wrap gap-3">
                <Magnetic>
                  <button onClick={() => setScheduling(true)} className="btn-accent">
                    <CalendarDays size={16} /> Book a call
                  </button>
                </Magnetic>
                <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  <Linkedin size={16} /> LinkedIn
                </a>
                <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="btn-ghost">
                  <Phone size={16} /> Call
                </a>
                <a href={profile.links.resume} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  Résumé <ArrowUpRight size={16} />
                </a>
              </div>
            </motion.div>
            </div>
            <motion.div {...reveal(0.15)} className="lg:col-span-5 lg:self-center">
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </div>

      <Modal open={scheduling} onClose={() => setScheduling(false)} title="Book a call with Gopal">
        <iframe src={profile.links.schedule} title="Booking calendar" className="h-[min(75vh,680px)] w-full border-0 bg-white" />
      </Modal>
    </section>
  );
}
