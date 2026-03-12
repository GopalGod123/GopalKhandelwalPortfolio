import React, { useEffect, useRef, useState } from 'react';
import {
  ExternalLink, Github, Calendar, ArrowUpRight,
  Sparkles, Brain, Smartphone, Zap, Trophy, Globe, Cloud, Filter
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import data from './data/data.json';

const Projects = () => {
  const projectsRef = useRef(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const elements = projectsRef.current.querySelectorAll('.fade-up');
    gsap.fromTo(elements, { y: 40, opacity: 0 }, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: { trigger: projectsRef.current, start: 'top 80%' }
    });
  }, []);

  const categoryIcons = {
    'AI/ML': Brain,
    'Mobile AI': Smartphone,
    'AI Voice': Zap,
    'Game Development': Trophy,
    'AI Government': Globe,
    'AI SaaS': Cloud,
  };

  const categories = ['all', ...new Set([
    ...(data.projects?.featured?.map(p => p.category) || []),
    ...(data.projects?.other?.map(p => p.category) || [])
  ])];

  const filteredFeatured = filter === 'all'
    ? data.projects?.featured || []
    : data.projects?.featured?.filter(p => p.category === filter) || [];

  const filteredOther = filter === 'all'
    ? data.projects?.other || []
    : data.projects?.other?.filter(p => p.category === filter) || [];

  return (
    <section id="projects" className="section-padding relative" ref={projectsRef}>
      <div className="section-container">
        {/* Header */}
        <div className="fade-up mb-12">
          <div className="badge badge-primary mb-4">
            <Sparkles size={12} />
            Portfolio
          </div>
          <h2 className="section-title mb-4">Featured Projects</h2>
          <p className="section-subtitle">
            AI/ML solutions and full-stack applications with measurable business impact.
          </p>
        </div>

        {/* Filter */}
        <div className="fade-up flex flex-wrap gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                filter === category
                  ? 'bg-primary-500 text-white'
                  : 'bg-zinc-800 text-zinc-400 border border-zinc-700 hover:text-zinc-200 hover:border-zinc-600'
              }`}
            >
              {category === 'all' ? 'All' : category}
            </button>
          ))}
        </div>

        {/* Featured Projects */}
        {filteredFeatured.length > 0 && (
          <div className="grid lg:grid-cols-2 gap-6 mb-12">
            {filteredFeatured.map((project, index) => {
              const CategoryIcon = categoryIcons[project.category] || Brain;
              return (
                <div key={index} className="fade-up card group hover:border-zinc-700">
                  {/* Project visual */}
                  <div className="relative mb-5 rounded-xl overflow-hidden bg-zinc-800/50 border border-zinc-800 h-44 flex items-center justify-center">
                    <CategoryIcon size={40} className="text-zinc-700" />
                    <div className="absolute top-3 right-3 badge badge-primary !text-[10px]">
                      Featured
                    </div>
                    {project.status && (
                      <div className={`absolute top-3 left-3 badge !text-[10px] ${
                        project.status === 'Active' ? 'badge-green' : 'badge-primary'
                      }`}>
                        {project.status}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-lg font-semibold text-zinc-100 group-hover:text-primary-400 transition-colors">
                          {project.name.replace(/[🤖🎯🚗💬]/g, '').trim()}
                        </h3>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 transition-all"
                        >
                          <ArrowUpRight size={16} />
                        </a>
                      </div>
                      <p className="text-sm text-primary-400 font-medium mt-1">{project.tagline}</p>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-zinc-500">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={12} />
                        <span>{project.duration}</span>
                      </div>
                      <span className="badge badge-primary !text-[10px] !px-2 !py-0.5">{project.category}</span>
                    </div>

                    <p className="text-sm text-zinc-400 leading-relaxed">{project.description}</p>

                    {project.features && (
                      <div className="space-y-1.5">
                        {project.features.slice(0, 3).map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-zinc-500">
                            <span className="w-1 h-1 bg-primary-400 rounded-full flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    )}

                    {project.impact && (
                      <div className="px-3 py-2.5 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                        <span className="text-xs font-medium text-emerald-400">Impact: </span>
                        <span className="text-xs text-emerald-300/80">{project.impact}</span>
                      </div>
                    )}

                    {/* Tech */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies?.map((tech, i) => (
                        <span key={i} className="px-2 py-1 text-[11px] font-medium text-zinc-400 bg-zinc-800 border border-zinc-700 rounded-md">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-2 border-t border-zinc-800">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm font-medium text-zinc-300 hover:text-primary-400 transition-colors"
                      >
                        <Github size={14} />
                        Code
                      </a>
                      {project.liveDemo && (
                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-sm font-medium text-zinc-300 hover:text-primary-400 transition-colors"
                        >
                          <ExternalLink size={14} />
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Other Projects */}
        {filteredOther.length > 0 && (
          <>
            <div className="fade-up flex items-center gap-4 mb-8">
              <h3 className="text-lg font-semibold text-zinc-200">More Projects</h3>
              <div className="h-px bg-zinc-800 flex-1" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredOther.map((project, index) => {
                const CategoryIcon = categoryIcons[project.category] || Brain;
                return (
                  <div key={index} className="fade-up card group hover:border-zinc-700">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                        <CategoryIcon size={18} className="text-primary-400" />
                      </div>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-500 hover:text-primary-400 transition-colors"
                      >
                        <ExternalLink size={16} />
                      </a>
                    </div>

                    <h4 className="font-semibold text-zinc-100 group-hover:text-primary-400 transition-colors mb-2">
                      {project.name.replace(/[🎤🎮🚗]/g, '').trim()}
                    </h4>

                    <div className="flex items-center gap-1.5 text-xs text-zinc-500 mb-3">
                      <Calendar size={11} />
                      <span>{project.duration}</span>
                    </div>

                    <p className="text-sm text-zinc-400 leading-relaxed mb-4">{project.description}</p>

                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies?.slice(0, 4).map((tech, i) => (
                        <span key={i} className="px-2 py-0.5 text-[11px] font-medium text-zinc-500 bg-zinc-800 border border-zinc-700/50 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Empty state */}
        {filteredFeatured.length === 0 && filteredOther.length === 0 && filter !== 'all' && (
          <div className="text-center py-16">
            <Filter className="text-zinc-600 mx-auto mb-4" size={32} />
            <p className="text-zinc-500 mb-4">No projects in this category</p>
            <button onClick={() => setFilter('all')} className="btn-primary !text-sm">View All</button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
