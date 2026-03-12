import React, { useEffect, useRef } from 'react';
import { MapPin, Mail, Phone, Globe, Clock, Briefcase, Code2, Award, ExternalLink, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import data from './data/data.json';
import profilePhoto from '/MyPhoto.png';

const About = () => {
  const aboutRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const elements = aboutRef.current.querySelectorAll('.fade-up');
    gsap.fromTo(elements, { y: 40, opacity: 0 }, {
      y: 0,
      opacity: 1,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: { trigger: aboutRef.current, start: 'top 80%' }
    });
  }, []);

  const stats = [
    { label: 'Years Experience', value: data.personal?.stats?.experience || '3+', icon: Clock },
    { label: 'Projects Built', value: '15+', icon: Briefcase },
    { label: 'Technologies', value: '25+', icon: Code2 },
    { label: 'Engagement Boost', value: '40%', icon: Award }
  ];

  return (
    <section id="about" className="section-padding relative" ref={aboutRef}>
      <div className="section-container">
        {/* Header */}
        <div className="fade-up mb-16">
          <div className="badge badge-primary mb-4">About Me</div>
          <h2 className="section-title">
            Get to know me
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="fade-up lg:col-span-1">
            <div className="card !p-0 overflow-hidden">
              {/* Photo */}
              <div className="relative aspect-[4/3] bg-zinc-800 overflow-hidden">
                <img
                  src={profilePhoto}
                  alt={data.personal?.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-xs font-medium text-emerald-400">Available for work</span>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-zinc-50">{data.personal?.name}</h3>
                  <p className="text-sm text-primary-400 font-medium">{data.personal?.title}</p>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 text-zinc-400">
                    <MapPin size={15} className="text-zinc-500 flex-shrink-0" />
                    <span>{data.personal?.location}</span>
                  </div>
                  <a href={`mailto:${data.personal?.email}`} className="flex items-center gap-3 text-zinc-400 hover:text-primary-400 transition-colors">
                    <Mail size={15} className="text-zinc-500 flex-shrink-0" />
                    <span className="truncate">{data.personal?.email}</span>
                  </a>
                  <a href={`tel:${data.personal?.phone}`} className="flex items-center gap-3 text-zinc-400 hover:text-primary-400 transition-colors">
                    <Phone size={15} className="text-zinc-500 flex-shrink-0" />
                    <span>{data.personal?.phone}</span>
                  </a>
                  <div className="flex items-center gap-3 text-zinc-400">
                    <Globe size={15} className="text-zinc-500 flex-shrink-0" />
                    <span>Remote & On-site</span>
                  </div>
                </div>

                {/* Social links */}
                <div className="flex gap-2 pt-2">
                  {[
                    { href: data.personal?.links?.github, label: 'GitHub' },
                    { href: data.personal?.links?.linkedin, label: 'LinkedIn' },
                    { href: data.personal?.links?.leetcode, label: 'LeetCode' },
                  ].map((link, i) => (
                    <a
                      key={i}
                      href={link.href || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-400 text-xs font-medium border border-zinc-700 hover:text-white hover:border-zinc-600 transition-all duration-200"
                    >
                      {link.label}
                      <ArrowUpRight size={10} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio */}
            <div className="fade-up card">
              <h3 className="text-lg font-semibold text-zinc-100 mb-4">About</h3>
              <p className="text-zinc-400 leading-relaxed">
                {data.personal?.description}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="fade-up card !p-5 text-center">
                  <stat.icon size={20} className="text-primary-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-zinc-50">{stat.value}</div>
                  <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Current Focus */}
            <div className="fade-up card">
              <h3 className="text-lg font-semibold text-zinc-100 mb-4">Current Focus</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {(data.currentFocus || []).map((focus, i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-800 text-sm text-zinc-300">
                    <span className="w-1.5 h-1.5 bg-primary-400 rounded-full flex-shrink-0" />
                    {focus.replace(/[🔬🎤🏥⚡📊]/g, '').trim()}
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="fade-up card">
              <h3 className="text-lg font-semibold text-zinc-100 mb-4">Key Achievements</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {(data.achievements || []).slice(0, 4).map((achievement, i) => (
                  <div key={i} className="p-4 rounded-xl bg-zinc-800/50 border border-zinc-800">
                    <div className="text-sm font-medium text-zinc-200 mb-1">
                      {achievement.title.replace(/[🚀⚡🎯📊🏛️]/g, '').trim()}
                    </div>
                    <div className="text-xs text-zinc-500">{achievement.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
