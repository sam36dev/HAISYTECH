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
  email: 'samueldesenvolvedor36@gmail.com',
  // chave do Web3Forms (web3forms.com), lida do .env / variáveis da Vercel
  // pega só o UUID, mesmo que a variável tenha sido colada com nome, espaços ou aspas
  formKey: (import.meta.env.WEB3FORMS_API_KEY || '').match(/[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}/i)?.[0] || '',
  socials: [
    { label: 'GitHub', url: 'https://github.com/sam36dev', handle: '@sam36dev' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/', handle: 'company/haisytech' },
  ],
};

export const categories = {
  web: 'Web',
  jogo: 'Jogo',
  api: 'API',
  mobile: 'Mobile',
  ia: 'IA',
  ferramenta: 'Ferramenta',
};

// Serviços oferecidos. example: id de um projeto abaixo que serve de exemplo.
export const services = [
  {
    id: 'api',
    icon: '{ }',
    accent: 'var(--cyan)',
    title: 'Construção de APIs',
    description: 'APIs rápidas e seguras para conectar seu app, site ou sistema a qualquer coisa.',
    items: ['REST com autenticação', 'Integração com pagamentos e serviços', 'Banco de dados bem modelado', 'Documentação pronta'],
  },
  {
    id: 'sites',
    icon: '</>',
    accent: 'var(--violet)',
    title: 'Sites',
    description: 'Sites modernos, rápidos e que funcionam bem no celular, do portfólio à loja virtual.',
    items: ['Landing pages e institucionais', 'Lojas virtuais', 'Login com Google e área do cliente', 'Hospedagem e domínio configurados'],
    example: 'arpus',
  },
  {
    id: 'sistemas',
    icon: '[≡]',
    accent: 'var(--lime)',
    title: 'Sistemas',
    description: 'Sistemas sob medida para organizar o seu negócio, com painel administrativo e regras do seu jeito.',
    items: ['Painéis administrativos', 'Multiempresa e multiusuário', 'Rankings, relatórios e automações', 'Notificações e tarefas agendadas'],
    example: 'real-teens',
  },
  {
    id: 'ia',
    icon: '✦',
    accent: 'var(--amber)',
    title: 'Inteligência Artificial',
    description: 'IA aplicada ao seu dia a dia: atendimento, automação e respostas a partir dos seus dados.',
    items: ['Chatbots e assistentes', 'Automação de tarefas repetitivas', 'Busca inteligente em documentos', 'Integração com ChatGPT, Claude e afins'],
  },
];

// status: 'produção' | 'em desenvolvimento' | 'arquivado'
// repo/demo: use '' quando não houver link. repoPrivate: true mostra "solicitar acesso".
export const projects = [
  {
    id: 'real-teens',
    title: 'The Real Teens',
    category: 'jogo',
    year: 2026,
    status: 'produção',
    stack: ['Next.js', 'React', 'Supabase', 'PostgreSQL', 'Web Push', 'Vercel Cron'],
    description:
      'Jogo de batalha de cartas bíblico feito para jovens da igreja: para continuar jogando, é preciso ler a Bíblia e responder quizzes.',
    highlights: [
      'Motor de batalha por turnos com classes, raridades e durabilidade de cartas',
      'Desafios de leitura bíblica diária que liberam pacotes, troféus e cartas especiais',
      'Multi-igreja: cada igreja tem seu subdomínio e ranking isolados',
      'Ranking, missões diárias, tribos, bots e resets automáticos via cron',
    ],
    repo: 'https://github.com/sam36dev/The_Real_Teens',
    repoPrivate: true,
    demo: 'https://www.thetruebattle.com/dashboard',
  },
  {
    id: 'arpus',
    title: 'Arpus JDM',
    category: 'web',
    year: 2026,
    status: 'produção',
    stack: ['React', 'Vite', 'React Router', 'Google OAuth', 'CSS Modules'],
    description:
      'Loja online de colecionáveis JDM: miniaturas em escala, acessórios e pacotes de cartas com mecânica de raridade.',
    highlights: [
      'Abertura de pacotes de cartas com raridades e álbum de coleção',
      'Login com Google, carrinho, cupons e pagamento via PIX',
      'Painel administrativo com produtos, coleções, clientes, chamados e ranking',
    ],
    repo: 'https://github.com/sam36dev/Arpus_JDM',
    repoPrivate: true,
    demo: 'https://www.arpusjdm.com/',
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
