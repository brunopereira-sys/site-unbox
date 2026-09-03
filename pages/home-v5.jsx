import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import { URLS } from '../lib/config'

/* ─────────────────────────────────────────────────────────────
   Unbox · Home v5 — "AI Commerce Platform"
   Base visual da v2 (claro, editorial) + posicionamento AI-first:
   CLI (criar do zero / Figma / migrar), MCP (operar por texto),
   agentes, cases antes/depois e peças que se encaixam no scroll.
   Escopo #hv5 / h5-*.
   ───────────────────────────────────────────────────────────── */

const V = '?v=r26'

/* ── 3 caminhos do CLI ─────────────────────────────────────── */
const PATHS = [
  { tint: 'sky', k: 'zero', tag: 'DO ZERO', title: 'Crie com a sua AI',
    body: 'Descreva a marca, o catálogo e o objetivo. O CLI gera um storefront completo — home, catálogo, PDP, carrinho, checkout, assinatura e área do cliente — e abre o Claude Code direto no briefing de marca.',
    cmd: 'npx create-unbox-store', out: ['✓ estilo: editorial · 4 presets', '✓ 18 mil linhas de storefront gerado', '✓ briefing de marca iniciado'] },
  { tint: 'lavender', k: 'figma', tag: 'DO FIGMA', title: 'Importe o seu design',
    body: 'Seu Figma vira loja. A AI lê o layout pelo MCP do Figma, traduz para os componentes da Unbox e mantém tipografia, cores e ritmo — sem recriar nada na mão.',
    cmd: '/import figma.com/design/…', out: ['✓ 12 seções mapeadas', '✓ tokens de cor e fonte aplicados', '✓ home + PDP fiéis ao design'] },
  { tint: 'mint', k: 'migrate', tag: 'DE QUALQUER PLATAFORMA', title: 'Migre de onde estiver',
    body: 'Shopify, Nuvemshop, VTEX, WooCommerce. A AI extrai catálogo, coleções, tema e conteúdo do site atual e remonta tudo na Unbox — preservando SEO, URLs e o que já vende.',
    cmd: '/migrate loja-atual.com.br', out: ['✓ 240 produtos · 18 coleções', '✓ paleta, fontes e menu extraídos', '✓ redirects 301 preservados'] },
]

/* ── peças (scroll) ────────────────────────────────────────── */
const PIECES = [
  { k: 'store', label: 'Storefront', tint: 'sky', icon: 'layout', title: 'Uma loja que nasce por AI.', body: 'Gerada pelo CLI a partir de um prompt, do Figma ou da loja atual. Next.js, mobile-first, 96+ no Lighthouse.' },
  { k: 'ops', label: 'Operação', tint: 'lime', icon: 'bolt', title: 'Operada por texto, via MCP.', body: 'Preço, estoque, cupom, campanha, regra de assinatura. Você pede; a AI lê, prepara e executa com confirmação.' },
  { k: 'agents', label: 'Agentes', tint: 'lavender', icon: 'sparkle', title: 'Agentes que crescem o negócio.', body: 'Branding, CRO, SEO, AEO e Deploy embarcados no projeto. Rodam por você, com o seu julgamento no comando.' },
  { k: 'pay', label: 'Unbox Pay', tint: 'mint', icon: 'card', title: 'Pagamento e capital nativos.', body: '98% de aprovação com antifraude por AI e crédito até R$ 500k amortizado pelas vendas. Sem banco no meio.' },
]

/* ── cases antes/depois ───────────────────────────────────── */
const CASES = [
  { name: 'Oddie Supply', seg: 'Alimentos funcionais', logo: '/img/cases/logo-oddie.webp', before: '/img/cases/case-oddie-antes.jpg', after: '/img/cases/case-oddie-depois.jpg', note: 'Energia e hidratação em pó. A loja inteira foi remontada em torno de um produto só — e de uma jornada de assinatura.' },
  { name: 'Pamela Concept', seg: 'Cuidado capilar', logo: '/img/cases/logo-pamela.png', before: '/img/cases/case-pamela-antes.jpg', after: '/img/cases/case-pamela-depois.jpg', note: 'Cada problema (queda, caspa, brilho) virou um caminho claro dentro da loja, em vez de uma prateleira de frascos.' },
  { name: 'Badia', seg: 'Temperos e especiarias', logo: '/img/cases/logo-badia.svg', before: '/img/cases/case-badia-antes.jpg', after: '/img/cases/case-badia-depois.jpg', note: 'Catálogo enorme. O desafio foi fazer centenas de SKUs virarem uma jornada simples de comprar.' },
]

const AGENTS = ['Branding & Identidade', 'QA Visual', 'CRO (10 módulos)', 'SEO avançado', 'AEO · ser citado pelo ChatGPT', 'Deploy', 'Catálogo', 'Checkout', 'Assinatura', 'Promoções', 'Área do cliente', 'Performance']

const METRICS = [
  { num: 15, prefix: '+', suffix: ' mil', label: 'lojas já cadastradas na Unbox' },
  { num: 5.9, prefix: '+', suffix: '×', label: 'crescimento médio de vendas', decimals: 1 },
  { num: 4, prefix: '', suffix: '×', label: 'mais conversão no seu site' },
  { num: 98, prefix: '', suffix: '%', label: 'de aprovação no Unbox Pay' },
]

const BRANDS = [
  { name: 'Badia', seg: 'Alimentos', logo: '/img/badia-logo.svg' }, { name: 'Sunrize', seg: 'Wellness', logo: '/img/sunrize-logo.png' },
  { name: 'Wish', seg: 'Doces', logo: '/img/wish-logo.png' }, { name: 'Pudim Beauty', seg: 'Cosméticos', logo: '/img/pudim-logo.png' },
  { name: 'Oddie', seg: 'Funcionais' }, { name: 'Pamela Concept', seg: 'Capilar' }, { name: 'Bhava', seg: 'Wellness' }, { name: 'Olea', seg: 'Alimentos' },
  { name: 'Popai', seg: 'Wellness' }, { name: 'Vista Perê', seg: 'Moda' }, { name: 'diCapri', seg: 'Bebidas' }, { name: 'Glow', seg: 'Colágeno' },
]

