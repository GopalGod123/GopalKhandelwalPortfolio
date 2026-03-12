import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Github, FileText, ExternalLink } from "lucide-react";
import gsap from "gsap";
import data from "./data/data.json";
import profilePhoto from "/MyPhoto.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const navRef = useRef(null);

  const navItems = [
    { name: "Home", id: "hero" },
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Experience", id: "experience" },
    { name: "Projects", id: "projects" },
    { name: "Education", id: "education" },
    { name: "Contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 120;

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
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-surface-950/80 backdrop-blur-xl border-b border-zinc-800/60"
            : "bg-transparent"
        }`}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            {/* Logo */}
            <button
              onClick={() => scrollToSection("hero")}
              className="flex items-center gap-2 group"
            >
              <div className="w-9 h-9 rounded-lg overflow-hidden border-2 border-primary-500/30 ring-2 ring-primary-500/10 group-hover:ring-primary-500/30 transition-all duration-300">
                <img src={profilePhoto} alt="Gopal Khandelwal" className="w-full h-full object-cover" />
              </div>
              <span className="hidden sm:block text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">
                Gopal Khandelwal
              </span>
            </button>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeSection === item.id
                      ? "text-white bg-zinc-800"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <a
                href={data?.personal?.links?.github || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex items-center justify-center w-9 h-9 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all duration-200"
              >
                <Github size={18} />
              </a>

              <a
                href={data?.personal?.links?.resume || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary !px-4 !py-2 !text-sm !gap-1.5"
              >
                <FileText size={14} />
                <span>Resume</span>
              </a>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all duration-200"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

        <div
          className={`absolute right-0 top-0 h-full w-[280px] bg-surface-950 border-l border-zinc-800 transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-5 border-b border-zinc-800">
            <span className="text-sm font-semibold text-zinc-200">Navigation</span>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="p-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? "text-white bg-zinc-800"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-zinc-800 space-y-2">
            <a
              href={data?.personal?.links?.github || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full !text-sm"
            >
              <Github size={16} />
              <span>GitHub</span>
              <ExternalLink size={12} className="ml-auto opacity-50" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
