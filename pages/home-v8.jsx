/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import { URLS } from '../lib/config'
import DemoModal from '../components/DemoModal'

/* ─────────────────────────────────────────────────────────────
   Unbox · Home v8 — estratégia antes de layout.

   TESE (decidida com o Bruno): a Unbox faz a sua marca VENDER MAIS (A)
   com a operação NO AUTOMÁTICO (C). Checkout, Unbox Pay, assinatura e
   creators (B) não são a tese: são COMO a venda cresce.

   PÚBLICO: marca D2C que já vende e quer trocar de plataforma (venda
   consultiva). Acima de R$ 150 mil/mês → Projeto 10x. Quem constrói com
   AI → faixa própria no fim, nunca o hero.

   AÇÃO ÚNICA: diagnóstico gratuito (DemoModal → /api/demo-lead → Pipedrive).

   NARRATIVA DE TROCA, um trabalho por seção:
   1 Hero ........ promessa + painel de funcionalidades (decisão conquistada)
   2 Prova ....... quem vende com a Unbox e os números
   3 Custo ....... o que te empurra para fora da plataforma atual
   4 Receita ..... as 4 alavancas: resultado → número → mecanismo
   5 Automático .. o trabalho que sai das suas mãos
   6 Migração .... o medo de trocar, desmontado
   7 Começar ..... um caminho por estágio da marca

   Fontes, e só elas: Deck Set 26, site no ar, @unbox-plus/cli 0.21.6 e
   o Painel Unbox. Escopo #hv8 / h8-*.
   ───────────────────────────────────────────────────────────── */

const V = '?v=r26'
const CLI_CMD = 'npx --package=@unbox-plus/cli create-unbox-store'
const NPM_URL = 'https://www.npmjs.com/package/@unbox-plus/cli'

/* 1 · Hero: o painel de funcionalidades (decisão conquistada na v6/v7).
   "Saiba mais" abre a alavanca de receita correspondente na seção #receita. */
const SHOW = [
  { key: 'loja', label: 'Loja', icon: 'layout', tint: 'sky', title: 'Sua loja, do seu jeito. Sem template.', body: 'Layouts 100% customizáveis, mobile-first, com SEO e performance de ponta. Crie do zero pelo CLI, importe do Figma ou migre de onde estiver.', ai: 'Gerada pelo CLI e personalizada pelo agente de Branding', img: '/img/loja-olea.png', alt: 'Loja Olea rodando na Unbox', href: '#receita', lever: 0 },
  { key: 'checkout', label: 'Checkout', icon: 'bolt', tint: 'lime', title: 'Checkout em modo TURBO.', body: '3 etapas, sem redirecionamento, sem fricção. Pix, cartão em até 12× e boleto no mesmo fluxo. 4× mais conversão e +98% de aprovação.', ai: 'Anti-Fraude IA+ analisando cada pedido em tempo real', img: '/img/checkout-dash.png', alt: 'Checkout TURBO da Unbox', href: '#receita', lever: 0 },
  { key: 'assinatura', label: 'Assinatura', icon: 'repeat', tint: 'lavender', title: 'Recorrência que nasce no carrinho.', body: 'Assinatura 100% nativa, da página de produto ao checkout. Múltiplas frequências, gestão de falhas automática e cohort de LTV.', ai: 'Planos e regras de assinatura criados por texto, via MCP', img: '/img/assinatura2.png', alt: 'Assinatura nativa no carrinho', href: '#receita', lever: 2 },
  { key: 'pay', label: 'Unbox Pay', icon: 'card', tint: 'mint', title: 'Pagamento nativo, com as melhores taxas.', body: 'Gateway próprio com 98% de aprovação, multi provedores e retentativa automática. 1% no Pix e cartão a partir de 2,99%, sem taxa de saque.', ai: 'Gateway turbinado por AI para aprovar mais e custar menos', mock: 'pay', href: '#receita', lever: 1 },
  { key: 'ai', label: 'Unbox AI', icon: 'sparkle', tint: 'lavender', title: 'A loja começa com um comando.', body: 'O Unbox CLI gera o storefront com a sua marca aplicada. O MCP opera catálogo, pedidos e campanhas por texto. Agentes cuidam de branding, CRO, SEO e deploy.', ai: 'CLI público no npm · funciona com Claude, ChatGPT e Cursor', mock: 'ai', href: '#automatico' },
]

/* 4 · As alavancas de receita. Cada aba: resultado → número → mecanismo. */
const LEVERS = [
  { key: 'converter', label: 'Converter mais', icon: 'bolt', tint: 'lime',
    title: 'Mais visitas viram pedido.',
    body: 'Checkout nativo em 3 etapas, sem redirecionamento, com Pix, cartão em até 12× e boleto no mesmo fluxo. Order Bump, Upsell e bundles com desconto progressivo aumentam o ticket dentro do próprio pagamento.',
    stat: { n: '4×', l: 'mais conversão com o Checkout TURBO' }, how: 'Checkout TURBO',
    img: '/img/checkout-dash.png', alt: 'Checkout TURBO da Unbox' },
  { key: 'aprovar', label: 'Aprovar mais', icon: 'card', tint: 'mint',
    title: 'Menos venda perdida no pagamento.',
    body: 'Gateway próprio com multi provedores, retentativa automática e antifraude com análise ativa. 1% no Pix e cartão a partir de 2,99%, sem taxa de saque.',
    stat: { n: '98%', l: 'de aprovação no Unbox Pay' }, how: 'Unbox Pay', mock: 'pay' },
  { key: 'recompra', label: 'Vender de novo', icon: 'repeat', tint: 'lavender',
    title: 'A primeira venda vira receita todo mês.',
    body: 'Assinatura que nasce no carrinho, com upsell e cancelamento integrados, gestão de falhas automática e previsão de estoque pelas próximas cobranças.',
    stat: { n: '100%', l: 'nativa, do produto ao checkout' }, how: 'Assinatura Unbox',
    img: '/img/assinatura2.png', alt: 'Assinatura nativa no carrinho da Unbox' },
  { key: 'cac', label: 'Vender com menos CAC', icon: 'users', tint: 'sky',
    title: 'Um canal que só custa quando vende.',
    body: 'Creators da base Unbox divulgam seus produtos com link e cupom rastreados no seu checkout. Sem recrutar ninguém, e você só paga quando a venda acontece.',
    stat: { n: '~15%', l: 'de custo total por venda com creators' }, how: 'Unbox Growth · Creators', mock: 'creators' },
]

/* 2 · Prova */
const METRICS = [
  { num: 15, prefix: '+', suffix: ' mil', label: 'lojas cadastradas na Unbox' },
  { num: 5.9, prefix: '+', suffix: '×', label: 'crescimento médio de vendas', decimals: 1 },
  { num: 4, prefix: '', suffix: '×', label: 'mais conversão com o Checkout TURBO' },
  { num: 98, prefix: '', suffix: '%', label: 'de aprovação no Unbox Pay' },
]
const MARCAS = [
  { name: 'Bhava', logo: '/img/home7/marca-bhava.png', h: 22 }, { name: 'Alter Nativ', logo: '/img/home7/marca-alternativ.png', h: 34 },
  { name: 'Sunrize', logo: '/img/home7/marca-sunrize.png', h: 24 }, { name: 'Wish', logo: '/img/home7/marca-wish.png', h: 34 },
  { name: 'Pudim Beauty', logo: '/img/home7/marca-pudim.png', h: 34 }, { name: 'Badia', logo: '/img/badia-logo.svg', h: 30, dim: true },
  { name: 'Oddie Supply', logo: '/img/cases/logo-oddie.webp', h: 26, dim: true }, { name: 'Pamela Concept', logo: '/img/cases/logo-pamela.png', h: 26, dim: true },
]
const CASES = [
  { name: 'Oddie Supply', seg: 'Alimentos funcionais', logo: '/img/cases/logo-oddie.webp', before: '/img/cases/case-oddie-antes.jpg', after: '/img/cases/case-oddie-depois.jpg', note: 'A loja inteira remontada em torno de um produto só e de uma jornada de assinatura.' },
  { name: 'Pamela Concept', seg: 'Cuidado capilar', logo: '/img/cases/logo-pamela.png', dark: true, before: '/img/cases/case-pamela-antes.jpg', after: '/img/cases/case-pamela-depois.jpg', note: 'Cada problema (queda, caspa, brilho) virou um caminho claro de compra, em vez de uma prateleira de frascos.' },
  { name: 'Badia', seg: 'Temperos e especiarias', logo: '/img/cases/logo-badia.svg', before: '/img/cases/case-badia-antes.jpg', after: '/img/cases/case-badia-depois.jpg', note: 'Centenas de SKUs viraram uma jornada simples de comprar.' },
]

/* 3 · O custo de ficar. Dor → alavanca que resolve. */
const PAINS = [
  { n: '01', t: 'CAC subindo, cliente sumindo', d: 'O cliente compra uma vez e some. Cada nova venda custa mais que a anterior. Você está enchendo um balde furado.', fix: 'Assinatura nativa e creators pagos por venda' },
  { n: '02', t: 'Checkout que sangra receita', d: '70% dos carrinhos são abandonados. Redirecionamento, etapas demais, baixa aprovação: cada clique perdido é dinheiro que foi embora.', fix: 'Checkout TURBO em 3 etapas e 98% de aprovação' },
  { n: '03', t: 'Assinatura que não retém', d: 'Apps de terceiros desconectados, fluxo quebrado, cliente que não consegue pausar ou gerenciar. A recorrência vira promessa.', fix: 'Recorrência 100% nativa, com upsell e cancelamento integrados' },
  { n: '04', t: 'Uma operação que não para de pedir', d: 'Apps que não conversam, integração manual e planilha todo dia para descobrir o que vender.', fix: 'Uma plataforma só, com a AI operando e o Painel apontando o próximo passo' },
]
/* Legenda: 'y' nativo · 'p' via app/módulo/parceiro · 'n' não oferece.
   Toda célula de concorrente precisa de validação do time antes de ir ao ar. */
const CMP_COLS = ['Unbox', 'Shopify', 'Nuvemshop', 'Wake', 'VTEX']
const CMP_ROWS = [
  { t: 'Loja criada por AI', d: 'Do zero por briefing, importando do Figma ou migrando de outra plataforma.', v: ['y', 'n', 'n', 'n', 'n'] },
  { t: 'Operar por texto na sua AI', d: 'Servidor MCP aberto: catálogo, pedidos e campanhas pelo Claude, ChatGPT ou Cursor.', v: ['y', 'p', 'n', 'n', 'n'], note: 'Shopify tem assistente próprio no admin' },
  { t: 'Agentes de CRO, SEO e AEO', d: 'Embarcados no projeto da loja, rodam quando você quiser.', v: ['y', 'n', 'n', 'n', 'n'] },
  { t: 'Bundles e combos nativos', d: 'Kits com desconto progressivo montados no painel, sem instalar nada.', v: ['y', 'p', 'p', 'p', 'p'] },
  { t: 'Order Bump e Upsell no checkout', d: 'Oferta adicional dentro do próprio fluxo de pagamento.', v: ['y', 'p', 'p', 'p', 'p'] },
  { t: 'Assinatura e recorrência', d: 'Do produto ao checkout, sem depender de app de terceiro.', v: ['y', 'p', 'p', 'p', 'p'] },
  { t: 'Checkout e gateway na mesma casa', d: 'Checkout de 3 etapas e pagamento próprio, sem integração externa.', v: ['y', 'p', 'y', 'p', 'p'], note: 'Shopify Payments não opera no Brasil: gateway via parceiro' },
  { t: 'Cobrança e suporte em real', d: 'Mensalidade em BRL e equipe brasileira acompanhando a migração.', v: ['y', 'n', 'y', 'y', 'y'], note: 'Shopify precifica em US$ no Brasil' },
]

/* 4 · No automático. Cada aba = um trabalho que sai das suas mãos. */
const AUTO = [
  { key: 'criar', label: 'Criar a loja', icon: 'layout',
    title: 'A loja nasce com a sua marca aplicada.',
    body: 'O Unbox CLI monta o storefront a partir do site atual, do Instagram e do objetivo da marca. O agente de Branding conduz o briefing e personaliza tudo antes de você ver a versão padrão. Depois, ajustes por chat ou pelo painel visual.',
    feats: ['Público no npm', '4 estilos de partida', 'Editor por chat e painel visual'] },
  { key: 'operar', label: 'Operar por texto', icon: 'bolt',
    title: 'Preço, estoque, cupom e campanha em uma frase.',
    body: 'Pela AI que você já usa, conectada à loja via MCP. Ela prepara a mudança, você confirma, ela publica. Leituras são diretas e toda escrita fica registrada.',
    feats: ['Claude, ChatGPT e Cursor', 'Escrita só com a sua confirmação', 'Print real na Temperos Badia'] },
  { key: 'decidir', label: 'Decidir o próximo passo', icon: 'sparkle', beta: true,
    title: 'O Painel aponta onde crescer.',
    body: 'Escreva a campanha que quer fazer, como “Dia das Mães com brinde”, ou escolha um caminho: aumentar conversão, aumentar ticket médio ou montar a campanha passo a passo com cupom, brinde, kit, frete e Pix.',
    feats: ['Assistente no Painel (beta)', 'Curva ABC e catálogo parado', 'Clientes e recompra'] },
  { key: 'recuperar', label: 'Recuperar receita', icon: 'repeat',
    title: 'O que ia virar prejuízo aparece antes.',
    body: 'Assinaturas com erro de cobrança, carrinhos abandonados e produto que vai faltar pelas próximas assinaturas ficam visíveis no Painel, sem planilha.',
    feats: ['Assinaturas com erro', 'Relatório de carrinhos abandonados', 'Previsão de estoque'] },
]
const AGENTES = ['15 · Branding', '16 · QA Visual', '13 · CRO', '14 · SEO', '17 · AEO', '12 · Deploy']

/* 5 · Migração */
const STEPS = [
  { n: '01', t: 'Demo + diagnóstico gratuito', d: 'A gente entende sua operação antes de qualquer proposta. Sem compromisso.' },
  { n: '02', t: 'Migração assistida pela equipe', d: 'Nossa equipe faz a migração com você. Você não precisa fazer nada sozinho.' },
  { n: '03', t: 'Suporte humano de verdade', d: 'WhatsApp, chat e e-mail com especialistas que conhecem a sua operação.' },
]
const INTEGRATIONS = [
  { g: 'Canais de venda', items: [{ n: 'Instagram Shopping', k: 'instagram' }, { n: 'Facebook & Meta', k: 'meta' }, { n: 'WhatsApp', k: 'whatsapp' }, { n: 'Google Shopping', k: 'google' }] },
  { g: 'ERP e logística', items: [{ n: 'Bling', k: 'bling' }, { n: 'Intelipost', k: 'intelipost' }, { n: 'Correios', k: 'correios' }, { n: 'Total Express', k: 'totalexpress' }] },
  { g: 'Rastreio e dados', items: [{ n: 'Google Analytics', k: 'ga' }, { n: 'Tag Manager', k: 'gtm' }, { n: 'TikTok', k: 'tiktok' }, { n: 'Pinterest', k: 'pinterest' }] },
]

