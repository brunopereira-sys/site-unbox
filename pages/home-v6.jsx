/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import { URLS } from '../lib/config'

/* ─────────────────────────────────────────────────────────────
   Unbox · Home v6 — "A plataforma completa. AI em cada parte."
   Estrutura de tour de plataforma (ref. Shopify): hero → canais →
   um bloco por produto, cada um com "AI em destaque" → camada
   Unbox AI (CLI + MCP + agentes) → porte → integrações → prova →
   cases → FAQ → CTA. Base visual clara da v2/v5. Escopo #hv6 / h6-*.
   ───────────────────────────────────────────────────────────── */

const V = '?v=r26'

const CHANNELS = [
  { k: 'loja', icon: 'layout', t: 'Loja virtual', d: 'Sua loja própria: Next.js, mobile-first e otimizada para conversão.' },
  { k: 'ig', icon: 'instagram', t: 'Sacolinha do Instagram', d: 'Catálogo sincronizado com o Instagram Shopping.' },
  { k: 'wa', icon: 'whatsapp', t: 'WhatsApp', d: 'Botão no site e link direto do cliente na gestão de pedidos.' },
  { k: 'gs', icon: 'google', t: 'Google Shopping', d: 'Seus produtos na maior vitrine virtual do mundo.' },
  { k: 'link', icon: 'link', t: 'Link PagEnvie', d: 'Link de pagamento com logística integrada. Venda sem loja.' },
  { k: 'meta', icon: 'meta', t: 'Facebook & Meta', d: 'Pixel, Business Manager e catálogo instalados na loja.' },
]

const SHOW = [
  { key: 'loja', label: 'Loja', icon: 'layout', tint: 'sky', title: 'Sua loja, do seu jeito. Sem template.', body: 'Layouts 100% customizáveis, mobile-first, com SEO e performance de ponta. Crie do zero pelo CLI, importe do Figma ou migre de onde estiver.', ai: 'Gerada pelo CLI e revisada por agentes de branding, QA visual, SEO e AEO', img: '/img/loja-olea.png', alt: 'Loja Olea rodando na Unbox', href: '#loja' },
  { key: 'checkout', label: 'Checkout', icon: 'bolt', tint: 'lime', title: 'Checkout em modo TURBO.', body: '3 etapas, sem redirecionamento, sem fricção. Pix, cartão em até 12× e boleto no mesmo fluxo. 4× mais conversão e +98% de aprovação.', ai: 'Anti-Fraude IA+ analisando cada pedido em tempo real', img: '/img/checkout-dash.png', alt: 'Checkout TURBO da Unbox', href: '#checkout' },
  { key: 'assinatura', label: 'Assinatura', icon: 'repeat', tint: 'lavender', title: 'Recorrência que nasce no carrinho.', body: 'Assinatura 100% nativa, da página de produto ao checkout. Múltiplas frequências, gestão de falhas automática e cohort de LTV.', ai: 'Planos e regras de assinatura criados por texto, via MCP', img: '/img/assinatura2.png', alt: 'Assinatura nativa no carrinho', href: '#assinatura' },
  { key: 'pay', label: 'Unbox Pay', icon: 'card', tint: 'mint', title: 'Pagamento nativo, com as melhores taxas.', body: 'Gateway próprio com 98% de aprovação, multi provedores e retentativa automática. A partir de 2,99% no cartão e 1% no Pix, com saque sem custo.', ai: 'Gateway turbinado por AI para aprovar mais e custar menos', mock: 'pay', href: '#pay' },
  { key: 'ai', label: 'Unbox AI', icon: 'sparkle', tint: 'lavender', title: 'A AI que cria, opera e otimiza a loja.', body: 'O CLI gera a loja do zero, do Figma ou migrando. O MCP opera catálogo, pedidos e campanhas por texto. Agentes cuidam de branding, CRO, SEO e AEO.', ai: 'Funciona com Claude, ChatGPT, Cursor e qualquer AI com MCP', mock: 'ai', href: '#unbox-ai' },
]

const GROUPS = [
  { id: 'loja', tint: 'sky', icon: 'layout', tab: 'Loja', eye: 'SUA LOJA',
    title: 'Uma loja 100% sua. Gerada e revisada por AI.',
    body: 'Layouts totalmente customizáveis, domínio e SSL grátis, SEO e performance de verdade. Crie do zero pelo CLI, importe do Figma ou migre de onde estiver — e mereça o clique com promoções que você monta em minutos.',
    subs: [
      { icon: 'layout', t: 'Loja virtual', feats: ['Layouts 100% customizáveis', 'Domínio e SSL grátis', 'Produtos e visitas ilimitados'] },
      { icon: 'tag', t: 'Promoções e campanhas', feats: ['Cupons e vouchers', 'Bundles & Combos', 'Frete grátis flexível'] },
    ],
    ai: { h: 'Gerada pelo CLI, revisada por agentes', d: 'Branding, QA Visual, SEO e AEO rodam dentro do projeto antes de publicar. E a campanha da semana sai de uma frase: você pede, a AI prepara, você confirma.' },
    link: { href: '/recursos', t: 'Ver recursos da loja' }, visual: 'store' },

  { id: 'checkout', tint: 'lime', icon: 'bolt', tab: 'Conversão', eye: 'SUA CONVERSÃO',
    title: 'O checkout que mais converte no Brasil.',
    body: 'Nativo, transparente e em 3 etapas, sem redirecionamento — com o pagamento na mesma casa. 4× mais conversão, +98% de aprovação e as taxas mais competitivas do mercado.',
    subs: [
      { icon: 'bolt', t: 'Checkout TURBO', feats: ['3 etapas, sem redirect', 'Order Bump e Upsell', 'Pix, cartão em 12× e boleto'] },
      { icon: 'card', t: 'Unbox Pay', feats: ['2,99% no cartão · 1% no Pix', 'Multi provedores + retentativa', 'Saque ágil e sem custo'] },
    ],
    ai: { h: 'Anti-Fraude IA+ em cada pedido', d: 'Análise e cruzamento de dados em tempo real, com retentativa inteligente entre provedores. Aprova mais, bloqueia fraude e protege o seu caixa.' },
    link: { href: '/checkout', t: 'Conhecer o Checkout TURBO' }, visual: 'checkout' },

  { id: 'recorrencia', tint: 'lavender', icon: 'repeat', tab: 'Recorrência', eye: 'SUA RECORRÊNCIA',
    title: 'Vender de novo para quem já comprou.',
    body: 'Assinatura que nasce no próprio carrinho e uma rede de creators ligada ao checkout. Duas formas de transformar a primeira venda em receita que volta todo mês.',
    subs: [
      { icon: 'repeat', t: 'Assinatura nativa', feats: ['Assina direto no carrinho', 'Múltiplas frequências', 'Gestão de falhas automática'] },
      { icon: 'users', t: 'Creators', feats: ['Link e cupom por creator', 'Pague por venda', 'Automação de pagamento'] },
    ],
    ai: { h: 'Planos e resultados por texto', d: 'Crie regras de assinatura pela sua AI, via MCP — ela prepara, você confirma. E pergunte quem vendeu mais no mês: ela lê os pedidos e responde.' },
    link: { href: '/assinatura', t: 'Conhecer a Assinatura' }, visual: 'sub' },

  { id: 'operacao', tint: 'mint', icon: 'truck', tab: 'Operação', eye: 'SUA OPERAÇÃO',
    title: 'Pedidos, estoque, frete e dados no mesmo painel.',
    body: 'Frete calculado dentro do checkout, etiquetas, rastreio e ERP integrado. E os números que importam — recompra, LTV, origem da receita — sem planilha e sem BI externo.',
    subs: [
      { icon: 'truck', t: 'Envios e ERP', feats: ['Frete integrado ao checkout', 'Etiquetas e rastreio', 'ERP Bling'] },
      { icon: 'chart', t: 'Dados e insights', feats: ['Recompra e LTV', 'Carrinhos abandonados', 'Origem da receita'] },
    ],
    ai: { h: 'Operação e decisão por texto', d: 'Atualize catálogo, estoque e preços pela sua AI — toda escrita passa por preparar e confirmar. E pergunte o que caiu na semana: ela lê os dados e sugere o próximo passo.' },
    link: { href: '/recursos', t: 'Ver operação e dados' }, visual: 'ops' },
]

const AI_PILLARS = [
  { k: 'cli', icon: 'terminal', t: 'Unbox CLI', h: 'Cria a loja', d: 'Do zero, do Figma ou migrando de qualquer plataforma. Um comando gera o storefront completo e abre a sua AI no briefing de marca.', href: '/ai-unbox', l: 'Entrar na lista' },
  { k: 'mcp', icon: 'bolt', t: 'Unbox MCP', h: 'Opera a loja', d: 'Catálogo, pedidos, campanhas e assinaturas por texto, na AI que você já usa. Leituras diretas; escritas em duas etapas.', href: '/ai', l: 'Ver demo do MCP' },
  { k: 'agents', icon: 'sparkle', t: 'Agentes', h: 'Otimizam a loja', d: 'Branding, QA Visual, CRO, SEO, AEO e Deploy embarcados no projeto. Rodam por você, com o seu julgamento no comando.', href: '/ai-unbox', l: 'Conhecer os agentes' },
]
const AGENTS = ['Branding & Identidade', 'QA Visual', 'CRO', 'SEO avançado', 'AEO', 'Deploy', 'Catálogo', 'Checkout', 'Assinatura', 'Promoções']

const SIZES = [
  { tint: 'sky', eye: 'MARCAS NASCENDO', t: 'Do zero ao ar em dias.', d: 'Crie a loja com a sua AI, conecte Instagram e WhatsApp e venda com o Checkout TURBO desde o primeiro pedido.', href: '/ai-unbox', l: 'Criar minha loja' },
  { tint: 'lavender', eye: 'MARCAS ESCALANDO', t: 'Assinatura e creators.', d: 'Recorrência nativa e programa de creators integrado ao checkout, para vender de novo a quem já comprou.', href: '/assinatura', l: 'Ver Assinatura' },
  { tint: 'mint', eye: 'INDÚSTRIAS', t: 'Crédito produtivo e canal D2C.', d: 'A indústria recebe à vista e a marca paga conforme vende. Mais uma loja D2C para vender direto ao consumidor.', href: '/industrias', l: 'Ver indústrias' },
]

/* Comparativo. Legenda: 'y' nativo · 'p' via app/módulo/parceiro · 'n' não oferece.
   Toda célula de concorrente precisa de validação do time antes de ir ao ar. */
const CMP_COLS = ['Unbox', 'Shopify', 'Nuvemshop', 'Wake', 'VTEX']
const CMP_ROWS = [
  { t: 'Loja criada por AI', d: 'Do zero por briefing, importando do Figma ou migrando de outra plataforma.', v: ['y', 'n', 'n', 'n', 'n'] },
  { t: 'Operar por texto na sua AI', d: 'Servidor MCP aberto: catálogo, pedidos e campanhas pelo Claude, ChatGPT ou Cursor.', v: ['y', 'p', 'n', 'n', 'n'], note: 'Shopify tem assistente próprio no admin' },
  { t: 'Agentes de CRO, SEO e AEO', d: 'Embarcados no projeto da loja, rodam quando você quiser.', v: ['y', 'n', 'n', 'n', 'n'] },
  { t: 'Assinatura e recorrência', d: 'Do produto ao checkout, sem depender de app de terceiro.', v: ['y', 'p', 'p', 'p', 'p'] },
  { t: 'Checkout e gateway na mesma casa', d: 'Checkout de 3 etapas e pagamento próprio, sem integração externa.', v: ['y', 'y', 'y', 'p', 'p'] },
  { t: 'Cobrança e suporte em real', d: 'Mensalidade em BRL e equipe brasileira acompanhando a migração.', v: ['y', 'n', 'y', 'y', 'y'], note: 'Shopify precifica em US$ no Brasil' },
]

