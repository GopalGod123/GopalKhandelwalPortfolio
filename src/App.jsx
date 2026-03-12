import React from 'react';
import GlowingBubbles from './components/GlowingBubbles';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import ResumeChatbot from './components/ResumeChatbot';

function App() {
  return (
    <div className="bg-surface-950 text-zinc-50 min-h-screen relative overflow-x-hidden">
      <GlowingBubbles />

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

      <ResumeChatbot />
    </div>
  );
}

export default App;
