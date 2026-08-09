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
    body: 'Você descreve a marca e o catálogo. A AI constrói a loja completa: design, produtos, checkout e assinatura nativa, no tempo que antes levava semanas. Recorrência não é módulo à parte: nasce junto com a loja.',
  },
  {
    n: '02',
    tag: 'OPERAR',
    seal: 'Unbox MCP',
    title: 'Sua operação por texto.',
    body: 'Preço, estoque, cupom, campanha, regra de assinatura: você pede em texto, como pediria pra alguém do seu time. A diferença é que sai do rascunho e vai ao ar imediatamente, pronto pra virar dado.',
    live: true,
  },
  {
    n: '03',
    tag: 'ESCALAR',
    seal: 'CLI + MCP',
    title: 'Agentes de crescimento.',
    body: 'Agentes de AI aplicam inteligência em tarefas específicas do seu crescimento: ajustar preço, testar campanha, identificar risco de cancelamento, reengajar assinante. Não é AI genérica: é inteligência aplicada às decisões que fazem cliente voltar.',
  },
]

const FAQ = [
  {
    q: 'Isso substitui minha equipe ou minha agência?',
    a: 'Não. Substitui o tempo gasto executando ajuste manual, não a estratégia, o julgamento ou o relacionamento com o cliente.',
  },
  {
    q: 'É AI genérica ou aplicada ao meu negócio?',
    a: 'Inteligência focada em preço, campanha, cupom, risco de cancelamento e reengajamento de assinante. Não é um chatbot geral.',
  },
  {
    q: 'Vou perder visibilidade do que a AI faz?',
    a: 'Não. Toda ação é registrada. Você define o que ela executa sozinha e o que depende da sua aprovação.',
  },
  {
    q: 'Preciso aprender uma plataforma nova?',
    a: 'Não. Você fala o que quer testar; a AI constrói e executa. A parte técnica é o nosso trabalho.',
  },
  {
    q: 'Preciso já ser cliente Unbox?',
    a: 'Não. A lista é aberta. Clientes Unbox ativam primeiro, mas quem chega agora entra na frente da fila.',
  },
  {
    q: 'Quanto vai custar?',
    a: 'Quem está na lista conhece as condições antes de todo mundo e trava a vantagem de early access antes do preço final. Entrar não custa nada.',
  },
]

const PERFIS = ['Marca D2C', 'Agência', 'Outro']

const FATURAMENTO = [
  'Até R$ 50 mil/mês',
  'R$ 50 mil a R$ 200 mil/mês',
  'R$ 200 mil a R$ 1 mi/mês',
  'Acima de R$ 1 mi/mês',
]

function maskBR(v) {
  v = v.replace(/\D/g, '').slice(0, 11)
  if (v.length <= 2) return v.length ? '(' + v : ''
  if (v.length <= 7) return '(' + v.slice(0, 2) + ') ' + v.slice(2)
  return '(' + v.slice(0, 2) + ') ' + v.slice(2, 7) + '-' + v.slice(7)
}

const URGENCIA = [
  'Ativam antes da abertura pública',
  'Ajudam a moldar o produto com feedback direto',
  'Travam a condição de early access antes do preço final',
]