const INTEGRATIONS = [
  { g: 'Canais', items: [
    { n: 'Instagram Shopping', k: 'instagram' }, { n: 'Facebook & Meta', k: 'meta' },
    { n: 'WhatsApp', k: 'whatsapp' }, { n: 'Google Shopping', k: 'google' }] },
  { g: 'Operação', items: [
    { n: 'Bling', k: 'bling' }, { n: 'Correios', k: 'correios' },
    { n: 'Total Express', k: 'totalexpress' }, { n: 'Google Analytics', k: 'ga' },
    { n: 'Tag Manager', k: 'gtm' }] },
  { g: 'AI (via MCP)', items: [
    { n: 'Claude', k: 'claude' }, { n: 'ChatGPT', k: 'openai' }, { n: 'Cursor', k: 'cursor' },
    { n: 'Claude Code', k: 'claude' }, { n: 'Figma MCP', k: 'figma' }] },
]

const CASES = [
  { name: 'Oddie Supply', seg: 'Alimentos funcionais', logo: '/img/cases/logo-oddie.webp', before: '/img/cases/case-oddie-antes.jpg', after: '/img/cases/case-oddie-depois.jpg', note: 'Energia e hidratação em pó. A loja inteira foi remontada em torno de um produto só e de uma jornada de assinatura.' },
  { name: 'Pamela Concept', seg: 'Cuidado capilar', logo: '/img/cases/logo-pamela.png', dark: true, before: '/img/cases/case-pamela-antes.jpg', after: '/img/cases/case-pamela-depois.jpg', note: 'Cada problema (queda, caspa, brilho) virou um caminho claro dentro da loja, em vez de uma prateleira de frascos.' },
  { name: 'Badia', seg: 'Temperos e especiarias', logo: '/img/cases/logo-badia.svg', before: '/img/cases/case-badia-antes.jpg', after: '/img/cases/case-badia-depois.jpg', note: 'Catálogo enorme. O desafio foi fazer centenas de SKUs virarem uma jornada simples de comprar.' },
]

const METRICS = [
  { num: 15, prefix: '+', suffix: ' mil', label: 'lojas já cadastradas na Unbox' },
  { num: 5.9, prefix: '+', suffix: '×', label: 'crescimento médio de vendas', decimals: 1 },
  { num: 4, prefix: '', suffix: '×', label: 'mais conversão com o Checkout TURBO' },
  { num: 98, prefix: '', suffix: '%', label: 'de aprovação no Unbox Pay' },
]

const BRANDS = [
  { name: 'Badia', seg: 'Alimentos', logo: '/img/badia-logo.svg' }, { name: 'Sunrize', seg: 'Wellness', logo: '/img/sunrize-logo.png' },
  { name: 'Wish', seg: 'Doces', logo: '/img/wish-logo.png' }, { name: 'Pudim Beauty', seg: 'Cosméticos', logo: '/img/pudim-logo.png' },
  { name: 'Oddie', seg: 'Funcionais' }, { name: 'Pamela Concept', seg: 'Capilar' }, { name: 'Bhava', seg: 'Wellness' }, { name: 'Olea', seg: 'Alimentos' },
  { name: 'Popai', seg: 'Wellness' }, { name: 'Vista Perê', seg: 'Moda' }, { name: 'diCapri', seg: 'Bebidas' }, { name: 'Glow', seg: 'Colágeno' },
]

const FAQ = [
  { q: 'A Unbox substitui a minha plataforma inteira?', a: 'Sim. Loja, checkout, pagamento, assinatura, promoções, creators, envios e dados são nativos e ficam no mesmo painel. Na migração, a AI extrai catálogo, coleções, tema e conteúdo do site atual e remonta tudo na Unbox preservando URLs. Nossa equipe acompanha com você.' },
  { q: 'Preciso saber programar para usar a AI?', a: 'Não. Você responde um briefing em português (marca, cores, objetivo) e a AI gera e personaliza a loja. Depois, opera por texto na AI que já usa. A parte técnica é resolvida pelos agentes embarcados no projeto.' },
  { q: 'A AI vai mexer na minha loja sem eu saber?', a: 'Não. Leituras são diretas; qualquer escrita (preço, cupom, campanha, regra de assinatura) passa por duas etapas: preparar e confirmar. Tudo fica registrado.' },
  { q: 'Quais AIs funcionam com a Unbox?', a: 'Claude, ChatGPT, Cursor, Claude Code e qualquer cliente com suporte a MCP. O servidor MCP da Unbox conecta a AI ao catálogo, pedidos, campanhas e assinaturas da sua loja.' },
  { q: 'Existe limite de produtos ou de visitas?', a: 'Não. Nenhum plano cobra a mais por acessos ou por catálogo: produtos e visitas ilimitados, com estabilidade de 1 a 1 milhão de visitantes.' },
]

function Icon({ name, size = 18 }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }
  switch (name) {
    case 'layout': return <svg {...p}><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M3 9h18M9 21V9" /></svg>
    case 'bolt': return <svg {...p}><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" /></svg>
    case 'card': return <svg {...p}><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M3 10h18M7 15h3" /></svg>
    case 'sparkle': return <svg {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" /></svg>
    case 'arrow': return <svg {...p}><path d="M7 17 17 7M8 7h9v9" /></svg>
    case 'check': return <svg {...p}><path d="m5 12 4 4L19 6" /></svg>
    case 'plus': return <svg {...p}><path d="M12 5v14M5 12h14" /></svg>
    case 'terminal': return <svg {...p}><path d="m5 7 5 5-5 5M12 17h7" /></svg>
    case 'repeat': return <svg {...p}><path d="M17 2v6h-6M7 22v-6h6" /><path d="M20 12a8 8 0 0 0-14-5M4 12a8 8 0 0 0 14 5" /></svg>
    case 'tag': return <svg {...p}><path d="M3 12V4h8l9 9-8 8-9-9Z" /><circle cx="7.5" cy="8.5" r="1.3" /></svg>
    case 'users': return <svg {...p}><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M21.5 20a6.5 6.5 0 0 0-4.5-6.2" /></svg>
    case 'truck': return <svg {...p}><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7z" /><circle cx="7" cy="18" r="1.8" /><circle cx="17" cy="18" r="1.8" /></svg>
    case 'chart': return <svg {...p}><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></svg>
    case 'instagram': return <svg {...p}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.3" cy="6.7" r=".9" fill="currentColor" /></svg>
    case 'whatsapp': return <svg {...p}><path d="M4 20l1.3-3.8A8.5 8.5 0 1 1 8.4 19L4 20Z" /><path d="M9 9.5c.3 2.5 2.7 4.9 5.2 5.2l1.3-1.3-2-.8-.8.8c-1-.4-1.9-1.3-2.3-2.3l.8-.8-.8-2L9 9.5Z" /></svg>
    case 'google': return <svg {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5M11 8v6M8 11h6" /></svg>
    case 'link': return <svg {...p}><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" /><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" /></svg>
    case 'meta': return <svg {...p}><path d="M3 15c0-4 2-9 4.5-9S11 12 12 12s2-6 4.5-6S21 11 21 15c0 2-1 3-2.5 3S16 15 14 12c-1-1.5-1.5 0-2 0s-1-1.5-2 0c-2 3-2.5 6-4.5 6S3 17 3 15Z" /></svg>
    case 'shield': return <svg {...p}><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z" /><path d="m9 12 2 2 4-4" /></svg>
    default: return null
  }
}

function Logo() {
  return <a href="/" className="h6-logo" aria-label="Unbox"><img src={'/img/simbolo-unbox.png' + V} alt="" /><span>unbox</span></a>
}
const BRANDS_CREATE = [{ k: 'claude', name: 'Claude' }, { k: 'openai', name: 'OpenAI' }, { k: 'figma', name: 'Figma' }]
const BRANDS_MIGRATE = [{ k: 'shopify', name: 'Shopify' }, { k: 'nuvemshop', name: 'Nuvemshop' }, { k: 'woo', name: 'WooCommerce' }]

/* Logos oficiais em /public/img/brands — conjunto único compartilhado com
   /ai-unbox-v2. Símbolos vêm do Simple Icons na cor de marca (ou do kit da
   própria marca, caso de claude/figma/openai); wordmarks vêm do site oficial.
   `wm` marca os que já contêm o nome — nesses o chip não repete o texto. */
const LOGOS = {
  claude: { f: 'claude.svg' }, figma: { f: 'figma.svg' }, shopify: { f: 'shopify.svg' },
  woo: { f: 'woocommerce.png' }, cursor: { f: 'cursor.svg' }, instagram: { f: 'instagram.svg' },
  whatsapp: { f: 'whatsapp.svg' }, meta: { f: 'meta.svg' }, google: { f: 'google.svg' },
  ga: { f: 'googleanalytics.svg' }, gtm: { f: 'googletagmanager.svg' },
  openai: { f: 'openai.svg' }, nuvemshop: { f: 'nuvemshop.svg', wm: 4 },
  bling: { f: 'bling.svg', wm: 2.06 }, correios: { f: 'correios.svg', wm: 4.88 },
  totalexpress: { f: 'totalexpress.svg', wm: 2.5, hs: 1.45 },
}

function BrandMark({ k, size = 20 }) {
  const l = LOGOS[k]
  if (!l) return null
  const h = size * (l.hs || 1)
  return <img className="h6-lg" src={'/img/brands/' + l.f} alt="" aria-hidden="true" style={{ height: h, width: l.wm ? h * l.wm : h }} />
}

function Mono({ t, bg, fg = '#fff', size = 20 }) {
  return <span className="h6-mono" style={{ width: size, height: size, background: bg, color: fg }}>{t}</span>
}
function IntMark({ m }) {
  if (m.mono) return <Mono t={m.mono} bg={m.bg} fg={m.fg} />
  return <BrandMark k={m.k} size={16} />
}
function BrandChip({ b, size = 20 }) {
  const wm = LOGOS[b.k] && LOGOS[b.k].wm
  return <span className="h6-blogo"><BrandMark k={b.k} size={size} />{!wm && <b>{b.name}</b>}</span>
}

function AiTag({ children = 'AI' }) { return <span className="h6-aitag"><Icon name="sparkle" size={11} />{children}</span> }

function useCountUp(target, decimals = 0, run) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!run) return
    let raf; const t0 = performance.now(); const dur = 1400
    const tick = (t) => { const k = Math.min(1, Math.max(0, (t - t0) / dur)); const e = 1 - Math.pow(1 - k, 3); setVal(Number((target * e).toFixed(decimals))); if (k < 1) raf = requestAnimationFrame(tick) }
    raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf)
  }, [target, decimals, run])
  return val
}
function Metric({ m, run }) {
  const v = useCountUp(m.num, m.decimals || 0, run)
  const shown = (m.decimals ? v.toFixed(m.decimals) : Math.round(v)).toString().replace('.', ',')
  return <div className="h6-metric"><div className="h6-metric-n">{m.prefix}{shown}<span>{m.suffix}</span></div><div className="h6-metric-l">{m.label}</div></div>
}

