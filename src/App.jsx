import { lazy, Suspense } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Work from './components/sections/Work';
import Experience from './components/sections/Experience';
import Stack from './components/sections/Stack';
import Lab from './components/sections/Lab';
import Roadmap from './components/sections/Roadmap';
import Credentials from './components/sections/Credentials';
import Contact from './components/sections/Contact';

import Snowfall from './components/ui/Snowfall';
import ScrollProgress from './components/ui/ScrollProgress';
import CommandPalette from './components/ui/CommandPalette';
import { useSnowPreference } from './hooks/useSnowPreference';

const AssistantLauncher = lazy(() => import('./components/chat/AssistantLauncher'));

export default function App() {
  const [snow, toggleSnow] = useSnowPreference();

  return (
    <>
      {snow && <Snowfall />}
      <ScrollProgress />
      <CommandPalette snow={snow} onToggleSnow={toggleSnow} />
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-ink"
      >
        Skip to content
      </a>
      <Navbar snow={snow} onToggleSnow={toggleSnow} />
      <main id="content">
        <Hero />
        <Work />
        <Experience />
        <Stack />
        <Lab />
        <Roadmap />
        <About />
        <Credentials />
        <Contact />
      </main>
      <Footer />
      <Suspense fallback={null}>
        <AssistantLauncher />
      </Suspense>
    </>
  );
}
