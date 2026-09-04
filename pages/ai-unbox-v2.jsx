/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import Nav from '../components/Nav'
import { Footer } from '../components/Closing'

/* ─────────────────────────────────────────────────────────────
   Unbox AI Foundry · v2 — linguagem visual da home v6.
   Foco: as 3 formas de criar uma loja (do zero via briefing no
   chat, importando do Figma, migrando de qualquer plataforma)
   + o que vem pronto. Escopo #aif2 / f2-*.
   ───────────────────────────────────────────────────────────── */

const PERFIS = ['Marca D2C', 'Agência', 'Outro']
const FATURAMENTO = ['Até R$ 50 mil/mês', 'R$ 50 mil a R$ 200 mil/mês', 'R$ 200 mil a R$ 1 mi/mês', 'Acima de R$ 1 mi/mês']

function maskBR(v) {
  v = v.replace(/\D/g, '').slice(0, 11)
  if (v.length <= 2) return v.length ? '(' + v : ''
  if (v.length <= 7) return '(' + v.slice(0, 2) + ') ' + v.slice(2)
  return '(' + v.slice(0, 2) + ') ' + v.slice(2, 7) + '-' + v.slice(7)
}

/* ── os 3 caminhos ─────────────────────────────────────────── */
const PATHS = [
  {
    key: 'zero', label: 'Do zero', icon: 'chat', tint: 'sky',
    tag: 'BRIEFING NO CHAT',
    title: 'Descreva a sua marca. A loja nasce dela.',
    body: 'Sem template, sem começar de uma tela em branco. A AI conduz um briefing em português — marca, público, catálogo, tom — e devolve um storefront completo já com checkout e assinatura.',
    gets: ['Briefing conduzido por AI, em português', '4 estilos de partida para escolher', 'Home, catálogo, PDP, carrinho e checkout', 'Área do cliente e assinatura nativa'],
    kind: 'chat',
    chat: [
      { r: 'a', t: 'Me conta da sua marca: o que você vende e para quem?' },
      { r: 'u', t: 'temperos artesanais, para quem cozinha em casa e leva a sério' },
      { r: 'a', t: 'Entendi. Tom mais editorial e caloroso? E o catálogo inicial, quantos SKUs?' },
      { r: 'u', t: 'isso. uns 40 produtos, com kits' },
      { r: 'a ok', t: 'Gerando storefront: home, catálogo, PDP com kits, carrinho e checkout.' },
    ],
  },
  {
    key: 'figma', label: 'Do Figma', icon: 'figma', tint: 'lavender',
    tag: 'IMPORTAR DESIGN',
    title: 'Seu Figma vira loja de verdade.',
    body: 'A AI lê o seu arquivo pelo MCP do Figma e traduz o layout para os componentes da Unbox. Tipografia, cores, espaçamento e ritmo continuam sendo os seus — sem ninguém recriar tela por tela.',
    gets: ['Leitura do arquivo via Figma MCP', 'Tokens de cor e tipografia aplicados', 'Seções traduzidas para componentes Unbox', 'Home e PDP fiéis ao design'],
    kind: 'term',
    term: { cmd: '/import figma.com/design/…', out: ['lendo frames e tokens do arquivo', '12 seções mapeadas para componentes Unbox', 'paleta e tipografia aplicadas'], ok: '✓ home + PDP fiéis ao design' },
  },
  {
    key: 'migrar', label: 'Migrar', icon: 'migrate', tint: 'mint',
    tag: 'DE QUALQUER PLATAFORMA',
    title: 'Migre por completo. Sem perder o que já vende.',
    body: 'Shopify, Nuvemshop, VTEX ou WooCommerce. A AI extrai catálogo, coleções, tema e conteúdo da loja atual e remonta tudo na Unbox. URLs e redirects preservados, com a nossa equipe acompanhando.',
    gets: ['Catálogo, coleções e conteúdo extraídos', 'Paleta, fontes e menu do site atual', 'Redirects 301 e SEO preservados', 'Migração acompanhada pela equipe'],
    kind: 'migrate',
    term: { cmd: '/migrate loja-atual.com.br', out: ['240 produtos · 18 coleções importados', 'paleta, fontes e menu extraídos', 'redirects 301 mapeados'], ok: '✓ loja remontada na Unbox' },
  },
]

/* ── o que já vem pronto ───────────────────────────────────── */
const READY = [
  { icon: 'layout', t: 'Storefront completo', d: 'Home, catálogo, PDP, carrinho, área do cliente. Next.js, mobile-first, 96+ no Lighthouse.' },
  { icon: 'bolt', t: 'Checkout TURBO', d: '3 etapas, sem redirecionamento. Pix, cartão em 12× e boleto, com Anti-Fraude IA+.' },
  { icon: 'repeat', t: 'Assinatura nativa', d: 'Recorrência do produto ao checkout. Não é módulo à parte: nasce junto com a loja.' },
  { icon: 'card', t: 'Unbox Pay', d: 'Gateway próprio com 98% de aprovação e crédito de até R$ 500 mil pago conforme vende.' },
  { icon: 'tag', t: 'Promoções e bundles', d: 'Cupons, vouchers, combos com desconto progressivo e frete grátis por CEP.' },
  { icon: 'truck', t: 'Envios e ERP', d: 'Frete no checkout, etiquetas, rastreio e integração com o Bling.' },
]

/* ── agentes embarcados ───────────────────────────────────── */
const AGENTS = [
  { t: 'Branding & Identidade', d: 'Paleta, tipografia e tom de voz aplicados na loja inteira.' },
  { t: 'QA Visual', d: 'Cada tela vista e avaliada, desktop e mobile, antes de publicar.' },
  { t: 'CRO', d: 'Dez módulos de conversão revisando jornada, PDP e checkout.' },
  { t: 'SEO avançado', d: 'Estrutura, metadados e performance prontos para o Google.' },
  { t: 'AEO', d: 'Preparada para ser citada por ChatGPT, Claude, Perplexity e AI Overviews.' },
  { t: 'Deploy', d: 'Da preview ao ar, com a infraestrutura resolvida.' },
]

const FAQ = [
  { q: 'Preciso saber programar?', a: 'Não. Você responde um briefing em português — marca, público, catálogo, tom — e a AI gera e personaliza a loja. A parte técnica (Next.js, checkout, deploy) é resolvida pelos agentes embarcados no projeto.' },
  { q: 'A importação do Figma é automática?', a: 'É assistida: a AI lê o seu arquivo pelo MCP do Figma e traduz as seções para componentes da Unbox, mantendo tokens de cor e tipografia. Você revisa e ajusta junto com ela — não é um botão de "converter e pronto".' },
  { q: 'O que exatamente vem na migração?', a: 'Catálogo, coleções, tema e conteúdo do site atual, remontados na Unbox com URLs e redirects 301 preservados para não perder o SEO que você já conquistou. Nossa equipe acompanha a migração com você.' },
  { q: 'A AI vai mexer na minha loja sem eu saber?', a: 'Não. Leituras são diretas; qualquer escrita — preço, cupom, campanha, regra de assinatura — passa por duas etapas: preparar e confirmar. Tudo fica registrado, e você define o que ela executa sozinha.' },
  { q: 'Quais AIs funcionam com a Unbox?', a: 'Claude, ChatGPT, Cursor, Claude Code e qualquer cliente com suporte a MCP. O servidor MCP da Unbox conecta a AI ao catálogo, pedidos, campanhas e assinaturas da sua loja.' },
  { q: 'Preciso já ser cliente Unbox?', a: 'Não. A lista é aberta. Clientes Unbox ativam primeiro, mas quem chega agora entra na frente da fila.' },
  { q: 'Quanto vai custar?', a: 'Quem está na lista conhece as condições antes de todo mundo e trava a vantagem de early access antes do preço final. Entrar não custa nada.' },
]