/* ── Hero: painel com abas (ref. v2) — 4 produtos + Unbox AI ── */
function Showcase() {
  const [tab, setTab] = useState(0)
  const [prog, setProg] = useState(0)
  const paused = useRef(false); const pr = useRef(0)
  useEffect(() => {
    const id = setInterval(() => { if (paused.current) return; pr.current += 1 / 160; if (pr.current >= 1) { pr.current = 0; setTab((t) => (t + 1) % SHOW.length) } setProg(pr.current) }, 40)
    return () => clearInterval(id)
  }, [])
  useEffect(() => { const q = new URLSearchParams(window.location.search).get('tab'); if (q !== null) { paused.current = true; setTab(Math.min(SHOW.length - 1, Math.max(0, Number(q) || 0))) } }, [])
  const T = SHOW[tab]
  return (
    <div className={'h6-panel tint-' + T.tint} onMouseEnter={() => { paused.current = true }} onMouseLeave={() => { paused.current = false }}>
      <div className="h6-ptabs" role="tablist">
        {SHOW.map((t, i) => (
          <button key={t.key} role="tab" aria-selected={i === tab} className={'h6-ptab' + (i === tab ? ' is-on' : '')} onClick={() => { pr.current = 0; setProg(0); setTab(i) }}>
            <span className="h6-ptab-ico"><Icon name={t.icon} size={16} /></span><span className="h6-ptab-lbl">{t.label}</span>
            {i === tab && <i className="h6-ptab-prog" style={{ transform: `scaleX(${prog})` }} />}
          </button>
        ))}
      </div>
      <div className="h6-showcase" key={T.key}>
        <div className="h6-showcase-copy">
          <span className="h6-chip"><Icon name={T.icon} size={14} /> {T.label}</span>
          <h3>{T.title}</h3>
          <p>{T.body}</p>
          <div className="h6-showcase-ai"><AiTag /><span>{T.ai}</span></div>
          <a href={T.href} className="h6-textlink">Saiba mais <Icon name="arrow" size={16} /></a>
        </div>
        <div className={'h6-showcase-media' + (T.mock ? ' is-mock' : '')}>
          {T.img ? <img src={T.img} alt={T.alt} /> : <Mock kind={T.mock} />}
        </div>
      </div>
    </div>
  )
}

/* ── Visuais por produto (mocks de UI, sem assets novos) ───── */
function Chat({ who, lines }) {
  return (
    <div className="h6-chat">
      <div className="h6-chat-h"><AiTag>Unbox MCP</AiTag><span>{who}</span></div>
      {lines.map((l, i) => <div className={'h6-bub ' + l.r} key={i}>{l.r !== 'u' && <Icon name="check" size={13} />}{l.t}</div>)}
    </div>
  )
}
function Mock({ kind }) {
  switch (kind) {
    case 'store': return (
      <div className="h6-mock h6-m-store">
        <div className="h6-m-phone"><div className="h6-b-phone-top" /><img src="/img/cases/case-oddie-depois.jpg" alt="Loja Oddie Supply gerada na Unbox" /></div>
        <div className="h6-m-agents">
          <div className="h6-m-agents-h"><AiTag>Agentes</AiTag><span>rodaram antes de publicar</span></div>
          {[['Branding & Identidade', 'paleta, tipografia e tom aplicados'], ['QA Visual', 'desktop e mobile revisados'], ['SEO + AEO', 'pronta para Google e ChatGPT'], ['Performance', 'Lighthouse 96+']].map(([a, b]) => <div className="h6-m-agent" key={a}><Icon name="check" size={14} /><div><b>{a}</b><span>{b}</span></div></div>)}
        </div>
      </div>)
    case 'checkout': return (
      <div className="h6-mock h6-m-checkout">
        <div className="h6-m-frame"><img src="/img/ai-prova-checkout.png" alt="Checkout TURBO da Temperos Badia com cupom BRUNINHO10 aplicado" /></div>
        <div className="h6-m-float fl1"><AiTag>Anti-Fraude IA+</AiTag><b>Pedido aprovado</b><span>análise em tempo real · 0,3s</span></div>
        <div className="h6-m-float fl2"><b>3 etapas</b><span>sem redirecionamento</span></div>
      </div>)
    case 'pay': return (
      <div className="h6-mock h6-m-pay">
        <div className="h6-m-stat"><span>Aprovação</span><b>98%</b><em>multi provedores + retentativa</em></div>
        <div className="h6-m-stat"><span>Pix</span><b>1%</b><em>cartão a partir de 2,99%</em></div>
        <div className="h6-m-stat"><span>Receba em</span><b>2 · 14 · 30</b><em>dias, sem taxa de saque</em></div>
        <div className="h6-m-credit">
          <div className="h6-m-credit-h"><span>Retentativa entre provedores</span><b>98% aprovado</b></div>
          <div className="h6-m-credit-bar"><i /></div>
          <div className="h6-m-credit-f"><span>1ª tentativa recusada · 2ª aprovada em 0,4s</span><span>sem o cliente perceber</span></div>
        </div>
        <div className="h6-m-float fl3"><AiTag /><b>Gateway turbinado por AI</b><span>aprova mais, custa menos</span></div>
      </div>)
    case 'ai': return (
      <div className="h6-mock h6-m-ai">
        <div className="h6-term"><div className="h6-term-cmd"><span>$</span> npx create-unbox-store</div><div className="h6-term-line">→ lendo briefing da marca · estilo editorial</div><div className="h6-term-line">→ gerando storefront: home, catálogo, PDP, checkout</div><div className="h6-term-line ok">✓ loja no ar em preview</div></div>
        <Chat who="você · Claude" lines={[{ r: 'u', t: 'cria o cupom VOLTA10 com 10% e frete grátis acima de R$ 150' }, { r: 'a', t: 'Plano: VOLTA10 · 10% · frete grátis ≥ R$ 150. Confirmar?' }, { r: 'u', t: 'confirma' }, { r: 'a ok', t: 'Criado e publicado.' }]} />
      </div>)
    case 'sub': return (
      <div className="h6-mock h6-m-shot">
        <img className="h6-m-shot-img" src="/img/assinatura2.png" alt="Assinatura nativa no carrinho da Unbox" />
        <div className="h6-m-shot-float"><Chat who="você · Cursor" lines={[{ r: 'u', t: 'cria um plano de assinatura mensal com 15% de desconto para o Kit Cabelo' }, { r: 'a', t: 'Plano: mensal · 15% · Kit Cabelo · pausa após 2 falhas. Confirmar?' }, { r: 'u', t: 'confirma' }, { r: 'a ok', t: 'Plano publicado no carrinho.' }]} /></div>
      </div>)
    case 'promo': return (
      <div className="h6-mock h6-m-promo">
        <Chat who="você · Claude" lines={[{ r: 'u', t: 'cria o cupom BRUNINHO10, 10% de desconto' }, { r: 'a', t: 'Plano: cupom BRUNINHO10 · 10% · sem limite. Confirmar?' }, { r: 'u', t: 'confirma' }, { r: 'a ok', t: 'Criado, ativado e publicado na Badia.' }]} />
        <div className="h6-m-proof"><div className="h6-m-proof-l"><span className="h6-live" />Print real · Temperos Badia · via MCP</div><div className="h6-m-frame wide"><img src="/img/ai-prova-agente.png" alt="Print real: AI criando o cupom BRUNINHO10 na loja Temperos Badia via MCP" /></div></div>
      </div>)
    case 'creators': return (
      <div className="h6-mock h6-m-creators">
        <div className="h6-m-list">
          <div className="h6-m-list-h"><span>Creators · agosto</span><em>comissão automática</em></div>
          {[['@ana.lima', 'ANA10', 34, 100], ['@joao.silva', 'JOAO15', 21, 62], ['@chico.reis', 'CHICO10', 12, 35]].map(([h, c, n, w]) => <div className="h6-m-cre" key={h}><b>{h}</b><code>{c}</code><i><span style={{ width: w + '%' }} /></i><em>{n} vendas</em></div>)}
        </div>
        <Chat who="você · ChatGPT" lines={[{ r: 'u', t: 'quem vendeu mais em agosto, por cupom?' }, { r: 'a ok', t: '@ana.lima (ANA10) · 34 pedidos · R$ 6.120. Depois @joao.silva com 21.' }]} />
      </div>)
    case 'ops': return (
      <div className="h6-mock h6-m-ops">
        <div className="h6-m-order">
          <div className="h6-m-order-h"><span>Pedido #48213</span><b className="ok">Pago · Pix</b></div>
          <div className="h6-m-subrow"><span>Frete</span><b>Total Express · R$ 14,90</b></div>
          <div className="h6-m-subrow"><span>Etiqueta</span><b>gerada · rastreio ativo</b></div>
          <div className="h6-m-subrow"><span>ERP</span><b>Bling · NF emitida</b></div>
          <div className="h6-m-subrow"><span>Cliente</span><b>WhatsApp direto <Icon name="whatsapp" size={13} /></b></div>
        </div>
        <Chat who="você · Claude" lines={[{ r: 'u', t: 'sobe o estoque do Kit Temperos para 120 e o preço para R$ 89' }, { r: 'a', t: 'Plano: Kit Temperos · estoque 120 · preço R$ 89,00. Confirmar?' }, { r: 'u', t: 'confirma' }, { r: 'a ok', t: 'Atualizado na loja e no Bling.' }]} />
      </div>)
    case 'data': return (
      <div className="h6-mock h6-m-data">
        <div className="h6-m-panel">
          <div className="h6-m-panel-h"><span>De onde vem o seu dinheiro</span><em>30 dias</em></div>
          {[['Recompra', 46], ['Instagram', 24], ['Google', 18], ['Creators', 12]].map(([n, v]) => <div className="h6-m-src" key={n}><span>{n}</span><i><span style={{ width: v + '%' }} /></i><b>{v}%</b></div>)}
          <div className="h6-m-panel-f"><span>Carrinhos abandonados</span><b>R$ 3.480 recuperáveis</b></div>
        </div>
        <Chat who="você · Claude" lines={[{ r: 'u', t: 'o que caiu essa semana e o que eu faço?' }, { r: 'a ok', t: 'Recompra caiu 9% no cohort de maio. Sugestão: cupom de retorno para quem não comprou em 45 dias. Preparo?' }]} />
      </div>)
    default: return null
  }
}

/* ── Antes/depois com divisor ──────────────────────────────── */
function Compare({ c }) {
  const [x, setX] = useState(50)
  return (
    <div className="h6-case">
      <div className="h6-case-head"><img src={c.logo} alt={c.name} className={'h6-case-logo' + (c.dark ? ' is-dark' : '')} /><span className="h6-case-seg">{c.seg}</span></div>
      <div className="h6-cmp" style={{ '--x': x + '%' }}>
        <img src={c.before} alt={`${c.name} antes`} className="h6-cmp-img" />
        <div className="h6-cmp-after"><img src={c.after} alt={`${c.name} depois`} className="h6-cmp-img" /></div>
        <div className="h6-cmp-bar"><i /></div>
        <span className="h6-cmp-tag l">Antes</span><span className="h6-cmp-tag r">Depois · Unbox</span>
        <input type="range" min="2" max="98" value={x} onChange={(e) => setX(Number(e.target.value))} aria-label="Comparar antes e depois" />
      </div>
      <p className="h6-case-note">{c.note}</p>
    </div>
  )
}