const FAQ = [
  { q: 'Preciso saber programar para usar o CLI?', a: 'Não. Você responde um briefing em português (marca, cores, objetivo) e a AI gera e personaliza a loja. A parte técnica — Next.js, checkout, deploy — é resolvida pelos agentes embarcados no projeto.' },
  { q: 'A AI vai mexer na minha loja sem eu saber?', a: 'Não. Leituras são diretas; qualquer escrita (preço, cupom, campanha) passa por duas etapas — preparar e confirmar. Tudo fica registrado.' },
  { q: 'Como funciona a migração de Shopify, Nuvemshop ou VTEX?', a: 'A AI lê o catálogo, coleções, tema e conteúdo do seu site atual, remonta tudo na Unbox e preserva URLs e redirects. Nossa equipe acompanha a migração com você.' },
  { q: 'O que é AEO e por que importa?', a: 'Answer Engine Optimization: preparar a loja para ser citada e recomendada por ChatGPT, Claude, Perplexity e AI Overviews. É o agente 17 do projeto gerado — o complemento do SEO.' },
  { q: 'Preciso já ser cliente Unbox?', a: 'Não. A lista de espera do AI Foundry é aberta. Clientes Unbox ativam primeiro, mas quem chega agora entra na frente da fila.' },
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
    case 'figma': return <svg {...p}><path d="M8 3h4a3 3 0 0 1 0 6H8a3 3 0 0 1 0-6ZM8 9h4v6H8a3 3 0 0 1 0-6ZM12 9h1a3 3 0 1 1 0 6h-1zM8 15h4v3a3 3 0 1 1-4-3Z" /></svg>
    case 'migrate': return <svg {...p}><path d="M4 12h12M12 6l6 6-6 6" /><path d="M20 4v16" /></svg>
    default: return null
  }
}

function Logo() {
  return (
    <a href="/" className="h5-logo" aria-label="Unbox">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={'/img/simbolo-unbox.png' + V} alt="" /><span>unbox</span>
    </a>
  )
}

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
  return <div className="h5-metric"><div className="h5-metric-n">{m.prefix}{shown}<span>{m.suffix}</span></div><div className="h5-metric-l">{m.label}</div></div>
}

/* Terminal do hero: digita o comando e "gera" a loja */
const PROMPT = 'npx create-unbox-store'
const STEPS = ['lendo briefing da marca · estilo editorial', 'gerando storefront: home, catálogo, PDP, carrinho', 'checkout TURBO + assinatura nativa', 'abrindo Claude Code no briefing de marca', '✓ loja no ar em preview — sua, sem template']
function HeroTerminal() {
  const [typed, setTyped] = useState('')
  const [lines, setLines] = useState([])
  useEffect(() => {
    let i = 0; const timers = []
    const t = setInterval(() => { i++; setTyped(PROMPT.slice(0, i)); if (i >= PROMPT.length) { clearInterval(t); STEPS.forEach((s, j) => timers.push(setTimeout(() => setLines((l) => [...l, s]), 500 + j * 650))) } }, 45)
    return () => { clearInterval(t); timers.forEach(clearTimeout) }
  }, [])
  return (
    <div className="h5-term">
      <div className="h5-term-head"><i /><i /><i /><span>unbox · cli</span></div>
      <div className="h5-term-body">
        <div className="h5-term-cmd"><span>$</span> {typed}<b className="h5-caret" /></div>
        {lines.map((l, i) => <div className={'h5-term-line' + (l.startsWith('✓') ? ' ok' : '')} key={i}>{l.startsWith('✓') ? l : '→ ' + l}</div>)}
      </div>
    </div>
  )
}

