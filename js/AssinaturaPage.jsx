// AssinaturaPage.jsx, página de Venda por Assinatura (recorrência nativa).

// ---- Ícones locais (X / check) p/ o comparativo ----
const asX = <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6l12 12M18 6 6 18" /></svg>;
const asCheck = <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>;

const AS_BAD = [
  <React.Fragment>Recorrência exige <strong>apps de terceiros</strong> de até US$ 500/mês.</React.Fragment>,
  <React.Fragment>Um <strong>módulo separado</strong> e complexo de configurar.</React.Fragment>,
  <React.Fragment>Dados de assinatura <strong>espalhados</strong> em ferramentas externas.</React.Fragment>,
  <React.Fragment>Cohort de LTV e previsão de estoque? <strong>Por sua conta.</strong></React.Fragment>,
];
const AS_GOOD = [
  <React.Fragment>Assinatura <strong>integrada direto no carrinho</strong>: “Assine com 20% OFF”.</React.Fragment>,
  <React.Fragment>Ciclos, erros e cancelamentos <strong>dentro do próprio admin</strong>.</React.Fragment>,
  <React.Fragment>Cohort de LTV e recompra <strong>calculados automaticamente</strong>.</React.Fragment>,
  <React.Fragment>Previsão de estoque para os <strong>próximos 120 dias</strong>.</React.Fragment>,
];

const AS_STEPS = [
  { n: "01", t: "O cliente assina no carrinho", d: "O toggle de assinatura aparece nativamente no carrinho lateral e o desconto é aplicado na hora. Sem redirecionamento, sem fricção." },
  { n: "02", t: "O ciclo roda automaticamente", d: "Na data configurada, a cobrança acontece, o pedido é gerado e vai direto para o seu ERP. Tudo sem intervenção manual." },
  { n: "03", t: "Você acompanha em tempo real", d: "Assinaturas ativas, volume em R$, cancelamentos e falhas, e ainda a previsão de estoque dos próximos 120 dias." },
];

const AS_FEATURES = [
  { icon: "repeat", t: "Assinatura integrada ao carrinho", d: "Toggle nativo no carrinho: o cliente ativa e o pedido vira recorrência. Sem telas extras." },
  { icon: "clock", t: "Múltiplas frequências", d: "Ciclos mensal, bimestral, trimestral, ou o que fizer sentido pro seu produto." },
  { icon: "shield", t: "Gestão de falhas automática", d: "Cobranças com erro monitoradas e categorizadas. Aja antes de perder o cliente." },
  { icon: "box", t: "Previsão de estoque", d: "Saiba quanto de estoque vai precisar nos próximos 120 dias, por SKU e por mês." },
  { icon: "chart", t: "Cohort de LTV", d: "Veja quanto cada safra de clientes gerou e quais trazem os assinantes mais fiéis." },
  { icon: "gauge", t: "Recompra e retenção", d: "Recompra global, únicos vs. recorrentes e o histórico de cada ciclo." },
];

const AS_PROOF = [
  { num: "+40", u: "%", lbl: "de LTV em média para quem ativa assinatura" },
  { num: "< 2", u: " cliques", lbl: "diferenciam uma compra única de uma assinatura" },
  { num: "120", u: " dias", lbl: "de previsão de estoque calculada automaticamente" },
];

const AS_FAQS = [
  { q: "O cliente pode cancelar quando quiser?", a: "Sim. O cliente tem autonomia para gerenciar a própria assinatura. Você define as regras, a plataforma executa." },
  { q: "Funciona com qualquer produto?", a: "Funciona com qualquer produto cadastrado na plataforma. Você escolhe quais produtos podem ser assinados." },
  { q: "E se o pagamento falhar?", a: "A plataforma identifica, categoriza o erro e exibe no seu painel. Você pode retentar ou entrar em contato com o cliente." },
  { q: "O carrinho aceita compra única e recorrente ao mesmo tempo?", a: "Sim. No mesmo carrinho o cliente pode combinar produtos de compra única com produtos de assinatura e finalizar tudo em um único checkout, sem precisar de pedidos separados." },
  { q: "Como o lojista acompanha as assinaturas?", a: "Tudo fica integrado ao Painel Unbox: em um único lugar você gerencia todas as assinaturas da loja. Acompanha assinaturas ativas, pausadas e canceladas, edita frequência, valores e datas de cobrança, retenta pagamentos que falharam, visualiza a receita recorrente (MRR) e o histórico de cada cliente, sem precisar de planilhas ou apps externos." },
  { q: "E o meu cliente? Por onde ele gerencia a assinatura?", a: "Pela própria área do cliente: ele faz login com o e-mail usado na compra e gerencia tudo sozinho, pausar, alterar a frequência, atualizar o pagamento ou cancelar, com total autonomia." },
];

