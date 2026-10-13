import { useEffect, useMemo, useRef, useState } from 'react';
import { SECTIONS } from './Nav.jsx';
import { profile, projects } from '../data/profile.js';
import { normalize, openProject, scrollToSection, triggerMatrix } from '../lib/events.js';

function buildActions() {
  return [
    { group: 'navegar', label: 'Início', hint: 'topo', run: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    ...SECTIONS.map((s) => ({ group: 'navegar', label: `Ir para ${s.label}`, hint: `#${s.id}`, run: () => scrollToSection(s.id) })),
    ...projects.map((p) => ({ group: 'projetos', label: p.title, hint: p.stack.slice(0, 2).join(' · '), run: () => openProject(p.id) })),
    {
      group: 'ações',
      label: 'Copiar e-mail',
      hint: profile.email,
      run: () => navigator.clipboard?.writeText(profile.email),
    },
    ...profile.socials.map((s) => ({ group: 'ações', label: `Abrir ${s.label}`, hint: s.handle, run: () => window.open(s.url, '_blank', 'noreferrer') })),
    { group: 'ações', label: 'Entrar na Matrix', hint: 'easter egg', run: triggerMatrix },
  ];
}

export default function CommandPalette({ open, onClose }) {
  const actions = useMemo(buildActions, []);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const results = useMemo(() => {
    const q = normalize(query.trim());
    return q ? actions.filter((a) => normalize(`${a.label} ${a.hint} ${a.group}`).includes(q)) : actions;
  }, [query, actions]);

  useEffect(() => {
    if (!open) return;
    setQuery('');
    setActive(0);
    const t = setTimeout(() => inputRef.current?.focus(), 10);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    listRef.current?.querySelector('.is-active')?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  if (!open) return null;

  const run = (action) => {
    onClose();
    setTimeout(action.run, 60);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Escape') onClose();
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => (a + 1) % Math.max(results.length, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => (a - 1 + results.length) % Math.max(results.length, 1));
    } else if (e.key === 'Enter' && results[active]) {
      run(results[active]);
    }
  };

  let lastGroup = null;

  return (
    <div className="palette-backdrop" onClick={onClose}>
      <div className="palette" role="dialog" aria-modal="true" aria-label="Paleta de comandos" onClick={(e) => e.stopPropagation()}>
        <div className="palette-search">
          <span className="mono t-cyan">›</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Digite um comando ou busque um projeto..."
            aria-label="Buscar comando"
          />
          <kbd className="mono">esc</kbd>
        </div>
        <ul className="palette-list" ref={listRef} role="listbox">
          {results.length === 0 && <li className="palette-empty mono">nenhum resultado para "{query}"</li>}
          {results.map((a, i) => {
            const header = a.group !== lastGroup ? a.group : null;
            lastGroup = a.group;
            return (
              <li key={`${a.group}-${a.label}`}>
                {header && <p className="palette-group mono">{header}</p>}
                <button
                  role="option"
                  aria-selected={i === active}
                  className={`palette-item ${i === active ? 'is-active' : ''}`}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => run(a)}
                >
                  <span>{a.label}</span>
                  <span className="palette-hint mono">{a.hint}</span>
                </button>
              </li>
            );
          })}
        </ul>
        <div className="palette-foot mono">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> navegar
          </span>
          <span>
            <kbd>⏎</kbd> executar
          </span>
        </div>
      </div>
    </div>
  );
}
