import { useEffect, useRef, useState } from 'react';
import SectionHead from './SectionHead.jsx';
import { categories, profile, projects } from '../data/profile.js';

const FILTERS = ['todos', ...Object.keys(categories).filter((c) => projects.some((p) => p.category === c))];

const statusClass = {
  produção: 'st-live',
  'em desenvolvimento': 'st-dev',
  arquivado: 'st-arch',
};

export default function Projects() {
  const [filter, setFilter] = useState('todos');
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    const onOpen = (e) => {
      if (projects.some((p) => p.id === e.detail)) {
        setFilter('todos');
        setOpenId(e.detail);
      }
    };
    window.addEventListener('ds:open-project', onOpen);
    return () => window.removeEventListener('ds:open-project', onOpen);
  }, []);

  const visible = filter === 'todos' ? projects : projects.filter((p) => p.category === filter);
  const current = projects.find((p) => p.id === openId);

  return (
    <section id="projetos" className="section container">
      <SectionHead index="01" label="projetos" title="Coisas que eu construí">
        Uma seleção do que já saiu do editor para o mundo. Clique em um card para ver os detalhes.
      </SectionHead>

      <div className="filters mono" role="tablist" aria-label="Filtrar projetos" data-reveal>
        {FILTERS.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={filter === f}
            className={`filter ${filter === f ? 'is-active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'todos' ? 'todos' : categories[f].toLowerCase()}
            <span className="filter-count">
              {f === 'todos' ? projects.length : projects.filter((p) => p.category === f).length}
            </span>
          </button>
        ))}
      </div>

      <div className="project-grid">
        {visible.map((p, i) => (
          <ProjectCard key={`${filter}-${p.id}`} project={p} index={projects.indexOf(p)} delay={i} onOpen={() => setOpenId(p.id)} />
        ))}
      </div>

      {current && <ProjectModal project={current} onClose={() => setOpenId(null)} />}
    </section>
  );
}

function ProjectCard({ project, index, delay, onOpen }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty('--mx', `${x}px`);
    el.style.setProperty('--my', `${y}px`);
    el.style.setProperty('--rx', `${((y / r.height) - 0.5) * -6}deg`);
    el.style.setProperty('--ry', `${((x / r.width) - 0.5) * 8}deg`);
  };
  const onLeave = () => {
    ref.current.style.setProperty('--rx', '0deg');
    ref.current.style.setProperty('--ry', '0deg');
  };

  return (
    <article
      ref={ref}
      className="project-card"
      style={{ '--delay': `${delay * 70}ms` }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <span className="card-spotlight" aria-hidden="true" />
      <span className="card-top mono">
        <span className="card-index">#{String(index + 1).padStart(2, '0')}</span>
        <span className={`status ${statusClass[project.status]}`}>{project.status}</span>
      </span>
      <h3 className="card-title">
        {project.demo ? (
          <a className="card-link" href={project.demo} target="_blank" rel="noreferrer">
            {project.title}
          </a>
        ) : (
          <button className="card-link" onClick={onOpen} aria-haspopup="dialog">
            {project.title}
          </button>
        )}
      </h3>
      <span className="card-desc">{project.description}</span>
      <span className="card-stack mono">
        {project.stack.map((s) => (
          <span key={s} className="tag">
            {s}
          </span>
        ))}
      </span>
      <span className="card-foot mono">
        <span>
          {categories[project.category]} · {project.year}
        </span>
        <span className="card-actions">
          <span className="card-open">
            {project.demo ? 'abrir site' : 'detalhes'} <span aria-hidden="true">↗</span>
          </span>
          {project.repo && (project.repoPrivate ? <PrivateRepo project={project} /> : (
            <a
              className="card-repo"
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              aria-label={`Código-fonte de ${project.title} no GitHub`}
              title="Ver código no GitHub"
            >
              <GitHubIcon />
            </a>
          ))}
        </span>
      </span>
    </article>
  );
}

// GitHub não tem "pedir acesso" a repo privado: o pedido vai por e-mail
function accessRequestHref(project) {
  const subject = `Acesso ao repositório ${project.title}`;
  const body = `Olá! Vi o projeto ${project.title} no seu portfólio e gostaria de acesso ao código.

Meu usuário do GitHub: `;
  return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function PrivateRepo({ project }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => !ref.current?.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', onDown);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <span className="card-repo-wrap" ref={ref}>
      <button
        className="card-repo"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={`Código de ${project.title}: repositório privado`}
        title="Repositório privado"
      >
        <GitHubIcon />
        <span className="card-repo-lock" aria-hidden="true">
          <LockIcon />
        </span>
      </button>
      {open && (
        <span className="repo-popover" role="dialog" aria-label="Repositório privado">
          <span className="repo-popover-title">
            <LockIcon /> repositório privado
          </span>
          <span className="repo-popover-text">
            O código deste projeto não é público. Peça acesso e eu libero pro seu usuário do GitHub.
          </span>
          <a className="btn btn-primary repo-popover-btn" href={accessRequestHref(project)}>
            solicitar acesso <span aria-hidden="true">→</span>
          </a>
        </span>
      )}
    </span>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 16 16" width="11" height="11" fill="currentColor" aria-hidden="true">
      <path d="M4 7V5a4 4 0 118 0v2h.5A1.5 1.5 0 0114 8.5v6a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 012 14.5v-6A1.5 1.5 0 013.5 7H4zm2 0h4V5a2 2 0 10-4 0v2z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 16 16" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

function ProjectModal({ project, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    const previous = document.activeElement;
    closeRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      previous?.focus?.({ preventScroll: true });
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="window-bar">
          <span className="dot dot-r" />
          <span className="dot dot-y" />
          <span className="dot dot-g" />
          <span className="window-title mono">~/projetos/{project.id}</span>
          <button ref={closeRef} className="modal-close mono" onClick={onClose} aria-label="Fechar">
            esc ✕
          </button>
        </div>
        <div className="modal-body">
          <p className="mono modal-meta">
            <span className={`status ${statusClass[project.status]}`}>{project.status}</span>
            <span>{categories[project.category]}</span>
            <span>{project.year}</span>
          </p>
          <h3 id="modal-title" className="modal-title">
            {project.title}
          </h3>
          <p className="modal-desc">{project.description}</p>

          <h4 className="mono modal-sub">// destaques</h4>
          <ul className="modal-list">
            {project.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>

          <h4 className="mono modal-sub">// stack</h4>
          <div className="card-stack mono">
            {project.stack.map((s) => (
              <span key={s} className="tag">
                {s}
              </span>
            ))}
          </div>

          <div className="modal-actions">
            {project.repoPrivate ? (
              <a className="btn btn-ghost" href={accessRequestHref(project)}>
                <LockIcon /> código privado · solicitar acesso
              </a>
            ) : (
              <ProjectLink href={project.repo} label="código-fonte" />
            )}
            <ProjectLink href={project.demo} label="ver online" primary />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectLink({ href, label, primary }) {
  if (!href) {
    return (
      <span className="btn btn-ghost is-disabled mono" title="Link ainda não cadastrado">
        {label} · em breve
      </span>
    );
  }
  return (
    <a className={`btn ${primary ? 'btn-primary' : 'btn-ghost'}`} href={href} target="_blank" rel="noreferrer">
      {label} <span aria-hidden="true">↗</span>
    </a>
  );
}
