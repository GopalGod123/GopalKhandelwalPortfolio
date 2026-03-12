import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, Github, FileText, Code2, Award, Briefcase, Terminal } from 'lucide-react';
import gsap from 'gsap';
import data from './data/data.json';

const Hero = () => {
  const heroRef = useRef(null);
  const codeRef = useRef(null);
  const [currentRole, setCurrentRole] = useState(0);

  const roles = [
    "AI/ML Engineer",
    "Full Stack Developer",
    "Tech Innovator",
    "Problem Solver"
  ];

  useEffect(() => {
    const roleInterval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);

    const tl = gsap.timeline({ delay: 0.4 });

    tl.fromTo('.hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' })
      .fromTo('.hero-name', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.2')
      .fromTo('.hero-role', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3')
      .fromTo('.hero-desc', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.2')
      .fromTo('.hero-stats', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, '-=0.2')
      .fromTo('.hero-btns', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.2')
      .fromTo(codeRef.current, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.5');

    gsap.to('.code-float', {
      y: -8,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    return () => clearInterval(roleInterval);
  }, [roles.length]);

  return (
    <section id="hero" className="min-h-screen flex items-center relative" ref={heroRef}>
      <div className="section-container w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-screen py-24 lg:py-0">
          {/* Left */}
          <div className="order-2 lg:order-1 space-y-6">
            <div className="hero-badge badge badge-green">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span>Available for new opportunities</span>
            </div>

            <div className="space-y-2">
              <p className="text-zinc-400 text-lg">Hi, I'm</p>
              <h1 className="hero-name text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white">
                {data.personal?.name || "Gopal Khandelwal"}
              </h1>
            </div>

            <div className="hero-role text-xl sm:text-2xl lg:text-3xl text-zinc-300 font-medium min-h-[2.5rem]">
              <span className="text-gradient font-semibold">{roles[currentRole]}</span>
              <span className="animate-blink text-primary-400 ml-1">|</span>
            </div>

            <p className="hero-desc text-zinc-400 text-base sm:text-lg leading-relaxed max-w-xl">
              {data.personal?.description}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 py-2">
              {[
                { icon: Briefcase, label: 'Experience', value: data.personal?.stats?.experience || '3+ Years' },
                { icon: Code2, label: 'Projects', value: data.personal?.stats?.projects || '15+' },
                { icon: Award, label: 'Technologies', value: data.personal?.stats?.technologies || '25+' }
              ].map((stat, i) => (
                <div key={i} className="hero-stats flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                    <stat.icon size={18} className="text-primary-400" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-zinc-100">{stat.value}</div>
                    <div className="text-xs text-zinc-500">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="hero-btns flex flex-wrap gap-3 pt-2">
              <a href={data.personal?.links?.resume || "#"} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <FileText size={18} />
                <span>View Resume</span>
              </a>
              <a href={data.personal?.links?.github || "#"} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                <Github size={18} />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          {/* Right — Code Window */}
          <div className="order-1 lg:order-2" ref={codeRef}>
            <div className="code-float relative max-w-lg mx-auto lg:max-w-none">
              <div className="relative bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl shadow-black/40">
                {/* Terminal Header */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-800 bg-zinc-900/80">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-zinc-700" />
                    <div className="w-3 h-3 rounded-full bg-zinc-700" />
                    <div className="w-3 h-3 rounded-full bg-zinc-700" />
                  </div>
                  <div className="flex items-center gap-2 text-zinc-500 text-xs font-code">
                    <Terminal size={12} />
                    <span>developer.js</span>
                  </div>
                </div>

                {/* Code */}
                <div className="p-5 font-code text-[13px] leading-6 space-y-1">
                  <div>
                    <span className="text-zinc-600 mr-4 select-none">01</span>
                    <span className="text-primary-400">const</span>
                    <span className="text-amber-300"> developer</span>
                    <span className="text-zinc-400"> = </span>
                    <span className="text-yellow-300">{'{'}</span>
                  </div>
                  <div>
                    <span className="text-zinc-600 mr-4 select-none">02</span>
                    <span className="text-zinc-400 ml-4">name</span>
                    <span className="text-zinc-500">: </span>
                    <span className="text-green-400">"{data.personal?.name}"</span>
                    <span className="text-zinc-500">,</span>
                  </div>
                  <div>
                    <span className="text-zinc-600 mr-4 select-none">03</span>
                    <span className="text-zinc-400 ml-4">role</span>
                    <span className="text-zinc-500">: </span>
                    <span className="text-green-400">"{roles[currentRole]}"</span>
                    <span className="text-zinc-500">,</span>
                  </div>
                  <div>
                    <span className="text-zinc-600 mr-4 select-none">04</span>
                    <span className="text-zinc-400 ml-4">skills</span>
                    <span className="text-zinc-500">: </span>
                    <span className="text-orange-400">[</span>
                  </div>
                  <div>
                    <span className="text-zinc-600 mr-4 select-none">05</span>
                    <span className="text-green-400 ml-8">"React & Next.js"</span>
                    <span className="text-zinc-500">,</span>
                  </div>
                  <div>
                    <span className="text-zinc-600 mr-4 select-none">06</span>
                    <span className="text-green-400 ml-8">"Node.js & Python"</span>
                    <span className="text-zinc-500">,</span>
                  </div>
                  <div>
                    <span className="text-zinc-600 mr-4 select-none">07</span>
                    <span className="text-green-400 ml-8">"AI/ML & LLMs"</span>
                    <span className="text-zinc-500">,</span>
                  </div>
                  <div>
                    <span className="text-zinc-600 mr-4 select-none">08</span>
                    <span className="text-green-400 ml-8">"Cloud & DevOps"</span>
                  </div>
                  <div>
                    <span className="text-zinc-600 mr-4 select-none">09</span>
                    <span className="text-orange-400 ml-4">]</span>
                    <span className="text-zinc-500">,</span>
                  </div>
                  <div>
                    <span className="text-zinc-600 mr-4 select-none">10</span>
                    <span className="text-zinc-400 ml-4">passion</span>
                    <span className="text-zinc-500">: </span>
                    <span className="text-green-400">"Building intelligent systems"</span>
                  </div>
                  <div>
                    <span className="text-zinc-600 mr-4 select-none">11</span>
                    <span className="text-yellow-300">{'}'}</span>
                  </div>
                  <div className="pt-2">
                    <span className="text-zinc-600 mr-4 select-none">12</span>
                    <span className="text-zinc-500">{'// '}</span>
                    <span className="text-zinc-600">Ready to innovate</span>
                    <span className="animate-blink text-primary-400 ml-1">_</span>
                  </div>
                </div>

                {/* Terminal Output */}
                <div className="px-5 py-3 border-t border-zinc-800 bg-zinc-950/50">
                  <div className="text-emerald-400 text-xs font-code flex items-center gap-2">
                    <span className="text-zinc-600">$</span>
                    <span>Ready to innovate</span>
                    <span className="animate-pulse">_</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <button
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex flex-col items-center gap-1 text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          <span className="text-[10px] font-medium uppercase tracking-widest">Scroll</span>
          <ArrowDown size={16} />
        </button>
      </div>
    </section>
  );
};

export default Hero;
