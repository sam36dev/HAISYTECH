import SectionHead from './SectionHead.jsx';
import { orbit, skillGroups } from '../data/profile.js';

const RADII = [92, 152, 208];
const DURATIONS = [28, 44, 64];

export default function Skills() {
  return (
    <section id="stack" className="section container">
      <SectionHead index="02" label="stack" title="Meu sistema orbital">
        As tecnologias que giram em torno de tudo o que eu construo.
      </SectionHead>

      <div className="skills-layout">
        <div className="orbit-wrap" data-reveal>
          <div className="orbit">
            {orbit.map((ring, r) => (
              <div
                key={r}
                className={`orbit-ring ${r % 2 ? 'is-reverse' : ''}`}
                style={{ '--r': `${RADII[r]}px`, '--dur': `${DURATIONS[r]}s` }}
              >
                {ring.map((item, i) => (
                  <div key={item} className="orbit-item" style={{ '--angle': `${(360 / ring.length) * i + r * 20}deg` }}>
                    <div className="orbit-counter">
                      <span className="orbit-chip mono" data-hover>
                        {item}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
            <div className="orbit-core mono">
              <span className="grad-text">SS</span>
            </div>
          </div>
        </div>

        <div className="modules">
          {skillGroups.map((g, i) => (
            <article key={g.title} className="module" data-reveal style={{ '--delay': `${i * 80}ms` }}>
              <header className="module-head">
                <span className="mono module-code">{g.code}</span>
                <span className="mono module-status">● carregado</span>
              </header>
              <h3 className="module-title">{g.title}</h3>
              <ul className="module-items mono">
                {g.items.map((item) => (
                  <li key={item} className="tag">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
