import SectionHead from './SectionHead.jsx';
import { timeline } from '../data/profile.js';
import { shortHash } from '../lib/events.js';

export default function Timeline() {
  return (
    <section id="jornada" className="section container">
      <SectionHead index="04" label="jornada" title="git log --graph">
        Minha trajetória, commit por commit.
      </SectionHead>

      <ol className="gitlog">
        {timeline.map((t, i) => (
          <li key={t.title} className="commit" data-reveal style={{ '--delay': `${i * 90}ms` }}>
            <span className="commit-node" aria-hidden="true" />
            <div className="commit-meta mono">
              <span className="commit-hash">{shortHash(t.title)}</span>
              {i === 0 && <span className="commit-head">HEAD → main</span>}
              <span className="commit-date">{t.date}</span>
            </div>
            <h3 className="commit-title">
              <span className={`commit-type mono type-${t.type}`}>{t.type}:</span> {t.title}
            </h3>
            <p className="commit-org mono">{t.org}</p>
            <p className="commit-text">{t.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
