import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import { URLS } from '../lib/config'

/* ─────────────────────────────────────────────────────────────
   Unbox · Home v2 — direção visual "Calendly": claro, editorial,
   painéis arredondados, tabs de produto, accordions auto-avançados.
   Página self-contained (nav + footer próprios), escopo #hv2 / hv-*.
   ───────────────────────────────────────────────────────────── */

const V = '?v=r26'

const TABS = [
  { key: 'loja', label: 'Loja', icon: 'layout', tint: 'sky',
    title: 'Sua loja, do seu jeito. Sem template.',
    body: 'Layouts 100% customizáveis, mobile-first, com SEO e performance de ponta. A vitrine que a sua marca merece, pronta para vender.',
    img: '/img/loja-olea.png', alt: 'Loja Olea rodando na Unbox' },
  { key: 'checkout', label: 'Checkout', icon: 'bolt', tint: 'lime',
    title: 'Checkout em modo TURBO.',
    body: '3 etapas, sem redirecionamento, sem fricção. Pix, cartão e boleto no mesmo fluxo, com aprovação alta e recuperação de carrinho nativa.',
    img: '/img/checkout-dash.png', alt: 'Checkout TURBO da Unbox' },
  { key: 'assinatura', label: 'Assinatura', icon: 'repeat', tint: 'lavender',
    title: 'Recorrência que nasce com a loja.',
    body: 'Assinatura 100% nativa, da página de produto ao checkout. Seu cliente pausa, troca e gerencia sozinho. Você acompanha churn e MRR.',
    img: '/img/assinatura2.png', alt: 'Assinatura nativa no carrinho' },
  { key: 'pay', label: 'Unbox Pay', icon: 'card', tint: 'mint',
    title: 'Pagamento e capital no mesmo lugar.',
    body: 'Gateway próprio com 98% de aprovação e antifraude por AI. Crédito de até R$ 500k amortizado pelas suas próprias vendas.',
    img: '/img/feat-layout-admin.png', alt: 'Painel administrativo da Unbox' },
]

const PILLARS = [
  { tint: 'sky', title: 'Vender', body: 'Loja customizada, mobile-first e rápida. Promoções, bundles e cupons para elevar o ticket.', items: ['Layouts 100% customizáveis', 'Promoções e bundles', 'SEO e performance'] },
  { tint: 'lime', title: 'Converter', body: 'Checkout TURBO em 3 etapas, sem redirecionamento. Menos abandono, mais aprovação.', items: ['Checkout em 3 etapas', 'Pix, cartão e boleto', 'Recuperação de carrinho'] },
  { tint: 'lavender', title: 'Reter', body: 'Assinatura nativa e dados de recorrência para vender de novo para o mesmo cliente.', items: ['Assinatura 100% nativa', 'Churn e MRR à vista', 'Reengajamento'] },
  { tint: 'mint', title: 'Crescer', body: 'Unbox Pay com crédito, rede de creators paga por performance e AI operando o dia a dia.', items: ['Crédito até R$ 500k', 'Creators por performance', 'AI First'] },
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
  { name: 'Bhava', seg: 'Wellness' },
  { name: 'Olea', seg: 'Alimentos' },
  { name: 'Popai', seg: 'Wellness' },
  { name: 'Vista Perê', seg: 'Moda' },
  { name: 'diCapri', seg: 'Bebidas' },
  { name: 'Glow', seg: 'Colágeno' },
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
    case 'users': return <svg {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13A4 4 0 0 1 16 11" /></svg>
    case 'arrow': return <svg {...p}><path d="M7 17 17 7M8 7h9v9" /></svg>
    case 'check': return <svg {...p}><path d="m5 12 4 4L19 6" /></svg>
    case 'plus': return <svg {...p}><path d="M12 5v14M5 12h14" /></svg>
    default: return null
  }
}

function Logo({ dark = true }) {
  return (
    <a href="/" className="hv-logo" aria-label="Unbox">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={'/img/simbolo-unbox.png' + V} alt="" />
      <span style={{ color: dark ? '#16161C' : '#fff' }}>unbox</span>
    </a>
  )
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
    <div className="hv-metric">
      <div className="hv-metric-n">{m.prefix}{shown}<span>{m.suffix}</span></div>
      <div className="hv-metric-l">{m.label}</div>
    </div>
  )
}

