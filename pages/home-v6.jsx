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

const PRODUCTS = [
  { id: 'loja', tint: 'sky', icon: 'layout', tab: 'Loja', eye: 'LOJA VIRTUAL', title: 'Uma loja 100% sua. Gerada e revisada por AI.',
    body: 'Layouts totalmente customizáveis, domínio e SSL grátis, SEO e performance de verdade. Crie do zero pelo CLI, importe do Figma ou migre de onde estiver.',
    feats: ['Layouts 100% customizáveis', 'Domínio e SSL grátis', 'Produtos e visitas ilimitados', 'SEO e performance'],
    ai: { h: 'Gerada pelo CLI, revisada por agentes', d: 'Branding, QA Visual, SEO e AEO rodam dentro do projeto antes de publicar. Sua loja nasce pronta para ser encontrada — inclusive pelo ChatGPT.' },
    link: { href: '/recursos', t: 'Ver recursos da loja' }, visual: 'store' },
  { id: 'checkout', tint: 'lime', icon: 'bolt', tab: 'Checkout', eye: 'CHECKOUT TURBO', title: 'O checkout que mais converte no Brasil.',
    body: 'Nativo, transparente e em 3 etapas, sem redirecionamento. Order Bump, Upsell, Pix, cartão em até 12× e boleto. 4× mais conversão e +98% de aprovação.',
    feats: ['3 etapas, sem redirect', 'Order Bump e Upsell', 'Pix, cartão em 12× e boleto', 'Checkout com a sua marca'],
    ai: { h: 'Anti-Fraude IA+', d: 'Análise de pedidos e cruzamento de dados em tempo real. Aprova mais, bloqueia fraude e protege o seu caixa.' },
    link: { href: '/checkout', t: 'Conhecer o Checkout TURBO' }, visual: 'checkout' },
  { id: 'pay', tint: 'mint', icon: 'card', tab: 'Unbox Pay', eye: 'UNBOX PAY & CRÉDITO', title: 'Receba mais, pague menos e cresça com capital.',
    body: 'Gateway nativo com multi provedores e retentativa automática. A partir de 2,99% no cartão e 1% no Pix, receba em 2, 14 ou 30 dias sem taxa de saque. E crédito de até R$ 500 mil amortizado por 12% das vendas.',
    feats: ['Multi provedores + retentativa', '2,99% no cartão · 1% no Pix', 'Saque ágil e sem custo', 'Crédito até R$ 500 mil'],
    ai: { h: 'Gateway turbinado por AI', d: 'Feito para aprovar mais e custar menos: retentativa inteligente entre provedores e antifraude por AI em cada transação.' },
    link: { href: '/credito', t: 'Ver Unbox Pay e Crédito' }, visual: 'pay' },
  { id: 'assinatura', tint: 'lavender', icon: 'repeat', tab: 'Assinatura', eye: 'ASSINATURA NATIVA', title: 'Recorrência que nasce no carrinho.',
    body: 'O cliente assina na própria compra. Múltiplas frequências, gestão de falhas automática, previsão de estoque e cohort de LTV. Criado para produtos físicos, tudo no mesmo lugar.',
    feats: ['Assina direto no carrinho', 'Múltiplas frequências', 'Gestão de falhas automática', 'Cohort de LTV e previsão de estoque'],
    ai: { h: 'Regras de assinatura por texto', d: 'Crie e ajuste planos e regras pela sua AI, via MCP. Ela prepara, você confirma, ela publica.' },
    link: { href: '/assinatura', t: 'Conhecer a Assinatura' }, visual: 'sub' },
  { id: 'promo', tint: 'lime', icon: 'tag', tab: 'Promoções', eye: 'PROMOÇÕES & CAMPANHAS', title: 'Campanhas que a sua AI monta e publica.',
    body: 'Cupons, vouchers, bundles e combos com desconto progressivo, preços promocionais e frete grátis por CEP. Tudo nativo, sem app.',
    feats: ['Cupons e vouchers', 'Bundles & Combos', 'Preços promocionais', 'Frete grátis flexível'],
    ai: { h: 'Cupom criado em uma frase', d: 'Você pede, a AI prepara o plano, você confirma. Ao lado, o print real: cupom BRUNINHO10 criado e publicado na Temperos Badia.' },
    link: { href: 'https://temperosbadia.com.br/', t: 'Ver a loja da Badia', ext: true }, visual: 'promo' },
  { id: 'creators', tint: 'sky', icon: 'users', tab: 'Creators', eye: 'CREATORS', title: 'Creators integrados ao checkout.',
    body: 'Links e cupons exclusivos por creator, venda rastreada, comissão atribuída e pagamento automático. Envio de sampling e KPIs por campanha.',
    feats: ['Link e cupom por creator', 'Pague por venda', 'Automação de pagamento', 'Envio de sampling'],
    ai: { h: 'Pergunte quem vendeu mais', d: 'Resultados por cupom, creator e período, por texto: a AI lê os pedidos da loja pelo MCP e responde.' },
    link: { href: '/afiliados', t: 'Conhecer Creators' }, visual: 'creators' },
  { id: 'operacao', tint: 'mint', icon: 'truck', tab: 'Operação', eye: 'OPERAÇÃO & ENVIOS', title: 'Pedidos, estoque e frete no mesmo painel.',
    body: 'Cálculo de frete automático no checkout, etiquetas, rastreio, retirada na loja e meios próprios. ERP Bling integrado e WhatsApp do cliente na gestão de pedidos.',
    feats: ['Frete integrado ao checkout', 'Etiquetas e rastreio', 'ERP Bling', 'Correios, Total Express ou a sua'],
    ai: { h: 'Estoque e preço por texto', d: 'Atualize catálogo, estoque e preços pela sua AI. Toda escrita passa por duas etapas: preparar e confirmar.' },
    link: { href: '/recursos', t: 'Ver operação e envios' }, visual: 'ops' },
  { id: 'dados', tint: 'lavender', icon: 'chart', tab: 'Dados', eye: 'DADOS & INSIGHTS', title: 'Receita, não só sessão.',
    body: 'Visão geral de vendas, de onde vem o dinheiro, onde estão os clientes, recompra, LTV e carrinhos abandonados. Sem planilha e sem BI externo.',
    feats: ['Recompra e LTV', 'Carrinhos abandonados', 'Origem da receita', 'GA4 e Tag Manager'],
    ai: { h: 'Insights e decisões por AI', d: 'Pergunte à sua AI o que vendeu, o que caiu e o que fazer. Ela lê os dados da loja pelo MCP e responde com contexto.' },
    link: { href: '/recursos', t: 'Ver o Painel Unbox' }, visual: 'data' },
]

