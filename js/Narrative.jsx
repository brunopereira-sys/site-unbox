// Narrative.jsx, seções de narrativa (problema, ecossistema, prova social, 10x, migração)
// Usa window.Icon (definido em Sections.jsx)

/* ================= PROBLEMA ================= */
const PAINS = [
  { icon: "clock", hi: true, title: "CAC subindo, cliente sumindo", body: "O cliente compra uma vez e some. Cada nova venda custa mais que a anterior. Você está enchendo um balde furado." },
  { icon: "zap", title: "Checkout que sangra receita", body: "70% dos carrinhos são abandonados. Redirecionamento, etapas demais, baixa aprovação. Cada clique perdido é dinheiro que foi embora." },
  { icon: "repeat", title: "Assinatura que não retém", body: "Apps de terceiros desconectados, fluxo quebrado, cliente que não consegue pausar ou gerenciar. A recorrência virou promessa." },
  { icon: "box", title: "Capital preso, crescimento travado", body: "Tem demanda, tem produto, falta caixa para o próximo lote. Banco não entende D2C, investidor quer equity. O ciclo trava." },
];

function Problema() {
  return (
    <section className="section problema">
      <div className="container">
        <div className="block-head reveal">
          <h2 className="h2">Sua plataforma está te<br /><em className="accent-em">custando crescimento</em>.</h2>
          <p className="lede block-lede">
            Você investe em tráfego, gera venda, mas a receita não acumula.
            O problema não é o seu produto. É a infraestrutura por trás dele.
          </p>
        </div>
        <div className="problema-grid">
          {PAINS.map((p, i) => (
            <article className={"card problema-card" + (p.hi ? " is-hi" : "")} key={p.title} style={{ transitionDelay: i * 70 + "ms" }}>
              <div className="problema-icon"><Icon name={p.icon} size={18} /></div>
              <h3 className="problema-title">{p.title}</h3>
              <p className="problema-body">{p.body}</p>
            </article>
          ))}
        </div>
        <div className="pivot-banner reveal">
          <div className="final-banner-aura"></div>
          <p className="pivot-banner-text">
            Marcas que vendem todo dia não têm plataforma, <em>têm parceiro de crescimento</em>.
          </p>
          <a href={window.UNBOX_URLS.demo} className="btn btn--secondary pivot-banner-btn">Agendar demo →</a>
        </div>
      </div>
    </section>
  );
}
window.Problema = Problema;

/* ================= ECOSSISTEMA, 4 pilares (explorador interativo) ================= */
const PILLARS = [
  {
    n: "01", name: "Plataforma de E-commerce", icon: "layout",
    tagline: "Sua loja D2C, pronta para escalar",
    desc: "Lojas rápidas, customizáveis e otimizadas para conversão. Do primeiro pedido aos milhões em vendas.",
    metric: "4×", metricLbl: "mais conversão", href: "#plataforma",
    features: [
      { icon: "layout", t: "Layouts 100% customizáveis", d: "Mobile-first, com SEO e performance de ponta." },
      { icon: "bolt", t: "Checkout TURBO", d: "3 etapas, sem redirecionamento." },
      { icon: "repeat", t: "Assinatura 100% nativa", d: "Recorrência da página de produto ao checkout." },
      { icon: "tag", t: "Promoções e Bundles", d: "Combos, cupons e descontos progressivos para elevar o ticket." },
    ],
  },
  {
    n: "02", name: "Unbox Pay", icon: "card",
    tagline: "Pagamento que aprova + capital que escala",
    desc: "Gateway próprio com antifraude por IA e crédito para crescer sem travar o caixa.",
    metric: "+98%", metricLbl: "aprovação", href: "#checkout",
    features: [
      { icon: "shield", t: "Antifraude por IA", d: "Aprovação alta com o risco sob controle." },
      { icon: "tag", t: "Crédito até R$500k", d: "Amortizado pelas suas próprias vendas." },
      { icon: "zap", t: "Pix, cartão e boleto", d: "Em até 12×, com taxas competitivas." },
      { icon: "gauge", t: "Liquidez rápida", d: "Receba antes e gire o caixa." },
    ],
  },
  {
    n: "03", name: "Dashs & Dados", icon: "chart",
    tagline: "Decisões guiadas por dados em tempo real",
    desc: "Dashboards e relatórios nativos para enxergar vendas, conversão e LTV, e agir na hora.",
    metric: "Tempo real", metricLbl: "visão do negócio", href: "#plataforma",
    features: [
      { icon: "chart", t: "Dashboards em tempo real", d: "Vendas, ticket médio e conversão num só painel." },
      { icon: "gauge", t: "Métricas de performance", d: "Acompanhe funil, recompra e LTV dos clientes." },
      { icon: "repeat", t: "Dados de assinatura", d: "Recorrência, churn e MRR sempre à vista." },
      { icon: "layout", t: "Relatórios e exportação", d: "Integrados a ERP e prontos para o seu time." },
    ],
  },
  {
    n: "04", name: "Creators", icon: "users",
    tagline: "Creators como canal de aquisição",
    desc: "Rede de creators integrada ao checkout, você só paga quando a venda acontece.",
    metric: "~15%", metricLbl: "custo por venda", href: "#prova",
    features: [
      { icon: "hand", t: "Pague por performance", d: "Custo só quando a venda acontece." },
      { icon: "tag", t: "Cupons e rastreio nativos", d: "Atribuição precisa por creator." },
      { icon: "sparkle", t: "Rede curada de creators", d: "Conectada direto ao seu catálogo." },
      { icon: "chart", t: "Métricas por canal", d: "ROI de cada creator em tempo real." },
    ],
  },
];