export default function HomeV6() {
  const [faq, setFaq] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)
  const [metricsOn, setMetricsOn] = useState(false)
  const [active, setActive] = useState(GROUPS[0].id)
  const metricsRef = useRef(null)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8)
    on(); window.addEventListener('scroll', on, { passive: true })
    const qs = new URLSearchParams(window.location.search)
    const only = qs.get('only')
    if (only) {
      const root = document.getElementById('hv6')
      Array.from(root.children).forEach((el) => { if (el.id !== only && !el.classList.contains('h6-nav')) el.style.display = 'none' })
    }
    if (qs.get('rv') || only) document.querySelectorAll('#hv6 [data-rv]').forEach((el) => el.classList.add('h6-in'))
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => {
    const els = document.querySelectorAll('#hv6 [data-rv]')
    if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('h6-in')); setMetricsOn(true); return }
    const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('h6-in'); io.unobserve(en.target) } }), { threshold: 0.12 })
    els.forEach((e) => io.observe(e))
    let mo
    if (metricsRef.current) { mo = new IntersectionObserver((es) => { if (es[0].isIntersecting) { setMetricsOn(true); mo.disconnect() } }, { threshold: 0.2 }); mo.observe(metricsRef.current) }
    const fb = setTimeout(() => setMetricsOn(true), 1800)
    const to = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) setActive(en.target.id) }), { rootMargin: '-35% 0px -55% 0px' })
    document.querySelectorAll('#hv6 [data-prod]').forEach((e) => to.observe(e))
    return () => { io.disconnect(); mo && mo.disconnect(); to.disconnect(); clearTimeout(fb) }
  }, [])

  return (
    <>
      <Head>
        <title>Unbox — A plataforma completa de e-commerce. AI em cada parte.</title>
        <meta name="description" content="Loja, checkout, pagamento, assinatura, promoções, creators, envios e dados em um só lugar. E uma AI que cria, opera e otimiza tudo com você. Unbox: AI Commerce Platform." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </Head>

      <div id="hv6">
        <a className="h6-announce" href="/ai-unbox"><span className="h6-announce-dot" /> Unbox AI Foundry: lista de espera aberta · vagas por lote. <b>Entrar na lista →</b></a>

        <header className={'h6-nav' + (scrolled ? ' is-scrolled' : '')}>
          <div className="h6-wrap h6-nav-in">
            <Logo />
            <nav className="h6-links"><a href="#loja">Loja</a><a href="#checkout">Checkout</a><a href="#pay">Unbox Pay</a><a href="#assinatura">Assinatura</a><a href="#unbox-ai">Unbox AI</a><a href="#cases">Cases</a></nav>
            <div className="h6-nav-cta">
              <a href={URLS.login} className="h6-btn h6-btn-ghost">Login</a>
              <a href="/ai-unbox" className="h6-btn h6-btn-dark">Criar minha loja com AI</a>
              <button className="h6-burger" aria-label="Menu" onClick={() => setMenu((v) => !v)}><span /><span /><span /></button>
            </div>
          </div>
          {menu && <div className="h6-sheet"><a href="#loja">Loja</a><a href="#checkout">Checkout</a><a href="#pay">Unbox Pay</a><a href="#assinatura">Assinatura</a><a href="#unbox-ai">Unbox AI</a><a href="#cases">Cases</a><a href="/ai-unbox" className="h6-btn h6-btn-dark">Criar minha loja com AI</a></div>}
        </header>

        {/* HERO */}
        <section className="h6-hero" id="hero">
          <div className="h6-wrap">
            <div className="h6-hero-copy" data-rv>
              <h1><em>AI Commerce</em><br />Seu ecommerce no automático</h1>
              <p className="h6-lead">Crie, gerencie e escale sua marca com AI.</p>
              <div className="h6-cta-row">
                <a href="/ai-unbox" className="h6-btn h6-btn-dark h6-btn-lg">Criar minha loja com AI</a>
                <a href="#canais" className="h6-btn h6-btn-white h6-btn-lg">Conhecer a plataforma</a>
              </div>
              <p className="h6-micro">Sem taxa de setup · Migração acompanhada · Produtos e visitas ilimitados</p>
            </div>
            <div className="h6-logos" data-rv>
              <div className="h6-logos-g">
                <span className="h6-logos-l">Você cria com</span>
                <div className="h6-logos-row">{BRANDS_CREATE.map((b) => <BrandChip b={b} key={b.k} />)}</div>
              </div>
              <div className="h6-logos-g">
                <span className="h6-logos-l">Ou migra de</span>
                <div className="h6-logos-row">{BRANDS_MIGRATE.map((b) => <BrandChip b={b} key={b.k} />)}</div>
              </div>
            </div>
            <div data-rv><Showcase /></div>
          </div>
        </section>

        {/* BRANDS */}
        <section className="h6-brands" data-rv id="marcas">
          <p className="h6-brands-l">Marcas que já vendem todo dia com a Unbox</p>
          <div className="h6-marquee"><div className="h6-marquee-track">
            {[...BRANDS, ...BRANDS].map((b, i) => <span className="h6-brand" key={i}>{b.logo ? <img src={b.logo} alt={b.name} /> : <b>{b.name}</b>}<em>{b.seg}</em></span>)}
          </div></div>
        </section>

        {/* CANAIS */}
        <section className="h6-sec" id="canais">
          <div className="h6-wrap">
            <div className="h6-head h6-center" data-rv>
              <span className="h6-eye"><i className="h6-dot" />VENDA EM TODOS OS CANAIS</span>
              <h2>Um catálogo. Todos os lugares onde o seu cliente está.</h2>
              <p>Loja própria, Instagram, WhatsApp, Google e link de pagamento. Atualize o catálogo uma vez, por texto se quiser, e ele acompanha em todos os canais conectados.</p>
            </div>
            <div className="h6-channels">
              {CHANNELS.map((c, i) => <div className="h6-channel" data-rv style={{ transitionDelay: `${i * 60}ms` }} key={c.k}><span className="h6-ch-ico"><Icon name={c.icon} size={20} /></span><b>{c.t}</b><p>{c.d}</p></div>)}
            </div>
            <div className="h6-ailine" data-rv><AiTag /><span><b>Catálogo por texto.</b> "Cadastra o Kit Verão com 3 variações a R$ 129" e a AI prepara o produto para você confirmar.</span></div>
          </div>
        </section>

        {/* CASES */}
        <section className="h6-sec" id="cases">
          <div className="h6-wrap">
            <div className="h6-head h6-center" data-rv>
              <span className="h6-eye"><i className="h6-dot" />ANTES E DEPOIS</span>
              <h2>Três marcas. Três categorias. A mesma virada.</h2>
              <p>Todas remontadas com a Unbox por AI e vendendo hoje. Arraste para comparar como a loja era e como ficou.</p>
            </div>
            <div className="h6-cases" data-rv>{CASES.map((c) => <Compare c={c} key={c.name} />)}</div>
          </div>
        </section>


        {/* TOUR BAR */}
        <div className="h6-tour" id="tour">
          <div className="h6-wrap h6-tour-in">
            <span className="h6-tour-l">A plataforma</span>
            <div className="h6-tour-tabs">{GROUPS.map((p) => <a href={'#' + p.id} className={'h6-tab' + (active === p.id ? ' is-on' : '')} key={p.id}><span className="h6-tab-ico"><Icon name={p.icon} size={13} /></span>{p.tab}</a>)}</div>
          </div>
        </div>

        {/* PRODUTOS */}
        {GROUPS.map((p, i) => (
          <section className={'h6-prod tint-' + p.tint + (i % 2 ? ' is-rev' : '')} id={p.id} data-prod key={p.id}>
            <div className="h6-wrap h6-prod-grid">
              <div className="h6-prod-copy">
                <span className="h6-eye" data-rv><i className="h6-dot" />{p.eye}</span>
                <h2 data-rv>{p.title}</h2>
                <p className="h6-sub" data-rv>{p.body}</p>
                <div className="h6-subs" data-rv>
                  {p.subs.map((sb) => (
                    <div className="h6-sub-card" key={sb.t}>
                      <span className="h6-sub-h"><span className="h6-sub-ico"><Icon name={sb.icon} size={15} /></span>{sb.t}</span>
                      <ul>{sb.feats.map((f) => <li key={f}><Icon name="check" size={14} />{f}</li>)}</ul>
                    </div>
                  ))}
                </div>
                <div className="h6-ai" data-rv>
                  <div className="h6-ai-h"><AiTag>AI EM DESTAQUE</AiTag></div>
                  <b>{p.ai.h}</b><p>{p.ai.d}</p>
                </div>
                <a href={p.link.href} className="h6-textlink" data-rv {...(p.link.ext ? { target: '_blank', rel: 'noopener' } : {})}>{p.link.t} <Icon name="arrow" size={15} /></a>
              </div>
              <div className="h6-prod-visual" data-rv><div className="h6-visual-bg"><Mock kind={p.visual} /></div></div>
            </div>
          </section>
        ))}

        {/* UNBOX AI */}
        <section className="h6-sec h6-aiband" id="unbox-ai">
          <div className="h6-wrap">
            <div className="h6-head h6-center" data-rv>
              <span className="h6-eye light"><i className="h6-dot" />CONHEÇA O UNBOX AI</span>
              <h2>Não é um chatbot no canto da tela. É a camada que cria, opera e otimiza a sua loja.</h2>
              <p>A AI que você já usa, conectada à Unbox via MCP, com agentes embarcados no projeto. Cada parte da plataforma que você viu acima responde a ela.</p>
            </div>
            <div className="h6-pillars">
              {AI_PILLARS.map((a, i) => (
                <div className="h6-pillar" data-rv style={{ transitionDelay: `${i * 80}ms` }} key={a.k}>
                  <span className="h6-pillar-ico"><Icon name={a.icon} size={20} /></span>
                  <span className="h6-pillar-t">{a.t}</span>
                  <h3>{a.h}</h3>
                  <p>{a.d}</p>
                  {a.k === 'cli' && <div className="h6-term"><div className="h6-term-cmd"><span>$</span> npx create-unbox-store</div><div className="h6-term-line">→ lendo briefing da marca · estilo editorial</div><div className="h6-term-line">→ gerando storefront: home, catálogo, PDP, checkout</div><div className="h6-term-line ok">✓ loja no ar em preview</div></div>}
                  {a.k === 'mcp' && <div className="h6-term"><div className="h6-term-line">você: <span className="w">pausa a campanha de frete grátis amanhã às 23h</span></div><div className="h6-term-line">AI: plano preparado · 1 escrita · Confirmar?</div><div className="h6-term-line">você: <span className="w">confirma</span></div><div className="h6-term-line ok">✓ agendado e registrado</div></div>}
                  {a.k === 'agents' && <div className="h6-agents">{AGENTS.map((g) => <span key={g}><Icon name="sparkle" size={11} />{g}</span>)}</div>}
                  <a href={a.href} className="h6-textlink light">{a.l} <Icon name="arrow" size={15} /></a>
                </div>
              ))}
            </div>
            <div className="h6-migrate" data-rv>
              <span>Migre de</span>
              <img src="/img/logo-shopify.png" alt="Shopify" /><img src="/img/logo-vtex.png" alt="VTEX" /><img src="/img/logo-woocommerce.png" alt="WooCommerce" />
              <span className="h6-migrate-t">e outras. A AI extrai catálogo, tema e conteúdo do site atual e remonta tudo na Unbox, preservando URLs.</span>
            </div>
          </div>
        </section>

        {/* PORTE */}
        <section className="h6-sec" id="porte">
          <div className="h6-wrap">
            <div className="h6-head h6-center" data-rv><span className="h6-eye"><i className="h6-dot" />PARA CADA MOMENTO DA MARCA</span><h2>Do primeiro pedido à indústria.</h2></div>
            <div className="h6-sizes">
              {SIZES.map((s, i) => <div className={'h6-size tint-' + s.tint} data-rv style={{ transitionDelay: `${i * 80}ms` }} key={s.eye}><span className="h6-size-eye">{s.eye}</span><h3>{s.t}</h3><p>{s.d}</p><a href={s.href} className="h6-textlink">{s.l} <Icon name="arrow" size={15} /></a><div className="h6-size-blob" /></div>)}
            </div>
          </div>
        </section>

        {/* INTEGRAÇÕES */}
        <section className="h6-sec h6-sec-alt" id="integracoes">
          <div className="h6-wrap h6-split">
            <div className="h6-split-copy">
              <span className="h6-eye" data-rv><i className="h6-dot" />INTEGRAÇÕES</span>
              <h2 data-rv>Conecta com o que você já usa. Inclusive a sua AI.</h2>
              <p className="h6-sub" data-rv>Canais de venda, ERP, transportadoras e analytics nativos. E, pelo MCP, qualquer AI vira o painel da sua loja.</p>
              <a href="/recursos" className="h6-textlink" data-rv>Ver todas as integrações <Icon name="arrow" size={15} /></a>
            </div>
            <div className="h6-int" data-rv>
              {INTEGRATIONS.map((g) => <div className="h6-int-g" key={g.g}><span className="h6-int-l">{g.g}</span><div className="h6-int-items">{g.items.map((it) => <span className={'h6-int-item' + (g.g.startsWith('AI') ? ' is-ai' : '')} key={it.n}><IntMark m={it} />{!(LOGOS[it.k] && LOGOS[it.k].wm) && it.n}</span>)}</div></div>)}
            </div>
          </div>
        </section>

        {/* COMPARATIVO */}
        <section className="h6-sec" id="comparativo">
          <div className="h6-wrap">
            <div className="h6-head h6-center" data-rv>
              <span className="h6-eye"><i className="h6-dot" />COMPARATIVO</span>
              <h2>O que muda quando a plataforma nasce com AI.</h2>
              <p>Todas resolvem vitrine, catálogo e pedido. A diferença está em quanto da operação você consegue delegar — e quanto vira projeto à parte.</p>
            </div>
            <div className="h6-cmp-wrap" data-rv>
              <table className="h6-cmp">
                <thead>
                  <tr><th /> {CMP_COLS.map((c, i) => <th key={c} className={i === 0 ? 'is-us' : ''}>{c}</th>)}</tr>
                </thead>
                <tbody>
                  {CMP_ROWS.map((r) => (
                    <tr key={r.t}>
                      <th scope="row"><b>{r.t}</b><span>{r.d}</span>{r.note && <em>{r.note}</em>}</th>
                      {r.v.map((v, i) => (
                        <td key={i} className={(i === 0 ? 'is-us ' : '') + 'v-' + v}>
                          <span className="h6-cmp-mark" aria-label={v === 'y' ? 'nativo' : v === 'p' ? 'via app ou módulo' : 'não oferece'}>
                            {v === 'y' ? <Icon name="check" size={16} /> : v === 'p' ? '~' : '—'}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="h6-cmp-legend">
                <span><i className="l-y"><Icon name="check" size={12} /></i> nativo na plataforma</span>
                <span><i className="l-p">~</i> via app, módulo ou parceiro</span>
                <span><i className="l-n">—</i> não oferece</span>
              </p>
            </div>
          </div>
        </section>

        {/* NÚMEROS */}
        <section className="h6-sec" ref={metricsRef} id="numeros">
          <div className="h6-wrap">
            <div className="h6-head h6-center" data-rv><span className="h6-eye"><i className="h6-dot" />O MELHOR LUGAR PARA CONSTRUIR A SUA MARCA</span><h2>Checkout que converte mais. Pagamento que aprova mais.</h2></div>
            <div className="h6-metrics-grid" data-rv>{METRICS.map((m) => <Metric key={m.label} m={m} run={metricsOn} />)}</div>
          </div>
        </section>

        {/* FAQ */}
        <section className="h6-sec" id="faq">
          <div className="h6-wrap h6-narrow">
            <div className="h6-head" data-rv><span className="h6-eye"><i className="h6-dot" />DÚVIDAS</span><h2>Tudo que você precisa saber.</h2></div>
            <div className="h6-faq" data-rv>
              {FAQ.map((f, i) => (
                <div className={'h6-faq-item' + (faq === i ? ' is-open' : '')} key={i}>
                  <button className="h6-faq-q" onClick={() => setFaq(faq === i ? -1 : i)}><span>{f.q}</span><i><Icon name="plus" size={16} /></i></button>
                  <div className="h6-faq-a"><p>{f.a}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL */}
        <section className="h6-sec h6-final-wrap" id="final">
          <div className="h6-wrap">
            <div className="h6-final" data-rv>
              <h2>Toda a plataforma. A sua AI no comando.</h2>
              <p>Crie a loja com a sua AI, migre de onde estiver ou fale com a gente. Sem compromisso.</p>
              <div className="h6-cta-row"><a href="/ai-unbox" className="h6-btn h6-btn-white h6-btn-lg">Criar minha loja com AI</a><a href={URLS.demo} className="h6-btn h6-btn-ghost-light h6-btn-lg">Agendar demo</a></div>
            </div>
          </div>
        </section>

        <footer className="h6-footer">
          <div className="h6-wrap h6-footer-grid">
            <div className="h6-footer-brand"><Logo /><p>A plataforma completa de e-commerce para marcas D2C. AI em cada parte.</p></div>
            <div><h4>Plataforma</h4><a href="/recursos">Recursos</a><a href="/checkout">Checkout TURBO</a><a href="/assinatura">Assinatura</a><a href="/credito">Unbox Pay</a><a href="/afiliados">Creators</a></div>
            <div><h4>AI</h4><a href="/ai-unbox">AI Foundry</a><a href="#unbox-ai">CLI · MCP · Agentes</a><a href="/ai">Demo</a></div>
            <div><h4>Empresa</h4><a href="/industrias">Indústrias</a><a href="/blog">Blog</a><a href="/carreiras">Carreiras</a><a href={URLS.whatsapp}>Contato</a></div>
          </div>
          <div className="h6-wrap h6-footer-bottom">© {new Date().getFullYear()} Unbox. Todos os direitos reservados.</div>
        </footer>
      </div>

      <style jsx global>{`
        html, body { margin: 0; background: #FBFAF6; }
        #hv6 {
          --bg: #FBFAF6; --ink: #16161C; --ink-2: #4A4A55; --mut: #7A7A86; --line: rgba(22,22,28,.09);
          --roxo: #8F28F6; --roxo-2: #5612AB; --verde: #1FBF5A; --neon: #39FF14;
          --sky: #E6F0FF; --sky-2: #C3DFFE; --lime: #F1FBDF; --lime-2: #DBEE9F; --lavender: #EEE6FF; --lavender-2: #D4C2FF; --mint: #E4FAF3; --mint-2: #BAF0EC;
          --mono: 'JetBrains Mono', ui-monospace, Menlo, monospace;
          font-family: 'Sora', system-ui, -apple-system, sans-serif; color: var(--ink); background: var(--bg); -webkit-font-smoothing: antialiased; line-height: 1.5; overflow-x: clip;
        }
        #hv6 *, #hv6 *::before, #hv6 *::after { box-sizing: border-box; }
        #hv6 a { color: inherit; text-decoration: none; }
        #hv6 code { font-family: var(--mono); font-size: .9em; background: rgba(22,22,28,.06); padding: 2px 6px; border-radius: 6px; }
        #hv6 .h6-wrap { max-width: 1180px; margin: 0 auto; padding: 0 24px; }
        #hv6 .h6-narrow { max-width: 820px; }
        #hv6 [data-rv] { opacity: 0; transform: translateY(16px); transition: opacity .7s ease, transform .7s cubic-bezier(.2,.7,.2,1); }
        #hv6 [data-rv].h6-in { opacity: 1; transform: none; }
        #hv6 .tint-sky { --t: var(--sky); --t2: var(--sky-2); } #hv6 .tint-lime { --t: var(--lime); --t2: var(--lime-2); }
        #hv6 .tint-lavender { --t: var(--lavender); --t2: var(--lavender-2); } #hv6 .tint-mint { --t: var(--mint); --t2: var(--mint-2); }
        #hv6 .up { color: var(--verde); }

        #hv6 .h6-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; font-weight: 600; font-size: 15px; border-radius: 12px; padding: 12px 20px; border: 1px solid transparent; transition: transform .15s ease, box-shadow .2s, background .2s, border-color .2s; white-space: nowrap; cursor: pointer; font-family: inherit; }
        #hv6 .h6-btn-lg { padding: 16px 26px; font-size: 16px; border-radius: 14px; }
        #hv6 .h6-btn-dark { background: var(--ink); color: #fff; } #hv6 .h6-btn-dark:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(22,22,28,.22); }
        #hv6 .h6-btn-white { background: #fff; color: var(--ink); border-color: var(--line); } #hv6 .h6-btn-white:hover { border-color: rgba(22,22,28,.25); transform: translateY(-2px); }
        #hv6 .h6-btn-ghost { background: transparent; color: var(--ink); } #hv6 .h6-btn-ghost:hover { background: rgba(22,22,28,.05); }
        #hv6 .h6-btn-ghost-light { background: rgba(255,255,255,.12); color: #fff; border-color: rgba(255,255,255,.28); }
        #hv6 .h6-textlink { display: inline-flex; align-items: center; gap: 6px; font-weight: 600; color: var(--roxo-2); } #hv6 .h6-textlink:hover { gap: 10px; }
        #hv6 .h6-textlink.light { color: #fff; }
        #hv6 .h6-eye { display: inline-flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 700; letter-spacing: .18em; color: var(--roxo-2); }
        #hv6 .h6-eye.light { color: #C9A8FF; }
        #hv6 .h6-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--verde); box-shadow: 0 0 0 3px rgba(31,191,90,.18); }
        #hv6 .h6-aitag { display: inline-flex; align-items: center; gap: 5px; font-size: 10.5px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: #fff; background: linear-gradient(135deg, var(--roxo), #B06BFF); border-radius: 999px; padding: 4px 9px; white-space: nowrap; }
        #hv6 .h6-live { width: 8px; height: 8px; border-radius: 50%; background: var(--verde); box-shadow: 0 0 0 3px rgba(31,191,90,.2); display: inline-block; margin-right: 8px; }

        #hv6 .h6-announce { display: flex; align-items: center; justify-content: center; gap: 8px; background: var(--lavender); font-size: 13.5px; padding: 9px 16px; text-align: center; }
        #hv6 .h6-announce b { font-weight: 600; color: var(--roxo-2); }
        #hv6 .h6-announce-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--roxo); box-shadow: 0 0 0 3px rgba(143,40,246,.18); }
        #hv6 .h6-nav { position: sticky; top: 0; z-index: 50; background: rgba(251,250,246,.86); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border-bottom: 1px solid transparent; transition: border-color .2s, box-shadow .2s; }
        #hv6 .h6-nav.is-scrolled { border-bottom-color: var(--line); box-shadow: 0 6px 24px rgba(22,22,28,.05); }
        #hv6 .h6-nav-in { display: flex; align-items: center; justify-content: space-between; height: 72px; gap: 24px; }
        #hv6 .h6-logo { display: inline-flex; align-items: center; gap: 8px; font-weight: 700; font-size: 24px; letter-spacing: -.03em; color: var(--ink); }
        #hv6 .h6-logo img { width: 30px; height: 30px; object-fit: contain; }
        #hv6 .h6-links { display: flex; gap: 24px; font-weight: 500; font-size: 15px; color: var(--ink-2); } #hv6 .h6-links a:hover { color: var(--ink); }
        #hv6 .h6-nav-cta { display: flex; align-items: center; gap: 8px; }
        #hv6 .h6-burger { display: none; width: 40px; height: 40px; border: 1px solid var(--line); border-radius: 10px; background: #fff; flex-direction: column; justify-content: center; gap: 4px; align-items: center; cursor: pointer; }
        #hv6 .h6-burger span { width: 16px; height: 2px; background: var(--ink); border-radius: 2px; }
        #hv6 .h6-sheet { display: flex; flex-direction: column; gap: 6px; padding: 12px 24px 20px; border-top: 1px solid var(--line); background: var(--bg); } #hv6 .h6-sheet a { padding: 10px 0; font-weight: 500; }

        /* hero (copy centralizada + painel com abas, ref. v2) */
        #hv6 .h6-hero { padding: 76px 0 24px; }
        #hv6 .h6-hero-copy { text-align: center; max-width: 880px; margin: 0 auto 44px; }
        #hv6 h1 { font-size: clamp(36px, 5vw, 62px); font-weight: 700; letter-spacing: -.04em; line-height: 1.04; margin: 0 0 20px; }
        #hv6 h1 em { font-style: normal; background: linear-gradient(90deg, var(--roxo), #B06BFF); -webkit-background-clip: text; background-clip: text; color: transparent; }
        #hv6 .h6-lead { font-size: clamp(17px, 1.6vw, 21px); color: var(--ink-2); line-height: 1.5; max-width: 640px; margin: 0 auto; }
        #hv6 .h6-cta-row { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; margin-top: 28px; }
        #hv6 .h6-micro { font-size: 13px; color: var(--mut); margin: 14px auto 0; max-width: 560px; }
        #hv6 .h6-panel { border-radius: 32px; padding: 28px 28px 0; background: linear-gradient(180deg, var(--t2), var(--t) 60%, #fff 140%); transition: background .6s ease; box-shadow: inset 0 1px 0 rgba(255,255,255,.6); }
        #hv6 .h6-ptabs { display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; margin-bottom: 26px; }
        #hv6 .h6-ptab { position: relative; display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,.55); border: 1px solid rgba(255,255,255,.7); color: var(--ink-2); border-radius: 999px; padding: 8px 16px 8px 8px; font-family: inherit; font-weight: 600; font-size: 14.5px; cursor: pointer; overflow: hidden; transition: background .2s, color .2s; }
        #hv6 .h6-ptab.is-on { background: #fff; color: var(--ink); box-shadow: 0 8px 22px rgba(22,22,28,.08); }
        #hv6 .h6-ptab-ico { width: 30px; height: 30px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; background: var(--t); color: var(--ink); }
        #hv6 .h6-ptab.is-on .h6-ptab-ico { background: var(--ink); color: #fff; }
        #hv6 .h6-ptab-prog { position: absolute; left: 0; bottom: 0; height: 2px; width: 100%; background: var(--ink); transform-origin: left; }
        #hv6 .h6-showcase { display: grid; grid-template-columns: .9fr 1.1fr; gap: 28px; background: #fff; border-radius: 24px 24px 0 0; padding: 36px 36px 0; align-items: center; animation: h6fade .5s ease; }
        @keyframes h6fade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        #hv6 .h6-chip { display: inline-flex; align-items: center; gap: 7px; font-size: 13px; font-weight: 600; color: var(--ink); background: var(--t, var(--sky)); border-radius: 999px; padding: 6px 12px 6px 9px; }
        #hv6 .h6-showcase-copy { padding-bottom: 32px; }
        #hv6 .h6-showcase-copy h3 { font-size: clamp(24px, 2.6vw, 34px); font-weight: 700; letter-spacing: -.03em; line-height: 1.1; margin: 14px 0 12px; }
        #hv6 .h6-showcase-copy p { color: var(--ink-2); font-size: 16px; line-height: 1.6; margin: 0 0 16px; }
        #hv6 .h6-showcase-ai { display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--ink-2); background: var(--bg); border: 1px solid var(--line); border-radius: 12px; padding: 10px 12px; margin-bottom: 18px; }
        #hv6 .h6-showcase-media { align-self: end; border-radius: 16px 16px 0 0; overflow: hidden; background: var(--t); padding: 16px 16px 0; }
        #hv6 .h6-showcase-media img { display: block; width: 100%; height: 340px; object-fit: cover; object-position: top; border-radius: 12px 12px 0 0; box-shadow: 0 -10px 40px rgba(22,22,28,.12); }
        #hv6 .h6-showcase-media.is-mock { align-self: center; border-radius: 16px; padding: 18px; margin-bottom: 32px; }
        #hv6 .h6-m-ai { display: grid; gap: 12px; }
        #hv6 .h6-chat-h { display: flex; align-items: center; justify-content: space-between; font-size: 11.5px; color: var(--mut); padding-bottom: 8px; border-bottom: 1px solid var(--line); }
        #hv6 .h6-bub { max-width: 90%; padding: 9px 12px; border-radius: 12px; font-size: 13px; line-height: 1.4; opacity: 0; transform: translateY(6px); animation: h6bub .45s ease forwards; }
        #hv6 .h6-bub.u { margin-left: auto; background: var(--ink); color: #fff; border-bottom-right-radius: 4px; }
        #hv6 .h6-bub.a { background: var(--sky); color: var(--ink); border-bottom-left-radius: 4px; } #hv6 .h6-bub.a svg { vertical-align: -2px; margin-right: 5px; color: var(--verde); }
        #hv6 .h6-bub.a.ok { background: var(--lime); }
        #hv6 .h6-bub:nth-child(2) { animation-delay: .9s } #hv6 .h6-bub:nth-child(3) { animation-delay: 1.6s } #hv6 .h6-bub:nth-child(4) { animation-delay: 2.3s } #hv6 .h6-bub:nth-child(5) { animation-delay: 2.9s }
        @keyframes h6bub { to { opacity: 1; transform: none; } }
        #hv6 .h6-b-phone-top { position: absolute; top: 14px; left: 50%; transform: translateX(-50%); width: 70px; height: 18px; border-radius: 999px; background: #0D0D12; z-index: 2; }

        /* faixa de logos do hero */
        #hv6 .h6-logos { display: grid; grid-template-columns: auto auto; gap: 10px 18px; justify-content: center; align-items: center; margin: 0 auto 32px; }
        #hv6 .h6-logos-g { display: flex; align-items: center; gap: 14px; }
        #hv6 .h6-logos-l { font-size: 11.5px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--mut); white-space: nowrap; text-align: right; }
        #hv6 .h6-logos-row { display: flex; align-items: center; gap: 9px; flex-wrap: wrap; }
        #hv6 .h6-blogo { display: inline-flex; align-items: center; gap: 8px; background: #fff; border: 1px solid var(--line); border-radius: 999px; padding: 8px 15px 8px 10px; }
        #hv6 .h6-blogo b { font-size: 14.5px; font-weight: 600; letter-spacing: -.01em; color: var(--ink); white-space: nowrap; opacity: 1; }
        #hv6 .h6-blogo svg, #hv6 .h6-int-item svg { flex-shrink: 0; }
        #hv6 .h6-lg { display: block; object-fit: contain; flex-shrink: 0; }
        #hv6 .h6-mono { display: inline-flex; align-items: center; justify-content: center; border-radius: 6px; font-size: 12px; font-weight: 800; line-height: 1; flex-shrink: 0; }

        /* brands */
        #hv6 .h6-brands { padding: 48px 0 8px; text-align: center; }
        #hv6 .h6-brands-l { font-size: 13px; color: var(--mut); margin: 0 0 22px; }
        #hv6 .h6-marquee { overflow: hidden; -webkit-mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); }
        #hv6 .h6-marquee-track { display: flex; gap: 56px; width: max-content; animation: h6marq 40s linear infinite; } #hv6 .h6-marquee:hover .h6-marquee-track { animation-play-state: paused; }
        @keyframes h6marq { to { transform: translateX(-50%); } }
        #hv6 .h6-brand { display: inline-flex; flex-direction: column; align-items: center; gap: 4px; color: var(--ink-2); }
        #hv6 .h6-brand img { height: 26px; width: auto; filter: brightness(0) opacity(.75); } #hv6 .h6-brand b { font-weight: 700; font-size: 20px; letter-spacing: -.02em; opacity: .8; } #hv6 .h6-brand em { font-style: normal; font-size: 11px; color: var(--mut); }

        /* sections */
        #hv6 .h6-sec { padding: 96px 0; }
        #hv6 .h6-sec-alt { background: #fff; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
        #hv6 .h6-head { max-width: 780px; margin-bottom: 44px; } #hv6 .h6-head.h6-center { margin-left: auto; margin-right: auto; text-align: center; }
        #hv6 h2 { font-size: clamp(30px, 4vw, 48px); font-weight: 700; letter-spacing: -.04em; line-height: 1.06; margin: 14px 0 0; }
        #hv6 .h6-head p, #hv6 .h6-sub { color: var(--ink-2); font-size: 17px; line-height: 1.6; margin: 18px 0 0; }

        /* canais */
        #hv6 .h6-channels { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
        #hv6 .h6-channel { background: #fff; border: 1px solid var(--line); border-radius: 18px; padding: 22px; transition: transform .2s, box-shadow .2s; }
        #hv6 .h6-channel:hover { transform: translateY(-3px); box-shadow: 0 16px 36px rgba(22,22,28,.07); }
        #hv6 .h6-ch-ico { width: 40px; height: 40px; border-radius: 12px; background: var(--lavender); color: var(--roxo-2); display: inline-flex; align-items: center; justify-content: center; }
        #hv6 .h6-channel b { display: block; font-size: 16.5px; margin-top: 14px; letter-spacing: -.01em; } #hv6 .h6-channel p { margin: 6px 0 0; font-size: 14px; color: var(--ink-2); line-height: 1.5; }
        #hv6 .h6-ailine { margin-top: 18px; display: flex; align-items: center; gap: 12px; background: var(--lavender); border-radius: 14px; padding: 14px 18px; font-size: 15px; color: var(--ink-2); } #hv6 .h6-ailine b { color: var(--ink); }

        /* tour bar */
        #hv6 .h6-tour { position: sticky; top: 72px; z-index: 40; background: rgba(251,250,246,.92); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
        #hv6 .h6-tour-in { display: flex; align-items: center; gap: 18px; height: 54px; }
        #hv6 .h6-tour-l { font-size: 11px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: var(--mut); white-space: nowrap; }
        #hv6 .h6-tour-tabs { display: flex; gap: 4px; overflow-x: auto; scrollbar-width: none; } #hv6 .h6-tour-tabs::-webkit-scrollbar { display: none; }
        #hv6 .h6-tab { display: inline-flex; align-items: center; gap: 7px; padding: 5px 12px 5px 5px; border-radius: 999px; font-size: 13.5px; font-weight: 500; color: var(--ink-2); white-space: nowrap; transition: background .2s, color .2s; }
        #hv6 .h6-tab-ico { width: 26px; height: 26px; border-radius: 50%; background: rgba(22,22,28,.06); display: inline-flex; align-items: center; justify-content: center; } #hv6 .h6-tab.is-on .h6-tab-ico { background: rgba(255,255,255,.16); } #hv6 .h6-tab:hover { background: rgba(22,22,28,.05); } #hv6 .h6-tab.is-on { background: var(--ink); color: #fff; } #hv6 .h6-tab.is-on svg { opacity: 1; }

        /* produtos */
        #hv6 .h6-prod { padding: 88px 0; scroll-margin-top: 130px; border-bottom: 1px solid var(--line); }
        #hv6 .h6-prod-grid { display: grid; grid-template-columns: 1fr 1.15fr; gap: 64px; align-items: center; }
        #hv6 .h6-prod.is-rev .h6-prod-copy { order: 1; }
        #hv6 .h6-prod h2 { font-size: clamp(28px, 3.3vw, 42px); }
        #hv6 .h6-feats { list-style: none; margin: 22px 0 0; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 8px 16px; }
        #hv6 .h6-feats li { display: flex; align-items: center; gap: 8px; font-size: 14.5px; color: var(--ink-2); } #hv6 .h6-feats li svg { color: var(--verde); flex-shrink: 0; }
        #hv6 .h6-subs { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 24px; }
        #hv6 .h6-sub-card { background: #fff; border: 1px solid var(--line); border-radius: 16px; padding: 16px 18px; }
        #hv6 .h6-sub-h { display: flex; align-items: center; gap: 9px; font-size: 15.5px; font-weight: 600; letter-spacing: -.01em; }
        #hv6 .h6-sub-ico { width: 28px; height: 28px; border-radius: 9px; background: var(--t); color: var(--ink); display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
        #hv6 .h6-sub-card ul { list-style: none; margin: 12px 0 0; padding: 0; display: grid; gap: 6px; }
        #hv6 .h6-sub-card li { display: flex; align-items: flex-start; gap: 7px; font-size: 13.5px; color: var(--ink-2); line-height: 1.45; }
        #hv6 .h6-sub-card li svg { color: var(--verde); flex-shrink: 0; margin-top: 2px; }

        #hv6 .h6-ai { margin-top: 26px; border-radius: 16px; padding: 18px 20px; background: #fff; border: 1px solid rgba(143,40,246,.28); position: relative; box-shadow: 0 10px 30px rgba(143,40,246,.08); }
        #hv6 .h6-ai::before { content: ""; position: absolute; left: 0; top: 14px; bottom: 14px; width: 3px; border-radius: 3px; background: linear-gradient(180deg, var(--roxo), #B06BFF); }
        #hv6 .h6-ai-h { margin-bottom: 8px; } #hv6 .h6-ai b { display: block; font-size: 16.5px; letter-spacing: -.01em; } #hv6 .h6-ai p { margin: 6px 0 0; font-size: 14.5px; color: var(--ink-2); line-height: 1.55; }
        #hv6 .h6-prod-copy .h6-textlink { margin-top: 22px; }
        #hv6 .h6-visual-bg { border-radius: 28px; background: linear-gradient(160deg, var(--t2), var(--t)); padding: 28px; min-height: 460px; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; }

        /* mocks */
        #hv6 .h6-mock { position: relative; width: 100%; }
        #hv6 .h6-m-phone { width: 210px; height: 420px; border-radius: 28px; background: #0D0D12; padding: 9px; box-shadow: 0 30px 60px rgba(22,22,28,.25); position: relative; overflow: hidden; flex-shrink: 0; }
        #hv6 .h6-m-phone img { border-radius: 20px; }
        #hv6 .h6-m-store { display: flex; gap: 22px; align-items: center; justify-content: center; }
        #hv6 .h6-m-agents { background: #fff; border-radius: 18px; padding: 16px; box-shadow: 0 20px 50px rgba(22,22,28,.12); width: 270px; display: grid; gap: 10px; }
        #hv6 .h6-m-agents-h { display: flex; flex-direction: column; align-items: flex-start; gap: 6px; font-size: 11.5px; color: var(--mut); padding-bottom: 8px; border-bottom: 1px solid var(--line); }
        #hv6 .h6-m-agent { display: flex; gap: 10px; align-items: flex-start; } #hv6 .h6-m-agent svg { color: var(--verde); margin-top: 3px; flex-shrink: 0; }
        #hv6 .h6-m-agent b { display: block; font-size: 13.5px; } #hv6 .h6-m-agent span { font-size: 12px; color: var(--mut); }
        #hv6 .h6-m-frame { border-radius: 16px; overflow: hidden; background: #fff; box-shadow: 0 24px 60px rgba(22,22,28,.18); max-height: 420px; }
        #hv6 .h6-m-frame img { display: block; width: 100%; height: auto; object-fit: cover; object-position: top; }
        #hv6 .h6-m-frame.tall { max-height: 460px; } #hv6 .h6-m-frame.wide { max-height: none; border-radius: 12px; } #hv6 .h6-m-promo { display: grid; gap: 14px; } #hv6 .h6-m-proof { background: #fff; border-radius: 18px; padding: 12px; box-shadow: 0 20px 50px rgba(22,22,28,.12); } #hv6 .h6-m-proof-l { display: flex; align-items: center; font-size: 12px; font-weight: 600; color: var(--ink-2); padding: 2px 4px 10px; }
        #hv6 .h6-m-float { position: absolute; background: #fff; border: 1px solid var(--line); border-radius: 14px; padding: 10px 14px; box-shadow: 0 14px 34px rgba(22,22,28,.14); font-size: 12.5px; display: grid; gap: 2px; }
        #hv6 .h6-m-float b { font-size: 13.5px; } #hv6 .h6-m-float span { color: var(--mut); } #hv6 .h6-m-float .h6-aitag { color: #fff; } #hv6 .h6-m-float .h6-aitag { justify-self: start; margin-bottom: 4px; }
        #hv6 .h6-m-float.fl1 { right: -8px; bottom: 26px; } #hv6 .h6-m-float.fl2 { left: -8px; top: -16px; } #hv6 .h6-m-float.fl3 { position: static; grid-column: 1 / -1; display: flex; align-items: center; gap: 10px; } #hv6 .h6-m-float.fl3 .h6-aitag { margin: 0; } #hv6 .h6-m-float.fl3 span { margin-left: auto; } #hv6 .h6-m-float.fl4 { left: 14px; bottom: 14px; display: flex; align-items: center; font-weight: 600; }
        #hv6 .h6-m-pay { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        #hv6 .h6-m-stat { background: #fff; border-radius: 16px; padding: 16px; box-shadow: 0 14px 34px rgba(22,22,28,.1); display: grid; gap: 4px; }
        #hv6 .h6-m-stat span { font-size: 11.5px; color: var(--mut); } #hv6 .h6-m-stat b { font-size: 26px; letter-spacing: -.03em; line-height: 1.05; } #hv6 .h6-m-stat em { font-style: normal; font-size: 11.5px; color: var(--ink-2); }
        #hv6 .h6-m-credit { grid-column: 1 / -1; background: var(--ink); color: #fff; border-radius: 18px; padding: 18px; box-shadow: 0 20px 50px rgba(22,22,28,.25); }
        #hv6 .h6-m-credit-h { display: flex; justify-content: space-between; align-items: baseline; font-size: 13px; } #hv6 .h6-m-credit-h b { font-size: 20px; letter-spacing: -.02em; }
        #hv6 .h6-m-credit-bar { height: 8px; border-radius: 999px; background: rgba(255,255,255,.12); margin: 14px 0 10px; overflow: hidden; } #hv6 .h6-m-credit-bar i { display: block; height: 100%; width: 62%; border-radius: 999px; background: linear-gradient(90deg, var(--roxo), var(--neon)); }
        #hv6 .h6-m-credit-f { display: flex; justify-content: space-between; font-size: 12px; color: rgba(255,255,255,.7); }
        #hv6 .h6-chat { background: #fff; border-radius: 18px; padding: 14px; box-shadow: 0 20px 50px rgba(22,22,28,.12); display: grid; gap: 8px; width: 100%; }
        #hv6 .h6-m-shot { position: relative; padding: 0 0 96px; } #hv6 .h6-m-shot-img { display: block; width: 78%; border-radius: 14px; box-shadow: 0 20px 50px rgba(22,22,28,.14); } #hv6 .h6-m-shot-float { position: absolute; right: -6px; bottom: 0; width: 300px; }
        #hv6 .h6-m-creators, #hv6 .h6-m-ops, #hv6 .h6-m-data { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; align-items: start; }
        #hv6 .h6-m-subcard, #hv6 .h6-m-order, #hv6 .h6-m-list, #hv6 .h6-m-panel { background: #fff; border-radius: 18px; padding: 16px; box-shadow: 0 20px 50px rgba(22,22,28,.12); display: grid; gap: 10px; }
        #hv6 .h6-m-subcard-h, #hv6 .h6-m-order-h, #hv6 .h6-m-list-h, #hv6 .h6-m-panel-h { display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: var(--mut); padding-bottom: 8px; border-bottom: 1px solid var(--line); }
        #hv6 .h6-m-subcard-h b, #hv6 .h6-m-order-h b { color: var(--ink); font-size: 13px; } #hv6 .h6-m-order-h b.ok { color: var(--verde); } #hv6 .h6-m-list-h em, #hv6 .h6-m-panel-h em { font-style: normal; }
        #hv6 .h6-m-subrow { display: flex; justify-content: space-between; gap: 10px; font-size: 12.5px; } #hv6 .h6-m-subrow span { color: var(--mut); } #hv6 .h6-m-subrow b { font-weight: 600; text-align: right; display: inline-flex; align-items: center; gap: 4px; }
        #hv6 .h6-m-cre { display: grid; grid-template-columns: 84px 58px 1fr 68px; align-items: center; gap: 8px; font-size: 12px; } #hv6 .h6-m-cre b { font-weight: 600; } #hv6 .h6-m-cre code { font-size: 10.5px; padding: 2px 5px; } #hv6 .h6-m-cre i { height: 8px; border-radius: 999px; background: var(--sky); overflow: hidden; display: block; } #hv6 .h6-m-cre i span { display: block; height: 100%; background: var(--roxo); border-radius: 999px; } #hv6 .h6-m-cre em { font-style: normal; color: var(--mut); text-align: right; }
        #hv6 .h6-m-src { display: grid; grid-template-columns: 76px 1fr 38px; align-items: center; gap: 8px; font-size: 12px; } #hv6 .h6-m-src i { height: 8px; border-radius: 999px; background: var(--lavender); overflow: hidden; display: block; } #hv6 .h6-m-src i span { display: block; height: 100%; background: linear-gradient(90deg, var(--roxo), #B06BFF); border-radius: 999px; } #hv6 .h6-m-src b { text-align: right; }
        #hv6 .h6-m-panel-f { display: flex; justify-content: space-between; font-size: 12px; color: var(--mut); padding-top: 8px; border-top: 1px solid var(--line); } #hv6 .h6-m-panel-f b { color: var(--ink); }

        /* unbox ai band */
        #hv6 .h6-aiband { background: radial-gradient(60% 80% at 85% 0%, rgba(143,40,246,.45), transparent 60%), radial-gradient(40% 60% at 0% 100%, rgba(57,255,20,.14), transparent 60%), #0F0F14; color: #fff; }
        #hv6 .h6-aiband .h6-head { max-width: 1000px; } #hv6 .h6-aiband .h6-head p { color: rgba(255,255,255,.7); } #hv6 .h6-aiband .h6-dot { box-shadow: 0 0 0 3px rgba(57,255,20,.2); background: var(--neon); }
        #hv6 .h6-pillars { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        #hv6 .h6-pillar { background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1); border-radius: 22px; padding: 26px; display: flex; flex-direction: column; gap: 10px; }
        #hv6 .h6-pillar-ico { width: 42px; height: 42px; border-radius: 12px; background: rgba(143,40,246,.25); color: #D9C2FF; display: inline-flex; align-items: center; justify-content: center; }
        #hv6 .h6-pillar-t { font-size: 11.5px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: #C9A8FF; margin-top: 6px; }
        #hv6 .h6-pillar h3 { margin: 0; font-size: 24px; letter-spacing: -.025em; } #hv6 .h6-pillar p { margin: 0; color: rgba(255,255,255,.7); font-size: 14.5px; line-height: 1.55; flex: 1; }
        #hv6 .h6-term { background: #0D0D12; border: 1px solid rgba(255,255,255,.08); border-radius: 12px; padding: 12px 14px; font-family: var(--mono); font-size: 12px; color: #a6a6b3; line-height: 1.8; margin-top: 6px; }
        #hv6 .h6-term-cmd { color: #fff; } #hv6 .h6-term-cmd span { color: var(--neon); margin-right: 6px; } #hv6 .h6-term-line .w { color: #fff; } #hv6 .h6-term-line.ok { color: var(--neon); }
        #hv6 .h6-agents { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px; } #hv6 .h6-agents span { display: inline-flex; align-items: center; gap: 5px; font-size: 12px; padding: 6px 10px; border-radius: 999px; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.1); } #hv6 .h6-agents svg { color: #C9A8FF; }
        #hv6 .h6-pillar .h6-textlink { margin-top: 10px; }
        #hv6 .h6-migrate { display: flex; align-items: center; gap: 22px; flex-wrap: wrap; margin-top: 22px; padding: 16px 22px; border-radius: 16px; background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1); color: rgba(255,255,255,.75); font-size: 14px; }
        #hv6 .h6-migrate img { height: 20px; width: auto; background: #fff; padding: 7px 12px; border-radius: 10px; box-sizing: content-box; } #hv6 .h6-migrate-t { flex: 1; min-width: 260px; }

        /* porte */
        #hv6 .h6-sizes { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        #hv6 .h6-size { position: relative; overflow: hidden; border-radius: 22px; padding: 26px 24px 130px; background: #fff; border: 1px solid var(--line); display: flex; flex-direction: column; transition: transform .2s, box-shadow .2s; } #hv6 .h6-size:hover { transform: translateY(-4px); box-shadow: 0 18px 40px rgba(22,22,28,.08); }
        #hv6 .h6-size-blob { position: absolute; left: -10%; right: -10%; bottom: -70px; height: 190px; border-radius: 50% 50% 0 0; background: radial-gradient(60% 80% at 50% 100%, var(--t2), var(--t) 60%, transparent 100%); opacity: .9; pointer-events: none; }
        #hv6 .h6-size-eye { font-size: 11px; font-weight: 700; letter-spacing: .16em; color: var(--ink); background: var(--t); border-radius: 8px; padding: 5px 10px; align-self: flex-start; }
        #hv6 .h6-size h3 { font-size: 24px; letter-spacing: -.025em; margin: 16px 0 8px; } #hv6 .h6-size p { margin: 0 0 18px; color: var(--ink-2); font-size: 14.5px; line-height: 1.55; flex: 1; } #hv6 .h6-size .h6-textlink { position: relative; z-index: 1; }

        /* integrações */
        #hv6 .h6-split { display: grid; grid-template-columns: 1fr 1.1fr; gap: 64px; align-items: center; }
        #hv6 .h6-split-copy h2 { font-size: clamp(28px, 3.3vw, 42px); } #hv6 .h6-split-copy .h6-textlink { margin-top: 22px; }
        #hv6 .h6-int { display: grid; gap: 18px; }
        #hv6 .h6-int-l { display: block; font-size: 11px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: var(--mut); margin-bottom: 8px; }
        #hv6 .h6-int-items { display: flex; flex-wrap: wrap; gap: 8px; }
        #hv6 .h6-int-item { display: inline-flex; align-items: center; gap: 8px; background: var(--bg); border: 1px solid var(--line); border-radius: 999px; padding: 9px 14px; font-size: 14px; font-weight: 500; color: var(--ink-2); }
        #hv6 .h6-int-item.is-ai { color: var(--ink); border-color: rgba(143,40,246,.35); background: #fff; }

        /* comparativo */
        #hv6 .h6-cmp-wrap { overflow-x: auto; }
        #hv6 .h6-cmp { width: 100%; min-width: 760px; border-collapse: separate; border-spacing: 0; }
        #hv6 .h6-cmp th, #hv6 .h6-cmp td { text-align: center; padding: 14px 10px; }
        #hv6 .h6-cmp thead th { font-size: 14px; font-weight: 600; color: var(--ink-2); border-bottom: 1px solid var(--line); }
        #hv6 .h6-cmp thead th.is-us { color: var(--ink); font-weight: 700; background: var(--lavender); border-radius: 14px 14px 0 0; }
        #hv6 .h6-cmp tbody th { text-align: left; width: 38%; padding: 16px 18px 16px 0; border-bottom: 1px solid var(--line); font-weight: 400; }
        #hv6 .h6-cmp tbody th b { display: block; font-size: 16px; font-weight: 600; letter-spacing: -.01em; }
        #hv6 .h6-cmp tbody th span { display: block; font-size: 13.5px; color: var(--ink-2); line-height: 1.5; margin-top: 4px; }
        #hv6 .h6-cmp tbody th em { display: block; font-style: normal; font-size: 12px; color: var(--mut); margin-top: 6px; }
        #hv6 .h6-cmp tbody td { border-bottom: 1px solid var(--line); }
        #hv6 .h6-cmp tbody td.is-us { background: var(--lavender); }
        #hv6 .h6-cmp tbody tr:last-child td.is-us { border-radius: 0 0 14px 14px; }
        #hv6 .h6-cmp-mark { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 50%; font-weight: 700; font-size: 15px; }
        #hv6 .h6-cmp .v-y .h6-cmp-mark { background: var(--verde); color: #fff; }
        #hv6 .h6-cmp .v-p .h6-cmp-mark { background: rgba(22,22,28,.07); color: var(--ink-2); }
        #hv6 .h6-cmp .v-n .h6-cmp-mark { color: var(--mut); }
        #hv6 .h6-cmp-legend { display: flex; gap: 22px; flex-wrap: wrap; justify-content: center; margin: 22px 0 0; font-size: 13px; color: var(--ink-2); }
        #hv6 .h6-cmp-legend span { display: inline-flex; align-items: center; gap: 7px; }
        #hv6 .h6-cmp-legend i { display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; border-radius: 50%; font-style: normal; font-weight: 700; font-size: 12px; }
        #hv6 .h6-cmp-legend .l-y { background: var(--verde); color: #fff; } #hv6 .h6-cmp-legend .l-p { background: rgba(22,22,28,.07); color: var(--ink-2); } #hv6 .h6-cmp-legend .l-n { color: var(--mut); }

        /* números, cases, faq, final, footer */
        #hv6 .h6-metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        #hv6 .h6-metric { background: #fff; border: 1px solid var(--line); border-radius: 20px; padding: 26px 24px; }
        #hv6 .h6-metric-n { font-size: clamp(34px, 3.6vw, 46px); font-weight: 700; letter-spacing: -.04em; line-height: 1; } #hv6 .h6-metric-n span { font-size: .6em; color: var(--roxo); margin-left: 2px; }
        #hv6 .h6-metric-l { color: var(--mut); font-size: 14px; margin-top: 10px; }
        #hv6 .h6-cases { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        #hv6 .h6-case { background: var(--bg); border: 1px solid var(--line); border-radius: 22px; padding: 18px; }
        #hv6 .h6-case-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 14px; }
        #hv6 .h6-case-logo { height: 26px; width: auto; max-width: 140px; object-fit: contain; } #hv6 .h6-case-logo.is-dark { filter: brightness(0); }
        #hv6 .h6-case-seg { font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--mut); }
        #hv6 .h6-cmp { position: relative; height: 360px; border-radius: 14px; overflow: hidden; background: #eee; user-select: none; }
        #hv6 .h6-cmp-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: top; }
        #hv6 .h6-cmp-after { position: absolute; inset: 0; clip-path: inset(0 0 0 var(--x)); }
        #hv6 .h6-cmp-bar { position: absolute; top: 0; bottom: 0; left: var(--x); width: 2px; background: #fff; box-shadow: 0 0 0 1px rgba(0,0,0,.15); pointer-events: none; }
        #hv6 .h6-cmp-bar i { position: absolute; top: 50%; left: 50%; width: 34px; height: 34px; border-radius: 50%; background: var(--ink); transform: translate(-50%,-50%); box-shadow: 0 6px 16px rgba(0,0,0,.25); }
        #hv6 .h6-cmp-bar i::before { content: "‹ ›"; color: #fff; font-size: 14px; font-weight: 700; position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; letter-spacing: 1px; }
        #hv6 .h6-cmp-tag { position: absolute; top: 12px; font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; padding: 5px 10px; border-radius: 999px; background: rgba(22,22,28,.75); color: #fff; pointer-events: none; }
        #hv6 .h6-cmp-tag.l { left: 12px; } #hv6 .h6-cmp-tag.r { right: 12px; background: var(--verde); }
        #hv6 .h6-cmp input[type=range] { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0; cursor: ew-resize; margin: 0; }
        #hv6 .h6-case-note { margin: 14px 0 0; font-size: 14px; color: var(--ink-2); line-height: 1.55; }
        #hv6 .h6-faq-item { border-top: 1px solid var(--line); } #hv6 .h6-faq-item:last-child { border-bottom: 1px solid var(--line); }
        #hv6 .h6-faq-q { width: 100%; display: flex; justify-content: space-between; align-items: center; gap: 16px; background: none; border: 0; padding: 22px 0; text-align: left; cursor: pointer; font-family: inherit; color: var(--ink); font-weight: 600; font-size: 17px; }
        #hv6 .h6-faq-q i { width: 30px; height: 30px; border-radius: 50%; border: 1px solid var(--line); display: inline-flex; align-items: center; justify-content: center; transition: transform .25s, background .2s; flex-shrink: 0; }
        #hv6 .h6-faq-item.is-open .h6-faq-q i { transform: rotate(45deg); background: var(--ink); color: #fff; border-color: var(--ink); }
        #hv6 .h6-faq-a { max-height: 0; overflow: hidden; transition: max-height .35s ease; } #hv6 .h6-faq-item.is-open .h6-faq-a { max-height: 300px; }
        #hv6 .h6-faq-a p { margin: 0 0 22px; color: var(--ink-2); font-size: 15.5px; line-height: 1.6; }
        #hv6 .h6-final-wrap { padding-top: 24px; }
        #hv6 .h6-final { border-radius: 32px; padding: 72px 40px; text-align: center; color: #fff; background: radial-gradient(70% 90% at 80% 0%, rgba(143,40,246,.6), transparent 60%), radial-gradient(50% 70% at 10% 100%, rgba(57,255,20,.22), transparent 60%), var(--ink); }
        #hv6 .h6-final h2 { margin: 0; } #hv6 .h6-final p { color: rgba(255,255,255,.72); font-size: 17px; margin: 16px auto 0; max-width: 560px; } #hv6 .h6-final .h6-cta-row { margin-top: 30px; justify-content: center; }
        #hv6 .h6-footer { padding: 56px 0 28px; border-top: 1px solid var(--line); }
        #hv6 .h6-footer-grid { display: grid; grid-template-columns: 1.6fr 1fr 1fr 1fr; gap: 32px; }
        #hv6 .h6-footer-brand p { color: var(--mut); font-size: 14px; margin-top: 12px; max-width: 280px; }
        #hv6 .h6-footer h4 { margin: 0 0 12px; font-size: 13px; letter-spacing: .1em; text-transform: uppercase; color: var(--mut); }
        #hv6 .h6-footer-grid a { display: block; font-size: 15px; padding: 5px 0; color: var(--ink-2); } #hv6 .h6-footer-grid a:hover { color: var(--ink); }
        #hv6 .h6-footer-bottom { margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--line); color: var(--mut); font-size: 13px; }

        @media (max-width: 980px) {
          #hv6 .h6-links, #hv6 .h6-nav-cta .h6-btn-ghost, #hv6 .h6-nav-cta .h6-btn-dark { display: none; } #hv6 .h6-burger { display: inline-flex; }
          #hv6 .h6-prod-grid, #hv6 .h6-split { grid-template-columns: 1fr; gap: 36px; }
          #hv6 .h6-showcase { grid-template-columns: 1fr; padding: 26px 22px 0; } #hv6 .h6-showcase-copy { padding-bottom: 8px; }
          #hv6 .h6-prod.is-rev .h6-prod-copy { order: 0; }
          #hv6 .h6-channels, #hv6 .h6-pillars, #hv6 .h6-sizes, #hv6 .h6-cases { grid-template-columns: 1fr; } #hv6 .h6-metrics-grid { grid-template-columns: repeat(2, 1fr); }
          #hv6 .h6-logos { grid-template-columns: 1fr; gap: 8px; justify-items: center; } #hv6 .h6-logos-g { flex-direction: column; gap: 8px; }
          #hv6 .h6-logos-l { text-align: center; } #hv6 .h6-logos-row { justify-content: center; }
          #hv6 .h6-tour-l { display: none; } #hv6 .h6-prod { padding: 64px 0; scroll-margin-top: 126px; }
          #hv6 .h6-footer-grid { grid-template-columns: 1fr 1fr; } #hv6 .h6-sec { padding: 72px 0; }
          #hv6 .h6-visual-bg { padding: 20px; min-height: 0; }
        }
        @media (max-width: 640px) {
          #hv6 .h6-subs, #hv6 .h6-metrics-grid, #hv6 .h6-footer-grid, #hv6 .h6-feats, #hv6 .h6-m-creators, #hv6 .h6-m-ops, #hv6 .h6-m-data { grid-template-columns: 1fr; } #hv6 .h6-cmp { height: 300px; }
          #hv6 .h6-m-store { flex-direction: column; } #hv6 .h6-m-pay { grid-template-columns: 1fr 1fr; } #hv6 .h6-m-float.fl3 { position: static; margin-top: 10px; grid-column: 1 / -1; }
          #hv6 .h6-panel { border-radius: 22px; padding: 18px 14px 0; } #hv6 .h6-ptab-lbl { display: none; } #hv6 .h6-ptab { padding: 6px; } #hv6 .h6-showcase-media img { height: 220px; }
          #hv6 .h6-m-shot { padding-bottom: 0; } #hv6 .h6-m-shot-img { width: 100%; } #hv6 .h6-m-shot-float { position: static; width: 100%; margin-top: 12px; }
        }
        @media (prefers-reduced-motion: reduce) { #hv6 [data-rv] { opacity: 1 !important; transform: none !important; } #hv6 .h6-marquee-track { animation: none; } #hv6 .h6-bub { opacity: 1; animation: none; } #hv6 .h6-showcase { animation: none; } }
      `}</style>
    </>
  )
}
