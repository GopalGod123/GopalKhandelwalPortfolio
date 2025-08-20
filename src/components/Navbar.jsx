import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Github, FileText, Home, User, Code, Briefcase, BookOpen, Mail, ExternalLink, Sparkles } from "lucide-react";
import gsap from "gsap";
import profilePhoto from '/MyPhoto.png'; // Import 
import data from "./data/data.json";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const navRef = useRef(null);

  const navItems = [
    { name: "Home", id: "hero", icon: Home },
    { name: "About", id: "about", icon: User },
    { name: "Skills", id: "skills", icon: Code },
    { name: "Experience", id: "experience", icon: Briefcase },
    { name: "Projects", id: "projects", icon: Code },
    { name: "Education", id: "education", icon: BookOpen },
    { name: "Contact", id: "contact", icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    
    tl.fromTo(navRef.current, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "back.out(1.7)" }
    )
    .fromTo(".nav-item", 
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
      "-=0.5"
    );
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
      setActiveSection(sectionId);
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 shadow-xl shadow-black/10"
            : "bg-slate-900/80 backdrop-blur-lg"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Use Grid Layout for Perfect Alignment */}
          <div className="grid grid-cols-3 items-center h-16 lg:h-20">
            
            {/* LEFT COLUMN: Logo & Name */}
            <div className="flex items-center justify-start">
              <div className="group cursor-pointer" onClick={() => scrollToSection("hero")}>
                <div className="flex items-center gap-3">
                <div className="relative">
                    <img
                      src={profilePhoto}
                      alt="Gopal Khandelwal"
                      className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover border-2 border-gradient-to-r from-primary-500 via-purple-500 to-cyan-500 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg"
                    />
                    
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500 via-purple-500 to-cyan-500 blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="hidden sm:block">
                    <div className="text-lg font-bold bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">
                      Gopal Khandelwal
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-1">
                      <Sparkles size={10} />
                      <span>AI/ML Engineer</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CENTER COLUMN: Navigation Menu */}
            <div className="flex items-center justify-center">
              <div className="hidden lg:flex items-center space-x-2.5">
                {navItems.map((item) => {
                  const IconComponent = item.icon;
                  const isActive = activeSection === item.id;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`nav-item group relative px-3 py-2 rounded-xl font-medium transition-all duration-300 ${
                        isActive
                          ? "text-white bg-gradient-to-r from-primary-500/20 to-purple-500/20 border border-primary-500/30"
                          : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <IconComponent size={14} className={`transition-all duration-300 ${
                          isActive ? "text-primary-400" : "group-hover:text-primary-400"
                        }`} />
                        <span className="text-sm">{item.name}</span>
                      </div>
                      
                      {isActive && (
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-400 rounded-full"></div>
                      )}
                      
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* RIGHT COLUMN: GitHub & Resume */}
            <div className="flex items-center justify-end gap-2">
              {/* GitHub Button - Desktop Only */}
              <a
                href={data?.personal?.links?.github || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:block group relative p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:text-white transition-all duration-300 hover:bg-slate-700/50 hover:border-slate-600/50 hover:scale-105"
              >
                <Github size={16} />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              
              {/* Resume Button - Always Visible */}
              <a
                href={data?.personal?.links?.resume || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 px-4 py-2 lg:px-6 lg:py-3 bg-gradient-to-r from-primary-500 to-purple-600 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/25 hover:scale-105"
              >
                <FileText size={14} />
                <span className="text-sm">Resume</span>
                <ExternalLink size={12} className="opacity-70" />
                
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </a>

              {/* Mobile Menu Button */}
              <div className="lg:hidden ml-2">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="relative p-2 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:text-white transition-all duration-300 hover:bg-slate-700/50"
                  aria-label="Toggle Menu"
                >
                  <div className="relative w-5 h-5">
                    <span className={`absolute inset-0 transition-all duration-300 ${isOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'}`}>
                      <Menu size={20} />
                    </span>
                    <span className={`absolute inset-0 transition-all duration-300 ${isOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'}`}>
                      <X size={20} />
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        ></div>
        
        <div className={`absolute right-0 top-0 h-full w-80 max-w-sm bg-slate-900/95 backdrop-blur-xl border-l border-slate-700/50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}>
          
          {/* Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">GK</span>
              </div>
              <div>
                <div className="text-slate-100 font-semibold">Menu</div>
                <div className="text-slate-400 text-xs">Navigate</div>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg bg-slate-800/50 text-slate-400 hover:text-white transition-colors duration-300"
            >
              <X size={20} />
            </button>
          </div>

                     {/* Menu Items */}
           <div className="p-6 space-y-2">
             {navItems.map((item) => {
               const IconComponent = item.icon;
               const isActive = activeSection === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    isActive
                      ? "text-white bg-gradient-to-r from-primary-500/20 to-purple-500/20 border border-primary-500/30"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  <IconComponent size={18} className={isActive ? "text-primary-400" : ""} />
                  <span>{item.name}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-primary-400 rounded-full"></div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile Action Buttons */}
          <div className="p-6 border-t border-slate-700/50">
            <div className="space-y-3">
              <a
                href={data?.personal?.links?.github || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 text-slate-300 rounded-xl font-medium transition-all duration-300 hover:bg-slate-700/50 hover:text-white"
              >
                <Github size={18} />
                <span>GitHub Profile</span>
                <ExternalLink size={14} className="opacity-70" />
              </a>
              
              <a
                href={data?.personal?.links?.resume || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-primary-500 to-purple-600 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/25"
              >
                <FileText size={18} />
                <span>Download Resume</span>
                <ExternalLink size={14} className="opacity-70" />
              </a>
            </div>
          </div>

          {/* Social Footer */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="text-center text-slate-400 text-xs">
              <div className="flex items-center justify-center gap-1 mb-2">
                <Sparkles size={12} />
                <span>Built with passion</span>
              </div>
              <div>© 2025 Gopal Khandelwal</div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-800/50 z-40">
        <div 
          className="h-full bg-gradient-to-r from-primary-500 to-purple-600 transition-all duration-300"
          style={{ 
            width: `${((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100) || 0}%` 
          }}
        ></div>
      </div>
    </>
  );
};

export default Navbar;