export default function HomeV2() {
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

  // nav shadow
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  // reveal on scroll + metrics trigger
  useEffect(() => {
    const els = document.querySelectorAll('#hv2 [data-rv]')
    if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('hv-in')); setMetricsOn(true); return }
    const io = new IntersectionObserver((es) => es.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('hv-in'); io.unobserve(en.target) }
    }), { threshold: 0.14 })
    els.forEach((e) => io.observe(e))
    let mo
    if (metricsRef.current) {
      mo = new IntersectionObserver((es) => { if (es[0].isIntersecting) { setMetricsOn(true); mo.disconnect() } }, { threshold: 0.2 })
      mo.observe(metricsRef.current)
    }
    // fallback: nunca deixar os números zerados (ex.: observer não dispara)
    const fb = setTimeout(() => setMetricsOn(true), 1800)
    return () => { io.disconnect(); mo && mo.disconnect(); clearTimeout(fb) }
  }, [])

  // auto-advance tabs (6s) with progress
  useEffect(() => {
    const dur = 6000; let t0 = performance.now(); let raf
    const tick = (t) => {
      if (!pausedTab.current) {
        const k = (t - t0) / dur
        if (k >= 1) { setTab((i) => (i + 1) % TABS.length); t0 = t; setTabProg(0) } else setTabProg(k)
      } else t0 = t - tabProg * dur
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab])

  // auto-advance features (5s)
  useEffect(() => {
    const dur = 5000; let t0 = performance.now(); let raf
    const tick = (t) => {
      if (!pausedFeat.current) {
        const k = (t - t0) / dur
        if (k >= 1) { setFeat((i) => (i + 1) % FEATURES.length); t0 = t; setFeatProg(0) } else setFeatProg(k)
      } else t0 = t - featProg * dur
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
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

      <div id="hv2">
        {/* announcement */}
        <a className="hv-announce" href="/ai-unbox">
          <span className="hv-announce-dot" /> Unbox AI Foundry: crie, opere e escale seu e-commerce com AI. <b>Entrar na lista →</b>
        </a>

        {/* nav */}
        <header className={'hv-nav' + (scrolled ? ' is-scrolled' : '')}>
          <div className="hv-wrap hv-nav-in">
            <Logo />
            <nav className="hv-links">
              <a href="/recursos">Produto</a>
              <a href="/industrias">Soluções</a>
              <a href="/blog">Recursos</a>
              <a href="/credito">Crédito</a>
            </nav>
            <div className="hv-nav-cta">
              <a href={URLS.login} className="hv-btn hv-btn-ghost">Login</a>
              <a href={URLS.demo} className="hv-btn hv-btn-dark">Agendar demo</a>
              <button className="hv-burger" aria-label="Menu" onClick={() => setMenu((v) => !v)}><span /><span /><span /></button>
            </div>
          </div>
          {menu && (
            <div className="hv-sheet">
              <a href="/recursos">Produto</a><a href="/industrias">Soluções</a><a href="/blog">Recursos</a><a href="/credito">Crédito</a>
              <a href={URLS.demo} className="hv-btn hv-btn-dark">Agendar demo</a>
            </div>
          )}
        </header>

        {/* hero */}
        <section className="hv-hero">
          <div className="hv-wrap">
            <div className="hv-hero-copy" data-rv>
              <h1>Você faz a marca.<br />A Unbox faz a venda.</h1>
              <p className="hv-lead">
                A camada de vendas AI-native para sua marca escalar no digital. Loja, checkout, assinatura,
                pagamento e crescimento — tudo em um só lugar, conectado com suas ferramentas de AI.
              </p>
              <div className="hv-cta-row">
                <a href={URLS.demo} className="hv-btn hv-btn-dark hv-btn-lg">Agendar demo</a>
                <a href={URLS.signup} className="hv-btn hv-btn-white hv-btn-lg">Comece agora</a>
              </div>
              <p className="hv-micro">Migração assistida pela equipe · Sem taxa de setup · Suporte humano</p>
            </div>

            {/* showcase panel */}
            <div data-rv>
            <div className={'hv-panel tint-' + T.tint} onMouseEnter={() => { pausedTab.current = true }} onMouseLeave={() => { pausedTab.current = false }}>
              <div className="hv-tabs" role="tablist">
                {TABS.map((t, i) => (
                  <button key={t.key} role="tab" aria-selected={i === tab} className={'hv-tab' + (i === tab ? ' is-on' : '')} onClick={() => { setTab(i); setTabProg(0) }}>
                    <span className="hv-tab-ico"><Icon name={t.icon} /></span>
                    <span className="hv-tab-lbl">{t.label}</span>
                    {i === tab && <i className="hv-tab-prog" style={{ transform: `scaleX(${tabProg})` }} />}
                  </button>
                ))}
              </div>
              <div className="hv-showcase" key={T.key}>
                <div className="hv-showcase-copy">
                  <span className="hv-chip"><Icon name={T.icon} size={14} /> {T.label}</span>
                  <h3>{T.title}</h3>
                  <p>{T.body}</p>
                  <a href="/recursos" className="hv-textlink">Saiba mais <Icon name="arrow" size={16} /></a>
                </div>
                <div className="hv-showcase-media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={T.img} alt={T.alt} />
                </div>
              </div>
            </div>
            </div>
          </div>
        </section>

        {/* brands marquee */}
        <section className="hv-brands" data-rv>
          <p className="hv-brands-l">Marcas que já vendem todo dia com a Unbox</p>
          <div className="hv-marquee"><div className="hv-marquee-track">
            {[...BRANDS, ...BRANDS].map((b, i) => (
              <span className="hv-brand" key={i}>
                {b.logo ? /* eslint-disable-next-line @next/next/no-img-element */ <img src={b.logo} alt={b.name} /> : <b>{b.name}</b>}
                <em>{b.seg}</em>
              </span>
            ))}
          </div></div>
        </section>

        {/* metrics */}
        <section className="hv-sec hv-metrics" ref={metricsRef}>
          <div className="hv-wrap hv-metrics-grid" data-rv>
            {METRICS.map((m) => <Metric key={m.label} m={m} run={metricsOn} />)}
          </div>
        </section>

        {/* pillars */}
        <section className="hv-sec">
          <div className="hv-wrap">
            <div className="hv-head center" data-rv>
              <span className="hv-eye">A PLATAFORMA</span>
              <h2>Feita para marcas que vendem todo dia.</h2>
              <p>Vender, converter, reter e crescer costumam ser quatro ferramentas diferentes. Na Unbox, é uma operação só — nativa, integrada e pronta para escalar.</p>
              <a href={URLS.demo} className="hv-btn hv-btn-dark">Agendar demo</a>
            </div>
            <div className="hv-pillars">
              {PILLARS.map((p, i) => (
                <div className={'hv-pillar tint-' + p.tint} data-rv style={{ transitionDelay: `${i * 70}ms` }} key={p.title}>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                  <ul>{p.items.map((it) => <li key={it}><Icon name="check" size={14} />{it}</li>)}</ul>
                  <div className="hv-pillar-blob" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* features accordion */}
        <section className="hv-sec hv-sec-alt">
          <div className="hv-wrap hv-split">
            <div className="hv-split-copy" onMouseEnter={() => { pausedFeat.current = true }} onMouseLeave={() => { pausedFeat.current = false }}>
              <span className="hv-chip"><Icon name="layout" size={14} /> E-commerce</span>
              <h2 data-rv>Uma plataforma, tudo que você precisa.</h2>
              <div className="hv-acc" data-rv>
                {FEATURES.map((f, i) => (
                  <div className={'hv-acc-item' + (i === feat ? ' is-on' : '')} key={f.title}>
                    <button className="hv-acc-q" onClick={() => { setFeat(i); setFeatProg(0) }}>
                      <span className="hv-acc-ico"><Icon name={f.icon} /></span>
                      <span className="hv-acc-t">{f.title}</span>
                      <span className="hv-acc-arrow"><Icon name="arrow" size={14} /></span>
                    </button>
                    <div className="hv-acc-a"><p>{f.body}</p></div>
                    {i === feat && <i className="hv-acc-prog" style={{ transform: `scaleX(${featProg})` }} />}
                  </div>
                ))}
              </div>
            </div>
            <div data-rv>
              <div className="hv-split-media hv-media-frame tint-sky" key={FEATURES[feat].img}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={FEATURES[feat].img} alt={FEATURES[feat].title} />
              </div>
            </div>
          </div>
        </section>

        {/* Unbox Pay — media left */}
        <section className="hv-sec">
          <div className="hv-wrap hv-split hv-split-rev">
            <div className="hv-split-media hv-media-frame tint-mint" data-rv>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/checkout-dash.png" alt="Unbox Pay" />
            </div>
            <div className="hv-split-copy">
              <span className="hv-chip"><Icon name="card" size={14} /> Unbox Pay</span>
              <h2 data-rv>Pagamento, crédito e caixa. Sem banco no meio.</h2>
              <ul className="hv-list" data-rv>
                <li><Icon name="shield" /> <div><b>Antifraude por AI</b><span>98% de aprovação com o risco sob controle.</span></div></li>
                <li><Icon name="card" /> <div><b>Crédito de até R$ 500k</b><span>Amortizado pelas suas próprias vendas. Sem garantia, sem equity.</span></div></li>
                <li><Icon name="bolt" /> <div><b>Pix, cartão e boleto</b><span>Em até 12×, com taxas competitivas e liquidez rápida.</span></div></li>
              </ul>
              <a href="/credito" className="hv-textlink" data-rv>Conhecer o Unbox Pay <Icon name="arrow" size={16} /></a>
            </div>
          </div>
        </section>

        {/* AI First — media right */}
        <section className="hv-sec hv-sec-alt">
          <div className="hv-wrap hv-split">
            <div className="hv-split-copy">
              <span className="hv-chip"><Icon name="sparkle" size={14} /> AI First <em className="hv-new">Novo</em></span>
              <h2 data-rv>Crie, opere e escale seu e-commerce com AI.</h2>
              <ul className="hv-list" data-rv>
                <li><Icon name="sparkle" /> <div><b>Loja gerada por AI</b><span>De um prompt, foto ou Figma para uma loja real, com checkout.</span></div></li>
                <li><Icon name="bolt" /> <div><b>MCP nativo da Unbox</b><span>Sua AI conectada à loja: catálogo, campanhas e operação por texto.</span></div></li>
                <li><Icon name="chart" /> <div><b>Agentes de crescimento</b><span>Preço, campanha, risco de cancelamento e reengajamento — rodando por você.</span></div></li>
              </ul>
              <a href="/ai-unbox" className="hv-btn hv-btn-dark" data-rv>Entrar na lista de espera</a>
            </div>
            <div className="hv-split-media hv-ai-card tint-lavender" data-rv>
              <div className="hv-ai-chat">
                <div className="hv-bub u">cria um cupom de 10% pra primeira compra</div>
                <div className="hv-bub a"><Icon name="check" size={14} /> Cupom <b>PRIMEIRA10</b> criado e no ar.</div>
                <div className="hv-bub u">e frete grátis acima de R$ 199</div>
                <div className="hv-bub a"><Icon name="check" size={14} /> Regra de frete ativada em produção.</div>
              </div>
            </div>
          </div>
        </section>

        {/* results */}
        <section className="hv-sec">
          <div className="hv-wrap">
            <div className="hv-head center" data-rv>
              <span className="hv-eye">RESULTADOS</span>
              <h2>Marcas reais. Resultados reais.</h2>
            </div>
            <div className="hv-results" data-rv>
              <div className="hv-result tint-lime"><b>96 / 100</b><span>Performance no Lighthouse, com 100 em SEO, acessibilidade e boas práticas.</span></div>
              <div className="hv-result tint-sky"><b>+5,9×</b><span>Crescimento médio de vendas das marcas que migraram para a Unbox.</span></div>
              <div className="hv-result tint-lavender"><b>4×</b><span>Mais conversão no site com checkout TURBO e loja mobile-first.</span></div>
              <div className="hv-result tint-mint"><b>98%</b><span>De aprovação no Unbox Pay, com antifraude por AI.</span></div>
            </div>
          </div>
        </section>

        {/* migration */}
        <section className="hv-sec hv-sec-alt">
          <div className="hv-wrap">
            <div className="hv-head" data-rv>
              <span className="hv-eye">MIGRAÇÃO</span>
              <h2>Migrar é mais simples do que você imagina.</h2>
              <p>Saindo de qualquer plataforma. Nossa equipe cuida da migração com você — sem perder SEO, histórico ou vendas.</p>
            </div>
            <div className="hv-steps">
              {STEPS.map((s, i) => (
                <div className="hv-step" data-rv style={{ transitionDelay: `${i * 80}ms` }} key={s.n}>
                  <span className="hv-step-n">{s.n}</span><h3>{s.title}</h3><p>{s.body}</p>
                </div>
              ))}
            </div>
            <div className="hv-platforms" data-rv>
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
        <section className="hv-sec">
          <div className="hv-wrap hv-narrow">
            <div className="hv-head" data-rv>
              <span className="hv-eye">DÚVIDAS</span>
              <h2>Tudo que você precisa saber.</h2>
            </div>
            <div className="hv-faq" data-rv>
              {FAQ.map((f, i) => (
                <div className={'hv-faq-item' + (faq === i ? ' is-open' : '')} key={i}>
                  <button className="hv-faq-q" onClick={() => setFaq(faq === i ? -1 : i)}><span>{f.q}</span><i><Icon name="plus" size={16} /></i></button>
                  <div className="hv-faq-a"><p>{f.a}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* final cta */}
        <section className="hv-sec hv-final-wrap">
          <div className="hv-wrap">
            <div className="hv-final" data-rv>
              <h2>Vamos dar o primeiro passo?</h2>
              <p>Demo e diagnóstico gratuito da sua operação. Sem compromisso, sem taxa de setup.</p>
              <div className="hv-cta-row">
                <a href={URLS.demo} className="hv-btn hv-btn-white hv-btn-lg">Agendar demo</a>
                <a href={URLS.whatsapp} className="hv-btn hv-btn-ghost-light hv-btn-lg">Falar no WhatsApp</a>
              </div>
            </div>
          </div>
        </section>

        {/* footer */}
        <footer className="hv-footer">
          <div className="hv-wrap hv-footer-grid">
            <div className="hv-footer-brand">
              <Logo />
              <p>E-commerce D2C para marcas de alto crescimento.</p>
            </div>
            <div><h4>Produto</h4><a href="/recursos">Recursos</a><a href="/checkout">Turbo Checkout</a><a href="/assinatura">Assinatura</a><a href="/afiliados">Afiliados</a></div>
            <div><h4>Soluções</h4><a href="/credito">Crédito para marcas</a><a href="/industrias">Para indústrias</a><a href="/ai-unbox">AI Foundry</a></div>
            <div><h4>Empresa</h4><a href="/blog">Blog</a><a href="/carreiras">Carreiras</a><a href={URLS.whatsapp}>Contato</a></div>
          </div>
          <div className="hv-wrap hv-footer-bottom"><span>© {new Date().getFullYear()} Unbox. Todos os direitos reservados.</span></div>
        </footer>
      </div>

      <style jsx global>{`
        html, body { margin: 0; background: #FBFAF6; }
        #hv2 {
          --bg: #FBFAF6; --ink: #16161C; --ink-2: #4A4A55; --mut: #7A7A86; --line: rgba(22,22,28,.09);
          --roxo: #8F28F6; --roxo-2: #5612AB; --verde: #39FF14;
          --sky: #E6F0FF; --sky-2: #C3DFFE; --lime: #F1FBDF; --lime-2: #DBEE9F; --lavender: #EEE6FF; --lavender-2: #D4C2FF; --mint: #E4FAF3; --mint-2: #BAF0EC;
          font-family: 'Sora', system-ui, -apple-system, sans-serif; color: var(--ink); background: var(--bg);
          -webkit-font-smoothing: antialiased; line-height: 1.5; overflow-x: hidden;
        }
        #hv2 *, #hv2 *::before, #hv2 *::after { box-sizing: border-box; }
        #hv2 a { color: inherit; text-decoration: none; }
        #hv2 .hv-wrap { max-width: 1180px; margin: 0 auto; padding: 0 24px; }
        #hv2 .hv-narrow { max-width: 820px; }
        #hv2 [data-rv] { opacity: 0; transform: translateY(16px); transition: opacity .7s ease, transform .7s cubic-bezier(.2,.7,.2,1); }
        #hv2 [data-rv].hv-in { opacity: 1; transform: none; }

        /* tints */
        #hv2 .tint-sky { --t: var(--sky); --t2: var(--sky-2); } #hv2 .tint-lime { --t: var(--lime); --t2: var(--lime-2); }
        #hv2 .tint-lavender { --t: var(--lavender); --t2: var(--lavender-2); } #hv2 .tint-mint { --t: var(--mint); --t2: var(--mint-2); }

        /* buttons */
        #hv2 .hv-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; font-weight: 600; font-size: 15px; border-radius: 12px; padding: 12px 20px; border: 1px solid transparent; transition: transform .15s ease, box-shadow .2s, background .2s, border-color .2s; white-space: nowrap; cursor: pointer; font-family: inherit; }
        #hv2 .hv-btn-lg { padding: 16px 26px; font-size: 16px; border-radius: 14px; }
        #hv2 .hv-btn-dark { background: var(--ink); color: #fff; }
        #hv2 .hv-btn-dark:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(22,22,28,.22); }
        #hv2 .hv-btn-white { background: #fff; color: var(--ink); border-color: var(--line); }
        #hv2 .hv-btn-white:hover { border-color: rgba(22,22,28,.25); transform: translateY(-2px); }
        #hv2 .hv-btn-ghost { background: transparent; color: var(--ink); }
        #hv2 .hv-btn-ghost:hover { background: rgba(22,22,28,.05); }
        #hv2 .hv-btn-ghost-light { background: rgba(255,255,255,.12); color: #fff; border-color: rgba(255,255,255,.28); }
        #hv2 .hv-btn-ghost-light:hover { background: rgba(255,255,255,.2); }
        #hv2 .hv-textlink { display: inline-flex; align-items: center; gap: 6px; font-weight: 600; color: var(--roxo-2); }
        #hv2 .hv-textlink:hover { gap: 10px; }

        /* announce + nav */
        #hv2 .hv-announce { display: flex; align-items: center; justify-content: center; gap: 8px; background: var(--lavender); color: var(--ink); font-size: 13.5px; padding: 9px 16px; text-align: center; }
        #hv2 .hv-announce b { font-weight: 600; color: var(--roxo-2); }
        #hv2 .hv-announce-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--roxo); box-shadow: 0 0 0 3px rgba(143,40,246,.18); }
        #hv2 .hv-nav { position: sticky; top: 0; z-index: 50; background: rgba(251,250,246,.86); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border-bottom: 1px solid transparent; transition: border-color .2s, box-shadow .2s; }
        #hv2 .hv-nav.is-scrolled { border-bottom-color: var(--line); box-shadow: 0 6px 24px rgba(22,22,28,.05); }
        #hv2 .hv-nav-in { display: flex; align-items: center; justify-content: space-between; height: 72px; gap: 24px; }
        #hv2 .hv-logo { display: inline-flex; align-items: center; gap: 8px; font-weight: 700; font-size: 24px; letter-spacing: -.03em; }
        #hv2 .hv-logo img { width: 30px; height: 30px; object-fit: contain; }
        #hv2 .hv-links { display: flex; gap: 28px; font-weight: 500; font-size: 15px; color: var(--ink-2); }
        #hv2 .hv-links a:hover { color: var(--ink); }
        #hv2 .hv-nav-cta { display: flex; align-items: center; gap: 8px; }
        #hv2 .hv-burger { display: none; width: 40px; height: 40px; border: 1px solid var(--line); border-radius: 10px; background: #fff; flex-direction: column; justify-content: center; gap: 4px; align-items: center; cursor: pointer; }
        #hv2 .hv-burger span { width: 16px; height: 2px; background: var(--ink); border-radius: 2px; }
        #hv2 .hv-sheet { display: flex; flex-direction: column; gap: 6px; padding: 12px 24px 20px; border-top: 1px solid var(--line); background: var(--bg); }
        #hv2 .hv-sheet a { padding: 10px 0; font-weight: 500; }
        #hv2 .hv-sheet .hv-btn { margin-top: 8px; }

        /* hero */
        #hv2 .hv-hero { padding: 84px 0 40px; }
        #hv2 .hv-hero-copy { text-align: center; max-width: 860px; margin: 0 auto 44px; }
        #hv2 h1 { font-size: clamp(40px, 6.4vw, 76px); font-weight: 700; letter-spacing: -.04em; line-height: 1.02; margin: 0 0 22px; }
        #hv2 .hv-lead { font-size: clamp(17px, 1.6vw, 20px); color: var(--ink-2); line-height: 1.55; max-width: 680px; margin: 0 auto; }
        #hv2 .hv-cta-row { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 30px; }
        #hv2 .hv-micro { font-size: 13px; color: var(--mut); margin-top: 16px; }

        /* showcase panel */
        #hv2 .hv-panel { border-radius: 32px; padding: 28px 28px 0; background: linear-gradient(180deg, var(--t2), var(--t) 60%, #fff 140%); transition: background .6s ease; box-shadow: inset 0 1px 0 rgba(255,255,255,.6); }
        #hv2 .hv-tabs { display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; margin-bottom: 26px; }
        #hv2 .hv-tab { position: relative; display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,.55); border: 1px solid rgba(255,255,255,.7); color: var(--ink-2); border-radius: 999px; padding: 10px 16px 10px 10px; font-family: inherit; font-weight: 600; font-size: 14px; cursor: pointer; overflow: hidden; transition: background .2s, color .2s, box-shadow .2s; }
        #hv2 .hv-tab.is-on { background: #fff; color: var(--ink); box-shadow: 0 8px 22px rgba(22,22,28,.08); }
        #hv2 .hv-tab-ico { width: 30px; height: 30px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; background: var(--t); color: var(--ink); }
        #hv2 .hv-tab.is-on .hv-tab-ico { background: var(--ink); color: #fff; }
        #hv2 .hv-tab-prog { position: absolute; left: 0; bottom: 0; height: 2px; width: 100%; background: var(--ink); transform-origin: left; }
        #hv2 .hv-showcase { display: grid; grid-template-columns: .9fr 1.1fr; gap: 28px; background: #fff; border-radius: 24px 24px 0 0; padding: 36px 36px 0; align-items: center; animation: hvfade .5s ease; }
        @keyframes hvfade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        #hv2 .hv-showcase-copy h3 { font-size: clamp(24px, 2.6vw, 34px); font-weight: 700; letter-spacing: -.03em; line-height: 1.1; margin: 14px 0 12px; }
        #hv2 .hv-showcase-copy p { color: var(--ink-2); font-size: 16px; line-height: 1.6; margin: 0 0 18px; }
        #hv2 .hv-showcase-media { align-self: end; border-radius: 16px 16px 0 0; overflow: hidden; background: var(--t); padding: 16px 16px 0; }
        #hv2 .hv-showcase-media img { display: block; width: 100%; height: 340px; object-fit: cover; object-position: top; border-radius: 12px 12px 0 0; box-shadow: 0 -10px 40px rgba(22,22,28,.12); }
        #hv2 .hv-chip { display: inline-flex; align-items: center; gap: 7px; font-size: 13px; font-weight: 600; color: var(--ink); background: var(--t, var(--sky)); border-radius: 999px; padding: 6px 12px 6px 9px; }
        #hv2 .hv-new { font-style: normal; font-size: 11px; background: var(--ink); color: #fff; border-radius: 999px; padding: 2px 8px; margin-left: 2px; }

        /* brands */
        #hv2 .hv-brands { padding: 56px 0 8px; text-align: center; }
        #hv2 .hv-brands-l { font-size: 13px; color: var(--mut); margin: 0 0 22px; letter-spacing: .02em; }
        #hv2 .hv-marquee { overflow: hidden; mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); }
        #hv2 .hv-marquee-track { display: flex; gap: 56px; width: max-content; animation: hvmarq 38s linear infinite; }
        #hv2 .hv-marquee:hover .hv-marquee-track { animation-play-state: paused; }
        @keyframes hvmarq { to { transform: translateX(-50%); } }
        #hv2 .hv-brand { display: inline-flex; flex-direction: column; align-items: center; gap: 4px; color: var(--ink-2); }
        #hv2 .hv-brand img { height: 26px; width: auto; filter: brightness(0) opacity(.75); }
        #hv2 .hv-brand b { font-weight: 700; font-size: 20px; letter-spacing: -.02em; opacity: .8; }
        #hv2 .hv-brand em { font-style: normal; font-size: 11px; color: var(--mut); }

        /* metrics */
        #hv2 .hv-sec { padding: 96px 0; }
        #hv2 .hv-sec-alt { background: #fff; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
        #hv2 .hv-metrics { padding: 40px 0 72px; }
        #hv2 .hv-metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        #hv2 .hv-metric { background: #fff; border: 1px solid var(--line); border-radius: 20px; padding: 26px 24px; }
        #hv2 .hv-metric-n { font-size: clamp(34px, 3.6vw, 46px); font-weight: 700; letter-spacing: -.04em; line-height: 1; }
        #hv2 .hv-metric-n span { font-size: .6em; color: var(--roxo); margin-left: 2px; }
        #hv2 .hv-metric-l { color: var(--mut); font-size: 14px; margin-top: 10px; }

        /* heads */
        #hv2 .hv-head { max-width: 760px; margin-bottom: 44px; }
        #hv2 .hv-head.center { margin-left: auto; margin-right: auto; text-align: center; }
        #hv2 .hv-eye { font-size: 12px; font-weight: 700; letter-spacing: .18em; color: var(--roxo-2); }
        #hv2 h2 { font-size: clamp(30px, 4.2vw, 52px); font-weight: 700; letter-spacing: -.04em; line-height: 1.06; margin: 14px 0 0; }
        #hv2 .hv-head p { color: var(--ink-2); font-size: 17px; line-height: 1.6; margin: 18px 0 0; }
        #hv2 .hv-head .hv-btn { margin-top: 26px; }

        /* pillars */
        #hv2 .hv-pillars { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        #hv2 .hv-pillar { position: relative; overflow: hidden; background: #fff; border: 1px solid var(--line); border-radius: 22px; padding: 26px 24px 130px; transition: transform .2s, box-shadow .2s; }
        #hv2 .hv-pillar:hover { transform: translateY(-4px); box-shadow: 0 18px 40px rgba(22,22,28,.08); }
        #hv2 .hv-pillar h3 { font-size: 22px; font-weight: 700; letter-spacing: -.02em; margin: 0 0 8px; }
        #hv2 .hv-pillar p { color: var(--ink-2); font-size: 14.5px; line-height: 1.55; margin: 0 0 14px; }
        #hv2 .hv-pillar ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 7px; }
        #hv2 .hv-pillar li { display: flex; align-items: center; gap: 8px; font-size: 13.5px; color: var(--ink-2); }
        #hv2 .hv-pillar li svg { color: var(--roxo); flex-shrink: 0; }
        #hv2 .hv-pillar-blob { position: absolute; left: -10%; right: -10%; bottom: -70px; height: 190px; border-radius: 50% 50% 0 0; background: radial-gradient(60% 80% at 50% 100%, var(--t2), var(--t) 60%, transparent 100%); opacity: .9; }

        /* split */
        #hv2 .hv-split { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
        #hv2 .hv-split-rev .hv-split-media { order: 0; } #hv2 .hv-split-rev .hv-split-copy { order: 1; }
        #hv2 .hv-split-copy h2 { font-size: clamp(28px, 3.4vw, 42px); margin-top: 16px; }
        #hv2 .hv-media-frame { border-radius: 26px; background: var(--t); padding: 22px; min-height: 420px; display: flex; align-items: center; animation: hvfade .5s ease; }
        #hv2 .hv-media-frame img { width: 100%; height: auto; border-radius: 14px; box-shadow: 0 20px 50px rgba(22,22,28,.14); }
        #hv2 .hv-list { list-style: none; margin: 26px 0 0; padding: 0; }
        #hv2 .hv-list li { display: flex; gap: 14px; padding: 16px 0; border-top: 1px solid var(--line); }
        #hv2 .hv-list li:last-child { border-bottom: 1px solid var(--line); }
        #hv2 .hv-list li svg { color: var(--roxo-2); flex-shrink: 0; margin-top: 2px; }
        #hv2 .hv-list b { display: block; font-weight: 600; font-size: 16px; }
        #hv2 .hv-list span { color: var(--ink-2); font-size: 14.5px; line-height: 1.5; }
        #hv2 .hv-split-copy .hv-btn, #hv2 .hv-split-copy .hv-textlink { margin-top: 24px; }

        /* accordion */
        #hv2 .hv-acc { margin-top: 26px; }
        #hv2 .hv-acc-item { position: relative; border-top: 1px solid var(--line); opacity: .45; transition: opacity .3s; }
        #hv2 .hv-acc-item:last-child { border-bottom: 1px solid var(--line); }
        #hv2 .hv-acc-item.is-on { opacity: 1; }
        #hv2 .hv-acc-q { width: 100%; display: flex; align-items: center; gap: 12px; background: none; border: 0; padding: 18px 0; text-align: left; cursor: pointer; font-family: inherit; color: var(--ink); }
        #hv2 .hv-acc-ico { width: 34px; height: 34px; border-radius: 10px; background: var(--sky); display: inline-flex; align-items: center; justify-content: center; color: var(--ink); flex-shrink: 0; }
        #hv2 .hv-acc-t { font-weight: 600; font-size: 17px; flex: 1; }
        #hv2 .hv-acc-arrow { width: 30px; height: 30px; border-radius: 8px; background: rgba(22,22,28,.05); display: inline-flex; align-items: center; justify-content: center; color: var(--ink-2); }
        #hv2 .hv-acc-a { max-height: 0; overflow: hidden; transition: max-height .35s ease; }
        #hv2 .hv-acc-item.is-on .hv-acc-a { max-height: 140px; }
        #hv2 .hv-acc-a p { margin: 0 0 18px 46px; color: var(--ink-2); font-size: 15px; line-height: 1.55; }
        #hv2 .hv-acc-prog { position: absolute; left: 0; bottom: -1px; height: 2px; width: 100%; background: var(--roxo); transform-origin: left; }

        /* ai card */
        #hv2 .hv-ai-card { border-radius: 26px; background: var(--t); padding: 34px; min-height: 420px; display: flex; align-items: center; }
        #hv2 .hv-ai-chat { width: 100%; background: #fff; border-radius: 18px; padding: 18px; box-shadow: 0 20px 50px rgba(22,22,28,.12); display: grid; gap: 10px; }
        #hv2 .hv-bub { max-width: 84%; padding: 11px 14px; border-radius: 14px; font-size: 14.5px; line-height: 1.4; opacity: 0; transform: translateY(6px); animation: hvbub .45s ease forwards; }
        #hv2 .hv-bub.u { margin-left: auto; background: var(--ink); color: #fff; border-bottom-right-radius: 4px; }
        #hv2 .hv-bub.a { background: var(--lime); color: var(--ink); border-bottom-left-radius: 4px; display: inline-flex; align-items: center; gap: 6px; }
        #hv2 .hv-bub.a svg { color: #2f9e44; }
        #hv2 .hv-bub:nth-child(1){animation-delay:.2s} #hv2 .hv-bub:nth-child(2){animation-delay:.7s} #hv2 .hv-bub:nth-child(3){animation-delay:1.2s} #hv2 .hv-bub:nth-child(4){animation-delay:1.7s}
        @keyframes hvbub { to { opacity: 1; transform: none; } }

        /* results */
        #hv2 .hv-results { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        #hv2 .hv-result { border-radius: 22px; padding: 28px 24px; background: var(--t); min-height: 200px; display: flex; flex-direction: column; justify-content: space-between; }
        #hv2 .hv-result b { font-size: 40px; font-weight: 700; letter-spacing: -.04em; line-height: 1; }
        #hv2 .hv-result span { color: var(--ink-2); font-size: 14px; line-height: 1.5; }

        /* steps + platforms */
        #hv2 .hv-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        #hv2 .hv-step { background: var(--bg); border: 1px solid var(--line); border-radius: 20px; padding: 26px 24px; }
        #hv2 .hv-step-n { font-size: 12px; font-weight: 700; color: var(--roxo-2); letter-spacing: .12em; }
        #hv2 .hv-step h3 { font-size: 19px; font-weight: 700; letter-spacing: -.02em; margin: 10px 0 8px; }
        #hv2 .hv-step p { color: var(--ink-2); font-size: 14.5px; line-height: 1.55; margin: 0; }
        #hv2 .hv-platforms { display: flex; align-items: center; gap: 28px; flex-wrap: wrap; margin-top: 40px; color: var(--mut); font-size: 14px; }
        #hv2 .hv-platforms img { height: 26px; width: auto; opacity: .85; }

        /* faq */
        #hv2 .hv-faq-item { border-top: 1px solid var(--line); }
        #hv2 .hv-faq-item:last-child { border-bottom: 1px solid var(--line); }
        #hv2 .hv-faq-q { width: 100%; display: flex; justify-content: space-between; align-items: center; gap: 16px; background: none; border: 0; padding: 22px 0; text-align: left; cursor: pointer; font-family: inherit; color: var(--ink); font-weight: 600; font-size: 17px; }
        #hv2 .hv-faq-q i { width: 30px; height: 30px; border-radius: 50%; border: 1px solid var(--line); display: inline-flex; align-items: center; justify-content: center; transition: transform .25s, background .2s; flex-shrink: 0; }
        #hv2 .hv-faq-item.is-open .hv-faq-q i { transform: rotate(45deg); background: var(--ink); color: #fff; border-color: var(--ink); }
        #hv2 .hv-faq-a { max-height: 0; overflow: hidden; transition: max-height .35s ease; }
        #hv2 .hv-faq-item.is-open .hv-faq-a { max-height: 260px; }
        #hv2 .hv-faq-a p { margin: 0 0 22px; color: var(--ink-2); font-size: 15.5px; line-height: 1.6; }

        /* final */
        #hv2 .hv-final-wrap { padding-top: 40px; }
        #hv2 .hv-final { border-radius: 32px; padding: 72px 40px; text-align: center; color: #fff; background: radial-gradient(70% 90% at 80% 0%, rgba(143,40,246,.6), transparent 60%), radial-gradient(50% 70% at 10% 100%, rgba(57,255,20,.22), transparent 60%), var(--ink); }
        #hv2 .hv-final h2 { margin: 0; }
        #hv2 .hv-final p { color: rgba(255,255,255,.72); font-size: 17px; margin: 16px auto 0; max-width: 560px; }
        #hv2 .hv-final .hv-cta-row { margin-top: 30px; }

        /* footer */
        #hv2 .hv-footer { padding: 56px 0 28px; border-top: 1px solid var(--line); }
        #hv2 .hv-footer-grid { display: grid; grid-template-columns: 1.6fr 1fr 1fr 1fr; gap: 32px; }
        #hv2 .hv-footer-brand p { color: var(--mut); font-size: 14px; margin-top: 12px; max-width: 260px; }
        #hv2 .hv-footer h4 { margin: 0 0 12px; font-size: 13px; letter-spacing: .1em; text-transform: uppercase; color: var(--mut); }
        #hv2 .hv-footer-grid a { display: block; font-size: 15px; padding: 5px 0; color: var(--ink-2); }
        #hv2 .hv-footer-grid a:hover { color: var(--ink); }
        #hv2 .hv-footer-bottom { margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--line); color: var(--mut); font-size: 13px; }

        @media (max-width: 980px) {
          #hv2 .hv-links, #hv2 .hv-nav-cta .hv-btn-ghost { display: none; } #hv2 .hv-burger { display: inline-flex; }
          #hv2 .hv-metrics-grid, #hv2 .hv-pillars, #hv2 .hv-results { grid-template-columns: repeat(2, 1fr); }
          #hv2 .hv-showcase { grid-template-columns: 1fr; padding: 26px 22px 0; }
          #hv2 .hv-split { grid-template-columns: 1fr; gap: 32px; }
          #hv2 .hv-split-rev .hv-split-media { order: 1; }
          #hv2 .hv-steps { grid-template-columns: 1fr; }
          #hv2 .hv-footer-grid { grid-template-columns: 1fr 1fr; }
          #hv2 .hv-sec { padding: 72px 0; } #hv2 .hv-hero { padding-top: 56px; }
        }
        @media (max-width: 560px) {
          #hv2 .hv-metrics-grid, #hv2 .hv-pillars, #hv2 .hv-results, #hv2 .hv-footer-grid { grid-template-columns: 1fr; }
          #hv2 .hv-panel { border-radius: 22px; padding: 18px 14px 0; }
          #hv2 .hv-tab-lbl { display: none; } #hv2 .hv-tab { padding: 6px; }
          #hv2 .hv-showcase-media img { height: 220px; }
          #hv2 .hv-nav-cta .hv-btn-dark { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          #hv2 [data-rv] { opacity: 1 !important; transform: none !important; }
          #hv2 .hv-marquee-track { animation: none; } #hv2 .hv-bub { opacity: 1; animation: none; }
        }
      `}</style>
    </>
  )
}
