import { useEffect, useState } from 'react';
import { SECTIONS } from './Nav.jsx';

const IDS = ['inicio', ...SECTIONS.map((s) => s.id)];

// Barra inferior no estilo VS Code.
export default function StatusBar() {
  const [time, setTime] = useState(() => new Date());
  const [section, setSection] = useState('inicio');

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setSection(e.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <div className="statusbar mono" aria-hidden="true">
      <span className="sb-item sb-branch">⎇ main</span>
      <span className="sb-item sb-ok">● online</span>
      <span className="sb-item sb-path">~/portfolio/{section}</span>
      <span className="sb-spacer" />
      <span className="sb-item sb-hide-sm">UTF-8</span>
      <span className="sb-item sb-hide-sm">React</span>
      <span className="sb-item">{time.toLocaleTimeString('pt-BR')}</span>
    </div>
  );
}
