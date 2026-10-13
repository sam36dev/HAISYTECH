import { useEffect, useRef, useState } from 'react';

const LINES = [
  ['0.000000', 'SS-OS kernel 6.9-haisy iniciando', ''],
  ['0.041337', 'carregando módulos: react, vite, criatividade', 'ok'],
  ['0.112904', 'montando /projetos', 'ok'],
  ['0.204518', 'conectando à cafeteira', 'ok'],
  ['0.318004', 'compilando ideias', 'ok'],
  ['0.420771', 'inicializando interface neural', 'ok'],
  ['0.500000', 'sistema pronto. bem-vindo(a).', ''],
];

export default function BootScreen({ onDone }) {
  const [shown, setShown] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const done = useRef(onDone);
  done.current = onDone;

  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timers = [];
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      setShown(LINES.length);
      setLeaving(true);
      timers.push(setTimeout(() => done.current(), 550));
    };

    if (reduce) {
      finish();
    } else {
      LINES.forEach((_, i) => timers.push(setTimeout(() => setShown(i + 1), 160 * (i + 1))));
      timers.push(setTimeout(finish, 160 * LINES.length + 500));
    }

    window.addEventListener('keydown', finish);
    window.addEventListener('pointerdown', finish);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('keydown', finish);
      window.removeEventListener('pointerdown', finish);
    };
  }, []);

  const progress = Math.round((shown / LINES.length) * 100);

  return (
    <div className={`boot ${leaving ? 'is-leaving' : ''}`} role="status" aria-label="Carregando portfólio">
      <div className="boot-inner mono">
        <div className="boot-logo">
          <span className="grad-text">SS</span>-OS
        </div>
        <ul className="boot-lines">
          {LINES.slice(0, shown).map(([time, text, status]) => (
            <li key={time}>
              <span className="boot-time">[{time.padStart(12, ' ')}]</span> {text}
              {status && <span className="boot-ok"> [ {status} ]</span>}
            </li>
          ))}
        </ul>
        <div className="boot-bar">
          <span style={{ width: `${progress}%` }} />
        </div>
        <div className="boot-footer">
          <span>{progress}%</span>
          <span>pressione qualquer tecla para pular</span>
        </div>
      </div>
    </div>
  );
}
