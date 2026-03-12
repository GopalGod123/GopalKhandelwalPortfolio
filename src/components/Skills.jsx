import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  SiReact, SiNextdotjs, SiJavascript, SiTypescript, SiHtml5, SiCss3, SiTailwindcss,
  SiNodedotjs, SiExpress, SiGraphql, SiPython, SiFlask,
  SiMongodb, SiPostgresql, SiMysql, SiFirebase, SiRedis,
  SiAmazonwebservices, SiGooglecloud, SiDocker, SiKubernetes, SiJenkins,
  SiTensorflow, SiKeras, SiJupyter, SiScikitlearn, SiPandas, SiNumpy,
  SiGit, SiFlutter, SiAndroid, SiFigma
} from 'react-icons/si';
import { FaJava, FaDatabase, FaCode, FaCloud, FaMobile, FaBrain, FaPython } from 'react-icons/fa';

const Skills = () => {
  const skillsRef = useRef(null);

  const skillCategories = [
    {
      name: 'AI / ML',
      icon: FaBrain,
      accent: 'text-primary-400',
      accentBg: 'bg-primary-400/10',
      technologies: [
        { name: 'TensorFlow', icon: SiTensorflow, color: 'text-orange-500' },
        { name: 'PyTorch', icon: FaPython, color: 'text-blue-500' },
        { name: 'Scikit-learn', icon: SiScikitlearn, color: 'text-orange-400' },
        { name: 'Keras', icon: SiKeras, color: 'text-red-500' },
        { name: 'Jupyter', icon: SiJupyter, color: 'text-orange-500' },
        { name: 'Pandas', icon: SiPandas, color: 'text-blue-400' },
        { name: 'NumPy', icon: SiNumpy, color: 'text-blue-500' }
      ]
    },
    {
      name: 'Frontend',
      icon: FaCode,
      accent: 'text-amber-400',
      accentBg: 'bg-amber-400/10',
      technologies: [
        { name: 'React.js', icon: SiReact, color: 'text-cyan-400' },
        { name: 'Next.js', icon: SiNextdotjs, color: 'text-white' },
        { name: 'TypeScript', icon: SiTypescript, color: 'text-blue-500' },
        { name: 'JavaScript', icon: SiJavascript, color: 'text-yellow-400' },
        { name: 'Tailwind', icon: SiTailwindcss, color: 'text-teal-400' },
        { name: 'HTML5', icon: SiHtml5, color: 'text-orange-500' },
        { name: 'CSS3', icon: SiCss3, color: 'text-blue-500' }
      ]
    },
    {
      name: 'Backend',
      icon: FaDatabase,
      accent: 'text-green-400',
      accentBg: 'bg-green-400/10',
      technologies: [
        { name: 'Node.js', icon: SiNodedotjs, color: 'text-green-500' },
        { name: 'Express.js', icon: SiExpress, color: 'text-zinc-400' },
        { name: 'Python', icon: SiPython, color: 'text-blue-400' },
        { name: 'Flask', icon: SiFlask, color: 'text-zinc-300' },
        { name: 'GraphQL', icon: SiGraphql, color: 'text-pink-500' },
        { name: 'FastAPI', icon: SiPython, color: 'text-teal-400' }
      ]
    },
    {
      name: 'Databases',
      icon: FaDatabase,
      accent: 'text-orange-400',
      accentBg: 'bg-orange-400/10',
      technologies: [
        { name: 'MongoDB', icon: SiMongodb, color: 'text-green-500' },
        { name: 'PostgreSQL', icon: SiPostgresql, color: 'text-blue-500' },
        { name: 'MySQL', icon: SiMysql, color: 'text-blue-400' },
        { name: 'Firebase', icon: SiFirebase, color: 'text-yellow-500' },
        { name: 'Redis', icon: SiRedis, color: 'text-red-500' }
      ]
    },
    {
      name: 'DevOps & Cloud',
      icon: FaCloud,
      accent: 'text-orange-400',
      accentBg: 'bg-orange-400/10',
      technologies: [
        { name: 'AWS', icon: SiAmazonwebservices, color: 'text-orange-400' },
        { name: 'Google Cloud', icon: SiGooglecloud, color: 'text-blue-400' },
        { name: 'Docker', icon: SiDocker, color: 'text-blue-500' },
        { name: 'Kubernetes', icon: SiKubernetes, color: 'text-blue-400' },
        { name: 'Jenkins', icon: SiJenkins, color: 'text-red-400' },
        { name: 'Git', icon: SiGit, color: 'text-orange-500' }
      ]
    },
    {
      name: 'Mobile & Tools',
      icon: FaMobile,
      accent: 'text-amber-300',
      accentBg: 'bg-amber-300/10',
      technologies: [
        { name: 'React Native', icon: SiReact, color: 'text-cyan-400' },
        { name: 'Flutter', icon: SiFlutter, color: 'text-blue-400' },
        { name: 'Android', icon: SiAndroid, color: 'text-green-500' },
        { name: 'Java', icon: FaJava, color: 'text-red-500' },
        { name: 'Figma', icon: SiFigma, color: 'text-purple-400' }
      ]
    }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const elements = skillsRef.current.querySelectorAll('.fade-up');
    gsap.fromTo(elements, { y: 40, opacity: 0 }, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power2.out',
      scrollTrigger: { trigger: skillsRef.current, start: 'top 80%' }
    });
  }, []);

  return (
    <section id="skills" className="section-padding relative" ref={skillsRef}>
      <div className="section-container">
        {/* Header */}
        <div className="fade-up mb-16">
          <div className="badge badge-primary mb-4">Skills</div>
          <h2 className="section-title mb-4">Skills & Technologies</h2>
          <p className="section-subtitle">
            Technologies and tools I've worked with across <span className="text-primary-400 font-medium">3+ years</span> of professional development.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((category) => {
            const CategoryIcon = category.icon;
            return (
              <div key={category.name} className="fade-up card group hover:border-zinc-700 transition-all duration-300">
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-10 h-10 rounded-xl ${category.accentBg} flex items-center justify-center`}>
                    <CategoryIcon size={18} className={category.accent} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-100">{category.name}</h3>
                    <span className="text-xs text-zinc-500">{category.technologies.length} technologies</span>
                  </div>
                </div>

                {/* Tech List */}
                <div className="space-y-1.5">
                  {category.technologies.map((tech) => {
                    const TechIcon = tech.icon;
                    return (
                      <div
                        key={tech.name}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-zinc-800/80 transition-colors duration-200"
                      >
                        <TechIcon size={16} className={tech.color} />
                        <span className="text-sm text-zinc-300">{tech.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
