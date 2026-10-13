import { useEffect, useState } from 'react';
import { openPalette, scrollToSection } from '../lib/events.js';

export const SECTIONS = [
  { id: 'servicos', label: 'serviços' },
  { id: 'projetos', label: 'projetos' },
  { id: 'stack', label: 'stack' },
  { id: 'terminal', label: 'terminal' },
  { id: 'jornada', label: 'jornada' },
  { id: 'contato', label: 'contato' },
];

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container nav-inner">
        <a
          href="#inicio"
          className="nav-logo mono"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <span className="grad-text">&lt;SS</span>
          <span className="nav-logo-slash">/</span>
          <span className="grad-text">&gt;</span>
        </a>

        <nav aria-label="Seções">
          <ul className="nav-links mono">
            {SECTIONS.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(s.id);
                  }}
                >
                  <span className="nav-index">0{i + 1}.</span>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button className="kbd-btn mono" onClick={openPalette} aria-label="Abrir paleta de comandos">
          <kbd>{isMac ? '⌘' : 'Ctrl'}</kbd>
          <kbd>K</kbd>
        </button>
      </div>
    </header>
  );
}
