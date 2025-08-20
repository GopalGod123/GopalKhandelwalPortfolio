import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlowingBubbles from './components/GlowingBubbles';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import ResumeChatbot from './components/ResumeChatbot'; // Add this

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo('body', { opacity: 0 }, { opacity: 1, duration: 0.5 })
      .fromTo('.navbar', { y: -100 }, { y: 0, duration: 0.8, ease: 'bounce.out' }, 0.2);
  }, []);

  return (
    <div className="bg-dark-900 text-slate-100 min-h-screen relative">
      {/* Glowing Bubbles Background */}
      <GlowingBubbles />
      
      {/* Main Content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </div>
      
      {/* AI Chatbot - Add this */}
      <ResumeChatbot />
    </div>
  );
}

export default App;