const FAQ = [
  { q: 'Como funciona a migração?', a: 'Começa por um diagnóstico gratuito da sua operação. Depois, nossa equipe faz a migração com você, sem você precisar fazer nada sozinho, e segue com suporte humano por WhatsApp, chat e e-mail.' },
  { q: 'Meu SEO é preservado na migração?', a: 'Sim. Cuidamos dos redirects e da estrutura de URLs para preservar seu ranqueamento e o tráfego orgânico que você já conquistou.' },
  { q: 'Preciso de time técnico para operar?', a: 'Não. A loja é editada por chat e por painel visual, e a operação do dia a dia (preço, estoque, cupom, campanha) sai de uma frase na AI que você já usa.' },
  { q: 'A AI vai mexer na minha loja sem eu saber?', a: 'Não. Leituras são diretas; qualquer escrita (preço, cupom, campanha, regra de assinatura) passa por duas etapas: preparar e confirmar. Tudo fica registrado.' },
  { q: 'Quanto custa?', a: 'Depende do estágio da operação. A proposta sai do diagnóstico gratuito, com implementação, plano e Unbox Fee abertos antes de você decidir.' },
  { q: 'Para quem é o Projeto 10x?', a: 'Para marcas acima de R$ 150 mil/mês que querem a Unbox como parceira estratégica de crescimento, com um Head de Growth embarcado atuando como Board Member.' },
  { q: 'Existe limite de produtos ou de visitas?', a: 'Não. Nenhum plano cobra a mais por acessos ou por catálogo: produtos e visitas ilimitados.' },
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
    case 'link': return <svg {...p}><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" /><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" /></svg>
    case 'gift': return <svg {...p}><rect x="3" y="8" width="18" height="13" rx="2" /><path d="M3 12h18M12 8v13M12 8S10.5 3 8 3.8C6 4.5 7 8 12 8Zm0 0s1.5-5 4-4.2C18 4.5 17 8 12 8Z" /></svg>
    case 'megaphone': return <svg {...p}><path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1Z" /><path d="M15 9a3.5 3.5 0 0 1 0 6M18 6a8 8 0 0 1 0 12" /></svg>
    case 'monitor': return <svg {...p}><rect x="2.5" y="4" width="19" height="13" rx="2" /><path d="M8 21h8M12 17v4" /></svg>
    case 'phone': return <svg {...p}><rect x="6.5" y="2.5" width="11" height="19" rx="2.5" /><path d="M11 18h2" /></svg>
    case 'copy': return <svg {...p}><rect x="8" y="8" width="13" height="13" rx="2" /><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" /></svg>
    case 'quote': return <svg {...p}><path d="M9 7H5v6h4V7ZM9 13c0 2.5-1.5 4-4 4M19 7h-4v6h4V7ZM19 13c0 2.5-1.5 4-4 4" /></svg>
    default: return null
  }
}


function Logo() {
  return <a href="/" className="h8-logo" aria-label="Unbox"><img src={'/img/simbolo-unbox.png' + V} alt="" /><span>unbox</span></a>
}

const BRANDS_CREATE = [{ k: 'claude', name: 'Claude' }, { k: 'openai', name: 'OpenAI' }, { k: 'figma', name: 'Figma' }]
const BRANDS_MIGRATE = [{ k: 'shopify', name: 'Shopify' }, { k: 'nuvemshop', name: 'Nuvemshop' }, { k: 'woo', name: 'WooCommerce' }]

/* Logos oficiais em /public/img/brands. `wm` = arquivo já traz o nome (chip
   não repete o texto) e guarda a proporção largura/altura. */
const LOGOS = {
  claude: { f: 'claude.svg' }, figma: { f: 'figma.svg' }, shopify: { f: 'shopify.svg' },
  woo: { f: 'woocommerce.png' }, cursor: { f: 'cursor.svg' }, instagram: { f: 'instagram.svg' },
  whatsapp: { f: 'whatsapp.svg' }, meta: { f: 'meta.svg' }, google: { f: 'google.svg' },
  ga: { f: 'googleanalytics.svg' }, gtm: { f: 'googletagmanager.svg' }, openai: { f: 'openai.svg' },
  tiktok: { f: 'tiktok.svg' }, pinterest: { f: 'pinterest.svg' },
  nuvemshop: { f: 'nuvemshop.svg', wm: 4 }, bling: { f: 'bling.svg', wm: 2.06 },
  correios: { f: 'correios.svg', wm: 4.88 }, intelipost: { f: 'intelipost.svg', wm: 4.89 },
  totalexpress: { f: 'totalexpress.svg', wm: 2.57, hs: 1.3 },
}
function BrandMark({ k, size = 20 }) {
  const l = LOGOS[k]
  if (!l) return null
  const h = size * (l.hs || 1)
  return <img className="h8-lg" src={'/img/brands/' + l.f} alt="" aria-hidden="true" style={{ height: h, width: l.wm ? h * l.wm : h }} />
}
function BrandChip({ b, size = 20 }) {
  const wm = LOGOS[b.k] && LOGOS[b.k].wm
  return <span className="h8-blogo"><BrandMark k={b.k} size={size} />{!wm && <b>{b.name}</b>}</span>
}


function AiTag({ children = 'AI' }) { return <span className="h8-aitag"><Icon name="sparkle" size={11} />{children}</span> }

function CopyCmd({ dark }) {
  const [ok, setOk] = useState(false)
  const copy = () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(CLI_CMD)
      setOk(true); setTimeout(() => setOk(false), 1800)
    } catch (e) { setOk(false) }
  }
  return (
    <button type="button" className={'h8-cmd' + (dark ? ' is-dark' : '')} onClick={copy} aria-label="Copiar o comando do Unbox CLI">
      <span className="h8-cmd-p">$</span><code>{CLI_CMD}</code>
      <span className="h8-cmd-c"><Icon name={ok ? 'check' : 'copy'} size={14} />{ok ? 'Copiado' : 'Copiar'}</span>
    </button>
  )
}


/* O HTML do servidor já sai com o número final (sem JS nunca aparece "0").
   No cliente, zera antes da seção ser revelada e conta ao entrar na tela. */
function useCountUp(target, decimals = 0, run) {
  const [val, setVal] = useState(target)
  const reduced = useRef(false)
  useEffect(() => {
    reduced.current = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    if (!reduced.current && !run) setVal(0)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!run) return
    if (reduced.current) { setVal(target); return }
    let raf; const t0 = performance.now(); const dur = 1400
    const tick = (t) => { const k = Math.min(1, Math.max(0, (t - t0) / dur)); const e = 1 - Math.pow(1 - k, 3); setVal(Number((target * e).toFixed(decimals))); if (k < 1) raf = requestAnimationFrame(tick) }
    raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf)
  }, [target, decimals, run])
  return val
}
function Metric({ m, run }) {
  const v = useCountUp(m.num, m.decimals || 0, run)
  const shown = (m.decimals ? v.toFixed(m.decimals) : Math.round(v)).toString().replace('.', ',')
  return <div className="h8-metric"><div className="h8-metric-n">{m.prefix}{shown}<span>{m.suffix}</span></div><div className="h8-metric-l">{m.label}</div></div>
}


/* ── Hero: painel com abas (conquistado na v6) ─────────────── */
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
    <div className={'h8-panel tint-' + T.tint} onMouseEnter={() => { paused.current = true }} onMouseLeave={() => { paused.current = false }}>
      <div className="h8-ptabs" role="tablist">
        {SHOW.map((t, i) => (
          <button key={t.key} role="tab" aria-selected={i === tab} className={'h8-ptab' + (i === tab ? ' is-on' : '')} onClick={() => { pr.current = 0; setProg(0); setTab(i) }}>
            <span className="h8-ptab-ico"><Icon name={t.icon} size={16} /></span><span className="h8-ptab-lbl">{t.label}</span>
            {i === tab && <i className="h8-ptab-prog" style={{ transform: `scaleX(${prog})` }} />}
          </button>
        ))}
      </div>
      <div className="h8-showcase" key={T.key}>
        <div className="h8-showcase-copy">
          <span className="h8-chip"><Icon name={T.icon} size={14} /> {T.label}</span>
          <h3>{T.title}</h3>
          <p>{T.body}</p>
          <div className="h8-showcase-ai"><AiTag /><span>{T.ai}</span></div>
          <a href={T.href} className="h8-textlink" onClick={() => { if (T.lever !== undefined) window.dispatchEvent(new CustomEvent('unbox-lever', { detail: T.lever })) }}>Saiba mais <Icon name="arrow" size={16} /></a>
        </div>
        <div className={'h8-showcase-media' + (T.mock ? ' is-mock' : '')}>
          {T.img ? <img src={T.img} alt={T.alt} /> : <Mock kind={T.mock} />}
        </div>
      </div>
    </div>
  )
}

function Chat({ who, lines }) {
  return (
    <div className="h8-chat">
      <div className="h8-chat-h"><AiTag>Unbox MCP</AiTag><span>{who}</span></div>
      {lines.map((l, i) => <div className={'h8-bub ' + l.r} key={i}>{l.r !== 'u' && <Icon name="check" size={13} />}{l.t}</div>)}
    </div>
  )
}
/* ── 4 · Onde a receita cresce: as alavancas ─────────────────── */
function Levers({ eye = false }) {
  const [tab, setTab] = useState(0)
  const [prog, setProg] = useState(0)
  const paused = useRef(false); const pr = useRef(0)
  useEffect(() => {
    const id = setInterval(() => { if (paused.current) return; pr.current += 1 / 170; if (pr.current >= 1) { pr.current = 0; setTab((t) => (t + 1) % LEVERS.length) } setProg(pr.current) }, 40)
    return () => clearInterval(id)
  }, [])
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('lever'); if (q !== null) { paused.current = true; setTab(Math.min(LEVERS.length - 1, Math.max(0, Number(q) || 0))) }
    const onLever = (e) => { paused.current = true; pr.current = 0; setProg(0); setTab(Math.min(LEVERS.length - 1, Math.max(0, Number(e.detail) || 0))) }
    window.addEventListener('unbox-lever', onLever)
    return () => window.removeEventListener('unbox-lever', onLever)
  }, [])
  const T = LEVERS[tab]
  return (
    <div className={'h8-panel tint-' + T.tint} onMouseEnter={() => { paused.current = true }} onMouseLeave={() => { paused.current = false }}>
      {eye && <p className="h8-panel-eye">Onde a sua receita cresce</p>}
      <div className="h8-ptabs" role="tablist">
        {LEVERS.map((t, i) => (
          <button key={t.key} role="tab" aria-selected={i === tab} className={'h8-ptab' + (i === tab ? ' is-on' : '')} onClick={() => { pr.current = 0; setProg(0); setTab(i) }}>
            <span className="h8-ptab-ico"><Icon name={t.icon} size={16} /></span><span className="h8-ptab-lbl">{t.label}</span>
            {i === tab && <i className="h8-ptab-prog" style={{ transform: `scaleX(${prog})` }} />}
          </button>
        ))}
      </div>
      <div className="h8-showcase" key={T.key}>
        <div className="h8-showcase-copy">
          <span className="h8-chip"><Icon name={T.icon} size={14} /> {T.label}</span>
          <h3>{T.title}</h3>
          <div className="h8-stat"><b>{T.stat.n}</b><span>{T.stat.l}</span></div>
          <p>{T.body}</p>
          <span className="h8-how">Como acontece: <b>{T.how}</b></span>
        </div>
        <div className={'h8-showcase-media' + (T.mock ? ' is-mock' : '')}>
          {T.img ? <img src={T.img} alt={T.alt} /> : <Mock kind={T.mock} />}
        </div>
      </div>
    </div>
  )
}

function Mock({ kind }) {
  switch (kind) {
    case 'pay': return (
      <div className="h8-mock h8-m-pay">
        <div className="h8-m-stat"><span>Aprovação</span><b>98%</b><em>multi provedores + retentativa</em></div>
        <div className="h8-m-stat"><span>Pix</span><b>1%</b><em>cartão a partir de 2,99%</em></div>
        <div className="h8-m-stat"><span>Saque</span><b>R$ 0</b><em>sem taxa de saque</em></div>
        <div className="h8-m-strip"><AiTag /><b>Antifraude com análise ativa</b><span>cartão, boleto e Pix integrados</span></div>
      </div>)
    case 'ai': return (
      <div className="h8-mock h8-m-ai">
        <div className="h8-term">
          <div className="h8-term-cmd"><span>$</span> {CLI_CMD}</div>
          <div className="h8-term-line">? Estilo visual › Editorial</div>
          <div className="h8-term-line">? Checkout › padrão hospedado da Unbox</div>
          <div className="h8-term-line ok">✓ storefront gerado com a sua marca</div>
        </div>
        <Chat who="você · Claude" lines={[{ r: 'u', t: 'cria o cupom VOLTA10 com 10% e frete grátis acima de R$ 150' }, { r: 'a', t: 'Plano: VOLTA10 · 10% · frete grátis ≥ R$ 150. Confirmar?' }, { r: 'u', t: 'confirma' }, { r: 'a ok', t: 'Criado e publicado.' }]} />
      </div>)
    case 'creators': return (
      <div className="h8-mock h8-m-cr">
        <div className="h8-m-cr-math">
          <div className="is-a"><span>Mídia paga</span><b>25–40%</b><em>do faturamento</em></div>
          <span className="h8-m-cr-arrow">→</span>
          <div className="is-b"><span>Unbox Creators</span><b>~15%</b><em>custo total por venda</em></div>
        </div>
        <div className="h8-m-cr-flow">
          {['Marca ativa', 'Creators recebem a oferta', 'Divulgam com link', 'Venda rastreada'].map((s, i) => <div key={s}><i>{i + 1}</i><span>{s}</span></div>)}
        </div>
      </div>)
    default: return null
  }
}

