/**
 * COPY FINAL — BRIEFING-BUILD-CLAUDE-HOME-V1 §4.
 * Texto literal do briefing. Não parafrasear, não "melhorar".
 * Qualquer mudança aqui precisa de decisão do Bruno.
 */

// §9 soft open: href canônico do diagnóstico ainda não definido.
// Bruno: substituir por URL canônica (Calendly ou form Pipedrive).
export const CALENDLY = '#TODO-CALENDLY';

export const ROUTES = {
  home: '/',
  plataforma: '/plataforma',
  cases: '/cases',
  caseOddie: '/cases/oddie',
  migrar: '/migrar',
  agencias: '/para-agencias',
  developers: '/developers',
  faq: '#faq',
  oddieExterno: 'https://oddiesupply.com.br',
} as const;

// Bloco 0 — StickyNav
export const NAV_LINKS = [
  { label: 'Plataforma', href: ROUTES.plataforma },
  { label: 'Cases', href: ROUTES.cases },
  { label: 'Migrar', href: ROUTES.migrar },
  { label: 'Agências', href: ROUTES.agencias },
  { label: 'Developers', href: ROUTES.developers },
] as const;

export const NAV_CTA = 'Agendar diagnóstico';

// Bloco 1 — Hero
export const HERO = {
  kicker: 'Unbox AI · Brasil',
  h1Cat: 'AI Commerce',
  h1Line: 'Do briefing à loja no ar.',
  sub: 'Depois você edita falando. Checkout, Pix, assinatura e Pay nativos — sem template + pilha de plugin.',
  ctaPrimary: 'Agendar diagnóstico gratuito',
  ctaSecondary: 'Já tem loja? Migrar com risco baixo',
  microTrust: 'Diagnóstico gratuito · Sem compromisso · Suporte humano',
  proofBadge: 'Case #1',
  proofBrand: 'Oddie Supply',
  proofRest:
    ' — marca no ar com Unbox: brand world próprio, assinatura e Powered by Unbox.',
  frameLabel: 'Cliente · Oddie Supply',
  chromeUrl: 'oddiesupply.com.br',
  alt: 'Oddie Supply — loja no ar com Unbox AI',
} as const;

// Bloco 2 — DemoGallery
export const GALLERY = {
  eyebrow: 'Prova visual',
  h2a: 'Lojas reais. Universos diferentes.',
  h2b: 'Mesmo motor.',
  noteStrong: 'Não é tema com logo trocada.',
  noteRest:
    ' Cada storefront nasce do briefing — brand world, checkout e operação na mesma casa.',
} as const;

export type GalleryCard = {
  kind: 'client' | 'demo';
  tag: string;
  name: string;
  chromeUrl: string;
  alt: string;
  src: string;
  href?: string;
};

export const GALLERY_CARDS: GalleryCard[] = [
  {
    kind: 'client',
    tag: 'Cliente · case oficial',
    name: 'Oddie Supply',
    chromeUrl: 'oddiesupply.com.br',
    alt: 'Oddie Supply',
    src: '/img/home-ai/oddie-hero.png',
    href: ROUTES.oddieExterno,
  },
  {
    kind: 'demo',
    tag: 'Demo · criado com Unbox AI',
    name: 'Punch',
    chromeUrl: 'punch · Unbox AI',
    alt: 'Punch — demo criado com Unbox AI',
    src: '/img/home-ai/punch-hero.png',
  },
  {
    kind: 'demo',
    tag: 'Demo · criado com Unbox AI',
    name: 'OTO',
    chromeUrl: 'oto · Unbox AI',
    alt: 'OTO — demo criado com Unbox AI',
    src: '/img/home-ai/oto-hero.png',
  },
  {
    kind: 'demo',
    tag: 'Demo · criado com Unbox AI',
    name: 'SEDE',
    chromeUrl: 'sede · Unbox AI',
    alt: 'SEDE — demo criado com Unbox AI',
    src: '/img/home-ai/sede-hero.png',
  },
];

// Bloco 2.5 — GestoEditor (P1-01)
export const GESTO = {
  eyebrow: 'Depois da loja no ar',
  h2: 'Edita falando. Confirma. Publica.',
  lead: 'A AI prepara. Você aprova. Nada sobe no escuro.',
  micro: 'Fala → confirma → publica',
} as const;

// Bloco 3 — EnemyStrip
export const ENEMY = {
  eyebrow: 'O problema',
  h2a: 'Sem template.',
  h2b: 'Sem pilha de plugin.',
  lead: 'Apps que não conversam. Assinatura remendada. Checkout que sangra conversão. A Unbox coloca checkout, Pay, assinatura e editor na mesma casa.',
  bullets: [
    {
      icon: '×' as const,
      title: 'Template genérico + apps soltos',
      body: 'A marca parece igual a todas as outras. Cada plugin resolve um pedaço — e ninguém resolve o todo.',
    },
    {
      icon: '×' as const,
      title: 'Assinatura e Pay como gambiarra',
      body: 'Recorrência colada depois. Antifraude e Pix como afterthought. O D2C brasileiro merece trilhos nativos.',
    },
    {
      icon: '✓' as const,
      title: 'Unbox: tudo na mesma casa',
      body: 'Do briefing à loja no ar. Depois o lojista edita falando — e confirma antes de publicar.',
    },
  ],
} as const;

