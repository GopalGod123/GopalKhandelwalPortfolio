import React, { useEffect, useRef } from 'react';
import { GraduationCap, Calendar, Award, BookOpen } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import data from './data/data.json';

const Education = () => {
  const educationRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const elements = educationRef.current.querySelectorAll('.fade-up');
    gsap.fromTo(elements, { y: 40, opacity: 0 }, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: { trigger: educationRef.current, start: 'top 80%' }
    });
  }, []);

  return (
    <section id="education" className="section-padding relative" ref={educationRef}>
      <div className="section-container">
        {/* Header */}
        <div className="fade-up mb-16">
          <div className="badge badge-primary mb-4">
            <GraduationCap size={12} />
            Education
          </div>
          <h2 className="section-title mb-4">Education & Certifications</h2>
          <p className="section-subtitle">
            Academic foundation and professional certifications.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Education */}
          <div className="space-y-5">
            <h3 className="fade-up text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">Academic</h3>
            {data.education.map((edu, index) => (
              <div key={index} className="fade-up card group hover:border-zinc-700">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center flex-shrink-0">
                    <GraduationCap size={22} className="text-primary-400" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-zinc-100">{edu.institution}</h4>
                    <p className="text-sm text-primary-400 font-medium">{edu.degree || edu.course}</p>
                    {edu.specialization && (
                      <p className="text-sm text-zinc-500">{edu.specialization}</p>
                    )}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={12} />
                        <span>{edu.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Award size={12} />
                        <span>{edu.grade}</span>
                      </div>
                    </div>
                    {edu.achievements && (
                      <div className="pt-2 space-y-1.5">
                        {edu.achievements.map((a, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-zinc-400">
                            <span className="w-1 h-1 bg-zinc-600 rounded-full mt-1.5 flex-shrink-0" />
                            {a}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="space-y-5">
            <h3 className="fade-up text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">Certifications</h3>
            <div className="space-y-3">
              {data.certifications?.map((cert, index) => (
                <div key={index} className="fade-up card !py-4 !px-5 group hover:border-zinc-700">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center flex-shrink-0">
                      <BookOpen size={16} className="text-primary-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-zinc-200 truncate">{cert.name}</h4>
                      <p className="text-xs text-zinc-500">{cert.issuer} &middot; {cert.year}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
