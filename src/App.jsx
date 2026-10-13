import { useCallback, useEffect, useState } from 'react';
import BootScreen from './components/BootScreen.jsx';
import Cursor from './components/Cursor.jsx';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Projects from './components/Projects.jsx';
import Skills from './components/Skills.jsx';
import Terminal from './components/Terminal.jsx';
import Timeline from './components/Timeline.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import StatusBar from './components/StatusBar.jsx';
import CommandPalette from './components/CommandPalette.jsx';
import MatrixRain from './components/MatrixRain.jsx';
import { useKonami, useReveal } from './hooks/useGlobalEffects.js';

function alreadyBooted() {
  try {
    return sessionStorage.getItem('ds-booted') === '1';
  } catch {
    return false;
  }
}

export default function App() {
  const [booted, setBooted] = useState(alreadyBooted);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [matrix, setMatrix] = useState(false);

  const startMatrix = useCallback(() => setMatrix(true), []);
  useKonami(startMatrix);
  useReveal([booted]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((open) => !open);
      }
    };
    const onPalette = () => setPaletteOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener('ds:palette', onPalette);
    window.addEventListener('ds:matrix', startMatrix);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('ds:palette', onPalette);
      window.removeEventListener('ds:matrix', startMatrix);
    };
  }, [startMatrix]);

  const finishBoot = useCallback(() => {
    try {
      sessionStorage.setItem('ds-booted', '1');
    } catch {
      /* sem storage: o boot só roda de novo na próxima visita */
    }
    setBooted(true);
  }, []);

  return (
    <>
      {!booted && <BootScreen onDone={finishBoot} />}
      <Cursor />

      <div className="bg-layer" aria-hidden="true">
        <div className="bg-grid" />
        <div className="bg-orb orb-a" />
        <div className="bg-orb orb-b" />
        <div className="bg-noise" />
      </div>

      <Nav />
      <main>
        <Hero ready={booted} />
        <Projects />
        <Skills />
        <Terminal />
        <Timeline />
        <Contact />
      </main>
      <Footer />
      <StatusBar />

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      {matrix && <MatrixRain onDone={() => setMatrix(false)} />}
    </>
  );
}