const CASES = [
  { name: 'Oddie Supply', seg: 'Alimentos funcionais', logo: '/img/cases/logo-oddie.webp', before: '/img/cases/case-oddie-antes.jpg', after: '/img/cases/case-oddie-depois.jpg' },
  { name: 'Pamela Concept', seg: 'Cuidado capilar', logo: '/img/cases/logo-pamela.png', dark: true, before: '/img/cases/case-pamela-antes.jpg', after: '/img/cases/case-pamela-depois.jpg' },
  { name: 'Badia', seg: 'Temperos', logo: '/img/cases/logo-badia.svg', before: '/img/cases/case-badia-antes.jpg', after: '/img/cases/case-badia-depois.jpg' },
]

function Icon({ name, size = 18 }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }
  switch (name) {
    case 'chat': return <svg {...p}><path d="M21 12a8 8 0 0 1-8 8H4l2-3a8 8 0 1 1 15-5Z" /><path d="M8.5 11h7M8.5 14.5h4" /></svg>
    case 'figma': return <svg {...p}><path d="M8 3h4a3 3 0 0 1 0 6H8a3 3 0 0 1 0-6ZM8 9h4v6H8a3 3 0 0 1 0-6ZM12 9h1a3 3 0 1 1 0 6h-1zM8 15h4v3a3 3 0 1 1-4-3Z" /></svg>
    case 'migrate': return <svg {...p}><path d="M3 12h12M11 6l6 6-6 6" /><path d="M21 4v16" /></svg>
    case 'layout': return <svg {...p}><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M3 9h18M9 21V9" /></svg>
    case 'bolt': return <svg {...p}><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" /></svg>
    case 'card': return <svg {...p}><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M3 10h18M7 15h3" /></svg>
    case 'repeat': return <svg {...p}><path d="M17 2v6h-6M7 22v-6h6" /><path d="M20 12a8 8 0 0 0-14-5M4 12a8 8 0 0 0 14 5" /></svg>
    case 'tag': return <svg {...p}><path d="M3 12V4h8l9 9-8 8-9-9Z" /><circle cx="7.5" cy="8.5" r="1.3" /></svg>
    case 'truck': return <svg {...p}><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7z" /><circle cx="7" cy="18" r="1.8" /><circle cx="17" cy="18" r="1.8" /></svg>
    case 'sparkle': return <svg {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" /></svg>
    case 'check': return <svg {...p}><path d="m5 12 4 4L19 6" /></svg>
    case 'arrow': return <svg {...p}><path d="M7 17 17 7M8 7h9v9" /></svg>
    case 'plus': return <svg {...p}><path d="M12 5v14M5 12h14" /></svg>
    default: return null
  }
}

const BRANDS_CREATE = [
  { k: 'claude', name: 'Claude' },
  { k: 'openai', name: 'OpenAI' },
  { k: 'figma', name: 'Figma' },
]
const BRANDS_MIGRATE = [
  { k: 'shopify', name: 'Shopify' },
  { k: 'nuvemshop', name: 'Nuvemshop' },
  { k: 'woo', name: 'WooCommerce' },
]

function BrandMark({ k, size = 22 }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', 'aria-hidden': true }
  switch (k) {
    case 'claude': return (
      <svg {...p}><g fill="#D97757">{Array.from({ length: 10 }).map((_, i) => (
        <rect key={i} x="11.25" y="2.4" width="1.5" height="7.4" rx=".75" transform={`rotate(${i * 36} 12 12)`} />
      ))}</g></svg>)
    case 'openai': return (
      <svg {...p} fill="none" stroke="#0F0F14" strokeWidth="1.5">
        {[0, 60, 120].map((a) => <ellipse key={a} cx="12" cy="12" rx="8.4" ry="3.6" transform={`rotate(${a} 12 12)`} />)}
      </svg>)
    case 'figma': return (
      <svg {...p} viewBox="0 0 16 24">
        <path d="M4 0h4v8H4a4 4 0 0 1 0-8Z" fill="#F24E1E" />
        <path d="M8 0h4a4 4 0 0 1 0 8H8V0Z" fill="#FF7262" />
        <path d="M4 8h4v8H4a4 4 0 0 1 0-8Z" fill="#A259FF" />
        <circle cx="12" cy="12" r="4" fill="#1ABCFE" />
        <path d="M4 16h4v4a4 4 0 1 1-4-4Z" fill="#0ACF83" />
      </svg>)
    case 'shopify': return (
      <svg {...p}><path d="M15.4 4.2c-.1-.1-.3-.1-.4-.1l-1 .2c-.3-.9-.9-1.8-1.9-1.8h-.2c-.3-.4-.7-.6-1.1-.6-1.6 0-2.7 2-3.2 3.6l-1.4.4c-.5.1-.5.2-.6.6L4 19.6l8.3 1.6 4.5-1L15.4 4.2Z" fill="#95BF47" /><path d="M15 4.1l-1 .3c-.3-.9-.9-1.8-1.9-1.8l-.7 18.6 4.5-1L15.4 4.2c-.1-.1-.2-.1-.4-.1Z" fill="#5E8E3E" /><path d="M12.6 8.6l-.6 1.7s-.6-.3-1.3-.3c-1 0-1.1.6-1.1.8 0 1 2.6 1.4 2.6 3.8 0 1.8-1.2 3-2.7 3-1.9 0-2.8-1.2-2.8-1.2l.5-1.7s1 .8 1.8.8c.5 0 .7-.4.7-.7 0-1.3-2.1-1.4-2.1-3.6 0-1.8 1.3-3.5 3.9-3.5.9 0 1.1.2 1.1.2Z" fill="#fff" /></svg>)
    case 'nuvemshop': return (
      <svg {...p} viewBox="0 0 24 24"><path d="M18.6 10.2A5.2 5.2 0 0 0 8.9 8.4a4.2 4.2 0 0 0-.6 8.4h9.9a3.6 3.6 0 0 0 .4-6.6Z" fill="#2C6DF6" /><path d="M10.6 12.6h3.6l-3.1 3.4h3.3" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>)
    case 'woo': return (
      <svg {...p} viewBox="0 0 28 20"><rect x="0" y="1.5" width="28" height="15" rx="3.4" fill="#7F54B3" /><path d="M4.6 6.2l1.5 5 1.7-4.4.9 4.4 1.5-5M13.4 6c1.3 0 1.9 1 1.9 2.2 0 1.4-.8 2.6-2.1 2.6-1.2 0-1.9-1-1.9-2.2C11.3 7.2 12.1 6 13.4 6ZM19.4 6c1.3 0 1.9 1 1.9 2.2 0 1.4-.8 2.6-2.1 2.6-1.2 0-1.9-1-1.9-2.2C17.3 7.2 18.1 6 19.4 6Z" stroke="#fff" strokeWidth="1.15" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>)
    default: return null
  }
}

