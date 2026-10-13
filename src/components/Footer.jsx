import { profile } from '../data/profile.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner mono">
        <span>
          © {new Date().getFullYear()} {profile.name} · feito com código, café e React
        </span>
        <ul className="footer-links">
          {profile.socials.map((s) => (
            <li key={s.label}>
              <a href={s.url} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <span className="footer-egg" title="tente no teclado">
          ↑ ↑ ↓ ↓ ← → ← → B A
        </span>
      </div>
    </footer>
  );
}