function Ecossistema() {
  const [active, setActive] = React.useState(0);
  const p = PILLARS[active];
  return (
    <section className="section ecossistema" id="ecossistema">
      <div className="ecossistema-aura"></div>
      <div className="container">
        <div className="block-head reveal">
          <h2 className="h2">Sua operação em <em className="accent-em">piloto automático</em>.</h2>
          <p className="lede block-lede">
            Tudo que sua marca precisa para vender, receber, entregar e crescer
            integrado nativamente desde o primeiro dia.
          </p>
        </div>

        <div className="pillars reveal">
          <div className="pillars-rail" role="tablist" aria-label="Pilares Unbox">
            {PILLARS.map((pl, i) => (
              <button
                key={pl.n}
                role="tab"
                aria-selected={active === i}
                className={"pillar-tab" + (active === i ? " is-active" : "")}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}>
                <span className="pillar-tab-ico"><window.Icon name={pl.icon} size={20} /></span>
                <span className="pillar-tab-label">
                  <span className="pillar-tab-num">{pl.n}</span>
                  <span className="pillar-tab-name">{pl.name}</span>
                </span>
                <span className="pillar-tab-chev" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
                </span>
              </button>
            ))}
          </div>

          <div className="pillar-panel" key={active}>
            <div className="pillar-panel-glow"></div>
            <div className="pillar-panel-top">
              <div className="pillar-panel-intro">
                <h3 className="pillar-panel-title">{p.tagline}</h3>
                <p className="pillar-panel-desc">{p.desc}</p>
              </div>
              <div className="pillar-metric">
                <strong>{p.metric}</strong>
                <span>{p.metricLbl}</span>
              </div>
            </div>

            <div className="pillar-features">
              {p.features.map((f, fi) => (
                <div className="pillar-feature" key={fi} style={{ animationDelay: 60 + fi * 55 + "ms" }}>
                  <span className="pillar-feature-ico"><window.Icon name={f.icon} size={18} /></span>
                  <div className="pillar-feature-text">
                    <h4>{f.t}</h4>
                    <p>{f.d}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
window.Ecossistema = Ecossistema;

/* ================= PROVA SOCIAL ================= */
const CASES = [
  { metric: "+180%", lbl: "de receita recorrente em 4 meses", seg: "Suplementos", quote: "Antes da Unbox, assinatura era uma gambiarra. Agora é 60% da nossa receita mensal, previsível, automático, sem dor de cabeça.", author: "Fundadora, Sunrize", tools: ["Assinatura", "Checkout TURBO"] },
  { metric: "62%", gold: true, lbl: "dos clientes viraram assinantes", seg: "Skincare", quote: "Taxa de abandono de checkout caiu 38%. Aprovação de cartão subiu 18 pontos. A diferença foi sentida no mesmo mês da migração.", author: "Co-founder, Glow", tools: ["Checkout TURBO", "Unbox Pay"] },
  { metric: "3×", lbl: "crescimento de receita em 6 meses", seg: "Pet", quote: "O crédito Unbox Pay financiou nosso maior lote sem travar o fluxo de caixa. Crescemos sem abrir mão de equity.", author: "CEO, Bhava", tools: ["Unbox Pay", "Crédito"] },
];

function ProvaSocial() {
  const [active, setActive] = React.useState(null);
  const open = active !== null;

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((a) => (a + 1) % STORIES.length);
      if (e.key === "ArrowLeft") setActive((a) => (a - 1 + STORIES.length) % STORIES.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);

  const s = open ? STORIES[active] : null;

  return (
    <section className="section prova" id="prova">
      <div className="container">
        <div className="block-head reveal">
          <h2 className="h2">Marcas que já crescem<br /><em className="accent-em">com a Unbox</em>.</h2>
          <p className="lede block-lede">Fundadores reais contando, em 60 segundos, o que mudou na operação. Clique para assistir.</p>
        </div>

        <div className="results-grid">
          {STORIES.map((r, i) => (
            <article className="result-card reveal" key={r.brand} style={{ transitionDelay: i * 80 + "ms" }}>
              <button className="result-thumb" onClick={() => setActive(i)} aria-label={"Assistir depoimento " + r.brand}>
                {r.video ? (
                  <video className="result-thumb-media" src={r.video} autoPlay muted loop playsInline preload="metadata" ref={(el) => { if (el) { el.muted = true; el.defaultMuted = true; } }}></video>
                ) : (
                  <div className="result-thumb-media result-thumb-img" style={{ backgroundImage: "url(" + r.img + ")" }}></div>
                )}
                <div className="story-overlay"></div>
                <div className="result-thumb-top">
                  <span className="story-brand">{r.brand}</span>
                  <span className="story-seg">{r.seg}</span>
                </div>
                {!r.video && <span className="story-play"><PlayIcon /></span>}
                <div className="result-thumb-foot">
                  <span className={"result-metric" + (r.gold ? " is-gold" : "")}>{r.metric}</span>
                  <p className="result-lbl">{r.lbl}</p>
                  <p className="result-quote">“{r.quote}”</p>
                  <p className="result-author">{r.author}</p>
                </div>
              </button>
            </article>
          ))}
        </div>
      </div>

      {open && (
        <div className="story-modal" onClick={() => setActive(null)}>
          <button className="story-nav story-nav--prev" onClick={(e) => { e.stopPropagation(); setActive((active - 1 + STORIES.length) % STORIES.length); }} aria-label="Anterior">‹</button>
          <div className="story-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="story-progress">
              {STORIES.map((_, i) => <span key={i} className={"story-progress-bar" + (i === active ? " is-active" : "")}></span>)}
            </div>
            <button className="story-modal-close" onClick={() => setActive(null)} aria-label="Fechar">✕</button>
            <div className={"story-modal-media" + (s.video ? " has-video" : "")} style={{ backgroundImage: s.video ? "none" : "url(" + s.img + ")" }}>
              {s.video ? (
                <video className="story-modal-video" src={s.video} controls autoPlay playsInline preload="metadata"></video>
              ) : (
                <React.Fragment>
                  <div className="story-overlay"></div>
                  <span className="story-play story-play--lg"><PlayIcon size={32} /></span>
                </React.Fragment>
              )}
              <div className="story-modal-head">
                <span className="story-brand">{s.brand}</span>
                <span className="story-seg">{s.seg}</span>
              </div>
              {!s.video && (
                <div className="story-modal-foot">
                  <span className="story-modal-metric"><strong>{s.metric}</strong> {s.metricLbl}</span>
                  <p className="story-modal-quote">“{s.quote}”</p>
                  <p className="story-modal-author">{s.author}</p>
                </div>
              )}
            </div>
          </div>
          <button className="story-nav story-nav--next" onClick={(e) => { e.stopPropagation(); setActive((active + 1) % STORIES.length); }} aria-label="Próximo">›</button>
        </div>
      )}
    </section>
  );
}
window.ProvaSocial = ProvaSocial;

/* ================= PROJETO 10X ================= */
function Projeto10x() {
  return (
    <section className="section projeto10x" id="projeto10x">
      <div className="projeto10x-aura"></div>
      <div className="container projeto10x-inner">
        <div className="projeto10x-copy">
          <span className="badge badge--novo reveal">✦ Programa seletivo · Vagas limitadas</span>
          <h2 className="h2 reveal projeto10x-h2" style={{ transitionDelay: "60ms" }}>
            Não é consultoria.<br />Não é agência.<br /><em className="accent-em">É parceria para crescer 10×.</em>
          </h2>
          <p className="lede block-lede reveal" style={{ transitionDelay: "120ms" }}>
            Quando a Unbox deixa de ser plataforma e entra como parceira estratégica
            de crescimento da sua marca. Para quem já fatura e quer mudar de patamar em 12 meses.
          </p>
          <div className="projeto10x-cta reveal" style={{ transitionDelay: "200ms" }}>
            <a href={window.UNBOX_URLS.demo} className="btn btn--primary">Candidatar-se ao Projeto 10x →</a>
          </div>
          <p className="projeto10x-qual meta reveal" style={{ transitionDelay: "260ms" }}>
            Exclusivo para marcas com faturamento acima de R$150k/mês
          </p>
        </div>
        <div className="projeto10x-cards">
          <div className="card projeto10x-item reveal" style={{ transitionDelay: "120ms" }}>
            <span className="meta">O que você recebe</span>
            <ul className="projeto10x-list">
              <li>Head de Growth como Board Member</li>
              <li>Estratégia + execução + capital</li>
              <li>Atuação além do e-commerce, em canais e mercado</li>
            </ul>
          </div>
          <div className="card projeto10x-item reveal" style={{ transitionDelay: "180ms" }}>
            <span className="meta">Por que é diferente</span>
            <ul className="projeto10x-list">
              <li>Growth e financeiro no mesmo lugar</li>
              <li>Dados e oportunidades de mercado</li>
              <li>Unbox Growth com creators integrados</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
window.Projeto10x = Projeto10x;

/* ================= MIGRAÇÃO ================= */
const MIG_STEPS = [
  { n: "01", title: "Demo + diagnóstico gratuito", body: "A gente entende sua operação antes de qualquer proposta. Sem compromisso." },
  { n: "02", title: "Migração assistida pela equipe", body: "Nossa equipe faz a migração com você. Você não precisa fazer nada sozinho." },
  { n: "03", title: "Suporte humano de verdade", body: "WhatsApp, chat e e-mail com especialistas que conhecem a sua operação." },
];
const MIG_FROM = ["Shopify", "Nuvemshop", "WooCommerce", "Tray", "Loja Integrada"];

function Migracao() {
  return (
    <section className="section migracao">
      <div className="container">
        <div className="block-head reveal">
          <h2 className="h2">Migrar é mais simples<br /><em className="accent-em">do que você imagina</em>.</h2>
        </div>
        <div className="mig-steps">
          {MIG_STEPS.map((s, i) => (
            <article className="card mig-step reveal" key={s.n} style={{ transitionDelay: i * 70 + "ms" }}>
              <span className="mig-num">{s.n}</span>
              <h3 className="h3 mig-step-title">{s.title}</h3>
              <p className="lede mig-step-body">{s.body}</p>
            </article>
          ))}
        </div>
        <div className="mig-from reveal">
          <span className="mig-from-lbl meta">Migramos de</span>
          <div className="mig-chips">
            {MIG_FROM.map((m) => <span className="mig-chip" key={m}>{m}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}
window.Migracao = Migracao;

/* ================= DEPOIMENTOS EM VÍDEO, formato stories ================= */
const STORIES = [
  { brand: "diCapri", seg: "Cafés", img: window.__resources["Sunrize"], metric: "+180%", metricLbl: "MRR em 4 meses", lbl: "de receita recorrente em 4 meses", author: "Fundadora · diCapri", quote: "Antes da Unbox, assinatura era uma gambiarra. Agora é 60% da nossa receita mensal, previsível, automático, sem dor de cabeça.", tools: ["Assinatura", "Checkout TURBO"] },
  { brand: "Popai", seg: "Snacks", img: window.__resources["Glow"], metric: "62%", gold: true, metricLbl: "viraram assinantes", lbl: "dos clientes viraram assinantes", author: "Co-founder · Popai", quote: "Abandono de checkout caiu 38%. Aprovação de cartão subiu 18 pontos. A diferença foi sentida no mesmo mês da migração.", tools: ["Checkout TURBO", "Unbox Pay"] },
  { brand: "GaAfeR", seg: "Chocolateria", img: window.__resources["Bhava"], video: window.__resources["video-gaafer"], metric: "4×", metricLbl: "produtos visitados por cliente", lbl: "mais produtos visitados por cliente", author: "CEO · GaAfeR", quote: "O resultado ficou maravilhoso, lindo e funcional! Agora os chocolates da GaAfeR podem chegar a todo o Brasil.", tools: ["Unbox Pay", "Crédito"] },
];

const PlayIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
);

function VideoStories() {
  const [active, setActive] = React.useState(null);
  const open = active !== null;

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((a) => (a + 1) % STORIES.length);
      if (e.key === "ArrowLeft") setActive((a) => (a - 1 + STORIES.length) % STORIES.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);

  const s = open ? STORIES[active] : null;

  return (
    <section className="section stories" id="depoimentos">
      <div className="container">
        <div className="block-head reveal">
          <h2 className="h2">Ouça de quem já <em className="accent-em">cresce com a gente</em>.</h2>
          <p className="lede block-lede">Fundadores reais contando, em 60 segundos, o que mudou na operação.</p>
        </div>
        <div className="stories-row">
          {STORIES.map((st, i) => (
            <button className="story-card reveal" key={st.brand} style={{ backgroundImage: "url(" + st.img + ")", transitionDelay: i * 70 + "ms" }} onClick={() => setActive(i)} aria-label={"Ver depoimento " + st.brand}>
              <div className="story-overlay"></div>
              <div className="story-top">
                <span className="story-brand">{st.brand}</span>
                <span className="story-seg">{st.seg}</span>
              </div>
              <span className="story-play"><PlayIcon /></span>
              <div className="story-bottom">
                <span className="story-metric">{st.metric}</span>
                <span className="story-metric-lbl">{st.metricLbl}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {open && (
        <div className="story-modal" onClick={() => setActive(null)}>
          <button className="story-nav story-nav--prev" onClick={(e) => { e.stopPropagation(); setActive((active - 1 + STORIES.length) % STORIES.length); }} aria-label="Anterior">‹</button>
          <div className="story-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="story-progress">
              {STORIES.map((_, i) => <span key={i} className={"story-progress-bar" + (i === active ? " is-active" : "")}></span>)}
            </div>
            <button className="story-modal-close" onClick={() => setActive(null)} aria-label="Fechar">✕</button>
            <div className={"story-modal-media" + (s.video ? " has-video" : "")} style={{ backgroundImage: s.video ? "none" : "url(" + s.img + ")" }}>
              {s.video ? (
                <video className="story-modal-video" src={s.video} controls autoPlay playsInline preload="metadata"></video>
              ) : (
                <React.Fragment>
                  <div className="story-overlay"></div>
                  <span className="story-play story-play--lg"><PlayIcon size={32} /></span>
                </React.Fragment>
              )}
              <div className="story-modal-head">
                <span className="story-brand">{s.brand}</span>
                <span className="story-seg">{s.seg}</span>
              </div>
              {!s.video && (
                <div className="story-modal-foot">
                  <span className="story-modal-metric"><strong>{s.metric}</strong> {s.metricLbl}</span>
                  <p className="story-modal-quote">“{s.quote}”</p>
                  <p className="story-modal-author">{s.author}</p>
                </div>
              )}
            </div>
          </div>
          <button className="story-nav story-nav--next" onClick={(e) => { e.stopPropagation(); setActive((active + 1) % STORIES.length); }} aria-label="Próximo">›</button>
        </div>
      )}
    </section>
  );
}
window.VideoStories = VideoStories;

/* ================= FAQ ================= */
const FAQS = [
  { q: "Como funciona a migração para a Unbox?", a: "Nossa equipe faz a migração assistida junto com você: produtos, clientes, histórico de pedidos e SEO. Você não fica sozinho em nenhuma etapa, e roda um diagnóstico gratuito antes de qualquer proposta." },
  { q: "O que diferencia a Unbox de outras plataformas?", a: "Tudo num só lugar e nativo: e-commerce, checkout TURBO, assinatura, Unbox Pay (pagamento + capital) e Growth com creators, integrados desde o primeiro dia, sem stack de apps quebrando." },
  { q: "Como funciona o Unbox Pay e o crédito?", a: "Gateway próprio com +98% de aprovação e antifraude por IA. O crédito de até R$500k é amortizado pelas suas próprias vendas, sem banco, sem garantia física e sem abrir mão de equity." },
  { q: "Meu SEO é preservado na migração?", a: "Sim. Cuidamos dos redirects e da estrutura de URLs para preservar seu ranqueamento e o tráfego orgânico que você já conquistou." },
  { q: "Para quem é o Projeto 10x?", a: "Para marcas acima de R$150k/mês que querem a Unbox como parceira estratégica de crescimento, com um Head de Growth embarcado atuando como Board Member." },
];

function FAQ() {
  const [open, setOpen] = React.useState(0);
  return (
    <section className="section faq" id="faq">
      <div className="container faq-grid">
        <div className="faq-head reveal">
          <h2 className="h2">Tudo que você<br />precisa saber.</h2>
          <p className="lede block-lede">Não achou sua resposta? Chama a gente no WhatsApp, tem gente de verdade do outro lado.</p>
          <a href={window.UNBOX_URLS.whatsapp} target="_blank" rel="noreferrer" className="btn btn--secondary faq-cta">Falar com especialista</a>
        </div>
        <div className="faq-list">
          {FAQS.map((f, i) => (
            <div className={"faq-item" + (open === i ? " is-open" : "")} key={i}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                <span>{f.q}</span>
                <span className="faq-icon" aria-hidden="true"></span>
              </button>
              <div className="faq-a-wrap">
                <p className="faq-a">{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
window.FAQ = FAQ;
