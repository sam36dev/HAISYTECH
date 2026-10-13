// ============================================================
//  DADOS DO PORTFÓLIO
//  Tudo o que aparece no site sai daqui. Troque os exemplos
//  pelos seus projetos, links e textos reais.
// ============================================================

export const profile = {
  name: 'Haisy Tech',
  handle: 'haisytech',
  roles: ['Full-Stack Developer', 'Software Engineer', 'Arquiteto de soluções', 'Construtor de coisas'],
  tagline: 'Construo software que resolve problemas reais — do banco de dados ao último pixel.',
  about: [
    'Sou desenvolvedor e gosto de transformar ideias em produtos que funcionam de verdade.',
    'Trabalho de ponta a ponta: interfaces rápidas, APIs bem desenhadas e infraestrutura que não cai às 3h da manhã.',
  ],
  location: 'Brasil',
  available: true,
  mainStack: ['TypeScript', 'React', 'Node.js', 'SQL'],
  focus: ['performance', 'UX', 'código limpo'],
  // TROCAR pelos seus contatos reais
  email: 'contato@exemplo.dev',
  socials: [
    { label: 'GitHub', url: 'https://github.com/', handle: '@haisytech' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/', handle: 'company/haisytech' },
  ],
};

export const categories = {
  web: 'Web',
  api: 'API',
  mobile: 'Mobile',
  ia: 'IA',
  ferramenta: 'Ferramenta',
};

// Projetos de EXEMPLO — substitua pelos seus.
// status: 'produção' | 'em desenvolvimento' | 'arquivado'
// repo/demo: use '' quando não houver link.
export const projects = [
  {
    id: 'nebula',
    title: 'Nebula Commerce',
    category: 'web',
    year: 2025,
    status: 'produção',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe'],
    description: 'E-commerce headless com checkout em uma página e painel administrativo em tempo real.',
    highlights: [
      'Checkout em uma única etapa',
      'Painel com vendas atualizadas ao vivo',
      'Catálogo com busca instantânea',
    ],
    repo: '',
    demo: '',
  },
  {
    id: 'pulse',
    title: 'Pulse API',
    category: 'api',
    year: 2025,
    status: 'produção',
    stack: ['Node.js', 'Fastify', 'Redis', 'Docker'],
    description: 'API de alta performance com rate limiting, cache distribuído e documentação OpenAPI automática.',
    highlights: ['Cache em Redis com invalidação por evento', 'Rate limiting por chave de API', 'Docs OpenAPI geradas do código'],
    repo: '',
    demo: '',
  },
  {
    id: 'sentinel',
    title: 'Sentinel Monitor',
    category: 'web',
    year: 2024,
    status: 'produção',
    stack: ['React', 'WebSocket', 'Go', 'Grafana'],
    description: 'Dashboard de monitoramento de serviços com alertas e gráficos em tempo real via WebSocket.',
    highlights: ['Métricas em streaming', 'Alertas configuráveis', 'Histórico de incidentes'],
    repo: '',
    demo: '',
  },
  {
    id: 'lexicon',
    title: 'Lexicon AI',
    category: 'ia',
    year: 2025,
    status: 'em desenvolvimento',
    stack: ['Python', 'FastAPI', 'Embeddings', 'pgvector'],
    description: 'Busca semântica sobre documentos internos: pergunte em linguagem natural e receba a resposta com as fontes.',
    highlights: ['Indexação de PDFs e páginas', 'Respostas com citação das fontes', 'Busca híbrida (texto + vetor)'],
    repo: '',
    demo: '',
  },
  {
    id: 'orbit',
    title: 'Orbit Tasks',
    category: 'mobile',
    year: 2024,
    status: 'arquivado',
    stack: ['React Native', 'Expo', 'SQLite'],
    description: 'App de tarefas offline-first com sincronização quando a conexão volta.',
    highlights: ['Funciona 100% offline', 'Sincronização sem conflitos', 'Lembretes locais'],
    repo: '',
    demo: '',
  },
  {
    id: 'forge',
    title: 'Forge CLI',
    category: 'ferramenta',
    year: 2023,
    status: 'produção',
    stack: ['Node.js', 'TypeScript', 'Commander'],
    description: 'CLI que gera projetos prontos com lint, testes e CI configurados em um único comando.',
    highlights: ['Templates plugáveis', 'Setup de CI automático', 'Zero configuração inicial'],
    repo: '',
    demo: '',
  },
];

// Anéis do "sistema orbital" de habilidades (do centro para fora)
export const orbit = [
  ['React', 'Node', 'TS'],
  ['SQL', 'Docker', 'Git', 'Next'],
  ['Redis', 'Python', 'AWS', 'Go', 'Linux'],
];

export const skillGroups = [
  { title: 'Front-end', code: 'mod.ui', items: ['React', 'Next.js', 'TypeScript', 'CSS moderno', 'Acessibilidade'] },
  { title: 'Back-end', code: 'mod.core', items: ['Node.js', 'Fastify', 'REST', 'GraphQL', 'Python'] },
  { title: 'Dados', code: 'mod.data', items: ['PostgreSQL', 'Redis', 'MongoDB', 'Modelagem'] },
  { title: 'DevOps', code: 'mod.ops', items: ['Docker', 'CI/CD', 'Linux', 'AWS', 'Observabilidade'] },
];

// Linha do tempo em estilo "git log". EXEMPLOS — substitua pelos seus.
export const timeline = [
  { date: '2025', type: 'feat', title: 'Lançou a Nebula Commerce em produção', org: 'Projeto próprio', text: 'Arquitetura headless, checkout em uma etapa e painel em tempo real.' },
  { date: '2024', type: 'perf', title: 'Reduziu a latência da API em 60%', org: 'Empresa X', text: 'Cache distribuído, filas e revisão das queries mais pesadas.' },
  { date: '2023', type: 'feat', title: 'Criou a Forge CLI', org: 'Open source', text: 'Ferramenta interna que virou padrão para iniciar novos projetos.' },
  { date: '2022', type: 'init', title: 'Primeiro commit como dev profissional', org: 'Início da jornada', text: 'Onde tudo começou.' },
];
