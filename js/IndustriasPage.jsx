// IndustriasPage.jsx, Landing "Para Indústrias" (Crédito UnboxPay).
// Recriação FIEL da referência Credfly /industrias, adaptada ao
// design system Unbox (tema escuro + roxo no lugar do azul).
// Ordem: Hero → Categorias → Recebe à vista (fluxo) → Caixa protegido →
// Como funciona → O que muda → Stats (Ecossistema) → CTA → Footer.

const APPLY_IND = "https://admin.credfly.com.br/apply?brand=unboxpay";  // "Solicitar análise"
const HABILITAR = (window.UNBOX_URLS && window.UNBOX_URLS.industriaApply) || "#habilitar-industria";  // abre o popup
const WPP_IND = window.UNBOX_URLS.whatsapp;

const II = (p) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{p}</svg>
);
const IIco = {
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  check: <path d="M20 6 9 17l-5-5" />,
  factory: <React.Fragment><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" /><path d="M17 18h1M12 18h1M7 18h1" /></React.Fragment>,
  bag: <React.Fragment><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></React.Fragment>,
  wallet: <React.Fragment><rect x="3" y="6" width="18" height="14" rx="2" /><path d="M3 10h18M16 14h2" /></React.Fragment>,
  smile: <React.Fragment><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><path d="M9 9h.01M15 9h.01" /></React.Fragment>,
  pill: <React.Fragment><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" /><path d="m8.5 8.5 7 7" /></React.Fragment>,
  brush: <React.Fragment><path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08" /><path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z" /></React.Fragment>,
  shirt: <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />,
  package: <React.Fragment><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" /><path d="M12 22V12M3.3 7l8.7 5 8.7-5" /></React.Fragment>,
  clipboard: <React.Fragment><rect width="8" height="4" x="8" y="2" rx="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="M12 11h4M12 16h4M8 11h.01M8 16h.01" /></React.Fragment>,
  card: <React.Fragment><rect width="20" height="14" x="2" y="5" rx="2" /><path d="M2 10h20" /></React.Fragment>,
  banknote: <React.Fragment><rect width="20" height="12" x="2" y="6" rx="2" /><circle cx="12" cy="12" r="2" /><path d="M6 12h.01M18 12h.01" /></React.Fragment>,
  refresh: <React.Fragment><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M8 16H3v5" /></React.Fragment>,
  users: <React.Fragment><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></React.Fragment>,
  piggy: <React.Fragment><path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z" /><path d="M2 9v1c0 1.1.9 2 2 2h1M16 11h.01" /></React.Fragment>,
  store: <React.Fragment><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" /><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M2 7h20" /></React.Fragment>,
  trend: <React.Fragment><path d="M3 17 9 11l4 4 8-8" /><path d="M21 7v5h-5" /></React.Fragment>,
};

