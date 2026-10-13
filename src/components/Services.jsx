import { useState } from 'react';
import SectionHead from './SectionHead.jsx';
import { projects, services } from '../data/profile.js';
import { requestServices } from '../lib/events.js';

export default function Services() {
  const [selected, setSelected] = useState([]);

  const toggle = (id) =>
    setSelected((list) => (list.includes(id) ? list.filter((s) => s !== id) : [...list, id]));

  return (
    <section id="servicos" className="section container">
      <SectionHead index="01" label="serviços" title="O que eu posso construir pra você">
        Escolha um ou mais serviços e peça um orçamento. Sem compromisso.
      </SectionHead>

      <div className="service-grid">
        {services.map((s) => {
          const active = selected.includes(s.id);
          const example = projects.find((p) => p.id === s.example);
          return (
            <button
              key={s.id}
              className={`service-card ${active ? 'is-active' : ''}`}
              style={{ '--accent': s.accent }}
              aria-pressed={active}
              onClick={() => toggle(s.id)}
              data-reveal
            >
              <span className="service-top">
                <span className="service-icon mono" aria-hidden="true">
                  {s.icon}
                </span>
                <span className="service-check" aria-hidden="true">
                  {active ? '✓' : '+'}
                </span>
              </span>
              <span className="service-title">{s.title}</span>
              <span className="service-desc">{s.description}</span>
              <span className="service-items">
                {s.items.map((item) => (
                  <span key={item} className="service-item">
                    {item}
                  </span>
                ))}
              </span>
              {example && <span className="service-example mono">ex.: {example.title}</span>}
            </button>
          );
        })}
      </div>

      <div className="service-cta" data-reveal>
        <span className="mono service-count">
          {selected.length === 0
            ? '// clique nos serviços que você precisa'
            : `${selected.length} serviço${selected.length > 1 ? 's' : ''} selecionado${selected.length > 1 ? 's' : ''}`}
        </span>
        <button className="btn btn-primary" disabled={selected.length === 0} onClick={() => requestServices(selected)}>
          solicitar orçamento <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  );
}
