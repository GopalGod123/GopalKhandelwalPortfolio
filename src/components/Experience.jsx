import React, { useEffect, useRef } from 'react';
import { Briefcase, Calendar, MapPin, Building } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import data from './data/data.json';

const Experience = () => {
  const expRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const elements = expRef.current.querySelectorAll('.fade-up');
    gsap.fromTo(elements, { y: 40, opacity: 0 }, {
      y: 0,
      opacity: 1,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: { trigger: expRef.current, start: 'top 80%' }
    });
  }, []);

  return (
    <section id="experience" className="section-padding relative" ref={expRef}>
      <div className="section-container">
        {/* Header */}
        <div className="fade-up mb-16">
          <div className="badge badge-primary mb-4">
            <Briefcase size={12} />
            Career
          </div>
          <h2 className="section-title mb-4">Work Experience</h2>
          <p className="section-subtitle">
            My professional journey building <span className="text-primary-400 font-medium">AI/ML solutions</span> and scalable applications.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-zinc-800 hidden sm:block" />

          <div className="space-y-8 sm:space-y-10">
            {data.experience?.map((exp, index) => (
              <div key={index} className="fade-up relative">
                {/* Timeline dot */}
                <div className="absolute left-[12px] top-8 w-[15px] h-[15px] rounded-full border-[3px] border-primary-500 bg-surface-950 z-10 hidden sm:block" />

                {/* Card */}
                <div className="sm:ml-12 card group hover:border-zinc-700">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Building size={14} className="text-primary-400" />
                        <span className="text-sm font-medium text-primary-400">{exp.company}</span>
                        {index === 0 && (
                          <span className="badge badge-green !text-[10px] !px-2 !py-0.5">Current</span>
                        )}
                      </div>
                      <h3 className="text-xl font-semibold text-zinc-100">{exp.role}</h3>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={12} />
                        <span>{exp.duration}</span>
                      </div>
                      {exp.location && (
                        <div className="flex items-center gap-1.5">
                          <MapPin size={12} />
                          <span>{exp.location}</span>
                        </div>
                      )}
                      {exp.type && (
                        <span className="badge badge-primary !text-[10px] !px-2 !py-0.5">{exp.type}</span>
                      )}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="space-y-2.5 mb-5">
                    {exp.achievements?.map((achievement, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-sm text-zinc-400 leading-relaxed">
                        <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full mt-2 flex-shrink-0" />
                        <span>{achievement.replace(/[🚀🎯⚡🎤🎨🚗👤📊🎮🤖]/g, '').trim()}</span>
                      </div>
                    ))}
                  </div>

                  {/* Skills */}
                  {exp.skills && (
                    <div className="flex flex-wrap gap-1.5">
                      {exp.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 text-xs font-medium text-zinc-400 bg-zinc-800 border border-zinc-700 rounded-md"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
