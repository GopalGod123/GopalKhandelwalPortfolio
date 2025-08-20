import React, { useEffect, useRef } from 'react';
import { Briefcase, Calendar, MapPin, ArrowRight, Building, Award, Zap, TrendingUp, Users, Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import data from './data/data.json';

const Experience = () => {
  const expRef = useRef(null);
  const progressLineRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Enhanced header animation
    gsap.fromTo('.experience-header', {
      y: 80,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: expRef.current,
        start: 'top 85%',
      }
    });

    // Animate progress line with glow effect
    gsap.fromTo(progressLineRef.current, 
      { scaleY: 0, transformOrigin: 'top center' }, 
      { 
        scaleY: 1, 
        duration: 2.5, 
        ease: 'power2.out',
        scrollTrigger: {
          trigger: expRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1
        }
      }
    );

    // Animate timeline dots with bounce
    const dots = expRef.current.querySelectorAll('.timeline-dot');
    gsap.fromTo(dots, {
      scale: 0,
      opacity: 0,
      rotation: 180
    }, {
      scale: 1,
      opacity: 1,
      rotation: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'back.out(2)',
      scrollTrigger: {
        trigger: expRef.current,
        start: 'top 70%',
      }
    });

    // Enhanced card animations
    const cards = expRef.current.querySelectorAll('.exp-card');
    cards.forEach((card, index) => {
      const isLeft = index % 2 === 0;
      gsap.fromTo(card, 
        { 
          opacity: 0, 
          x: isLeft ? -150 : 150,
          y: 80,
          scale: 0.8,
          rotationY: isLeft ? -15 : 15
        },
        { 
          opacity: 1, 
          x: 0,
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          }
        }
      );
    });

    // Animate skill tags with wave effect
    const skillTags = expRef.current.querySelectorAll('.skill-tag');
    gsap.fromTo(skillTags, {
      scale: 0,
      opacity: 0,
      y: 20
    }, {
      scale: 1,
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.05,
      ease: 'elastic.out(1, 0.5)',
      scrollTrigger: {
        trigger: expRef.current,
        start: 'top 60%',
      }
    });

    // Floating animation for timeline elements
    gsap.to('.timeline-float', {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.5
    });

  }, []);

  return (
    <section id="experience" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden" ref={expRef}>
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-green-500/15 to-teal-500/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              animation: 'gridMove 20s linear infinite'
            }}
          />
        </div>

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 8}s`
            }}
          >
            <div className="w-2 h-2 bg-primary-400/60 rounded-full"></div>
          </div>
        ))}
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        
        {/* Enhanced Section Header */}
        <div className="experience-header text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500/20 to-purple-500/20 rounded-full border border-primary-500/30 backdrop-blur-sm mb-6">
            <Briefcase className="text-primary-400" size={16} />
            <span className="text-primary-400 font-medium text-sm">Career Journey</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-100 via-slate-200 to-slate-300 bg-clip-text text-transparent mb-6 leading-tight">
            Professional Experience
          </h2>
          
          <p className="text-lg sm:text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto mb-8">
            A timeline of my professional growth as an <span className="text-primary-400 font-semibold">AI/ML Engineer</span>, 
            building innovative solutions and leading impactful projects across different organizations.
          </p>

          {/* Experience Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {[
              { icon: Building, label: 'Companies', value: '3+', color: 'text-blue-400' },
              { icon: Award, label: 'Projects', value: '15+', color: 'text-green-400' },
              { icon: Users, label: 'Team Size', value: '50+', color: 'text-purple-400' },
              { icon: TrendingUp, label: 'Experience', value: '3+ Years', color: 'text-orange-400' }
            ].map((stat, index) => (
              <div key={index} className="text-center p-4 rounded-2xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-300 hover:scale-105">
                <stat.icon className={`${stat.color} mx-auto mb-2`} size={24} />
                <div className="text-xl sm:text-2xl font-bold text-slate-100">{stat.value}</div>
                <div className="text-slate-400 text-xs sm:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Timeline Container */}
        <div className="relative">
          {/* Central Timeline Line with Glow */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-slate-600 via-slate-700 to-slate-800 transform -translate-x-1/2 rounded-full">
            {/* Animated Progress Line */}
            <div 
              ref={progressLineRef}
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary-500 via-purple-500 to-cyan-500 rounded-full transform scale-y-0 shadow-lg shadow-primary-500/50"
              style={{ transformOrigin: 'top center' }}
            ></div>
          </div>

          {/* Experience Timeline */}
          <div className="space-y-16 sm:space-y-20">
            {data.experience?.map((exp, index) => {
              const isLeft = index % 2 === 0;
              
              return (
                <div key={index} className="relative">
                  {/* Enhanced Timeline Dot */}
                  <div className="timeline-dot timeline-float absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 via-purple-500 to-cyan-500 border-4 border-slate-900 z-20 shadow-2xl shadow-primary-500/50">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500 to-purple-600 animate-ping opacity-20"></div>
                    <div className="absolute inset-1 rounded-full bg-gradient-to-r from-white/20 to-transparent"></div>
                  </div>

                  {/* Enhanced Experience Card */}
                  <div className={`exp-card flex items-start ${isLeft ? 'justify-start' : 'justify-end'}`}>
                    <div className={`w-full sm:w-11/12 md:w-5/12 ${isLeft ? 'pr-4 sm:pr-8 md:pr-16' : 'pl-4 sm:pl-8 md:pl-16'}`}>
                      <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-slate-700/50 backdrop-blur-xl p-6 sm:p-8 transition-all duration-500 hover:border-primary-500/50 hover:shadow-2xl hover:shadow-primary-500/10 hover:-translate-y-2 hover:scale-[1.02]">
                        
                        {/* Card connector line with glow */}
                        <div className={`absolute top-8 w-12 h-1 bg-gradient-to-r from-primary-500 to-purple-600 shadow-lg shadow-primary-500/50 ${isLeft ? 'right-0 translate-x-full' : 'left-0 -translate-x-full'} rounded-full`}></div>
                        
                        {/* Floating company badge */}
                        <div className="absolute -top-3 -right-3 w-6 h-6 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full animate-pulse opacity-60"></div>
                        
                        <div className="space-y-6">
                          {/* Enhanced Header */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-3 text-primary-400">
                              <div className="p-2 rounded-lg bg-primary-500/20 border border-primary-500/30">
                                <Building size={18} />
                              </div>
                              <span className="font-bold text-xl">{exp.company}</span>
                              {index === 0 && (
                                <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs border border-green-500/30">
                                  <Star size={12} />
                                  <span>Current</span>
                                </div>
                              )}
                            </div>
                            
                            <h3 className="text-2xl font-bold text-slate-100 leading-tight group-hover:text-white transition-colors duration-300">
                              {exp.role}
                            </h3>
                            
                            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                              <div className="flex items-center gap-2">
                                <Calendar size={14} />
                                <span>{exp.duration}</span>
                              </div>
                              {exp.location && (
                                <div className="flex items-center gap-2">
                                  <MapPin size={14} />
                                  <span>{exp.location}</span>
                                </div>
                              )}
                              {exp.type && (
                                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-purple-500/20 text-purple-300 border border-purple-500/30 font-medium">
                                  {exp.type}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Impact Metrics */}
                          {exp.impact && (
                            <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl">
                              <div className="flex items-center gap-2 mb-2">
                                <TrendingUp size={16} className="text-green-400" />
                                <span className="text-green-400 font-semibold text-sm">Key Impact</span>
                              </div>
                              <p className="text-green-300 font-medium text-sm">{exp.impact}</p>
                            </div>
                          )}

                          {/* Enhanced Achievements */}
                          <div>
                            <h4 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
                              <div className="p-1 rounded bg-primary-500/20">
                                <ArrowRight size={12} className="text-primary-400" />
                              </div>
                              Key Achievements
                            </h4>
                            <div className="space-y-3">
                              {exp.achievements?.slice(0, 3).map((achievement, idx) => (
                                <div key={idx} className="group/item flex items-start gap-3 p-3 rounded-lg bg-slate-700/30 hover:bg-slate-600/40 transition-all duration-300">
                                  <div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full mt-2 flex-shrink-0 group-hover/item:scale-150 transition-transform duration-300"></div>
                                  <span className="text-slate-300 text-sm leading-relaxed group-hover/item:text-white transition-colors duration-300">{achievement}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Enhanced Skills */}
                          {exp.skills && (
                            <div>
                              <h4 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
                                <div className="p-1 rounded bg-cyan-500/20">
                                  <Zap size={12} className="text-cyan-400" />
                                </div>
                                Technologies & Tools
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {exp.skills.map((skill, idx) => (
                                  <span
                                    key={idx}
                                    className="skill-tag group/skill px-3 py-2 bg-gradient-to-r from-slate-700/80 to-slate-600/80 text-slate-200 rounded-full text-xs font-medium border border-slate-600/50 hover:border-primary-500/50 hover:bg-gradient-to-r hover:from-primary-500/20 hover:to-purple-500/20 transition-all duration-300 cursor-default hover:scale-105 hover:-translate-y-1"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Hover glow effect */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                        
                        {/* Animated border on hover */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 via-purple-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500 -z-10"></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Enhanced Timeline End Marker */}
          <div className="flex flex-col items-center justify-center mt-16 sm:mt-20">
            <div className="relative w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 via-purple-500 to-cyan-500 flex items-center justify-center mb-4 shadow-2xl shadow-primary-500/50">
              <div className="w-6 h-6 bg-white rounded-full"></div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500 to-purple-600 animate-pulse opacity-30"></div>
              <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-primary-500/20 to-purple-500/20 animate-ping"></div>
            </div>
            
            <div className="text-center">
              <div className="text-slate-200 font-semibold mb-1">The Journey Continues...</div>
              <div className="text-slate-400 text-sm">Always learning, always growing 🚀</div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) translateX(0px); 
          }
          25% { 
            transform: translateY(-15px) translateX(5px); 
          }
          50% { 
            transform: translateY(-30px) translateX(-5px); 
          }
          75% { 
            transform: translateY(-15px) translateX(10px); 
          }
        }
        
        .animate-float {
          animation: float 12s ease-in-out infinite;
        }

        @keyframes gridMove {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(50px) translateY(50px); }
        }

        .timeline-float {
          animation: float 8s ease-in-out infinite;
        }

        .timeline-float:nth-child(2n) {
          animation-delay: -2s;
        }

        .timeline-float:nth-child(3n) {
          animation-delay: -4s;
        }

        @media (max-width: 768px) {
          .exp-card {
            justify-content: center !important;
          }
          
          .exp-card > div {
            width: 100% !important;
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Experience;
