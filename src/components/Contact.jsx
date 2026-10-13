import { useState } from 'react';
import SectionHead from './SectionHead.jsx';
import { profile } from '../data/profile.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [form, setForm] = useState({ nome: '', email: '', mensagem: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (status !== 'sending') setStatus('idle');
  };

  const submit = (e) => {
    e.preventDefault();
    if (!form.nome.trim() || !form.mensagem.trim()) return fail('preencha nome e mensagem');
    if (!EMAIL_RE.test(form.email)) return fail('e-mail inválido');
    setStatus('sending');
    // Ainda não há back-end: simulamos o envio. Na próxima fase isso vira um fetch('/api/contact').
    setTimeout(() => setStatus('sent'), 1400);
  };

  const fail = (msg) => {
    setError(msg);
    setStatus('error');
  };

  const entries = Object.entries(form);

  return (
    <section id="contato" className="section container">
      <SectionHead index="05" label="contato" title="Bora construir algo?">
        Tem um projeto, uma vaga ou uma ideia maluca? Manda a request.
      </SectionHead>

      <div className="contact-layout">
        <form className="contact-form" onSubmit={submit} noValidate data-reveal>
          <Field label="nome" id="c-nome" value={form.nome} onChange={update('nome')} placeholder="Seu nome" />
          <Field
            label="email"
            id="c-email"
            type="email"
            value={form.email}
            onChange={update('email')}
            placeholder="voce@empresa.com"
          />
          <Field
            label="mensagem"
            id="c-msg"
            textarea
            value={form.mensagem}
            onChange={update('mensagem')}
            placeholder="Conta aí o que você tem em mente..."
          />
          <button className="btn btn-primary btn-send" disabled={status === 'sending'}>
            {status === 'sending' ? 'enviando...' : 'enviar request'} <span aria-hidden="true">⏎</span>
          </button>
          <p className="contact-alt mono">
            ou direto no e-mail: <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </p>
        </form>

        <div className="request-card" data-reveal aria-live="polite">
          <div className="window-bar">
            <span className="dot dot-r" />
            <span className="dot dot-y" />
            <span className="dot dot-g" />
            <span className="window-title mono">request.http</span>
          </div>
          <pre className="code mono request-code">
            <span className="tk-kw">POST</span> <span className="tk-var">/api/contact</span>{' '}
            <span className="tk-com">HTTP/1.1</span>
            {'\n'}
            <span className="tk-key">Content-Type</span>: <span className="tk-str">application/json</span>
            {'\n\n'}
            <span className="tk-pun">{'{'}</span>
            {'\n'}
            {entries.map(([k, v], i) => (
              <span key={k}>
                {'  '}
                <span className="tk-key">"{k}"</span>
                <span className="tk-pun">: </span>
                <span className="tk-str">{JSON.stringify(v)}</span>
                {i < entries.length - 1 ? <span className="tk-pun">,</span> : null}
                {'\n'}
              </span>
            ))}
            <span className="tk-pun">{'}'}</span>
          </pre>
          <div className={`response mono resp-${status}`}>
            {status === 'idle' && <span className="t-dim">// aguardando envio...</span>}
            {status === 'sending' && <span className="t-dim">⏳ enviando request...</span>}
            {status === 'error' && <span className="t-err">400 Bad Request — {error}</span>}
            {status === 'sent' && (
              <span>
                <span className="t-lime">201 Created</span> — mensagem recebida!{' '}
                <span className="t-dim">(simulação: o back-end chega na próxima fase)</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, id, textarea, ...props }) {
  const Tag = textarea ? 'textarea' : 'input';
  return (
    <div className="field">
      <label htmlFor={id} className="mono">
        <span className="t-dim">const</span> {label} <span className="t-dim">=</span>
      </label>
      <Tag id={id} name={label} rows={textarea ? 5 : undefined} {...props} />
    </div>
  );
}