function BrandChip({ b }) {
  return <span className="f2-brand"><BrandMark k={b.k} /><b>{b.name}</b></span>
}

function AiTag({ children = 'AI' }) { return <span className="f2-aitag"><Icon name="sparkle" size={11} />{children}</span> }

/* ── mocks por caminho ─────────────────────────────────────── */
function PathVisual({ p }) {
  if (p.kind === 'chat') {
    return (
      <div className="f2-chat">
        <div className="f2-chat-h"><AiTag>Briefing</AiTag><span>Unbox CLI · Claude Code</span></div>
        {p.chat.map((l, i) => <div className={'f2-bub ' + l.r} key={i}>{l.r !== 'u' && <Icon name={l.r.includes('ok') ? 'check' : 'sparkle'} size={13} />}{l.t}</div>)}
      </div>
    )
  }
  return (
    <div className="f2-termwrap">
      <div className="f2-term">
        <div className="f2-term-head"><i /><i /><i /><span>unbox · cli</span></div>
        <div className="f2-term-body">
          <div className="f2-term-cmd"><span>$</span> {p.term.cmd}<b className="f2-caret" /></div>
          {p.term.out.map((o) => <div className="f2-term-line" key={o}>→ {o}</div>)}
          <div className="f2-term-line ok">{p.term.ok}</div>
        </div>
      </div>
      {p.kind === 'migrate' && (
        <div className="f2-from">
          <span>Migre de</span>
          {BRANDS_MIGRATE.map((b) => <BrandChip b={b} key={b.k} />)}
          <span>e outras</span>
        </div>
      )}
    </div>
  )
}

/* ── painel dos 3 caminhos ─────────────────────────────────── */
function Paths() {
  const [tab, setTab] = useState(0)
  const [prog, setProg] = useState(0)
  const paused = useRef(false); const pr = useRef(0)
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('via')
    if (q !== null) { paused.current = true; setTab(Math.min(PATHS.length - 1, Math.max(0, Number(q) || 0))) }
    const id = setInterval(() => { if (paused.current) return; pr.current += 1 / 200; if (pr.current >= 1) { pr.current = 0; setTab((t) => (t + 1) % PATHS.length) } setProg(pr.current) }, 40)
    return () => clearInterval(id)
  }, [])
  const P = PATHS[tab]
  return (
    <div className={'f2-panel tint-' + P.tint} onMouseEnter={() => { paused.current = true }} onMouseLeave={() => { paused.current = false }}>
      <div className="f2-ptabs" role="tablist">
        {PATHS.map((p, i) => (
          <button key={p.key} role="tab" aria-selected={i === tab} className={'f2-ptab' + (i === tab ? ' is-on' : '')} onClick={() => { pr.current = 0; setProg(0); setTab(i) }}>
            <span className="f2-ptab-ico"><Icon name={p.icon} size={16} /></span>
            <span className="f2-ptab-lbl">{p.label}</span>
            {i === tab && <i className="f2-ptab-prog" style={{ transform: `scaleX(${prog})` }} />}
          </button>
        ))}
      </div>
      <div className="f2-show" key={P.key}>
        <div className="f2-show-copy">
          <span className="f2-tag">{P.tag}</span>
          <h3>{P.title}</h3>
          <p>{P.body}</p>
          <ul className="f2-gets">{P.gets.map((g) => <li key={g}><Icon name="check" size={15} />{g}</li>)}</ul>
        </div>
        <div className="f2-show-media"><PathVisual p={P} /></div>
      </div>
    </div>
  )
}

function Compare({ c }) {
  const [x, setX] = useState(50)
  return (
    <div className="f2-case">
      <div className="f2-case-head"><img src={c.logo} alt={c.name} className={'f2-case-logo' + (c.dark ? ' is-dark' : '')} /><span className="f2-case-seg">{c.seg}</span></div>
      <div className="f2-cmp" style={{ '--x': x + '%' }}>
        <img src={c.before} alt={`${c.name} antes`} className="f2-cmp-img" />
        <div className="f2-cmp-after"><img src={c.after} alt={`${c.name} depois`} className="f2-cmp-img" /></div>
        <div className="f2-cmp-bar"><i /></div>
        <span className="f2-cmp-tag l">Antes</span><span className="f2-cmp-tag r">Depois · Unbox</span>
        <input type="range" min="2" max="98" value={x} onChange={(e) => setX(Number(e.target.value))} aria-label="Comparar antes e depois" />
      </div>
    </div>
  )
}