// Bloco 4 — RailsGrid
// `n` é o índice do card (①..④ no briefing). Renderizado como numeral simples
// porque o glifo cercado cai em fonte de fallback e fica ilegível no círculo.
export const RAILS = {
  eyebrow: 'Plataforma',
  h2: 'Trilhos feitos para o D2C brasileiro.',
  lead: 'Checkout, Pay, assinatura e editor — nativos. Sem inventar número. Sem empilhar chip de marketing.',
  cards: [
    {
      n: '1',
      title: 'Checkout TURBO',
      body: 'Três etapas. Sem redirect. Pix e cartão no fluxo — pensado para converter no Brasil, não para parecer checkout americano.',
      micro: 'Nativo · sem fricção',
    },
    {
      n: '2',
      title: 'Unbox Pay',
      body: 'Aprovação e antifraude com trilhos brasileiros. Menos surpresa no fechamento. Mais previsibilidade no caixa.',
      micro: 'Pay da casa',
    },
    {
      n: '3',
      title: 'Assinatura nativa',
      body: 'Pause, skip, upsell — no produto, não em plugin. Recorrência que o lojista entende e o cliente usa.',
      micro: 'Recorrência de verdade',
    },
    {
      n: '4',
      title: 'Editor que fala',
      body: 'Você descreve o que quer. A AI prepara. Você confirma — e só então publica. Medo de AI solta? Resolvido.',
      micro: 'Fala → confirma → publica',
      anchor: '#gesto-editor',
    },
  ],
} as const;

// Bloco 5 — OddieCase
export const ODDIE = {
  badge: 'Case oficial #1 · Cliente',
  h2: 'Oddie Supply',
  lead: 'Marca D2C de energia natural no ar com Unbox — brand world próprio, não template com logo trocada.',
  bullets: [
    'Brand world próprio — visual, voz e produto no mesmo território.',
    'Assinatura e operação no dia a dia — sem remendo de plugin.',
    'Powered by Unbox — do storefront ao checkout na mesma casa.',
  ],
  ctaPrimary: 'Ver case completo',
  linkExterno: 'oddiesupply.com.br ↗',
  chromeUrl: 'https://oddiesupply.com.br',
} as const;

// Bloco 6 — Paths
export const PATHS = {
  eyebrow: 'Por onde começar',
  h2: 'Três caminhos. Um diagnóstico.',
  lead: 'Escolha o seu momento. A conversa começa no mesmo lugar — sem empilhar oferta.',
  cards: [
    {
      label: '01 · CRIAR',
      h3: 'Quero criar com AI',
      body: 'Do briefing à loja no ar. A gente mostra o que a Unbox faz na sua marca — e o que muda com AI Commerce.',
      linkLabel: 'Agendar diagnóstico →',
      href: CALENDLY,
    },
    {
      label: '02 · MIGRAR',
      h3: 'Quero migrar',
      body: 'Já tem loja? Migração acompanhada, risco baixo, SEO preservado. Sem abrir com “AI faz a loja”.',
      linkLabel: 'Conhecer o path Migrar →',
      href: ROUTES.migrar,
    },
    {
      label: '03 · PARCEIRO',
      h3: 'Sou agência / dev',
      body: 'Co-build com gate transparente. Ou stack técnico em Developers — docs e o motor por baixo.',
      linkLabel: 'Para agências · Developers →',
      href: ROUTES.agencias,
      hrefSecondary: ROUTES.developers,
    },
  ],
} as const;

// Bloco 7 — TrustLite
export const TRUST_LITE =
  'Plataforma brasileira de AI Commerce. Prova em loja real — Oddie Supply — e demos rotuladas. Press e logos de aceleração entram quando a fonte estiver validada.';

// Bloco 8 — FAQ + FinalCTA
export const FAQ_HEAD = { eyebrow: 'FAQ', h2: 'Perguntas que importam.' } as const;

export const FAQ_ITEMS = [
  {
    q: 'A AI mexe na minha loja sozinha?',
    a: 'Não. Ela prepara. Você confirma antes de publicar. O editor existe para acelerar — não para publicar no escuro.',
  },
  {
    q: 'Preciso de time técnico?',
    a: 'No dia a dia, chat e painel bastam. Se sua equipe for técnica, o path Developers existe — mas não é obrigatório para operar.',
  },
  {
    q: 'E o SEO se eu migrar?',
    a: 'Redirects e acompanhamento fazem parte do path Migrar. Detalhe e passos em /migrar — risco baixo, equipe junto.',
  },
  {
    q: 'Já tenho loja em outra plataforma?',
    a: 'Sim. Migrar com risco baixo é um caminho claro na Unbox — diagnóstico com intenção de migração, sem manifesto de AI no hero.',
  },
  {
    q: 'Quanto custa?',
    a: 'Via diagnóstico. Em cerca de 30 minutos entendemos o momento da marca e o que faz sentido — sem grade pública conflitante na home.',
  },
];

export const FINAL_CTA = {
  h2: 'Agende um diagnóstico. A gente mostra a Unbox na sua operação.',
  sub: 'Em ~30 min, entendemos o momento da marca e o que muda com AI Commerce — sem compromisso.',
  button: 'Agendar diagnóstico gratuito',
  micro: 'Diagnóstico gratuito · Sem compromisso · Suporte humano',
} as const;

// Footer
export const FOOTER = {
  tagline: 'AI Commerce no Brasil. Do briefing à loja no ar.',
  links: [
    { label: 'Plataforma', href: ROUTES.plataforma },
    { label: 'Cases', href: ROUTES.cases },
    { label: 'Migrar', href: ROUTES.migrar },
    { label: 'Agências', href: ROUTES.agencias },
    { label: 'Developers', href: ROUTES.developers },
    { label: 'FAQ', href: ROUTES.faq },
  ],
} as const;
