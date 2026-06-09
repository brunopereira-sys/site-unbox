import React from 'react';
import { URLS } from '../lib/config';
import Nav from './Nav';
import DemoModal from './DemoModal';
import { FinalCTA, Footer, WhatsAppFloater } from './Closing';
import { FIcon, PageHero, useReveal } from './PageKit';

const CR_STATS = [
  { n: "0", d: "custo fixo, você só paga quando a venda acontece" },
  { n: "100%", d: "das vendas rastreadas por cupom e link de cada creator" },
  { n: "Tempo real", d: "vendas, comissões e ROI acompanhados no painel" },
];

const CR_FLOW = [
  { t: "Marca ativa", d: "Sua marca entra na rede e define produtos, comissões e regras da campanha." },
  { t: "Creators recebem a oferta", d: "Os creators da base recebem a oferta e escolhem divulgar seus produtos." },
  { t: "Divulgam com link", d: "Cada creator divulga com cupom e link rastreáveis no próprio conteúdo." },
  { t: "Venda rastreada", d: "A venda acontece no seu checkout, com atribuição automática ao creator." },
  { t: "Comissão atribuída", d: "A comissão é vinculada à venda e repassada ao afiliado." },
];

const CR_ITEMS = [
  { icon: "users", t: "Creators integrados ao checkout", d: "Uma rede de creators conectada diretamente ao seu checkout, sem ferramentas externas." },
  { icon: "tag", t: "Cupons e links exclusivos", d: "Cupons e links de compra rastreáveis para cada creator. Você sabe exatamente de onde veio cada venda." },
  { icon: "check", t: "Pague por venda", d: "100% performance: a comissão só acontece quando a venda é realmente concretizada." },
  { icon: "chart", t: "Acompanhamento de KPIs", d: "Resultados e KPIs de crescimento de cada creator, acompanhados em tempo real no painel." },
  { icon: "bolt", t: "Gerenciamento de campanhas", d: "Gestão das campanhas e dos resultados de ponta a ponta, com acompanhamento contínuo.", tag: "Via Parceiro" },
  { icon: "wallet", t: "Automação de pagamento", d: "Repasse das comissões dos creators automatizado, sem trabalho manual.", tag: "Via Parceiro" },
];

const CR_RECEBE = [
  "Acesso à base de creators: sem precisar recrutar!",
  "Onboarding completo: conta, landing page e comissões",
  "Estratégia mensal por categoria com foco em conversão",
  "Dashboard em tempo real: vendas, comissões e ROI",
  "Suporte estratégico com account manager dedicado",
  "Produtos nas boxes do grupo UAU (UauBox, Experimentaí, Scarlet)",
];

