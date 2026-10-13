# SS-OS — Portfólio da Haisy Tech

Front-end do portfólio, feito com **React + Vite** (Node).

## Rodar

```bash
npm install     # só na primeira vez
npm run dev     # abre em http://localhost:5173
```

`npm run build` gera a versão final em `dist/`, e `npm run preview` serve essa versão.

## Onde mexer

| O quê | Onde |
|---|---|
| Nome, cargos, e-mail, redes, **projetos**, stack, jornada | `src/data/profile.js` |
| Cores e visual | `src/styles/global.css` (variáveis no `:root`) |
| Comandos do terminal | `src/components/Terminal.jsx` |
| Ações da paleta `Ctrl+K` | `src/components/CommandPalette.jsx` |

## Recursos

- Boot estilo sistema operacional (roda uma vez por sessão; qualquer tecla pula)
- Rede neural de partículas que reage ao mouse
- Nome "decodificado" + efeito glitch
- Projetos com filtro, tilt 3D, spotlight e modal de detalhes
- Stack em sistema orbital
- Terminal interativo (`help`, `projects`, `open <id>`, `sudo hire haisy`...)
- Jornada em estilo `git log`
- Formulário de contato com preview da request HTTP ao vivo (envio **simulado**: ainda não há back-end)
- Paleta de comandos `Ctrl+K` / `⌘K`, barra de status estilo VS Code
- Easter egg: código Konami (↑ ↑ ↓ ↓ ← → ← → B A)
- Respeita `prefers-reduced-motion`; cursor customizado só com mouse
