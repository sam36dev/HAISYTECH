import { useRef } from 'react';
import NeuralCanvas from './NeuralCanvas.jsx';
import { profile, projects } from '../data/profile.js';
import { useScramble } from '../hooks/useScramble.js';
import { useTypewriter } from '../hooks/useTypewriter.js';
import { scrollToSection } from '../lib/events.js';

const techCount = new Set(projects.flatMap((p) => p.stack)).size;

export default function Hero({ ready }) {
  const name = useScramble(profile.name, ready);
  const role = useTypewriter(profile.roles, ready);

  return (
    <section id="inicio" className="hero">
      <NeuralCanvas />
      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="eyebrow mono">
            <span className="pulse-dot" />
            {profile.available ? 'disponível para novos projetos' : 'agenda cheia no momento'}
          </p>

          <h1 className="hero-title" aria-label={profile.name}>
            <span aria-hidden="true" data-text={name}>
              {name || ' '}
            </span>
          </h1>

          <p className="hero-role mono">
            <span className="prompt">~$</span> {role}
            <span className="caret" aria-hidden="true" />
          </p>

          <p className="hero-tagline">{profile.tagline}</p>

          <div className="hero-cta">
            <button className="btn btn-primary" onClick={() => scrollToSection('projetos')}>
              ver projetos <span aria-hidden="true">→</span>
            </button>
            <button className="btn btn-ghost mono" onClick={() => scrollToSection('terminal')}>
              ./abrir-terminal
            </button>
          </div>

          <dl className="hero-stats">
            <div>
              <dt className="mono">projetos</dt>
              <dd>{String(projects.length).padStart(2, '0')}</dd>
            </div>
            <div>
              <dt className="mono">tecnologias</dt>
              <dd>{techCount}</dd>
            </div>
            <div>
              <dt className="mono">cafés</dt>
              <dd>∞</dd>
            </div>
          </dl>
        </div>

        <CodeCard />
      </div>

      <button className="scroll-hint mono" onClick={() => scrollToSection('projetos')} aria-label="Rolar para projetos">
        scroll
        <span />
      </button>
    </section>
  );
}

const q = (s) => `"${s}"`;
const list = (items) => items.map((s, i) => [['str', q(s)], i < items.length - 1 ? ['pun', ', '] : null]).flat().filter(Boolean);

const CODE = [
  [['kw', 'export const '], ['var', 'haisy'], ['pun', ' = {']],
  [['ind', '  '], ['key', 'role'], ['pun', ': '], ['str', q(profile.roles[0])], ['pun', ',']],
  [['ind', '  '], ['key', 'stack'], ['pun', ': ['], ...list(profile.mainStack), ['pun', '],']],
  [['ind', '  '], ['key', 'foco'], ['pun', ': ['], ...list(profile.focus), ['pun', '],']],
  [['ind', '  '], ['key', 'cafe'], ['pun', ': '], ['num', 'Infinity'], ['pun', ',']],
  [['ind', '  '], ['key', 'bugs'], ['pun', ': '], ['num', '0'], ['pun', ','], ['com', ' // quase sempre']],
  [['ind', '  '], ['key', 'status'], ['pun', ': '], ['str', q('online')], ['pun', ',']],
  [['pun', '};']],
];

function CodeCard() {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--rx', `${-py * 10}deg`);
    el.style.setProperty('--ry', `${px * 12}deg`);
  };
  const onLeave = () => {
    ref.current.style.setProperty('--rx', '0deg');
    ref.current.style.setProperty('--ry', '0deg');
  };

  return (
    <div className="hero-visual" onMouseMove={onMove} onMouseLeave={onLeave}>
      <div ref={ref} className="code-card" data-hover>
        <div className="window-bar">
          <span className="dot dot-r" />
          <span className="dot dot-y" />
          <span className="dot dot-g" />
          <span className="window-title mono">haisy.config.ts</span>
        </div>
        <pre className="code mono">
          {CODE.map((line, i) => (
            <div className="code-line" key={i} style={{ '--i': i }}>
              <span className="ln">{i + 1}</span>
              <span>
                {line.map(([cls, txt], j) => (
                  <span key={j} className={`tk-${cls}`}>
                    {txt}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </pre>
        <div className="code-card-glow" aria-hidden="true" />
      </div>
      <div className="float-chip chip-a mono">⚡ 99 lighthouse</div>
      <div className="float-chip chip-b mono">✔ build passing</div>
    </div>
  );
}