// ---- Pontos da home, detalhados (accordion + mockups) ----
const AS_ACC = [
  { icon: "repeat", t: "Totalmente integrado", d: "Fluxo de assinatura nativo conectado de ponta a ponta, da página do produto ao carrinho e ao checkout, no mesmo ambiente. Sem apps externos, sem integrações que quebram." },
  { icon: "box", t: "Criado para produtos físicos", d: "Pensado para marcas que vendem bens de consumo com estoque e logística. Gestão de pedidos, ciclos e envios recorrentes sem dor de cabeça." },
  { icon: "tag", t: "Sistema promocional", d: "Descontos e benefícios para assinantes: percentual por frequência, frete grátis e cupons para a primeira compra ou para os ciclos seguintes." },
  { icon: "hand", t: "Fácil de assinar e gerenciar", d: "Assinar virou tão simples quanto comprar. O cliente assina em um clique e gerencia tudo sozinho, pular, pausar, trocar a frequência ou cancelar." },
  { icon: "sparkle", t: "Unbox Magic: Retentativas", d: "Sistema inteligente que recupera assinaturas com falha de pagamento no momento certo. Mais recorrência mantida, mais receita preservada." },
];

function AsAccordion() {
  const [open, setOpen] = React.useState(0);
  return (
    <div className="sub-acc reveal" style={{ transitionDelay: "160ms" }}>
      {AS_ACC.map((it, i) => (
        <div className={"sub-acc-item" + (open === i ? " is-open" : "")} key={it.t}>
          <button className="sub-acc-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
            <span className="sub-item-icon"><FIcon name={it.icon} size={18} /></span>
            <h3 className="sub-acc-title">{it.t}</h3>
            <span className="sub-acc-sign">{open === i ? "–" : "+"}</span>
          </button>
          <div className="sub-acc-wrap"><p className="sub-acc-body">{it.d}</p></div>
        </div>
      ))}
    </div>
  );
}

// ---- Upsell no carrinho: demo animada da conversão ----
const cuGift = <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="8" width="18" height="4" rx="1" /><path d="M5 12v8h14v-8M12 8v12" /><path d="M12 8S10.5 4 8 4a2 2 0 0 0 0 4h4ZM12 8s1.5-4 4-4a2 2 0 0 1 0 4h-4Z" /></svg>;
const cuChevron = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>;
const cuTrash = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M19 6l-1 14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1L5 6" /></svg>;

