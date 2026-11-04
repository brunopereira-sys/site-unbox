import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import { URLS } from '../lib/config'

/* ─────────────────────────────────────────────────────────────
   Unbox · Home v3 — teste de direção "AI dark neon" (ref. Revi LP):
   navy #05070F, neon verde→ciano→azul→roxo, grid + aurora + orbs,
   sparkles (estrela Unbox), cursor dot+anel, rede neural no hero.
   Mesma estrutura/conteúdo da v2. Escopo #hv3 / h3-*.
   ───────────────────────────────────────────────────────────── */

const V = '?v=r26'

const TABS = [
  { key: 'loja', label: 'Loja', icon: 'layout', title: 'Sua loja, do seu jeito. Sem template.', body: 'Layouts 100% customizáveis, mobile-first, com SEO e performance de ponta. A vitrine que a sua marca merece, pronta para vender.', img: '/img/loja-olea.png', alt: 'Loja Olea rodando na Unbox' },
  { key: 'checkout', label: 'Checkout', icon: 'bolt', title: 'Checkout em modo TURBO.', body: '3 etapas, sem redirecionamento, sem fricção. Pix, cartão e boleto no mesmo fluxo, com aprovação alta e recuperação de carrinho nativa.', img: '/img/checkout-dash.png', alt: 'Checkout TURBO da Unbox' },
  { key: 'assinatura', label: 'Assinatura', icon: 'repeat', title: 'Recorrência que nasce com a loja.', body: 'Assinatura 100% nativa, da página de produto ao checkout. Seu cliente pausa, troca e gerencia sozinho. Você acompanha churn e MRR.', img: '/img/assinatura2.png', alt: 'Assinatura nativa no carrinho' },
  { key: 'pay', label: 'Unbox Pay', icon: 'card', title: 'Pagamento e capital no mesmo lugar.', body: 'Gateway próprio com 98% de aprovação e antifraude por AI. Crédito de até R$ 500k amortizado pelas suas próprias vendas.', img: '/img/feat-layout-admin.png', alt: 'Painel administrativo da Unbox' },
]

const PILLARS = [
  { n: '01', title: 'Vender', body: 'Loja customizada, mobile-first e rápida. Promoções, bundles e cupons para elevar o ticket.', items: ['Layouts 100% customizáveis', 'Promoções e bundles', 'SEO e performance'] },
  { n: '02', title: 'Converter', body: 'Checkout TURBO em 3 etapas, sem redirecionamento. Menos abandono, mais aprovação.', items: ['Checkout em 3 etapas', 'Pix, cartão e boleto', 'Recuperação de carrinho'] },
  { n: '03', title: 'Reter', body: 'Assinatura nativa e dados de recorrência para vender de novo para o mesmo cliente.', items: ['Assinatura 100% nativa', 'Churn e MRR à vista', 'Reengajamento'] },
  { n: '04', title: 'Crescer', body: 'Unbox Pay com crédito, rede de creators paga por performance e AI operando o dia a dia.', items: ['Crédito até R$ 500k', 'Creators por performance', 'AI First'] },
]

const FEATURES = [
  { icon: 'layout', title: 'Layouts 100% customizáveis', body: 'Mobile-first, com SEO e performance de ponta. Edite seções, banners e páginas sem depender de dev.', img: '/img/feat-layout-admin.png' },
  { icon: 'bolt', title: 'Checkout TURBO', body: '3 etapas, sem redirecionamento. O fluxo mais curto entre o carrinho e o pedido pago.', img: '/img/checkout-dash.png' },
  { icon: 'repeat', title: 'Assinatura 100% nativa', body: 'Recorrência da página de produto ao checkout, com gestão pelo próprio cliente.', img: '/img/assinatura2.png' },
  { icon: 'tag', title: 'Promoções e bundles', body: 'Combos, cupons e descontos progressivos para elevar o ticket médio.', img: '/img/loja-pudim.png' },
  { icon: 'chart', title: 'Dashboards em tempo real', body: 'Vendas, ticket médio, conversão, recompra e LTV num só painel. Sem planilha, sem achismo.', img: '/img/loja-olea.png' },
]

const METRICS = [
  { num: 15, prefix: '+', suffix: ' mil', label: 'lojas já cadastradas na Unbox' },
  { num: 5.9, prefix: '+', suffix: '×', label: 'crescimento médio de vendas', decimals: 1 },
  { num: 4, prefix: '', suffix: '×', label: 'mais conversão no seu site' },
  { num: 98, prefix: '', suffix: '%', label: 'de aprovação no Unbox Pay' },
]

const BRANDS = [
  { name: 'Badia', seg: 'Alimentos', logo: '/img/badia-logo.svg' },
  { name: 'Sunrize', seg: 'Wellness', logo: '/img/sunrize-logo.png' },
  { name: 'Wish', seg: 'Doces', logo: '/img/wish-logo.png' },
  { name: 'Pudim Beauty', seg: 'Cosméticos', logo: '/img/pudim-logo.png' },
  { name: 'Bhava', seg: 'Wellness' }, { name: 'Olea', seg: 'Alimentos' }, { name: 'Popai', seg: 'Wellness' },
  { name: 'Vista Perê', seg: 'Moda' }, { name: 'diCapri', seg: 'Bebidas' }, { name: 'Glow', seg: 'Colágeno' },
]

const STEPS = [
  { n: '01', title: 'Demo + diagnóstico gratuito', body: 'A gente entende sua operação antes de qualquer proposta. Sem compromisso.' },
  { n: '02', title: 'Migração assistida pela equipe', body: 'Produtos, clientes, histórico de pedidos e SEO. Você não faz nada sozinho.' },
  { n: '03', title: 'Suporte humano de verdade', body: 'WhatsApp, chat e e-mail com especialistas que conhecem a sua operação.' },
]

const FAQ = [
  { q: 'Como funciona a migração para a Unbox?', a: 'Nossa equipe faz a migração assistida junto com você: produtos, clientes, histórico de pedidos e SEO. Você não fica sozinho em nenhuma etapa, e roda um diagnóstico gratuito antes de qualquer proposta.' },
  { q: 'O que diferencia a Unbox de outras plataformas?', a: 'Tudo num só lugar e nativo: e-commerce, checkout TURBO, assinatura, Unbox Pay (pagamento + capital) e Growth com creators, integrados desde o primeiro dia, sem stack de apps quebrando.' },
  { q: 'Como funciona o Unbox Pay e o crédito?', a: 'Gateway próprio com +98% de aprovação e antifraude por AI. O crédito de até R$ 500k é amortizado pelas suas próprias vendas, sem banco, sem garantia física e sem abrir mão de equity.' },
  { q: 'Meu SEO é preservado na migração?', a: 'Sim. Cuidamos dos redirects e da estrutura de URLs para preservar seu ranqueamento e o tráfego orgânico que você já conquistou.' },
  { q: 'Para quem é o Projeto 10x?', a: 'Para marcas acima de R$ 150k/mês que querem a Unbox como parceira estratégica de crescimento, com um Head de Growth embarcado atuando como Board Member.' },
]

