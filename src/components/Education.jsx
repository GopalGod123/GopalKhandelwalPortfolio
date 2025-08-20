import React, { useEffect, useRef } from 'react';
import { GraduationCap, Calendar, Award } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import data from './data/data.json';

const Education = () => {
  const educationRef = useRef(null);

  useEffect(() => {
    const cards = educationRef.current.querySelectorAll('.edu-card');
    
    gsap.fromTo(cards, {
      x: 100,
      opacity: 0
    }, {
      x: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: educationRef.current,
        start: 'top 80%',
      }
    });
  }, []);

  return (
    <section id="education" className="py-20" ref={educationRef}>
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="section-title">Education</h2>
          <p className="section-subtitle">
            My educational journey of intellectual growth, character development, and lifelong learning.
          </p>
        </div>

        <div className="space-y-6">
          {data.education.map((edu, index) => (
            <div key={index} className="edu-card card">
              <div className="flex flex-col lg:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <GraduationCap size={24} className="text-white" />
                  </div>
                </div>

                <div className="flex-1 space-y-3">
                  <h3 className="text-xl font-bold text-slate-100">{edu.institution}</h3>
                  <p className="text-primary-400 font-medium">{edu.degree || edu.course}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      <span>{edu.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award size={14} />
                      <span>Grade: {edu.grade}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