// ---------- HERO ----------
function IndHeroVisual() {
  const nodes = [
    { ico: IIco.factory, nm: "Indústria", ds: "Recebe à vista", tag: "100%", brand: false },
    { ico: null, nm: "Crédito UnboxPay", ds: "Financia a operação", brand: true },
    { ico: IIco.bag, nm: "Marca", ds: "Vende e paga conforme vende", brand: false },
  ];
  return (
    <div className="ind-stack">
      {nodes.map((n, i) => (
        <React.Fragment key={n.nm}>
          <div className={"ind-stack-node" + (n.brand ? " is-brand" : "")}>
            <span className="ind-stack-ico">
              {n.brand
                ? <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 2 7l10 5 10-5-10-5Zm0 7.5L4.2 6 12 2.5 19.8 6 12 9.5ZM2 12l10 5 10-5-2.2-1.1L12 14.5 4.2 10.9 2 12Z" /></svg>
                : II(n.ico)}
            </span>
            <div style={{ minWidth: 0 }}>
              <p className="nm">{n.nm}</p>
              <p className="ds">{n.ds}</p>
            </div>
            {n.tag && <span className="ind-stack-tag">{n.tag}</span>}
          </div>
          {i < nodes.length - 1 && (
            <div className="ind-stack-conn"><span></span><span></span><span></span></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function IndHero() {
  return (
    <section className="ind-hero">
      <div className="container">
        <div className="ind-hero-grid">
          <div className="reveal">
            <h1>Venda mais e receba à vista. <em className="accent-em">Nós cuidamos do resto.</em></h1>
            <p className="ind-hero-sub">Maximize o sell-out da sua indústria e deixe seu fluxo de caixa mais saudável. Financiamos sua cadeia produtiva com crédito alinhado ao ciclo de vendas.</p>
            <div className="ind-hero-cta">
              <a href={HABILITAR} className="btn btn--primary">Habilitar minha indústria como parceira {II(IIco.arrow)}</a>
            </div>
          </div>
          <div className="reveal" style={{ transitionDelay: "120ms" }}><IndHeroVisual /></div>
        </div>
      </div>
    </section>
  );
}

// ---------- CATEGORIAS ----------
const CATS = [
  { icon: IIco.pill, name: "Suplementos e bebidas" },
  { icon: IIco.brush, name: "Cosméticos e beleza" },
  { icon: IIco.shirt, name: "Moda e private label" },
  { icon: IIco.package, name: "Bens de consumo recorrente" },
];
function IndCategorias() {
  return (
    <section className="crd-section crd-alt">
      <div className="container">
        <div className="crd-head reveal">
          <span className="crd-eyebrow">Crédito produtivo</span>
          <h2 className="crd-h2">Crédito produtivo para indústrias que vendem para marcas digitais</h2>
          <p className="crd-lede">A Crédito UnboxPay financia a produção de marcas que vendem direto ao consumidor final. Funciona especialmente bem para indústrias de:</p>
        </div>
        <div className="ind-cats">
          {CATS.map((c, i) => (
            <div className="ind-cat reveal" key={c.name} style={{ transitionDelay: i * 60 + "ms" }}>
              <div className="ind-cat-ico">{II(c.icon)}</div>
              <h3>{c.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- RECEBE À VISTA (fluxo 4 nós) ----------
const FLOW4 = [
  { icon: IIco.factory, nm: "Indústria", tag: "Recebe à vista ✓", brand: false },
  { icon: null, nm: "Crédito UnboxPay", tag: "Financia a produção", brand: true },
  { icon: IIco.bag, nm: "Marca", tag: "Paga a prazo", brand: false },
  { icon: IIco.smile, nm: "Clientes", tag: "Compram mais", brand: false },
];
const FLOW_CHIPS = ["Caixa da indústria protegido", "Marcas crescem mais rápido", "Mais pedidos para a indústria"];
function IndRecebe() {
  return (
    <section className="crd-section">
      <div className="container">
        <div className="crd-head reveal">
          <span className="crd-eyebrow">Como resolvemos</span>
          <h2 className="crd-h2">Sua indústria recebe à vista. Seu cliente paga a prazo.</h2>
          <p className="crd-lede">Compare o cenário atual de vendas com o crescimento que a Crédito UnboxPay viabiliza, sem mudar a política de crédito da sua indústria.</p>
        </div>
        <div className="ind-flowbox reveal">
          <div className="ind-flow4">
            {FLOW4.map((n) => (
              <div className={"ind-flow4-node" + (n.brand ? " is-brand" : "")} key={n.nm}>
                <div className="ind-flow4-ico">
                  {n.brand
                    ? <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 2 7l10 5 10-5-10-5Zm0 7.5L4.2 6 12 2.5 19.8 6 12 9.5ZM2 12l10 5 10-5-2.2-1.1L12 14.5 4.2 10.9 2 12Z" /></svg>
                    : II(n.icon)}
                </div>
                <p className="nm">{n.nm}</p>
                <p className="tag">{n.tag}</p>
              </div>
            ))}
          </div>
          <div className="ind-chips">
            {FLOW_CHIPS.map((c) => (
              <span className="ind-chip" key={c}>{II(IIco.check)}{c}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- CAIXA PROTEGIDO ----------
const PROTECT = [
  "Receba à vista sem assumir risco de crédito",
  "Sem impacto no seu caixa ou balanço",
  "Crescimento do sell-out destrava novos pedidos",
  "Modelo recorrente e previsível",
];
function IndProtege() {
  return (
    <section className="crd-section crd-alt">
      <div className="container">
        <div className="crd-head reveal">
          <h2 className="crd-h2">Crédito para seus clientes. Caixa protegido para sua indústria.</h2>
          <p className="crd-lede">A Crédito UnboxPay financia a produção dos seus clientes para que sua indústria receba à vista, sem risco de crédito ou impacto no caixa.</p>
        </div>
        <div className="ind-checks">
          {PROTECT.map((t, i) => (
            <div className="ind-check reveal" key={t} style={{ transitionDelay: i * 60 + "ms" }}>
              <span className="ind-check-dot">{II(IIco.check)}</span>
              <p>{t}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- COMO FUNCIONA ----------
const IND_STEPS = [
  { icon: IIco.clipboard, title: "Pedido de produção", desc: "A marca realiza o pedido de produção." },
  { icon: IIco.card, title: "Financiamento", desc: "A Crédito UnboxPay financia a operação." },
  { icon: IIco.banknote, title: "Pagamento à vista", desc: "Sua indústria recebe o valor integral à vista." },
  { icon: IIco.refresh, title: "Marca paga parcelado", desc: "A marca paga de forma parcelada, alinhado ao fluxo de vendas ao consumidor final." },
];
function IndComoFunciona() {
  return (
    <section className="crd-section" id="como-funciona">
      <div className="container">
        <div className="crd-head reveal">
          <span className="crd-eyebrow">Como funciona</span>
          <h2 className="crd-h2">Da produção ao pagamento, no ritmo das vendas</h2>
        </div>
        <div className="crd-grid4">
          {IND_STEPS.map((s, i) => (
            <div className="crd-step reveal" key={s.title} style={{ transitionDelay: i * 70 + "ms" }}>
              <span className="crd-step-num">{i + 1}</span>
              <div className="crd-step-ico">{II(s.icon)}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="crd-stats-cta reveal" style={{ marginTop: 44 }}>
          <a href={HABILITAR} className="btn btn--primary" style={{ minWidth: 280, justifyContent: "center" }}>Habilitar minha indústria como parceira {II(IIco.arrow)}</a>
        </div>
      </div>
    </section>
  );
}

// ---------- O QUE MUDA (3 role cards) ----------
const ROLES = [
  { icon: IIco.factory, title: "Indústria", items: ["Recebimento imediato", "Mais volume por cliente", "Produção previsível"] },
  { icon: IIco.users, title: "Comercial", items: ["Pedidos maiores", "Reduz desgaste comercial", "Mais recorrência"] },
  { icon: IIco.piggy, title: "Financeiro", items: ["Caixa protegido", "Risco fora do balanço", "Previsibilidade"] },
];
function IndOQueMuda() {
  return (
    <section className="crd-section crd-alt">
      <div className="container">
        <div className="crd-head reveal">
          <span className="crd-eyebrow">Benefícios</span>
          <h2 className="crd-h2">O que muda para sua indústria</h2>
        </div>
        <div className="ind-roles">
          {ROLES.map((r, idx) => (
            <div className="ind-role reveal" key={r.title} style={{ transitionDelay: idx * 70 + "ms" }}>
              <div className="ind-role-ico">{II(r.icon)}</div>
              <h3>{r.title}</h3>
              <ul>
                {r.items.map((it) => (
                  <li key={it}><span className="ind-role-tick">{II(IIco.check)}</span><p>{it}</p></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- STATS (Ecossistema Unbox) ----------
const IND_STATS = [
  { icon: IIco.store, value: "15 mil", label: "Lojas cadastradas" },
  { icon: IIco.trend, value: "5.9x", label: "Crescimento médio" },
  { icon: IIco.users, value: "4x", label: "Mais conversão" },
];
function IndStats() {
  return (
    <section className="crd-section">
      <div className="container">
        <div className="crd-head reveal">
          <span className="crd-eyebrow" style={{ color: "rgba(255,255,255,0.6)" }}>Ecossistema Unbox</span>
          <h2 className="crd-h2">A Crédito UnboxPay é uma solução de crédito do ecossistema Unbox</h2>
          <p className="crd-lede">E-commerce + Pagamentos + Assinatura + Crédito, tudo integrado para DNVBs</p>
        </div>
        <div className="crd-stats-grid">
          {IND_STATS.map((s, i) => (
            <div className="crd-stat reveal" key={s.label} style={{ transitionDelay: i * 70 + "ms" }}>
              <span className="ico">{II(s.icon)}</span>
              <div>
                <p className="num">{s.value}</p>
                <p className="lbl">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="crd-stats-cta reveal">
          <a href={APPLY_IND} className="btn btn--primary" style={{ minWidth: 220, justifyContent: "center" }}>Solicitar análise {II(IIco.arrow)}</a>
          <a href="Unbox - Credito.html" className="btn btn--secondary" style={{ minWidth: 220, justifyContent: "center" }}>Crédito para marcas</a>
        </div>
      </div>
    </section>
  );
}

// ---------- CTA FINAL (banner estilo home) ----------
function IndCTA() {
  return (
    <section className="final-cta">
      <div className="container">
        <div className="final-banner reveal">
          <div className="final-banner-aura"></div>
          <div className="final-banner-text">
            <h2 className="final-banner-h2">Cresça junto com seus clientes, <em>sem financiar o prazo deles.</em></h2>
            <p className="final-banner-sub">Receba à vista · Caixa protegido · Modelo recorrente e previsível</p>
          </div>
          <div className="final-banner-btns">
            <a href={HABILITAR} className="btn btn--primary">Habilitar minha indústria →</a>
            <a href={WPP_IND} target="_blank" rel="noreferrer" className="btn btn--secondary">Chamar no Whats</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function IndustriasPage() {
  useReveal();
  return (
    <React.Fragment>
      <Nav />
      <main>
        <IndHero />
        <IndCategorias />
        <IndRecebe />
        <IndProtege />
        <IndComoFunciona />
        <IndOQueMuda />
        <IndStats />
        <IndCTA />
      </main>
      <Footer />
      <WhatsAppFloater />
      <DemoModal />
      <IndustriaModal />
    </React.Fragment>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<IndustriasPage />);