/* ── 4 · No automático: telas ilustrativas + prints reais ───── */
function AutoScreen({ kind }) {
  const bar = (t) => <div className="h8-pm-bar"><span className="h8-pm-dots"><i /><i /><i /></span><span>{t}</span></div>
  switch (kind) {
    case 'criar': return (
      <div className="h8-pm">{bar('terminal')}
        <div className="h8-pm-term">
          <div className="c"><span>$</span> {CLI_CMD}</div>
          <div><span className="q">?</span> Site atual da marca <b>› minhamarca.com.br</b></div>
          <div><span className="q">?</span> Instagram da marca <b>› @minhamarca</b></div>
          <div><span className="q">?</span> Objetivo da loja <b>› clube de café por assinatura</b></div>
          <div><span className="q">?</span> Estilo visual <b>› Editorial (sugerido pelo objetivo)</b></div>
          <div className="ok">✓ storefront gerado: catálogo, carrinho, checkout e área do cliente</div>
          <div className="ai"><Icon name="sparkle" size={12} /> Agente de Branding: vamos personalizar antes de você ver a loja.</div>
        </div>
      </div>)
    case 'operar': return (
      <div className="h8-pm">{bar('Print real · Temperos Badia')}
        <div className="h8-pm-proof">
          <figure><figcaption>1 · pedido na AI</figcaption><img src="/img/ai-prova-agente.png" alt="Agente confirmando o cupom BRUNINHO10 criado e ativo na Temperos Badia" /></figure>
          <figure><figcaption>2 · no checkout da loja</figcaption><img src="/img/ai-prova-checkout.png" alt="Checkout da Temperos Badia com o cupom BRUNINHO10 aplicado" /></figure>
        </div>
      </div>)
    case 'decidir': return (
      <div className="h8-pm">{bar('Painel Unbox · Principal')}
        <div className="h8-pm-body">
          <div className="h8-pm-ask">
            <div className="h8-pm-ask-h"><Icon name="sparkle" size={15} /> Qual seu próximo passo para crescer? <em>BETA</em></div>
            <div className="h8-pm-input"><span>Dia das Mães com brinde</span><i><Icon name="arrow" size={14} /></i></div>
            <div className="h8-pm-paths"><span>Aumentar conversão</span><span>Aumentar ticket médio</span><span>Criar nova campanha</span></div>
          </div>
          <div className="h8-pm-card">
            <div className="h8-pm-card-h"><b>KPIs de Produtos</b><span>últimos 30 dias</span></div>
            {[['Curva A', 'produtos que puxam a receita', 78], ['Cobertura de estoque', 'dias até acabar', 54], ['Catálogo parado', 'sem venda no período', 18]].map(([t, d, w]) => <div className="h8-pm-meter" key={t}><div><b>{t}</b><span>{d}</span></div><i><span style={{ width: w + '%' }} /></i></div>)}
          </div>
        </div>
      </div>)
    case 'recuperar': return (
      <div className="h8-pm">{bar('Painel Unbox · Assinaturas e relatórios')}
        <div className="h8-pm-body">
          <div className="h8-pm-split">
            <div className="h8-pm-card">
              <div className="h8-pm-card-h"><b>Assinaturas com erro</b><span>esta semana</span></div>
              <div className="h8-pm-err"><b>18</b><span>com falha de cobrança</span></div>
              <div className="h8-pm-err ok"><b>11</b><span>já recuperadas</span></div>
            </div>
            <div className="h8-pm-card">
              <div className="h8-pm-card-h"><b>Carrinhos abandonados</b><span>7 dias</span></div>
              <div className="h8-pm-err"><b>R$ 3,4 mil</b><span>em carrinhos para recuperar</span></div>
            </div>
          </div>
          <div className="h8-pm-card">
            <div className="h8-pm-card-h"><b>Previsão de estoque</b><span>pelas próximas cobranças</span></div>
            {[['Kit Mensal', 82], ['Refil 500 g', 57], ['Kit Trimestral', 31]].map(([t, w]) => <div className="h8-pm-meter is-tight" key={t}><div><b>{t}</b></div><i><span style={{ width: w + '%' }} /></i></div>)}
          </div>
        </div>
      </div>)
    default: return null
  }
}
function Auto() {
  const [tab, setTab] = useState(0)
  useEffect(() => { const q = new URLSearchParams(window.location.search).get('auto'); if (q !== null) setTab(Math.min(AUTO.length - 1, Math.max(0, Number(q) || 0))) }, [])
  const P = AUTO[tab]
  return (
    <div className="h8-auto">
      <div className="h8-auto-tabs" role="tablist">
        {AUTO.map((t, i) => (
          <button key={t.key} role="tab" aria-selected={i === tab} className={'h8-auto-tab' + (i === tab ? ' is-on' : '')} onClick={() => setTab(i)}>
            <Icon name={t.icon} size={15} />{t.label}{t.beta && <em>Beta</em>}
          </button>
        ))}
      </div>
      <div className="h8-auto-grid" key={P.key}>
        <div className="h8-auto-copy">
          <h3>{P.title}</h3>
          <p>{P.body}</p>
          <ul>{P.feats.map((f) => <li key={f}><Icon name="check" size={15} />{f}</li>)}</ul>
          {P.key === 'criar' && <a href={NPM_URL} target="_blank" rel="noopener noreferrer" className="h8-textlink light">Ver o Unbox CLI no npm <Icon name="arrow" size={15} /></a>}
        </div>
        <div className="h8-auto-screen"><AutoScreen kind={P.key} /></div>
      </div>
    </div>
  )
}

/* ── Antes/depois ─────────────────────────────────────────── */
function Compare({ c }) {
  const [x, setX] = useState(50)
  return (
    <div className="h8-case">
      <div className="h8-case-head"><img src={c.logo} alt={c.name} className={'h8-case-logo' + (c.dark ? ' is-dark' : '')} /><span className="h8-case-seg">{c.seg}</span></div>
      <div className="h8-ba" style={{ '--x': x + '%' }}>
        <img src={c.before} alt={`${c.name} antes`} className="h8-ba-img" />
        <div className="h8-ba-after"><img src={c.after} alt={`${c.name} depois`} className="h8-ba-img" /></div>
        <div className="h8-ba-bar"><i /></div>
        <span className="h8-ba-tag l">Antes</span><span className="h8-ba-tag r">Depois · Unbox</span>
        <input type="range" min="2" max="98" value={x} onChange={(e) => setX(Number(e.target.value))} aria-label="Comparar antes e depois" />
      </div>
      <p className="h8-case-note">{c.note}</p>
    </div>
  )
}

