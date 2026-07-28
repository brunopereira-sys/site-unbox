import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import Nav from '../components/Nav'
import { Footer } from '../components/Closing'

const PILLARS = [
  {
    n: '01',
    tag: 'CRIAR',
    seal: 'Unbox CLI',
    title: 'De ideia a loja no ar.',
    body: 'Você descreve sua marca e seu catálogo. A IA constrói a loja completa: design, produtos, checkout, assinatura. Sem template, sem projeto de semanas.',
  },
  {
    n: '02',
    tag: 'OPERAR',
    seal: 'Unbox MCP',
    title: 'Sua operação por texto.',
    body: 'Preço, estoque, cupom, campanha, assinatura. Em vez de abrir telas, você pede: “cria um cupom de 10% pra quem comprar duas vezes”. Feito, confirmado, em produção.',
    live: true,
  },
  {
    n: '03',
    tag: 'ESCALAR',
    seal: 'CLI + MCP',
    title: 'Agentes que crescem o negócio por você.',
    body: 'Sobre essa base, você (ou sua agência) cria agentes que monitoram a operação, otimizam preço e rodam campanhas continuamente. Seu e-commerce ganha um time que não dorme.',
  },
]

const PROBLEMS = [
  { icon: '⛭', title: 'Operação manual', body: 'Estoque numa tela, cupom em outra, campanha num terceiro lugar. O dia inteiro clicando.' },
  { icon: '⁙', title: 'Dados espalhados', body: 'Exportar planilha pra entender o que vendeu. A resposta existe, mas nunca no mesmo lugar.' },
  { icon: '◷', title: 'Campanha que consome o dia', body: 'Configurar, ajustar, repetir. O tempo que era pra construir marca vira tempo de operação.' },
]

const FAQ = [
  { q: 'Preciso saber de tecnologia pra usar?', a: 'Não. Se você sabe escrever uma mensagem no WhatsApp, sabe operar. A parte técnica é o nosso trabalho.' },
  { q: 'A IA vai fazer coisas sem eu saber?', a: 'Não. Você define o que ela pode executar sozinha e o que precisa da sua aprovação. Tudo fica registrado, e nada irreversível acontece sem você.' },
  { q: 'Preciso já ser cliente Unbox?', a: 'Não. A lista de espera é aberta. Clientes Unbox ativam primeiro, mas quem chega agora entra na frente da fila.' },
  { q: 'Isso substitui minha equipe (ou minha agência)?', a: 'Substitui tarefas repetitivas, não pessoas. Sua equipe para de executar clique e passa a decidir. Agências entregam mais por cliente, não menos.' },
  { q: 'Quanto vai custar?', a: 'Quem está na lista de espera conhece as condições antes de todo mundo, com vantagem de early access. Entrar na lista não custa nada e não compromete a nada.' },
]

const FATURAMENTO = [
  'Até R$ 50 mil/mês',
  'R$ 50 mil a R$ 200 mil/mês',
  'R$ 200 mil a R$ 1 mi/mês',
  'Acima de R$ 1 mi/mês',
  'Prefiro não informar',
]

