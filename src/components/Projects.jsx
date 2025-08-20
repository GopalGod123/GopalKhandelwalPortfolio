import React, { useEffect, useRef, useState } from 'react';
import { 
  ExternalLink, Github, Calendar, Star, ArrowUpRight, Filter, 
  Sparkles, Trophy, TrendingUp, Users, Zap, Eye, Heart,
  Code, Smartphone, Brain, Globe, Database, Cloud
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import data from './data/data.json';

const Projects = () => {
  const projectsRef = useRef(null);
  const [filter, setFilter] = useState('all');
  const [hoveredProject, setHoveredProject] = useState(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animate background particles
    gsap.to('.particle', {
      y: -30,
      x: 'random(-20, 20)',
      duration: 'random(3, 6)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.2
    });

    // Animate section header with split text effect
    gsap.fromTo('.projects-header', {
      y: 80,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: projectsRef.current,
        start: 'top 85%',
      }
    });

    // Animate stats counter
    gsap.fromTo('.stat-number', {
      textContent: 0,
      opacity: 0
    }, {
      textContent: (i, target) => target.dataset.count,
      opacity: 1,
      duration: 2,
      ease: 'power2.out',
      snap: { textContent: 1 },
      scrollTrigger: {
        trigger: '.stats-container',
        start: 'top 80%',
      }
    });

    // Animate filter buttons with magnetic effect
    gsap.fromTo('.filter-btn', {
      scale: 0,
      opacity: 0,
      rotation: -180
    }, {
      scale: 1,
      opacity: 1,
      rotation: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'back.out(1.7)',
      delay: 0.5,
      scrollTrigger: {
        trigger: projectsRef.current,
        start: 'top 80%',
      }
    });

    // Animate project cards with 3D effect
    const cards = projectsRef.current.querySelectorAll('.project-card');
    gsap.fromTo(cards, {
      y: 150,
      opacity: 0,
      scale: 0.7,
      rotationX: 45
    }, {
      y: 0,
      opacity: 1,
      scale: 1,
      rotationX: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: projectsRef.current,
        start: 'top 60%',
      }
    });

    // Animate technology tags with wave effect
    const techTags = projectsRef.current.querySelectorAll('.tech-tag');
    gsap.fromTo(techTags, {
      x: -50,
      opacity: 0,
      scale: 0.8
    }, {
      x: 0,
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: 0.05,
      delay: 1,
      ease: 'elastic.out(1, 0.5)',
      scrollTrigger: {
        trigger: projectsRef.current,
        start: 'top 50%',
      }
    });

  }, []);

  const categoryIcons = {
    'AI/ML': Brain,
    'Mobile AI': Smartphone,
    'AI Voice': Zap,
    'Mobile App': Smartphone,
    'Game Development': Trophy,
    'AI SaaS': Cloud,
    'Web App': Globe
  };

  const categories = ['all', 'AI/ML', 'Mobile AI', 'AI Voice', 'Mobile App', 'Game Development', 'AI SaaS'];

  const filteredFeaturedProjects = filter === 'all' 
    ? data.projects?.featured || []
    : data.projects?.featured?.filter(project => project.category === filter) || [];

  const filteredOtherProjects = filter === 'all' 
    ? data.projects?.other || []
    : data.projects?.other?.filter(project => project.category === filter) || [];

  return (
    <section id="projects" className="py-20 relative overflow-hidden" ref={projectsRef}>
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-purple-500/5"></div>
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-2 h-2 bg-primary-500/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(99, 102, 241, 0.3) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        {/* Header with Stats */}
        <div className="projects-header text-center mb-20">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-primary-500/20 to-purple-500/20 rounded-full border border-primary-500/30">
            <Sparkles className="text-primary-400" size={18} />
            <span className="text-primary-400 font-medium text-sm">Portfolio Showcase</span>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent mb-6 leading-tight">
            Featured Projects
          </h2>
          
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            Innovative AI/ML solutions and full-stack applications that showcase cutting-edge technology, 
            exceptional user experience, and measurable business impact.
          </p>

          {/* Stats */}
          <div className="stats-container grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 max-w-4xl mx-auto">
            {[
              { label: 'Projects Built', count: 15, icon: Code },
              { label: 'Technologies', count: 25, icon: Database },
              { label: 'Happy Clients', count: 8, icon: Users },
              { label: 'Years Experience', count: 3, icon: TrendingUp }
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-sm">
                  <IconComponent className="text-primary-400 mx-auto mb-3" size={32} />
                  <div className="stat-number text-3xl font-bold text-slate-100 mb-1" data-count={stat.count}>0</div>
                  <div className="text-slate-400 text-sm font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => {
              const IconComponent = categoryIcons[category] || Filter;
  return (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`filter-btn group relative px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    filter === category
                      ? 'bg-gradient-to-r from-primary-500 to-purple-600 text-white shadow-2xl shadow-primary-500/25 transform -translate-y-1'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-600 hover:border-primary-500/50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <IconComponent size={16} />
                    <span>{category === 'all' ? 'All Projects' : category}</span>
                  </div>
                  
                  {filter === category && (
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-40 transition duration-300"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Projects */}
        {filteredFeaturedProjects.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center justify-center gap-3 mb-12">
              <div className="h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent flex-1"></div>
              <div className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full border border-yellow-500/30">
                <Trophy className="text-yellow-400" size={24} />
                <h3 className="text-2xl font-bold text-slate-100">Featured Projects</h3>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent flex-1"></div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {filteredFeaturedProjects.map((project, index) => (
                <div 
                  key={index} 
                  className="project-card group relative"
                  onMouseEnter={() => setHoveredProject(index)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-slate-700/50 backdrop-blur-lg p-8 h-full transition-all duration-500 hover:border-primary-500/50 hover:shadow-2xl hover:shadow-primary-500/10 hover:-translate-y-2">
                    
                    {/* Project Image Placeholder */}
                    <div className="relative mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-primary-500/20 to-purple-500/20 h-48 flex items-center justify-center border border-primary-500/20">
                      {categoryIcons[project.category] && 
                        React.createElement(categoryIcons[project.category], { 
                          size: 48, 
                          className: "text-primary-400/60" 
                        })
                      }
                      
                      {/* Animated overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-tr from-primary-500/30 to-purple-500/30 transition-opacity duration-500 ${hoveredProject === index ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Eye className="text-white" size={32} />
                        </div>
                      </div>

                      {/* Featured badge */}
                      <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                        <Star size={12} />
                        FEATURED
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-2xl font-bold text-slate-100 group-hover:text-primary-400 transition-colors leading-tight mb-2">
                            {project.name}
                          </h4>
                          <p className="text-primary-400 font-medium">{project.tagline}</p>
                        </div>
                        <a 
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-700 text-slate-400 hover:bg-primary-500 hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-12"
                        >
                          <ArrowUpRight size={20} />
                        </a>
                      </div>

                      {/* Meta info */}
                      <div className="flex items-center gap-4 text-slate-400 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} />
                          <span>{project.duration}</span>
                        </div>
                        <div className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-xs font-medium border border-primary-500/30">
                          {project.category}
                        </div>
                        {project.status && (
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                            project.status === 'Active' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                            project.status === 'Completed' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                            'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                          }`}>
                            {project.status}
                          </div>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-slate-300 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Key Features */}
                      {project.features && (
                        <div className="space-y-3">
                          <h5 className="text-slate-300 font-semibold flex items-center gap-2">
                            <Zap size={16} className="text-primary-400" />
                            Key Features
                          </h5>
                          <div className="grid grid-cols-1 gap-2">
                            {project.features.slice(0, 3).map((feature, idx) => (
                              <div key={idx} className="flex items-center gap-3 text-slate-400 text-sm">
                                <div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full flex-shrink-0"></div>
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Impact Metrics */}
                      {project.impact && (
                        <div className="p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-xl">
                          <div className="flex items-center gap-2 mb-2">
                            <TrendingUp size={16} className="text-green-400" />
                            <span className="text-green-400 font-medium text-sm">Impact</span>
                          </div>
                          <p className="text-green-300 font-medium">{project.impact}</p>
                        </div>
                      )}

                      {/* Technologies */}
                      <div className="space-y-3">
                        <h5 className="text-slate-300 font-semibold text-sm">Tech Stack</h5>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies?.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="tech-tag px-3 py-1.5 bg-gradient-to-r from-slate-700/80 to-slate-600/80 text-slate-200 rounded-full text-xs font-medium border border-slate-600/50 hover:border-primary-500/50 hover:bg-gradient-to-r hover:from-primary-500/20 hover:to-purple-500/20 transition-all duration-300 cursor-default hover:scale-105"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-4 pt-4 border-t border-slate-700/50">
                        <a 
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-purple-600 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/25 hover:-translate-y-0.5"
                        >
                          <Github size={16} />
                          View Code
                        </a>
                        {project.liveDemo && (
                          <a 
                            href={project.liveDemo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-slate-200 rounded-lg font-medium border border-slate-600 hover:bg-slate-600 hover:border-primary-500/50 transition-all duration-300"
                          >
                            <ExternalLink size={16} />
                            Live Demo
                          </a>
                        )}
                        <button className="ml-auto p-2 text-slate-400 hover:text-red-400 transition-colors duration-300">
                          <Heart size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Hover Glow Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500 -z-10"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other Projects Grid */}
        {filteredOtherProjects.length > 0 && (
          <div>
            <div className="flex items-center justify-center gap-3 mb-12">
              <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent flex-1"></div>
              <h3 className="text-2xl font-bold text-slate-100 px-6">More Projects</h3>
              <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent flex-1"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOtherProjects.map((project, index) => (
                <div key={index} className="project-card group">
                  <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-slate-700/50 backdrop-blur-lg p-6 h-full transition-all duration-300 hover:border-primary-500/50 hover:shadow-xl hover:shadow-primary-500/5 hover:-translate-y-1">
                    
                    {/* Project Icon */}
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500/20 to-purple-500/20 flex items-center justify-center mb-4 border border-primary-500/20">
                      {categoryIcons[project.category] && 
                        React.createElement(categoryIcons[project.category], { 
                          size: 24, 
                          className: "text-primary-400" 
                        })
                      }
                    </div>

              <div className="space-y-4">
                <div className="flex items-start justify-between">
                        <h4 className="text-lg font-bold text-slate-100 group-hover:text-primary-400 transition-colors">
                    {project.name}
                        </h4>
                  <a 
                    href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-primary-400 transition-colors hover:scale-110 duration-300"
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>

                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <Calendar size={14} />
                  <span>{project.duration}</span>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed">
                  {project.description}
                </p>

                      <div className="flex flex-wrap gap-2">
                        {project.technologies?.slice(0, 4).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="tech-tag px-2 py-1 bg-primary-500/10 text-primary-400 rounded text-xs border border-primary-500/20 font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies?.length > 4 && (
                          <span className="px-2 py-1 bg-slate-700 text-slate-400 rounded text-xs">
                            +{project.technologies.length - 4}
                          </span>
                        )}
                      </div>

                <div className="flex items-center gap-3 pt-2">
                  <a 
                    href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors"
                  >
                    <Github size={16} />
                    View Code
                  </a>
                      </div>
                </div>
              </div>
            </div>
          ))}
        </div>
          </div>
        )}

        {/* No projects message */}
        {filteredFeaturedProjects.length === 0 && filteredOtherProjects.length === 0 && filter !== 'all' && (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-500/20 to-purple-500/20 flex items-center justify-center border border-primary-500/20">
              <Filter className="text-primary-400" size={32} />
            </div>
            <div className="text-slate-400 text-xl mb-6">No projects found in this category</div>
            <button 
              onClick={() => setFilter('all')}
              className="px-8 py-3 bg-gradient-to-r from-primary-500 to-purple-600 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/25 hover:-translate-y-0.5"
            >
              View All Projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