function Icon({ name, size = 18 }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }
  switch (name) {
    case 'layout': return <svg {...p}><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M3 9h18M9 21V9" /></svg>
    case 'bolt': return <svg {...p}><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" /></svg>
    case 'repeat': return <svg {...p}><path d="m17 2 4 4-4 4" /><path d="M3 11v-1a4 4 0 0 1 4-4h14" /><path d="m7 22-4-4 4-4" /><path d="M21 13v1a4 4 0 0 1-4 4H3" /></svg>
    case 'card': return <svg {...p}><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M3 10h18M7 15h3" /></svg>
    case 'tag': return <svg {...p}><path d="M20 12 12 20 3 11V3h8l9 9Z" /><circle cx="7.5" cy="7.5" r="1.2" /></svg>
    case 'chart': return <svg {...p}><path d="M5 20V10M12 20V4M19 20v-7" /></svg>
    case 'sparkle': return <svg {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" /></svg>
    case 'shield': return <svg {...p}><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z" /><path d="m9 12 2 2 4-4" /></svg>
    case 'arrow': return <svg {...p}><path d="M7 17 17 7M8 7h9v9" /></svg>
    case 'check': return <svg {...p}><path d="m5 12 4 4L19 6" /></svg>
    case 'plus': return <svg {...p}><path d="M12 5v14M5 12h14" /></svg>
    default: return null
  }
}

function useCountUp(target, decimals = 0, run) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!run) return
    let raf; const t0 = performance.now(); const dur = 1400
    const tick = (t) => {
      const k = Math.min(1, (t - t0) / dur); const e = 1 - Math.pow(1 - k, 3)
      setVal(Number((target * e).toFixed(decimals)))
      if (k < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, decimals, run])
  return val
}

function Metric({ m, run }) {
  const v = useCountUp(m.num, m.decimals || 0, run)
  const shown = (m.decimals ? v.toFixed(m.decimals) : Math.round(v)).toString().replace('.', ',')
  return (
    <div className="h3-card h3-metric">
      <div className="h3-metric-n"><span className="h3-grad">{m.prefix}{shown}</span><em>{m.suffix}</em></div>
      <div className="h3-metric-l">{m.label}</div>
    </div>
  )
}

/* Rede neural: nós que derivam, se conectam e reagem ao ponteiro */
function NeuralNet() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = canvas.getContext('2d')
    const TINTS = ['37,245,138', '88,166,255', '199,155,255']
    let nodes = [], w = 0, h = 0, raf, running = true
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const pointer = { x: -999, y: -999 }
    const size = () => {
      const r = canvas.getBoundingClientRect(); w = r.width; h = r.height
      canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round(Math.min(64, Math.max(22, w / 24)))
      nodes = Array.from({ length: count }, (_, i) => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .22, vy: (Math.random() - .5) * .22, r: Math.random() * 1.6 + .9, t: TINTS[i % TINTS.length] }))
    }
    const draw = () => {
      if (!running) return
      ctx.clearRect(0, 0, w, h)
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]; n.x += n.vx; n.y += n.vy
        if (n.x < 0 || n.x > w) n.vx *= -1; if (n.y < 0 || n.y > h) n.vy *= -1
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j]; const dx = n.x - m.x, dy = n.y - m.y; const d = Math.hypot(dx, dy)
          if (d < 132) { ctx.strokeStyle = `rgba(${n.t},${.16 * (1 - d / 132)})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(m.x, m.y); ctx.stroke() }
        }
        const pd = Math.hypot(n.x - pointer.x, n.y - pointer.y)
        if (pd < 170) { ctx.strokeStyle = `rgba(37,245,138,${.35 * (1 - pd / 170)})`; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(pointer.x, pointer.y); ctx.stroke() }
        ctx.fillStyle = `rgba(${n.t},.9)`; ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }
    const onMove = (e) => { const r = canvas.getBoundingClientRect(); pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top }
    const onLeave = () => { pointer.x = -999; pointer.y = -999 }
    const io = new IntersectionObserver((es) => { running = es[0].isIntersecting; if (running) { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw) } }, { threshold: 0 })
    size(); io.observe(canvas); raf = requestAnimationFrame(draw)
    window.addEventListener('resize', size); window.addEventListener('mousemove', onMove); document.addEventListener('mouseleave', onLeave)
    return () => { running = false; cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener('resize', size); window.removeEventListener('mousemove', onMove); document.removeEventListener('mouseleave', onLeave) }
  }, [])
  return <canvas ref={ref} className="h3-net" aria-hidden="true" />
}

/* Cursor neon: dot + anel com atraso, cresce sobre interativos */
function NeonCursor() {
  useEffect(() => {
    const fine = window.matchMedia('(pointer:fine)').matches
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || calm) return
    const dot = document.createElement('div'); dot.className = 'h3-cur-dot'
    const ring = document.createElement('div'); ring.className = 'h3-cur-ring'
    document.body.append(dot, ring); document.body.classList.add('h3-has-cursor')
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my, raf
    const move = (e) => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate3d(${mx}px,${my}px,0) translate(-50%,-50%)`; document.body.classList.remove('h3-cur-out') }
    const out = () => document.body.classList.add('h3-cur-out')
    const down = () => ring.classList.add('is-down'); const up = () => ring.classList.remove('is-down')
    const hot = 'a,button,input,select,textarea,[role="tab"]'
    const over = (e) => { if (e.target.closest && e.target.closest(hot)) ring.classList.add('is-hot') }
    const leave = (e) => { if (e.target.closest && e.target.closest(hot)) ring.classList.remove('is-hot') }
    const follow = () => { rx += (mx - rx) * .18; ry += (my - ry) * .18; ring.style.transform = `translate3d(${rx}px,${ry}px,0) translate(-50%,-50%)`; raf = requestAnimationFrame(follow) }
    document.addEventListener('mousemove', move); document.addEventListener('mouseleave', out)
    document.addEventListener('mousedown', down); document.addEventListener('mouseup', up)
    document.addEventListener('mouseover', over); document.addEventListener('mouseout', leave)
    raf = requestAnimationFrame(follow)
    return () => {
      cancelAnimationFrame(raf); dot.remove(); ring.remove(); document.body.classList.remove('h3-has-cursor', 'h3-cur-out')
      document.removeEventListener('mousemove', move); document.removeEventListener('mouseleave', out)
      document.removeEventListener('mousedown', down); document.removeEventListener('mouseup', up)
      document.removeEventListener('mouseover', over); document.removeEventListener('mouseout', leave)
    }
  }, [])
  return null
}

const Spark = ({ style, blue }) => <i className={'h3-spark' + (blue ? ' is-blue' : '')} style={style} aria-hidden="true" />

