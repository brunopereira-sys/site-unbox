// UnboxPaySection.jsx, bloco UnboxPay (substitui "As melhores taxas" na página de Checkout).
// Conteúdo e imagem trazidos da página unbox.com.br/unbox-pay.

const UPX_STATS = [
  { n: "+98%", d: "de aprovação para +90% dos clientes" },
  { n: "< 1%", d: "de chargeback em 95% dos clientes" },
  { n: "2,99%", d: "de taxa no cartão (a partir de)" },
  { n: "até 40%", d: "de redução nas taxas vs. outros players" },
];

const UPX_WHY = [
  { icon: "shield", t: "Alta taxa de aprovação", d: "IA que identifica compras legítimas e reduz recusas injustas." },
  { icon: "repeat", t: "Multi provedores + retentativa automática", d: "Quando o pagamento falha, o UnboxPay tenta novamente de forma inteligente, usando múltiplos provedores. Mais aprovações, menos abandono." },
  { icon: "card", t: "Tudo que seu e-commerce precisa", d: "Cartão de crédito, Pix e boleto, simples, direto e confiável. Repasse em D+2, D+14 ou D+30, sem taxa de saque." },
  { icon: "plug", t: "Integração total com a Unbox e outras plataformas", d: "Nativo na Unbox e compatível com Shopify e VTEX." },
];

const UPX_FRAUD = [
  "IA que aprova vendas legítimas que outros gateways negam",
  "Bloqueio inteligente de tentativas suspeitas",
  "Segurança avançada sem atrito na compra",
  "Foco total em aprovar mais, não apenas barrar transações",
];

function UnboxPaySection() {
  const R = window.__resources;
  return (
    <section className="section upx">
      <div className="upx-aura" aria-hidden="true"></div>
      <div className="container">
        <div className="block-head block-head--center reveal">
          <h2 className="h2">A escolha inteligente para<br /><em className="accent-em">pagamentos online</em>.</h2>
          <p className="lede block-lede">Gateway próprio, nativo na plataforma e turbinado por IA, feito para aprovar mais e custar menos.</p>
        </div>

        <div className="upx-stats reveal">
          {UPX_STATS.map((s) => (
            <div className="upx-stat" key={s.d}>
              <strong className="upx-stat-n">{s.n}</strong>
              <span className="upx-stat-d">{s.d}</span>
            </div>
          ))}
        </div>

        <div className="subscription-grid upx-why">
          <div className="subscription-copy">
            <h2 className="h2 reveal" style={{ transitionDelay: "60ms" }}>Feito para marcas que <em className="accent-em">crescem rápido</em>.</h2>
            <p className="lede block-lede reveal" style={{ transitionDelay: "120ms" }}>
              Mais aprovação, menos fricção e taxas que cabem na sua margem.
            </p>
            <SubList items={UPX_WHY} />
          </div>
          <div className="subscription-visual reveal">
            <div className="subscription-glow"></div>
            <img src={R["feat-unboxpay"]} alt="Cartão UnboxPay" className="upx-card-img" loading="lazy" />
          </div>
        </div>

        <div className="upx-fraud reveal">
          <div className="upx-fraud-glow" aria-hidden="true"></div>
          <div className="upx-fraud-head">
            <span className="upx-fraud-ico"><FIcon name="shield" size={26} /></span>
            <div>
              <h3 className="upx-fraud-h">Antifraude UnboxPay, <em className="accent-em">turbinado com IA</em></h3>
              <p className="upx-fraud-sub">Aprovação máxima para DNVBs, sem complicação.</p>
            </div>
          </div>
          <ul className="upx-fraud-list">
            {UPX_FRAUD.map((t) => (
              <li key={t}><span className="upx-fraud-check"><FIcon name="check" size={14} /></span><span>{t}</span></li>
            ))}
          </ul>
          <p className="upx-fraud-tag">Seu cliente compra sem fricção.<br /><em>Seu negócio com mais conversão.</em></p>
        </div>
      </div>
    </section>
  );
}
window.UnboxPaySection = UnboxPaySection;