const AI_PILLARS = [
  { k: 'cli', icon: 'terminal', t: 'Unbox CLI', h: 'Cria a loja', d: 'Do zero, do Figma ou migrando de qualquer plataforma. Um comando gera o storefront completo e abre a sua AI no briefing de marca.', href: '/ai-unbox', l: 'Entrar na lista' },
  { k: 'mcp', icon: 'bolt', t: 'Unbox MCP', h: 'Opera a loja', d: 'Catálogo, pedidos, campanhas e assinaturas por texto, na AI que você já usa. Leituras diretas; escritas em duas etapas.', href: '/ai', l: 'Ver demo do MCP' },
  { k: 'agents', icon: 'sparkle', t: 'Agentes', h: 'Otimizam a loja', d: 'Branding, QA Visual, CRO, SEO, AEO e Deploy embarcados no projeto. Rodam por você, com o seu julgamento no comando.', href: '/ai-unbox', l: 'Conhecer os agentes' },
]
const AGENTS = ['Branding & Identidade', 'QA Visual', 'CRO', 'SEO avançado', 'AEO', 'Deploy', 'Catálogo', 'Checkout', 'Assinatura', 'Promoções']

const SIZES = [
  { tint: 'sky', eye: 'MARCAS NASCENDO', t: 'Do zero ao ar em dias.', d: 'Crie a loja com a sua AI, conecte Instagram e WhatsApp e venda com o Checkout TURBO desde o primeiro pedido.', href: '/ai-unbox', l: 'Criar minha loja' },
  { tint: 'lavender', eye: 'MARCAS ESCALANDO', t: 'Assinatura, creators e capital.', d: 'Recorrência nativa, programa de creators integrado ao checkout e crédito de até R$ 500 mil pago conforme vende.', href: '/credito', l: 'Ver Unbox Pay' },
  { tint: 'mint', eye: 'INDÚSTRIAS', t: 'Crédito produtivo e canal D2C.', d: 'A indústria recebe à vista e a marca paga conforme vende. Mais uma loja D2C para vender direto ao consumidor.', href: '/industrias', l: 'Ver indústrias' },
]