export default function HomeV3() {
  const [tab, setTab] = useState(0)
  const [tabProg, setTabProg] = useState(0)
  const [feat, setFeat] = useState(0)
  const [featProg, setFeatProg] = useState(0)
  const [faq, setFaq] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)
  const [metricsOn, setMetricsOn] = useState(false)
  const metricsRef = useRef(null)
  const pausedTab = useRef(false)
  const pausedFeat = useRef(false)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    const els = document.querySelectorAll('#hv3 [data-rv]')
    if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('h3-in')); setMetricsOn(true); return }
    const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('h3-in'); io.unobserve(en.target) } }), { threshold: 0.14 })
    els.forEach((e) => io.observe(e))
    let mo
    if (metricsRef.current) { mo = new IntersectionObserver((es) => { if (es[0].isIntersecting) { setMetricsOn(true); mo.disconnect() } }, { threshold: 0.2 }); mo.observe(metricsRef.current) }
    const fb = setTimeout(() => setMetricsOn(true), 1800)
    return () => { io.disconnect(); mo && mo.disconnect(); clearTimeout(fb) }
  }, [])

  useEffect(() => {
    const dur = 6000; let t0 = performance.now(); let raf
    const tick = (t) => {
      if (!pausedTab.current) { const k = (t - t0) / dur; if (k >= 1) { setTab((i) => (i + 1) % TABS.length); t0 = t; setTabProg(0) } else setTabProg(k) } else t0 = t - tabProg * dur
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab])

  useEffect(() => {
    const dur = 5000; let t0 = performance.now(); let raf
    const tick = (t) => {
      if (!pausedFeat.current) { const k = (t - t0) / dur; if (k >= 1) { setFeat((i) => (i + 1) % FEATURES.length); t0 = t; setFeatProg(0) } else setFeatProg(k) } else t0 = t - featProg * dur
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feat])

  const T = TABS[tab]

  return (
    <>
      <Head>
        <title>Unbox — Você faz a marca. A Unbox faz a venda.</title>
        <meta name="description" content="A camada de vendas AI-native para sua marca escalar no digital: loja, checkout TURBO, assinatura nativa, Unbox Pay e creators. Tudo em um só lugar." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <NeonCursor />

      <div id="hv3">
        {/* fundo fixo: grid + aurora + orbs */}
        <div className="h3-bgfx" aria-hidden="true">
          <div className="h3-grid" />
          <div className="h3-veil" />
          <div className="h3-orb is-green" /><div className="h3-orb is-blue" /><div className="h3-orb is-purple" />
        </div>

        <a className="h3-announce" href="/ai-unbox">
          <span className="h3-announce-in"><b>Unbox AI Foundry</b> · crie, opere e escale seu e-commerce com AI</span>
          <span className="h3-btn h3-btn-dark h3-btn-sm">Entrar na lista</span>
        </a>

        <header className={'h3-nav' + (scrolled ? ' is-scrolled' : '')}>
          <div className="h3-wrap h3-nav-in">
            <a href="/" className="h3-logo" aria-label="Unbox">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={'/img/logo-navbar.png' + V} alt="Unbox" />
            </a>
            <nav className="h3-links">
              <a href="/recursos">Produto</a><a href="/industrias">Soluções</a><a href="/blog">Recursos</a><a href="/credito">Crédito</a>
            </nav>
            <div className="h3-nav-cta">
              <a href={URLS.login} className="h3-btn h3-btn-ghost h3-btn-sm">Login</a>
              <a href={URLS.demo} className="h3-btn h3-btn-neon h3-btn-sm">Agendar demo</a>
              <button className="h3-burger" aria-label="Menu" onClick={() => setMenu((v) => !v)}><span /><span /><span /></button>
            </div>
          </div>
          {menu && <div className="h3-sheet"><a href="/recursos">Produto</a><a href="/industrias">Soluções</a><a href="/blog">Recursos</a><a href="/credito">Crédito</a><a href={URLS.demo} className="h3-btn h3-btn-neon">Agendar demo</a></div>}
        </header>

        {/* hero */}
        <section className="h3-hero">
          <NeuralNet />
          <div className="h3-sphere" aria-hidden="true" />
          <Spark style={{ left: '4%', top: '22%' }} /><Spark blue style={{ right: '5%', top: '48%', width: 16, height: 16 }} /><Spark style={{ left: '46%', top: '8%', width: 12, height: 12 }} />
          <div className="h3-wrap">
            <div className="h3-hero-copy" data-rv>
              <span className="h3-eye"><i className="h3-dot" />AI-NATIVE · E-COMMERCE D2C</span>
              <h1>Você faz a marca.<br /><span className="h3-grad">A Unbox faz a venda.</span></h1>
              <p className="h3-lead">
                A camada de vendas AI-native para sua marca escalar no digital. Loja, checkout, assinatura,
                pagamento e crescimento — tudo em um só lugar, conectado com suas ferramentas de AI.
              </p>
              <div className="h3-cta-row">
                <a href={URLS.demo} className="h3-btn h3-btn-neon h3-btn-lg">Agendar demo</a>
                <a href={URLS.signup} className="h3-btn h3-btn-ghost h3-btn-lg">Comece agora</a>
              </div>
              <p className="h3-micro">Migração assistida pela equipe · Sem taxa de setup · Suporte humano</p>
            </div>

            <div data-rv>
              <div className="h3-panel" onMouseEnter={() => { pausedTab.current = true }} onMouseLeave={() => { pausedTab.current = false }}>
                <div className="h3-tabs" role="tablist">
                  {TABS.map((t, i) => (
                    <button key={t.key} role="tab" aria-selected={i === tab} className={'h3-tab' + (i === tab ? ' is-on' : '')} onClick={() => { setTab(i); setTabProg(0) }}>
                      <span className="h3-tab-ico"><Icon name={t.icon} /></span><span className="h3-tab-lbl">{t.label}</span>
                      {i === tab && <i className="h3-tab-prog" style={{ transform: `scaleX(${tabProg})` }} />}
                    </button>
                  ))}
                </div>
                <div className="h3-showcase" key={T.key}>
                  <div className="h3-showcase-copy">
                    <span className="h3-chip"><Icon name={T.icon} size={14} /> {T.label}</span>
                    <h3>{T.title}</h3><p>{T.body}</p>
                    <a href="/recursos" className="h3-textlink">Saiba mais <Icon name="arrow" size={16} /></a>
                  </div>
                  <div className="h3-showcase-media">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={T.img} alt={T.alt} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* brands */}
        <section className="h3-brands" data-rv>
          <p className="h3-brands-l">Marcas que já vendem todo dia com a Unbox</p>
          <div className="h3-marquee"><div className="h3-marquee-track">
            {[...BRANDS, ...BRANDS].map((b, i) => (
              <span className="h3-brand" key={i}>
                {b.logo ? /* eslint-disable-next-line @next/next/no-img-element */ <img src={b.logo} alt={b.name} /> : <b>{b.name}</b>}
                <em>{b.seg}</em>
              </span>
            ))}
          </div></div>
        </section>

        {/* metrics */}
        <section className="h3-sec h3-sec-tight" ref={metricsRef}>
          <div className="h3-wrap h3-grid4" data-rv>{METRICS.map((m) => <Metric key={m.label} m={m} run={metricsOn} />)}</div>
        </section>

        {/* pillars */}
        <section className="h3-sec">
          <div className="h3-wrap">
            <div className="h3-head center" data-rv>
              <span className="h3-eye"><i className="h3-dot" />A PLATAFORMA</span>
              <h2>Feita para marcas que <span className="h3-grad">vendem todo dia</span>.</h2>
              <p>Vender, converter, reter e crescer costumam ser quatro ferramentas diferentes. Na Unbox, é uma operação só — nativa, integrada e pronta para escalar.</p>
            </div>
            <div className="h3-grid4">
              {PILLARS.map((p, i) => (
                <div className="h3-card h3-pillar" data-rv style={{ transitionDelay: `${i * 70}ms` }} key={p.title}>
                  <span className="h3-num">{p.n}</span>
                  <h3>{p.title}</h3><p>{p.body}</p>
                  <ul>{p.items.map((it) => <li key={it}><Icon name="check" size={14} />{it}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* features accordion */}
        <section className="h3-sec h3-sec-alt">
          <div className="h3-wrap h3-split">
            <div className="h3-split-copy" onMouseEnter={() => { pausedFeat.current = true }} onMouseLeave={() => { pausedFeat.current = false }}>
              <span className="h3-eye is-blue"><i className="h3-dot" />E-COMMERCE</span>
              <h2 data-rv>Uma plataforma, <span className="h3-grad">tudo que você precisa</span>.</h2>
              <div className="h3-acc" data-rv>
                {FEATURES.map((f, i) => (
                  <div className={'h3-acc-item' + (i === feat ? ' is-on' : '')} key={f.title}>
                    <button className="h3-acc-q" onClick={() => { setFeat(i); setFeatProg(0) }}>
                      <span className="h3-acc-ico"><Icon name={f.icon} /></span><span className="h3-acc-t">{f.title}</span><span className="h3-acc-arrow"><Icon name="arrow" size={14} /></span>
                    </button>
                    <div className="h3-acc-a"><p>{f.body}</p></div>
                    {i === feat && <i className="h3-acc-prog" style={{ transform: `scaleX(${featProg})` }} />}
                  </div>
                ))}
              </div>
            </div>
            <div data-rv>
              <div className="h3-frame" key={FEATURES[feat].img}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={FEATURES[feat].img} alt={FEATURES[feat].title} />
              </div>
            </div>
          </div>
        </section>

        {/* Unbox Pay */}
        <section className="h3-sec">
          <div className="h3-wrap h3-split h3-split-rev">
            <div data-rv><div className="h3-frame is-green">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/checkout-dash.png" alt="Unbox Pay" />
            </div></div>
            <div className="h3-split-copy">
              <span className="h3-eye"><i className="h3-dot" />UNBOX PAY</span>
              <h2 data-rv>Pagamento, crédito e caixa. <span className="h3-grad">Sem banco no meio.</span></h2>
              <ul className="h3-list" data-rv>
                <li><Icon name="shield" /><div><b>Antifraude por AI</b><span>98% de aprovação com o risco sob controle.</span></div></li>
                <li><Icon name="card" /><div><b>Crédito de até R$ 500k</b><span>Amortizado pelas suas próprias vendas. Sem garantia, sem equity.</span></div></li>
                <li><Icon name="bolt" /><div><b>Pix, cartão e boleto</b><span>Em até 12×, com taxas competitivas e liquidez rápida.</span></div></li>
              </ul>
              <a href="/credito" className="h3-textlink" data-rv>Conhecer o Unbox Pay <Icon name="arrow" size={16} /></a>
            </div>
          </div>
        </section>

        {/* AI First */}
        <section className="h3-sec h3-sec-alt">
          <Spark style={{ right: '8%', top: '12%' }} blue />
          <div className="h3-wrap h3-split">
            <div className="h3-split-copy">
              <span className="h3-eye"><i className="h3-dot" />AI FIRST <em className="h3-new">Novo</em></span>
              <h2 data-rv>Crie, opere e escale seu e-commerce <span className="h3-grad">com AI</span>.</h2>
              <ul className="h3-list" data-rv>
                <li><Icon name="sparkle" /><div><b>Loja gerada por AI</b><span>De um prompt, foto ou Figma para uma loja real, com checkout.</span></div></li>
                <li><Icon name="bolt" /><div><b>MCP nativo da Unbox</b><span>Sua AI conectada à loja: catálogo, campanhas e operação por texto.</span></div></li>
                <li><Icon name="chart" /><div><b>Agentes de crescimento</b><span>Preço, campanha, risco de cancelamento e reengajamento — rodando por você.</span></div></li>
              </ul>
              <a href="/ai-unbox" className="h3-btn h3-btn-neon" data-rv>Entrar na lista de espera</a>
            </div>
            <div data-rv><div className="h3-card h3-ai">
              <div className="h3-ai-head"><span className="h3-dot" /><span className="h3-dot is-blue" /><span>você · Unbox</span></div>
              <div className="h3-bub u">cria um cupom de 10% pra primeira compra</div>
              <div className="h3-bub a"><Icon name="check" size={14} /> Cupom <b>PRIMEIRA10</b> criado e no ar.</div>
              <div className="h3-bub u">e frete grátis acima de R$ 199</div>
              <div className="h3-bub a"><Icon name="check" size={14} /> Regra de frete ativada em produção.</div>
            </div></div>
          </div>
        </section>

        {/* results */}
        <section className="h3-sec">
          <div className="h3-wrap">
            <div className="h3-head center" data-rv><span className="h3-eye is-blue"><i className="h3-dot" />RESULTADOS</span><h2>Marcas reais. <span className="h3-grad">Resultados reais.</span></h2></div>
            <div className="h3-grid4" data-rv>
              {[['96 / 100', 'Performance no Lighthouse, com 100 em SEO, acessibilidade e boas práticas.'], ['+5,9×', 'Crescimento médio de vendas das marcas que migraram para a Unbox.'], ['4×', 'Mais conversão no site com checkout TURBO e loja mobile-first.'], ['98%', 'De aprovação no Unbox Pay, com antifraude por AI.']].map(([n, t]) => (
                <div className="h3-card h3-result" key={n}><b className="h3-grad">{n}</b><span>{t}</span></div>
              ))}
            </div>
          </div>
        </section>

        {/* migration */}
        <section className="h3-sec h3-sec-alt">
          <div className="h3-wrap">
            <div className="h3-head" data-rv><span className="h3-eye"><i className="h3-dot" />MIGRAÇÃO</span><h2>Migrar é mais simples <span className="h3-grad">do que você imagina</span>.</h2><p>Saindo de qualquer plataforma. Nossa equipe cuida da migração com você — sem perder SEO, histórico ou vendas.</p></div>
            <div className="h3-grid3">
              {STEPS.map((s, i) => (
                <div className="h3-card h3-step" data-rv style={{ transitionDelay: `${i * 80}ms` }} key={s.n}><span className="h3-num">{s.n}</span><h3>{s.title}</h3><p>{s.body}</p></div>
              ))}
            </div>
            <div className="h3-platforms" data-rv>
              <span>Migre de</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/logo-shopify.png" alt="Shopify" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/logo-vtex.png" alt="VTEX" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/logo-woocommerce.png" alt="WooCommerce" />
              <span>e outras</span>
            </div>
          </div>
        </section>

        {/* faq */}
        <section className="h3-sec">
          <div className="h3-wrap h3-narrow">
            <div className="h3-head" data-rv><span className="h3-eye is-blue"><i className="h3-dot" />DÚVIDAS</span><h2>Tudo que você <span className="h3-grad">precisa saber</span>.</h2></div>
            <div className="h3-faq" data-rv>
              {FAQ.map((f, i) => (
                <div className={'h3-faq-item' + (faq === i ? ' is-open' : '')} key={i}>
                  <button className="h3-faq-q" onClick={() => setFaq(faq === i ? -1 : i)}><span>{f.q}</span><i><Icon name="plus" size={16} /></i></button>
                  <div className="h3-faq-a"><p>{f.a}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* final */}
        <section className="h3-sec">
          <div className="h3-wrap">
            <div className="h3-final" data-rv>
              <Spark style={{ left: '6%', top: '18%' }} /><Spark blue style={{ right: '7%', bottom: '20%' }} />
              <h2>Vamos dar o <span className="h3-grad">primeiro passo</span>?</h2>
              <p>Demo e diagnóstico gratuito da sua operação. Sem compromisso, sem taxa de setup.</p>
              <div className="h3-cta-row"><a href={URLS.demo} className="h3-btn h3-btn-neon h3-btn-lg">Agendar demo</a><a href={URLS.whatsapp} className="h3-btn h3-btn-ghost h3-btn-lg">Falar no WhatsApp</a></div>
            </div>
          </div>
        </section>

        <footer className="h3-footer">
          <div className="h3-wrap h3-footer-grid">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={'/img/logo-navbar.png' + V} alt="Unbox" className="h3-footer-logo" />
              <p>E-commerce D2C para marcas de alto crescimento.</p>
            </div>
            <div><h4>Produto</h4><a href="/recursos">Recursos</a><a href="/checkout">Turbo Checkout</a><a href="/assinatura">Assinatura</a><a href="/afiliados">Afiliados</a></div>
            <div><h4>Soluções</h4><a href="/credito">Crédito para marcas</a><a href="/industrias">Para indústrias</a><a href="/ai-unbox">AI Foundry</a></div>
            <div><h4>Empresa</h4><a href="/blog">Blog</a><a href="/carreiras">Carreiras</a><a href={URLS.whatsapp}>Contato</a></div>
          </div>
          <div className="h3-wrap h3-footer-bottom">© {new Date().getFullYear()} Unbox. Todos os direitos reservados.</div>
        </footer>
      </div>

      <style jsx global>{`
        html, body { margin: 0; background: #05070F; }
        /* cursor neon (global, fora do escopo por ser filho de body) */
        body.h3-has-cursor, body.h3-has-cursor a, body.h3-has-cursor button { cursor: none; }
        body.h3-has-cursor input, body.h3-has-cursor select, body.h3-has-cursor textarea { cursor: auto; }
        .h3-cur-dot, .h3-cur-ring { position: fixed; top: 0; left: 0; z-index: 9999; pointer-events: none; mix-blend-mode: screen; transform: translate3d(-50%,-50%,0); opacity: 0; transition: opacity .25s ease; }
        body.h3-has-cursor .h3-cur-dot, body.h3-has-cursor .h3-cur-ring { opacity: 1; }
        body.h3-has-cursor.h3-cur-out .h3-cur-dot, body.h3-has-cursor.h3-cur-out .h3-cur-ring { opacity: 0; }
        .h3-cur-dot { width: 9px; height: 9px; border-radius: 50%; background: #25F58A; box-shadow: 0 0 10px #25F58A, 0 0 26px rgba(37,245,138,.75); }
        .h3-cur-ring { width: 40px; height: 40px; border-radius: 50%; border: 1.5px solid rgba(143,178,255,.85); box-shadow: 0 0 24px rgba(47,107,255,.6), inset 0 0 20px rgba(168,85,247,.4); transition: width .25s ease, height .25s ease, border-color .25s ease, background .25s ease, opacity .25s ease; }
        .h3-cur-ring.is-hot { width: 66px; height: 66px; border-color: rgba(37,245,138,.95); background: radial-gradient(circle, rgba(37,245,138,.14), transparent 65%); }
        .h3-cur-ring.is-down { width: 30px; height: 30px; }

        #hv3 {
          --bg: #05070F; --surface: #0B1130; --surface-2: #0E1740; --line: rgba(255,255,255,.10); --line-strong: rgba(255,255,255,.18);
          --green: #25F58A; --blue: #2F6BFF; --blue-soft: #8FB2FF; --purple: #A855F7; --text: #EDF2FF; --muted: rgba(237,242,255,.66); --muted-2: rgba(237,242,255,.46);
          --neon: linear-gradient(105deg, #25F58A 0%, #35C6FF 38%, #4B7BFF 62%, #A855F7 100%); --r: 20px; --r-lg: 28px;
          position: relative; font-family: 'Sora', system-ui, -apple-system, sans-serif; color: var(--text); background: var(--bg); -webkit-font-smoothing: antialiased; line-height: 1.55; overflow-x: hidden;
        }
        #hv3 *, #hv3 *::before, #hv3 *::after { box-sizing: border-box; }
        #hv3 a { color: inherit; text-decoration: none; }
        #hv3 .h3-wrap { max-width: 1160px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 1; }
        #hv3 .h3-narrow { max-width: 820px; }
        #hv3 [data-rv] { opacity: 0; transform: translateY(16px); transition: opacity .7s ease, transform .7s cubic-bezier(.2,.7,.2,1); }
        #hv3 [data-rv].h3-in { opacity: 1; transform: none; }
        #hv3 .h3-grad { background: var(--neon); -webkit-background-clip: text; background-clip: text; color: transparent; }

        /* fundo */
        #hv3 .h3-bgfx { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
        #hv3 .h3-grid { position: absolute; inset: -20% -10%; background-image: linear-gradient(rgba(120,160,255,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(120,160,255,.055) 1px, transparent 1px); background-size: 64px 64px; -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 20%, #000 25%, transparent 78%); mask-image: radial-gradient(ellipse 80% 60% at 50% 20%, #000 25%, transparent 78%); }
        #hv3 .h3-veil { position: absolute; top: -10%; left: -10%; right: -10%; height: 70vh; filter: blur(30px); animation: h3veil 18s ease-in-out infinite alternate;
          background: radial-gradient(60% 60% at 20% 0%, rgba(37,245,138,.16), transparent 60%), radial-gradient(70% 70% at 75% 10%, rgba(47,107,255,.28), transparent 62%), radial-gradient(50% 60% at 50% 40%, rgba(168,85,247,.16), transparent 65%); }
        @keyframes h3veil { from { opacity: .75; transform: translateY(0); } to { opacity: 1; transform: translateY(3%); } }
        #hv3 .h3-orb { position: absolute; border-radius: 50%; filter: blur(90px); opacity: .5; animation: h3drift 26s ease-in-out infinite; will-change: transform; }
        #hv3 .h3-orb.is-green { width: 520px; height: 520px; background: rgba(37,245,138,.2); top: -160px; left: -140px; }
        #hv3 .h3-orb.is-blue { width: 620px; height: 620px; background: rgba(47,107,255,.24); top: 20%; right: -220px; animation-duration: 32s; animation-delay: -6s; }
        #hv3 .h3-orb.is-purple { width: 480px; height: 480px; background: rgba(168,85,247,.2); bottom: -180px; left: 30%; animation-duration: 29s; animation-delay: -12s; }
        @keyframes h3drift { 0%,100% { transform: translate(0,0); } 50% { transform: translate(40px,-30px); } }
        #hv3 .h3-spark { position: absolute; z-index: 2; pointer-events: none; width: 24px; height: 24px; filter: drop-shadow(0 0 10px rgba(37,245,138,.9)); animation: h3twinkle 4.5s ease-in-out infinite;
          background: no-repeat center/contain url("data:image/svg+xml,%3Csvg xmlns='http:%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox='0 0 100 100'%3E%3Cpath d='M50 3C57 29 71 43 97 50 71 57 57 71 50 97 43 71 29 57 3 50 29 43 43 29 50 3Z' fill='%2325F58A'/%3E%3C/svg%3E"); }
        #hv3 .h3-spark.is-blue { filter: drop-shadow(0 0 10px rgba(143,178,255,.9)); animation-delay: -2s;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http:%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox='0 0 100 100'%3E%3Cpath d='M50 3C57 29 71 43 97 50 71 57 57 71 50 97 43 71 29 57 3 50 29 43 43 29 50 3Z' fill='%23A855F7'/%3E%3C/svg%3E"); }
        @keyframes h3twinkle { 0%,100% { opacity: .35; transform: scale(.8) rotate(0); } 50% { opacity: 1; transform: scale(1.15) rotate(20deg); } }

        /* botões */
        #hv3 .h3-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; font-family: inherit; font-weight: 700; font-size: 15px; border-radius: 14px; padding: 15px 24px; border: 1px solid transparent; transition: transform .15s ease, filter .2s, background .2s, box-shadow .2s; white-space: nowrap; cursor: pointer; }
        #hv3 .h3-btn-sm { padding: 11px 18px; font-size: 13.5px; border-radius: 12px; }
        #hv3 .h3-btn-lg { padding: 17px 28px; font-size: 16px; }
        #hv3 .h3-btn-neon { background: var(--neon); color: #04060E; box-shadow: 0 14px 40px -14px rgba(47,107,255,.85), inset 0 0 0 1px rgba(255,255,255,.1); }
        #hv3 .h3-btn-neon:hover { transform: translateY(-2px) scale(1.015); filter: brightness(1.08); }
        #hv3 .h3-btn-ghost { background: rgba(255,255,255,.05); color: var(--text); border-color: var(--line-strong); }
        #hv3 .h3-btn-ghost:hover { background: rgba(255,255,255,.1); }
        #hv3 .h3-btn-dark { background: #04060E; color: #fff; border-color: rgba(255,255,255,.14); }
        #hv3 .h3-textlink { display: inline-flex; align-items: center; gap: 6px; font-weight: 600; color: var(--green); }
        #hv3 .h3-textlink:hover { gap: 10px; }

        /* announce + nav */
        #hv3 .h3-announce { position: relative; z-index: 2; display: flex; align-items: center; justify-content: center; gap: 14px; padding: 8px 16px; background: var(--neon); color: #04060E; font-size: 13.5px; font-weight: 600; }
        #hv3 .h3-nav { position: sticky; top: 0; z-index: 40; background: rgba(5,7,15,.72); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border-bottom: 1px solid transparent; transition: border-color .2s; }
        #hv3 .h3-nav.is-scrolled { border-bottom-color: var(--line); }
        #hv3 .h3-nav-in { display: flex; align-items: center; justify-content: space-between; height: 70px; gap: 24px; }
        #hv3 .h3-logo img { height: 34px; width: auto; display: block; }
        #hv3 .h3-links { display: flex; gap: 26px; font-weight: 500; font-size: 14.5px; color: var(--muted); }
        #hv3 .h3-links a:hover { color: var(--text); }
        #hv3 .h3-nav-cta { display: flex; align-items: center; gap: 8px; }
        #hv3 .h3-burger { display: none; width: 40px; height: 40px; border: 1px solid var(--line); border-radius: 10px; background: rgba(255,255,255,.04); flex-direction: column; justify-content: center; gap: 4px; align-items: center; cursor: pointer; }
        #hv3 .h3-burger span { width: 16px; height: 2px; background: var(--text); border-radius: 2px; }
        #hv3 .h3-sheet { display: flex; flex-direction: column; gap: 6px; padding: 12px 24px 20px; border-top: 1px solid var(--line); background: var(--bg); }
        #hv3 .h3-sheet a { padding: 10px 0; font-weight: 500; } #hv3 .h3-sheet .h3-btn { margin-top: 8px; }

        /* hero */
        #hv3 .h3-hero { position: relative; padding: 80px 0 40px; overflow: hidden; }
        #hv3 .h3-net { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 0; opacity: .9; }
        #hv3 .h3-sphere { position: absolute; width: 380px; height: 380px; border-radius: 50%; top: -120px; right: -140px; z-index: 0; pointer-events: none; opacity: .38; filter: blur(58px); background: conic-gradient(from 0deg, #25F58A, #35C6FF, #4B7BFF, #A855F7, #E255F7, #25F58A); animation: h3spin 26s linear infinite; }
        @keyframes h3spin { to { transform: rotate(360deg); } }
        #hv3 .h3-hero-copy { text-align: center; max-width: 880px; margin: 0 auto 44px; }
        #hv3 .h3-eye { display: inline-flex; align-items: center; gap: 9px; font-size: 12px; font-weight: 600; letter-spacing: .18em; text-transform: uppercase; color: var(--green); padding: 7px 14px; border-radius: 999px; border: 1px solid rgba(37,245,138,.28); background: rgba(37,245,138,.07); }
        #hv3 .h3-eye.is-blue { color: var(--blue-soft); border-color: rgba(47,107,255,.35); background: rgba(47,107,255,.1); }
        #hv3 .h3-dot { width: 7px; height: 7px; border-radius: 50%; background: currentColor; box-shadow: 0 0 10px currentColor; }
        #hv3 .h3-new { font-style: normal; font-size: 10.5px; background: var(--neon); color: #04060E; border-radius: 999px; padding: 2px 8px; margin-left: 4px; letter-spacing: .04em; }
        #hv3 h1 { font-size: clamp(40px, 6.2vw, 74px); font-weight: 700; letter-spacing: -.035em; line-height: 1.04; margin: 22px 0 20px; text-wrap: balance; }
        #hv3 .h3-lead { font-size: clamp(16px, 1.6vw, 19px); color: var(--muted); line-height: 1.55; max-width: 660px; margin: 0 auto; }
        #hv3 .h3-cta-row { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 30px; }
        #hv3 .h3-micro { font-size: 13px; color: var(--muted-2); margin-top: 16px; }

        /* cards (feixe de luz no topo) */
        #hv3 .h3-card { position: relative; overflow: hidden; background: linear-gradient(160deg, var(--surface), #070C22); border: 1px solid var(--line); border-radius: var(--r); padding: 26px; transition: transform .2s, border-color .2s; }
        #hv3 .h3-card::before { content: ""; position: absolute; inset: 0 0 auto 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(37,245,138,.75), rgba(88,166,255,.75), transparent); background-size: 220% 100%; animation: h3beam 7s linear infinite; }
        @keyframes h3beam { from { background-position: 220% 0; } to { background-position: -120% 0; } }
        #hv3 .h3-card:hover { transform: translateY(-3px); border-color: var(--line-strong); }
        #hv3 .h3-num { display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 12px; background: var(--neon); color: #04060E; font-weight: 700; font-size: 14px; margin-bottom: 14px; }

        /* showcase */
        #hv3 .h3-panel { position: relative; z-index: 1; border-radius: var(--r-lg); padding: 24px 24px 0; background: linear-gradient(180deg, rgba(14,23,64,.85), rgba(11,17,48,.7)); border: 1px solid var(--line-strong); box-shadow: 0 30px 70px -35px rgba(0,0,0,.9), inset 0 1px 0 rgba(255,255,255,.08); backdrop-filter: blur(8px); }
        #hv3 .h3-tabs { display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; margin-bottom: 24px; }
        #hv3 .h3-tab { position: relative; display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,.045); border: 1px solid var(--line); color: var(--muted); border-radius: 999px; padding: 8px 16px 8px 8px; font-family: inherit; font-weight: 600; font-size: 14px; cursor: pointer; overflow: hidden; transition: background .2s, color .2s, border-color .2s; }
        #hv3 .h3-tab.is-on { background: rgba(255,255,255,.08); color: var(--text); border-color: rgba(37,245,138,.4); }
        #hv3 .h3-tab-ico { width: 30px; height: 30px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; background: rgba(255,255,255,.06); color: var(--blue-soft); }
        #hv3 .h3-tab.is-on .h3-tab-ico { background: var(--neon); color: #04060E; }
        #hv3 .h3-tab-prog { position: absolute; left: 0; bottom: 0; height: 2px; width: 100%; background: var(--neon); transform-origin: left; }
        #hv3 .h3-showcase { display: grid; grid-template-columns: .9fr 1.1fr; gap: 28px; align-items: center; background: rgba(5,7,15,.55); border: 1px solid var(--line); border-bottom: 0; border-radius: var(--r) var(--r) 0 0; padding: 34px 34px 0; animation: h3fade .5s ease; }
        @keyframes h3fade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        #hv3 .h3-showcase-copy h3 { font-size: clamp(24px, 2.6vw, 34px); font-weight: 700; letter-spacing: -.03em; line-height: 1.1; margin: 14px 0 12px; }
        #hv3 .h3-showcase-copy p { color: var(--muted); font-size: 16px; line-height: 1.6; margin: 0 0 18px; }
        #hv3 .h3-showcase-media { align-self: end; border-radius: 14px 14px 0 0; overflow: hidden; border: 1px solid var(--line-strong); border-bottom: 0; box-shadow: 0 -10px 50px rgba(47,107,255,.25); }
        #hv3 .h3-showcase-media img { display: block; width: 100%; height: 340px; object-fit: cover; object-position: top; }
        #hv3 .h3-chip { display: inline-flex; align-items: center; gap: 7px; font-size: 13px; font-weight: 600; color: var(--text); background: rgba(255,255,255,.06); border: 1px solid var(--line); border-radius: 999px; padding: 6px 12px 6px 9px; }

        /* brands */
        #hv3 .h3-brands { position: relative; z-index: 1; padding: 52px 0 8px; text-align: center; }
        #hv3 .h3-brands-l { font-size: 13px; color: var(--muted-2); margin: 0 0 22px; letter-spacing: .02em; }
        #hv3 .h3-marquee { overflow: hidden; -webkit-mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); }
        #hv3 .h3-marquee-track { display: flex; gap: 56px; width: max-content; animation: h3marq 38s linear infinite; }
        #hv3 .h3-marquee:hover .h3-marquee-track { animation-play-state: paused; }
        @keyframes h3marq { to { transform: translateX(-50%); } }
        #hv3 .h3-brand { display: inline-flex; flex-direction: column; align-items: center; gap: 4px; color: var(--muted); }
        #hv3 .h3-brand img { height: 26px; width: auto; opacity: .85; }
        #hv3 .h3-brand b { font-weight: 700; font-size: 20px; letter-spacing: -.02em; opacity: .85; }
        #hv3 .h3-brand em { font-style: normal; font-size: 11px; color: var(--muted-2); }

        /* seções */
        #hv3 .h3-sec { position: relative; z-index: 1; padding: 96px 0; }
        #hv3 .h3-sec-tight { padding: 40px 0 64px; }
        #hv3 .h3-sec-alt { background: rgba(8,11,26,.7); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
        #hv3 .h3-grid4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        #hv3 .h3-grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        #hv3 .h3-head { max-width: 760px; margin-bottom: 44px; }
        #hv3 .h3-head.center { margin-left: auto; margin-right: auto; text-align: center; }
        #hv3 h2 { font-size: clamp(30px, 4.2vw, 50px); font-weight: 700; letter-spacing: -.035em; line-height: 1.08; margin: 16px 0 0; text-wrap: balance; }
        #hv3 .h3-head p { color: var(--muted); font-size: 17px; line-height: 1.6; margin: 18px 0 0; }

        #hv3 .h3-metric-n { font-size: clamp(34px, 3.6vw, 46px); font-weight: 700; letter-spacing: -.04em; line-height: 1; display: flex; align-items: baseline; gap: 4px; }
        #hv3 .h3-metric-n em { font-style: normal; font-size: .55em; color: var(--blue-soft); }
        #hv3 .h3-metric-l { color: var(--muted); font-size: 14px; margin-top: 10px; }

        #hv3 .h3-pillar h3, #hv3 .h3-step h3 { font-size: 21px; font-weight: 700; letter-spacing: -.02em; margin: 0 0 8px; }
        #hv3 .h3-pillar p, #hv3 .h3-step p { color: var(--muted); font-size: 14.5px; line-height: 1.55; margin: 0 0 14px; }
        #hv3 .h3-pillar ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 7px; }
        #hv3 .h3-pillar li { display: flex; align-items: center; gap: 8px; font-size: 13.5px; color: var(--muted); }
        #hv3 .h3-pillar li svg { color: var(--green); flex-shrink: 0; }

        /* split + accordion */
        #hv3 .h3-split { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
        #hv3 .h3-split-rev > :first-child { order: 0; } #hv3 .h3-split-rev .h3-split-copy { order: 1; }
        #hv3 .h3-split-copy h2 { font-size: clamp(28px, 3.4vw, 42px); }
        #hv3 .h3-frame { border-radius: var(--r-lg); padding: 18px; background: linear-gradient(160deg, rgba(14,23,64,.9), rgba(7,12,34,.9)); border: 1px solid var(--line-strong); box-shadow: 0 30px 80px -30px rgba(47,107,255,.45); animation: h3fade .5s ease; }
        #hv3 .h3-frame.is-green { box-shadow: 0 30px 80px -30px rgba(37,245,138,.35); }
        #hv3 .h3-frame img { width: 100%; height: auto; border-radius: 14px; display: block; }
        #hv3 .h3-list { list-style: none; margin: 26px 0 0; padding: 0; }
        #hv3 .h3-list li { display: flex; gap: 14px; padding: 16px 0; border-top: 1px solid var(--line); }
        #hv3 .h3-list li:last-child { border-bottom: 1px solid var(--line); }
        #hv3 .h3-list li svg { color: var(--green); flex-shrink: 0; margin-top: 2px; }
        #hv3 .h3-list b { display: block; font-weight: 600; font-size: 16px; }
        #hv3 .h3-list span { color: var(--muted); font-size: 14.5px; line-height: 1.5; }
        #hv3 .h3-split-copy .h3-btn, #hv3 .h3-split-copy .h3-textlink { margin-top: 24px; }
        #hv3 .h3-acc { margin-top: 26px; }
        #hv3 .h3-acc-item { position: relative; border-top: 1px solid var(--line); opacity: .45; transition: opacity .3s; }
        #hv3 .h3-acc-item:last-child { border-bottom: 1px solid var(--line); }
        #hv3 .h3-acc-item.is-on { opacity: 1; }
        #hv3 .h3-acc-q { width: 100%; display: flex; align-items: center; gap: 12px; background: none; border: 0; padding: 18px 0; text-align: left; cursor: pointer; font-family: inherit; color: var(--text); }
        #hv3 .h3-acc-ico { width: 34px; height: 34px; border-radius: 10px; background: rgba(255,255,255,.06); border: 1px solid var(--line); display: inline-flex; align-items: center; justify-content: center; color: var(--blue-soft); flex-shrink: 0; }
        #hv3 .h3-acc-item.is-on .h3-acc-ico { background: var(--neon); color: #04060E; border-color: transparent; }
        #hv3 .h3-acc-t { font-weight: 600; font-size: 17px; flex: 1; }
        #hv3 .h3-acc-arrow { width: 30px; height: 30px; border-radius: 8px; background: rgba(255,255,255,.05); display: inline-flex; align-items: center; justify-content: center; color: var(--muted); }
        #hv3 .h3-acc-a { max-height: 0; overflow: hidden; transition: max-height .35s ease; }
        #hv3 .h3-acc-item.is-on .h3-acc-a { max-height: 140px; }
        #hv3 .h3-acc-a p { margin: 0 0 18px 46px; color: var(--muted); font-size: 15px; line-height: 1.55; }
        #hv3 .h3-acc-prog { position: absolute; left: 0; bottom: -1px; height: 2px; width: 100%; background: var(--neon); transform-origin: left; }

        /* ai chat */
        #hv3 .h3-ai { padding: 22px; display: grid; gap: 10px; }
        #hv3 .h3-ai-head { display: flex; align-items: center; gap: 7px; font-size: 12px; color: var(--muted-2); padding-bottom: 12px; border-bottom: 1px solid var(--line); margin-bottom: 4px; }
        #hv3 .h3-ai-head .h3-dot { color: var(--green); } #hv3 .h3-ai-head .h3-dot.is-blue { color: var(--blue-soft); }
        #hv3 .h3-bub { max-width: 84%; padding: 11px 14px; border-radius: 14px; font-size: 14.5px; line-height: 1.4; opacity: 0; transform: translateY(6px); animation: h3bub .45s ease forwards; }
        #hv3 .h3-bub.u { margin-left: auto; background: rgba(255,255,255,.08); border: 1px solid var(--line); color: var(--text); border-bottom-right-radius: 4px; }
        #hv3 .h3-bub.a { background: rgba(37,245,138,.1); border: 1px solid rgba(37,245,138,.3); color: #D9FFEB; border-bottom-left-radius: 4px; display: inline-flex; align-items: center; gap: 6px; }
        #hv3 .h3-bub.a svg { color: var(--green); }
        #hv3 .h3-bub.a b { color: #fff; }
        #hv3 .h3-bub:nth-child(2){animation-delay:.2s} #hv3 .h3-bub:nth-child(3){animation-delay:.7s} #hv3 .h3-bub:nth-child(4){animation-delay:1.2s} #hv3 .h3-bub:nth-child(5){animation-delay:1.7s}
        @keyframes h3bub { to { opacity: 1; transform: none; } }

        #hv3 .h3-result { min-height: 190px; display: flex; flex-direction: column; justify-content: space-between; }
        #hv3 .h3-result b { font-size: 40px; font-weight: 700; letter-spacing: -.04em; line-height: 1; }
        #hv3 .h3-result span { color: var(--muted); font-size: 14px; line-height: 1.5; }
        #hv3 .h3-platforms { display: flex; align-items: center; gap: 28px; flex-wrap: wrap; margin-top: 40px; color: var(--muted-2); font-size: 14px; }
        #hv3 .h3-platforms img { height: 26px; width: auto; opacity: .9; filter: brightness(0) invert(1) opacity(.8); }

        /* faq */
        #hv3 .h3-faq-item { border-top: 1px solid var(--line); }
        #hv3 .h3-faq-item:last-child { border-bottom: 1px solid var(--line); }
        #hv3 .h3-faq-q { width: 100%; display: flex; justify-content: space-between; align-items: center; gap: 16px; background: none; border: 0; padding: 22px 0; text-align: left; cursor: pointer; font-family: inherit; color: var(--text); font-weight: 600; font-size: 17px; }
        #hv3 .h3-faq-q i { width: 30px; height: 30px; border-radius: 50%; border: 1px solid var(--line-strong); display: inline-flex; align-items: center; justify-content: center; transition: transform .25s, background .2s; flex-shrink: 0; color: var(--muted); }
        #hv3 .h3-faq-item.is-open .h3-faq-q i { transform: rotate(45deg); background: var(--neon); color: #04060E; border-color: transparent; }
        #hv3 .h3-faq-a { max-height: 0; overflow: hidden; transition: max-height .35s ease; }
        #hv3 .h3-faq-item.is-open .h3-faq-a { max-height: 260px; }
        #hv3 .h3-faq-a p { margin: 0 0 22px; color: var(--muted); font-size: 15.5px; line-height: 1.6; }

        /* final */
        #hv3 .h3-final { position: relative; overflow: hidden; border-radius: var(--r-lg); padding: 72px 40px; text-align: center; border: 1px solid var(--line-strong);
          background: radial-gradient(70% 90% at 80% 0%, rgba(168,85,247,.35), transparent 60%), radial-gradient(50% 70% at 10% 100%, rgba(37,245,138,.22), transparent 60%), linear-gradient(160deg, var(--surface-2), #070C22); }
        #hv3 .h3-final h2 { margin: 0; }
        #hv3 .h3-final p { color: var(--muted); font-size: 17px; margin: 16px auto 0; max-width: 560px; }
        #hv3 .h3-final .h3-cta-row { margin-top: 30px; }

        /* footer */
        #hv3 .h3-footer { position: relative; z-index: 1; padding: 56px 0 28px; border-top: 1px solid var(--line); background: rgba(5,7,15,.6); }
        #hv3 .h3-footer-grid { display: grid; grid-template-columns: 1.6fr 1fr 1fr 1fr; gap: 32px; }
        #hv3 .h3-footer-logo { height: 32px; width: auto; }
        #hv3 .h3-footer p { color: var(--muted-2); font-size: 14px; margin-top: 12px; max-width: 260px; }
        #hv3 .h3-footer h4 { margin: 0 0 12px; font-size: 12px; letter-spacing: .12em; text-transform: uppercase; color: var(--muted-2); }
        #hv3 .h3-footer-grid a { display: block; font-size: 15px; padding: 5px 0; color: var(--muted); }
        #hv3 .h3-footer-grid a:hover { color: var(--text); }
        #hv3 .h3-footer-bottom { margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--line); color: var(--muted-2); font-size: 13px; }

        @media (max-width: 980px) {
          #hv3 .h3-links, #hv3 .h3-nav-cta .h3-btn-ghost { display: none; } #hv3 .h3-burger { display: inline-flex; }
          #hv3 .h3-grid4 { grid-template-columns: repeat(2, 1fr); } #hv3 .h3-grid3 { grid-template-columns: 1fr; }
          #hv3 .h3-showcase { grid-template-columns: 1fr; padding: 24px 20px 0; }
          #hv3 .h3-split { grid-template-columns: 1fr; gap: 32px; } #hv3 .h3-split-rev > :first-child { order: 1; }
          #hv3 .h3-footer-grid { grid-template-columns: 1fr 1fr; }
          #hv3 .h3-sec { padding: 72px 0; } #hv3 .h3-hero { padding-top: 52px; }
          #hv3 .h3-announce-in { font-size: 12.5px; }
        }
        @media (max-width: 560px) {
          #hv3 .h3-grid4, #hv3 .h3-footer-grid { grid-template-columns: 1fr; }
          #hv3 .h3-panel { border-radius: 22px; padding: 16px 12px 0; }
          #hv3 .h3-tab-lbl { display: none; } #hv3 .h3-tab { padding: 6px; }
          #hv3 .h3-showcase-media img { height: 220px; }
          #hv3 .h3-nav-cta .h3-btn-neon { display: none; }
          #hv3 .h3-announce .h3-btn { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          #hv3 [data-rv] { opacity: 1 !important; transform: none !important; }
          #hv3 .h3-veil, #hv3 .h3-orb, #hv3 .h3-spark, #hv3 .h3-sphere, #hv3 .h3-card::before, #hv3 .h3-marquee-track { animation: none !important; }
          #hv3 .h3-bub { opacity: 1; animation: none; }
        }
      `}</style>
    </>
  )
}
