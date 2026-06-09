import React from 'react';
import { URLS, R } from '../lib/config';
import Nav from './Nav';
import DemoModal from './DemoModal';
import { Footer, WhatsAppFloater } from './Closing';
import { useReveal } from './PageKit';

const APPLY = "https://admin.credfly.com.br/apply?brand=unboxpay";

const I = (p) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{p}</svg>
);
const Ico = {
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  wallet: <React.Fragment><path d="M3 7h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" /><path d="M3 7l2-3h12l2 3M16 13h.01" /></React.Fragment>,
  factory: <React.Fragment><path d="M2 20h20M4 20V9l5 3V9l5 3V9l5 3v8" /><path d="M9 20v-4h2v4" /></React.Fragment>,
  file: <React.Fragment><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M8 13h8M8 17h6" /></React.Fragment>,
  check: <path d="M20 6 9 17l-5-5" />,
  x: <path d="M18 6 6 18M6 6l12 12" />,
  link: <React.Fragment><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1.5 1.5" /><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1.5-1.5" /></React.Fragment>,
  shieldcheck: <React.Fragment><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></React.Fragment>,
  refresh: <React.Fragment><path d="M21 2v6h-6M3 22v-6h6" /><path d="M3.5 9a9 9 0 0 1 14.85-3.36L21 8M20.5 15a9 9 0 0 1-14.85 3.36L3 16" /></React.Fragment>,
  trend: <React.Fragment><path d="M3 17 9 11l4 4 8-8" /><path d="M21 7v5h-5" /></React.Fragment>,
  user: <React.Fragment><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></React.Fragment>,
  cart: <React.Fragment><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" /></React.Fragment>,
  card: <React.Fragment><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></React.Fragment>,
  store: <React.Fragment><path d="M3 9 4 4h16l1 5M4 9v11h16V9M9 20v-6h6v6" /><path d="M3 9h18" /></React.Fragment>,
  users: <React.Fragment><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></React.Fragment>,
  swap: <React.Fragment><path d="M7 10 3 6l4-4M3 6h14M17 14l4 4-4 4M21 18H7" /></React.Fragment>,
  pin: <React.Fragment><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></React.Fragment>,
  zap: <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />,
  star: <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />,
};

const brl = (v) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(v);

function HeroVisual() {
  return (
    <div className="cf-visual">
      <video
        className="cf-media"
        src={R["credito-hero"]}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="cf-limit">
        <div className="cf-limit-head"><span className="cf-limit-icon">{I(Ico.card)}</span>Limite disponível:</div>
        <div className="cf-limit-val">R$380.000</div>
        <div className="cf-limit-sub">Amortização: 12% das vendas</div>
      </div>
      <div className="cf-sales">
        <div className="cf-sales-lbl">Vendas no mês</div>
        <div className="cf-sales-val">R$520.000</div>
        <div className="cf-sales-grow">{I(Ico.trend)} Crescimento <strong>+32%</strong></div>
      </div>
    </div>
  );
}

const TRUST = [
  { i: Ico.zap, t: "Até R$500mil por marca" },
  { i: Ico.shieldcheck, t: "Alavancagem real" },
  { i: Ico.star, t: "Aprovação rápida" },
  { i: Ico.card, t: "Integrado ao seu e-commerce" },
];