/* Peças que se encaixam no scroll (ref. HubSpot, mas dirigido pelo scroll) */
function Pieces() {
  const wrap = useRef(null)
  const [p, setP] = useState(0)
  useEffect(() => {
    let raf
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => {
      const el = wrap.current; if (!el) return
      const r = el.getBoundingClientRect(); const total = el.offsetHeight - window.innerHeight
      const q = new URLSearchParams(window.location.search).get('p') // override p/ preview
      const k = q !== null ? Math.min(1, Math.max(0, Number(q))) : Math.min(1, Math.max(0, -r.top / Math.max(1, total))); setP(k)
    }) }
    on(); window.addEventListener('scroll', on, { passive: true }); window.addEventListener('resize', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); cancelAnimationFrame(raf) }
  }, [])
  const stage = Math.min(PIECES.length - 1, Math.floor(p * PIECES.length))
  const ease = (x) => 1 - Math.pow(1 - x, 3)
  return (
    <section className="h5-pieces" ref={wrap} id="pecas">
      <div className="h5-pieces-sticky">
        <div className="h5-wrap h5-pieces-grid">
          <div className="h5-pieces-copy">
            <span className="h5-eye">A PLATAFORMA</span>
            <h2>Peças que se encaixam.<br />Do zero à venda.</h2>
            <div className="h5-pieces-steps">
              {PIECES.map((pc, i) => (
                <div className={'h5-pstep' + (i === stage ? ' is-on' : i < stage ? ' is-done' : '')} key={pc.k}>
                  <span className={'h5-pstep-ico tint-' + pc.tint}><Icon name={pc.icon} size={16} /></span>
                  <div><b>{pc.title}</b><p>{pc.body}</p></div>
                </div>
              ))}
            </div>
            <p className="h5-pieces-hint">Role para montar a plataforma ↓</p>
          </div>
          <div className="h5-stage" aria-hidden="true">
            {PIECES.map((pc, i) => {
              const local = Math.min(1, Math.max(0, (p * PIECES.length - i)))
              const e = ease(local)
              const x = 118 * i * e, y = -30 * i * e, z = -i * 40 * (1 - e)
              return (
                <div className={'h5-piece tint-' + pc.tint + (i <= stage ? ' is-in' : '')} key={pc.k}
                  style={{ transform: `translate3d(${x}px, ${y}px, ${z}px) rotateY(-22deg) rotateX(8deg)`, opacity: i === 0 ? 1 : 0.15 + 0.85 * e, zIndex: 10 - i }}>
                  <span className="h5-piece-ico"><Icon name={pc.icon} size={20} /></span>
                  <span className="h5-piece-lbl">{pc.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

/* Antes/depois com divisor arrastável */
function Compare({ c }) {
  const [x, setX] = useState(50)
  return (
    <div className="h5-case">
      <div className="h5-case-head">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={c.logo} alt={c.name} className="h5-case-logo" />
        <span className="h5-case-seg">{c.seg}</span>
      </div>
      <div className="h5-cmp" style={{ '--x': x + '%' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={c.before} alt={`${c.name} antes`} className="h5-cmp-img" />
        <div className="h5-cmp-after">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={c.after} alt={`${c.name} depois`} className="h5-cmp-img" />
        </div>
        <div className="h5-cmp-bar"><i /></div>
        <span className="h5-cmp-tag l">Antes</span><span className="h5-cmp-tag r">Depois · Unbox</span>
        <input type="range" min="2" max="98" value={x} onChange={(e) => setX(Number(e.target.value))} aria-label="Comparar antes e depois" />
      </div>
      <p className="h5-case-note">{c.note}</p>
    </div>
  )
}

export default function HomeV5() {
  const [faq, setFaq] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)
  const [metricsOn, setMetricsOn] = useState(false)
  const metricsRef = useRef(null)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8)
    on(); window.addEventListener('scroll', on, { passive: true })
    // hooks de preview (headless): ?only=<id> isola uma seção; ?rv=1 força o reveal
    const qs = new URLSearchParams(window.location.search)
    const only = qs.get('only')
    if (only) {
      const root = document.getElementById('hv5')
      Array.from(root.children).forEach((el) => { if (el.id !== only && !el.classList.contains('h5-nav')) el.style.display = 'none' })
    }
    if (qs.get('rv') || only) document.querySelectorAll('#hv5 [data-rv]').forEach((el) => el.classList.add('h5-in'))
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => {
    const els = document.querySelectorAll('#hv5 [data-rv]')
    if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('h5-in')); setMetricsOn(true); return }
    const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('h5-in'); io.unobserve(en.target) } }), { threshold: 0.12 })
    els.forEach((e) => io.observe(e))
    let mo
    if (metricsRef.current) { mo = new IntersectionObserver((es) => { if (es[0].isIntersecting) { setMetricsOn(true); mo.disconnect() } }, { threshold: 0.2 }); mo.observe(metricsRef.current) }
    const fb = setTimeout(() => setMetricsOn(true), 1800)
    return () => { io.disconnect(); mo && mo.disconnect(); clearTimeout(fb) }
  }, [])

  return (
    <>
      <Head>
        <title>Unbox — A plataforma de AI Commerce para marcas D2C</title>
        <meta name="description" content="Crie sua loja com a sua AI, importe do Figma ou migre de qualquer plataforma. Opere por texto via MCP. Agentes que crescem o negócio. Unbox: AI Commerce Platform." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </Head>

      <div id="hv5">
        <a className="h5-announce" href="/ai-unbox"><span className="h5-announce-dot" /> Unbox AI Foundry: lista de espera aberta · vagas por lote. <b>Entrar na lista →</b></a>

        <header className={'h5-nav' + (scrolled ? ' is-scrolled' : '')}>
          <div className="h5-wrap h5-nav-in">
            <Logo />
            <nav className="h5-links"><a href="/recursos">Plataforma</a><a href="#cli">CLI</a><a href="#mcp">MCP</a><a href="#cases">Cases</a><a href="/credito">Unbox Pay</a></nav>
            <div className="h5-nav-cta">
              <a href={URLS.login} className="h5-btn h5-btn-ghost">Login</a>
              <a href="/ai-unbox" className="h5-btn h5-btn-dark">Criar minha loja com AI</a>
              <button className="h5-burger" aria-label="Menu" onClick={() => setMenu((v) => !v)}><span /><span /><span /></button>
            </div>
          </div>
          {menu && <div className="h5-sheet"><a href="/recursos">Plataforma</a><a href="#cli">CLI</a><a href="#mcp">MCP</a><a href="#cases">Cases</a><a href="/ai-unbox" className="h5-btn h5-btn-dark">Criar minha loja com AI</a></div>}
        </header>

        {/* HERO */}
        <section className="h5-hero">
          <div className="h5-wrap h5-hero-grid">
            <div className="h5-hero-copy" data-rv>
              <span className="h5-eye"><i className="h5-dot" />AI COMMERCE PLATFORM</span>
              <h1>Sua AI cria a loja.<br />A Unbox faz a venda.</h1>
              <p className="h5-lead">
                A primeira plataforma de e-commerce D2C feita para ser operada por AI. Crie do zero, importe do Figma
                ou migre de qualquer plataforma — e depois opere tudo por texto: preço, cupom, campanha, assinatura.
              </p>
              <div className="h5-cta-row">
                <a href="/ai-unbox" className="h5-btn h5-btn-dark h5-btn-lg">Criar minha loja com AI</a>
                <a href={URLS.demo} className="h5-btn h5-btn-white h5-btn-lg">Agendar demo</a>
              </div>
              <p className="h5-micro">Funciona com Claude, ChatGPT, Cursor e qualquer AI com MCP · Sem taxa de setup</p>
            </div>
            <div className="h5-hero-visual" data-rv>
              <div className="h5-term-frame"><HeroTerminal /></div>
              <div className="h5-glow gp" /><div className="h5-glow gg" />
            </div>
          </div>
        </section>

        {/* BRANDS */}
        <section className="h5-brands" data-rv>
          <p className="h5-brands-l">Marcas que já vendem todo dia com a Unbox</p>
          <div className="h5-marquee"><div className="h5-marquee-track">
            {[...BRANDS, ...BRANDS].map((b, i) => <span className="h5-brand" key={i}>{b.logo ? /* eslint-disable-next-line @next/next/no-img-element */ <img src={b.logo} alt={b.name} /> : <b>{b.name}</b>}<em>{b.seg}</em></span>)}
          </div></div>
        </section>

        {/* CLI — 3 caminhos */}
        <section className="h5-sec" id="cli">
          <div className="h5-wrap">
            <div className="h5-head center" data-rv>
              <span className="h5-eye"><i className="h5-dot" />UNBOX CLI</span>
              <h2>Três caminhos. Uma loja no ar.</h2>
              <p>O <code>create-unbox-store</code> gera um storefront completo e abre a sua AI direto no briefing de marca. Você escolhe por onde começar.</p>
            </div>
            <div className="h5-paths">
              {PATHS.map((pt, i) => (
                <div className={'h5-path tint-' + pt.tint} data-rv style={{ transitionDelay: `${i * 80}ms` }} key={pt.k}>
                  <span className="h5-path-tag">{pt.tag}</span>
                  <h3>{pt.title}</h3>
                  <p>{pt.body}</p>
                  <div className="h5-mini-term">
                    <div className="h5-mini-cmd"><span>$</span> {pt.cmd}</div>
                    {pt.out.map((o) => <div className="h5-mini-out" key={o}>{o}</div>)}
                  </div>
                </div>
              ))}
            </div>
            <div className="h5-recent" data-rv>
              <span className="h5-recent-dot" />
              <b>Recém-saído do CLI:</b> Oddie Supply, Pamela Concept e Badia — três marcas, três categorias, remontadas por AI e vendendo hoje.
              <a href="#cases" className="h5-textlink">Ver antes e depois <Icon name="arrow" size={15} /></a>
            </div>
          </div>
        </section>

        {/* PEÇAS (scroll) */}
        <Pieces />

        {/* MCP — operar por texto */}
        <section className="h5-sec h5-sec-alt" id="mcp">
          <div className="h5-wrap h5-split">
            <div className="h5-split-copy">
              <span className="h5-eye"><i className="h5-dot" />UNBOX MCP</span>
              <h2 data-rv>Sua operação por texto. Em qualquer AI.</h2>
              <p className="h5-sub" data-rv>O servidor MCP da Unbox conecta a sua AI à loja: catálogo, pedidos, campanhas, assinaturas. Leituras diretas; escritas em duas etapas — preparar e confirmar. Nada irreversível sem você.</p>
              <ul className="h5-list" data-rv>
                <li><Icon name="terminal" /><div><b>Funciona com a AI que você já usa</b><span>Claude, ChatGPT, Cursor, Claude Code — qualquer cliente MCP.</span></div></li>
                <li><Icon name="check" /><div><b>Confirmação em duas etapas</b><span>A AI monta o plano; você aprova; ela executa. Tudo registrado.</span></div></li>
                <li><Icon name="sparkle" /><div><b>Conhecimento embutido</b><span>Busca semântica na documentação: a AI aprende a Unbox sozinha.</span></div></li>
              </ul>
              <a href="/ai" className="h5-textlink" data-rv>Ver demo do MCP <Icon name="arrow" size={16} /></a>
            </div>
            <div data-rv>
              <div className="h5-chat tint-lime">
                <div className="h5-chat-in">
                  <div className="h5-chat-head"><span className="h5-dot" /><span>você · Unbox MCP</span></div>
                  <div className="h5-bub u">cria o cupom BRUNINHO10, 10% de desconto</div>
                  <div className="h5-bub a"><Icon name="check" size={14} /> Plano: cupom <b>BRUNINHO10</b>, 10%, sem limite. Confirmar?</div>
                  <div className="h5-bub u">confirma</div>
                  <div className="h5-bub a ok"><Icon name="check" size={14} /> Criado, ativado e publicado na Badia.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AGENTES */}
        <section className="h5-sec" id="agentes">
          <div className="h5-wrap h5-split h5-split-rev">
            <div data-rv>
              <div className="h5-agents tint-lavender">
                {AGENTS.map((a, i) => <span className={'h5-agent' + (i < 6 ? ' is-hot' : '')} key={a}><Icon name={i < 6 ? 'sparkle' : 'check'} size={13} />{a}</span>)}
              </div>
            </div>
            <div className="h5-split-copy">
              <span className="h5-eye"><i className="h5-dot" />AGENTES</span>
              <h2 data-rv>Um time de agentes dentro do projeto.</h2>
              <p className="h5-sub" data-rv>Toda loja gerada pelo CLI vem com agentes prontos: branding, QA visual, CRO, SEO, AEO e deploy. Você roda quando quiser, na ordem que fizer sentido — e o seu julgamento continua no comando.</p>
              <ul className="h5-list" data-rv>
                <li><Icon name="sparkle" /><div><b>AEO — pronta para ser recomendada</b><span>Sua loja citada por ChatGPT, Claude, Perplexity e AI Overviews. O complemento do SEO.</span></div></li>
                <li><Icon name="check" /><div><b>QA Visual como gate de "pronto"</b><span>Todo frame visto e avaliado — desktop e mobile — antes de publicar.</span></div></li>
              </ul>
            </div>
          </div>
        </section>

        {/* CASES */}
        <section className="h5-sec h5-sec-alt" id="cases">
          <div className="h5-wrap">
            <div className="h5-head center" data-rv>
              <span className="h5-eye"><i className="h5-dot" />ANTES E DEPOIS</span>
              <h2>Três marcas no ar. Três categorias. A mesma virada.</h2>
              <p>Todas remontadas com a Unbox por AI e vendendo hoje. Arraste para comparar como a loja era e como ficou.</p>
            </div>
            <div className="h5-cases" data-rv>{CASES.map((c) => <Compare c={c} key={c.name} />)}</div>
          </div>
        </section>

        {/* METRICS */}
        <section className="h5-sec h5-sec-tight" ref={metricsRef} id="numeros">
          <div className="h5-wrap h5-metrics-grid" data-rv>{METRICS.map((m) => <Metric key={m.label} m={m} run={metricsOn} />)}</div>
        </section>

        {/* FAQ */}
        <section className="h5-sec" id="faq">
          <div className="h5-wrap h5-narrow">
            <div className="h5-head" data-rv><span className="h5-eye"><i className="h5-dot" />DÚVIDAS</span><h2>Tudo que você precisa saber.</h2></div>
            <div className="h5-faq" data-rv>
              {FAQ.map((f, i) => (
                <div className={'h5-faq-item' + (faq === i ? ' is-open' : '')} key={i}>
                  <button className="h5-faq-q" onClick={() => setFaq(faq === i ? -1 : i)}><span>{f.q}</span><i><Icon name="plus" size={16} /></i></button>
                  <div className="h5-faq-a"><p>{f.a}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL */}
        <section className="h5-sec h5-final-wrap" id="final">
          <div className="h5-wrap">
            <div className="h5-final" data-rv>
              <h2>Sua AI cria. A Unbox vende.</h2>
              <p>Entre na lista de espera do AI Foundry ou fale com a gente. Sem custo, sem compromisso.</p>
              <div className="h5-cta-row"><a href="/ai-unbox" className="h5-btn h5-btn-white h5-btn-lg">Criar minha loja com AI</a><a href={URLS.demo} className="h5-btn h5-btn-ghost-light h5-btn-lg">Agendar demo</a></div>
            </div>
          </div>
        </section>

        <footer className="h5-footer">
          <div className="h5-wrap h5-footer-grid">
            <div className="h5-footer-brand"><Logo /><p>A plataforma de AI Commerce para marcas D2C.</p></div>
            <div><h4>Plataforma</h4><a href="/recursos">Recursos</a><a href="/checkout">Turbo Checkout</a><a href="/assinatura">Assinatura</a><a href="/credito">Unbox Pay</a></div>
            <div><h4>AI</h4><a href="/ai-unbox">AI Foundry</a><a href="#cli">CLI</a><a href="#mcp">MCP</a><a href="/ai">Demo</a></div>
            <div><h4>Empresa</h4><a href="/blog">Blog</a><a href="/carreiras">Carreiras</a><a href={URLS.whatsapp}>Contato</a></div>
          </div>
          <div className="h5-wrap h5-footer-bottom">© {new Date().getFullYear()} Unbox. Todos os direitos reservados.</div>
        </footer>
      </div>

      <style jsx global>{`
        html, body { margin: 0; background: #FBFAF6; }
        #hv5 {
          --bg: #FBFAF6; --ink: #16161C; --ink-2: #4A4A55; --mut: #7A7A86; --line: rgba(22,22,28,.09);
          --roxo: #8F28F6; --roxo-2: #5612AB; --verde: #1FBF5A;
          --sky: #E6F0FF; --sky-2: #C3DFFE; --lime: #F1FBDF; --lime-2: #DBEE9F; --lavender: #EEE6FF; --lavender-2: #D4C2FF; --mint: #E4FAF3; --mint-2: #BAF0EC;
          --mono: 'JetBrains Mono', ui-monospace, Menlo, monospace;
          font-family: 'Sora', system-ui, -apple-system, sans-serif; color: var(--ink); background: var(--bg); -webkit-font-smoothing: antialiased; line-height: 1.5; overflow-x: hidden;
        }
        #hv5 *, #hv5 *::before, #hv5 *::after { box-sizing: border-box; }
        #hv5 a { color: inherit; text-decoration: none; }
        #hv5 code { font-family: var(--mono); font-size: .92em; background: rgba(22,22,28,.06); padding: 2px 6px; border-radius: 6px; }
        #hv5 .h5-wrap { max-width: 1180px; margin: 0 auto; padding: 0 24px; }
        #hv5 .h5-narrow { max-width: 820px; }
        #hv5 [data-rv] { opacity: 0; transform: translateY(16px); transition: opacity .7s ease, transform .7s cubic-bezier(.2,.7,.2,1); }
        #hv5 [data-rv].h5-in { opacity: 1; transform: none; }
        #hv5 .tint-sky { --t: var(--sky); --t2: var(--sky-2); } #hv5 .tint-lime { --t: var(--lime); --t2: var(--lime-2); }
        #hv5 .tint-lavender { --t: var(--lavender); --t2: var(--lavender-2); } #hv5 .tint-mint { --t: var(--mint); --t2: var(--mint-2); }

        #hv5 .h5-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; font-weight: 600; font-size: 15px; border-radius: 12px; padding: 12px 20px; border: 1px solid transparent; transition: transform .15s ease, box-shadow .2s, background .2s, border-color .2s; white-space: nowrap; cursor: pointer; font-family: inherit; }
        #hv5 .h5-btn-lg { padding: 16px 26px; font-size: 16px; border-radius: 14px; }
        #hv5 .h5-btn-dark { background: var(--ink); color: #fff; } #hv5 .h5-btn-dark:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(22,22,28,.22); }
        #hv5 .h5-btn-white { background: #fff; color: var(--ink); border-color: var(--line); } #hv5 .h5-btn-white:hover { border-color: rgba(22,22,28,.25); transform: translateY(-2px); }
        #hv5 .h5-btn-ghost { background: transparent; color: var(--ink); } #hv5 .h5-btn-ghost:hover { background: rgba(22,22,28,.05); }
        #hv5 .h5-btn-ghost-light { background: rgba(255,255,255,.12); color: #fff; border-color: rgba(255,255,255,.28); }
        #hv5 .h5-textlink { display: inline-flex; align-items: center; gap: 6px; font-weight: 600; color: var(--roxo-2); } #hv5 .h5-textlink:hover { gap: 10px; }
        #hv5 .h5-eye { display: inline-flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 700; letter-spacing: .18em; color: var(--roxo-2); }
        #hv5 .h5-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--verde); box-shadow: 0 0 0 3px rgba(31,191,90,.18); }

        #hv5 .h5-announce { display: flex; align-items: center; justify-content: center; gap: 8px; background: var(--lavender); font-size: 13.5px; padding: 9px 16px; text-align: center; }
        #hv5 .h5-announce b { font-weight: 600; color: var(--roxo-2); }
        #hv5 .h5-announce-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--roxo); box-shadow: 0 0 0 3px rgba(143,40,246,.18); }
        #hv5 .h5-nav { position: sticky; top: 0; z-index: 50; background: rgba(251,250,246,.86); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border-bottom: 1px solid transparent; transition: border-color .2s, box-shadow .2s; }
        #hv5 .h5-nav.is-scrolled { border-bottom-color: var(--line); box-shadow: 0 6px 24px rgba(22,22,28,.05); }
        #hv5 .h5-nav-in { display: flex; align-items: center; justify-content: space-between; height: 72px; gap: 24px; }
        #hv5 .h5-logo { display: inline-flex; align-items: center; gap: 8px; font-weight: 700; font-size: 24px; letter-spacing: -.03em; color: var(--ink); }
        #hv5 .h5-logo img { width: 30px; height: 30px; object-fit: contain; }
        #hv5 .h5-links { display: flex; gap: 26px; font-weight: 500; font-size: 15px; color: var(--ink-2); } #hv5 .h5-links a:hover { color: var(--ink); }
        #hv5 .h5-nav-cta { display: flex; align-items: center; gap: 8px; }
        #hv5 .h5-burger { display: none; width: 40px; height: 40px; border: 1px solid var(--line); border-radius: 10px; background: #fff; flex-direction: column; justify-content: center; gap: 4px; align-items: center; cursor: pointer; }
        #hv5 .h5-burger span { width: 16px; height: 2px; background: var(--ink); border-radius: 2px; }
        #hv5 .h5-sheet { display: flex; flex-direction: column; gap: 6px; padding: 12px 24px 20px; border-top: 1px solid var(--line); background: var(--bg); } #hv5 .h5-sheet a { padding: 10px 0; font-weight: 500; }

        /* hero */
        #hv5 .h5-hero { padding: 72px 0 32px; }
        #hv5 .h5-hero-grid { display: grid; grid-template-columns: 1.05fr .95fr; gap: 56px; align-items: center; }
        #hv5 h1 { font-size: clamp(38px, 5.6vw, 66px); font-weight: 700; letter-spacing: -.04em; line-height: 1.02; margin: 22px 0 20px; }
        #hv5 .h5-lead { font-size: clamp(16px, 1.5vw, 19px); color: var(--ink-2); line-height: 1.58; max-width: 560px; margin: 0; }
        #hv5 .h5-cta-row { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 28px; }
        #hv5 .h5-micro { font-size: 13px; color: var(--mut); margin-top: 14px; }
        #hv5 .h5-hero-visual { position: relative; }
        #hv5 .h5-glow { position: absolute; border-radius: 50%; filter: blur(60px); z-index: 0; }
        #hv5 .h5-glow.gp { width: 260px; height: 260px; background: rgba(143,40,246,.22); top: -40px; right: -30px; }
        #hv5 .h5-glow.gg { width: 200px; height: 200px; background: rgba(57,255,20,.14); bottom: -30px; left: -10px; }
        #hv5 .h5-term-frame { position: relative; z-index: 1; border-radius: 22px; padding: 14px; background: linear-gradient(160deg, var(--lavender), var(--sky)); }
        #hv5 .h5-term { background: #0D0D12; border-radius: 14px; color: #E8E8EE; font-family: var(--mono); font-size: 13.5px; box-shadow: 0 30px 60px rgba(22,22,28,.25); overflow: hidden; }
        #hv5 .h5-term-head { display: flex; align-items: center; gap: 6px; padding: 12px 14px; border-bottom: 1px solid rgba(255,255,255,.08); }
        #hv5 .h5-term-head i { width: 10px; height: 10px; border-radius: 50%; background: #3a3a44; } #hv5 .h5-term-head span { margin-left: 8px; color: #7d7d8a; font-size: 12px; }
        #hv5 .h5-term-body { padding: 18px 18px 22px; min-height: 250px; }
        #hv5 .h5-term-cmd { color: #fff; font-size: 15px; } #hv5 .h5-term-cmd span { color: #39FF14; margin-right: 6px; }
        #hv5 .h5-caret { display: inline-block; width: 8px; height: 15px; background: #39FF14; margin-left: 3px; vertical-align: middle; animation: h5blink 1s steps(2) infinite; }
        @keyframes h5blink { 50% { opacity: 0; } }
        #hv5 .h5-term-line { color: #a6a6b3; line-height: 2; animation: h5rise .35s ease; } #hv5 .h5-term-line.ok { color: #39FF14; }
        @keyframes h5rise { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }

        /* brands */
        #hv5 .h5-brands { padding: 56px 0 8px; text-align: center; }
        #hv5 .h5-brands-l { font-size: 13px; color: var(--mut); margin: 0 0 22px; }
        #hv5 .h5-marquee { overflow: hidden; -webkit-mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); }
        #hv5 .h5-marquee-track { display: flex; gap: 56px; width: max-content; animation: h5marq 40s linear infinite; } #hv5 .h5-marquee:hover .h5-marquee-track { animation-play-state: paused; }
        @keyframes h5marq { to { transform: translateX(-50%); } }
        #hv5 .h5-brand { display: inline-flex; flex-direction: column; align-items: center; gap: 4px; color: var(--ink-2); }
        #hv5 .h5-brand img { height: 26px; width: auto; filter: brightness(0) opacity(.75); } #hv5 .h5-brand b { font-weight: 700; font-size: 20px; letter-spacing: -.02em; opacity: .8; } #hv5 .h5-brand em { font-style: normal; font-size: 11px; color: var(--mut); }

        /* sections */
        #hv5 .h5-sec { padding: 100px 0; } #hv5 .h5-sec-tight { padding: 40px 0 80px; }
        #hv5 .h5-sec-alt { background: #fff; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
        #hv5 .h5-head { max-width: 760px; margin-bottom: 48px; } #hv5 .h5-head.center { margin-left: auto; margin-right: auto; text-align: center; }
        #hv5 h2 { font-size: clamp(30px, 4.1vw, 50px); font-weight: 700; letter-spacing: -.04em; line-height: 1.06; margin: 14px 0 0; }
        #hv5 .h5-head p, #hv5 .h5-sub { color: var(--ink-2); font-size: 17px; line-height: 1.6; margin: 18px 0 0; }

        /* paths */
        #hv5 .h5-paths { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        #hv5 .h5-path { background: #fff; border: 1px solid var(--line); border-radius: 22px; padding: 26px; display: flex; flex-direction: column; transition: transform .2s, box-shadow .2s; }
        #hv5 .h5-path:hover { transform: translateY(-4px); box-shadow: 0 18px 40px rgba(22,22,28,.08); }
        #hv5 .h5-path-tag { align-self: flex-start; font-size: 11px; font-weight: 700; letter-spacing: .16em; color: var(--ink); background: var(--t); border-radius: 8px; padding: 5px 10px; }
        #hv5 .h5-path h3 { font-size: 23px; font-weight: 700; letter-spacing: -.025em; margin: 16px 0 8px; }
        #hv5 .h5-path p { color: var(--ink-2); font-size: 14.5px; line-height: 1.58; margin: 0 0 18px; flex: 1; }
        #hv5 .h5-mini-term { background: #0D0D12; border-radius: 12px; padding: 14px 16px; font-family: var(--mono); font-size: 12.5px; color: #a6a6b3; }
        #hv5 .h5-mini-cmd { color: #fff; margin-bottom: 8px; } #hv5 .h5-mini-cmd span { color: #39FF14; margin-right: 6px; }
        #hv5 .h5-mini-out { line-height: 1.8; }
        #hv5 .h5-recent { margin-top: 26px; display: flex; align-items: center; gap: 12px; flex-wrap: wrap; background: var(--lime); border-radius: 14px; padding: 14px 18px; font-size: 15px; color: var(--ink-2); }
        #hv5 .h5-recent b { color: var(--ink); } #hv5 .h5-recent-dot { width: 9px; height: 9px; border-radius: 50%; background: var(--verde); box-shadow: 0 0 0 4px rgba(31,191,90,.18); }

        /* pieces (scroll) */
        #hv5 .h5-pieces { position: relative; height: 320vh; background: #fff; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
        #hv5 .h5-pieces-sticky { position: sticky; top: 0; height: 100vh; display: flex; align-items: center; overflow: hidden; }
        #hv5 .h5-pieces-grid { display: grid; grid-template-columns: .9fr 1.1fr; gap: 48px; align-items: center; width: 100%; }
        #hv5 .h5-pieces-steps { margin-top: 30px; display: grid; gap: 6px; }
        #hv5 .h5-pstep { display: flex; gap: 14px; padding: 14px 16px; border-radius: 14px; opacity: .38; transition: opacity .3s, background .3s; }
        #hv5 .h5-pstep.is-done { opacity: .7; } #hv5 .h5-pstep.is-on { opacity: 1; background: var(--bg); }
        #hv5 .h5-pstep-ico { width: 34px; height: 34px; border-radius: 10px; background: var(--t); display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
        #hv5 .h5-pstep b { display: block; font-size: 16.5px; font-weight: 600; } #hv5 .h5-pstep p { margin: 4px 0 0; font-size: 14px; color: var(--ink-2); line-height: 1.5; }
        #hv5 .h5-pieces-hint { margin-top: 18px; font-size: 13px; color: var(--mut); }
        #hv5 .h5-stage { position: relative; height: 460px; perspective: 1400px; transform-style: preserve-3d; padding-left: 20px; }
        #hv5 .h5-piece { position: absolute; left: 0; top: 70px; width: 270px; height: 300px; border-radius: 22px; background: linear-gradient(160deg, var(--t2), var(--t)); border: 1px solid rgba(255,255,255,.7); box-shadow: 0 30px 60px rgba(22,22,28,.16), inset 0 1px 0 rgba(255,255,255,.8); transform-style: preserve-3d; transition: opacity .3s; display: flex; flex-direction: column; justify-content: space-between; padding: 22px; }
        #hv5 .h5-piece-ico { width: 44px; height: 44px; border-radius: 12px; background: #fff; display: inline-flex; align-items: center; justify-content: center; color: var(--ink); box-shadow: 0 6px 16px rgba(22,22,28,.1); }
        #hv5 .h5-piece-lbl { font-size: 17px; font-weight: 700; letter-spacing: -.02em; }

        /* split, list, chat, agents */
        #hv5 .h5-split { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; }
        #hv5 .h5-split-rev > :first-child { order: 0; } #hv5 .h5-split-rev .h5-split-copy { order: 1; }
        #hv5 .h5-split-copy h2 { font-size: clamp(28px, 3.4vw, 42px); margin-top: 16px; }
        #hv5 .h5-list { list-style: none; margin: 26px 0 0; padding: 0; }
        #hv5 .h5-list li { display: flex; gap: 14px; padding: 16px 0; border-top: 1px solid var(--line); } #hv5 .h5-list li:last-child { border-bottom: 1px solid var(--line); }
        #hv5 .h5-list li svg { color: var(--roxo-2); flex-shrink: 0; margin-top: 2px; }
        #hv5 .h5-list b { display: block; font-weight: 600; font-size: 16px; } #hv5 .h5-list span { color: var(--ink-2); font-size: 14.5px; line-height: 1.5; }
        #hv5 .h5-split-copy .h5-textlink { margin-top: 24px; }
        #hv5 .h5-chat { border-radius: 26px; background: var(--t); padding: 30px; }
        #hv5 .h5-chat-in { background: #fff; border-radius: 18px; padding: 18px; box-shadow: 0 20px 50px rgba(22,22,28,.12); display: grid; gap: 10px; }
        #hv5 .h5-chat-head { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--mut); padding-bottom: 10px; border-bottom: 1px solid var(--line); }
        #hv5 .h5-bub { max-width: 86%; padding: 11px 14px; border-radius: 14px; font-size: 14.5px; line-height: 1.4; opacity: 0; transform: translateY(6px); animation: h5bub .45s ease forwards; }
        #hv5 .h5-bub.u { margin-left: auto; background: var(--ink); color: #fff; border-bottom-right-radius: 4px; }
        #hv5 .h5-bub.a { background: var(--sky); color: var(--ink); border-bottom-left-radius: 4px; display: inline-flex; align-items: center; gap: 6px; }
        #hv5 .h5-bub.a.ok { background: var(--lime); } #hv5 .h5-bub.a svg { color: var(--verde); }
        #hv5 .h5-bub:nth-child(2){animation-delay:.2s} #hv5 .h5-bub:nth-child(3){animation-delay:.8s} #hv5 .h5-bub:nth-child(4){animation-delay:1.5s} #hv5 .h5-bub:nth-child(5){animation-delay:2.1s}
        @keyframes h5bub { to { opacity: 1; transform: none; } }
        #hv5 .h5-agents { border-radius: 26px; background: var(--t); padding: 30px; display: flex; flex-wrap: wrap; gap: 10px; align-content: center; min-height: 380px; }
        #hv5 .h5-agent { display: inline-flex; align-items: center; gap: 7px; background: #fff; border: 1px solid var(--line); border-radius: 999px; padding: 9px 14px; font-size: 14px; font-weight: 500; color: var(--ink-2); }
        #hv5 .h5-agent.is-hot { color: var(--ink); border-color: rgba(143,40,246,.35); } #hv5 .h5-agent svg { color: var(--roxo-2); }

        /* cases */
        #hv5 .h5-cases { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        #hv5 .h5-case { background: var(--bg); border: 1px solid var(--line); border-radius: 22px; padding: 18px; }
        #hv5 .h5-case-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 14px; }
        #hv5 .h5-case-logo { height: 26px; width: auto; max-width: 140px; object-fit: contain; }
        #hv5 .h5-case-seg { font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--mut); }
        #hv5 .h5-cmp { position: relative; height: 360px; border-radius: 14px; overflow: hidden; background: #eee; user-select: none; }
        #hv5 .h5-cmp-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: top; }
        #hv5 .h5-cmp-after { position: absolute; inset: 0; clip-path: inset(0 0 0 var(--x)); }
        #hv5 .h5-cmp-bar { position: absolute; top: 0; bottom: 0; left: var(--x); width: 2px; background: #fff; box-shadow: 0 0 0 1px rgba(0,0,0,.15); pointer-events: none; }
        #hv5 .h5-cmp-bar i { position: absolute; top: 50%; left: 50%; width: 34px; height: 34px; border-radius: 50%; background: var(--ink); transform: translate(-50%,-50%); box-shadow: 0 6px 16px rgba(0,0,0,.25); }
        #hv5 .h5-cmp-bar i::before { content: "‹ ›"; color: #fff; font-size: 14px; font-weight: 700; position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; letter-spacing: 1px; }
        #hv5 .h5-cmp-tag { position: absolute; top: 12px; font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; padding: 5px 10px; border-radius: 999px; background: rgba(22,22,28,.75); color: #fff; pointer-events: none; }
        #hv5 .h5-cmp-tag.l { left: 12px; } #hv5 .h5-cmp-tag.r { right: 12px; background: var(--verde); }
        #hv5 .h5-cmp input[type=range] { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0; cursor: ew-resize; margin: 0; }
        #hv5 .h5-case-note { margin: 14px 0 0; font-size: 14px; color: var(--ink-2); line-height: 1.55; }

        /* metrics, faq, final, footer */
        #hv5 .h5-metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        #hv5 .h5-metric { background: #fff; border: 1px solid var(--line); border-radius: 20px; padding: 26px 24px; }
        #hv5 .h5-metric-n { font-size: clamp(34px, 3.6vw, 46px); font-weight: 700; letter-spacing: -.04em; line-height: 1; } #hv5 .h5-metric-n span { font-size: .6em; color: var(--roxo); margin-left: 2px; }
        #hv5 .h5-metric-l { color: var(--mut); font-size: 14px; margin-top: 10px; }
        #hv5 .h5-faq-item { border-top: 1px solid var(--line); } #hv5 .h5-faq-item:last-child { border-bottom: 1px solid var(--line); }
        #hv5 .h5-faq-q { width: 100%; display: flex; justify-content: space-between; align-items: center; gap: 16px; background: none; border: 0; padding: 22px 0; text-align: left; cursor: pointer; font-family: inherit; color: var(--ink); font-weight: 600; font-size: 17px; }
        #hv5 .h5-faq-q i { width: 30px; height: 30px; border-radius: 50%; border: 1px solid var(--line); display: inline-flex; align-items: center; justify-content: center; transition: transform .25s, background .2s; flex-shrink: 0; }
        #hv5 .h5-faq-item.is-open .h5-faq-q i { transform: rotate(45deg); background: var(--ink); color: #fff; border-color: var(--ink); }
        #hv5 .h5-faq-a { max-height: 0; overflow: hidden; transition: max-height .35s ease; } #hv5 .h5-faq-item.is-open .h5-faq-a { max-height: 260px; }
        #hv5 .h5-faq-a p { margin: 0 0 22px; color: var(--ink-2); font-size: 15.5px; line-height: 1.6; }
        #hv5 .h5-final-wrap { padding-top: 40px; }
        #hv5 .h5-final { border-radius: 32px; padding: 72px 40px; text-align: center; color: #fff; background: radial-gradient(70% 90% at 80% 0%, rgba(143,40,246,.6), transparent 60%), radial-gradient(50% 70% at 10% 100%, rgba(57,255,20,.22), transparent 60%), var(--ink); }
        #hv5 .h5-final h2 { margin: 0; } #hv5 .h5-final p { color: rgba(255,255,255,.72); font-size: 17px; margin: 16px auto 0; max-width: 560px; } #hv5 .h5-final .h5-cta-row { margin-top: 30px; justify-content: center; }
        #hv5 .h5-footer { padding: 56px 0 28px; border-top: 1px solid var(--line); }
        #hv5 .h5-footer-grid { display: grid; grid-template-columns: 1.6fr 1fr 1fr 1fr; gap: 32px; }
        #hv5 .h5-footer-brand p { color: var(--mut); font-size: 14px; margin-top: 12px; max-width: 260px; }
        #hv5 .h5-footer h4 { margin: 0 0 12px; font-size: 13px; letter-spacing: .1em; text-transform: uppercase; color: var(--mut); }
        #hv5 .h5-footer-grid a { display: block; font-size: 15px; padding: 5px 0; color: var(--ink-2); } #hv5 .h5-footer-grid a:hover { color: var(--ink); }
        #hv5 .h5-footer-bottom { margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--line); color: var(--mut); font-size: 13px; }

        @media (max-width: 980px) {
          #hv5 .h5-links, #hv5 .h5-nav-cta .h5-btn-ghost, #hv5 .h5-nav-cta .h5-btn-dark { display: none; } #hv5 .h5-burger { display: inline-flex; }
          #hv5 .h5-hero-grid, #hv5 .h5-split, #hv5 .h5-pieces-grid { grid-template-columns: 1fr; gap: 36px; }
          #hv5 .h5-split-rev > :first-child { order: 1; }
          #hv5 .h5-paths, #hv5 .h5-cases { grid-template-columns: 1fr; } #hv5 .h5-metrics-grid { grid-template-columns: repeat(2, 1fr); }
          #hv5 .h5-pieces { height: auto; } #hv5 .h5-pieces-sticky { position: relative; height: auto; padding: 72px 0; }
          #hv5 .h5-stage { height: 380px; } #hv5 .h5-piece { width: 220px; height: 240px; left: 0; }
          #hv5 .h5-footer-grid { grid-template-columns: 1fr 1fr; } #hv5 .h5-sec { padding: 72px 0; }
        }
        @media (max-width: 560px) { #hv5 .h5-metrics-grid, #hv5 .h5-footer-grid { grid-template-columns: 1fr; } #hv5 .h5-cmp { height: 300px; } }
        @media (prefers-reduced-motion: reduce) { #hv5 [data-rv] { opacity: 1 !important; transform: none !important; } #hv5 .h5-marquee-track { animation: none; } #hv5 .h5-bub { opacity: 1; animation: none; } }
      `}</style>
    </>
  )
}