const CRD = [
  { h: "@ana.lima", cupom: "ANA10", gmv: 128370.61, ped: 427, ticket: 300.63, series: [4, 8, 12, 17, 22, 28, 35, 42, 50, 58, 66, 75] },
  { h: "@joao.silva", cupom: "JOAO15", gmv: 114973.37, ped: 445, ticket: 258.37, series: [6, 10, 13, 17, 21, 26, 31, 37, 43, 50, 57, 64] },
  { h: "@chico.reis", cupom: "CHICO10", gmv: 60904.48, ped: 260, ticket: 234.25, series: [3, 6, 9, 12, 16, 20, 24, 29, 34, 40, 46, 52] },
  { h: "@maria.luz", cupom: "MARIA10", gmv: 24650.93, ped: 102, ticket: 241.68, series: [2, 4, 7, 10, 12, 15, 19, 23, 27, 32, 37, 43] },
];
const CR_COMMISSION = 0.12;
const crBRL = (n) => "R$ " + n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function CreatorDash() {
  const [active, setActive] = React.useState(0);
  const c = CRD[active];
  const pts = c.series.map((v, i) => `${(i / (c.series.length - 1) * 300).toFixed(1)},${(120 - v / 80 * 104).toFixed(1)}`).join(" ");
  return (
    <div className="dd-panel">
      <div className="dd-panel-glow" aria-hidden="true"></div>
      <div className="dd-bar">
        <span className="dd-bar-title">Desempenho por cupom</span>
        <div className="dd-bar-filters">
          <span className="dd-live"><span className="dd-live-dot"></span>tempo real</span>
        </div>
      </div>
      <div className="crd-chips">
        {CRD.map((cr, i) => (
          <button key={cr.cupom} className={"crd-chip" + (active === i ? " is-active" : "")} onClick={() => setActive(i)} type="button">
            <span className="crd-chip-h">{cr.h}</span>
            <span className="crd-chip-c">{cr.cupom}</span>
          </button>
        ))}
      </div>
      <div className="dd-canvas" key={active}>
        <div className="dd-view">
          <div className="dd-kpis dd-kpis--4">
            <div className="dd-kpi"><span className="dd-kpi-lbl">GMV gerado</span><strong className="dd-kpi-val">{crBRL(c.gmv)}</strong></div>
            <div className="dd-kpi"><span className="dd-kpi-lbl">Comissão</span><strong className="dd-kpi-val">{crBRL(c.gmv * CR_COMMISSION)}</strong></div>
            <div className="dd-kpi"><span className="dd-kpi-lbl"># Pedidos</span><strong className="dd-kpi-val">{c.ped.toLocaleString("pt-BR")}</strong></div>
            <div className="dd-kpi"><span className="dd-kpi-lbl">Ticket médio</span><strong className="dd-kpi-val">{crBRL(c.ticket)}</strong></div>
          </div>
          <div className="dd-chart">
            <div className="dd-chart-head">
              <span className="dd-chart-title">Evolução de vendas · {c.cupom}</span>
              <span className="dd-chart-legend"><i><span className="dd-dot" style={{ background: "var(--ub-roxo-claro)" }}></span>últimos 30 dias</i></span>
            </div>
            <svg viewBox="0 0 300 122" className="dd-svg" preserveAspectRatio="none">
              {[0, 30, 60, 90].map((y) => <line key={y} x1="0" x2="300" y1={y} y2={y} className="dd-grid" />)}
              <polyline className="dd-line dd-line--cur" points={pts} />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

const CR_DASH_PTS = [
  "Filtre por cupom ou creator em um clique",
  "Comissões e ROI calculados automaticamente",
  "Evolução diária, sem exportar, sem planilha",
];

const CR_HERO_SALES = [
  { h: "@ana.lima", a: "A", c: "ANA10", v: "R$ 189,90" },
  { h: "@joao.silva", a: "J", c: "JOAO15", v: "R$ 254,00" },
  { h: "@chico.reis", a: "C", c: "CHICO10", v: "R$ 132,50" },
  { h: "@maria.luz", a: "M", c: "MARIA10", v: "R$ 97,00" },
];
const CR_HERO_BARS = [
  { lbl: "ana", h: 86 }, { lbl: "joao", h: 64 }, { lbl: "chico", h: 44 }, { lbl: "maria", h: 32 },
];

function CreatorsHeroVisual() {
  const [reduce, setReduce] = React.useState(false);
  const [gmv, setGmv] = React.useState(18420);
  const [items, setItems] = React.useState([]);
  const idRef = React.useRef(0);

  React.useEffect(() => {
    const mq = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduce(mq);
  }, []);

  React.useEffect(() => {
    if (reduce) { setItems(CR_HERO_SALES.slice(0, 2).map((s, i) => ({ id: i, sale: s }))); return; }
    let i = 0;
    const tick = () => {
      setItems((prev) => [...prev, { id: idRef.current++, sale: CR_HERO_SALES[i % CR_HERO_SALES.length] }].slice(-3));
      setGmv((g) => g + Math.floor(40 + Math.random() * 170));
      i++;
    };
    tick();
    const iv = setInterval(tick, 1900);
    return () => clearInterval(iv);
  }, [reduce]);

  const brl = (n) => "R$ " + n.toLocaleString("pt-BR");
  return (
    <div className="cr-hero-vis">
      <div className="cr-hero-aura" aria-hidden="true"></div>
      <div className="cr-hero-card">
        <div className="cr-hero-card-top">
          <span className="cr-hero-ico"><FIcon name="users" size={18} /></span>
          <span className="cr-hero-handle">Vendas por creator<small>atribuição por cupom</small></span>
          <span className="cr-hero-live"><i></i>ao vivo</span>
        </div>
        <div className="cr-hero-metrics">
          <div className="cr-hero-metric"><span>GMV gerado</span><strong>{brl(gmv)}</strong></div>
          <div className="cr-hero-metric"><span>Comissão</span><strong>{brl(Math.round(gmv * 0.12))}</strong></div>
        </div>
        <div className="cr-hero-bars">
          {CR_HERO_BARS.map((b, i) => (
            <div className="cr-hero-bar" key={b.lbl}>
              <span className="cr-hero-bar-fill" style={{ height: b.h + "%", animationDelay: 120 + i * 90 + "ms" }}></span>
              <span className="cr-hero-bar-lbl">{b.lbl}</span>
            </div>
          ))}
        </div>
      </div>

      <span className="cr-hero-chip cr-hero-chip--1">ANA10</span>
      <span className="cr-hero-chip cr-hero-chip--2">JOAO15</span>

      <div className="cr-hero-toasts" aria-hidden="true">
        {items.map(({ id, sale }) => (
          <div className="cr-hero-toast" key={id}>
            <span className="cr-hero-toast-ico"><FIcon name="check" size={14} /></span>
            <div>
              <p className="t">Venda via {sale.h} · <strong>{sale.v}</strong></p>
              <p className="s">cupom {sale.c} · rastreada</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CreatorsPage() {
  useReveal();
  return (
    <React.Fragment>
      <Nav />
      <main>
        <PageHero
          eyebrow="Unbox Creators"
          badge="Beta"
          title={<React.Fragment>Transforme sua comunidade em<br /><em className="accent-em">canal de aquisição</em>.</React.Fragment>}
          lede="Transforme afiliados e creators em canal de vendas. Rede integrada ao checkout, com cupons e rastreamento nativos. Você só paga quando a venda acontece."
          ctaPrimary={<a href={URLS.demo} className="btn btn--primary">Agendar demo →</a>}
          ctaSecondary={<a href={URLS.signup} className="btn btn--secondary">Comece agora</a>}
        >
          <CreatorsHeroVisual />
        </PageHero>

        <section className="section section--alt">
          <div className="container cr-flow-wrap">
            <div className="block-head block-head--center reveal">
              <h2 className="h2">Como <em className="accent-em">funciona</em>.</h2>
              <p className="lede block-lede">Modelo inspirado no TikTok Shop Affiliates: do convite à comissão paga, em cinco passos.</p>
            </div>
            <div className="cr-flow reveal">
              <div className="cr-flow-track"><div className="cr-flow-fill"></div></div>
              {CR_FLOW.map((s, i) => (
                <div className="cr-flow-step" key={s.t}>
                  <div className="cr-flow-num">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="cr-flow-h">{s.t}</h3>
                  <p className="cr-flow-b">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="block-head reveal">
              <h2 className="h2">Tudo para gerenciar seus<br /><em className="accent-em">creators em um só lugar</em>.</h2>
              <p className="lede block-lede">Criar, rastrear e remunerar campanhas com creators, nativo na plataforma, com gestão e pagamento via parceiro.</p>
            </div>
            <div className="feat-grid">
              {CR_ITEMS.map((it, i) => (
                <article className="card feat-card reveal" key={it.t} style={{ transitionDelay: (i % 3) * 60 + "ms" }}>
                  <div className="feat-card-top">
                    <div className="icon-chip"><FIcon name={it.icon} /></div>
                    {it.tag && <span className="cr-via">{it.tag}</span>}
                  </div>
                  <h3 className="feat-card-h">{it.t}</h3>
                  <p className="feat-card-b">{it.d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--alt">
          <div className="container cr-dash-grid">
            <div className="cr-dash-copy">
              <h2 className="h2 reveal" style={{ transitionDelay: "60ms" }}>Esqueça as<br /><em className="accent-em">planilhas</em>.</h2>
              <p className="lede block-lede reveal" style={{ transitionDelay: "120ms" }}>
                Filtre todos os seus dashboards por cupom e acompanhe a evolução de cada creator em tempo real,
                vendas, comissões e ROI, sem exportar nada.
              </p>
              <ul className="cr-dash-pts reveal" style={{ transitionDelay: "180ms" }}>
                {CR_DASH_PTS.map((t) => (
                  <li key={t}><span className="cr-dash-check"><FIcon name="check" size={13} /></span><span>{t}</span></li>
                ))}
              </ul>
            </div>
            <div className="cr-dash-panel reveal" style={{ transitionDelay: "120ms" }}>
              <CreatorDash />
            </div>
          </div>
        </section>

        <section className="section cr-growth-intro">
          <div className="cr-growth-intro-aura" aria-hidden="true"></div>
          <div className="container cr-growth-intro-inner reveal">
            <h2 className="h2">Transforme creators em<br /><em className="accent-em">seu canal de vendas mais eficiente</em>.</h2>
            <p className="lede block-lede">
              Creators divulgam seus produtos, você só paga quando vende. Totalmente integrado ao seu e-commerce,
              à estrutura de cupons e ao fluxo financeiro da Unbox, com nosso time cuidando da operação.
            </p>
            <a href={URLS.demo} className="btn btn--primary">Falar com a equipe Growth →</a>
          </div>
        </section>

        <section className="section section--alt">
          <div className="container">
            <div className="block-head block-head--center reveal">
              <h2 className="h2">O que você <em className="accent-em">recebe</em>.</h2>
              <p className="lede block-lede">Um programa gerenciado de ponta a ponta para vender com creators.</p>
            </div>
            <div className="cr-recebe-grid reveal">
              {CR_RECEBE.map((t) => (
                <div className="cr-recebe-item" key={t}>
                  <span className="cr-recebe-check"><FIcon name="check" size={15} /></span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppFloater />
      <DemoModal />
    </React.Fragment>
  );
}

export default CreatorsPage;
