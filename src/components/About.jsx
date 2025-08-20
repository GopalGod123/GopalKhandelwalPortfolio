import React, { useEffect, useRef } from 'react';
import { 
  User, MapPin, Calendar, Globe, Star, Award, Coffee, 
  Heart, Code2, Zap, Sparkles, Clock, Wifi, Mail, Phone,
  Building, Target, CheckCircle, ArrowRight, Download,
  Briefcase, GraduationCap, Trophy, Users
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import data from './data/data.json';
import profilePhoto from '/MyPhoto.png';

const About = () => {
  const aboutRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero entrance animation
    gsap.fromTo('.hero-content', {
      y: 100,
      opacity: 0,
      scale: 0.95
    }, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: aboutRef.current,
        start: 'top 80%',
      }
    });

    // Cards floating animation
    gsap.fromTo('.floating-card', {
      y: 60,
      opacity: 0,
      rotationX: 15
    }, {
      y: 0,
      opacity: 1,
      rotationX: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power2.out',
      delay: 0.4,
      scrollTrigger: {
        trigger: aboutRef.current,
        start: 'top 70%',
      }
    });

    // Stats counter animation
    gsap.fromTo('.stat-number', {
      textContent: 0,
      opacity: 0
    }, {
      textContent: (i, target) => target.getAttribute('data-value'),
      opacity: 1,
      duration: 2,
      ease: 'power2.out',
      snap: { textContent: 1 },
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.stats-section',
        start: 'top 80%',
      }
    });

  }, []);

  const stats = [
    { label: 'Years Experience', value: '3', suffix: '+', icon: Clock, gradient: 'from-blue-500 to-cyan-500' },
    { label: 'Projects Completed', value: '15', suffix: '+', icon: Briefcase, gradient: 'from-green-500 to-emerald-500' },
    { label: 'Technologies', value: '25', suffix: '+', icon: Code2, gradient: 'from-purple-500 to-pink-500' },
    { label: 'Client Satisfaction', value: '98', suffix: '%', icon: Trophy, gradient: 'from-orange-500 to-red-500' }
  ];

  const skills = [
    { category: 'AI/ML', items: ['LLM Integration', 'Computer Vision', 'NLP', 'Deep Learning'], color: 'blue' },
    { category: 'Frontend', items: ['React/Next.js', 'Vue.js', 'TypeScript', 'Tailwind CSS'], color: 'green' },
    { category: 'Backend', items: ['Node.js', 'Python', 'PostgreSQL', 'Redis'], color: 'purple' },
    { category: 'DevOps', items: ['Docker', 'AWS', 'CI/CD', 'Kubernetes'], color: 'orange' }
  ];

  return (
    <section id="about" className="relative py-20 lg:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden" ref={aboutRef}>
      
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary-500/5 to-transparent rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="hero-content text-center mb-20">
          <div className="relative inline-block mb-8">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
              <img
                src={profilePhoto}
                alt={data.personal?.name || 'Gopal Khandelwal'}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Floating Status */}
            <div className="absolute -bottom-2 -right-2 flex items-center gap-2 px-3 py-1 bg-green-500 rounded-full text-white text-xs font-semibold shadow-lg">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              Available
            </div>
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-white via-primary-300 to-purple-400 bg-clip-text text-transparent mb-6">
            {data.personal?.name || 'Gopal Khandelwal'}
          </h1>
          
          <p className="text-2xl lg:text-3xl text-primary-400 font-semibold mb-8">
            {data.personal?.title || 'AI/ML Engineer & Full Stack Developer'}
          </p>
          
          <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-10">
            Crafting intelligent systems that bridge the gap between cutting-edge AI technology 
            and real-world applications. Passionate about building scalable solutions that make a difference.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full text-white font-semibold shadow-xl hover:shadow-2xl hover:shadow-primary-500/25 transition-all duration-300 hover:scale-105">
              <span className="flex items-center gap-2">
                Let's Connect
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
            
            <button className="group px-8 py-4 border-2 border-slate-600 hover:border-primary-500 rounded-full text-slate-300 hover:text-primary-400 font-semibold transition-all duration-300 hover:bg-primary-500/5">
              <span className="flex items-center gap-2">
                <Download size={18} />
                Download Resume
              </span>
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-section floating-card mb-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition duration-300 blur rounded-2xl" 
                     style={{background: `linear-gradient(45deg, ${stat.gradient.split(' ')[1]}, ${stat.gradient.split(' ')})`}}></div>
                <div className="relative bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 text-center hover:bg-slate-700/80 transition-all duration-300">
                  <div className={`w-16 h-16 bg-gradient-to-r ${stat.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <stat.icon size={24} className="text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">
                    <span className="stat-number" data-value={stat.value}>0</span>
                    <span>{stat.suffix}</span>
                  </div>
                  <div className="text-slate-400 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Column - About & Contact */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* About Card */}
            <div className="floating-card group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
              <div className="relative bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <User size={20} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">About Me</h3>
                </div>
                
                <p className="text-slate-300 leading-relaxed mb-6">
                  {data.personal?.description || 
                  "I'm passionate about creating AI solutions that solve real-world problems. With expertise spanning machine learning, full-stack development, and team leadership, I bring ideas to life through code."}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-slate-300">
                    <MapPin size={16} className="text-primary-400" />
                    <span>{data.personal?.location || 'Alwar, Rajasthan, India'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <Globe size={16} className="text-primary-400" />
                    <span>Remote & On-site</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <Clock size={16} className="text-primary-400" />
                    <span>IST (UTC +5:30)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="floating-card group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
              <div className="relative bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">Let's Connect</h3>
                
                <div className="space-y-4">
                  <a href={`mailto:${data.personal?.email}`} 
                     className="group/item flex items-center gap-4 p-4 rounded-2xl bg-slate-700/30 hover:bg-slate-600/50 border border-slate-600/30 hover:border-primary-500/50 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                      <Mail size={18} className="text-white" />
                    </div>
                    <div>
                      <div className="text-slate-300 text-sm">Email</div>
                      <div className="text-white font-medium group-hover/item:text-primary-400 transition-colors duration-300">
                        {data.personal?.email}
                      </div>
                    </div>
                  </a>

                  <a href={`tel:${data.personal?.phone}`} 
                     className="group/item flex items-center gap-4 p-4 rounded-2xl bg-slate-700/30 hover:bg-slate-600/50 border border-slate-600/30 hover:border-green-500/50 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <Phone size={18} className="text-white" />
                    </div>
                    <div>
                      <div className="text-slate-300 text-sm">Phone</div>
                      <div className="text-white font-medium group-hover/item:text-green-400 transition-colors duration-300">
                        {data.personal?.phone}
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Skills & Expertise */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Skills Grid */}
            <div className="floating-card">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Code2 size={20} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Technical Expertise</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {skills.map((skillGroup, index) => (
                    <div key={index} className="group/skill">
                      <div className={`p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.02] ${
                        skillGroup.color === 'blue' ? 'bg-blue-500/5 border-blue-500/20 hover:border-blue-500/40' :
                        skillGroup.color === 'green' ? 'bg-green-500/5 border-green-500/20 hover:border-green-500/40' :
                        skillGroup.color === 'purple' ? 'bg-purple-500/5 border-purple-500/20 hover:border-purple-500/40' :
                        'bg-orange-500/5 border-orange-500/20 hover:border-orange-500/40'
                      }`}>
                        <h4 className={`text-lg font-semibold mb-4 ${
                          skillGroup.color === 'blue' ? 'text-blue-400' :
                          skillGroup.color === 'green' ? 'text-green-400' :
                          skillGroup.color === 'purple' ? 'text-purple-400' :
                          'text-orange-400'
                        }`}>
                          {skillGroup.category}
                        </h4>
                        <div className="space-y-2">
                          {skillGroup.items.map((skill, skillIndex) => (
                            <div key={skillIndex} className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${
                                skillGroup.color === 'blue' ? 'bg-blue-400' :
                                skillGroup.color === 'green' ? 'bg-green-400' :
                                skillGroup.color === 'purple' ? 'bg-purple-400' :
                                'bg-orange-400'
                              }`}></div>
                              <span className="text-slate-300 group-hover/skill:text-white transition-colors duration-300">
                                {skill}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Current Focus */}
            <div className="floating-card">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                    <Sparkles size={20} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Current Focus</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-slate-200 mb-4">🎯 Working On</h4>
                    <div className="space-y-3">
                      {(data.currentFocus || [
                        'Advanced LLM integrations',
                        'Voice-enabled AI systems',
                        'Real-time AI processing',
                        'Healthcare AI applications'
                      ]).map((focus, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-slate-700/30 border border-slate-600/30 hover:border-primary-500/50 transition-all duration-300">
                          <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></div>
                          <span className="text-slate-300">{focus.replace(/🔬|🎤|🏥|⚡|📊/g, '').trim()}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-slate-200 mb-4">🚀 Goals</h4>
                    <div className="space-y-3">
                      {[
                        'Leading AI product development',
                        'Building global tech teams',
                        'Open source contributions',
                        'Speaking at tech conferences'
                      ].map((goal, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-slate-700/30 border border-slate-600/30 hover:border-green-500/50 transition-all duration-300">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-slate-300">{goal}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
