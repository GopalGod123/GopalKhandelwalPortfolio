import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  // React Icons for realistic tech icons (CORRECTED NAMES)
  SiReact, SiNextdotjs, SiAngular, SiJavascript, SiTypescript, SiHtml5, SiCss3, SiTailwindcss, SiBootstrap, SiFlutter,
  SiNodedotjs, SiExpress, SiGraphql, SiPython, SiFlask, SiDjango, SiMysql, SiPostgresql, SiMongodb, SiFirebase,
  SiAmazonwebservices, SiGooglecloud, SiDocker, SiJenkins, SiNginx, SiKubernetes,
  SiAndroid, SiKotlin,
  SiTensorflow, SiKeras, SiJupyter, SiScikitlearn, SiPandas, SiNumpy,
  SiGit, SiGithub, SiNetlify, SiPostman, SiFigma,
  SiRedis
} from 'react-icons/si';
import { 
  FaJava, FaDatabase, FaCode, FaCloud, FaMobile, FaBrain, FaTools, FaPython 
} from 'react-icons/fa';

const Skills = () => {
  const skillsRef = useRef(null);

  const skillCategories = [
    { 
      name: 'AI/ML',
      icon: FaBrain, 
      color: 'from-purple-500 via-pink-500 to-red-500',
      bgGlow: 'group-hover:shadow-purple-500/25',
      technologies: [
        { name: 'TensorFlow', icon: SiTensorflow, color: 'text-orange-500' },
        { name: 'PyTorch', icon: FaPython, color: 'text-blue-500' },
        { name: 'Scikit-learn', icon: SiScikitlearn, color: 'text-orange-400' },
        { name: 'Keras', icon: SiKeras, color: 'text-red-500' },
        { name: 'Jupyter', icon: SiJupyter, color: 'text-orange-500' },
        { name: 'Pandas', icon: SiPandas, color: 'text-blue-600' },
        { name: 'NumPy', icon: SiNumpy, color: 'text-blue-500' }
      ]
    },
    { 
      name: 'Frontend',
      icon: FaCode, 
      color: 'from-cyan-500 via-blue-500 to-indigo-500',
      bgGlow: 'group-hover:shadow-cyan-500/25',
      technologies: [
        { name: 'React.js', icon: SiReact, color: 'text-cyan-400' },
        { name: 'Next.js', icon: SiNextdotjs, color: 'text-white' },
        { name: 'Angular', icon: SiAngular, color: 'text-red-500' },
        { name: 'TypeScript', icon: SiTypescript, color: 'text-blue-600' },
        { name: 'JavaScript', icon: SiJavascript, color: 'text-yellow-400' },
        { name: 'HTML5', icon: SiHtml5, color: 'text-orange-500' },
        { name: 'CSS3', icon: SiCss3, color: 'text-blue-500' },
        { name: 'Tailwind', icon: SiTailwindcss, color: 'text-teal-400' },
        { name: 'Bootstrap', icon: SiBootstrap, color: 'text-purple-600' }
      ]
    },
    { 
      name: 'Backend',
      icon: FaDatabase, 
      color: 'from-green-500 via-emerald-500 to-teal-500',
      bgGlow: 'group-hover:shadow-green-500/25',
      technologies: [
        { name: 'Node.js', icon: SiNodedotjs, color: 'text-green-500' },
        { name: 'Express.js', icon: SiExpress, color: 'text-gray-400' },
        { name: 'Python', icon: SiPython, color: 'text-blue-500' },
        { name: 'Flask', icon: SiFlask, color: 'text-gray-300' },
        { name: 'Django', icon: SiDjango, color: 'text-green-600' },
        { name: 'GraphQL', icon: SiGraphql, color: 'text-pink-500' },
        { name: 'FastAPI', icon: SiPython, color: 'text-teal-500' }
      ]
    },
    { 
      name: 'Databases',
      icon: FaDatabase, 
      color: 'from-indigo-500 via-purple-500 to-pink-500',
      bgGlow: 'group-hover:shadow-indigo-500/25',
      technologies: [
        { name: 'MongoDB', icon: SiMongodb, color: 'text-green-500' },
        { name: 'PostgreSQL', icon: SiPostgresql, color: 'text-blue-600' },
        { name: 'MySQL', icon: SiMysql, color: 'text-blue-500' },
        { name: 'Firebase', icon: SiFirebase, color: 'text-yellow-500' },
        { name: 'Redis', icon: SiRedis, color: 'text-red-500' }
      ]
    },
    { 
      name: 'DevOps & Cloud',
      icon: FaCloud, 
      color: 'from-yellow-500 via-orange-500 to-red-500',
      bgGlow: 'group-hover:shadow-yellow-500/25',
      technologies: [
        { name: 'AWS', icon: SiAmazonwebservices, color: 'text-orange-400' },
        { name: 'Google Cloud', icon: SiGooglecloud, color: 'text-blue-500' },
        { name: 'Docker', icon: SiDocker, color: 'text-blue-600' },
        { name: 'Kubernetes', icon: SiKubernetes, color: 'text-blue-500' },
        { name: 'Jenkins', icon: SiJenkins, color: 'text-red-500' },
        { name: 'Nginx', icon: SiNginx, color: 'text-green-500' }
      ]
    },
    { 
      name: 'Mobile & Tools',
      icon: FaMobile, 
      color: 'from-rose-500 via-purple-500 to-indigo-500',
      bgGlow: 'group-hover:shadow-rose-500/25',
      technologies: [
        { name: 'React Native', icon: SiReact, color: 'text-cyan-400' },
        { name: 'Flutter', icon: SiFlutter, color: 'text-blue-500' },
        { name: 'Android', icon: SiAndroid, color: 'text-green-500' },
        { name: 'Java', icon: FaJava, color: 'text-red-600' },
        { name: 'Git', icon: SiGit, color: 'text-orange-500' },
        { name: 'VS Code', icon: SiGit, color: 'text-blue-500' },
        { name: 'Figma', icon: SiFigma, color: 'text-purple-500' }
      ]
    }
  ];

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: skillsRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
      }
    });

    // Animate header
    tl.fromTo('.skills-header', 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );

    // Animate skill cards with stagger
    const cards = skillsRef.current.querySelectorAll('.skill-card');
    tl.fromTo(cards, {
      y: 100,
      opacity: 0,
      scale: 0.8,
      rotationY: 45
    }, {
      y: 0,
      opacity: 1,
      scale: 1,
      rotationY: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'back.out(1.7)'
    }, '-=0.5');

    // Animate skill tags
    const skillTags = skillsRef.current.querySelectorAll('.skill-tag');
    tl.fromTo(skillTags, {
      scale: 0,
      opacity: 0
    }, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      stagger: 0.03,
      ease: 'back.out(1.7)'
    }, '-=0.3');

    // Floating animation for icons
    gsap.to('.skill-icon', {
      y: -5,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
      stagger: 0.2
    });

  }, []);

  return (
    <section id="skills" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden" ref={skillsRef}>
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(139, 92, 246, 0.3) 2px, transparent 0)`,
              backgroundSize: '50px 50px'
            }}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        {/* Enhanced Section Header */}
        <div className="skills-header text-left mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500/20 to-purple-500/20 rounded-full border border-primary-500/30 backdrop-blur-sm mb-6">
            <FaTools className="text-primary-400" size={16} />
            <span className="text-primary-400 font-medium text-sm">Technical Expertise</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-100 via-slate-200 to-slate-300 bg-clip-text text-transparent mb-6">
            Skills & Technologies
          </h2>
          
          <p className="text-lg sm:text-xl text-slate-400 leading-relaxed max-w-3xl">
            A comprehensive collection of technologies and tools I've mastered over <span className="text-primary-400 font-semibold">3+ years</span> of professional development experience.
          </p>

          {/* Progress Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mt-8">
            {[
              { label: 'Technologies', value: '25+' },
              { label: 'Years Exp', value: '3+' },
              { label: 'Projects', value: '15+' }
            ].map((stat, index) => (
              <div key={index} className="text-center p-3 rounded-lg bg-slate-800/30 backdrop-blur-sm border border-slate-700/50">
                <div className="text-2xl font-bold text-primary-400">{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-items-start">
          {skillCategories.map((category) => {
            const IconComponent = category.icon;
            
            return (
              <div 
                key={category.name} 
                className={`skill-card group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-slate-700/50 backdrop-blur-xl p-6 sm:p-8 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 ${category.bgGlow} hover:shadow-2xl`}
              >
                {/* Card Header */}
                <div className="flex items-center gap-4 mb-6 sm:mb-8">
                  <div className={`skill-icon relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-r ${category.color} flex items-center justify-center transform transition-all duration-300 group-hover:rotate-6 group-hover:scale-110`}>
                    <IconComponent size={24} className="text-white drop-shadow-lg" />
                    
                    {/* Glow effect */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${category.color} blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300`}></div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-100 group-hover:text-white transition-colors duration-300">
                      {category.name}
                    </h3>
                    <div className="text-slate-400 text-sm">
                      {category.technologies.length} technologies
                    </div>
                  </div>
                </div>

                {/* Enhanced Skills List with Real Icons */}
                <div className="grid grid-cols-2 gap-3">
                  {category.technologies.map((tech, techIndex) => {
                    const TechIcon = tech.icon;
                    
                    return (
                      <div
                        key={tech.name}
                        className="skill-tag group/skill flex items-center gap-2 p-3 bg-slate-700/30 hover:bg-slate-600/50 border border-slate-600/50 hover:border-slate-500/50 rounded-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-default"
                        style={{ animationDelay: `${techIndex * 0.1}s` }}
                      >
                        <TechIcon 
                          size={18} 
                          className={`${tech.color} group-hover/skill:scale-110 transition-transform duration-300`}
                        />
                        <span className="text-slate-300 text-sm font-medium group-hover/skill:text-white transition-colors duration-300">
                          {tech.name}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                {/* Floating particles on hover */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary-400 rounded-full opacity-0 group-hover:opacity-60 group-hover:animate-ping transition-opacity duration-300"></div>
                <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-purple-400 rounded-full opacity-0 group-hover:opacity-40 group-hover:animate-ping transition-opacity duration-300 delay-150"></div>
              </div>
            );
          })}
        </div>

        {/* Additional Achievement Section */}
        <div className="mt-16 sm:mt-20 text-left">
          <div className="inline-flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-500/30 backdrop-blur-sm">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
            <span className="text-green-400 font-medium">
              Always learning new technologies and staying updated with industry trends 🚀
            </span>
          </div>
        </div>
      </div>

      {/* Custom CSS for additional animations */}
      <style jsx>{`
        @keyframes floatSkill {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-5px) rotate(1deg); }
          50% { transform: translateY(-10px) rotate(0deg); }
          75% { transform: translateY(-5px) rotate(-1deg); }
        }

        .skill-icon {
          animation: floatSkill 6s ease-in-out infinite;
        }

        .skill-icon:nth-child(2n) {
          animation-delay: -2s;
        }

        .skill-icon:nth-child(3n) {
          animation-delay: -4s;
        }

        @media (max-width: 640px) {
          .skill-card {
            padding: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Skills;