export default function HomeV8() {
  const [faq, setFaq] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)
  const [metricsOn, setMetricsOn] = useState(false)
  const metricsRef = useRef(null)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8)
    on(); window.addEventListener('scroll', on, { passive: true })
    const qs = new URLSearchParams(window.location.search)
    const only = qs.get('only')
    if (only) {
      const root = document.getElementById('hv8')
      Array.from(root.children).forEach((el) => { if (el.id !== only && !el.classList.contains('h8-nav')) el.style.display = 'none' })
    }
    if (qs.get('rv') || only) { document.querySelectorAll('#hv8 [data-rv]').forEach((el) => el.classList.add('h8-in')); setMetricsOn(true) }
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => {
    const els = document.querySelectorAll('#hv8 [data-rv]')
    if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('h8-in')); setMetricsOn(true); return }
    const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('h8-in'); io.unobserve(en.target) } }), { threshold: 0.12 })
    els.forEach((e) => io.observe(e))
    let mo
    if (metricsRef.current) { mo = new IntersectionObserver((es) => { if (es[0].isIntersecting) { setMetricsOn(true); mo.disconnect() } }, { threshold: 0.2 }); mo.observe(metricsRef.current) }
    const fb = setTimeout(() => setMetricsOn(true), 1800)
    return () => { io.disconnect(); mo && mo.disconnect(); clearTimeout(fb) }
  }, [])

  const NAV = [['#receita', 'Receita'], ['#automatico', 'No automático'], ['#prova', 'Cases'], ['#migrar', 'Migração'], ['#comecar', 'Como começar']]

  return (
    <>
      <Head>
        <title>Unbox — AI Commerce: seu ecommerce no automático</title>
        <meta name="description" content="Venda mais com checkout, pagamento, assinatura e creators nativos, e deixe a operação no automático com AI. Agende um diagnóstico gratuito da sua operação." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </Head>

      <div id="hv8">
        <a className="h8-announce" href="#automatico"><span className="h8-announce-dot" /> Novo: o Unbox CLI é público no npm. <b>Veja o que sai das suas mãos →</b></a>

        <header className={'h8-nav' + (scrolled ? ' is-scrolled' : '')}>
          <div className="h8-wrap h8-nav-in">
            <Logo />
            <nav className="h8-links">{NAV.map(([h, t]) => <a key={h} href={h}>{t}</a>)}</nav>
            <div className="h8-nav-cta">
              <a href={URLS.login} className="h8-btn h8-btn-ghost">Login</a>
              <a href={URLS.demo} className="h8-btn h8-btn-dark">Agendar diagnóstico</a>
              <button className="h8-burger" aria-label="Menu" onClick={() => setMenu((v) => !v)}><span /><span /><span /></button>
            </div>
          </div>
          {menu && <div className="h8-sheet">{NAV.map(([h, t]) => <a key={h} href={h} onClick={() => setMenu(false)}>{t}</a>)}<a href={URLS.demo} className="h8-btn h8-btn-dark">Agendar diagnóstico</a></div>}
        </header>

        {/* 1 · HERO — promessa + onde a receita cresce */}
        <section className="h8-hero" id="hero">
          <div className="h8-wrap">
            <div className="h8-hero-copy" data-rv>
              <h1><em>AI Commerce</em><br />Seu ecommerce no automático</h1>
              <p className="h8-lead">Crie, gerencie e escale sua marca com AI.</p>
              <div className="h8-cta-row">
                <a href={URLS.demo} className="h8-btn h8-btn-dark h8-btn-lg">Agendar diagnóstico gratuito</a>
                <a href="#receita" className="h8-btn h8-btn-white h8-btn-lg">Ver onde a receita cresce</a>
              </div>
              <p className="h8-micro">Diagnóstico gratuito · Migração acompanhada · Suporte humano</p>
            </div>
            <div className="h8-logos" data-rv>
              <div className="h8-logos-g">
                <span className="h8-logos-l">Você cria com</span>
                <div className="h8-logos-row">{BRANDS_CREATE.map((b) => <BrandChip b={b} key={b.k} />)}</div>
              </div>
              <div className="h8-logos-g">
                <span className="h8-logos-l">Ou migra de</span>
                <div className="h8-logos-row">{BRANDS_MIGRATE.map((b) => <BrandChip b={b} key={b.k} />)}</div>
              </div>
            </div>
            <div data-rv><Showcase /></div>
          </div>
        </section>

        {/* 2 · PROVA — quem vende com a Unbox */}
        <section className="h8-sec h8-sec-alt" id="prova" ref={metricsRef}>
          <div className="h8-wrap">
            <div className="h8-head h8-center" data-rv>
              <span className="h8-eye"><i className="h8-dot" />RESULTADOS</span>
              <h2>A infraestrutura por trás das principais marcas D2C do Brasil.</h2>
            </div>
            <div className="h8-marcas" data-rv>
              {MARCAS.map((m) => <img key={m.name} src={m.logo} alt={m.name} className={m.dim ? 'is-dim' : ''} style={{ height: m.h }} />)}
            </div>
            <div className="h8-metrics-grid" data-rv>{METRICS.map((m) => <Metric key={m.label} m={m} run={metricsOn} />)}</div>
            <div className="h8-spot" data-rv>
              <div className="h8-spot-who">
                <img src="/img/home7/camila-pudim.png" alt="Camila Pudim, fundadora da Pudim Beauty" />
                <div><b>Camila Pudim</b><span>Fundadora, Pudim Beauty</span></div>
              </div>
              <div className="h8-spot-main">
                <h3>O volume de acesso de um ano em 3 meses.</h3>
                <p>Canal digital lançado com jornada de compra bem definida, checkout estável para absorver picos de acesso e integração com os canais de aquisição para trazer tráfego qualificado.</p>
              </div>
              <div className="h8-spot-stats">
                <div><b>3 meses</b><span>para o volume de acesso de um ano</span></div>
                <div><b>+2,5%</b><span>de conversão, acima da média do mercado de beleza</span></div>
              </div>
            </div>
            <p className="h8-cases-l" data-rv>Lojas remontadas na Unbox. Arraste para comparar.</p>
            <div className="h8-cases" data-rv>{CASES.map((c) => <Compare c={c} key={c.name} />)}</div>
            <div className="h8-backers" data-rv>
              <div className="h8-backer is-wide">
                <span className="h8-backer-l">Apoiada por</span>
                <div className="h8-backer-imgs"><img src="/img/home7/investidores-a.png" alt="Maya Capital, Bertha Capital e Century Oak Ventures" /><img src="/img/home7/investidores-b.png" alt="GV Angels, WeImpact e Latitud" /></div>
              </div>
              <div className="h8-backer">
                <span className="h8-backer-l">Acelerada por</span>
                <div className="h8-backer-imgs"><img src="/img/home7/aceleradoras.png" alt="Endeavor ScaleUp, Meta e Plug and Play" /></div>
              </div>
            </div>
            <figure className="h8-press" data-rv>
              <span className="h8-press-ico"><Icon name="quote" size={20} /></span>
              <blockquote>Startup capta R$ 15 milhões para evitar que marcas de saúde e beleza colapsem.</blockquote>
              <figcaption>Exame</figcaption>
            </figure>
          </div>
        </section>

        {/* 3 · O CUSTO DE FICAR — o empurrão */}
        <section className="h8-sec" id="custo">
          <div className="h8-wrap">
            <div className="h8-head h8-center" data-rv>
              <span className="h8-eye"><i className="h8-dot" />O CUSTO DE FICAR</span>
              <h2>Sua plataforma está te custando crescimento.</h2>
              <p>Você investe em tráfego, gera venda, mas a receita não acumula. O problema não é o seu produto. É a infraestrutura por trás dele.</p>
            </div>
            <div className="h8-pains" data-rv>
              {PAINS.map((p) => (
                <div className="h8-pain" key={p.n}>
                  <span className="h8-pain-n">{p.n}</span>
                  <b>{p.t}</b>
                  <p>{p.d}</p>
                  <span className="h8-pain-fix"><Icon name="check" size={14} /><span><em>Na Unbox:</em> {p.fix}</span></span>
                </div>
              ))}
            </div>
            <div className="h8-cmp-head" data-rv>
              <h3>Tudo nativo. Inclusive a AI.</h3>
              <p>Todas resolvem vitrine, catálogo e pedido. A diferença aparece no que já vem pronto na plataforma — e no que vira app, módulo ou projeto à parte.</p>
            </div>
            <div className="h8-vs-wrap" data-rv>
              <table className="h8-vs">
                <thead><tr><th /> {CMP_COLS.map((c, i) => <th key={c} className={i === 0 ? 'is-us' : ''}>{c}</th>)}</tr></thead>
                <tbody>
                  {CMP_ROWS.map((r) => (
                    <tr key={r.t}>
                      <th scope="row"><b>{r.t}</b><span>{r.d}</span>{r.note && <em>{r.note}</em>}</th>
                      {r.v.map((v, i) => (
                        <td key={i} data-l={CMP_COLS[i]} className={(i === 0 ? 'is-us ' : '') + 'v-' + v}>
                          <span className="h8-vs-mark" aria-label={v === 'y' ? 'nativo' : v === 'p' ? 'via app ou módulo' : 'não oferece'}>{v === 'y' ? <Icon name="check" size={16} /> : v === 'p' ? '~' : '—'}</span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="h8-vs-legend" data-rv>
              <span><i className="l-y"><Icon name="check" size={12} /></i> nativo na plataforma</span>
              <span><i className="l-p">~</i> via app, módulo ou parceiro</span>
              <span><i className="l-n">—</i> não oferece</span>
            </p>
          </div>
        </section>

        {/* 4 · ONDE A RECEITA CRESCE — as alavancas (A), com o mecanismo (B) em cada uma */}
        <section className="h8-sec h8-sec-alt" id="receita">
          <div className="h8-wrap">
            <div className="h8-head h8-center" data-rv>
              <span className="h8-eye"><i className="h8-dot" />ONDE A SUA RECEITA CRESCE</span>
              <h2>Mais pedido, mais aprovação, mais recompra. E menos CAC.</h2>
              <p>Cada alavanca tem um número e um mecanismo nativo por trás. Nenhuma depende de app de terceiro.</p>
            </div>
            <div data-rv><Levers /></div>
          </div>
        </section>

        {/* 5 · NO AUTOMÁTICO — o trabalho que sai das suas mãos */}
        <section className="h8-sec h8-band" id="automatico">
          <div className="h8-wrap">
            <div className="h8-head h8-center" data-rv>
              <span className="h8-eye light"><i className="h8-dot" />NO AUTOMÁTICO</span>
              <h2>A AI executa. Você decide.</h2>
              <p>Criar a loja, mudar preço e estoque, montar campanha, achar o que está travando a receita: o trabalho de todo dia passa para a AI, e as mudanças na loja só vão ao ar com a sua confirmação.</p>
            </div>
            <div data-rv><Auto /></div>
            <div className="h8-agentes" data-rv>
              <span className="h8-agentes-l">Agentes embarcados no projeto da loja</span>
              <div className="h8-agentes-row">{AGENTES.map((a) => <span key={a}><Icon name="sparkle" size={12} />{a}</span>)}</div>
            </div>
            <p className="h8-caption light" data-rv>Telas do Painel ilustrativas. Prints da Temperos Badia reais.</p>
          </div>
        </section>

        {/* 6 · MIGRAÇÃO — o medo de trocar, desmontado */}
        <section className="h8-sec h8-sec-alt" id="migrar">
          <div className="h8-wrap h8-split">
            <div className="h8-split-copy">
              <span className="h8-eye" data-rv><i className="h8-dot" />MIGRAÇÃO</span>
              <h2 data-rv>Troque de plataforma sem parar de vender.</h2>
              <p className="h8-sub" data-rv>Cuidamos dos redirects e da estrutura de URLs para preservar seu ranqueamento e o tráfego orgânico que você já conquistou.</p>
              <div className="h8-steps" data-rv>
                {STEPS.map((s) => <div className="h8-step" key={s.n}><span>{s.n}</span><div><b>{s.t}</b><p>{s.d}</p></div></div>)}
              </div>
            </div>
            <div className="h8-migra-side" data-rv>
              <div className="h8-int-g">
                <span className="h8-int-l">Migramos de</span>
                <div className="h8-int-items">{BRANDS_MIGRATE.map((b) => <BrandChip b={b} key={b.k} size={18} />)}<span className="h8-int-more">Tray, Loja Integrada e outras</span></div>
              </div>
              <span className="h8-int-title">E conecta com o que você já usa</span>
              {INTEGRATIONS.map((g) => <div className="h8-int-g" key={g.g}><span className="h8-int-l">{g.g}</span><div className="h8-int-items">{g.items.map((it) => <span className="h8-int-item" key={it.n}><BrandMark k={it.k} size={16} />{!(LOGOS[it.k] && LOGOS[it.k].wm) && it.n}</span>)}</div></div>)}
            </div>
          </div>
        </section>

        {/* 7 · COMO COMEÇAR — um caminho por estágio */}
        <section className="h8-sec" id="comecar">
          <div className="h8-wrap">
            <div className="h8-head h8-center" data-rv>
              <span className="h8-eye"><i className="h8-dot" />COMO COMEÇAR</span>
              <h2>Escolha o seu caminho.</h2>
            </div>
            <div className="h8-paths" data-rv>
              <div className="h8-path is-main">
                <span className="h8-path-tag">Sua marca já vende online</span>
                <h3>Diagnóstico gratuito</h3>
                <p>A gente entende sua operação antes de qualquer proposta. Sem compromisso.</p>
                <ul>{['Demo + diagnóstico da sua operação (~30 min)', 'Proposta sob medida', 'Migração acompanhada pela equipe'].map((f) => <li key={f}><Icon name="check" size={15} />{f}</li>)}</ul>
                <a href={URLS.demo} className="h8-btn h8-btn-dark h8-btn-full">Agendar diagnóstico gratuito</a>
              </div>
              <div className="h8-path">
                <span className="h8-path-tag">Acima de R$ 150 mil/mês</span>
                <h3>Projeto 10x</h3>
                <p>Para quem já fatura e quer mudar de patamar em 12 meses. Não é consultoria. Não é agência. É parceria para crescer.</p>
                <ul>{['Head de Growth como Board Member', 'Estratégia + execução + capital', 'Atuação além do e-commerce, em canais e mercado'].map((f) => <li key={f}><Icon name="check" size={15} />{f}</li>)}</ul>
                <a href={URLS.demo} className="h8-btn h8-btn-white h8-btn-full">Candidatar-se ao Projeto 10x</a>
              </div>
              <div className="h8-path is-dev">
                <span className="h8-path-tag">Você constrói com AI</span>
                <h3>Unbox CLI</h3>
                <p>Gere um storefront completo, integrado à Unbox, com um comando. Sem credenciais ainda, o projeto sobe em modo mockup.</p>
                <CopyCmd dark />
                <a href={NPM_URL} target="_blank" rel="noopener noreferrer" className="h8-textlink light">Ver no npm <Icon name="arrow" size={15} /></a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ — objeções de quem troca de plataforma */}
        <section className="h8-sec h8-sec-alt" id="faq">
          <div className="h8-wrap h8-narrow">
            <div className="h8-head" data-rv><span className="h8-eye"><i className="h8-dot" />DÚVIDAS</span><h2>Tudo que você precisa saber.</h2></div>
            <div className="h8-faq" data-rv>
              {FAQ.map((f, i) => (
                <div className={'h8-faq-item' + (faq === i ? ' is-open' : '')} key={i}>
                  <button className="h8-faq-q" onClick={() => setFaq(faq === i ? -1 : i)}><span>{f.q}</span><i><Icon name="plus" size={16} /></i></button>
                  <div className="h8-faq-a"><p>{f.a}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL */}
        <section className="h8-final-wrap" id="final">
          <div className="h8-wrap">
            <div className="h8-final" data-rv>
              <h2>Você faz a marca.<br /><em>A Unbox faz a venda.</em></h2>
              <p>Em um diagnóstico gratuito, a gente entende a sua operação e mostra o que muda com a Unbox. Sem compromisso.</p>
              <div className="h8-cta-row"><a href={URLS.demo} className="h8-btn h8-btn-white h8-btn-lg">Agendar diagnóstico gratuito</a></div>
              <a href={URLS.demo} className="h8-final-10x">Fatura acima de R$ 150 mil/mês? Conheça o Projeto 10x <Icon name="arrow" size={14} /></a>
            </div>
          </div>
        </section>

        <footer className="h8-footer">
          <div className="h8-wrap h8-footer-grid">
            <div className="h8-footer-brand"><Logo /><p>A camada de vendas AI-native para marcas D2C escalarem no digital, do primeiro pedido aos milhões em vendas.</p></div>
            <div><h4>Plataforma</h4><a href="/recursos">Recursos</a><a href="/checkout">Checkout TURBO</a><a href="/assinatura">Assinatura</a><a href="/credito">Unbox Pay</a><a href="/afiliados">Creators</a></div>
            <div><h4>AI</h4><a href={NPM_URL} target="_blank" rel="noopener noreferrer">Unbox CLI no npm</a><a href="/ai-unbox">AI Foundry</a><a href="/ai">Demo do MCP</a></div>
            <div><h4>Empresa</h4><a href="/industrias">Indústrias</a><a href="/blog">Blog</a><a href="/carreiras">Carreiras</a><a href={URLS.whatsapp}>Contato</a></div>
          </div>
          <div className="h8-wrap h8-footer-bottom">© {new Date().getFullYear()} Unbox. Todos os direitos reservados.</div>
        </footer>
      </div>

      <DemoModal />

      <style jsx global>{`

        html, body { margin: 0; background: #FBFAF6; }
        #hv8 {
          --bg: #FBFAF6; --ink: #16161C; --ink-2: #4A4A55; --mut: #7A7A86; --line: rgba(22,22,28,.09);
          --roxo: #8F28F6; --roxo-2: #5612AB; --verde: #1FBF5A; --neon: #39FF14; --ambar: #F5B33C;
          --sky: #E6F0FF; --sky-2: #C3DFFE; --lime: #F1FBDF; --lime-2: #DBEE9F; --lavender: #EEE6FF; --lavender-2: #D4C2FF; --mint: #E4FAF3; --mint-2: #BAF0EC;
          --mono: 'JetBrains Mono', ui-monospace, Menlo, monospace;
          font-family: 'Sora', system-ui, -apple-system, sans-serif; color: var(--ink); background: var(--bg); -webkit-font-smoothing: antialiased; line-height: 1.5; overflow-x: clip;
        }
        #hv8 *, #hv8 *::before, #hv8 *::after { box-sizing: border-box; }
        #hv8 a { color: inherit; text-decoration: none; }
        #hv8 code { font-family: var(--mono); }
        #hv8 .h8-wrap { max-width: 1180px; margin: 0 auto; padding: 0 24px; }
        #hv8 .h8-narrow { max-width: 820px; }
        #hv8 [data-rv] { opacity: 0; transform: translateY(16px); transition: opacity .7s ease, transform .7s cubic-bezier(.2,.7,.2,1); }
        #hv8 [data-rv].h8-in { opacity: 1; transform: none; }
        #hv8 .tint-sky { --t: var(--sky); --t2: var(--sky-2); } #hv8 .tint-lime { --t: var(--lime); --t2: var(--lime-2); }
        #hv8 .tint-lavender { --t: var(--lavender); --t2: var(--lavender-2); } #hv8 .tint-mint { --t: var(--mint); --t2: var(--mint-2); }

        #hv8 .h8-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; font-weight: 600; font-size: 15px; border-radius: 12px; padding: 12px 20px; border: 1px solid transparent; transition: transform .15s ease, box-shadow .2s, background .2s, border-color .2s; white-space: nowrap; cursor: pointer; font-family: inherit; }
        #hv8 .h8-btn-lg { padding: 16px 26px; font-size: 16px; border-radius: 14px; }
        #hv8 .h8-btn-full { width: 100%; }
        #hv8 .h8-btn-dark { background: var(--ink); color: #fff; } #hv8 .h8-btn-dark:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(22,22,28,.22); }
        #hv8 .h8-btn-white { background: #fff; color: var(--ink); border-color: var(--line); } #hv8 .h8-btn-white:hover { border-color: rgba(22,22,28,.25); transform: translateY(-2px); }
        #hv8 .h8-btn-ghost { background: transparent; color: var(--ink); } #hv8 .h8-btn-ghost:hover { background: rgba(22,22,28,.05); }
        #hv8 .h8-btn-ghost-light { background: rgba(255,255,255,.12); color: #fff; border-color: rgba(255,255,255,.28); }
        #hv8 .h8-textlink { display: inline-flex; align-items: center; gap: 6px; font-weight: 600; color: var(--roxo-2); } #hv8 .h8-textlink:hover { gap: 10px; }
        #hv8 .h8-textlink.light { color: #fff; }
        #hv8 .h8-eye { display: inline-flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 700; letter-spacing: .18em; color: var(--roxo-2); }
        #hv8 .h8-eye.light { color: #C9A8FF; }
        #hv8 .h8-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--verde); box-shadow: 0 0 0 3px rgba(31,191,90,.18); flex-shrink: 0; }
        #hv8 .h8-aitag { display: inline-flex; align-items: center; gap: 5px; font-size: 10.5px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: #fff; background: linear-gradient(135deg, var(--roxo), #B06BFF); border-radius: 999px; padding: 4px 9px; white-space: nowrap; }

        /* comando copiável */
        #hv8 .h8-cmd { display: inline-flex; align-items: center; gap: 10px; max-width: 100%; background: #fff; border: 1px solid var(--line); border-radius: 12px; padding: 7px 7px 7px 14px; font-family: var(--mono); font-size: 13.5px; color: var(--ink); cursor: pointer; transition: border-color .2s; text-align: left; }
        #hv8 .h8-cmd:hover { border-color: rgba(143,40,246,.45); }
        #hv8 .h8-cmd code { font-size: inherit; min-width: 0; overflow-wrap: anywhere; }
        #hv8 .h8-cmd-p { color: var(--verde); font-weight: 600; }
        #hv8 .h8-cmd-c { display: inline-flex; align-items: center; gap: 6px; flex-shrink: 0; font-family: 'Sora', system-ui, sans-serif; font-size: 12.5px; font-weight: 600; background: var(--ink); color: #fff; border-radius: 8px; padding: 7px 11px; }
        #hv8 .h8-cmd.is-dark { background: rgba(255,255,255,.06); border-color: rgba(255,255,255,.16); color: #fff; }
        #hv8 .h8-cmd.is-dark .h8-cmd-p { color: var(--neon); } #hv8 .h8-cmd.is-dark .h8-cmd-c { background: #fff; color: var(--ink); }

        #hv8 .h8-announce { display: flex; align-items: center; justify-content: center; gap: 8px; background: var(--lavender); font-size: 13.5px; padding: 9px 16px; text-align: center; }
        #hv8 .h8-announce b { font-weight: 600; color: var(--roxo-2); }
        #hv8 .h8-announce-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--roxo); box-shadow: 0 0 0 3px rgba(143,40,246,.18); flex-shrink: 0; }
        #hv8 .h8-nav { position: sticky; top: 0; z-index: 50; background: rgba(251,250,246,.86); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border-bottom: 1px solid transparent; transition: border-color .2s, box-shadow .2s; }
        #hv8 .h8-nav.is-scrolled { border-bottom-color: var(--line); box-shadow: 0 6px 24px rgba(22,22,28,.05); }
        #hv8 .h8-nav-in { display: flex; align-items: center; justify-content: space-between; height: 72px; gap: 24px; }
        #hv8 .h8-logo { display: inline-flex; align-items: center; gap: 8px; font-weight: 700; font-size: 24px; letter-spacing: -.03em; color: var(--ink); }
        #hv8 .h8-logo img { width: 30px; height: 30px; object-fit: contain; }
        #hv8 .h8-links { display: flex; gap: 26px; font-weight: 500; font-size: 15px; color: var(--ink-2); } #hv8 .h8-links a:hover { color: var(--ink); }
        #hv8 .h8-nav-cta { display: flex; align-items: center; gap: 8px; }
        #hv8 .h8-burger { display: none; width: 40px; height: 40px; border: 1px solid var(--line); border-radius: 10px; background: #fff; flex-direction: column; justify-content: center; gap: 4px; align-items: center; cursor: pointer; }
        #hv8 .h8-burger span { width: 16px; height: 2px; background: var(--ink); border-radius: 2px; }
        #hv8 .h8-sheet { display: flex; flex-direction: column; gap: 6px; padding: 12px 24px 20px; border-top: 1px solid var(--line); background: var(--bg); } #hv8 .h8-sheet a { padding: 10px 0; font-weight: 500; }

        /* hero */
        #hv8 .h8-hero { padding: 72px 0 40px; }
        #hv8 .h8-hero-copy { text-align: center; max-width: 880px; margin: 0 auto 36px; }
        #hv8 h1 { font-size: clamp(38px, 5.2vw, 64px); font-weight: 700; letter-spacing: -.04em; line-height: 1.04; margin: 0 0 20px; }
        #hv8 h1 em, #hv8 .h8-final h2 em { font-style: normal; background: linear-gradient(90deg, var(--roxo), #B06BFF); -webkit-background-clip: text; background-clip: text; color: transparent; }
        #hv8 .h8-lead { font-size: clamp(18px, 1.7vw, 22px); color: var(--ink-2); line-height: 1.5; max-width: 640px; margin: 0 auto; }
        #hv8 .h8-cta-row { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; margin-top: 28px; }
        #hv8 .h8-hero-cmd { margin-top: 18px; display: flex; justify-content: center; }
        #hv8 .h8-micro { font-size: 13px; color: var(--mut); margin: 12px auto 0; }
        #hv8 .h8-logos { display: grid; grid-template-columns: auto auto; gap: 10px 18px; justify-content: center; align-items: center; margin: 0 auto 32px; }
        #hv8 .h8-logos-g { display: flex; align-items: center; gap: 14px; }
        #hv8 .h8-logos-l { font-size: 11.5px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--mut); white-space: nowrap; }
        #hv8 .h8-logos-row { display: flex; align-items: center; gap: 9px; flex-wrap: wrap; }
        #hv8 .h8-blogo { display: inline-flex; align-items: center; gap: 8px; background: #fff; border: 1px solid var(--line); border-radius: 999px; padding: 8px 15px 8px 10px; }
        #hv8 .h8-blogo b { font-size: 14.5px; font-weight: 600; letter-spacing: -.01em; color: var(--ink); white-space: nowrap; }
        #hv8 .h8-lg { display: block; object-fit: contain; flex-shrink: 0; }
        #hv8 .h8-panel { border-radius: 32px; padding: 28px 28px 0; background: linear-gradient(180deg, var(--t2), var(--t) 60%, #fff 140%); transition: background .6s ease; box-shadow: inset 0 1px 0 rgba(255,255,255,.6); }
        #hv8 .h8-ptabs { display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; margin-bottom: 26px; }
        #hv8 .h8-ptab { position: relative; display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,.55); border: 1px solid rgba(255,255,255,.7); color: var(--ink-2); border-radius: 999px; padding: 8px 16px 8px 8px; font-family: inherit; font-weight: 600; font-size: 14.5px; cursor: pointer; overflow: hidden; transition: background .2s, color .2s; }
        #hv8 .h8-ptab.is-on { background: #fff; color: var(--ink); box-shadow: 0 8px 22px rgba(22,22,28,.08); }
        #hv8 .h8-ptab-ico { width: 30px; height: 30px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; background: var(--t); color: var(--ink); }
        #hv8 .h8-ptab.is-on .h8-ptab-ico { background: var(--ink); color: #fff; }
        #hv8 .h8-ptab-prog { position: absolute; left: 0; bottom: 0; height: 2px; width: 100%; background: var(--ink); transform-origin: left; }
        #hv8 .h8-showcase { display: grid; grid-template-columns: .9fr 1.1fr; gap: 28px; background: #fff; border-radius: 24px 24px 0 0; padding: 36px 36px 0; align-items: center; animation: h8fade .5s ease; }
        @keyframes h8fade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        #hv8 .h8-chip { display: inline-flex; align-items: center; gap: 7px; font-size: 13px; font-weight: 600; color: var(--ink); background: var(--t, var(--sky)); border-radius: 999px; padding: 6px 12px 6px 9px; }
        #hv8 .h8-showcase-copy { padding-bottom: 32px; }
        #hv8 .h8-showcase-copy h3 { font-size: clamp(24px, 2.6vw, 34px); font-weight: 700; letter-spacing: -.03em; line-height: 1.1; margin: 14px 0 12px; }
        #hv8 .h8-showcase-copy p { color: var(--ink-2); font-size: 16px; line-height: 1.6; margin: 0 0 16px; }
        #hv8 .h8-showcase-ai { display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--ink-2); background: var(--bg); border: 1px solid var(--line); border-radius: 12px; padding: 10px 12px; margin-bottom: 18px; }
        #hv8 .h8-showcase-media { align-self: end; border-radius: 16px 16px 0 0; overflow: hidden; background: var(--t); padding: 16px 16px 0; }
        #hv8 .h8-showcase-media img { display: block; width: 100%; height: 340px; object-fit: cover; object-position: top; border-radius: 12px 12px 0 0; box-shadow: 0 -10px 40px rgba(22,22,28,.12); }
        #hv8 .h8-showcase-media.is-mock { align-self: center; border-radius: 16px; padding: 18px; margin-bottom: 32px; }

        /* chat e terminal curtos */
        #hv8 .h8-chat { background: #fff; border-radius: 18px; padding: 14px; box-shadow: 0 20px 50px rgba(22,22,28,.12); display: grid; gap: 8px; width: 100%; }
        #hv8 .h8-chat-h { display: flex; align-items: center; justify-content: space-between; gap: 8px; font-size: 11.5px; color: var(--mut); padding-bottom: 8px; border-bottom: 1px solid var(--line); }
        #hv8 .h8-bub { max-width: 90%; padding: 9px 12px; border-radius: 12px; font-size: 13px; line-height: 1.4; opacity: 0; transform: translateY(6px); animation: h8bub .45s ease forwards; }
        #hv8 .h8-bub.u { margin-left: auto; background: var(--ink); color: #fff; border-bottom-right-radius: 4px; }
        #hv8 .h8-bub.a { background: var(--sky); color: var(--ink); border-bottom-left-radius: 4px; } #hv8 .h8-bub.a svg { vertical-align: -2px; margin-right: 5px; color: var(--verde); }
        #hv8 .h8-bub.a.ok { background: var(--lime); }
        #hv8 .h8-bub:nth-child(2) { animation-delay: .9s } #hv8 .h8-bub:nth-child(3) { animation-delay: 1.6s } #hv8 .h8-bub:nth-child(4) { animation-delay: 2.3s } #hv8 .h8-bub:nth-child(5) { animation-delay: 2.9s }
        @keyframes h8bub { to { opacity: 1; transform: none; } }
        #hv8 .h8-term { background: #0D0D12; border: 1px solid rgba(255,255,255,.08); border-radius: 12px; padding: 12px 14px; font-family: var(--mono); font-size: 12px; color: #a6a6b3; line-height: 1.8; }
        #hv8 .h8-term-cmd { color: #fff; overflow-wrap: anywhere; } #hv8 .h8-term-cmd span { color: var(--neon); margin-right: 6px; } #hv8 .h8-term-line.ok { color: var(--neon); }
        #hv8 .h8-m-ai { display: grid; gap: 12px; }
        #hv8 .h8-phone-top { position: absolute; top: 14px; left: 50%; transform: translateX(-50%); width: 70px; height: 18px; border-radius: 999px; background: #0D0D12; z-index: 2; }

        /* seções */
        #hv8 .h8-sec { padding: 88px 0; }
        #hv8 .h8-sec-alt { background: #fff; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
        #hv8 .h8-head { max-width: 800px; margin-bottom: 40px; } #hv8 .h8-head.h8-center { margin-left: auto; margin-right: auto; text-align: center; }
        #hv8 h2 { font-size: clamp(32px, 4.1vw, 50px); font-weight: 700; letter-spacing: -.04em; line-height: 1.06; margin: 14px 0 0; }
        #hv8 .h8-head p, #hv8 .h8-sub { color: var(--ink-2); font-size: 17px; line-height: 1.6; margin: 18px 0 0; }
        #hv8 .h8-caption { text-align: center; font-size: 12.5px; color: var(--mut); margin: 18px 0 0; }

        /* prova */
        #hv8 .h8-prova { padding-top: 72px; padding-bottom: 72px; }
        #hv8 .h8-marcas { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 22px 48px; padding: 6px 0 36px; border-bottom: 1px solid var(--line); }
        #hv8 .h8-marcas img { width: auto; max-width: 160px; object-fit: contain; }
        #hv8 .h8-marcas img.is-dim { filter: brightness(0); opacity: .82; }
        #hv8 .h8-metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); border-bottom: 1px solid var(--line); }
        #hv8 .h8-metric { padding: 30px 24px; border-left: 1px solid var(--line); }
        #hv8 .h8-metric:first-child { border-left: 0; padding-left: 0; }
        #hv8 .h8-metric-n { font-size: clamp(36px, 4vw, 52px); font-weight: 700; letter-spacing: -.04em; line-height: 1; } #hv8 .h8-metric-n span { font-size: .6em; color: var(--roxo); margin-left: 2px; }
        #hv8 .h8-metric-l { color: var(--ink-2); font-size: 14.5px; margin-top: 10px; }
        #hv8 .h8-backers { display: grid; grid-template-columns: 2fr 1fr; gap: 16px; margin-top: 32px; }
        #hv8 .h8-backer { border: 1px solid var(--line); border-radius: 18px; padding: 16px 20px 18px; background: #fff; }
        #hv8 .h8-backer-l { display: block; font-size: 11px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: var(--mut); margin-bottom: 10px; }
        #hv8 .h8-backer-imgs { display: flex; align-items: center; }
        #hv8 .h8-backer-imgs img { display: block; height: 46px; width: auto; max-width: 100%; }
        #hv8 .h8-backer.is-wide .h8-backer-imgs img { max-width: 50%; }
        #hv8 .h8-press { margin: 16px 0 0; display: flex; align-items: center; gap: 16px; border: 1px solid var(--line); border-radius: 18px; padding: 18px 22px; background: var(--bg); }
        #hv8 .h8-press-ico { width: 40px; height: 40px; border-radius: 12px; background: var(--lavender); color: var(--roxo-2); display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
        #hv8 .h8-press blockquote { margin: 0; flex: 1; font-size: 17px; font-weight: 600; letter-spacing: -.01em; line-height: 1.4; }
        #hv8 .h8-press figcaption { font-size: 13px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--mut); }

        /* cases */
        #hv8 .h8-spot { display: grid; grid-template-columns: auto 1.4fr 1fr; gap: 32px; align-items: center; background: var(--ink); color: #fff; border-radius: 26px; padding: 30px 34px; background-image: radial-gradient(60% 120% at 100% 0%, rgba(143,40,246,.45), transparent 60%); }
        #hv8 .h8-spot-who { display: flex; flex-direction: column; align-items: flex-start; gap: 12px; }
        #hv8 .h8-spot-who img { width: 92px; height: 92px; border-radius: 50%; }
        #hv8 .h8-spot-who b { display: block; font-size: 16px; } #hv8 .h8-spot-who span { font-size: 13px; color: rgba(255,255,255,.65); }
        #hv8 .h8-spot-main h3 { margin: 0; font-size: clamp(24px, 2.5vw, 32px); letter-spacing: -.03em; line-height: 1.12; }
        #hv8 .h8-spot-main p { margin: 12px 0 0; color: rgba(255,255,255,.72); font-size: 15px; line-height: 1.6; }
        #hv8 .h8-spot-stats { display: grid; gap: 14px; }
        #hv8 .h8-spot-stats div { border-left: 2px solid var(--neon); padding-left: 16px; }
        #hv8 .h8-spot-stats b { display: block; font-size: 34px; letter-spacing: -.04em; line-height: 1; }
        #hv8 .h8-spot-stats span { display: block; margin-top: 6px; font-size: 13.5px; color: rgba(255,255,255,.7); line-height: 1.45; }
        #hv8 .h8-cases-l { text-align: center; color: var(--ink-2); font-size: 15px; margin: 34px 0 16px; }
        #hv8 .h8-cases { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        #hv8 .h8-case { background: #fff; border: 1px solid var(--line); border-radius: 22px; padding: 18px; }
        #hv8 .h8-case-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 14px; }
        #hv8 .h8-case-logo { height: 26px; width: auto; max-width: 140px; object-fit: contain; } #hv8 .h8-case-logo.is-dark { filter: brightness(0); }
        #hv8 .h8-case-seg { font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--mut); }
        #hv8 .h8-ba { position: relative; height: 360px; border-radius: 14px; overflow: hidden; background: #eee; user-select: none; }
        #hv8 .h8-ba-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: top; }
        #hv8 .h8-ba-after { position: absolute; inset: 0; clip-path: inset(0 0 0 var(--x)); }
        #hv8 .h8-ba-bar { position: absolute; top: 0; bottom: 0; left: var(--x); width: 2px; background: #fff; box-shadow: 0 0 0 1px rgba(0,0,0,.15); pointer-events: none; }
        #hv8 .h8-ba-bar i { position: absolute; top: 50%; left: 50%; width: 34px; height: 34px; border-radius: 50%; background: var(--ink); transform: translate(-50%,-50%); box-shadow: 0 6px 16px rgba(0,0,0,.25); }
        #hv8 .h8-ba-bar i::before { content: "‹ ›"; color: #fff; font-size: 14px; font-weight: 700; position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; letter-spacing: 1px; }
        #hv8 .h8-ba-tag { position: absolute; top: 12px; font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; padding: 5px 10px; border-radius: 999px; background: rgba(22,22,28,.75); color: #fff; pointer-events: none; }
        #hv8 .h8-ba-tag.l { left: 12px; } #hv8 .h8-ba-tag.r { right: 12px; background: var(--verde); }
        #hv8 .h8-ba input[type=range] { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0; cursor: ew-resize; margin: 0; }
        #hv8 .h8-case-note { margin: 14px 0 0; font-size: 14px; color: var(--ink-2); line-height: 1.55; }

        /* banda do CLI */
        #hv8 .h8-band { background: radial-gradient(60% 70% at 85% 0%, rgba(143,40,246,.42), transparent 60%), radial-gradient(40% 50% at 0% 100%, rgba(57,255,20,.12), transparent 60%), #0F0F14; color: #fff; }
        #hv8 .h8-band .h8-head { max-width: 900px; } #hv8 .h8-band .h8-head p { color: rgba(255,255,255,.72); }
        #hv8 .h8-band .h8-dot { background: var(--neon); box-shadow: 0 0 0 3px rgba(57,255,20,.2); }
        #hv8 .h8-band-cmd { display: flex; align-items: center; justify-content: center; gap: 18px; flex-wrap: wrap; margin-top: 26px; }
        #hv8 .h8-cli-grid { display: grid; grid-template-columns: 1.15fr .85fr; gap: 16px; }
        #hv8 .h8-cli-term { background: #09090D; border: 1px solid rgba(255,255,255,.1); border-radius: 20px; overflow: hidden; }
        #hv8 .h8-cli-term-h { display: flex; align-items: center; gap: 6px; padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,.08); }
        #hv8 .h8-cli-term-h i { width: 10px; height: 10px; border-radius: 50%; background: #34343d; } #hv8 .h8-cli-term-h span { margin-left: 8px; font-size: 12px; color: #7d7d8a; font-family: var(--mono); }
        #hv8 .h8-cli-term-b { padding: 18px 20px 22px; font-family: var(--mono); font-size: 13px; line-height: 1.95; color: #b9b9c6; }
        #hv8 .h8-tl { overflow-wrap: anywhere; opacity: 0; animation: h8bub .4s ease forwards; }
        #hv8 .h8-tl.cmd { color: #fff; opacity: 1; animation: none; } #hv8 .h8-tl.cmd span, #hv8 .h8-tl.cmd > span:first-child { color: var(--neon); }
        #hv8 .h8-tl .q { color: #C9A8FF; font-weight: 600; } #hv8 .h8-tl .v { color: #fff; }
        #hv8 .h8-tl.ok { color: var(--neon); } #hv8 .h8-tl.ai { color: #E9DCFF; } #hv8 .h8-tl.ai svg { vertical-align: -2px; color: #C9A8FF; }
        #hv8 .h8-cli-side { display: grid; gap: 16px; }
        #hv8 .h8-cli-block { background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1); border-radius: 20px; padding: 20px; }
        #hv8 .h8-cli-l { display: block; font-size: 11px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: #C9A8FF; margin-bottom: 12px; }
        #hv8 .h8-estilos { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        #hv8 .h8-estilo { border: 1px solid rgba(255,255,255,.12); border-radius: 14px; padding: 12px 14px; }
        #hv8 .h8-estilo b { display: block; font-size: 16px; letter-spacing: -.01em; } #hv8 .h8-estilo span { display: block; font-size: 13px; color: rgba(255,255,255,.66); margin-top: 3px; line-height: 1.4; }
        #hv8 .h8-gera { display: flex; flex-wrap: wrap; gap: 7px; }
        #hv8 .h8-gera span { font-size: 13px; padding: 6px 11px; border-radius: 999px; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.1); }
        #hv8 .h8-agentes { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 16px; }
        #hv8 .h8-agente { background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1); border-radius: 18px; padding: 18px; }
        #hv8 .h8-agente-n { display: inline-flex; align-items: center; justify-content: center; min-width: 34px; height: 26px; padding: 0 8px; border-radius: 8px; background: rgba(143,40,246,.3); color: #E9DCFF; font-family: var(--mono); font-size: 12.5px; font-weight: 600; }
        #hv8 .h8-agente b { display: block; font-size: 17px; margin-top: 12px; letter-spacing: -.01em; } #hv8 .h8-agente p { margin: 6px 0 0; font-size: 13.5px; line-height: 1.5; color: rgba(255,255,255,.7); }
        #hv8 .h8-band-foot { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px 28px; margin-top: 26px; font-size: 14.5px; color: rgba(255,255,255,.82); }
        #hv8 .h8-band-foot span { display: inline-flex; align-items: center; gap: 8px; } #hv8 .h8-band-foot svg { color: var(--neon); flex-shrink: 0; }

        /* plataforma */
        #hv8 .h8-plat-head { padding-bottom: 40px; }
        #hv8 .h8-tour { position: sticky; top: 72px; z-index: 40; background: rgba(251,250,246,.92); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
        #hv8 .h8-tour-in { display: flex; align-items: center; gap: 18px; height: 54px; }
        #hv8 .h8-tour-l { font-size: 11px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: var(--mut); white-space: nowrap; }
        #hv8 .h8-tour-tabs { display: flex; gap: 4px; overflow-x: auto; scrollbar-width: none; } #hv8 .h8-tour-tabs::-webkit-scrollbar { display: none; }
        #hv8 .h8-tab { display: inline-flex; align-items: center; gap: 7px; padding: 5px 12px 5px 5px; border-radius: 999px; font-size: 13.5px; font-weight: 500; color: var(--ink-2); white-space: nowrap; transition: background .2s, color .2s; }
        #hv8 .h8-tab-ico { width: 26px; height: 26px; border-radius: 50%; background: rgba(22,22,28,.06); display: inline-flex; align-items: center; justify-content: center; }
        #hv8 .h8-tab:hover { background: rgba(22,22,28,.05); } #hv8 .h8-tab.is-on { background: var(--ink); color: #fff; } #hv8 .h8-tab.is-on .h8-tab-ico { background: rgba(255,255,255,.16); }
        #hv8 .h8-prod { padding: 80px 0; scroll-margin-top: 130px; border-bottom: 1px solid var(--line); }
        #hv8 .h8-prod-grid { display: grid; grid-template-columns: 1fr 1.15fr; gap: 64px; align-items: center; }
        #hv8 .h8-prod.is-rev .h8-prod-copy { order: 1; }
        #hv8 .h8-prod h2 { font-size: clamp(30px, 3.4vw, 44px); }
        #hv8 .h8-subs { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 24px; }
        #hv8 .h8-sub-card { background: #fff; border: 1px solid var(--line); border-radius: 16px; padding: 16px 18px; }
        #hv8 .h8-sub-h { display: flex; align-items: center; gap: 9px; font-size: 15.5px; font-weight: 600; letter-spacing: -.01em; }
        #hv8 .h8-sub-ico { width: 28px; height: 28px; border-radius: 9px; background: var(--t); color: var(--ink); display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
        #hv8 .h8-sub-card ul { list-style: none; margin: 12px 0 0; padding: 0; display: grid; gap: 6px; }
        #hv8 .h8-sub-card li { display: flex; align-items: flex-start; gap: 7px; font-size: 14px; color: var(--ink-2); line-height: 1.45; }
        #hv8 .h8-sub-card li svg { color: var(--verde); flex-shrink: 0; margin-top: 2px; }
        #hv8 .h8-math { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 14px; margin-top: 12px; border: 1px solid var(--line); border-radius: 16px; background: #fff; padding: 16px 18px; }
        #hv8 .h8-math b { display: block; font-size: 30px; letter-spacing: -.04em; line-height: 1; }
        #hv8 .h8-math div span { display: block; font-size: 13px; color: var(--ink-2); margin-top: 6px; line-height: 1.4; }
        #hv8 .h8-math-a b { color: var(--mut); } #hv8 .h8-math-b b { color: var(--verde); }
        #hv8 .h8-math-arrow { font-size: 22px; color: var(--mut); }
        #hv8 .h8-ai { margin-top: 12px; border-radius: 16px; padding: 18px 20px; background: #fff; border: 1px solid rgba(143,40,246,.28); position: relative; }
        #hv8 .h8-ai::before { content: ""; position: absolute; left: 0; top: 14px; bottom: 14px; width: 3px; border-radius: 3px; background: linear-gradient(180deg, var(--roxo), #B06BFF); }
        #hv8 .h8-ai-h { margin-bottom: 8px; } #hv8 .h8-ai b { display: block; font-size: 16.5px; letter-spacing: -.01em; } #hv8 .h8-ai p { margin: 6px 0 0; font-size: 14.5px; color: var(--ink-2); line-height: 1.55; }
        #hv8 .h8-prod-copy .h8-textlink { margin-top: 22px; }
        #hv8 .h8-visual-bg { border-radius: 28px; background: linear-gradient(160deg, var(--t2), var(--t)); padding: 28px; min-height: 460px; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; }
        #hv8 .h8-mock { position: relative; width: 100%; }
        #hv8 .h8-m-phone { width: 210px; height: 420px; border-radius: 28px; background: #0D0D12; padding: 9px; box-shadow: 0 30px 60px rgba(22,22,28,.25); position: relative; overflow: hidden; flex-shrink: 0; }
        #hv8 .h8-m-phone img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: top; border-radius: 20px; }
        #hv8 .h8-m-store { display: flex; gap: 22px; align-items: center; justify-content: center; }
        #hv8 .h8-m-agents { background: #fff; border-radius: 18px; padding: 16px; box-shadow: 0 20px 50px rgba(22,22,28,.12); width: 270px; display: grid; gap: 10px; }
        #hv8 .h8-m-agents-h { display: flex; flex-direction: column; align-items: flex-start; gap: 6px; font-size: 11.5px; color: var(--mut); padding-bottom: 8px; border-bottom: 1px solid var(--line); }
        #hv8 .h8-m-agent { display: flex; gap: 10px; align-items: flex-start; } #hv8 .h8-m-agent svg { color: var(--verde); margin-top: 3px; flex-shrink: 0; }
        #hv8 .h8-m-agent b { display: block; font-size: 13.5px; } #hv8 .h8-m-agent span { font-size: 12px; color: var(--mut); }
        #hv8 .h8-m-frame { border-radius: 16px; overflow: hidden; background: #fff; box-shadow: 0 24px 60px rgba(22,22,28,.18); }
        #hv8 .h8-m-frame img { display: block; width: 100%; height: auto; }
        #hv8 .h8-m-float { position: absolute; background: #fff; border: 1px solid var(--line); border-radius: 14px; padding: 10px 14px; box-shadow: 0 14px 34px rgba(22,22,28,.14); font-size: 12.5px; display: grid; gap: 2px; }
        #hv8 .h8-m-float b { font-size: 13.5px; } #hv8 .h8-m-float > span:not(.h8-aitag) { color: var(--mut); } #hv8 .h8-m-float .h8-aitag { justify-self: start; margin-bottom: 4px; }
        #hv8 .h8-m-float.fl1 { right: -8px; bottom: 26px; } #hv8 .h8-m-float.fl2 { left: -8px; top: -16px; }
        #hv8 .h8-m-pay { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        #hv8 .h8-m-stat { background: #fff; border-radius: 16px; padding: 16px; box-shadow: 0 14px 34px rgba(22,22,28,.1); display: grid; gap: 4px; }
        #hv8 .h8-m-stat span { font-size: 11.5px; color: var(--mut); } #hv8 .h8-m-stat b { font-size: 26px; letter-spacing: -.03em; line-height: 1.05; } #hv8 .h8-m-stat em { font-style: normal; font-size: 11.5px; color: var(--ink-2); }
        #hv8 .h8-m-strip { grid-column: 1 / -1; display: flex; align-items: center; gap: 10px; flex-wrap: wrap; background: #fff; border: 1px solid var(--line); border-radius: 14px; padding: 12px 14px; font-size: 13px; } #hv8 .h8-m-strip > span:last-child { color: var(--mut); margin-left: auto; }
        #hv8 .h8-m-shot { position: relative; padding: 0 0 96px; } #hv8 .h8-m-shot-img { display: block; width: 78%; border-radius: 14px; box-shadow: 0 20px 50px rgba(22,22,28,.14); } #hv8 .h8-m-shot-float { position: absolute; right: -6px; bottom: 0; width: 300px; }

        /* painel */
        #hv8 .h8-painel { border: 1px solid var(--line); border-radius: 28px; background: var(--bg); padding: 22px; }
        #hv8 .h8-painel-tabs { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; padding-bottom: 20px; border-bottom: 1px solid var(--line); }
        #hv8 .h8-painel-tab { display: inline-flex; align-items: center; gap: 8px; font-family: inherit; font-size: 14.5px; font-weight: 600; color: var(--ink-2); background: #fff; border: 1px solid var(--line); border-radius: 999px; padding: 9px 16px; cursor: pointer; transition: background .2s, color .2s, border-color .2s; }
        #hv8 .h8-painel-tab:hover { border-color: rgba(22,22,28,.25); }
        #hv8 .h8-painel-tab.is-on { background: var(--ink); color: #fff; border-color: var(--ink); }
        #hv8 .h8-painel-tab em { font-style: normal; font-size: 10px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; background: var(--neon); color: var(--ink); border-radius: 999px; padding: 2px 7px; }
        #hv8 .h8-painel-grid { display: grid; grid-template-columns: .8fr 1.2fr; gap: 32px; align-items: center; padding-top: 24px; animation: h8fade .45s ease; }
        #hv8 .h8-painel-copy h3 { margin: 0; font-size: clamp(24px, 2.4vw, 32px); letter-spacing: -.03em; line-height: 1.12; }
        #hv8 .h8-painel-copy p { margin: 12px 0 0; color: var(--ink-2); font-size: 16px; line-height: 1.6; }
        #hv8 .h8-painel-copy ul { list-style: none; margin: 18px 0 0; padding: 0; display: grid; gap: 9px; }
        #hv8 .h8-painel-copy li { display: flex; align-items: flex-start; gap: 9px; font-size: 15px; color: var(--ink); } #hv8 .h8-painel-copy li svg { color: var(--verde); flex-shrink: 0; margin-top: 3px; }
        #hv8 .h8-pm { background: #fff; border: 1px solid var(--line); border-radius: 18px; overflow: hidden; }
        #hv8 .h8-pm-bar { display: flex; align-items: center; gap: 10px; padding: 11px 14px; border-bottom: 1px solid var(--line); font-size: 12px; color: var(--mut); background: #fcfcfd; }
        #hv8 .h8-pm-dots { display: inline-flex; gap: 5px; } #hv8 .h8-pm-dots i { width: 9px; height: 9px; border-radius: 50%; background: #e2e2e8; }
        #hv8 .h8-pm-body { padding: 16px; display: grid; gap: 12px; }
        #hv8 .h8-pm-ask { background: var(--ink); color: #fff; border-radius: 14px; padding: 14px; }
        #hv8 .h8-pm-ask-h { display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; } #hv8 .h8-pm-ask-h svg { color: #C9A8FF; }
        #hv8 .h8-pm-ask-h em { font-style: normal; font-size: 10px; font-weight: 700; letter-spacing: .1em; background: var(--neon); color: var(--ink); border-radius: 999px; padding: 2px 7px; }
        #hv8 .h8-pm-input { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: 10px; background: #fff; color: var(--ink); border-radius: 10px; padding: 9px 9px 9px 12px; font-size: 13.5px; }
        #hv8 .h8-pm-input i { width: 28px; height: 28px; border-radius: 50%; background: var(--roxo); color: #fff; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
        #hv8 .h8-pm-paths { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; } #hv8 .h8-pm-paths span { font-size: 12px; padding: 5px 10px; border-radius: 999px; border: 1px solid rgba(255,255,255,.2); color: rgba(255,255,255,.85); }
        #hv8 .h8-pm-plan { border: 1px solid var(--line); border-radius: 14px; padding: 12px; display: grid; gap: 8px; }
        #hv8 .h8-pm-plan-h { display: flex; align-items: center; justify-content: space-between; gap: 8px; font-size: 12px; color: var(--mut); padding-bottom: 8px; border-bottom: 1px solid var(--line); }
        #hv8 .h8-pm-row { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 10px; font-size: 13px; } #hv8 .h8-pm-row b { display: block; font-size: 13.5px; } #hv8 .h8-pm-row div span { color: var(--mut); font-size: 12px; } #hv8 .h8-pm-row > svg { color: var(--verde); }
        #hv8 .h8-pm-ico { width: 30px; height: 30px; border-radius: 9px; background: var(--lavender); color: var(--roxo-2); display: inline-flex; align-items: center; justify-content: center; }
        #hv8 .h8-pm-btn { margin-top: 4px; text-align: center; background: var(--ink); color: #fff; font-size: 13px; font-weight: 600; border-radius: 10px; padding: 9px; }
        #hv8 .h8-pm-kpis { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; } #hv8 .h8-pm-kpis.is-3 { grid-template-columns: repeat(3, 1fr); }
        #hv8 .h8-pm-kpi { border: 1px solid var(--line); border-radius: 12px; padding: 10px 12px; } #hv8 .h8-pm-kpi span { display: block; font-size: 11px; color: var(--mut); } #hv8 .h8-pm-kpi b { display: block; font-size: 18px; letter-spacing: -.02em; margin-top: 2px; } #hv8 .h8-pm-kpi em { font-style: normal; font-size: 11.5px; font-weight: 600; color: var(--verde); }
        #hv8 .h8-pm-card { border: 1px solid var(--line); border-radius: 14px; padding: 12px; display: grid; gap: 10px; } #hv8 .h8-pm-card.is-flush { padding: 0; overflow: hidden; }
        #hv8 .h8-pm-card-h { display: flex; justify-content: space-between; align-items: center; gap: 8px; font-size: 12px; color: var(--mut); } #hv8 .h8-pm-card-h b { color: var(--ink); font-size: 13.5px; }
        #hv8 .h8-pm-meter { display: grid; grid-template-columns: 1fr 1.2fr; align-items: center; gap: 12px; } #hv8 .h8-pm-meter b { display: block; font-size: 13px; } #hv8 .h8-pm-meter span { font-size: 11.5px; color: var(--mut); }
        #hv8 .h8-pm-meter i { display: block; height: 8px; border-radius: 999px; background: var(--lavender); overflow: hidden; } #hv8 .h8-pm-meter i span { display: block; height: 100%; border-radius: 999px; background: linear-gradient(90deg, var(--roxo), #B06BFF); }
        #hv8 .h8-pm-meter.is-tight { grid-template-columns: .9fr 1.1fr; }
        #hv8 .h8-pm-split { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        #hv8 .h8-pm-err { display: flex; align-items: baseline; gap: 8px; } #hv8 .h8-pm-err b { font-size: 26px; letter-spacing: -.03em; } #hv8 .h8-pm-err span { font-size: 12.5px; color: var(--ink-2); } #hv8 .h8-pm-err.ok b { color: var(--verde); }
        #hv8 .h8-pm-table { display: grid; }
        #hv8 .h8-pm-tr { display: grid; grid-template-columns: 1.6fr 1fr .6fr .7fr; gap: 8px; align-items: center; padding: 11px 14px; font-size: 13px; border-top: 1px solid var(--line); }
        #hv8 .h8-pm-tr.is-head { border-top: 0; font-size: 11px; font-weight: 600; letter-spacing: .04em; color: var(--mut); background: #fcfcfd; }
        #hv8 .h8-pm-on { display: inline-flex; align-items: center; gap: 6px; font-weight: 600; color: var(--verde); } #hv8 .h8-pm-on::before { content: ""; width: 8px; height: 8px; border-radius: 50%; background: var(--verde); }
        #hv8 .h8-pm-share { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; border: 1px solid var(--line); border-radius: 14px; padding: 12px; }
        #hv8 .h8-pm-share > div { flex: 1; min-width: 150px; } #hv8 .h8-pm-share b { display: block; font-size: 13.5px; } #hv8 .h8-pm-share div span { font-size: 12px; color: var(--mut); }
        #hv8 .h8-pm-share-b { display: inline-flex; align-items: center; gap: 6px; font-size: 12.5px; font-weight: 600; border: 1px solid var(--line); border-radius: 10px; padding: 8px 11px; } #hv8 .h8-pm-share-b.is-wa { background: #EAF9EF; border-color: #CBEFD7; color: #13733A; }
        #hv8 .h8-pm-editor { grid-template-columns: 150px 1fr; }
        #hv8 .h8-pm-menu { display: grid; gap: 2px; align-content: start; } #hv8 .h8-pm-menu span { display: flex; align-items: center; justify-content: space-between; gap: 6px; font-size: 12.5px; color: var(--ink-2); padding: 7px 9px; border-radius: 8px; }
        #hv8 .h8-pm-menu span.is-on { background: var(--lavender); color: var(--roxo-2); font-weight: 600; }
        #hv8 .h8-pm-menu em { font-style: normal; font-size: 9.5px; font-weight: 700; color: #fff; background: var(--verde); border-radius: 999px; padding: 1px 6px; }
        #hv8 .h8-pm-preview { border: 1px solid var(--line); border-radius: 12px; overflow: hidden; }
        #hv8 .h8-pm-preview-h { display: flex; align-items: center; justify-content: space-between; padding: 8px 10px; border-bottom: 1px solid var(--line); font-size: 12px; }
        #hv8 .h8-pm-pub { display: inline-flex; align-items: center; gap: 6px; font-weight: 600; color: var(--verde); } #hv8 .h8-pm-pub i { width: 7px; height: 7px; border-radius: 50%; background: var(--verde); }
        #hv8 .h8-pm-dev { display: inline-flex; gap: 8px; color: var(--mut); }
        #hv8 .h8-pm-preview img { display: block; width: 100%; height: 230px; object-fit: cover; object-position: top left; }

        /* comparativo (classes h8-vs, sem colisão com o slider) */
        #hv8 .h8-vs-wrap { overflow-x: auto; }
        #hv8 .h8-vs { width: 100%; min-width: 760px; border-collapse: separate; border-spacing: 0; }
        #hv8 .h8-vs th, #hv8 .h8-vs td { text-align: center; padding: 14px 10px; }
        #hv8 .h8-vs thead th { font-size: 14px; font-weight: 600; color: var(--ink-2); border-bottom: 1px solid var(--line); }
        #hv8 .h8-vs thead th.is-us { color: var(--ink); font-weight: 700; background: var(--lavender); border-radius: 14px 14px 0 0; }
        #hv8 .h8-vs tbody th { text-align: left; width: 38%; padding: 16px 18px 16px 0; border-bottom: 1px solid var(--line); font-weight: 400; }
        #hv8 .h8-vs tbody th b { display: block; font-size: 16px; font-weight: 600; letter-spacing: -.01em; }
        #hv8 .h8-vs tbody th span { display: block; font-size: 13.5px; color: var(--ink-2); line-height: 1.5; margin-top: 4px; }
        #hv8 .h8-vs tbody th em { display: block; font-style: normal; font-size: 12px; color: var(--mut); margin-top: 6px; }
        #hv8 .h8-vs tbody td { border-bottom: 1px solid var(--line); }
        #hv8 .h8-vs tbody td.is-us { background: var(--lavender); }
        #hv8 .h8-vs tbody tr:last-child td.is-us { border-radius: 0 0 14px 14px; }
        #hv8 .h8-vs-mark { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 50%; font-weight: 700; font-size: 15px; }
        #hv8 .h8-vs .v-y .h8-vs-mark { background: var(--verde); color: #fff; }
        #hv8 .h8-vs .v-p .h8-vs-mark { background: var(--ambar); color: #5C3D00; }
        #hv8 .h8-vs .v-n .h8-vs-mark { color: var(--mut); }
        #hv8 .h8-vs-legend { display: flex; gap: 22px; flex-wrap: wrap; justify-content: center; margin: 22px 0 0; font-size: 13px; color: var(--ink-2); }
        #hv8 .h8-vs-legend span { display: inline-flex; align-items: center; gap: 7px; }
        #hv8 .h8-vs-legend i { display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; border-radius: 50%; font-style: normal; font-weight: 700; font-size: 12px; }
        #hv8 .h8-vs-legend .l-y { background: var(--verde); color: #fff; } #hv8 .h8-vs-legend .l-p { background: var(--ambar); color: #5C3D00; } #hv8 .h8-vs-legend .l-n { color: var(--mut); }

        /* integrações */
        #hv8 .h8-split { display: grid; grid-template-columns: 1fr 1.15fr; gap: 64px; align-items: center; }
        #hv8 .h8-split-copy h2 { font-size: clamp(30px, 3.4vw, 44px); } #hv8 .h8-split-copy .h8-textlink { margin-top: 22px; }
        #hv8 .h8-int { display: grid; gap: 18px; }
        #hv8 .h8-int-l { display: block; font-size: 11px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: var(--mut); margin-bottom: 8px; }
        #hv8 .h8-int-items { display: flex; flex-wrap: wrap; gap: 8px; }
        #hv8 .h8-int-item { display: inline-flex; align-items: center; gap: 8px; background: var(--bg); border: 1px solid var(--line); border-radius: 999px; padding: 9px 14px; font-size: 14px; font-weight: 500; color: var(--ink-2); }
        #hv8 .h8-int-item.is-ai { color: var(--ink); border-color: rgba(143,40,246,.35); background: #fff; }

        /* planos e taxas */
        #hv8 .h8-planos { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        #hv8 .h8-plano { display: flex; flex-direction: column; background: #fff; border: 1px solid var(--line); border-radius: 22px; padding: 24px; }
        #hv8 .h8-plano.is-rec { border-color: rgba(143,40,246,.45); box-shadow: 0 0 0 3px rgba(143,40,246,.1); }
        #hv8 .h8-plano-h { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
        #hv8 .h8-plano-h b { font-size: 30px; letter-spacing: -.04em; }
        #hv8 .h8-plano-h span { font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; background: var(--neon); color: var(--ink); border-radius: 999px; padding: 5px 10px; }
        #hv8 .h8-plano ul { list-style: none; margin: 18px 0 0; padding: 0; display: grid; gap: 8px; flex: 1; }
        #hv8 .h8-plano li { display: flex; align-items: flex-start; gap: 8px; font-size: 14.5px; color: var(--ink-2); line-height: 1.45; } #hv8 .h8-plano li svg { color: var(--verde); flex-shrink: 0; margin-top: 2px; }
        #hv8 .h8-plano-math { margin: 20px 0 18px; border-top: 1px solid var(--line); }
        #hv8 .h8-plano-math div { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; padding: 11px 0; border-bottom: 1px solid var(--line); font-size: 14px; }
        #hv8 .h8-plano-math span { color: var(--ink-2); } #hv8 .h8-plano-math b { font-size: 17px; letter-spacing: -.01em; }
        #hv8 .h8-plano-math .is-fee b { color: var(--roxo-2); font-size: 22px; }
        #hv8 .h8-taxas { display: grid; grid-template-columns: .8fr 1.2fr; gap: 28px; align-items: center; margin-top: 16px; background: #fff; border: 1px solid var(--line); border-radius: 22px; padding: 24px; }
        #hv8 .h8-taxas-copy h3 { margin: 12px 0 0; font-size: 26px; letter-spacing: -.03em; line-height: 1.15; }
        #hv8 .h8-taxas-pills { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
        #hv8 .h8-taxas-pills span { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; border: 1px solid var(--line); border-radius: 999px; padding: 7px 12px; background: var(--bg); } #hv8 .h8-taxas-pills svg { color: var(--verde); }
        #hv8 .h8-taxas-wrap { overflow-x: auto; }
        #hv8 .h8-taxas-t { width: 100%; min-width: 440px; border-collapse: collapse; font-size: 14.5px; }
        #hv8 .h8-taxas-t th, #hv8 .h8-taxas-t td { padding: 11px 12px; border-bottom: 1px solid var(--line); text-align: right; }
        #hv8 .h8-taxas-t thead th { font-size: 12px; font-weight: 700; letter-spacing: .06em; color: var(--mut); text-transform: uppercase; }
        #hv8 .h8-taxas-t th:first-child { text-align: left; } #hv8 .h8-taxas-t tbody th { font-weight: 500; color: var(--ink-2); }
        #hv8 .h8-taxas-t td { font-weight: 700; font-variant-numeric: tabular-nums; }

        /* faq, final, footer */
        #hv8 .h8-faq-item { border-top: 1px solid var(--line); } #hv8 .h8-faq-item:last-child { border-bottom: 1px solid var(--line); }
        #hv8 .h8-faq-q { width: 100%; display: flex; justify-content: space-between; align-items: center; gap: 16px; background: none; border: 0; padding: 22px 0; text-align: left; cursor: pointer; font-family: inherit; color: var(--ink); font-weight: 600; font-size: 17px; }
        #hv8 .h8-faq-q i { width: 30px; height: 30px; border-radius: 50%; border: 1px solid var(--line); display: inline-flex; align-items: center; justify-content: center; transition: transform .25s, background .2s; flex-shrink: 0; }
        #hv8 .h8-faq-item.is-open .h8-faq-q i { transform: rotate(45deg); background: var(--ink); color: #fff; border-color: var(--ink); }
        #hv8 .h8-faq-a { max-height: 0; overflow: hidden; transition: max-height .35s ease; } #hv8 .h8-faq-item.is-open .h8-faq-a { max-height: 340px; }
        #hv8 .h8-faq-a p { margin: 0 0 22px; color: var(--ink-2); font-size: 15.5px; line-height: 1.6; overflow-wrap: anywhere; }
        #hv8 .h8-final-wrap { padding: 72px 0; }
        #hv8 .h8-final { border-radius: 32px; padding: 72px 40px; text-align: center; color: #fff; background: radial-gradient(70% 90% at 80% 0%, rgba(143,40,246,.6), transparent 60%), radial-gradient(50% 70% at 10% 100%, rgba(57,255,20,.22), transparent 60%), var(--ink); }
        #hv8 .h8-final h2 { margin: 0; font-size: clamp(34px, 4.6vw, 58px); }
        #hv8 .h8-final p { color: rgba(255,255,255,.75); font-size: 18px; margin: 18px auto 0; max-width: 600px; } #hv8 .h8-final .h8-cta-row { margin-top: 30px; justify-content: center; }
        #hv8 .h8-final-cmd { margin-top: 20px; display: flex; justify-content: center; }
        #hv8 .h8-footer { padding: 56px 0 28px; border-top: 1px solid var(--line); }
        #hv8 .h8-footer-grid { display: grid; grid-template-columns: 1.6fr 1fr 1fr 1fr; gap: 32px; }
        #hv8 .h8-footer-brand p { color: var(--mut); font-size: 14px; margin-top: 12px; max-width: 300px; }
        #hv8 .h8-footer h4 { margin: 0 0 12px; font-size: 13px; letter-spacing: .1em; text-transform: uppercase; color: var(--mut); }
        #hv8 .h8-footer-grid a { display: block; font-size: 15px; padding: 5px 0; color: var(--ink-2); } #hv8 .h8-footer-grid a:hover { color: var(--ink); }
        #hv8 .h8-footer-bottom { margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--line); color: var(--mut); font-size: 13px; }

        @media (max-width: 1240px) {
          #hv8 .h8-logos { grid-template-columns: 1fr; gap: 8px; justify-items: center; }
        }
        @media (max-width: 980px) {
          #hv8 .h8-links, #hv8 .h8-nav-cta .h8-btn-ghost, #hv8 .h8-nav-cta .h8-btn-dark { display: none; } #hv8 .h8-burger { display: inline-flex; }
          #hv8 .h8-prod-grid, #hv8 .h8-split, #hv8 .h8-cli-grid, #hv8 .h8-painel-grid, #hv8 .h8-taxas { grid-template-columns: 1fr; gap: 28px; }
          #hv8 .h8-showcase { grid-template-columns: 1fr; padding: 26px 22px 0; } #hv8 .h8-showcase-copy { padding-bottom: 8px; }
          #hv8 .h8-prod.is-rev .h8-prod-copy { order: 0; }
          #hv8 .h8-cases, #hv8 .h8-planos { grid-template-columns: 1fr; } #hv8 .h8-metrics-grid { grid-template-columns: repeat(2, 1fr); }
          #hv8 .h8-metric:nth-child(3) { border-left: 0; padding-left: 0; } #hv8 .h8-metric:nth-child(-n+2) { border-bottom: 1px solid var(--line); }
          #hv8 .h8-spot { grid-template-columns: 1fr; gap: 20px; padding: 26px; } #hv8 .h8-spot-who { flex-direction: row; align-items: center; } #hv8 .h8-spot-who img { width: 64px; height: 64px; }
          #hv8 .h8-spot-stats { grid-template-columns: 1fr 1fr; }
          #hv8 .h8-backers { grid-template-columns: 1fr; }
          #hv8 .h8-logos-g { flex-direction: column; gap: 8px; } #hv8 .h8-logos-row { justify-content: center; }
          #hv8 .h8-tour-l { display: none; } #hv8 .h8-prod { padding: 60px 0; scroll-margin-top: 126px; }
          #hv8 .h8-footer-grid { grid-template-columns: 1fr 1fr; } #hv8 .h8-sec { padding: 64px 0; }
          #hv8 .h8-visual-bg { padding: 20px; min-height: 0; }
          #hv8 .h8-painel-tabs { flex-wrap: nowrap; justify-content: flex-start; overflow-x: auto; scrollbar-width: none; margin: 0 -22px; padding: 0 22px 18px; } #hv8 .h8-painel-tabs::-webkit-scrollbar { display: none; }
          #hv8 .h8-painel-tab { flex-shrink: 0; }
        }
        @media (max-width: 640px) {
          #hv8 .h8-wrap { padding: 0 18px; }
          #hv8 .h8-announce { font-size: 12.5px; padding: 8px 14px; } #hv8 .h8-announce b { display: none; }
          #hv8 .h8-hero { padding-top: 48px; }
          #hv8 .h8-cta-row .h8-btn-lg { width: 100%; }
          #hv8 .h8-cmd { font-size: 11.5px; padding: 6px 6px 6px 11px; gap: 8px; } #hv8 .h8-cmd-c { padding: 7px 9px; font-size: 12px; }
          #hv8 .h8-subs, #hv8 .h8-footer-grid, #hv8 .h8-estilos { grid-template-columns: 1fr; }
          #hv8 .h8-agentes { grid-template-columns: 1fr 1fr; }
          #hv8 .h8-ba { height: 300px; }
          #hv8 .h8-m-store { flex-direction: column; } #hv8 .h8-m-pay { grid-template-columns: 1fr 1fr; }
          #hv8 .h8-panel { border-radius: 22px; padding: 18px 14px 0; } #hv8 .h8-ptab-lbl { display: none; } #hv8 .h8-ptab { padding: 6px; } #hv8 .h8-showcase-media img { height: 220px; }
          #hv8 .h8-m-shot { padding-bottom: 0; } #hv8 .h8-m-shot-img { width: 100%; } #hv8 .h8-m-shot-float { position: static; width: 100%; margin-top: 12px; }
          #hv8 .h8-marcas { gap: 18px 30px; } #hv8 .h8-marcas img { max-width: 120px; }
          #hv8 .h8-metric { padding: 22px 0 22px 16px; } #hv8 .h8-metric:nth-child(odd) { padding-left: 0; border-left: 0; }
          #hv8 .h8-backer-imgs { flex-direction: column; align-items: flex-start; gap: 6px; } #hv8 .h8-backer.is-wide .h8-backer-imgs img { max-width: 100%; }
          #hv8 .h8-backer-imgs img { height: auto; width: 100%; }
          #hv8 .h8-press { flex-direction: column; align-items: flex-start; gap: 10px; }
          #hv8 .h8-spot-stats { grid-template-columns: 1fr; }
          #hv8 .h8-math { grid-template-columns: 1fr; gap: 8px; } #hv8 .h8-math-arrow { display: none; }
          #hv8 .h8-painel { padding: 16px; border-radius: 22px; } #hv8 .h8-painel-tabs { margin: 0 -16px; padding: 0 16px 16px; }
          #hv8 .h8-pm-kpis, #hv8 .h8-pm-kpis.is-3, #hv8 .h8-pm-split { grid-template-columns: 1fr 1fr; }
          #hv8 .h8-pm-editor { grid-template-columns: 1fr; } #hv8 .h8-pm-menu { grid-template-columns: 1fr 1fr; }
          #hv8 .h8-pm-tr { grid-template-columns: 1.4fr 1fr .5fr; } #hv8 .h8-pm-tr > span:nth-child(4) { display: none; }
          #hv8 .h8-final { padding: 48px 20px; border-radius: 24px; }
          #hv8 .h8-vs-wrap { overflow: visible; }
          #hv8 .h8-vs { min-width: 0; display: block; }
          #hv8 .h8-vs thead { display: none; }
          #hv8 .h8-vs tbody { display: block; }
          #hv8 .h8-vs tbody tr { display: grid; grid-template-columns: repeat(5, 1fr); gap: 5px; padding: 18px 0; border-bottom: 1px solid var(--line); }
          #hv8 .h8-vs tbody th { grid-column: 1 / -1; width: auto; padding: 0 0 10px; border: 0; }
          #hv8 .h8-vs tbody td { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 9px 2px 8px; border: 0; border-radius: 12px; }
          #hv8 .h8-vs tbody td::after { content: attr(data-l); font-size: 10.5px; font-weight: 600; color: var(--ink-2); letter-spacing: -.01em; }
          #hv8 .h8-vs tbody td.is-us, #hv8 .h8-vs tbody tr:last-child td.is-us { border-radius: 12px; }
          #hv8 .h8-vs tbody td.is-us::after { color: var(--roxo-2); }
          #hv8 .h8-vs-mark { width: 26px; height: 26px; font-size: 14px; }
          #hv8 .h8-taxas { padding: 18px; }
          #hv8 .h8-taxas-t { min-width: 0; font-size: 13px; }
          #hv8 .h8-taxas-t th, #hv8 .h8-taxas-t td { padding: 10px 4px; }
          #hv8 .h8-taxas-t thead th { font-size: 10px; letter-spacing: .02em; line-height: 1.3; }
          #hv8 .h8-taxas-t tbody th { font-size: 12.5px; }
          #hv8 .h8-cli-term-b { font-size: 11.5px; padding: 14px 14px 18px; }
          #hv8 .h8-band-foot { flex-direction: column; align-items: flex-start; gap: 10px; }
          #hv8 .h8-final-wrap { padding: 48px 0; }
        }
        @media (prefers-reduced-motion: reduce) { #hv8 [data-rv] { opacity: 1 !important; transform: none !important; } #hv8 .h8-bub, #hv8 .h8-tl { opacity: 1; animation: none; } #hv8 .h8-showcase, #hv8 .h8-painel-grid { animation: none; } }
      
        /* ── v8: hero · alavancas de receita ── */
        #hv8 .h8-receita { scroll-margin-top: 96px; }
        #hv8 .h8-panel-eye { text-align: center; margin: -4px 0 14px; font-size: 11.5px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: var(--ink-2); }
        #hv8 .h8-stat { display: flex; align-items: baseline; gap: 12px; margin: 2px 0 16px; padding: 12px 14px; border: 1px solid rgba(31,191,90,.3); background: #F2FBF5; border-radius: 14px; }
        #hv8 .h8-stat b { font-size: 34px; letter-spacing: -.04em; line-height: 1; color: #13733A; white-space: nowrap; }
        #hv8 .h8-stat span { font-size: 14px; color: var(--ink-2); line-height: 1.4; }
        #hv8 .h8-how { display: inline-flex; flex-wrap: wrap; gap: 6px; font-size: 13px; color: var(--mut); } #hv8 .h8-how b { color: var(--ink); font-weight: 600; }
        #hv8 .h8-m-cr { display: grid; gap: 12px; }
        #hv8 .h8-m-cr-math { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 12px; background: #fff; border-radius: 16px; padding: 18px; box-shadow: 0 14px 34px rgba(22,22,28,.1); }
        #hv8 .h8-m-cr-math > div { display: grid; gap: 3px; } #hv8 .h8-m-cr-math span { font-size: 12px; color: var(--mut); } #hv8 .h8-m-cr-math b { font-size: 34px; letter-spacing: -.04em; line-height: 1; } #hv8 .h8-m-cr-math em { font-style: normal; font-size: 12px; color: var(--ink-2); }
        #hv8 .h8-m-cr-math .is-a b { color: var(--mut); } #hv8 .h8-m-cr-math .is-b b { color: var(--verde); }
        #hv8 .h8-m-cr-arrow { font-size: 22px; color: var(--mut) !important; }
        #hv8 .h8-m-cr-flow { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
        #hv8 .h8-m-cr-flow > div { background: #fff; border-radius: 14px; padding: 12px; box-shadow: 0 10px 26px rgba(22,22,28,.08); display: grid; gap: 8px; align-content: start; }
        #hv8 .h8-m-cr-flow i { font-style: normal; width: 24px; height: 24px; border-radius: 50%; background: var(--ink); color: #fff; font-size: 12px; font-weight: 700; display: inline-flex; align-items: center; justify-content: center; }
        #hv8 .h8-m-cr-flow span { font-size: 12.5px; font-weight: 600; line-height: 1.3; }

        /* ── v8: custo de ficar ── */
        #hv8 .h8-pains { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
        #hv8 .h8-pain { display: flex; flex-direction: column; background: #fff; border: 1px solid var(--line); border-radius: 20px; padding: 22px; }
        #hv8 .h8-pain-n { font-family: var(--mono); font-size: 13px; color: var(--roxo-2); font-weight: 600; }
        #hv8 .h8-pain > b { display: block; font-size: 18.5px; letter-spacing: -.02em; line-height: 1.2; margin: 10px 0 8px; }
        #hv8 .h8-pain > p { margin: 0 0 16px; font-size: 14.5px; line-height: 1.55; color: var(--ink-2); flex: 1; }
        #hv8 .h8-pain-fix { display: flex; gap: 8px; align-items: flex-start; padding-top: 14px; border-top: 1px solid var(--line); font-size: 13.5px; line-height: 1.45; color: var(--ink); }
        #hv8 .h8-pain-fix svg { color: var(--verde); flex-shrink: 0; margin-top: 2px; } #hv8 .h8-pain-fix em { font-style: normal; font-weight: 700; color: #13733A; }
        #hv8 .h8-cmp-head { text-align: center; max-width: 760px; margin: 72px auto 28px; }
        #hv8 .h8-cmp-head h3 { margin: 0; font-size: clamp(28px, 3.2vw, 40px); letter-spacing: -.035em; line-height: 1.08; }
        #hv8 .h8-cmp-head p { margin: 12px 0 0; color: var(--ink-2); font-size: 16px; line-height: 1.6; }

        /* ── v8: no automático ── */
        #hv8 .h8-auto { border: 1px solid rgba(255,255,255,.12); border-radius: 28px; background: rgba(255,255,255,.04); padding: 22px; }
        #hv8 .h8-auto-tabs { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; padding-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,.1); }
        #hv8 .h8-auto-tab { display: inline-flex; align-items: center; gap: 8px; font-family: inherit; font-size: 14.5px; font-weight: 600; color: rgba(255,255,255,.82); background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.14); border-radius: 999px; padding: 9px 16px; cursor: pointer; transition: background .2s, color .2s; }
        #hv8 .h8-auto-tab:hover { background: rgba(255,255,255,.12); }
        #hv8 .h8-auto-tab.is-on { background: #fff; color: var(--ink); border-color: #fff; }
        #hv8 .h8-auto-tab em { font-style: normal; font-size: 10px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; background: var(--neon); color: var(--ink); border-radius: 999px; padding: 2px 7px; }
        #hv8 .h8-auto-grid { display: grid; grid-template-columns: .8fr 1.2fr; gap: 32px; align-items: center; padding-top: 24px; animation: h8fade .45s ease; }
        #hv8 .h8-auto-copy h3 { margin: 0; font-size: clamp(24px, 2.4vw, 32px); letter-spacing: -.03em; line-height: 1.12; color: #fff; }
        #hv8 .h8-auto-copy p { margin: 12px 0 0; color: rgba(255,255,255,.74); font-size: 16px; line-height: 1.6; }
        #hv8 .h8-auto-copy ul { list-style: none; margin: 18px 0 0; padding: 0; display: grid; gap: 9px; }
        #hv8 .h8-auto-copy li { display: flex; align-items: flex-start; gap: 9px; font-size: 15px; color: #fff; } #hv8 .h8-auto-copy li svg { color: var(--neon); flex-shrink: 0; margin-top: 3px; }
        #hv8 .h8-auto-copy .h8-textlink { margin-top: 18px; }
        #hv8 .h8-auto-screen .h8-pm { color: var(--ink); }
        #hv8 .h8-auto-grid > *, #hv8 .h8-showcase > *, #hv8 .h8-split > *, #hv8 .h8-paths > * { min-width: 0; }
        #hv8 .h8-footer-grid a.h8-logo { display: inline-flex; padding: 0; }
        #hv8 .h8-auto-screen .h8-pm-err b { white-space: nowrap; }
        #hv8 .h8-pm-term { background: #0D0D12; padding: 16px 18px 20px; font-family: var(--mono); font-size: 12.5px; line-height: 1.9; color: #b9b9c6; }
        #hv8 .h8-pm-term div { overflow-wrap: anywhere; } #hv8 .h8-pm-term .c { color: #fff; } #hv8 .h8-pm-term .c span { color: var(--neon); margin-right: 6px; }
        #hv8 .h8-pm-term .q { color: #C9A8FF; font-weight: 600; } #hv8 .h8-pm-term b { color: #fff; font-weight: 400; } #hv8 .h8-pm-term .ok { color: var(--neon); } #hv8 .h8-pm-term .ai { color: #E9DCFF; } #hv8 .h8-pm-term .ai svg { vertical-align: -2px; color: #C9A8FF; }
        #hv8 .h8-pm-proof { padding: 14px; display: grid; gap: 12px; }
        #hv8 .h8-pm-proof figure { margin: 0; } #hv8 .h8-pm-proof figcaption { font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--mut); margin-bottom: 8px; }
        #hv8 .h8-pm-proof img { display: block; width: 100%; height: auto; border-radius: 10px; border: 1px solid var(--line); }
        #hv8 .h8-pm-proof figure:last-child img { max-height: 230px; object-fit: cover; object-position: top; }
        #hv8 .h8-agentes { display: flex; align-items: center; justify-content: center; gap: 12px 16px; flex-wrap: wrap; margin-top: 22px; }
        #hv8 .h8-agentes-l { font-size: 11.5px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: #C9A8FF; }
        #hv8 .h8-agentes-row { display: flex; flex-wrap: wrap; justify-content: center; gap: 7px; }
        #hv8 .h8-agentes-row span { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; padding: 6px 11px; border-radius: 999px; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.12); color: #fff; } #hv8 .h8-agentes-row svg { color: #C9A8FF; }
        #hv8 .h8-caption.light { color: rgba(255,255,255,.5); }

        /* ── v8: migração ── */
        #hv8 .h8-steps { display: grid; gap: 10px; margin-top: 24px; }
        #hv8 .h8-step { display: flex; gap: 14px; align-items: flex-start; background: var(--bg); border: 1px solid var(--line); border-radius: 16px; padding: 16px 18px; }
        #hv8 .h8-step > span { font-family: var(--mono); font-size: 13px; font-weight: 600; color: var(--roxo-2); padding-top: 2px; }
        #hv8 .h8-step b { display: block; font-size: 16.5px; letter-spacing: -.01em; } #hv8 .h8-step p { margin: 4px 0 0; font-size: 14.5px; color: var(--ink-2); line-height: 1.5; }
        #hv8 .h8-migra-side { display: grid; gap: 18px; }
        #hv8 .h8-int-title { display: block; font-size: 17px; font-weight: 600; letter-spacing: -.01em; padding-top: 18px; border-top: 1px solid var(--line); }
        #hv8 .h8-int-more { font-size: 13.5px; color: var(--mut); align-self: center; }

        /* ── v8: como começar ── */
        #hv8 .h8-paths { display: grid; grid-template-columns: 1.15fr 1fr 1fr; gap: 16px; align-items: stretch; }
        #hv8 .h8-path { display: flex; flex-direction: column; background: #fff; border: 1px solid var(--line); border-radius: 22px; padding: 26px; }
        #hv8 .h8-path.is-main { border-color: rgba(31,191,90,.45); box-shadow: 0 0 0 3px rgba(31,191,90,.1); }
        #hv8 .h8-path.is-dev { color: #fff; border-color: var(--ink); background: radial-gradient(70% 80% at 100% 0%, rgba(143,40,246,.4), transparent 60%), var(--ink); }
        #hv8 .h8-path-tag { align-self: flex-start; font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--ink); background: var(--lavender); border-radius: 8px; padding: 5px 10px; }
        #hv8 .h8-path.is-main .h8-path-tag { background: #DDF6E5; color: #13733A; }
        #hv8 .h8-path.is-dev .h8-path-tag { background: rgba(255,255,255,.12); color: #fff; }
        #hv8 .h8-path h3 { margin: 16px 0 8px; font-size: 26px; letter-spacing: -.03em; line-height: 1.1; }
        #hv8 .h8-path > p { margin: 0 0 16px; font-size: 15px; line-height: 1.55; color: var(--ink-2); }
        #hv8 .h8-path.is-dev > p { color: rgba(255,255,255,.74); }
        #hv8 .h8-path ul { list-style: none; margin: 0 0 22px; padding: 0; display: grid; gap: 8px; flex: 1; align-content: start; }
        #hv8 .h8-path li { display: flex; gap: 8px; align-items: flex-start; font-size: 14.5px; line-height: 1.45; } #hv8 .h8-path li svg { color: var(--verde); flex-shrink: 0; margin-top: 2px; }
        #hv8 .h8-path.is-dev .h8-cmd { margin-top: auto; width: 100%; flex-wrap: wrap; row-gap: 10px; } #hv8 .h8-path.is-dev .h8-cmd code { flex: 1 1 calc(100% - 24px); } #hv8 .h8-path.is-dev .h8-textlink { margin-top: 14px; }
        #hv8 .h8-final-10x { display: inline-flex; align-items: center; gap: 6px; margin-top: 18px; font-size: 14.5px; font-weight: 600; color: rgba(255,255,255,.82); } #hv8 .h8-final-10x:hover { color: #fff; }

        @media (max-width: 1100px) { #hv8 .h8-pains { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 980px) {
          #hv8 .h8-auto-grid, #hv8 .h8-paths { grid-template-columns: 1fr; gap: 24px; }
          #hv8 .h8-auto-tabs { flex-wrap: nowrap; justify-content: flex-start; overflow-x: auto; scrollbar-width: none; margin: 0 -22px; padding: 0 22px 18px; } #hv8 .h8-auto-tabs::-webkit-scrollbar { display: none; } #hv8 .h8-auto-tab { flex-shrink: 0; }
          #hv8 .h8-cmp-head { margin-top: 52px; }
        }
        @media (max-width: 640px) {
          #hv8 .h8-pains { grid-template-columns: 1fr; }
          #hv8 .h8-stat b { font-size: 28px; }
          #hv8 .h8-m-cr-flow { grid-template-columns: 1fr 1fr; } #hv8 .h8-m-cr-math { padding: 14px; gap: 8px; } #hv8 .h8-m-cr-math b { font-size: 26px; }
          #hv8 .h8-auto { padding: 16px; border-radius: 22px; } #hv8 .h8-auto-tabs { margin: 0 -16px; padding: 0 16px 16px; }
          #hv8 .h8-pm-term { font-size: 11.5px; padding: 14px; }
          #hv8 .h8-path { padding: 22px; }
          #hv8 .h8-agentes { flex-direction: column; text-align: center; }
          #hv8 .h8-auto-screen .h8-pm-split { grid-template-columns: 1fr; }
          #hv8 .h8-final-10x { justify-content: center; text-align: center; }
        }

      `}</style>
    </>
  )
}
