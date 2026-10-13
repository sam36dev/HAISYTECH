import { useEffect, useRef, useState } from 'react';
import SectionHead from './SectionHead.jsx';
import { categories, profile, projects, skillGroups } from '../data/profile.js';
import { openProject, scrollToSection, triggerMatrix } from '../lib/events.js';

const PROMPT = `visitante@${profile.handle}`;

const COMMANDS = {
  help: 'lista os comandos',
  whoami: 'quem sou eu',
  about: 'um pouco sobre mim',
  projects: 'lista os projetos',
  'open <id>': 'abre os detalhes de um projeto',
  skills: 'minha stack',
  contact: 'como falar comigo',
  date: 'data e hora atuais',
  echo: 'repete o que você digitar',
  history: 'comandos que você já usou',
  clear: 'limpa a tela',
  matrix: '???',
};

const welcome = () => [
  { kind: 'out', node: <span className="t-dim">SS-OS terminal v1.0 — conexão segura estabelecida.</span> },
  {
    kind: 'out',
    node: (
      <span>
        Digite <span className="t-cyan">help</span> para ver os comandos. Dica: <span className="t-dim">Tab</span> completa,{' '}
        <span className="t-dim">↑ ↓</span> navegam no histórico.
      </span>
    ),
  },
];

export default function Terminal() {
  const [lines, setLines] = useState(welcome);
  const [input, setInput] = useState('');
  const history = useRef([]);
  const histPos = useRef(-1);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  const print = (...nodes) => nodes.map((node) => ({ kind: 'out', node }));

  const execute = (raw) => {
    const [cmd = '', ...args] = raw.trim().split(/\s+/);
    const arg = args.join(' ');
    switch (cmd.toLowerCase()) {
      case '':
        return [];
      case 'help':
        return print(
          ...Object.entries(COMMANDS).map(([name, desc]) => (
            <span>
              <span className="t-cyan t-col">{name}</span>
              <span className="t-dim">{desc}</span>
            </span>
          )),
        );
      case 'whoami':
        return print(
          <span>
            <span className="t-lime">{profile.name}</span> — {profile.roles[0]} · {profile.location}
          </span>,
        );
      case 'about':
        return print(...profile.about);
      case 'ls':
      case 'projects':
        return print(
          ...projects.map((p) => (
            <span>
              <span className="t-cyan t-col">{p.id}</span>
              {p.title} <span className="t-dim">· {categories[p.category]} · {p.year}</span>
            </span>
          )),
          <span className="t-dim">use: open &lt;id&gt;  (ex: open {projects[0].id})</span>,
        );
      case 'open': {
        const project = projects.find((p) => p.id === arg.toLowerCase());
        if (!project) return print(<span className="t-err">projeto não encontrado: {arg || '(vazio)'} — tente "projects"</span>);
        setTimeout(() => openProject(project.id), 250);
        return print(<span className="t-lime">abrindo {project.title}...</span>);
      }
      case 'skills':
      case 'stack':
        return print(
          ...skillGroups.map((g) => (
            <span>
              <span className="t-violet t-col">{g.title}</span>
              {g.items.join(', ')}
            </span>
          )),
        );
      case 'contact':
      case 'contato':
        setTimeout(() => scrollToSection('contato'), 400);
        return print(
          <span>
            <span className="t-col t-cyan">email</span>
            {profile.email}
          </span>,
          ...profile.socials.map((s) => (
            <span>
              <span className="t-col t-cyan">{s.label.toLowerCase()}</span>
              {s.handle}
            </span>
          )),
        );
      case 'date':
        return print(new Date().toLocaleString('pt-BR'));
      case 'echo':
        return print(arg);
      case 'history':
        return print(...history.current.map((h, i) => <span className="t-dim">{`${String(i + 1).padStart(3)}  ${h}`}</span>));
      case 'matrix':
        triggerMatrix();
        return print(<span className="t-lime">wake up, neo...</span>);
      case 'sudo':
        if (/hire/i.test(arg)) {
          setTimeout(() => scrollToSection('contato'), 600);
          return print(<span className="t-lime">permissão concedida ✔ redirecionando para o contato...</span>);
        }
        return print(<span className="t-err">{PROMPT.split('@')[0]} não está no arquivo sudoers. Este incidente será reportado. 🚨</span>);
      case 'rm':
        return print(<span className="t-err">boa tentativa. 😏</span>);
      case 'exit':
        return print(<span className="t-dim">não há saída. só mais projetos.</span>);
      default:
        return print(<span className="t-err">comando não encontrado: {cmd}. digite "help".</span>);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    const raw = input;
    if (raw.trim()) history.current.push(raw.trim());
    histPos.current = -1;
    setInput('');
    if (raw.trim().toLowerCase() === 'clear') {
      setLines([]);
      return;
    }
    run(raw);
  };

  const run = (raw) => {
    const output = execute(raw);
    setLines((prev) => [...prev, { kind: 'cmd', text: raw }, ...output]);
  };

  const onKeyDown = (e) => {
    const h = history.current;
    if (e.key === 'ArrowUp' && h.length) {
      e.preventDefault();
      histPos.current = histPos.current < 0 ? h.length - 1 : Math.max(0, histPos.current - 1);
      setInput(h[histPos.current]);
    } else if (e.key === 'ArrowDown' && h.length) {
      e.preventDefault();
      if (histPos.current < 0) return;
      histPos.current += 1;
      if (histPos.current >= h.length) {
        histPos.current = -1;
        setInput('');
      } else setInput(h[histPos.current]);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const parts = input.split(' ');
      const options =
        parts.length > 1 && parts[0] === 'open'
          ? projects.map((p) => `open ${p.id}`)
          : [...Object.keys(COMMANDS).map((c) => c.split(' ')[0]), 'sudo hire haisy'];
      const match = options.find((o) => o.startsWith(input.toLowerCase()) && o !== input);
      if (match) setInput(match);
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  return (
    <section id="terminal" className="section container">
      <SectionHead index="04" label="terminal" title="Fala comigo pelo terminal">
        Um shell de verdade (tá, quase). Explore o portfólio do jeito que dev gosta.
      </SectionHead>

      <div className="terminal" data-reveal onClick={() => inputRef.current?.focus({ preventScroll: true })}>
        <div className="window-bar">
          <span className="dot dot-r" />
          <span className="dot dot-y" />
          <span className="dot dot-g" />
          <span className="window-title mono">{PROMPT}: ~ — zsh</span>
        </div>
        <div className="terminal-body mono" ref={bodyRef}>
          {lines.map((line, i) =>
            line.kind === 'cmd' ? (
              <div key={i} className="t-line">
                <span className="t-prompt">{PROMPT}</span>
                <span className="t-dim">:~$</span> {line.text}
              </div>
            ) : (
              <div key={i} className="t-line t-out">
                {line.node}
              </div>
            ),
          )}
          <form onSubmit={submit} className="t-line t-input-line">
            <label htmlFor="term-input">
              <span className="t-prompt">{PROMPT}</span>
              <span className="t-dim">:~$</span>
            </label>
            <input
              id="term-input"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck="false"
              aria-label="Comando do terminal"
            />
          </form>
        </div>
      </div>

      <div className="terminal-hints mono" data-reveal>
        {['help', 'whoami', 'projects', 'sudo hire haisy', 'matrix'].map((c) => (
          <button
            key={c}
            className="hint"
            onClick={() => {
              history.current.push(c);
              run(c);
            }}
          >
            {c}
          </button>
        ))}
      </div>
    </section>
  );
}
