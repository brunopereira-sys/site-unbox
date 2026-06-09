// FeaturesPage.jsx, página de Recursos no estilo atual do site.
// Reaproveita classes de site.css / sections.css e adiciona features.css.

function FeatCard({ icon, t, d, delay }) {
  return (
    <article className="card feat-card reveal" style={{ transitionDelay: (delay || 0) + "ms" }}>
      <div className="icon-chip"><FIcon name={icon} /></div>
      <h3 className="feat-card-h">{t}</h3>
      <p className="feat-card-b">{d}</p>
    </article>
  );
}

function FeatGrid({ items, four }) {
  return (
    <div className={"feat-grid" + (four ? " feat-grid--4" : "")}>
      {items.map((it, i) => <FeatCard key={it.t} {...it} delay={(i % 4) * 60} />)}
    </div>
  );
}

function SubList({ items }) {
  return (
    <ul className="sub-list">
      {items.map((it, i) => (
        <li className="sub-item reveal" key={it.t} style={{ transitionDelay: 120 + i * 60 + "ms" }}>
          <span className="sub-item-icon"><FIcon name={it.icon} size={18} /></span>
          <div>
            <h3 className="sub-item-title">{it.t}</h3>
            <p className="sub-item-body">{it.d}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

// Slider de lojas: cross-fade automático entre vitrines reais de clientes.
function StoreSlider() {
  const R = window.__resources;
  const stores = [
    { id: "loja-pudim", name: "Pudim" },
    { id: "loja-olea", name: "OLEA" },
    { id: "loja-dicapri", name: "d'capri" },
    { id: "loja-popai", name: "Popai" },
    { id: "loja-vistapere", name: "Vista Pere" },
  ];
  const [i, setI] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  React.useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % stores.length), 3200);
    return () => clearInterval(t);
  }, [paused, stores.length]);
  return (
    <div className="store-slider" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {stores.map((s, idx) => (
        <img
          key={s.id}
          src={R[s.id]}
          alt={"Loja " + s.name + " na Unbox"}
          className={"store-slide" + (idx === i ? " is-active" : "")}
          loading="lazy"
        />
      ))}
      <div className="store-dots">
        {stores.map((s, idx) => (
          <button
            key={s.id}
            className={"store-dot" + (idx === i ? " is-active" : "")}
            onClick={() => setI(idx)}
            aria-label={"Ver loja " + s.name}
          ></button>
        ))}
      </div>
    </div>
  );
}

function FeaturesPage() {
  const R = window.__resources;

  // Reaproveita a lógica de reveal-on-scroll da home.
  React.useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach((el) => io.observe(el));
    const fallback = setTimeout(() => els.forEach((el) => el.classList.add("in")), 1600);
    return () => { io.disconnect(); clearTimeout(fallback); };
  }, []);

  return (
    <React.Fragment>
      <Nav />
      <main>
        {/* HERO */}
        <section className="fpage-hero">
          <div className="fpage-hero-aura"></div>
          <div className="container fpage-hero-split">
            <div className="fpage-hero-copy">
              <h1 className="h1 reveal">
                Tudo o que a Unbox <em className="accent-em">tem para você vender</em>.
              </h1>
              <p className="lede fpage-hero-lede reveal" style={{ transitionDelay: "120ms" }}>
                Fácil para quem está começando, completa para quem quer ir mais longe.
                A plataforma de e-commerce pronta para começar a vender agora.
              </p>
              <div className="fpage-hero-ctas reveal" style={{ transitionDelay: "180ms" }}>
                <a href={window.UNBOX_URLS.demo} className="btn btn--primary">Agendar demo →</a>
                <a href={window.UNBOX_URLS.signup} className="btn btn--secondary">Comece agora</a>
              </div>
            </div>
            <div className="eco reveal" style={{ transitionDelay: "220ms" }}>
              <div className="eco-grid">
                {window.FP_ECO.map((e) => (
                  e.core ? (
                    <div className="eco-tile eco-core" key="core">
                      <img src={R["logo-navbar"]} alt="Unbox" />
                    </div>
                  ) : (
                    <div className="eco-tile" key={e.t}>
                      <span className="icon-chip"><FIcon name={e.icon} size={18} /></span>
                      <span className="eco-tile-label">{e.t}</span>
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FORMAS DE VENDER */}
        <section className="section">
          <div className="container">
            <div className="block-head reveal">
              <h2 className="h2">A plataforma certa para<br />vender <em className="accent-em">do seu jeito</em>.</h2>
              <p className="lede block-lede">Se o seu negócio precisa de uma solução para vender mais, ele precisa da Unbox.</p>
            </div>
            <FeatGrid items={window.FP_WAYS} four />
          </div>
        </section>

        {/* PERSONALIZAÇÃO (split) */}
        <section className="section section--alt">
          <div className="container subscription-grid">
            <div className="subscription-visual reveal">
              <div className="subscription-glow"></div>
              <StoreSlider />
            </div>
            <div className="subscription-copy">
              <h2 className="h2 reveal" style={{ transitionDelay: "60ms" }}>
                Sua loja personalizada e<br /><em className="accent-em">otimizada para conversão</em>.
              </h2>
              <p className="lede block-lede reveal" style={{ transitionDelay: "120ms" }}>
                Unimos performance e liberdade para você criar uma loja com a cara da sua marca.
              </p>
              <SubList items={window.FP_CUSTOM} />
            </div>
          </div>
        </section>

        {/* INTEGRAÇÕES */}
        <section className="section">
          <div className="container">
            <div className="block-head block-head--center reveal">
              <h2 className="h2">Completa para quem<br />quer <em className="accent-em">ir mais longe</em>.</h2>
              <p className="lede block-lede">Tudo integrado: as ferramentas que o seu e-commerce precisa, nativas na plataforma.</p>
            </div>
            <FeatGrid items={window.FP_INTEGRATIONS} />
          </div>
        </section>

        {/* RECURSOS PARA TURBINAR */}
        <section className="section section--alt">
          <div className="container">
            <div className="block-head reveal">
              <h2 className="h2">Recursos para<br /><em className="accent-em">turbinar seu negócio</em>.</h2>
            </div>
            <FeatGrid items={window.FP_BOOST} />
          </div>
        </section>

        {/* UNBOXPAY (split + taxas) */}
        <section className="section">
          <div className="container subscription-grid checkout-grid">
            <div className="subscription-copy">
              <h2 className="h2 reveal" style={{ transitionDelay: "60ms" }}>
                UnboxPay: sua loja 100% integrada ao <em className="accent-em">meio de pagamento</em>.
              </h2>
              <p className="lede block-lede reveal" style={{ transitionDelay: "120ms" }}>
                Gateway próprio com as melhores taxas do mercado e antifraude por IA, nativo na plataforma.
              </p>
              <SubList items={window.FP_PAY} />
            </div>
            <div className="checkout-visual reveal">
              <div className="pay-phone-wrap">
                <span className="pay-phone-aura"></span>
                <div className="pay-phone">
                  <div className="pay-phone-top">
                    <span className="pay-phone-logo"><img src={R["logo-navbar"]} alt="" /></span>
                    <span className="pay-hi">Olá, Lucas</span>
                    <span className="pay-ava">L</span>
                  </div>
                  <p className="pay-bal-lbl">Saldo total em conta</p>
                  <p className="pay-bal-val">R$ 10.342,00</p>
                  <div className="pay-row"><span className="k"><span className="pay-dot" style={{ background: "#f5b301" }}></span>Saldo a receber</span><span className="v">R$ 5.588,90</span></div>
                  <div className="pay-row"><span className="k"><span className="pay-dot" style={{ background: "#1f9d5b" }}></span>Disponível para saque</span><span className="v">R$ 3.342,00</span></div>
                  <button className="pay-withdraw" type="button" tabIndex="-1">Solicitar saque</button>
                  <div className="pay-trans">
                    <p className="pay-trans-h">Últimas transações</p>
                    {[{ status: "pend", label: "Pendente", val: "R$ 24.400,50" }, { status: "ok", label: "Concluído", val: "R$ 35.000,00" }, { status: "ok", label: "Concluído", val: "R$ 800.520,89" }].map((t, i) => (
                      <div className="pay-tx" key={i}>
                        <span className="pay-tx-ico">$</span>
                        <div className="pay-tx-mid"><span className={"pay-tx-status " + t.status}>{t.label}</span><span className="sk w70"></span></div>
                        <span className="pay-tx-val">{t.val}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pay-float">
                  <span className="pay-float-ico">$</span>
                  <p className="pay-float-lbl">Saque efetuado</p>
                  <span className="pay-float-tag">Concluído</span>
                  <p className="pay-float-val">R$ 35.000,00</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* UNBOX ENVIOS */}
        <section className="section section--alt">
          <div className="container">
            <div className="block-head block-head--center reveal">
              <h2 className="h2">Unbox Envios: o frete<br /><em className="accent-em">sempre mais barato</em>.</h2>
              <p className="lede block-lede">Logística integrada de ponta a ponta, do cálculo do frete à etiqueta.</p>
            </div>
            <FeatGrid items={window.FP_SHIP} />
          </div>
        </section>

        {/* GESTÃO */}
        <section className="section">
          <div className="container">
            <div className="block-head reveal">
              <h2 className="h2">Gerencie pedidos e<br />estoque, <em className="accent-em">sem limites</em>.</h2>
            </div>
            <FeatGrid items={window.FP_MANAGE} />
          </div>
        </section>

        {/* SUPORTE */}
        <section className="section section--alt">
          <div className="container">
            <div className="block-head block-head--center reveal">
              <h2 className="h2">Um time dedicado a<br />fazer seu negócio <em className="accent-em">crescer</em>.</h2>
              <p className="lede block-lede">Nossa missão é fazer a sua empresa crescer, do primeiro passo ao próximo nível.</p>
              <div className="support-lead">
                <span className="meta">Fale com especialistas</span>
                <a href={window.UNBOX_URLS.whatsapp} target="_blank" rel="noreferrer">pelo WhatsApp →</a>
              </div>
            </div>
            <FeatGrid items={window.FP_SUPPORT} four />
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
window.FeaturesPage = FeaturesPage;
ReactDOM.createRoot(document.getElementById("root")).render(<FeaturesPage />);
