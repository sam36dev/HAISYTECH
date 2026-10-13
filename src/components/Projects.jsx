import { useEffect, useRef, useState } from 'react';
import SectionHead from './SectionHead.jsx';
import { categories, projects } from '../data/profile.js';

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
    <button
      ref={ref}
      className="project-card"
      style={{ '--delay': `${delay * 70}ms` }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onOpen}
      aria-haspopup="dialog"
    >
      <span className="card-spotlight" aria-hidden="true" />
      <span className="card-top mono">
        <span className="card-index">#{String(index + 1).padStart(2, '0')}</span>
        <span className={`status ${statusClass[project.status]}`}>{project.status}</span>
      </span>
      <span className="card-title">{project.title}</span>
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
        <span className="card-open">
          detalhes <span aria-hidden="true">↗</span>
        </span>
      </span>
    </button>
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
            <ProjectLink href={project.repo} label="código-fonte" />
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