function WaitlistForm({ id, title, subtitle, micro, full }) {
  const [form, setForm] = useState({ nome: '', email: '', whatsapp: '', perfil: '', faturamento: '' })
  const [status, setStatus] = useState('idle')
  const onPhone = (e) => setForm({ ...form, whatsapp: maskBR(e.target.value) })
  const submit = async (e) => {
    e.preventDefault()
    const digits = form.whatsapp.replace(/\D/g, '')
    if (!form.nome.trim() || !/.+@.+\..+/.test(form.email) || digits.length < 10 || !form.perfil) return
    setStatus('sending')
    try {
      const res = await fetch('/api/ai-lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, origem: `LP /ai-unbox-v2 (${id})` }) })
      setStatus(res.ok ? 'done' : 'error')
    } catch { setStatus('error') }
  }
  if (status === 'done') {
    return (
      <div className={'f2-wl' + (full ? ' full' : '')}>
        <div className="f2-thanks"><div className="f2-thanks-ico"><Icon name="check" size={22} /></div><h3>Você está na lista.</h3><p>Vamos te chamar por ordem de chegada, com as condições de early access antes da abertura pública.</p></div>
      </div>
    )
  }
  return (
    <div className={'f2-wl' + (full ? ' full' : '')}>
      {title && <h3 className="f2-wl-t">{title}</h3>}
      {subtitle && <p className="f2-wl-s">{subtitle}</p>}
      <form onSubmit={submit}>
        <div className="f2-field"><label htmlFor={`n-${id}`}>Seu nome</label><input id={`n-${id}`} type="text" value={form.nome} placeholder="Como podemos te chamar" onChange={(e) => setForm({ ...form, nome: e.target.value })} required /></div>
        <div className="f2-field"><label htmlFor={`e-${id}`}>Seu melhor e-mail</label><input id={`e-${id}`} type="email" value={form.email} placeholder="voce@suamarca.com.br" onChange={(e) => setForm({ ...form, email: e.target.value })} required /></div>
        <div className="f2-field"><label htmlFor={`w-${id}`}>Seu WhatsApp</label><input id={`w-${id}`} type="tel" inputMode="tel" value={form.whatsapp} placeholder="(11) 91234-5678" onChange={onPhone} required /></div>
        <div className="f2-field"><label htmlFor={`p-${id}`}>Sou</label><select id={`p-${id}`} value={form.perfil} onChange={(e) => setForm({ ...form, perfil: e.target.value })} required><option value="" disabled>Selecione</option>{PERFIS.map((p) => <option key={p}>{p}</option>)}</select></div>
        {full && <div className="f2-field"><label htmlFor={`f-${id}`}>Faturamento mensal aproximado <span className="f2-opt">(opcional)</span></label><select id={`f-${id}`} value={form.faturamento} onChange={(e) => setForm({ ...form, faturamento: e.target.value })}><option value="">Prefiro não informar</option>{FATURAMENTO.map((f) => <option key={f}>{f}</option>)}</select></div>}
        <button className="f2-btn f2-btn-dark f2-btn-full" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Enviando…' : 'Quero meu acesso antecipado'}</button>
        {status === 'error' && <p className="f2-err">Algo deu errado ao enviar. Tente de novo em instantes.</p>}
        {micro && <p className="f2-micro">{micro}</p>}
      </form>
    </div>
  )
}

export default function AiFoundryV2() {
  const [faq, setFaq] = useState(0)
  const finalRef = useRef(null)
  const goForm = () => finalRef.current && finalRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })

  useEffect(() => {
    const qs = new URLSearchParams(window.location.search)
    const only = qs.get('only')
    if (only) {
      const root = document.getElementById('aif2')
      Array.from(root.children).forEach((el) => { if (el.id !== only) el.style.display = 'none' })
    }
    const els = document.querySelectorAll('#aif2 [data-rv]')
    if (qs.get('rv') || only) { els.forEach((el) => el.classList.add('f2-in')); return }
    if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('f2-in')); return }
    const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('f2-in'); io.unobserve(en.target) } }), { threshold: 0.12 })
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <Head>
        <title>Unbox AI Foundry — crie sua loja do zero, do Figma ou migrando com AI</title>
        <meta name="description" content="Três caminhos para ter uma loja na Unbox: descreva a marca em um briefing por chat, importe o seu Figma ou migre por completo de qualquer plataforma. Tudo com AI, checkout e assinatura nativos. Entre na lista de espera." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </Head>

      <Nav />

      <div id="aif2">
        {/* HERO */}
        <section className="f2-hero" id="hero">
          <div className="f2-wrap">
            <div className="f2-hero-copy" data-rv>
              <span className="f2-eye"><i className="f2-dot" />LISTA DE ESPERA ABERTA · VAGAS POR LOTE</span>
              <h1>Três jeitos de criar a sua loja.<br /><em>Todos com AI.</em></h1>
              <p className="f2-lead">Descreva a marca num briefing por chat, importe o seu Figma ou migre por completo de onde estiver. O que sai do outro lado é uma loja pronta para vender — com checkout, assinatura e pagamento nativos.</p>
              <div className="f2-cta-row">
                <button className="f2-btn f2-btn-dark f2-btn-lg" onClick={goForm}>Entrar na lista de espera</button>
                <a href="#caminhos" className="f2-btn f2-btn-white f2-btn-lg">Ver os três caminhos</a>
              </div>
              <p className="f2-micro">Sem custo, sem compromisso · Funciona com Claude, ChatGPT e Cursor via MCP</p>
            </div>
            <div data-rv><Paths /></div>
          </div>
        </section>

        {/* LOGOS */}
        <section className="f2-logos" id="logos">
          <div className="f2-wrap f2-logos-in" data-rv>
            <div className="f2-logos-g">
              <span className="f2-logos-l">Você cria com</span>
              <div className="f2-logos-row">{BRANDS_CREATE.map((b) => <BrandChip b={b} key={b.k} />)}</div>
            </div>
            <div className="f2-logos-div" aria-hidden="true" />
            <div className="f2-logos-g">
              <span className="f2-logos-l">Ou migra de</span>
              <div className="f2-logos-row">{BRANDS_MIGRATE.map((b) => <BrandChip b={b} key={b.k} />)}</div>
            </div>
          </div>
        </section>

        {/* CAMINHOS — âncora explicativa */}
        <section className="f2-sec" id="caminhos">
          <div className="f2-wrap">
            <div className="f2-head f2-center" data-rv>
              <span className="f2-eye"><i className="f2-dot" />COMO COMEÇAR</span>
              <h2>Você escolhe por onde entra. A loja sai completa dos três.</h2>
              <p>Não importa se a marca ainda é uma ideia, se já existe um design no Figma ou se ela vende há anos em outra plataforma. O que muda é o ponto de partida, não o resultado.</p>
            </div>
            <div className="f2-ways">
              {PATHS.map((p, i) => (
                <a href={`?via=${i}#caminhos`} className={'f2-way tint-' + p.tint} data-rv style={{ transitionDelay: `${i * 80}ms` }} key={p.key}>
                  <span className="f2-way-n">0{i + 1}</span>
                  <span className="f2-way-ico"><Icon name={p.icon} size={20} /></span>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                  <span className="f2-textlink">Ver esse caminho <Icon name="arrow" size={15} /></span>
                  <div className="f2-way-blob" />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CASES */}
        <section className="f2-sec" id="cases">
          <div className="f2-wrap">
            <div className="f2-head f2-center" data-rv>
              <span className="f2-eye"><i className="f2-dot" />QUEM JÁ MIGROU</span>
              <h2>Três marcas já remontadas. Arraste para comparar.</h2>
              <p>Migradas de outras plataformas e refeitas com AI na Unbox. Todas vendendo hoje.</p>
            </div>
            <div className="f2-cases" data-rv>{CASES.map((c) => <Compare c={c} key={c.name} />)}</div>
          </div>
        </section>


        {/* O QUE VEM PRONTO */}
        <section className="f2-sec f2-sec-alt" id="pronto">
          <div className="f2-wrap">
            <div className="f2-head f2-center" data-rv>
              <span className="f2-eye"><i className="f2-dot" />O QUE JÁ VEM PRONTO</span>
              <h2>A loja não nasce vazia. Nasce vendendo.</h2>
              <p>Tudo o que costuma virar projeto à parte — checkout, recorrência, pagamento, promoções, envios — já vem nativo no que a AI gera para você.</p>
            </div>
            <div className="f2-ready">
              {READY.map((r, i) => (
                <div className="f2-rcard" data-rv style={{ transitionDelay: `${i * 60}ms` }} key={r.t}>
                  <span className="f2-rcard-ico"><Icon name={r.icon} size={20} /></span>
                  <b>{r.t}</b><p>{r.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AGENTES */}
        <section className="f2-sec f2-band" id="agentes">
          <div className="f2-wrap">
            <div className="f2-head f2-center" data-rv>
              <span className="f2-eye light"><i className="f2-dot" />AGENTES EMBARCADOS</span>
              <h2>Um time de agentes vem dentro do projeto.</h2>
              <p>Toda loja gerada pelo CLI já vem com eles. Rodam quando você quiser, na ordem que fizer sentido — e o seu julgamento continua no comando.</p>
            </div>
            <div className="f2-agents">
              {AGENTS.map((a, i) => (
                <div className="f2-agent" data-rv style={{ transitionDelay: `${i * 60}ms` }} key={a.t}>
                  <span className="f2-agent-ico"><Icon name="sparkle" size={16} /></span>
                  <div><b>{a.t}</b><p>{a.d}</p></div>
                </div>
              ))}
            </div>
            <div className="f2-mcp" data-rv>
              <div className="f2-mcp-copy">
                <AiTag>Unbox MCP</AiTag>
                <h3>Depois que a loja está no ar, você opera por texto.</h3>
                <p>Preço, estoque, cupom, campanha, regra de assinatura. Leituras são diretas; toda escrita passa por preparar e confirmar. Na AI que você já usa.</p>
              </div>
              <div className="f2-term">
                <div className="f2-term-body">
                  <div className="f2-term-line">você: <span className="w">cria o cupom BRUNINHO10 com 10% de desconto</span></div>
                  <div className="f2-term-line">AI: plano preparado · 1 escrita · Confirmar?</div>
                  <div className="f2-term-line">você: <span className="w">confirma</span></div>
                  <div className="f2-term-line ok">✓ criado, ativado e publicado na Badia</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROVA REAL */}
        <section className="f2-sec" id="prova">
          <div className="f2-wrap">
            <div className="f2-head f2-center" data-rv>
              <span className="f2-eye"><i className="f2-dot" />PROVA REAL</span>
              <h2>Não é conceito. É print de loja de verdade.</h2>
              <p>Um pedido em texto. Cupom criado, ativado e publicado na <a className="f2-link" href="https://temperosbadia.com.br/" target="_blank" rel="noopener noreferrer">Temperos Badia</a> — loja em produção, rodando na Unbox.</p>
            </div>
            <div className="f2-proof" data-rv>
              <figure className="f2-shot"><figcaption>1 · no agente</figcaption><img src="/img/ai-prova-agente.png" alt="Agente confirmando: cupom BRUNINHO10 criado e ativo na Badia" loading="lazy" /></figure>
              <div className="f2-proof-arrow" aria-hidden="true">↓</div>
              <figure className="f2-shot tall"><figcaption>2 · no checkout da loja</figcaption><img src="/img/ai-prova-checkout.png" alt="Carrinho da Temperos Badia com o cupom BRUNINHO10 aplicado" loading="lazy" /></figure>
              <p className="f2-proof-cap"><b>Do pedido ao desconto no carrinho do cliente.</b> Sem abrir painel, sem deploy, sem esperar time técnico.</p>
            </div>
          </div>
        </section>

        {/* CONTROLE */}
        <section className="f2-sec" id="controle">
          <div className="f2-wrap f2-narrow">
            <div className="f2-head f2-center" data-rv>
              <span className="f2-eye"><i className="f2-dot" />CONTROLE</span>
              <h2>Você define o que a AI faz sozinha. E o que precisa da sua aprovação.</h2>
            </div>
            <div className="f2-steps" data-rv>
              <div className="f2-step"><span>01</span><b>Ela lê</b><p>Catálogo, pedidos, campanhas e assinaturas. Leitura é direta, sem fricção.</p></div>
              <div className="f2-step"><span>02</span><b>Ela prepara</b><p>Monta o plano da mudança e mostra exatamente o que vai acontecer.</p></div>
              <div className="f2-step"><span>03</span><b>Você confirma</b><p>Nada irreversível acontece sem o seu aval. E tudo fica registrado.</p></div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="f2-sec f2-sec-alt" id="faq">
          <div className="f2-wrap f2-narrow">
            <div className="f2-head" data-rv><span className="f2-eye"><i className="f2-dot" />DÚVIDAS</span><h2>O que você deve estar se perguntando</h2></div>
            <div className="f2-faq" data-rv>
              {FAQ.map((f, i) => (
                <div className={'f2-faq-item' + (faq === i ? ' is-open' : '')} key={i}>
                  <button className="f2-faq-q" onClick={() => setFaq(faq === i ? -1 : i)}><span>{f.q}</span><i><Icon name="plus" size={16} /></i></button>
                  <div className="f2-faq-a"><p>{f.a}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="f2-final-wrap" id="lista" ref={finalRef}>
          <div className="f2-wrap">
            <div className="f2-final" data-rv>
              <div className="f2-final-copy">
                <span className="f2-eye light"><i className="f2-dot" />UNBOX AI FOUNDRY</span>
                <h2>Escolha o seu caminho. A gente constrói junto.</h2>
                <p>Do zero, do Figma ou migrando: quem entra agora testa mais cedo e trava a condição de early access antes do preço final.</p>
                <ul className="f2-final-list">
                  <li><Icon name="check" size={16} />Ativam antes da abertura pública</li>
                  <li><Icon name="check" size={16} />Ajudam a moldar o produto com feedback direto</li>
                  <li><Icon name="check" size={16} />Travam a condição de early access</li>
                </ul>
              </div>
              <WaitlistForm id="final" full title="Garanta seu acesso antecipado" subtitle="Leva 20 segundos. Sem custo, sem compromisso." micro="Chamada por ordem de chegada. Sem spam." />
            </div>
          </div>
        </section>
      </div>

      <Footer />

      <style jsx global>{`
        #aif2 {
          --bg: #FBFAF6; --ink: #16161C; --ink-2: #4A4A55; --mut: #7A7A86; --line: rgba(22,22,28,.09);
          --roxo: #8F28F6; --roxo-2: #5612AB; --verde: #1FBF5A; --neon: #39FF14;
          --sky: #E6F0FF; --sky-2: #C3DFFE; --lavender: #EEE6FF; --lavender-2: #D4C2FF; --mint: #E4FAF3; --mint-2: #BAF0EC; --lime: #F1FBDF;
          --mono: 'JetBrains Mono', ui-monospace, Menlo, monospace;
          font-family: 'Sora', system-ui, -apple-system, sans-serif; color: var(--ink); background: var(--bg); -webkit-font-smoothing: antialiased; line-height: 1.5; overflow-x: clip;
        }
        #aif2 *, #aif2 *::before, #aif2 *::after { box-sizing: border-box; }
        #aif2 a { color: inherit; text-decoration: none; }
        #aif2 .f2-wrap { max-width: 1180px; margin: 0 auto; padding: 0 24px; }
        #aif2 .f2-narrow { max-width: 860px; }
        #aif2 [data-rv] { opacity: 0; transform: translateY(16px); transition: opacity .7s ease, transform .7s cubic-bezier(.2,.7,.2,1); }
        #aif2 [data-rv].f2-in { opacity: 1; transform: none; }
        #aif2 .tint-sky { --t: var(--sky); --t2: var(--sky-2); } #aif2 .tint-lavender { --t: var(--lavender); --t2: var(--lavender-2); } #aif2 .tint-mint { --t: var(--mint); --t2: var(--mint-2); }

        #aif2 .f2-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; font-weight: 600; font-size: 15px; border-radius: 12px; padding: 12px 20px; border: 1px solid transparent; transition: transform .15s ease, box-shadow .2s, background .2s, border-color .2s; white-space: nowrap; cursor: pointer; font-family: inherit; }
        #aif2 .f2-btn-lg { padding: 16px 26px; font-size: 16px; border-radius: 14px; }
        #aif2 .f2-btn-full { width: 100%; margin-top: 6px; }
        #aif2 .f2-btn-dark { background: var(--ink); color: #fff; } #aif2 .f2-btn-dark:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(22,22,28,.22); }
        #aif2 .f2-btn-white { background: #fff; color: var(--ink); border-color: var(--line); } #aif2 .f2-btn-white:hover { border-color: rgba(22,22,28,.25); transform: translateY(-2px); }
        #aif2 .f2-textlink { display: inline-flex; align-items: center; gap: 6px; font-weight: 600; color: var(--roxo-2); }
        #aif2 .f2-eye { display: inline-flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 700; letter-spacing: .18em; color: var(--roxo-2); }
        #aif2 .f2-eye.light { color: #C9A8FF; }
        #aif2 .f2-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--verde); box-shadow: 0 0 0 3px rgba(31,191,90,.18); }
        #aif2 .f2-aitag { display: inline-flex; align-items: center; gap: 5px; font-size: 10.5px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: #fff; background: linear-gradient(135deg, var(--roxo), #B06BFF); border-radius: 999px; padding: 4px 9px; }
        #aif2 .f2-link { color: var(--roxo-2); font-weight: 600; border-bottom: 1px solid rgba(86,18,171,.3); }

        /* hero */
        #aif2 .f2-hero { padding: clamp(104px, 13vw, 140px) 0 24px; }
        #aif2 .f2-hero-copy { text-align: center; max-width: 880px; margin: 0 auto 44px; }
        #aif2 h1 { font-size: clamp(36px, 5vw, 62px); font-weight: 700; letter-spacing: -.04em; line-height: 1.04; margin: 22px 0 20px; }
        #aif2 h1 em { font-style: normal; background: linear-gradient(90deg, var(--roxo), #B06BFF); -webkit-background-clip: text; background-clip: text; color: transparent; }
        #aif2 .f2-lead { font-size: clamp(16px, 1.5vw, 19px); color: var(--ink-2); line-height: 1.58; max-width: 660px; margin: 0 auto; }
        #aif2 .f2-cta-row { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; margin-top: 28px; }
        #aif2 .f2-micro { font-size: 13px; color: var(--mut); margin: 14px auto 0; max-width: 560px; }

        /* painel dos caminhos */
        #aif2 .f2-panel { border-radius: 32px; padding: 28px 28px 0; background: linear-gradient(180deg, var(--t2), var(--t) 60%, #fff 140%); transition: background .6s ease; box-shadow: inset 0 1px 0 rgba(255,255,255,.6); }
        #aif2 .f2-ptabs { display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; margin-bottom: 26px; }
        #aif2 .f2-ptab { position: relative; display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,.55); border: 1px solid rgba(255,255,255,.7); color: var(--ink-2); border-radius: 999px; padding: 8px 18px 8px 8px; font-family: inherit; font-weight: 600; font-size: 15px; cursor: pointer; overflow: hidden; transition: background .2s, color .2s; }
        #aif2 .f2-ptab.is-on { background: #fff; color: var(--ink); box-shadow: 0 8px 22px rgba(22,22,28,.08); }
        #aif2 .f2-ptab-ico { width: 30px; height: 30px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; background: var(--t); color: var(--ink); }
        #aif2 .f2-ptab.is-on .f2-ptab-ico { background: var(--ink); color: #fff; }
        #aif2 .f2-ptab-prog { position: absolute; left: 0; bottom: 0; height: 2px; width: 100%; background: var(--ink); transform-origin: left; }
        #aif2 .f2-show { display: grid; grid-template-columns: .92fr 1.08fr; gap: 32px; background: #fff; border-radius: 24px 24px 0 0; padding: 36px 36px 32px; align-items: center; animation: f2fade .5s ease; }
        @keyframes f2fade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        #aif2 .f2-tag { display: inline-flex; font-size: 11px; font-weight: 700; letter-spacing: .16em; color: var(--ink); background: var(--t); border-radius: 8px; padding: 5px 10px; }
        #aif2 .f2-show-copy h3 { font-size: clamp(23px, 2.5vw, 32px); font-weight: 700; letter-spacing: -.03em; line-height: 1.12; margin: 14px 0 12px; }
        #aif2 .f2-show-copy p { color: var(--ink-2); font-size: 15.5px; line-height: 1.6; margin: 0 0 18px; }
        #aif2 .f2-gets { list-style: none; margin: 0; padding: 0; display: grid; gap: 9px; }
        #aif2 .f2-gets li { display: flex; align-items: flex-start; gap: 9px; font-size: 14.5px; color: var(--ink-2); }
        #aif2 .f2-gets li svg { color: var(--verde); flex-shrink: 0; margin-top: 2px; }

        /* chat e terminal */
        #aif2 .f2-chat { background: var(--bg); border: 1px solid var(--line); border-radius: 18px; padding: 16px; display: grid; gap: 9px; }
        #aif2 .f2-chat-h { display: flex; align-items: center; justify-content: space-between; font-size: 11.5px; color: var(--mut); padding-bottom: 9px; border-bottom: 1px solid var(--line); }
        #aif2 .f2-bub { max-width: 88%; padding: 10px 13px; border-radius: 13px; font-size: 13.5px; line-height: 1.45; opacity: 0; transform: translateY(6px); animation: f2bub .45s ease forwards; }
        #aif2 .f2-bub.u { margin-left: auto; background: var(--ink); color: #fff; border-bottom-right-radius: 4px; }
        #aif2 .f2-bub.a { background: #fff; border: 1px solid var(--line); color: var(--ink); border-bottom-left-radius: 4px; }
        #aif2 .f2-bub.a.ok { background: var(--lime); border-color: transparent; }
        #aif2 .f2-bub svg { vertical-align: -2px; margin-right: 6px; color: var(--roxo-2); } #aif2 .f2-bub.a.ok svg { color: var(--verde); }
        #aif2 .f2-bub:nth-child(2) { animation-delay: .2s } #aif2 .f2-bub:nth-child(3) { animation-delay: .8s } #aif2 .f2-bub:nth-child(4) { animation-delay: 1.4s } #aif2 .f2-bub:nth-child(5) { animation-delay: 2s } #aif2 .f2-bub:nth-child(6) { animation-delay: 2.6s }
        @keyframes f2bub { to { opacity: 1; transform: none; } }
        #aif2 .f2-term { background: #0D0D12; border-radius: 14px; color: #E8E8EE; font-family: var(--mono); font-size: 13px; overflow: hidden; box-shadow: 0 20px 50px rgba(22,22,28,.2); }
        #aif2 .f2-term-head { display: flex; align-items: center; gap: 6px; padding: 12px 14px; border-bottom: 1px solid rgba(255,255,255,.08); }
        #aif2 .f2-term-head i { width: 10px; height: 10px; border-radius: 50%; background: #3a3a44; } #aif2 .f2-term-head span { margin-left: 8px; color: #7d7d8a; font-size: 11.5px; }
        #aif2 .f2-term-body { padding: 16px 18px 20px; }
        #aif2 .f2-term-cmd { color: #fff; font-size: 14px; margin-bottom: 10px; } #aif2 .f2-term-cmd span { color: var(--neon); margin-right: 6px; }
        #aif2 .f2-caret { display: inline-block; width: 8px; height: 14px; background: var(--neon); margin-left: 3px; vertical-align: middle; animation: f2blink 1s steps(2) infinite; }
        @keyframes f2blink { 50% { opacity: 0; } }
        #aif2 .f2-term-line { color: #a6a6b3; line-height: 1.95; } #aif2 .f2-term-line.ok { color: var(--neon); } #aif2 .f2-term-line .w { color: #fff; }
        #aif2 .f2-from { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; margin-top: 14px; font-size: 13px; color: var(--mut); }
        #aif2 .f2-from { gap: 10px; }

        /* faixa de logos */
        #aif2 .f2-logos { padding: 8px 0 4px; }
        #aif2 .f2-logos-in { display: flex; align-items: center; justify-content: center; gap: 34px; flex-wrap: wrap; padding-top: 34px; padding-bottom: 34px; }
        #aif2 .f2-logos-g { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; justify-content: center; }
        #aif2 .f2-logos-l { font-size: 12px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--mut); white-space: nowrap; }
        #aif2 .f2-logos-row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        #aif2 .f2-logos-div { width: 1px; height: 34px; background: var(--line); }
        #aif2 .f2-brand { display: inline-flex; align-items: center; gap: 8px; background: #fff; border: 1px solid var(--line); border-radius: 999px; padding: 8px 15px 8px 10px; }
        #aif2 .f2-brand b { font-size: 14.5px; font-weight: 600; letter-spacing: -.01em; color: var(--ink); white-space: nowrap; }
        #aif2 .f2-brand svg { flex-shrink: 0; }
        #aif2 .f2-from .f2-brand { padding: 5px 11px 5px 7px; gap: 6px; } #aif2 .f2-from .f2-brand b { font-size: 12.5px; } #aif2 .f2-from .f2-brand svg { width: 18px; height: 18px; }

        /* seções */
        #aif2 .f2-sec { padding: 92px 0; }
        #aif2 .f2-sec-alt { background: #fff; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
        #aif2 .f2-head { max-width: 800px; margin-bottom: 44px; } #aif2 .f2-head.f2-center { margin-left: auto; margin-right: auto; text-align: center; }
        #aif2 h2 { font-size: clamp(28px, 3.8vw, 46px); font-weight: 700; letter-spacing: -.04em; line-height: 1.08; margin: 14px 0 0; }
        #aif2 .f2-head p { color: var(--ink-2); font-size: 17px; line-height: 1.6; margin: 18px 0 0; }

        /* 3 caminhos em cards */
        #aif2 .f2-ways { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        #aif2 .f2-way { position: relative; overflow: hidden; background: #fff; border: 1px solid var(--line); border-radius: 22px; padding: 26px 24px 130px; display: block; transition: transform .2s, box-shadow .2s; }
        #aif2 .f2-way:hover { transform: translateY(-4px); box-shadow: 0 18px 40px rgba(22,22,28,.08); }
        #aif2 .f2-way-n { font-size: 12px; font-weight: 700; letter-spacing: .14em; color: var(--mut); }
        #aif2 .f2-way-ico { width: 42px; height: 42px; border-radius: 12px; background: var(--t); color: var(--ink); display: flex; align-items: center; justify-content: center; margin: 12px 0 14px; }
        #aif2 .f2-way h3 { font-size: 20px; font-weight: 700; letter-spacing: -.025em; line-height: 1.2; margin: 0 0 8px; }
        #aif2 .f2-way p { color: var(--ink-2); font-size: 14.5px; line-height: 1.55; margin: 0 0 16px; }
        #aif2 .f2-way .f2-textlink { position: relative; z-index: 1; }
        #aif2 .f2-way-blob { position: absolute; left: -10%; right: -10%; bottom: -70px; height: 190px; border-radius: 50% 50% 0 0; background: radial-gradient(60% 80% at 50% 100%, var(--t2), var(--t) 60%, transparent 100%); opacity: .9; pointer-events: none; }

        /* o que vem pronto */
        #aif2 .f2-ready { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
        #aif2 .f2-rcard { background: var(--bg); border: 1px solid var(--line); border-radius: 18px; padding: 22px; transition: transform .2s, box-shadow .2s; }
        #aif2 .f2-rcard:hover { transform: translateY(-3px); box-shadow: 0 16px 36px rgba(22,22,28,.07); }
        #aif2 .f2-rcard-ico { width: 40px; height: 40px; border-radius: 12px; background: var(--lavender); color: var(--roxo-2); display: inline-flex; align-items: center; justify-content: center; }
        #aif2 .f2-rcard b { display: block; font-size: 16.5px; margin-top: 14px; letter-spacing: -.01em; }
        #aif2 .f2-rcard p { margin: 6px 0 0; font-size: 14px; color: var(--ink-2); line-height: 1.5; }

        /* banda de agentes */
        #aif2 .f2-band { background: radial-gradient(60% 80% at 85% 0%, rgba(143,40,246,.45), transparent 60%), radial-gradient(40% 60% at 0% 100%, rgba(57,255,20,.14), transparent 60%), #0F0F14; color: #fff; }
        #aif2 .f2-band .f2-head p { color: rgba(255,255,255,.7); } #aif2 .f2-band .f2-dot { background: var(--neon); box-shadow: 0 0 0 3px rgba(57,255,20,.2); }
        #aif2 .f2-agents { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
        #aif2 .f2-agent { display: flex; gap: 13px; background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1); border-radius: 18px; padding: 20px; }
        #aif2 .f2-agent-ico { width: 36px; height: 36px; border-radius: 10px; background: rgba(143,40,246,.28); color: #D9C2FF; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        #aif2 .f2-agent b { display: block; font-size: 16px; letter-spacing: -.01em; }
        #aif2 .f2-agent p { margin: 5px 0 0; font-size: 13.5px; color: rgba(255,255,255,.68); line-height: 1.5; }
        #aif2 .f2-mcp { margin-top: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 32px; align-items: center; background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1); border-radius: 22px; padding: 30px; }
        #aif2 .f2-mcp h3 { font-size: 24px; font-weight: 700; letter-spacing: -.025em; line-height: 1.2; margin: 12px 0 10px; }
        #aif2 .f2-mcp p { margin: 0; color: rgba(255,255,255,.7); font-size: 14.5px; line-height: 1.55; }
        #aif2 .f2-mcp .f2-term { box-shadow: none; border: 1px solid rgba(255,255,255,.1); }

        /* prova */
        #aif2 .f2-proof { max-width: 760px; margin: 0 auto; text-align: center; }
        #aif2 .f2-shot { margin: 0; background: #fff; border: 1px solid var(--line); border-radius: 18px; padding: 14px; box-shadow: 0 20px 50px rgba(22,22,28,.08); }
        #aif2 .f2-shot figcaption { font-size: 11px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--mut); text-align: left; padding: 2px 4px 10px; }
        #aif2 .f2-shot img { display: block; width: 100%; height: auto; border-radius: 10px; }
        #aif2 .f2-shot.tall img { max-height: 460px; object-fit: cover; object-position: top; }
        #aif2 .f2-proof-arrow { font-size: 22px; color: var(--roxo); padding: 14px 0; }
        #aif2 .f2-proof-cap { margin: 22px 0 0; font-size: 15.5px; color: var(--ink-2); line-height: 1.6; } #aif2 .f2-proof-cap b { color: var(--ink); }

        /* cases */
        #aif2 .f2-cases { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        #aif2 .f2-case { background: var(--bg); border: 1px solid var(--line); border-radius: 22px; padding: 18px; }
        #aif2 .f2-case-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 14px; }
        #aif2 .f2-case-logo { height: 24px; width: auto; max-width: 130px; object-fit: contain; } #aif2 .f2-case-logo.is-dark { filter: brightness(0); }
        #aif2 .f2-case-seg { font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--mut); }
        #aif2 .f2-cmp { position: relative; height: 340px; border-radius: 14px; overflow: hidden; background: #eee; user-select: none; }
        #aif2 .f2-cmp-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: top; }
        #aif2 .f2-cmp-after { position: absolute; inset: 0; clip-path: inset(0 0 0 var(--x)); }
        #aif2 .f2-cmp-bar { position: absolute; top: 0; bottom: 0; left: var(--x); width: 2px; background: #fff; box-shadow: 0 0 0 1px rgba(0,0,0,.15); pointer-events: none; }
        #aif2 .f2-cmp-bar i { position: absolute; top: 50%; left: 50%; width: 32px; height: 32px; border-radius: 50%; background: var(--ink); transform: translate(-50%,-50%); box-shadow: 0 6px 16px rgba(0,0,0,.25); }
        #aif2 .f2-cmp-bar i::before { content: "‹ ›"; color: #fff; font-size: 13px; font-weight: 700; position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }
        #aif2 .f2-cmp-tag { position: absolute; top: 12px; font-size: 10.5px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; padding: 5px 10px; border-radius: 999px; background: rgba(22,22,28,.75); color: #fff; pointer-events: none; }
        #aif2 .f2-cmp-tag.l { left: 12px; } #aif2 .f2-cmp-tag.r { right: 12px; background: var(--verde); }
        #aif2 .f2-cmp input[type=range] { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0; cursor: ew-resize; margin: 0; }

        /* controle */
        #aif2 .f2-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        #aif2 .f2-step { background: #fff; border: 1px solid var(--line); border-radius: 20px; padding: 26px 24px; }
        #aif2 .f2-step span { font-size: 12px; font-weight: 700; letter-spacing: .12em; color: var(--roxo-2); }
        #aif2 .f2-step b { display: block; font-size: 19px; letter-spacing: -.02em; margin: 10px 0 8px; }
        #aif2 .f2-step p { margin: 0; color: var(--ink-2); font-size: 14.5px; line-height: 1.55; }

        /* faq */
        #aif2 .f2-faq-item { border-top: 1px solid var(--line); } #aif2 .f2-faq-item:last-child { border-bottom: 1px solid var(--line); }
        #aif2 .f2-faq-q { width: 100%; display: flex; justify-content: space-between; align-items: center; gap: 16px; background: none; border: 0; padding: 22px 0; text-align: left; cursor: pointer; font-family: inherit; color: var(--ink); font-weight: 600; font-size: 17px; }
        #aif2 .f2-faq-q i { width: 30px; height: 30px; border-radius: 50%; border: 1px solid var(--line); display: inline-flex; align-items: center; justify-content: center; transition: transform .25s, background .2s; flex-shrink: 0; }
        #aif2 .f2-faq-item.is-open .f2-faq-q i { transform: rotate(45deg); background: var(--ink); color: #fff; border-color: var(--ink); }
        #aif2 .f2-faq-a { max-height: 0; overflow: hidden; transition: max-height .35s ease; } #aif2 .f2-faq-item.is-open .f2-faq-a { max-height: 320px; }
        #aif2 .f2-faq-a p { margin: 0 0 22px; color: var(--ink-2); font-size: 15.5px; line-height: 1.6; }

        /* final */
        #aif2 .f2-final-wrap { padding: 20px 0 96px; }
        #aif2 .f2-final { display: grid; grid-template-columns: 1fr .85fr; gap: 48px; align-items: center; border-radius: 32px; padding: 56px 48px; color: #fff; background: radial-gradient(70% 90% at 80% 0%, rgba(143,40,246,.6), transparent 60%), radial-gradient(50% 70% at 10% 100%, rgba(57,255,20,.2), transparent 60%), var(--ink); }
        #aif2 .f2-final h2 { margin: 14px 0 0; font-size: clamp(28px, 3.3vw, 40px); }
        #aif2 .f2-final-copy > p { color: rgba(255,255,255,.72); font-size: 16.5px; line-height: 1.6; margin: 16px 0 0; }
        #aif2 .f2-final-list { list-style: none; margin: 22px 0 0; padding: 0; display: grid; gap: 10px; }
        #aif2 .f2-final-list li { display: flex; align-items: center; gap: 10px; font-size: 14.5px; color: rgba(255,255,255,.8); } #aif2 .f2-final-list svg { color: var(--neon); flex-shrink: 0; }

        /* formulário */
        #aif2 .f2-wl { background: #fff; border-radius: 22px; padding: 26px; box-shadow: 0 24px 60px rgba(22,22,28,.18); color: var(--ink); }
        #aif2 .f2-wl-t { font-size: 20px; font-weight: 700; letter-spacing: -.02em; margin: 0 0 6px; }
        #aif2 .f2-wl-s { font-size: 14px; color: var(--mut); margin: 0 0 18px; }
        #aif2 .f2-field { margin-bottom: 13px; }
        #aif2 .f2-field label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px; color: var(--ink-2); }
        #aif2 .f2-opt { font-weight: 400; color: var(--mut); }
        #aif2 .f2-field input, #aif2 .f2-field select { width: 100%; padding: 12px 14px; border: 1px solid var(--line); border-radius: 11px; font-family: inherit; font-size: 15px; color: var(--ink); background: var(--bg); transition: border-color .2s, box-shadow .2s; }
        #aif2 .f2-field input:focus, #aif2 .f2-field select:focus { outline: 0; border-color: var(--roxo); box-shadow: 0 0 0 3px rgba(143,40,246,.14); background: #fff; }
        #aif2 .f2-err { color: #C62828; font-size: 13px; margin: 10px 0 0; }
        #aif2 .f2-wl .f2-micro { margin: 12px 0 0; text-align: center; }
        #aif2 .f2-thanks { text-align: center; padding: 22px 0; }
        #aif2 .f2-thanks-ico { width: 52px; height: 52px; border-radius: 50%; background: var(--lime); color: var(--verde); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
        #aif2 .f2-thanks h3 { font-size: 22px; letter-spacing: -.02em; margin: 0 0 8px; }
        #aif2 .f2-thanks p { color: var(--ink-2); font-size: 15px; line-height: 1.55; margin: 0; }

        @media (max-width: 980px) {
          #aif2 .f2-show, #aif2 .f2-mcp, #aif2 .f2-final { grid-template-columns: 1fr; gap: 28px; }
          #aif2 .f2-ways, #aif2 .f2-ready, #aif2 .f2-agents, #aif2 .f2-cases, #aif2 .f2-steps { grid-template-columns: 1fr; }
          #aif2 .f2-sec { padding: 68px 0; } #aif2 .f2-final { padding: 40px 26px; }
          #aif2 .f2-logos-in { gap: 20px; } #aif2 .f2-logos-div { display: none; } #aif2 .f2-logos-g { width: 100%; }
        }
        @media (max-width: 560px) {
          #aif2 .f2-panel { border-radius: 22px; padding: 18px 14px 0; }
          #aif2 .f2-ptab-lbl { display: none; } #aif2 .f2-ptab { padding: 6px; }
          #aif2 .f2-show { padding: 24px 20px 26px; } #aif2 .f2-cmp { height: 290px; }
        }
        @media (prefers-reduced-motion: reduce) { #aif2 [data-rv] { opacity: 1 !important; transform: none !important; } #aif2 .f2-bub { opacity: 1; animation: none; } #aif2 .f2-show { animation: none; } #aif2 .f2-caret { animation: none; } }
      `}</style>
    </>
  )
}
