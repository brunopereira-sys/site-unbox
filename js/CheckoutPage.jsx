// CheckoutPage.jsx, página do Checkout TURBO / Unbox Pay.

// Visual do hero: imagem do checkout cercada por "caixinhas" do ecossistema
// Unbox flutuando, com várias notificações de venda subindo e se empilhando.
const CKO_SALES = [
  { name: "Camila Souza", value: "R$100,60", loc: "São Paulo · SP" },
  { name: "Pedro Martins", value: "R$249,90", loc: "Belo Horizonte · MG" },
  { name: "Aurora Cosméticos", value: "R$89,90", loc: "Curitiba · PR" },
  { name: "Lucas Almeida", value: "R$329,00", loc: "Recife · PE" },
  { name: "Bruna Ferraz", value: "R$59,90", loc: "Porto Alegre · RS" },
];

const ckIco = {
  pay: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2.5" /><path d="M2 10h20" /></svg>,
  truck: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z" /><circle cx="7" cy="18" r="1.6" /><circle cx="17.5" cy="18" r="1.6" /></svg>,
  bag: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8h12l-1 12H7L6 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>,
  chart: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 20V10M12 20V4M19 20v-7" /></svg>,
  lock: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="11" width="16" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>,
  user: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="3.6" /><path d="M5 20a7 7 0 0 1 14 0" /></svg>,
  check: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>,
};