function CartUpsellDemo() {
  const [sub, setSub] = React.useState(false);
  const [tap, setTap] = React.useState(0);
  React.useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setSub(true); return; }
    let on = false;
    const iv = setInterval(() => { on = !on; setSub(on); if (on) setTap((t) => t + 1); }, 3600);
    return () => clearInterval(iv);
  }, []);
  const toggle = () => setSub((s) => { const n = !s; if (n) setTap((t) => t + 1); return n; });
  return (
    <div className="cu-demo">
      <div className="cu-demo-glow"></div>
      <div className={"cu-cart" + (sub ? " is-sub" : "")}>
        <div className="cu-club"><div className="cu-club-inner">
          <h4 className="cu-club-h">Clube de assinatura</h4>
          <div className="cu-freq"><span>Mensal</span>{cuChevron}</div>
        </div></div>
        <div className="cu-item">
          <span className="cu-thumb" style={{ backgroundImage: `url(${window.__resources["brigadeiro-wish"]})` }}></span>
          <div className="cu-mid">
            <p className="cu-name">Brigadeiro Wish 345G <span className="cu-off">10% OFF</span></p>
            <p className="cu-desc">Brigadeiro Wish 345G</p>
            <div className="cu-cta-slot">
              {sub
                ? <button className="cu-remove" type="button" tabIndex="-1" onClick={toggle}>Remover assinatura</button>
                : <button className="cu-assine" type="button" tabIndex="-1" onClick={toggle}>{cuGift} Assine com 10% OFF!</button>}
              {!sub && <span className="cu-tap" key={tap} aria-hidden="true"></span>}
            </div>
            <div className="cu-qty"><button type="button" tabIndex="-1">−</button><span>1</span><button type="button" tabIndex="-1">+</button></div>
          </div>
          <div className="cu-right">
            <div>
              <div className="cu-price-old">R$ 59,00</div>
              <div className="cu-price-now">{sub ? "R$ 53,10" : "R$ 59,00"}</div>
            </div>
            <span className="cu-trash">{cuTrash}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function AsFAQ() {
  const [open, setOpen] = React.useState(0);
  return (
    <section className="section faq" id="faq">
      <div className="container faq-grid">
        <div className="faq-head reveal">
          <h2 className="h2">Perguntas<br />frequentes.</h2>
          <p className="lede block-lede">Não achou sua resposta? Chama a gente no WhatsApp, tem gente de verdade do outro lado.</p>
          <a href={window.UNBOX_URLS.whatsapp} target="_blank" rel="noreferrer" className="btn btn--secondary faq-cta">Falar com especialista</a>
        </div>
        <div className="faq-list">
          {AS_FAQS.map((f, i) => (
            <div className={"faq-item" + (open === i ? " is-open" : "")} key={i}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                <span>{f.q}</span>
                <span className="faq-icon" aria-hidden="true"></span>
              </button>
              <div className="faq-a-wrap"><p className="faq-a">{f.a}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AssinaturaPage() {
  useReveal();
  const R = window.__resources;
  return (
    <React.Fragment>
      <Nav />
      <main>
        <PageHero
          eyebrow="Recorrência nativa"
          title={<React.Fragment>Venda por assinatura, <em className="accent-em">100% nativa</em>.</React.Fragment>}
          lede="O sistema de recorrência mais poderoso do mercado, 100% nativo, sem app de terceiros. Assinar virou tão fácil quanto comprar."
          img={R["feat-assinatura"]}
          imgAlt="Carrinho de assinatura na Unbox"
          ctaPrimary={<a href={window.UNBOX_URLS.signup} className="btn btn--primary">Criar conta grátis</a>}
          ctaSecondary={<a href={window.UNBOX_URLS.demo} className="btn btn--secondary">Agendar demo →</a>}
        />

        {/* 1 · COMO FUNCIONA, 3 passos */}
        <section className="section section--alt">
          <div className="container">
            <div className="block-head block-head--center reveal">
              <h2 className="h2">Simples para o cliente.<br /><em className="accent-em">Poderoso para você.</em></h2>
              <p className="lede block-lede">Do clique do cliente ao seu painel de receita previsível, em três etapas automáticas.</p>
            </div>
            <div className="as-flow reveal">
              <div className="as-flow-track"><div className="as-flow-fill"></div></div>
              {AS_STEPS.map((s) => (
                <div className="as-step" key={s.n}>
                  <div className="as-step-node">{s.n}</div>
                  <h3 className="as-step-h">{s.t}</h3>
                  <p className="as-step-b">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2 · DESTAQUE, upsell para assinatura no carrinho */}
        <section className="section as-hl">
          <div className="container cu-grid">
            <div className="cu-copy">
              <span className="as-tag-hl reveal"><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.8 5.6L19.5 9l-5.7 1.4L12 16l-1.8-5.6L4.5 9l5.7-1.4L12 2Z" /></svg>Destaque · Upsell para assinatura</span>
              <h2 className="h2 reveal" style={{ transitionDelay: "60ms" }}>
                De compra única a recorrência,<br /><em className="accent-em">em um clique</em>.
              </h2>
              <p className="lede block-lede reveal" style={{ transitionDelay: "120ms" }}>
                O cliente adiciona ao carrinho e vê “Assine com 10% OFF”. Um toque e a compra única vira assinatura, desconto na hora, sem sair do carrinho.
              </p>
            </div>
            <CartUpsellDemo />
          </div>
        </section>

        {/* 3 · CAPACIDADES, pontos principais (accordion + mockups) */}
        <section className="section">
          <div className="container subscription-grid">
            <div className="subscription-visual reveal">
              <div className="subscription-glow"></div>
              <img src={R["feat-assinatura-sq"]} alt="Lojas de assinatura na Unbox" className="subscription-img" loading="lazy" />
            </div>
            <div className="subscription-copy">
              <h2 className="h2 reveal" style={{ transitionDelay: "60ms" }}>
                Transforme compradores<br />em <em className="accent-em">assinantes fiéis</em>.
              </h2>
              <p className="lede block-lede reveal" style={{ transitionDelay: "120ms" }}>
                Tudo que sustenta uma operação de recorrência, nativo na plataforma. Clique para ver cada ponto em detalhe.
              </p>
              <AsAccordion />
            </div>
          </div>
        </section>

        {/* 4 · CAPACIDADES, toolkit completo (grade de 6) */}
        <section className="section as-feat">
          <div className="container">
            <div className="block-head block-head--center reveal">
              <h2 className="h2">O melhor sistema de assinatura <em className="accent-em" style={{ color: "rgb(255, 255, 255)" }}>do mercado</em>.</h2>
              <p className="lede block-lede">Da ativação à retenção. Tudo nativo e no mesmo lugar para marcas D2C.</p>
            </div>
            <FeatGrid items={AS_FEATURES} />
          </div>
        </section>

        {/* 5 · CAPACIDADES, área do assinante (autogestão) */}
        <section className="section">
          <div className="container sa-grid">
            <div className="sa-copy">
              <h2 className="h2 reveal" style={{ transitionDelay: "60ms" }}>
                Seu cliente gerencia<br />a assinatura <em className="accent-em">sozinho</em>.
              </h2>
              <p className="lede block-lede reveal" style={{ transitionDelay: "120ms" }}>
                Pular, pausar, trocar a frequência, atualizar cartão ou endereço, tudo na própria conta, sem abrir ticket. Menos suporte para você, mais retenção.
              </p>
              <div className="feat-highlights reveal" style={{ transitionDelay: "180ms", justifyContent: "flex-start" }}>
                <span className="feat-highlight"><span className="icon-chip"><FIcon name="repeat" size={16} /></span>Pular ou pausar</span>
                <span className="feat-highlight"><span className="icon-chip"><FIcon name="clock" size={16} /></span>Trocar frequência</span>
                <span className="feat-highlight"><span className="icon-chip"><FIcon name="card" size={16} /></span>Atualizar pagamento</span>
              </div>
            </div>

            <div className="sa-panel-wrap reveal" style={{ transitionDelay: "120ms", position: "relative" }}>
              <div className="sa-panel-glow"></div>
              <div className="sa-panel">
                <div className="sa-head">
                  <div className="sa-prod">
                    <span className="sa-thumb"></span>
                    <div>
                      <h3 className="sa-title">Whey Protein · 900g</h3>
                      <p className="sa-sub">Assinatura desde 10/04/2025</p>
                    </div>
                  </div>
                  <span className="sa-status"><span className="dot"></span>Ativa</span>
                </div>

                <div className="sa-rows">
                  <div>
                    <p className="sa-row-k">Frequência</p>
                    <p className="sa-row-v">Mensal <a className="sa-edit">Editar</a></p>
                  </div>
                  <div>
                    <p className="sa-row-k">Próxima cobrança</p>
                    <p className="sa-row-v">12/06/2026</p>
                  </div>
                  <div>
                    <p className="sa-row-k">Método de pagamento</p>
                    <p className="sa-row-v">Cartão •••• 0000 <a className="sa-edit">Editar</a></p>
                  </div>
                  <div>
                    <p className="sa-row-k">Endereço de entrega</p>
                    <p className="sa-row-v">Av. Paulista, 1000 <a className="sa-edit">Editar</a></p>
                  </div>
                </div>

                <div className="sa-actions">
                  <button className="sa-skip" type="button" tabIndex="-1">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M5 4l11 8-11 8z" /><rect x="18" y="4" width="2.6" height="16" rx="1" /></svg>
                    Pular próxima entrega
                  </button>
                  <button className="sa-btn" type="button" tabIndex="-1">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
                    Pausar assinatura
                  </button>
                  <span className="sa-cancel">Cancelar assinatura</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6 · POR QUE A UNBOX, nativo vs app de terceiros */}
        <section className="section section--alt">
          <div className="container">
            <div className="block-head block-head--center reveal">
              <h2 className="h2">Assinatura nativa.<br /><em className="accent-em">Não um app de terceiros.</em></h2>
              <p className="lede block-lede">Em outras plataformas, recorrência é um plugin caro e desconectado. Na Unbox, faz parte da plataforma, e é exatamente o que marcas D2C precisam.</p>
            </div>
            <div className="as-cmp">
              <div className="as-cmp-card is-bad reveal">
                <p className="as-cmp-tag">Outras plataformas</p>
                <ul className="as-cmp-list">
                  {AS_BAD.map((t, i) => (
                    <li className="as-cmp-row" key={i}><span className="as-cmp-ico x">{asX}</span><span>{t}</span></li>
                  ))}
                </ul>
              </div>
              <div className="as-cmp-card is-good reveal" style={{ transitionDelay: "80ms" }}>
                <p className="as-cmp-tag">Na Unbox</p>
                <ul className="as-cmp-list">
                  {AS_GOOD.map((t, i) => (
                    <li className="as-cmp-row" key={i}><span className="as-cmp-ico ok">{asCheck}</span><span>{t}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 7 · PROVA, métricas */}
        <section className="section as-proof">
          <div className="container">
            <div className="as-proof-grid reveal" style={{ transitionDelay: "80ms" }}>
              {AS_PROOF.map((m, i) => (
                <div className="as-proof-cell" key={i}>
                  <div className="as-proof-num">{m.num}<span className="u">{m.u}</span></div>
                  <p className="as-proof-lbl">{m.lbl}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CrossSellBanner
          icon="plug"
          title="Utiliza outra plataforma ou vende por Landing Page?"
          sub={<React.Fragment>Ative a <em className="accent-em">Venda por Assinatura</em> na sua loja e turbine seus resultados.</React.Fragment>}
          bullets={[
            "Integre a qualquer plataforma ou Landing Page",
            "Faturamento totalmente vinculado ao seu ERP",
            "Área do assinante completa para gerenciar assinatura",
            "O melhor sistema de assinatura do mercado",
            "Relatórios completos para acompanhar resultados",
          ]}
          cta={<a href={window.UNBOX_URLS.demo} className="btn btn--primary">Falar com especialista →</a>}
        />

        <AsFAQ />

        {/* CTA final personalizado */}
        <section className="final-cta as-cta" id="cta">
          <div className="container">
            <div className="final-banner reveal">
              <div className="final-banner-aura"></div>
              <div className="final-banner-text">
                <h2 className="final-banner-h2">Transforme sua loja em uma <em>máquina de receita previsível</em>.</h2>
                <p className="final-banner-sub">Assinatura nativa · sem app externo · migração assistida</p>
              </div>
              <div className="final-banner-btns">
                <a href={window.UNBOX_URLS.signup} className="btn btn--primary">Criar minha conta grátis →</a>
                <a href={window.UNBOX_URLS.demo} className="btn btn--secondary">Agendar demo</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloater />
      <DemoModal />
    </React.Fragment>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<AssinaturaPage />);