const INTEGRATIONS = [
  { g: 'Canais', items: ['Instagram Shopping', 'Facebook & Meta', 'WhatsApp', 'Google Shopping'] },
  { g: 'Operação', items: ['ERP Bling', 'Correios', 'Total Express', 'Google Analytics', 'Tag Manager'] },
  { g: 'AI (via MCP)', items: ['Claude', 'ChatGPT', 'Cursor', 'Claude Code', 'Figma MCP'] },
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

/* ── Hero: a plataforma inteira em uma cena ─────────────────── */
function HeroBoard() {
  return (
    <div className="h6-board" aria-hidden="true">
      <div className="h6-b-admin">
        <div className="h6-b-admin-h"><span>Visão geral de vendas</span><em>últimos 7 dias</em></div>
        <div className="h6-b-bars">{[38, 52, 46, 70, 64, 88, 96].map((h, i) => <i key={i} style={{ height: h + '%', animationDelay: `${.3 + i * .08}s` }} />)}</div>
        <div className="h6-b-admin-f"><b>R$ 48.320</b><span className="up">+18% vs semana anterior</span></div>
      </div>
      <div className="h6-b-phone">
        <div className="h6-b-phone-top" />
        <img src="/img/cases/case-badia-depois.jpg" alt="" />
        <div className="h6-b-phone-cta">Comprar agora</div>
      </div>
      <div className="h6-b-chat">
        <div className="h6-b-chat-h"><AiTag>Unbox MCP</AiTag><span>você · Claude</span></div>
        <div className="h6-b-bub u">cria o cupom VOLTA10 com 10% e frete grátis acima de R$ 150</div>
        <div className="h6-b-bub a"><Icon name="check" size={13} /> Plano: cupom <b>VOLTA10</b> · 10% · frete grátis ≥ R$ 150. Confirmar?</div>
        <div className="h6-b-bub u">confirma</div>
        <div className="h6-b-bub a ok"><Icon name="check" size={13} /> Criado e publicado.</div>
      </div>
      <div className="h6-b-chip c1"><Icon name="bolt" size={14} /><span>Checkout TURBO</span><b>98% aprovado</b></div>
      <div className="h6-b-chip c2"><Icon name="repeat" size={14} /><span>Assinatura</span><b>a cada 30 dias</b></div>
      <div className="h6-b-chip c3"><Icon name="shield" size={14} /><span>Anti-Fraude IA+</span><b>aprovado · 0,3s</b></div>
      <div className="h6-glow gp" /><div className="h6-glow gg" />
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
          <div className="h6-m-credit-h"><span>Crédito Unbox</span><b>até R$ 500 mil</b></div>
          <div className="h6-m-credit-bar"><i /></div>
          <div className="h6-m-credit-f"><span>Amortização: 12% das vendas</span><span>sem diluição de equity</span></div>
        </div>
        <div className="h6-m-float fl3"><AiTag /><b>Gateway turbinado por AI</b><span>aprova mais, custa menos</span></div>
      </div>)
    case 'sub': return (
      <div className="h6-mock h6-m-sub">
        <div className="h6-m-subcard">
          <div className="h6-m-subcard-h"><span>Assinatura ativa</span><b>a cada 30 dias</b></div>
          <div className="h6-m-subrow"><span>Próxima entrega</span><b>em 12 dias</b></div>
          <div className="h6-m-subrow"><span>Pagamento</span><b>cartão · retentativa automática</b></div>
          <div className="h6-m-subrow"><span>LTV do cohort</span><b className="up">+40% em 6 meses</b></div>
        </div>
        <Chat who="você · Cursor" lines={[{ r: 'u', t: 'cria um plano de assinatura mensal com 15% de desconto para o Kit Cabelo' }, { r: 'a', t: 'Plano: mensal · 15% · Kit Cabelo · pausa após 2 falhas. Confirmar?' }, { r: 'u', t: 'confirma' }, { r: 'a ok', t: 'Plano publicado no carrinho.' }]} />
      </div>)
    case 'promo': return (
      <div className="h6-mock h6-m-promo">
        <div className="h6-m-frame tall"><img src="/img/ai-prova-agente.png" alt="Print real: AI criando o cupom BRUNINHO10 na loja Temperos Badia via MCP" /></div>
        <div className="h6-m-float fl4"><span className="h6-live" />Print real · Temperos Badia</div>
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
  const [active, setActive] = useState(PRODUCTS[0].id)
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
          <div className="h6-wrap h6-hero-grid">
            <div className="h6-hero-copy" data-rv>
              <span className="h6-eye"><i className="h6-dot" />PLATAFORMA COMPLETA · AI-NATIVE</span>
              <h1>Toda a plataforma.<br /><em>AI em cada parte.</em></h1>
              <p className="h6-lead">Loja, checkout, pagamento, assinatura, promoções, creators, envios e dados em um só lugar. E uma AI que cria, opera e otimiza tudo isso com você.</p>
              <div className="h6-cta-row">
                <a href="/ai-unbox" className="h6-btn h6-btn-dark h6-btn-lg">Criar minha loja com AI</a>
                <a href="#canais" className="h6-btn h6-btn-white h6-btn-lg">Conhecer a plataforma</a>
              </div>
              <p className="h6-micro">Sem taxa de setup · Migração acompanhada · Funciona com Claude, ChatGPT e Cursor via MCP</p>
            </div>
            <div className="h6-hero-visual" data-rv><HeroBoard /></div>
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

        {/* TOUR BAR */}
        <div className="h6-tour" id="tour">
          <div className="h6-wrap h6-tour-in">
            <span className="h6-tour-l">A plataforma</span>
            <div className="h6-tour-tabs">{PRODUCTS.map((p) => <a href={'#' + p.id} className={'h6-tab' + (active === p.id ? ' is-on' : '')} key={p.id}><Icon name={p.icon} size={14} />{p.tab}</a>)}</div>
          </div>
        </div>

        {/* PRODUTOS */}
        {PRODUCTS.map((p, i) => (
          <section className={'h6-prod tint-' + p.tint + (i % 2 ? ' is-rev' : '')} id={p.id} data-prod key={p.id}>
            <div className="h6-wrap h6-prod-grid">
              <div className="h6-prod-copy">
                <span className="h6-eye" data-rv><i className="h6-dot" />{p.eye}</span>
                <h2 data-rv>{p.title}</h2>
                <p className="h6-sub" data-rv>{p.body}</p>
                <ul className="h6-feats" data-rv>{p.feats.map((f) => <li key={f}><Icon name="check" size={15} />{f}</li>)}</ul>
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
              <h2>Não é um chatbot no canto da tela.<br />É a camada que cria, opera e otimiza a sua loja.</h2>
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
          </div>
        </section>

        {/* PORTE */}
        <section className="h6-sec" id="porte">
          <div className="h6-wrap">
            <div className="h6-head h6-center" data-rv><span className="h6-eye"><i className="h6-dot" />PARA CADA MOMENTO DA MARCA</span><h2>Do primeiro pedido à indústria.</h2></div>
            <div className="h6-sizes">
              {SIZES.map((s, i) => <div className={'h6-size tint-' + s.tint} data-rv style={{ transitionDelay: `${i * 80}ms` }} key={s.eye}><span className="h6-size-eye">{s.eye}</span><h3>{s.t}</h3><p>{s.d}</p><a href={s.href} className="h6-textlink">{s.l} <Icon name="arrow" size={15} /></a></div>)}
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
              {INTEGRATIONS.map((g) => <div className="h6-int-g" key={g.g}><span className="h6-int-l">{g.g}</span><div className="h6-int-items">{g.items.map((it) => <span className={'h6-int-item' + (g.g.startsWith('AI') ? ' is-ai' : '')} key={it}>{g.g.startsWith('AI') && <Icon name="sparkle" size={11} />}{it}</span>)}</div></div>)}
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

        {/* CASES */}
        <section className="h6-sec h6-sec-alt" id="cases">
          <div className="h6-wrap">
            <div className="h6-head h6-center" data-rv>
              <span className="h6-eye"><i className="h6-dot" />ANTES E DEPOIS</span>
              <h2>Três marcas. Três categorias. A mesma virada.</h2>
              <p>Todas remontadas com a Unbox por AI e vendendo hoje. Arraste para comparar como a loja era e como ficou.</p>
            </div>
            <div className="h6-cases" data-rv>{CASES.map((c) => <Compare c={c} key={c.name} />)}</div>
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

        /* hero */
        #hv6 .h6-hero { padding: 64px 0 24px; }
        #hv6 .h6-hero-grid { display: grid; grid-template-columns: .95fr 1.05fr; gap: 48px; align-items: center; }
        #hv6 h1 { font-size: clamp(38px, 5.4vw, 64px); font-weight: 700; letter-spacing: -.04em; line-height: 1.02; margin: 22px 0 20px; }
        #hv6 h1 em { font-style: normal; background: linear-gradient(90deg, var(--roxo), #B06BFF); -webkit-background-clip: text; background-clip: text; color: transparent; }
        #hv6 .h6-lead { font-size: clamp(16px, 1.5vw, 19px); color: var(--ink-2); line-height: 1.58; max-width: 520px; margin: 0; }
        #hv6 .h6-cta-row { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 28px; }
        #hv6 .h6-micro { font-size: 13px; color: var(--mut); margin-top: 14px; max-width: 520px; }
        #hv6 .h6-hero-visual { position: relative; }
        #hv6 .h6-glow { position: absolute; border-radius: 50%; filter: blur(60px); z-index: 0; pointer-events: none; }
        #hv6 .h6-glow.gp { width: 300px; height: 300px; background: rgba(143,40,246,.22); top: -40px; right: -20px; }
        #hv6 .h6-glow.gg { width: 220px; height: 220px; background: rgba(57,255,20,.14); bottom: -20px; left: 0; }
        #hv6 .h6-board { position: relative; height: 520px; }
        #hv6 .h6-board > * { position: absolute; }
        #hv6 .h6-b-admin { z-index: 1; left: 0; top: 30px; width: 300px; background: #fff; border: 1px solid var(--line); border-radius: 18px; padding: 16px; box-shadow: 0 20px 50px rgba(22,22,28,.1); animation: h6up .7s .1s both; }
        #hv6 .h6-b-admin-h { display: flex; justify-content: space-between; font-size: 12px; font-weight: 600; } #hv6 .h6-b-admin-h em { font-style: normal; color: var(--mut); font-weight: 400; }
        #hv6 .h6-b-bars { display: flex; align-items: flex-end; gap: 6px; height: 90px; margin: 14px 0 12px; }
        #hv6 .h6-b-bars i { flex: 1; border-radius: 5px 5px 2px 2px; background: linear-gradient(180deg, var(--roxo), #B06BFF); transform-origin: bottom; animation: h6grow .8s cubic-bezier(.2,.7,.2,1) both; }
        #hv6 .h6-b-bars i:last-child { background: linear-gradient(180deg, var(--verde), #7BE495); }
        #hv6 .h6-b-admin-f { display: flex; justify-content: space-between; align-items: baseline; font-size: 12px; } #hv6 .h6-b-admin-f b { font-size: 18px; letter-spacing: -.02em; }
        #hv6 .h6-b-phone { z-index: 2; left: 250px; top: 0; width: 230px; height: 470px; border-radius: 30px; background: #0D0D12; padding: 10px; box-shadow: 0 30px 70px rgba(22,22,28,.28); overflow: hidden; animation: h6up .8s both; }
        #hv6 .h6-b-phone img, #hv6 .h6-m-phone img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: top; border-radius: 22px; }
        #hv6 .h6-b-phone-top { position: absolute; top: 14px; left: 50%; transform: translateX(-50%); width: 70px; height: 18px; border-radius: 999px; background: #0D0D12; z-index: 2; }
        #hv6 .h6-b-phone-cta { position: absolute; left: 24px; right: 24px; bottom: 22px; background: var(--ink); color: #fff; font-size: 13px; font-weight: 600; text-align: center; padding: 11px; border-radius: 12px; box-shadow: 0 10px 24px rgba(0,0,0,.35); }
        #hv6 .h6-b-chat { z-index: 3; left: 0; bottom: 10px; width: 330px; background: #fff; border: 1px solid var(--line); border-radius: 18px; padding: 14px; box-shadow: 0 24px 60px rgba(22,22,28,.16); display: grid; gap: 8px; animation: h6up .7s .3s both; }
        #hv6 .h6-b-chat-h, #hv6 .h6-chat-h { display: flex; align-items: center; justify-content: space-between; font-size: 11.5px; color: var(--mut); padding-bottom: 8px; border-bottom: 1px solid var(--line); }
        #hv6 .h6-b-bub, #hv6 .h6-bub { max-width: 90%; padding: 9px 12px; border-radius: 12px; font-size: 13px; line-height: 1.4; opacity: 0; transform: translateY(6px); animation: h6bub .45s ease forwards; }
        #hv6 .h6-b-bub.u, #hv6 .h6-bub.u { margin-left: auto; background: var(--ink); color: #fff; border-bottom-right-radius: 4px; }
        #hv6 .h6-b-bub.a, #hv6 .h6-bub.a { background: var(--sky); color: var(--ink); border-bottom-left-radius: 4px; } #hv6 .h6-b-bub.a svg, #hv6 .h6-bub.a svg { vertical-align: -2px; margin-right: 5px; color: var(--verde); }
        #hv6 .h6-b-bub.a.ok, #hv6 .h6-bub.a.ok { background: var(--lime); }
        #hv6 .h6-b-bub:nth-child(2), #hv6 .h6-bub:nth-child(2) { animation-delay: .9s } #hv6 .h6-b-bub:nth-child(3), #hv6 .h6-bub:nth-child(3) { animation-delay: 1.6s } #hv6 .h6-b-bub:nth-child(4), #hv6 .h6-bub:nth-child(4) { animation-delay: 2.3s } #hv6 .h6-b-bub:nth-child(5), #hv6 .h6-bub:nth-child(5) { animation-delay: 2.9s }
        #hv6 .h6-b-chip { z-index: 4; display: flex; align-items: center; gap: 8px; background: #fff; border: 1px solid var(--line); border-radius: 999px; padding: 8px 14px 8px 10px; font-size: 12.5px; box-shadow: 0 12px 30px rgba(22,22,28,.12); animation: h6up .6s both; }
        #hv6 .h6-b-chip svg { color: var(--roxo-2); } #hv6 .h6-b-chip span { color: var(--mut); } #hv6 .h6-b-chip b { font-weight: 600; }
        #hv6 .h6-b-chip.c1 { right: 0; top: 60px; animation-delay: .5s; } #hv6 .h6-b-chip.c2 { right: 10px; top: 210px; animation-delay: .8s; } #hv6 .h6-b-chip.c3 { right: 30px; bottom: 70px; animation-delay: 1.1s; }
        @keyframes h6up { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
        @keyframes h6grow { from { transform: scaleY(0); } to { transform: none; } }
        @keyframes h6bub { to { opacity: 1; transform: none; } }

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
        #hv6 .h6-tab { display: inline-flex; align-items: center; gap: 6px; padding: 7px 12px; border-radius: 999px; font-size: 13.5px; font-weight: 500; color: var(--ink-2); white-space: nowrap; transition: background .2s, color .2s; }
        #hv6 .h6-tab svg { opacity: .7; } #hv6 .h6-tab:hover { background: rgba(22,22,28,.05); } #hv6 .h6-tab.is-on { background: var(--ink); color: #fff; } #hv6 .h6-tab.is-on svg { opacity: 1; }

        /* produtos */
        #hv6 .h6-prod { padding: 88px 0; scroll-margin-top: 130px; border-bottom: 1px solid var(--line); }
        #hv6 .h6-prod-grid { display: grid; grid-template-columns: 1fr 1.15fr; gap: 64px; align-items: center; }
        #hv6 .h6-prod.is-rev .h6-prod-copy { order: 1; }
        #hv6 .h6-prod h2 { font-size: clamp(28px, 3.3vw, 42px); }
        #hv6 .h6-feats { list-style: none; margin: 22px 0 0; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 8px 16px; }
        #hv6 .h6-feats li { display: flex; align-items: center; gap: 8px; font-size: 14.5px; color: var(--ink-2); } #hv6 .h6-feats li svg { color: var(--verde); flex-shrink: 0; }
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
        #hv6 .h6-m-agents-h { display: flex; align-items: center; justify-content: space-between; font-size: 11.5px; color: var(--mut); padding-bottom: 8px; border-bottom: 1px solid var(--line); }
        #hv6 .h6-m-agent { display: flex; gap: 10px; align-items: flex-start; } #hv6 .h6-m-agent svg { color: var(--verde); margin-top: 3px; flex-shrink: 0; }
        #hv6 .h6-m-agent b { display: block; font-size: 13.5px; } #hv6 .h6-m-agent span { font-size: 12px; color: var(--mut); }
        #hv6 .h6-m-frame { border-radius: 16px; overflow: hidden; background: #fff; box-shadow: 0 24px 60px rgba(22,22,28,.18); max-height: 420px; }
        #hv6 .h6-m-frame img { display: block; width: 100%; height: auto; object-fit: cover; object-position: top; }
        #hv6 .h6-m-frame.tall { max-height: 460px; }
        #hv6 .h6-m-float { position: absolute; background: #fff; border: 1px solid var(--line); border-radius: 14px; padding: 10px 14px; box-shadow: 0 14px 34px rgba(22,22,28,.14); font-size: 12.5px; display: grid; gap: 2px; }
        #hv6 .h6-m-float b { font-size: 13.5px; } #hv6 .h6-m-float span { color: var(--mut); } #hv6 .h6-m-float .h6-aitag { justify-self: start; margin-bottom: 4px; }
        #hv6 .h6-m-float.fl1 { right: -8px; top: 28px; } #hv6 .h6-m-float.fl2 { left: -8px; bottom: 30px; } #hv6 .h6-m-float.fl3 { right: -6px; top: -14px; } #hv6 .h6-m-float.fl4 { left: 14px; bottom: 14px; display: flex; align-items: center; font-weight: 600; }
        #hv6 .h6-m-pay { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        #hv6 .h6-m-stat { background: #fff; border-radius: 16px; padding: 16px; box-shadow: 0 14px 34px rgba(22,22,28,.1); display: grid; gap: 4px; }
        #hv6 .h6-m-stat span { font-size: 11.5px; color: var(--mut); } #hv6 .h6-m-stat b { font-size: 26px; letter-spacing: -.03em; line-height: 1.05; } #hv6 .h6-m-stat em { font-style: normal; font-size: 11.5px; color: var(--ink-2); }
        #hv6 .h6-m-credit { grid-column: 1 / -1; background: var(--ink); color: #fff; border-radius: 18px; padding: 18px; box-shadow: 0 20px 50px rgba(22,22,28,.25); }
        #hv6 .h6-m-credit-h { display: flex; justify-content: space-between; align-items: baseline; font-size: 13px; } #hv6 .h6-m-credit-h b { font-size: 20px; letter-spacing: -.02em; }
        #hv6 .h6-m-credit-bar { height: 8px; border-radius: 999px; background: rgba(255,255,255,.12); margin: 14px 0 10px; overflow: hidden; } #hv6 .h6-m-credit-bar i { display: block; height: 100%; width: 62%; border-radius: 999px; background: linear-gradient(90deg, var(--roxo), var(--neon)); }
        #hv6 .h6-m-credit-f { display: flex; justify-content: space-between; font-size: 12px; color: rgba(255,255,255,.7); }
        #hv6 .h6-chat { background: #fff; border-radius: 18px; padding: 14px; box-shadow: 0 20px 50px rgba(22,22,28,.12); display: grid; gap: 8px; width: 100%; }
        #hv6 .h6-m-sub, #hv6 .h6-m-creators, #hv6 .h6-m-ops, #hv6 .h6-m-data { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; align-items: start; }
        #hv6 .h6-m-subcard, #hv6 .h6-m-order, #hv6 .h6-m-list, #hv6 .h6-m-panel { background: #fff; border-radius: 18px; padding: 16px; box-shadow: 0 20px 50px rgba(22,22,28,.12); display: grid; gap: 10px; }
        #hv6 .h6-m-subcard-h, #hv6 .h6-m-order-h, #hv6 .h6-m-list-h, #hv6 .h6-m-panel-h { display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: var(--mut); padding-bottom: 8px; border-bottom: 1px solid var(--line); }
        #hv6 .h6-m-subcard-h b, #hv6 .h6-m-order-h b { color: var(--ink); font-size: 13px; } #hv6 .h6-m-order-h b.ok { color: var(--verde); } #hv6 .h6-m-list-h em, #hv6 .h6-m-panel-h em { font-style: normal; }
        #hv6 .h6-m-subrow { display: flex; justify-content: space-between; gap: 10px; font-size: 12.5px; } #hv6 .h6-m-subrow span { color: var(--mut); } #hv6 .h6-m-subrow b { font-weight: 600; text-align: right; display: inline-flex; align-items: center; gap: 4px; }
        #hv6 .h6-m-cre { display: grid; grid-template-columns: 82px 58px 1fr 60px; align-items: center; gap: 8px; font-size: 12px; } #hv6 .h6-m-cre b { font-weight: 600; } #hv6 .h6-m-cre code { font-size: 10.5px; padding: 2px 5px; } #hv6 .h6-m-cre i { height: 8px; border-radius: 999px; background: var(--sky); overflow: hidden; display: block; } #hv6 .h6-m-cre i span { display: block; height: 100%; background: var(--roxo); border-radius: 999px; } #hv6 .h6-m-cre em { font-style: normal; color: var(--mut); text-align: right; }
        #hv6 .h6-m-src { display: grid; grid-template-columns: 76px 1fr 38px; align-items: center; gap: 8px; font-size: 12px; } #hv6 .h6-m-src i { height: 8px; border-radius: 999px; background: var(--lavender); overflow: hidden; display: block; } #hv6 .h6-m-src i span { display: block; height: 100%; background: linear-gradient(90deg, var(--roxo), #B06BFF); border-radius: 999px; } #hv6 .h6-m-src b { text-align: right; }
        #hv6 .h6-m-panel-f { display: flex; justify-content: space-between; font-size: 12px; color: var(--mut); padding-top: 8px; border-top: 1px solid var(--line); } #hv6 .h6-m-panel-f b { color: var(--ink); }

        /* unbox ai band */
        #hv6 .h6-aiband { background: radial-gradient(60% 80% at 85% 0%, rgba(143,40,246,.45), transparent 60%), radial-gradient(40% 60% at 0% 100%, rgba(57,255,20,.14), transparent 60%), #0F0F14; color: #fff; }
        #hv6 .h6-aiband .h6-head p { color: rgba(255,255,255,.7); } #hv6 .h6-aiband .h6-dot { box-shadow: 0 0 0 3px rgba(57,255,20,.2); background: var(--neon); }
        #hv6 .h6-pillars { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        #hv6 .h6-pillar { background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1); border-radius: 22px; padding: 26px; display: flex; flex-direction: column; gap: 10px; }
        #hv6 .h6-pillar-ico { width: 42px; height: 42px; border-radius: 12px; background: rgba(143,40,246,.25); color: #D9C2FF; display: inline-flex; align-items: center; justify-content: center; }
        #hv6 .h6-pillar-t { font-size: 11.5px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: #C9A8FF; margin-top: 6px; }
        #hv6 .h6-pillar h3 { margin: 0; font-size: 24px; letter-spacing: -.025em; } #hv6 .h6-pillar p { margin: 0; color: rgba(255,255,255,.7); font-size: 14.5px; line-height: 1.55; flex: 1; }
        #hv6 .h6-term { background: #0D0D12; border: 1px solid rgba(255,255,255,.08); border-radius: 12px; padding: 12px 14px; font-family: var(--mono); font-size: 12px; color: #a6a6b3; line-height: 1.8; margin-top: 6px; }
        #hv6 .h6-term-cmd { color: #fff; } #hv6 .h6-term-cmd span { color: var(--neon); margin-right: 6px; } #hv6 .h6-term-line .w { color: #fff; } #hv6 .h6-term-line.ok { color: var(--neon); }
        #hv6 .h6-agents { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px; } #hv6 .h6-agents span { display: inline-flex; align-items: center; gap: 5px; font-size: 12px; padding: 6px 10px; border-radius: 999px; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.1); } #hv6 .h6-agents svg { color: #C9A8FF; }
        #hv6 .h6-pillar .h6-textlink { margin-top: 10px; }

        /* porte */
        #hv6 .h6-sizes { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        #hv6 .h6-size { border-radius: 22px; padding: 28px; background: linear-gradient(160deg, var(--t2), var(--t)); display: flex; flex-direction: column; }
        #hv6 .h6-size-eye { font-size: 11px; font-weight: 700; letter-spacing: .16em; color: var(--ink); background: rgba(255,255,255,.7); border-radius: 8px; padding: 5px 10px; align-self: flex-start; }
        #hv6 .h6-size h3 { font-size: 24px; letter-spacing: -.025em; margin: 16px 0 8px; } #hv6 .h6-size p { margin: 0 0 18px; color: var(--ink-2); font-size: 14.5px; line-height: 1.55; flex: 1; }

        /* integrações */
        #hv6 .h6-split { display: grid; grid-template-columns: 1fr 1.1fr; gap: 64px; align-items: center; }
        #hv6 .h6-split-copy h2 { font-size: clamp(28px, 3.3vw, 42px); } #hv6 .h6-split-copy .h6-textlink { margin-top: 22px; }
        #hv6 .h6-int { display: grid; gap: 18px; }
        #hv6 .h6-int-l { display: block; font-size: 11px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: var(--mut); margin-bottom: 8px; }
        #hv6 .h6-int-items { display: flex; flex-wrap: wrap; gap: 8px; }
        #hv6 .h6-int-item { display: inline-flex; align-items: center; gap: 6px; background: var(--bg); border: 1px solid var(--line); border-radius: 999px; padding: 9px 14px; font-size: 14px; font-weight: 500; color: var(--ink-2); }
        #hv6 .h6-int-item.is-ai { color: var(--ink); border-color: rgba(143,40,246,.35); background: #fff; } #hv6 .h6-int-item svg { color: var(--roxo-2); }

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

        @media (max-width: 1080px) { #hv6 .h6-b-phone { left: 210px; } #hv6 .h6-b-chip.c1, #hv6 .h6-b-chip.c2 { right: -10px; } }
        @media (max-width: 980px) {
          #hv6 .h6-links, #hv6 .h6-nav-cta .h6-btn-ghost, #hv6 .h6-nav-cta .h6-btn-dark { display: none; } #hv6 .h6-burger { display: inline-flex; }
          #hv6 .h6-hero-grid, #hv6 .h6-prod-grid, #hv6 .h6-split { grid-template-columns: 1fr; gap: 36px; }
          #hv6 .h6-prod.is-rev .h6-prod-copy { order: 0; }
          #hv6 .h6-board { height: 560px; max-width: 520px; margin: 0 auto; } #hv6 .h6-b-phone { left: auto; right: 0; }
          #hv6 .h6-channels, #hv6 .h6-pillars, #hv6 .h6-sizes, #hv6 .h6-cases { grid-template-columns: 1fr; } #hv6 .h6-metrics-grid { grid-template-columns: repeat(2, 1fr); }
          #hv6 .h6-tour-l { display: none; } #hv6 .h6-prod { padding: 64px 0; scroll-margin-top: 126px; }
          #hv6 .h6-footer-grid { grid-template-columns: 1fr 1fr; } #hv6 .h6-sec { padding: 72px 0; }
          #hv6 .h6-visual-bg { padding: 20px; min-height: 0; }
        }
        @media (max-width: 640px) {
          #hv6 .h6-metrics-grid, #hv6 .h6-footer-grid, #hv6 .h6-feats, #hv6 .h6-m-sub, #hv6 .h6-m-creators, #hv6 .h6-m-ops, #hv6 .h6-m-data { grid-template-columns: 1fr; } #hv6 .h6-cmp { height: 300px; }
          #hv6 .h6-m-store { flex-direction: column; } #hv6 .h6-m-pay { grid-template-columns: 1fr 1fr; } #hv6 .h6-m-float.fl3 { position: static; margin-top: 10px; grid-column: 1 / -1; }
          #hv6 .h6-board { height: 600px; } #hv6 .h6-b-admin { width: 220px; } #hv6 .h6-b-phone { width: 190px; height: 400px; } #hv6 .h6-b-chat { width: 280px; }
          #hv6 .h6-b-chip.c1 { top: 20px; } #hv6 .h6-b-chip.c3 { bottom: 40px; right: 0; }
        }
        @media (prefers-reduced-motion: reduce) { #hv6 [data-rv] { opacity: 1 !important; transform: none !important; } #hv6 .h6-marquee-track { animation: none; } #hv6 .h6-b-bub, #hv6 .h6-bub, #hv6 .h6-board > *, #hv6 .h6-b-bars i { opacity: 1; animation: none; } }
      `}</style>
    </>
  )
}