function CheckoutHeroVisual() {
  const R = window.__resources;
  const reduce = typeof window !== "undefined" && window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [items, setItems] = React.useState([]);
  const idRef = React.useRef(0);
  React.useEffect(() => {
    if (reduce) {
      setItems(CKO_SALES.slice(0, 3).map((s, i) => ({ id: i, sale: s })));
      return;
    }
    let i = 0;
    const tick = () => {
      setItems((prev) => {
        const next = [...prev, { id: idRef.current++, sale: CKO_SALES[i % CKO_SALES.length] }];
        i++;
        return next.slice(-3);
      });
    };
    tick();
    const iv = setInterval(tick, 1700);
    return () => clearInterval(iv);
  }, [reduce]);

  return (
    <div className="ck-hero">
      <div className="ck-hero-aura" aria-hidden="true"></div>
      <div className="ck-stage">
        <div className="ck-shot">
          <img src={R["checkout-hero"]} alt="Checkout TURBO da Unbox" loading="lazy" />
        </div>

        <div className="ck-chip ck-chip--brand" style={{ top: "5%", left: "-13%", animationDelay: "0s" }} aria-hidden="true">
          <img src={R["logo-navbar"]} alt="" />
        </div>
        <div className="ck-chip" style={{ top: "-4%", right: "4%", animationDelay: "-1.1s" }} aria-hidden="true">
          <span className="ck-chip-ico ck-ico--green">{ckIco.lock}</span>
          <span className="ck-chip-lbl">100%<br />seguro</span>
        </div>
        <div className="ck-chip" style={{ top: "24%", right: "-15%", animationDelay: "-2.2s" }} aria-hidden="true">
          <span className="ck-chip-ico ck-ico--roxo">{ckIco.pay}</span>
          <span className="ck-chip-lbl">Meio de<br />pagamento</span>
        </div>
        <div className="ck-chip" style={{ top: "31%", left: "-16%", animationDelay: "-3s" }} aria-hidden="true">
          <span className="ck-chip-ico ck-ico--roxo">{ckIco.user}</span>
          <span className="ck-chip-lbl">Área<br />logada</span>
        </div>
        <div className="ck-chip" style={{ bottom: "20%", right: "-13%", animationDelay: "-0.6s" }} aria-hidden="true">
          <span className="ck-chip-ico ck-ico--roxo">{ckIco.chart}</span>
          <span className="ck-chip-lbl">Analytics</span>
        </div>
        <div className="ck-chip" style={{ bottom: "8%", left: "-8%", animationDelay: "-1.7s" }} aria-hidden="true">
          <span className="ck-chip-ico ck-ico--teal">{ckIco.truck}</span>
          <span className="ck-chip-lbl">Logística</span>
        </div>

        <div className="cko-toasts" aria-hidden="true">
          {items.map(({ id, sale }) => (
            <div className="cko-toast" key={id}>
              <span className="cko-toast-ico">{ckIco.check}</span>
              <div className="cko-toast-txt">
                <p className="t">Venda aprovada · <strong>{sale.value}</strong></p>
                <p className="s">{sale.name} · {sale.loc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const CK_BENEFITS = [
  { icon: "bolt", t: "4× mais conversão", d: "Checkout nativo de 3 etapas, sem redirecionamento, otimizado para o mercado brasileiro." },
  { icon: "check", t: "+98% de aprovação", d: "Aprovação de pagamentos para 90% dos clientes, com as melhores taxas do e-commerce." },
  { icon: "shield", t: "Antifraude com IA", d: "Análise turbinada por IA e reforçada por mesa de análise humana. Sua loja protegida." },
  { icon: "repeat", t: "Pronto para assinatura", d: "Totalmente adaptado para vendas por assinatura e recorrência, sem fricção." },
  { icon: "zap", t: "Compra TURBO", d: "Autopreenchimento para usuários logados: finaliza a compra em segundos." },
  { icon: "clock", t: "Receba em 2, 14 ou 30 dias", d: "Escolha o prazo de recebimento. Sem taxa de saque, com todas as bandeiras." },
];

const CK_PAY = [
  { icon: "wallet", t: "Gateway próprio, nativo", d: "Meio de pagamento da Unbox, 100% integrado à plataforma. Sem intermediário, sem dor de cabeça." },
  { icon: "shield", t: "UnboxPay + Crédito", d: "Crédito de até R$500k amortizado pelas suas próprias vendas, direto pela plataforma." },
  { icon: "card", t: "Pix, cartão e boleto", d: "Todas as bandeiras, Pix e boleto, com parcelamento em até 12×." },
];

const CK_PLUG = [
  { icon: "store", t: "Loja Unbox", d: "Checkout 100% nativo para quem já vende na plataforma Unbox." },
  { icon: "plug", t: "Shopify", d: "Plugue o Checkout TURBO da Unbox na sua loja Shopify e turbine a conversão." },
  { icon: "globe", t: "WordPress / WooCommerce", d: "Integre o checkout ao seu site WordPress e venda com as melhores taxas." },
];

function CheckoutPage() {
  useReveal();
  const R = window.__resources;
  return (
    <React.Fragment>
      <Nav />
      <main>
        <PageHero
          eyebrow="Unbox Pay · Checkout"
          title={<React.Fragment>Seu checkout em modo <em className="accent-em">TURBO</em>.</React.Fragment>}
          lede="Checkout nativo de 3 etapas, totalmente integrado ao meio de pagamento e ao seu e-commerce. +98% de aprovação e 4× mais conversão."
          ctaPrimary={<a href={window.UNBOX_URLS.signup} className="btn btn--primary">Comece agora</a>}
          ctaSecondary={<a href={window.UNBOX_URLS.demo} className="btn btn--secondary">Agendar demo →</a>}
        >
          <CheckoutHeroVisual />
        </PageHero>

        <section className="section">
          <div className="container">
            <div className="block-head reveal">
              <h2 className="h2">Feito para <em className="accent-em">converter mais</em>.</h2>
              <p className="lede block-lede">Cada etapa do checkout pensada para reduzir fricção e aumentar a aprovação.</p>
            </div>
            <FeatGrid items={CK_BENEFITS} />
          </div>
        </section>

        <CheckoutShowcase />

        <UnboxPaySection />

        <PaymentsSection />

        <CrossSellBanner
          icon="plug"
          title="Utiliza outra plataforma ou vende por Landing Page?"
          sub={<React.Fragment>Ative o <em className="accent-em">Turbo Checkout</em> na sua loja e turbine seus resultados.</React.Fragment>}
          bullets={[
            "Plugue na Shopify, WordPress ou em uma Landing Page",
            "Checkout transparente com sua marca",
            "Checkout de 3 etapas com +98% de aprovação",
            "Antifraude com IA, sem migrar de plataforma",
            "Order Bump e Upsell para aumentar o ticket médio",
          ]}
          cta={<a href={window.UNBOX_URLS.demo} className="btn btn--primary">Falar com especialista →</a>}
        />

        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppFloater />
      <DemoModal />
    </React.Fragment>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<CheckoutPage />);