function Hero() {
  return (
    <section className="crd-hero">
      <div className="container">
        <div className="crd-hero-grid">
          <div className="reveal">
            <h1>Crédito para sua marca crescer. <em className="accent-em">Pague conforme você vende!</em></h1>
            <p className="crd-hero-sub">A Crédito UnboxPay oferece crédito para marcas digitais (DNVBs), com amortização automática integrada ao seu e-commerce. Cresça sem diluição de equity.</p>
            <div className="crd-hero-cta">
              <a href={APPLY} className="btn btn--primary">Solicitar análise {I(Ico.arrow)}</a>
              <a href="/industrias" className="btn btn--secondary">Seja uma indústria parceira!</a>
            </div>
          </div>
          <div className="reveal" style={{ transitionDelay: "120ms" }}><HeroVisual /></div>
        </div>
        <div className="crd-trust">
          <div className="crd-marquee">
            {[0, 1].map((g) => (
              <div className="crd-marquee-group" key={g}>
                {TRUST.map((it, i) => (
                  <span className="crd-trust-item" key={i}>{I(it.i)}{it.t}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const SOLUCOES = [
  { icon: Ico.wallet, title: "Capital de Giro", desc: "Capital de giro para marcas com vendas recorrentes em canais digitais. O crédito é concedido com base no histórico de faturamento e amortizado com um percentual das vendas futuras.", features: ["Marketing", "Estoque recorrente", "Capital de giro"], highlight: "Flexibilidade financeira" },
  { icon: Ico.factory, title: "Crédito Produtivo", desc: "Crédito voltado para financiar a fabricação e aquisição de produtos e insumos. A indústria ou fornecedor recebe à vista, enquanto sua marca ganha prazo para pagamento.", features: ["Produção", "Fabricação", "Aquisição"], highlight: "Indústria recebe à vista", link: { href: "/industrias", label: "Para indústrias" } },
  { icon: Ico.file, title: "Antecipação de Duplicatas", desc: "Para marcas com vendas B2B. Transforme recebíveis futuros em caixa imediato, melhorando o capital de giro e capacidade de execução.", features: ["Vendas B2B", "Recebíveis", "Fluxo previsível"], highlight: "Caixa imediato" },
];

function Solucoes() {
  return (
    <section className="crd-section" id="solucoes-credito">
      <div className="container">
        <div className="crd-head reveal">
          <span className="crd-eyebrow">Soluções de Crédito</span>
          <h2 className="crd-h2">Opções estruturadas para cada momento da sua DNVB</h2>
        </div>
        <div className="crd-grid3">
          {SOLUCOES.map((s, idx) => (
            <div className="crd-sol reveal" key={s.title} style={{ transitionDelay: idx * 70 + "ms" }}>
              <div className="crd-sol-top">
                <span className="crd-sol-ico">{I(s.icon)}</span>
                <span className="crd-sol-arrow">{I(Ico.arrow)}</span>
              </div>
              <span className="crd-pill">{s.highlight}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <div className="crd-tags">
                {s.features.map((f) => <span className="crd-tag" key={f}>{f}</span>)}
              </div>
              {s.link && <a href={s.link.href} className="crd-sol-link">{s.link.label} {I(Ico.arrow)}</a>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const BENEFITS = ["Limite inicial de crédito de até R$500 mil", "Pague conforme você vende", "Processo simplificado e ágil", "Taxas competitivas e prazos flexíveis", "Sem diluição de equity", "Casamento com ciclo de produção"];
const PROBLEMS = ["Crédito inexistente para DNVBs", "Antecipação não gera alavancagem real", "Parcelas concentradas pressionam caixa", "Burocracia e demora na aprovação"];

function PorQue() {
  return (
    <section className="crd-section">
      <div className="container">
        <div className="crd-head reveal">
          <span className="crd-eyebrow">Por que a Crédito UnboxPay?</span>
          <h2 className="crd-h2">Crédito desenhado para marcas digitais</h2>
          <p className="crd-lede">O modelo financeiro tradicional não foi desenhado para empresas digitais. A Crédito UnboxPay oferece alavancagem real, alinhada ao ciclo do seu negócio.</p>
        </div>
        <div className="crd-compare">
          <div className="crd-cmp crd-cmp--good reveal">
            <div className="crd-cmp-head">
              <span className="crd-cmp-badge crd-cmp-badge--good">{I(Ico.check)}</span>
              <h3>Crédito UnboxPay</h3>
            </div>
            <div className="crd-cmp-list">
              {BENEFITS.map((b) => (
                <div className="crd-cmp-row good" key={b}>
                  <span className="crd-cmp-dot crd-cmp-dot--good">{I(Ico.check)}</span>
                  <span>{b}</span>
                </div>
              ))}
            </div>
            <div className="crd-cmp-foot crd-cmp-foot--good">Alavancagem real, não antecipação!</div>
          </div>
          <div className="crd-cmp crd-cmp--bad reveal" style={{ transitionDelay: "90ms" }}>
            <div className="crd-cmp-head">
              <span className="crd-cmp-badge crd-cmp-badge--bad">{I(Ico.x)}</span>
              <h3>Crédito Tradicional</h3>
            </div>
            <div className="crd-cmp-list">
              {PROBLEMS.map((p) => (
                <div className="crd-cmp-row bad" key={p}>
                  <span className="crd-cmp-dot crd-cmp-dot--bad">{I(Ico.x)}</span>
                  <span>{p}</span>
                </div>
              ))}
            </div>
            <div className="crd-cmp-foot crd-cmp-foot--bad">Instituições tradicionais não conseguem analisar ou precificar risco em DNVBs.</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Simulador() {
  const [rev, setRev] = React.useState(150000);
  const limit = rev >= 1500000 ? 500000 : Math.min(rev * 0.35, 500000);
  return (
    <section className="crd-section">
      <div className="container">
        <div className="crd-sim-grid">
          <div className="crd-sim-copy reveal">
            <span className="crd-eyebrow">Simulador de crédito</span>
            <h2>Quanto sua marca pode acessar?</h2>
            <p className="crd-lede">O limite de crédito é definido com base no histórico de vendas, garantindo valor compatível com sua capacidade real de pagamento.</p>
            <div className="crd-sim-bullets">
              <div className="crd-sim-bullet"><span className="dot"></span>Limite cresce conforme sua marca traciona</div>
              <div className="crd-sim-bullet"><span className="dot"></span>Amortização como percentual das vendas</div>
              <div className="crd-sim-bullet"><span className="dot"></span>Consulte nosso time para valores acima de R$500k</div>
            </div>
          </div>
          <div className="crd-calc reveal" style={{ transitionDelay: "90ms" }}>
            <div className="crd-calc-row">
              <span className="lbl">Sua receita mensal</span>
              <span className="val">{brl(rev)}</span>
            </div>
            <input type="range" min="0" max="2000000" step="25000" value={rev} onChange={(e) => setRev(+e.target.value)} aria-label="Receita mensal" />
            <div className="crd-calc-scale"><span>R$0</span><span>R$2M</span></div>
            <div className="crd-calc-result">
              <p className="cap">Limite estimado de crédito de até</p>
              <p className="num">{brl(limit)}</p>
              {limit === 500000 && <p className="max">Limite máximo</p>}
            </div>
            <a href={APPLY} className="btn btn--primary">Solicitar análise {I(Ico.arrow)}</a>
            <p className="crd-calc-note">Esta é uma estimativa. O valor final depende da análise de risco e do seu histórico de vendas.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { icon: Ico.link, title: "Conecte sua operação", desc: "Integração segura com Unbox, Shopify, VTEX e WooCommerce através da UnboxPay. Analisamos seu histórico de vendas e pagamentos já existentes." },
  { icon: Ico.shieldcheck, title: "Aprovação rápida", desc: "Limite de crédito definido com base no histórico de vendas, compatível com a capacidade real de pagamento. Dinheiro na conta em menos de uma semana." },
  { icon: Ico.wallet, title: "Receba o capital", desc: "Use para produção, marketing ou capital de giro. A amortização acontece automaticamente, integrada ao checkout." },
  { icon: Ico.refresh, title: "Pague conforme vende", desc: "Um percentual de cada venda é direcionado para amortização. Sem parcelas fixas, sem pressão de caixa." },
];

function ComoFunciona() {
  return (
    <section className="crd-section crd-alt" id="como-funciona">
      <div className="container">
        <div className="crd-head reveal">
          <span className="crd-eyebrow">Como funciona</span>
          <h2 className="crd-h2">Crédito amortizado no ritmo das suas vendas</h2>
          <p className="crd-lede">O crédito Crédito UnboxPay é integrado ao checkout, sem impacto na experiência do cliente.</p>
        </div>
        <div className="crd-grid4">
          {STEPS.map((s, i) => (
            <div className="crd-step reveal" key={s.title} style={{ transitionDelay: i * 70 + "ms" }}>
              <span className="crd-step-num">{i + 1}</span>
              <div className="crd-step-ico">{I(s.icon)}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const PLATFORMS = [
  { name: "Unbox", img: "logo-unbox-roxo" },
  { name: "Shopify", img: "logo-shopify" },
  { name: "VTEX", img: "logo-vtex" },
  { name: "WooCommerce", img: "logo-woocommerce" },
];
function Integracoes() {
  return (
    <section className="crd-section crd-alt" id="ecossistema-unbox">
      <div className="container">
        <div className="crd-integ-grid">
          <div className="crd-integ-copy reveal">
            <span className="crd-eyebrow">Integrações</span>
            <h2>Integração total com as principais plataformas</h2>
            <p className="crd-lede">Nativo na Unbox e compatível com Shopify, VTEX e WooCommerce. Conecte sua operação e acesse crédito estruturado.</p>
            <div className="crd-platforms">
              {PLATFORMS.map((p) => (
                <div className="crd-platform" key={p.name}>
                  <img src={R[p.img]} alt={p.name} />
                </div>
              ))}
            </div>
          </div>
          <div className="crd-expert reveal" style={{ transitionDelay: "90ms" }}>
            <span className="eyb">Fale conosco</span>
            <h3>Converse com nossos especialistas em crédito para DNVBs</h3>
            <p>Nossa equipe entende o modelo de marcas digitais e está pronta para estruturar a melhor solução de crédito para seu negócio.</p>
            <div className="crd-avatars">
              {["team-1", "team-2", "team-3"].map((t, i) => (
                <span className="av" key={t} style={{ overflow: "hidden", padding: 0 }}><img src={R[t]} alt={"Especialista " + (i + 1)} style={{ width: "100%", height: "100%", objectFit: "cover" }} /></span>
              ))}
            </div>
            <a href={URLS.whatsapp} target="_blank" rel="noreferrer" className="btn btn--primary">Agendar uma conversa {I(Ico.arrow)}</a>
          </div>
        </div>
      </div>
    </section>
  );
}

const FLOW_BENEFITS = [
  { icon: Ico.trend, title: "Indústria", desc: "Continua fabricando e recebe pagamento à vista" },
  { icon: Ico.card, title: "Sua Marca", desc: "Ganha prazo para pagar de forma parcelada" },
  { icon: Ico.user, title: "Clientes", desc: "Compram mais com estoque regularizado e alta aprovação de pagamento" },
];
function ComoResolvemos() {
  return (
    <section className="crd-section crd-alt">
      <div className="container">
        <div className="crd-head reveal">
          <span className="crd-eyebrow">Como resolvemos</span>
          <h2 className="crd-h2">Destravamos o gargalo de crescimento</h2>
          <p className="crd-lede">A Crédito UnboxPay permite que DNVBs tenham acesso a parcelamento, enquanto a Indústria recebe à vista.</p>
        </div>
        <div className="crd-flow">
          <div className="crd-flow-card reveal">
            <div className="crd-flow-grid">
              <div className="crd-flow-node">
                <div className="ico">{I(Ico.factory)}</div>
                <p className="nm">Indústria</p>
                <p className="ds">Fabrica os produtos</p>
              </div>
              <div className="crd-flow-arrow"><span className="line"></span><span className="txt">Recebe à vista</span></div>
              <div className="crd-flow-node center">
                <div className="ico">{I(Ico.wallet)}</div>
                <p className="nm">Crédito UnboxPay</p>
                <p className="ds">Financia a operação</p>
              </div>
              <div className="crd-flow-arrow"><span className="line"></span><span className="txt">Paga parcelado</span></div>
              <div className="crd-flow-node">
                <div className="ico">{I(Ico.cart)}</div>
                <p className="nm">Sua Marca</p>
                <p className="ds">Vende aos clientes</p>
              </div>
            </div>
          </div>
          <div className="crd-flow-benefits">
            {FLOW_BENEFITS.map((b, i) => (
              <div className="crd-flow-ben reveal" key={b.title} style={{ transitionDelay: i * 70 + "ms" }}>
                <div className="ico">{I(b.icon)}</div>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const PRODUCTS = [
  { name: "Whey Protein", qty: 120, price: "R$189,00", img: "product-whey" },
  { name: "Colágeno", qty: 85, price: "R$129,00", img: "product-colageno" },
  { name: "Creatina", qty: 64, price: "R$99,00", img: "product-creatina" },
  { name: "Batom Matte", qty: 200, price: "R$59,00", img: "product-batom" },
];
const STATES = ["São Paulo", "Rio de Janeiro", "Minas Gerais", "Paraná", "Santa Catarina", "Bahia", "Ceará", "Pernambuco"];
const BARS = [15, 20, 28, 38, 52, 72, 100];

function Elegivel() {
  return (
    <section className="crd-section crd-solid">
      <div className="container">
        <h2 className="crd-elig-h2 reveal">Você é elegível para financiamento?</h2>
        <div className="crd-elig-grid">
          <div className="crd-elig crd-elig--dark reveal">
            <p className="cap">R$30K+ vendas mensais</p>
            <div className="month-badge">DEZEMBRO</div>
            <p className="big-val">R$78.450</p>
            <div className="bars">
              {BARS.map((h, i) => <span className="bar" key={i} style={{ height: h + "%" }}></span>)}
            </div>
          </div>
          <div className="crd-elig crd-elig--light reveal" style={{ transitionDelay: "70ms" }}>
            <p className="cap">6+ meses de operação</p>
            <div style={{ flex: 1, display: "grid", placeItems: "center" }}>
              <span className="huge">6</span>
            </div>
          </div>
          <div className="crd-elig crd-elig--dark reveal" style={{ transitionDelay: "140ms" }}>
            <p className="cap">Venda produtos de marca própria</p>
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              {PRODUCTS.map((p) => (
                <div className="prod" key={p.name}>
                  <span className="thumb" style={{ overflow: "hidden", background: "#fff" }}><img src={R[p.img]} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /></span>
                  <div style={{ minWidth: 0 }}>
                    <p className="nm">{p.name}</p>
                    <p className="qt">Qtd: {p.qty}</p>
                  </div>
                  <span className="pr">{p.price}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="crd-elig crd-elig--light reveal" style={{ transitionDelay: "210ms" }}>
            <p className="cap">Opere no Brasil</p>
            <div className="crd-states">
              {STATES.map((s, i) => (
                <span className="crd-state" key={s} style={{ transform: `rotate(${(i % 3 - 1) * 5}deg)` }}>{I(Ico.pin)}{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const STATS = [
  { icon: Ico.store, value: "15 mil", label: "Lojas cadastradas" },
  { icon: Ico.trend, value: "5.9x", label: "Crescimento médio" },
  { icon: Ico.users, value: "4x", label: "Mais conversão" },
];
function Stats() {
  return (
    <section className="crd-section">
      <div className="container">
        <div className="crd-head reveal">
          <span className="crd-eyebrow" style={{ color: "rgba(255,255,255,0.6)" }}>Ecossistema Unbox</span>
          <h2 className="crd-h2">A Crédito UnboxPay é uma solução de crédito do ecossistema Unbox</h2>
          <p className="crd-lede">E-commerce + Pagamentos + Assinatura + Crédito, tudo integrado para DNVBs</p>
        </div>
        <div className="crd-stats-grid">
          {STATS.map((s, i) => (
            <div className="crd-stat reveal" key={s.label} style={{ transitionDelay: i * 70 + "ms" }}>
              <span className="ico">{I(s.icon)}</span>
              <div>
                <p className="num">{s.value}</p>
                <p className="lbl">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="crd-stats-cta reveal">
          <a href={APPLY} className="btn btn--primary" style={{ minWidth: 220, justifyContent: "center" }}>Solicitar análise {I(Ico.arrow)}</a>
          <a href="/" className="btn btn--secondary" style={{ minWidth: 220, justifyContent: "center" }}>Conhecer o ecossistema</a>
        </div>
      </div>
    </section>
  );
}

function CTAFinal() {
  return (
    <section className="final-cta">
      <div className="container">
        <div className="final-banner reveal">
          <div className="final-banner-aura"></div>
          <div className="final-banner-text">
            <h2 className="final-banner-h2">Pronto para <em>acelerar o crescimento</em> da sua marca?</h2>
            <p className="final-banner-sub">Crédito de até R$500 mil · Pague conforme vende · Sem diluição de equity</p>
          </div>
          <div className="final-banner-btns">
            <a href={APPLY} className="btn btn--primary">Solicitar análise →</a>
            <a href={URLS.whatsapp} target="_blank" rel="noreferrer" className="btn btn--secondary">Chamar no Whats</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function CreditoPage() {
  useReveal();
  return (
    <React.Fragment>
      <Nav />
      <main>
        <Hero />
        <Solucoes />
        <PorQue />
        <Simulador />
        <ComoFunciona />
        <Integracoes />
        <ComoResolvemos />
        <Elegivel />
        <Stats />
        <CTAFinal />
      </main>
      <Footer />
      <WhatsAppFloater />
      <DemoModal />
    </React.Fragment>
  );
}

export default CreditoPage;