export default function AiUnboxLP() {
  const [openFaq, setOpenFaq] = useState(-1)
  const [perfilPre, setPerfilPre] = useState('')
  const finalRef = useRef(null)

  const goToForm = (perfil) => {
    if (perfil) setPerfilPre(perfil)
    if (finalRef.current) finalRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

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
        <title>Unbox AI Foundry — crie, opere e escale seu e-commerce com AI</title>
        <meta name="description" content="Você descreve e a loja nasce pronta. Você pede e a mudança vai pro ar. Agentes de AI trabalham pelo seu crescimento todos os dias. Entre na lista de espera do Unbox AI Foundry." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://www.unbox.com.br/ai-unbox" />
        <meta property="og:title" content="Unbox AI Foundry — crie, opere e escale seu e-commerce com AI" />
        <meta property="og:description" content="Você pede. A Unbox executa. Entre na lista de espera." />
        <meta property="og:url" content="https://www.unbox.com.br/ai-unbox" />
        <meta property="og:image" content="https://www.unbox.com.br/img/og-image.png?v=r26" />
        <meta property="og:type" content="website" />
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </Head>

      <Nav />

      <div id="lpai">
        {/* ===== 2 · HERO ===== */}
        <header className="aiu-hero">
          <div className="wrap aiu-hero-grid">
            <div className="hero-copy" data-reveal>
              <span className="aiu-eyebrow"><i className="pulse" />LISTA DE ESPERA ABERTA · VAGAS POR LOTE</span>
              <h1>Crie, opere e escale seu e-commerce <span className="grad">com AI</span>.</h1>
              <p className="lead">
                Você descreve e a loja nasce pronta. Você pede e a mudança vai pro ar.
                Agentes de AI trabalham pelo seu crescimento todos os dias. Tudo em minutos.
              </p>
            </div>

            <div className="aiu-hero-visual" data-reveal>
              <WaitlistForm
                id="hero"
                title="Garanta seu acesso antecipado"
                subtitle="Leva 20 segundos. Sem custo, sem compromisso."
                micro="Chamada por ordem de chegada. Sem spam."
                perfilPre={perfilPre}
              />
              <div className="glow gp" />
              <div className="glow gg" />
            </div>
          </div>
        </header>

        {/* ===== 3 · PROVA REAL ===== */}
        <section className="sec">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <span className="kicker">PROVA REAL</span>
              <h2>Não é conceito. É print de loja de verdade.</h2>
              <p className="sub">
                Um pedido em texto. Cupom criado, ativado e publicado na{' '}
                <a className="case-link" href="https://temperosbadia.com.br/" target="_blank" rel="noopener noreferrer">Temperos Badia</a>
                {' '}— loja em produção, rodando na Unbox.
              </p>
            </div>

            <div className="proof-flow" data-reveal>
              <figure className="proof-shot">
                <figcaption className="proof-label">1 · no agente</figcaption>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/img/ai-prova-agente.png" alt="Agente confirmando: cupom BRUNINHO10 criado e ativo na Badia, 10% off, confirmado direto no banco" loading="lazy" />
              </figure>

              <div className="proof-arrow" aria-hidden="true">↓</div>

              <figure className="proof-shot shot-checkout">
                <figcaption className="proof-label">2 · no checkout da loja</figcaption>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/img/ai-prova-checkout.png" alt="Carrinho da loja Temperos Badia com o cupom BRUNINHO10 aplicado e desconto de R$ 3,29" loading="lazy" />
              </figure>

              <p className="proof-caption">
                <b>Do pedido ao desconto no carrinho do cliente.</b> Sem abrir painel, sem deploy, sem esperar time técnico.
              </p>
            </div>

            <a className="terminal-teaser" href="/ai" data-reveal>
              <div className="tt-mini">
                <span className="tt-prompt">›</span> /mcp unbox crie um e-commerce para minha marca
                <span className="tt-cursor" />
              </div>
              <span className="tt-cta">É assim que um agente de AI constrói uma loja inteira com a Unbox — ver demo completa →</span>
            </a>
          </div>
        </section>

        {/* ===== 4 · CONSCIÊNCIA ===== */}
        <section className="sec">
          <div className="wrap narrow">
            <div className="sec-head" data-reveal>
              <span className="kicker">O QUE MUDA</span>
              <h2>Testar uma hipótese na sua loja não devia levar dias. Agora leva minutos.</h2>
              <p className="sub big">
                Você não precisa aprender a operar mais uma plataforma. Você fala o que quer: um preço,
                uma oferta, uma campanha, uma regra de assinatura. A AI constrói e executa na hora.
                Mais teste rodando é mais clareza pra decidir pra onde crescer — e mais motivo pro seu
                cliente voltar a comprar.
              </p>
            </div>
          </div>
        </section>

        {/* ===== 5 · PILARES ===== */}
        <section className="sec">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <span className="kicker">A PLATAFORMA</span>
              <h2>O conhecimento continua sendo seu. O que muda é a <span className="grad">velocidade de execução</span>, e a recorrência.</h2>
            </div>
            <div className="cards-3">
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

        {/* ===== 6 · PERSONAS ===== */}
        <section className="sec">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <span className="kicker">PRA QUEM É</span>
              <h2>Feito pra quem toca loja. E pra quem toca várias.</h2>
            </div>
            <div className="whom-grid">
              <div className="aiu-card whom" data-reveal>
                <span className="whom-tag green">MARCAS D2C</span>
                <h3>Crescer é vender de novo pro mesmo cliente.</h3>
                <p>
                  O Unbox nasceu com <b>assinatura nativa</b>: recorrência é parte de como sua loja é
                  construída desde o primeiro dia. O AI Foundry aplica essa lógica na velocidade de
                  execução — você testa oferta, preço e regra de recorrência com a agilidade de um cupom
                  simples. Cada ajuste vira dado real na hora.
                </p>
                <button className="link-cta" onClick={() => goToForm('Marca D2C')}>Entrar como marca →</button>
              </div>
              <div className="aiu-card whom" data-reveal style={{ transitionDelay: '80ms' }}>
                <span className="whom-tag purple">AGÊNCIAS E OPERADORES</span>
                <h3>Você já sabe o que fazer. Isso multiplica quanto você consegue entregar.</h3>
                <p>
                  O trabalho de uma agência boa nunca foi o clique, foi a estratégia. O que consome seu
                  time é o tempo de execução: montar loja, configurar ajuste, repetir pra cada conta. O AI
                  Foundry tira essa fricção do meio do caminho: <b>mais contas com o mesmo time</b>, mais
                  teste por cliente. Parceiros da lista travam condição de <b>early partner</b>,
                  indisponível depois da abertura pública.
                </p>
                <button className="link-cta purple" onClick={() => goToForm('Agência')}>Entrar como agência →</button>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 7 · CONTROLE ===== */}
        <section className="sec control-sec">
          <div className="wrap narrow">
            <div className="control-card" data-reveal>
              <span className="ctrl-ico">🛡</span>
              <h2>Você define o que a AI executa sozinha. E o que precisa da sua aprovação antes.</h2>
              <p>
                Toda ação fica registrada. Nada irreversível acontece sem você validar. O ganho de
                velocidade não é “perder o controle pra AI”: é decidir, com mais dado disponível, o que
                vale aprovar e o que vale rodar em piloto automático.
              </p>
            </div>
          </div>
        </section>

        {/* ===== 8 · URGÊNCIA ===== */}
        <section className="sec">
          <div className="wrap narrow">
            <div className="sec-head" data-reveal>
              <span className="kicker">POR QUE AGORA</span>
              <h2>Quem entra agora testa mais cedo. Quem espera, decide com menos dado que o concorrente.</h2>
              <p className="sub">O acesso é liberado em lotes, por ordem de chegada. Marcas e agências que entrarem agora:</p>
            </div>
            <ul className="urg-list" data-reveal>
              {URGENCIA.map((u) => (
                <li key={u}><span className="urg-arrow">→</span>{u}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* ===== 9 · FAQ ===== */}
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

        {/* ===== 10 · CTA FINAL ===== */}
        <section className="final-band" ref={finalRef} id="lista">
          <div className="wrap narrow">
            <div className="sec-head aiu-center" data-reveal>
              <h2>Cada semana de espera é uma semana a menos de teste rodando na sua loja.</h2>
              <p className="sub">
                Não custa nada entrar na lista. Custa dado e velocidade ficar de fora enquanto seu
                concorrente já está testando.
              </p>
            </div>

            <div data-reveal>
              <WaitlistForm
                id="final"
                full
                micro="Novidades em primeira mão, chamada por ordem de chegada. Sem spam."
                perfilPre={perfilPre}
              />
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
        #lpai .wrap.narrow { max-width: 760px; }
        #lpai [data-reveal] { opacity: 0; transform: translateY(18px); transition: opacity .6s ease, transform .6s cubic-bezier(.2,.7,.2,1); }
        #lpai [data-reveal].aiu-in { opacity: 1; transform: none; }
        #lpai .grad { background: var(--grad); -webkit-background-clip: text; background-clip: text; color: transparent; }
        #lpai .kicker { font-family: var(--mono); font-size: 12px; letter-spacing: .22em; color: var(--green); text-transform: uppercase; }
        #lpai .sec { padding: 92px 0; border-top: 1px solid var(--line); }
        #lpai .sec-head { max-width: 760px; margin-bottom: 40px; }
        #lpai .sec-head.aiu-center { margin-left: auto; margin-right: auto; text-align: center; }
        #lpai .sec-head h2 { font-size: clamp(26px, 4.1vw, 42px); font-weight: 800; letter-spacing: -.025em; line-height: 1.12; margin: 14px 0 0; }
        #lpai .sec-head .sub { color: var(--mut); font-size: 17px; margin-top: 16px; line-height: 1.62; }
        #lpai .sec-head .sub.big { font-size: 18.5px; color: #B6B6BE; }

        /* ---- HERO ---- */
        #lpai .aiu-hero { position: relative; padding: clamp(104px, 14vw, 148px) 0 80px; overflow: hidden; }
        #lpai .aiu-hero::before { content: ""; position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background: radial-gradient(58% 58% at 84% 4%, rgba(122,44,255,.22), transparent 60%),
                      radial-gradient(48% 48% at 6% 94%, rgba(57,255,20,.10), transparent 58%); }
        #lpai .aiu-hero-grid { position: relative; z-index: 1; display: grid; grid-template-columns: 1.02fr .98fr; gap: 48px; align-items: center; }
        #lpai .aiu-eyebrow { display: inline-flex; align-items: center; gap: 9px; font-family: var(--mono); font-size: 11.5px; letter-spacing: .14em; color: var(--mut);
          border: 1px solid var(--line); border-radius: 999px; padding: 7px 14px; background: rgba(255,255,255,.02); }
        #lpai .pulse { width: 7px; height: 7px; border-radius: 50%; background: var(--green); box-shadow: 0 0 10px var(--green); animation: lppulse 1.8s infinite; }
        @keyframes lppulse { 0%,100% { opacity: 1; } 50% { opacity: .35; } }
        #lpai h1 { font-size: clamp(32px, 5vw, 56px); font-weight: 800; letter-spacing: -.03em; line-height: 1.06; margin: 22px 0 0; }
        #lpai .lead { color: var(--mut); font-size: 18px; line-height: 1.6; margin: 20px 0 0; max-width: 540px; }

        /* ---- FORM ---- */
        #lpai .aiu-hero-visual { position: relative; }
        #lpai .glow { position: absolute; border-radius: 50%; filter: blur(60px); z-index: 0; }
        #lpai .glow.gp { width: 250px; height: 250px; background: rgba(122,44,255,.26); top: -34px; right: -18px; }
        #lpai .glow.gg { width: 190px; height: 190px; background: rgba(57,255,20,.10); bottom: -30px; left: -12px; }
        #lpai .wl-card { position: relative; z-index: 1; background: linear-gradient(180deg, #141418, #101013); border: 1px solid var(--line); border-radius: 20px; padding: 26px; box-shadow: 0 30px 70px rgba(0,0,0,.5); }
        #lpai .wl-card.full { max-width: 560px; margin: 0 auto; }
        #lpai .wl-title { font-size: 20px; font-weight: 800; letter-spacing: -.02em; margin: 0 0 6px; }
        #lpai .wl-sub { color: var(--mut); font-size: 13.5px; margin: 0 0 20px; }
        #lpai .field { margin-bottom: 14px; }
        #lpai .field label { display: block; font-size: 12.5px; color: var(--mut); margin-bottom: 7px; }
        #lpai .field .opt { color: var(--dim); }
        #lpai .field input, #lpai .field select { width: 100%; background: #0c0c0f; border: 1px solid var(--line); border-radius: 11px; padding: 13px 15px; color: var(--ink); font-family: 'Sora', sans-serif; font-size: 15px; outline: none; transition: border-color .15s, box-shadow .15s; }
        #lpai .field input::placeholder { color: var(--dim); }
        #lpai .field input:focus, #lpai .field select:focus { border-color: rgba(122,44,255,.7); box-shadow: 0 0 0 3px rgba(122,44,255,.16); }
        #lpai .aiu-btn { font-family: 'Sora', sans-serif; font-weight: 700; font-size: 15.5px; border-radius: 12px; padding: 15px 26px; cursor: pointer; border: none; width: 100%; margin-top: 6px;
          background: var(--purple); color: #fff; transition: transform .15s ease, box-shadow .2s ease, filter .2s; }
        #lpai .aiu-btn:hover { transform: translateY(-2px); box-shadow: 0 14px 34px rgba(122,44,255,.38); }
        #lpai .aiu-btn:disabled { filter: grayscale(.4) brightness(.8); cursor: default; transform: none; box-shadow: none; }
        #lpai .micro { font-family: var(--mono); font-size: 11px; color: var(--dim); text-align: center; margin: 14px 0 0; line-height: 1.55; }
        #lpai .err { color: #ff6b6b; font-size: 13px; text-align: center; margin: 12px 0 0; }
        #lpai .thanks { text-align: center; padding: 14px 4px; }
        #lpai .thanks-ico { width: 52px; height: 52px; margin: 0 auto 14px; border-radius: 50%; background: rgba(57,255,20,.12); border: 1px solid rgba(57,255,20,.42); color: var(--green); font-size: 25px; display: flex; align-items: center; justify-content: center; }
        #lpai .thanks h3 { font-size: 21px; font-weight: 800; margin: 0 0 8px; }
        #lpai .thanks p { color: var(--mut); font-size: 14.5px; line-height: 1.6; margin: 0; }

        /* ---- cards ---- */
        #lpai .cards-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        #lpai .aiu-card { background: var(--card); border: 1px solid var(--line); border-radius: 18px; padding: 26px; transition: transform .2s ease, border-color .2s ease, background .2s; }
        #lpai .aiu-card:hover { transform: translateY(-3px); border-color: rgba(255,255,255,.18); background: var(--card2); }
        #lpai .aiu-card h3 { font-size: 19px; font-weight: 700; letter-spacing: -.015em; margin: 10px 0 10px; line-height: 1.25; }
        #lpai .aiu-card p { color: var(--mut); font-size: 14.5px; line-height: 1.6; margin: 0; }
        #lpai .aiu-card b { color: #fff; font-weight: 600; }

        #lpai .pillar { display: flex; flex-direction: column; min-height: 290px; }
        #lpai .pillar-top { display: flex; align-items: center; justify-content: space-between; }
        #lpai .pillar-n { font-family: var(--mono); font-size: 12px; color: var(--dim); letter-spacing: .1em; }
        #lpai .live-badge { display: inline-flex; align-items: center; gap: 6px; font-family: var(--mono); font-size: 10.5px; letter-spacing: .06em; color: var(--green); border: 1px solid rgba(57,255,20,.32); border-radius: 999px; padding: 3px 9px; }
        #lpai .pillar-tag { font-family: var(--mono); font-size: 12px; letter-spacing: .2em; color: var(--green); margin: 16px 0 0; }
        #lpai .pillar h3 { margin: 8px 0 10px; font-size: 20px; }
        #lpai .pillar p { flex: 1; }
        #lpai .seal { align-self: flex-start; margin-top: 18px; font-family: var(--mono); font-size: 11.5px; color: var(--mut); border: 1px solid var(--line); border-radius: 8px; padding: 5px 10px; background: rgba(255,255,255,.02); }

        /* ---- proof ---- */
        #lpai .case-link { color: var(--green); text-decoration: none; border-bottom: 1px solid rgba(57,255,20,.35); }
        #lpai .case-link:hover { border-bottom-color: var(--green); }
        #lpai .proof-flow { display: flex; flex-direction: column; align-items: center; }
        #lpai .proof-shot { margin: 0; width: 100%; background: var(--card); border: 1px solid var(--line); border-radius: 18px; padding: 18px; overflow: hidden; }
        #lpai .proof-shot.shot-checkout { max-width: 620px; }
        #lpai .proof-shot img { display: block; width: 100%; height: auto; border-radius: 10px; }
        #lpai .proof-label { font-family: var(--mono); font-size: 11px; letter-spacing: .14em; text-transform: uppercase; color: var(--dim); margin-bottom: 14px; }
        #lpai .proof-arrow { color: var(--green); font-size: 20px; line-height: 1; margin: 14px 0; opacity: .8; }
        #lpai .proof-caption { font-size: 15px; color: var(--mut); text-align: center; margin: 22px 0 0; max-width: 620px; line-height: 1.6; }
        #lpai .proof-caption b { color: #fff; font-weight: 600; }
        #lpai .terminal-teaser { display: flex; flex-direction: column; gap: 12px; margin-top: 20px; text-decoration: none; background: #0a0a0c; border: 1px solid var(--line); border-radius: 16px; padding: 20px 22px; transition: border-color .2s; }
        #lpai .terminal-teaser:hover { border-color: rgba(122,44,255,.5); }
        #lpai .tt-mini { font-family: var(--mono); font-size: 14px; color: #cfd0d6; }
        #lpai .tt-prompt { color: var(--purple); margin-right: 8px; }
        #lpai .tt-cursor { display: inline-block; width: 8px; height: 15px; background: var(--green); margin-left: 4px; vertical-align: middle; animation: lppulse 1s steps(2) infinite; }
        #lpai .tt-cta { font-family: var(--mono); font-size: 12.5px; color: var(--mut); }

        /* ---- personas ---- */
        #lpai .whom-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
        #lpai .whom { display: flex; flex-direction: column; }
        #lpai .whom-tag { align-self: flex-start; font-family: var(--mono); font-size: 11px; letter-spacing: .16em; padding: 5px 11px; border-radius: 8px; }
        #lpai .whom-tag.green { color: var(--green); background: rgba(57,255,20,.08); border: 1px solid rgba(57,255,20,.26); }
        #lpai .whom-tag.purple { color: #c9a8ff; background: rgba(122,44,255,.12); border: 1px solid rgba(122,44,255,.34); }
        #lpai .whom h3 { font-size: 18.5px; }
        #lpai .whom p { flex: 1; font-size: 15px; }
        #lpai .link-cta { align-self: flex-start; margin-top: 18px; background: none; border: none; color: var(--green); font-family: 'Sora', sans-serif; font-weight: 600; font-size: 15px; cursor: pointer; padding: 0; }
        #lpai .link-cta.purple { color: #b98bff; }

        /* ---- control ---- */
        #lpai .control-sec { background: radial-gradient(70% 60% at 50% 0%, rgba(122,44,255,.08), transparent 62%); }
        #lpai .control-card { background: var(--card); border: 1px solid var(--line); border-left: 3px solid var(--green); border-radius: 18px; padding: 34px; }
        #lpai .ctrl-ico { font-size: 24px; }
        #lpai .control-card h2 { font-size: clamp(22px, 3vw, 30px); font-weight: 800; letter-spacing: -.02em; line-height: 1.2; margin: 14px 0 14px; }
        #lpai .control-card p { color: var(--mut); font-size: 16px; line-height: 1.62; margin: 0; }

        /* ---- urgency ---- */
        #lpai .urg-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 12px; }
        #lpai .urg-list li { display: flex; align-items: flex-start; gap: 12px; background: var(--card); border: 1px solid var(--line); border-radius: 14px; padding: 18px 20px; font-size: 15.5px; color: #D6D6DC; }
        #lpai .urg-arrow { color: var(--green); font-family: var(--mono); flex-shrink: 0; }

        /* ---- faq ---- */
        #lpai .aiu-faq-item { border: 1px solid var(--line); border-radius: 14px; margin-bottom: 10px; overflow: hidden; background: var(--card); }
        #lpai .aiu-faq-q { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 14px; text-align: left; background: none; border: none; color: var(--ink); font-family: 'Sora', sans-serif; font-size: 16px; font-weight: 600; padding: 20px 22px; cursor: pointer; }
        #lpai .aiu-faq-q .chev { color: var(--green); font-size: 20px; transition: transform .25s; flex-shrink: 0; }
        #lpai .aiu-faq-item.open .aiu-faq-q .chev { transform: rotate(45deg); }
        #lpai .aiu-faq-a { max-height: 0; overflow: hidden; transition: max-height .3s ease; }
        #lpai .aiu-faq-item.open .aiu-faq-a { max-height: 260px; }
        #lpai .aiu-faq-a p { margin: 0; padding: 0 22px 20px; color: var(--mut); font-size: 15px; line-height: 1.62; }

        /* ---- final band ---- */
        #lpai .final-band { position: relative; padding: 92px 0; border-top: 1px solid var(--line);
          background: linear-gradient(180deg, rgba(57,255,20,.06), rgba(122,44,255,.14)); }
        #lpai .final-band::before { content: ""; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: var(--grad); }
        #lpai .final-band .sec-head h2 { font-size: clamp(24px, 3.6vw, 38px); }
        #lpai .signature { text-align: center; margin-top: 44px; font-size: clamp(21px, 3.2vw, 30px); font-weight: 800; letter-spacing: -.02em; }

        @media (max-width: 900px) {
          #lpai .aiu-hero-grid { grid-template-columns: 1fr; gap: 34px; }
          #lpai .cards-3, #lpai .proof-grid, #lpai .whom-grid { grid-template-columns: 1fr; }
          #lpai .sec, #lpai .final-band { padding: 70px 0; }
          #lpai .lead { max-width: none; }
          #lpai .aiu-hero { padding-top: 96px; }
          #lpai .pillar { min-height: 0; }
          #lpai .control-card { padding: 26px; }
        }
        @media (prefers-reduced-motion: reduce) {
          #lpai [data-reveal] { opacity: 1 !important; transform: none !important; }
        }
      `}</style>
    </>
  )
}

function WaitlistForm({ id, title, subtitle, micro, full, perfilPre }) {
  const [form, setForm] = useState({ nome: '', email: '', whatsapp: '', perfil: '', faturamento: '' })
  const [status, setStatus] = useState('idle')

  // CTAs de persona pré-selecionam o perfil
  useEffect(() => {
    if (perfilPre) setForm((f) => (f.perfil ? f : { ...f, perfil: perfilPre }))
  }, [perfilPre])

  const onPhone = (e) => setForm({ ...form, whatsapp: maskBR(e.target.value) })

  const submit = async (e) => {
    e.preventDefault()
    const digits = form.whatsapp.replace(/\D/g, '')
    if (!form.nome.trim() || !/.+@.+\..+/.test(form.email) || digits.length < 10 || !form.perfil) return
    setStatus('sending')
    try {
      const res = await fetch('/api/ai-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, origem: `LP /ai-unbox (${id})` }),
      })
      setStatus(res.ok ? 'done' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div className={`wl-card${full ? ' full' : ''}`}>
        <div className="thanks">
          <div className="thanks-ico">✓</div>
          <h3>Você está na lista.</h3>
          <p>Vamos te chamar por ordem de chegada, com as novidades e as condições de early access antes da abertura pública.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`wl-card${full ? ' full' : ''}`}>
      {title && <h3 className="wl-title">{title}</h3>}
      {subtitle && <p className="wl-sub">{subtitle}</p>}
      <form onSubmit={submit}>
        <div className="field">
          <label htmlFor={`nome-${id}`}>Seu nome</label>
          <input id={`nome-${id}`} type="text" value={form.nome} placeholder="Como podemos te chamar" onChange={(e) => setForm({ ...form, nome: e.target.value })} required />
        </div>
        <div className="field">
          <label htmlFor={`email-${id}`}>Seu melhor e-mail</label>
          <input id={`email-${id}`} type="email" value={form.email} placeholder="voce@suamarca.com.br" onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        </div>
        <div className="field">
          <label htmlFor={`wpp-${id}`}>Seu WhatsApp</label>
          <input
            id={`wpp-${id}`}
            type="tel"
            inputMode="tel"
            value={form.whatsapp}
            placeholder="(11) 91234-5678"
            onChange={onPhone}
            required
          />
        </div>
        <div className="field">
          <label htmlFor={`perfil-${id}`}>Sou</label>
          <select id={`perfil-${id}`} value={form.perfil} onChange={(e) => setForm({ ...form, perfil: e.target.value })} required>
            <option value="" disabled>Selecione</option>
            {PERFIS.map((p) => <option key={p}>{p}</option>)}
          </select>
        </div>
        {full && (
          <div className="field">
            <label htmlFor={`fat-${id}`}>Faturamento mensal aproximado <span className="opt">(opcional)</span></label>
            <select id={`fat-${id}`} value={form.faturamento} onChange={(e) => setForm({ ...form, faturamento: e.target.value })}>
              <option value="">Prefiro não informar</option>
              {FATURAMENTO.map((f) => <option key={f}>{f}</option>)}
            </select>
          </div>
        )}
        <button className="aiu-btn" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Enviando…' : 'Quero meu acesso antecipado'}
        </button>
        {status === 'error' && <p className="err">Algo deu errado ao enviar. Tente de novo em instantes.</p>}
        {micro && <p className="micro">{micro}</p>}
      </form>
    </div>
  )
}
