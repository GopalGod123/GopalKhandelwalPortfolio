import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, Github, FileText, Play, Star, Award, Users, Code2, Sparkles, Zap, Terminal, Coffee } from 'lucide-react';
import gsap from 'gsap';
import data from './data/data.json';

const Hero = () => {
  const heroRef = useRef(null);
  const buttonRef = useRef(null);
  const codeRef = useRef(null);
  const [currentRole, setCurrentRole] = useState(0);
  const [typedText, setTypedText] = useState('');

  const roles = [
    "AI/ML Engineer 🤖",
    "Full Stack Developer 💻", 
    "Tech Innovator 🚀",
    "Problem Solver 🧩"
  ];

  useEffect(() => {
    // Role switching with typewriter effect
    const roleInterval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 4000);

    // Typewriter effect for description
    const description = "Building the future with AI-powered solutions and cutting-edge technology...";
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < description.length) {
        setTypedText(description.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typeInterval);
      }
    }, 50);

    // Enhanced GSAP Animations
    const tl = gsap.timeline({ delay: 0.2 });
    
    // Staggered entrance animations
    tl.fromTo('.hero-badge', 
      { scale: 0, opacity: 0, rotationY: 180 },
      { scale: 1, opacity: 1, rotationY: 0, duration: 0.8, ease: 'back.out(1.7)' }
    )
    .fromTo('.hero-greeting', 
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    )
    .fromTo('.hero-name', 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      '-=0.2'
    )
    .fromTo('.hero-role', 
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
      '-=0.5'
    )
    .fromTo('.hero-description', 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    )
    .fromTo('.hero-stats', 
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)' },
      '-=0.2'
    )
    .fromTo(buttonRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
      '-=0.3'
    )
    .fromTo(codeRef.current,
      { x: 100, opacity: 0, rotationY: 15 },
      { x: 0, opacity: 1, rotationY: 0, duration: 1, ease: 'power3.out' },
      '-=0.6'
    );

    // Continuous floating animations
    gsap.to('.floating-code', {
      y: -15,
      x: 10,
      rotation: 1,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // Floating orbs animation
    gsap.to('.floating-orb-1', {
      y: -30,
      x: 20,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    gsap.to('.floating-orb-2', {
      y: 25,
      x: -15,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    gsap.to('.floating-orb-3', {
      y: -20,
      x: 30,
      duration: 12,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    return () => {
      clearInterval(roleInterval);
      clearInterval(typeInterval);
    };
  }, [roles.length]);

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center relative overflow-hidden"
      ref={heroRef}
    >
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full animate-pulse"
            style={{
              backgroundImage: `
                linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px),
                radial-gradient(circle at 50px 50px, rgba(139, 92, 246, 0.15) 2px, transparent 2px)
              `,
              backgroundSize: '50px 50px, 50px 50px, 100px 100px',
              animation: 'gridMove 20s linear infinite'
            }}
          />
        </div>

        {/* Floating Gradient Orbs */}
        <div className="floating-orb-1 absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-primary-500/30 to-purple-600/30 rounded-full blur-3xl"></div>
        <div className="floating-orb-2 absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-full blur-3xl"></div>
        <div className="floating-orb-3 absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-pink-500/15 to-purple-600/15 rounded-full blur-3xl"></div>
        
        {/* Animated Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          >
            <div className="w-1 h-1 bg-primary-400 rounded-full opacity-60"></div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-20 items-center min-h-screen py-20">
          
          {/* Left Content */}
          <div className="order-2 lg:order-1 space-y-6 sm:space-y-8">
            
            {/* Badge */}
            <div className="hero-badge inline-flex items-center gap-2 mt-4 px-3 sm:px-4 py-2 bg-gradient-to-r from-primary-500/20 to-purple-500/20 rounded-full border border-primary-500/30 backdrop-blur-sm">
              <Sparkles className="text-primary-400" size={14} />
              <span className="text-primary-400 font-medium text-xs sm:text-sm">Available for new opportunities</span>
            </div>
            
            {/* Greeting */}
            <div className="hero-greeting flex items-center gap-2 sm:gap-3 text-lg sm:text-xl text-slate-300">
              <span className="text-2xl sm:text-3xl animate-wave">👋</span>
              <span>Hi, I am</span>
            </div>
            
            {/* Name - Responsive Typography */}
            <h1 className="hero-name text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-slate-100 via-slate-200 to-slate-300 bg-clip-text text-transparent">
                {data.personal?.name || "Gopal Khandelwal"}
              </span>
            </h1>
            
            {/* Animated Role - Responsive */}
            <div className="hero-role text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl text-slate-200 min-h-[2rem] sm:min-h-[3rem]">
              <span>I am a </span>
              <div className="inline-block relative">
                <span className="bg-gradient-to-r from-primary-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent font-bold">
                  {roles[currentRole]}
                </span>
                <span className="absolute -right-1 top-0 animate-blink text-primary-500 text-2xl sm:text-4xl">|</span>
              </div>
            </div>
            
            {/* Typewriter Description */}
            <div className="hero-description">
              <p className="text-lg sm:text-xl text-slate-400 leading-relaxed max-w-2xl">
                {typedText}
                <span className="animate-pulse">|</span>
              </p>
            </div>

            {/* Enhanced Stats Grid - Responsive */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 py-4 sm:py-6">
              {[
                { icon: Code2, label: 'Projects', value: '15+', color: 'text-blue-400' },
                { icon: Users, label: 'Clients', value: '8+', color: 'text-green-400' },
                { icon: Award, label: 'Experience', value: '3+ Years', color: 'text-purple-400' }
              ].map((stat, index) => (
                <div key={index} className="hero-stats group text-center p-3 sm:p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-300 hover:scale-105">
                  <stat.icon className={`${stat.color} mx-auto mb-2 group-hover:scale-110 transition-transform duration-300`} size={20} />
                  <div className="text-xl sm:text-2xl font-bold text-slate-100">{stat.value}</div>
                  <div className="text-slate-400 text-xs sm:text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
            
            {/* Enhanced Buttons - Responsive */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4" ref={buttonRef}>
              <a 
                href={data.personal?.links?.resume || "#"} 
                className="group relative inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary-500 to-purple-600 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-primary-500/25 hover:-translate-y-1 hover:scale-105"
              >
                <FileText size={18} />
                <span>Check Resume</span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10"></div>
              </a>
              
              <a 
                href={data.personal?.links?.github || "#"} 
                className="group inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-slate-800/80 text-slate-200 rounded-xl font-semibold border border-slate-600 backdrop-blur-sm transition-all duration-300 hover:border-primary-500/50 hover:bg-slate-700/80 hover:-translate-y-1 hover:scale-105"
              >
                <Github size={18} />
                <span>GitHub Profile</span>
              </a>
            </div>

            {/* Additional Interactive Elements */}
            <div className="flex items-center gap-6 pt-4">
              <button className="group inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors duration-300">
                <Play size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                <span className="text-sm font-medium">Watch Demo</span>
              </button>
              
              <div className="flex items-center gap-2 text-slate-500">
                <Coffee size={14} />
                <span className="text-xs">Powered by coffee ☕</span>
              </div>
            </div>
          </div>

          {/* Right Content - Enhanced Code Window */}
          <div className="order-1 lg:order-2 relative" ref={codeRef}>
            <div className="floating-code relative max-w-lg mx-auto lg:max-w-none">
              
              {/* Main Code Terminal */}
              <div className="relative bg-gradient-to-br from-slate-900/95 to-slate-800/95 rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 backdrop-blur-xl">
                
                {/* Enhanced Terminal Header */}
                <div className="bg-slate-800/90 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between border-b border-slate-700/50">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse delay-100"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse delay-200"></div>
                    </div>
                    <Terminal size={14} className="text-slate-400" />
                    <span className="text-slate-400 text-xs sm:text-sm font-mono">~/developer.js</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                    <span className="text-slate-400 text-xs">Live</span>
                  </div>
                </div>
                
                {/* Enhanced Code Editor Content */}
                <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm space-y-2 sm:space-y-3 min-h-[250px] sm:min-h-[300px]">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 w-4 sm:w-6 text-right">01</span>
                    <span className="text-purple-400">const</span>
                    <span className="text-blue-300 ml-2">developer</span>
                    <span className="text-white ml-2">=</span>
                    <span className="text-green-300 ml-2">"{data.personal?.name || 'Gopal Khandelwal'}"</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 w-4 sm:w-6 text-right">02</span>
                    <span className="text-blue-300">developer</span>
                    <span className="text-white">.</span>
                    <span className="text-yellow-400">currentRole</span>
                    <span className="text-white ml-2">=</span>
                    <span className="text-green-300 ml-2">"{roles[currentRole]}"</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 w-4 sm:w-6 text-right">03</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 w-4 sm:w-6 text-right">04</span>
                    <span className="text-slate-500">// Core Technologies</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 w-4 sm:w-6 text-right">05</span>
                    <span className="text-blue-300">developer</span>
                    <span className="text-white">.</span>
                    <span className="text-yellow-400">skills</span>
                    <span className="text-white ml-2">=</span>
                    <span className="text-cyan-300 ml-2">[</span>
                  </div>
                  
                  <div className="pl-6 sm:pl-10 space-y-1">
                    <div className="text-green-300">"React & Next.js ⚛️",</div>
                    <div className="text-green-300">"Node.js & Python 🐍",</div>
                    <div className="text-green-300">"AI/ML & LLMs 🤖",</div>
                    <div className="text-green-300">"Cloud & DevOps ☁️"</div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 w-4 sm:w-6 text-right">10</span>
                    <span className="text-cyan-300">]</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 w-4 sm:w-6 text-right">11</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 w-4 sm:w-6 text-right">12</span>
                    <span className="text-blue-300">console</span>
                    <span className="text-white">.</span>
                    <span className="text-purple-400">log</span>
                    <span className="text-yellow-400">(</span>
                    <span className="text-green-300">"Ready to innovate! 🚀"</span>
                    <span className="text-yellow-400">)</span>
                  </div>

                  {/* Animated Cursor */}
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 w-4 sm:w-6 text-right">13</span>
                    <span className="animate-pulse text-primary-400 text-lg">▊</span>
                  </div>
                </div>

                {/* Terminal Output */}
                <div className="bg-slate-900/70 border-t border-slate-700/50 p-3 sm:p-4">
                  <div className="text-green-400 text-xs sm:text-sm font-mono flex items-center gap-2">
                    <span>→</span>
                    <span className="animate-pulse">Ready to innovate! 🚀</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Floating Elements */}
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-primary-500 rounded-full animate-ping opacity-60"></div>
              <div className="absolute -bottom-3 -left-3 w-4 h-4 bg-purple-500 rounded-full animate-ping opacity-40 delay-1000"></div>
              <div className="absolute top-1/2 -right-2 w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
            </div>

            {/* Enhanced Achievement Badges - Responsive */}
            <div className="hidden sm:block absolute -left-4 lg:-left-6 top-16 lg:top-20 bg-slate-800/90 border border-slate-700 rounded-lg p-2 sm:p-3 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
              <div className="flex items-center gap-2">
                <Zap className="text-yellow-400" size={14} />
                <span className="text-slate-300 text-xs font-medium">40% Engagement ↑</span>
              </div>
            </div>

            <div className="hidden sm:block absolute -right-4 lg:-right-6 bottom-16 lg:bottom-20 bg-slate-800/90 border border-slate-700 rounded-lg p-2 sm:p-3 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
              <div className="flex items-center gap-2">
                <Award className="text-green-400" size={14} />
                <span className="text-slate-300 text-xs font-medium">95% Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2 text-slate-400 hover:text-primary-400 transition-colors duration-300 cursor-pointer">
          <span className="text-xs font-medium">Scroll to explore</span>
          <div className="p-2 rounded-full border border-slate-600 hover:border-primary-500 transition-colors duration-300">
            <ArrowDown size={16} />
          </div>
        </div>
      </div>

      {/* Enhanced Custom Animations */}
      <style jsx>{`
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(20deg); }
          75% { transform: rotate(-20deg); }
        }
        
        .animate-wave {
          animation: wave 2s ease-in-out infinite;
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        .animate-blink {
          animation: blink 1s infinite;
        }

        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) translateX(0px); 
          }
          25% { 
            transform: translateY(-10px) translateX(5px); 
          }
          50% { 
            transform: translateY(-20px) translateX(-5px); 
          }
          75% { 
            transform: translateY(-10px) translateX(10px); 
          }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        @keyframes gridMove {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(50px) translateY(50px); }
        }

        @media (max-width: 640px) {
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