export default function AiUnboxLP() {
  const [openFaq, setOpenFaq] = useState(-1)
  const [form, setForm] = useState({ nome: '', email: '', perfil: '', faturamento: '' })
  const [status, setStatus] = useState('idle') // idle | sending | done | error
  const formRef = useRef(null)

  const scrollToForm = (perfil) => {
    if (perfil) setForm((f) => ({ ...f, perfil }))
    if (formRef.current) formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!form.nome.trim() || !/.+@.+\..+/.test(form.email)) return
    setStatus('sending')
    try {
      const res = await fetch('/api/ai-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, origem: 'LP /ai-unbox' }),
      })
      setStatus(res.ok ? 'done' : 'error')
    } catch {
      setStatus('error')
    }
  }

  // subtle reveal-on-scroll
  useEffect(() => {
    const els = document.querySelectorAll('#lpai [data-reveal]')
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('aiu-in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('aiu-in'); io.unobserve(en.target) } }),
      { threshold: 0.12 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <Head>
        <title>Unbox AI Foundry — crie, opere e escale seu e-commerce com IA</title>
        <meta name="description" content="Criar, operar e escalar um e-commerce com IA. Descreva a loja e ela nasce pronta; peça e a operação executa; tenha agentes crescendo seu negócio. Entre na lista de espera do Unbox AI Foundry." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Unbox AI Foundry — crie, opere e escale seu e-commerce com IA" />
        <meta property="og:description" content="Você pede. A Unbox executa. Entre na lista de espera." />
        <meta property="og:url" content="https://www.unbox.com.br/ai-unbox" />
        <meta property="og:image" content="https://www.unbox.com.br/img/og-image.png?v=r26" />
        <meta property="og:type" content="website" />
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </Head>

      <Nav />

      <div id="lpai">
        {/* ===== HERO ===== */}
        <header className="aiu-hero">
          <div className="wrap aiu-hero-grid">
            <div className="hero-copy" data-reveal>
              <span className="aiu-eyebrow"><i className="pulse" />UNBOX AI FOUNDRY · LISTA DE ESPERA ABERTA</span>
              <h1>Crie, opere e escale seu <span className="grad">e-commerce com IA</span>.</h1>
              <p className="lead">
                Descrever a loja e ela nascer pronta. Pedir e a operação executar. Ter agentes trabalhando
                pelo seu crescimento todos os dias. É isso que estamos construindo na Unbox — e você pode ser
                dos primeiros a usar.
              </p>
              <div className="cta-row">
                <button className="aiu-btn aiu-btn-primary" onClick={() => scrollToForm('')}>Entrar na lista de espera</button>
              </div>
              <p className="reinforce">Sem custo. Sem compromisso. Acesso por ordem de chegada.</p>
            </div>

            <div className="aiu-hero-visual" data-reveal>
              <div className="chat">
                <div className="chat-head"><span className="dot g" /><span className="dot p" /><span className="chat-title">você · Unbox</span></div>
                <div className="bubble user b1">cria um cupom de 10% pra primeira compra</div>
                <div className="bubble aiu-ai b2">
                  <span className="typing"><i /><i /><i /></span>
                  <span className="ai-text">✓ Cupom <b>PRIMEIRA10</b> criado e no ar.</span>
                </div>
                <div className="bubble user b3">e coloca frete grátis acima de R$199</div>
                <div className="bubble aiu-ai b4"><span className="ai-text">✓ Regra de frete ativada em produção.</span></div>
              </div>
              <div className="glow gp" />
              <div className="glow gg" />
            </div>
          </div>
        </header>

        {/* ===== PROBLEM ===== */}
        <section className="sec">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <span className="kicker">O DIA A DIA</span>
              <h2>Tocar um e-commerce virou um segundo emprego.</h2>
              <p className="sub">
                Ajustar estoque numa tela. Criar cupom em outra. Exportar planilha pra entender o que vendeu.
                Configurar campanha num terceiro lugar. Quem toca uma loja passa o dia operando ferramentas —
                em vez de construir marca.
              </p>
            </div>
            <div className="cards-3">
              {PROBLEMS.map((p, i) => (
                <div className="aiu-card prob" data-reveal style={{ transitionDelay: `${i * 70}ms` }} key={p.title}>
                  <span className="prob-ico">{p.icon}</span>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== PILLARS ===== */}
        <section className="sec pillars-sec">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <span className="kicker">A PLATAFORMA</span>
              <h2>Criar. Operar. Escalar. <span className="grad">Tudo com IA.</span></h2>
            </div>
            <div className="cards-3 pillars">
              {PILLARS.map((p, i) => (
                <div className="aiu-card pillar" data-reveal style={{ transitionDelay: `${i * 80}ms` }} key={p.tag}>
                  <div className="pillar-top">
                    <span className="pillar-n">{p.n}</span>
                    {p.live && <span className="live-badge"><i className="pulse" />em produção</span>}
                  </div>
                  <span className="pillar-tag">{p.tag}</span>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                  <span className="seal">{p.seal}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== PROOF ===== */}
        <section className="sec proof-sec">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <span className="kicker">PROVA REAL</span>
              <h2>Não é conceito. Já está rodando em loja de verdade.</h2>
              <p className="sub">Um pedido em texto. Cupom criado, ativado e confirmado numa loja em produção.</p>
            </div>

            <div className="proof-grid" data-reveal>
              {/* mock: pedido no agente */}
              <div className="proof-card">
                <div className="proof-label">no agente</div>
                <div className="mini-chat">
                  <div className="bubble user">cria o cupom BRUNINHO10, 10% de desconto</div>
                  <div className="bubble aiu-ai"><span className="ai-text">✓ Cupom <b>BRUNINHO10</b> criado, ativado e publicado.</span></div>
                </div>
              </div>
              {/* mock: checkout */}
              <div className="proof-card">
                <div className="proof-label">no checkout da loja</div>
                <div className="checkout-mock">
                  <div className="ck-row"><span>Subtotal</span><span>R$ 100,00</span></div>
                  <div className="ck-row disc"><span>Cupom BRUNINHO10</span><span>- R$ 10,00</span></div>
                  <div className="ck-row total"><span>Total</span><span>R$ 90,00</span></div>
                  <div className="ck-tag">✓ desconto aplicado</div>
                </div>
              </div>
            </div>

            <a className="terminal-teaser" href="/ai" data-reveal>
              <div className="tt-mini">
                <span className="tt-prompt">›</span> /mcp unbox crie um e-commerce para minha marca
                <span className="tt-cursor" />
              </div>
              <span className="tt-cta">É assim que um agente de IA constrói uma loja inteira com a Unbox — ver demo completa →</span>
            </a>
          </div>
        </section>

        {/* ===== FOR WHOM ===== */}
        <section className="sec">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <span className="kicker">PRA QUEM É</span>
              <h2>Feito pra quem toca loja. E pra quem toca várias.</h2>
            </div>
            <div className="whom-grid">
              <div className="aiu-card whom" data-reveal>
                <span className="whom-tag green">MARCAS D2C</span>
                <p>
                  Sua operação inteira — loja, assinatura, pagamento, crédito, campanhas — num só lugar,
                  respondendo a você. Menos tempo operando, mais tempo construindo marca.
                </p>
                <button className="link-cta" onClick={() => scrollToForm('Marca D2C')}>Entre na lista como marca →</button>
              </div>
              <div className="aiu-card whom" data-reveal style={{ transitionDelay: '80ms' }}>
                <span className="whom-tag purple">AGÊNCIAS E OPERADORES</span>
                <p>
                  Cada cliente seu com uma operação que executa por texto. Mais contas com o mesmo time,
                  entregas mais rápidas, e sua agência na frente da transição que vai redefinir o mercado.
                  Parceiros da lista terão acesso antecipado e condição de <b>early partner</b>.
                </p>
                <button className="link-cta purple" onClick={() => scrollToForm('Agência ou operador')}>Entre na lista como agência →</button>
              </div>
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="sec">
          <div className="wrap narrow">
            <div className="sec-head" data-reveal>
              <span className="kicker">DÚVIDAS</span>
              <h2>O que você deve estar se perguntando</h2>
            </div>
            <div className="faq" data-reveal>
              {FAQ.map((f, i) => (
                <div className={`aiu-faq-item ${openFaq === i ? 'open' : ''}`} key={i}>
                  <button className="aiu-faq-q" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                    <span>{f.q}</span>
                    <span className="chev">＋</span>
                  </button>
                  <div className="aiu-faq-a"><p>{f.a}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FINAL CTA / FORM ===== */}
        <section className="sec form-sec" ref={formRef} id="lista">
          <div className="wrap narrow">
            <div className="sec-head aiu-center" data-reveal>
              <span className="kicker">LISTA DE ESPERA</span>
              <h2>O futuro do e-commerce vai chegar primeiro pra quem está na lista.</h2>
            </div>

            <div className="form-card" data-reveal>
              {status === 'done' ? (
                <div className="thanks">
                  <div className="thanks-ico">✓</div>
                  <h3>Você está na lista.</h3>
                  <p>Vamos te chamar por ordem de chegada, com as novidades e as condições de early access do AI Foundry antes de todo mundo.</p>
                </div>
              ) : (
                <form onSubmit={submit}>
                  <div className="field">
                    <label>Nome</label>
                    <input type="text" value={form.nome} placeholder="Seu nome" onChange={(e) => setForm({ ...form, nome: e.target.value })} required />
                  </div>
                  <div className="field">
                    <label>E-mail</label>
                    <input type="email" value={form.email} placeholder="voce@marca.com.br" onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                  </div>
                  <div className="field">
                    <label>Sou</label>
                    <select value={form.perfil} onChange={(e) => setForm({ ...form, perfil: e.target.value })} required>
                      <option value="" disabled>Selecione</option>
                      <option>Marca D2C</option>
                      <option>Agência ou operador</option>
                      <option>Outro</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Faturamento mensal aproximado <span className="opt">(opcional)</span></label>
                    <select value={form.faturamento} onChange={(e) => setForm({ ...form, faturamento: e.target.value })}>
                      <option value="">Prefiro não informar</option>
                      {FATURAMENTO.map((f) => <option key={f}>{f}</option>)}
                    </select>
                  </div>
                  <button className="aiu-btn aiu-btn-primary full" type="submit" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Enviando…' : 'Quero meu acesso antecipado'}
                  </button>
                  {status === 'error' && <p className="err">Algo deu errado ao enviar. Tente de novo em instantes.</p>}
                  <p className="micro">Você recebe as novidades do AI Foundry e é chamado por ordem de chegada. Sem spam.</p>
                </form>
              )}
            </div>

            <div className="signature" data-reveal>
              <span>Você pede.</span> <span className="grad">A Unbox executa.</span>
            </div>
          </div>
        </section>
      </div>

      <Footer />

      <style jsx global>{`
        html, body { margin: 0; background: #0D0D0D; }
        #lpai {
          --bg: #0D0D0D; --ink: #F3F3F5; --mut: #9A9AA2; --dim: #6A6A72;
          --green: #39FF14; --purple: #7A2CFF; --line: rgba(255,255,255,.09);
          --card: #131316; --card2: #17171B;
          --mono: 'JetBrains Mono', ui-monospace, Menlo, monospace;
          --grad: linear-gradient(100deg, #39FF14, #7A2CFF);
          position: relative; background: var(--bg); color: var(--ink);
          font-family: 'Sora', system-ui, -apple-system, sans-serif;
          -webkit-font-smoothing: antialiased; overflow-x: hidden; line-height: 1.5;
        }
        #lpai *, #lpai *::before, #lpai *::after { box-sizing: border-box; }
        #lpai .wrap { max-width: 1080px; margin: 0 auto; padding: 0 22px; }
        #lpai .wrap.narrow { max-width: 720px; }
        #lpai [data-reveal] { opacity: 0; transform: translateY(18px); transition: opacity .6s ease, transform .6s cubic-bezier(.2,.7,.2,1); }
        #lpai [data-reveal].aiu-in { opacity: 1; transform: none; }

        #lpai .grad { background: var(--grad); -webkit-background-clip: text; background-clip: text; color: transparent; }
        #lpai .kicker { font-family: var(--mono); font-size: 12px; letter-spacing: .22em; color: var(--green); text-transform: uppercase; }
        #lpai .sec { padding: 96px 0; border-top: 1px solid var(--line); }
        #lpai .sec-head { max-width: 720px; margin-bottom: 44px; }
        #lpai .sec-head.aiu-center { margin-left: auto; margin-right: auto; text-align: center; }
        #lpai .sec-head h2 { font-size: clamp(28px, 4.4vw, 46px); font-weight: 800; letter-spacing: -.025em; line-height: 1.08; margin: 14px 0 0; }
        #lpai .sec-head .sub { color: var(--mut); font-size: 17px; margin-top: 16px; line-height: 1.6; }

        /* HERO */
        #lpai .aiu-hero { position: relative; padding: clamp(104px, 14vw, 150px) 0 84px; overflow: hidden; }
        #lpai .aiu-hero::before { content: ""; position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background: radial-gradient(60% 60% at 82% 6%, rgba(122,44,255,.20), transparent 60%),
                      radial-gradient(50% 50% at 8% 92%, rgba(57,255,20,.10), transparent 58%); }
        #lpai .aiu-hero-grid { position: relative; z-index: 1; display: grid; grid-template-columns: 1.05fr .95fr; gap: 52px; align-items: center; }
        #lpai .aiu-eyebrow { display: inline-flex; align-items: center; gap: 9px; font-family: var(--mono); font-size: 11.5px; letter-spacing: .14em; color: var(--mut);
          border: 1px solid var(--line); border-radius: 999px; padding: 7px 14px; background: rgba(255,255,255,.02); }
        #lpai .pulse { width: 7px; height: 7px; border-radius: 50%; background: var(--green); box-shadow: 0 0 10px var(--green); animation: lppulse 1.8s infinite; }
        @keyframes lppulse { 0%,100% { opacity: 1; } 50% { opacity: .35; } }
        #lpai h1 { font-size: clamp(34px, 5.4vw, 60px); font-weight: 800; letter-spacing: -.03em; line-height: 1.04; margin: 22px 0 0; }
        #lpai .lead { color: var(--mut); font-size: 18px; line-height: 1.6; margin: 20px 0 0; max-width: 540px; }
        #lpai .cta-row { margin-top: 30px; display: flex; gap: 12px; flex-wrap: wrap; }
        #lpai .reinforce { margin-top: 14px; font-family: var(--mono); font-size: 12.5px; color: var(--dim); }

        #lpai .aiu-btn { font-family: 'Sora', sans-serif; font-weight: 700; font-size: 15.5px; border-radius: 12px; padding: 15px 26px; cursor: pointer; border: 1px solid transparent; transition: transform .15s ease, box-shadow .2s ease, background .2s; }
        #lpai .aiu-btn-primary { background: var(--green); color: #06210A; box-shadow: 0 0 0 rgba(57,255,20,0); }
        #lpai .aiu-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 34px rgba(57,255,20,.28); }
        #lpai .aiu-btn.full { width: 100%; }

        /* HERO chat visual */
        #lpai .aiu-hero-visual { position: relative; }
        #lpai .glow { position: absolute; border-radius: 50%; filter: blur(60px); z-index: 0; }
        #lpai .glow.gp { width: 260px; height: 260px; background: rgba(122,44,255,.25); top: -30px; right: -20px; }
        #lpai .glow.gg { width: 200px; height: 200px; background: rgba(57,255,20,.12); bottom: -30px; left: -10px; }
        #lpai .chat { position: relative; z-index: 1; background: linear-gradient(180deg, #141418, #0f0f12); border: 1px solid var(--line); border-radius: 20px; padding: 18px; box-shadow: 0 30px 70px rgba(0,0,0,.5); }
        #lpai .chat-head { display: flex; align-items: center; gap: 7px; padding-bottom: 14px; margin-bottom: 8px; border-bottom: 1px solid var(--line); }
        #lpai .chat-head .dot { width: 9px; height: 9px; border-radius: 50%; }
        #lpai .chat-head .dot.g { background: var(--green); } #lpai .chat-head .dot.p { background: var(--purple); }
        #lpai .chat-title { font-family: var(--mono); font-size: 11.5px; color: var(--dim); margin-left: 6px; }
        #lpai .bubble { max-width: 82%; padding: 12px 15px; border-radius: 14px; font-size: 14.5px; line-height: 1.45; margin: 9px 0; opacity: 0; transform: translateY(8px); }
        #lpai .bubble.user { margin-left: auto; background: #23232a; color: #eaeaef; border-bottom-right-radius: 5px; }
        #lpai .bubble.aiu-ai { background: rgba(57,255,20,.08); border: 1px solid rgba(57,255,20,.22); color: #d9ffd0; border-bottom-left-radius: 5px; }
        #lpai .bubble.aiu-ai b { color: #fff; } #lpai .bubble.user + .bubble.aiu-ai b, #lpai .bubble.aiu-ai b { font-weight: 700; }
        #lpai .chat .b1 { animation: bin .5s ease .3s forwards; }
        #lpai .chat .b2 { animation: bin .5s ease 1.2s forwards; }
        #lpai .chat .b3 { animation: bin .5s ease 2.2s forwards; }
        #lpai .chat .b4 { animation: bin .5s ease 3.1s forwards; }
        @keyframes bin { to { opacity: 1; transform: none; } }
        #lpai .typing { display: inline-flex; gap: 3px; margin-right: 8px; }
        #lpai .typing i { width: 5px; height: 5px; border-radius: 50%; background: var(--green); opacity: .5; animation: lptp 1.1s infinite; }
        #lpai .typing i:nth-child(2){animation-delay:.15s} #lpai .typing i:nth-child(3){animation-delay:.3s}
        @keyframes lptp { 0%,60%,100%{opacity:.3} 30%{opacity:1} }

        /* cards */
        #lpai .cards-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        #lpai .aiu-card { background: var(--card); border: 1px solid var(--line); border-radius: 18px; padding: 26px; transition: transform .2s ease, border-color .2s ease, background .2s; }
        #lpai .aiu-card:hover { transform: translateY(-3px); border-color: rgba(255,255,255,.18); background: var(--card2); }
        #lpai .aiu-card h3 { font-size: 19px; font-weight: 700; letter-spacing: -.01em; margin: 12px 0 8px; }
        #lpai .aiu-card p { color: var(--mut); font-size: 14.5px; line-height: 1.58; margin: 0; }
        #lpai .prob-ico { display: inline-flex; align-items: center; justify-content: center; width: 42px; height: 42px; border-radius: 11px; background: rgba(122,44,255,.12); color: #c9a8ff; font-size: 20px; }

        /* pillars */
        #lpai .pillar { display: flex; flex-direction: column; min-height: 260px; }
        #lpai .pillar-top { display: flex; align-items: center; justify-content: space-between; }
        #lpai .pillar-n { font-family: var(--mono); font-size: 12px; color: var(--dim); letter-spacing: .1em; }
        #lpai .live-badge { display: inline-flex; align-items: center; gap: 6px; font-family: var(--mono); font-size: 10.5px; letter-spacing: .06em; color: var(--green); border: 1px solid rgba(57,255,20,.3); border-radius: 999px; padding: 3px 9px; }
        #lpai .pillar-tag { font-family: var(--mono); font-size: 12px; letter-spacing: .2em; color: var(--green); margin: 16px 0 0; }
        #lpai .pillar h3 { margin: 8px 0 10px; font-size: 20px; }
        #lpai .pillar p { flex: 1; }
        #lpai .seal { align-self: flex-start; margin-top: 18px; font-family: var(--mono); font-size: 11.5px; color: var(--mut); border: 1px solid var(--line); border-radius: 8px; padding: 5px 10px; background: rgba(255,255,255,.02); }

        /* proof */
        #lpai .proof-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
        #lpai .proof-card { background: var(--card); border: 1px solid var(--line); border-radius: 18px; padding: 22px; }
        #lpai .proof-label { font-family: var(--mono); font-size: 11px; letter-spacing: .14em; text-transform: uppercase; color: var(--dim); margin-bottom: 14px; }
        #lpai .mini-chat .bubble { opacity: 1; transform: none; max-width: 92%; }
        #lpai .checkout-mock { font-family: var(--mono); }
        #lpai .ck-row { display: flex; justify-content: space-between; font-size: 14px; color: var(--mut); padding: 9px 0; border-bottom: 1px dashed var(--line); }
        #lpai .ck-row.disc { color: var(--green); } #lpai .ck-row.total { color: #fff; font-size: 16px; font-weight: 500; border-bottom: none; }
        #lpai .ck-tag { margin-top: 12px; display: inline-block; font-size: 12px; color: var(--green); border: 1px solid rgba(57,255,20,.3); border-radius: 999px; padding: 4px 11px; }
        #lpai .terminal-teaser { display: flex; flex-direction: column; gap: 12px; margin-top: 22px; text-decoration: none; background: #0a0a0c; border: 1px solid var(--line); border-radius: 16px; padding: 20px 22px; transition: border-color .2s; }
        #lpai .terminal-teaser:hover { border-color: rgba(122,44,255,.5); }
        #lpai .tt-mini { font-family: var(--mono); font-size: 14px; color: #cfd0d6; }
        #lpai .tt-prompt { color: var(--purple); margin-right: 8px; }
        #lpai .tt-cursor { display: inline-block; width: 8px; height: 15px; background: var(--green); margin-left: 4px; vertical-align: middle; animation: lppulse 1s steps(2) infinite; }
        #lpai .tt-cta { font-family: var(--mono); font-size: 12.5px; color: var(--mut); }

        /* whom */
        #lpai .whom-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
        #lpai .whom { display: flex; flex-direction: column; }
        #lpai .whom-tag { align-self: flex-start; font-family: var(--mono); font-size: 11px; letter-spacing: .16em; padding: 5px 11px; border-radius: 8px; margin-bottom: 14px; }
        #lpai .whom-tag.green { color: var(--green); background: rgba(57,255,20,.08); border: 1px solid rgba(57,255,20,.24); }
        #lpai .whom-tag.purple { color: #c9a8ff; background: rgba(122,44,255,.1); border: 1px solid rgba(122,44,255,.3); }
        #lpai .whom p { flex: 1; color: var(--mut); font-size: 15.5px; line-height: 1.6; }
        #lpai .whom b { color: #fff; }
        #lpai .link-cta { align-self: flex-start; margin-top: 18px; background: none; border: none; color: var(--green); font-family: 'Sora', sans-serif; font-weight: 600; font-size: 15px; cursor: pointer; padding: 0; }
        #lpai .link-cta.purple { color: #b98bff; }

        /* faq */
        #lpai .aiu-faq-item { border: 1px solid var(--line); border-radius: 14px; margin-bottom: 10px; overflow: hidden; background: var(--card); }
        #lpai .aiu-faq-q { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 14px; text-align: left; background: none; border: none; color: var(--ink); font-family: 'Sora', sans-serif; font-size: 16.5px; font-weight: 600; padding: 20px 22px; cursor: pointer; }
        #lpai .aiu-faq-q .chev { color: var(--green); font-size: 20px; transition: transform .25s; flex-shrink: 0; }
        #lpai .aiu-faq-item.open .aiu-faq-q .chev { transform: rotate(45deg); }
        #lpai .aiu-faq-a { max-height: 0; overflow: hidden; transition: max-height .3s ease; }
        #lpai .aiu-faq-item.open .aiu-faq-a { max-height: 220px; }
        #lpai .aiu-faq-a p { margin: 0; padding: 0 22px 20px; color: var(--mut); font-size: 15px; line-height: 1.6; }

        /* form */
        #lpai .form-sec { background: radial-gradient(80% 60% at 50% 0%, rgba(122,44,255,.08), transparent 60%); }
        #lpai .form-card { background: var(--card); border: 1px solid var(--line); border-radius: 20px; padding: 30px; max-width: 560px; margin: 0 auto; }
        #lpai .field { margin-bottom: 16px; }
        #lpai .field label { display: block; font-size: 13px; color: var(--mut); margin-bottom: 7px; }
        #lpai .field .opt { color: var(--dim); }
        #lpai .field input, #lpai .field select { width: 100%; background: #0d0d10; border: 1px solid var(--line); border-radius: 11px; padding: 13px 15px; color: var(--ink); font-family: 'Sora', sans-serif; font-size: 15px; outline: none; transition: border-color .15s, box-shadow .15s; }
        #lpai .field input::placeholder { color: var(--dim); }
        #lpai .field input:focus, #lpai .field select:focus { border-color: rgba(57,255,20,.6); box-shadow: 0 0 0 3px rgba(57,255,20,.12); }
        #lpai .form-card .aiu-btn { margin-top: 8px; }
        #lpai .micro { font-family: var(--mono); font-size: 11.5px; color: var(--dim); text-align: center; margin: 14px 0 0; line-height: 1.5; }
        #lpai .err { color: #ff6b6b; font-size: 13px; text-align: center; margin: 12px 0 0; }
        #lpai .thanks { text-align: center; padding: 20px 6px; }
        #lpai .thanks-ico { width: 54px; height: 54px; margin: 0 auto 16px; border-radius: 50%; background: rgba(57,255,20,.12); border: 1px solid rgba(57,255,20,.4); color: var(--green); font-size: 26px; display: flex; align-items: center; justify-content: center; }
        #lpai .thanks h3 { font-size: 22px; font-weight: 800; margin: 0 0 8px; }
        #lpai .thanks p { color: var(--mut); font-size: 15px; line-height: 1.6; margin: 0; }

        #lpai .signature { text-align: center; margin-top: 46px; font-size: clamp(22px, 3.4vw, 32px); font-weight: 800; letter-spacing: -.02em; }

        /* responsive */
        @media (max-width: 860px) {
          #lpai .aiu-hero-grid { grid-template-columns: 1fr; gap: 40px; }
          #lpai .cards-3, #lpai .proof-grid, #lpai .whom-grid { grid-template-columns: 1fr; }
          #lpai .sec { padding: 72px 0; }
          #lpai .lead { max-width: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          #lpai [data-reveal] { opacity: 1 !important; transform: none !important; }
          #lpai .bubble { opacity: 1 !important; transform: none !important; animation: none !important; }
        }
      `}</style>
    </>
  )
}
