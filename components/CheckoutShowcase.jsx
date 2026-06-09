import React from 'react';
import { URLS, R } from '../lib/config';
import { FIcon } from './PageKit';

const csIco = {
  bag: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8h12l-1 12H7L6 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>,
  gift: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="8" width="18" height="4" rx="1" /><path d="M5 12v8h14v-8M12 8v12" /><path d="M12 8S10.5 4 8 4a2 2 0 0 0 0 4h4ZM12 8s1.5-4 4-4a2 2 0 0 1 0 4h-4Z" /></svg>,
  swap: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 9h13l-3.5-3.5M17 15H4l3.5 3.5" /></svg>,
  sparkle: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.8 5.6L19.5 9l-5.7 1.4L12 16l-1.8-5.6L4.5 9l5.7-1.4L12 2Z" /><path d="M19 14l.8 2.4L22 17l-2.2.6L19 20l-.8-2.4L16 17l2.2-.6L19 14Z" /></svg>,
  lock: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="11" width="16" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>,
  cart: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="20" r="1.4" /><circle cx="18" cy="20" r="1.4" /><path d="M2 3h3l2.4 12.6a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.2L22 7H6" /></svg>,
  layout: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>,
};

function OrderBumpArt() {
  return (
    <div className="cko-art">
      <div className="ob-flow">
        <div className="ob-node">
          <span className="ob-thumb" style={{ background: "linear-gradient(135deg,#d9d4ea,#b6afd0)" }}></span>
          <span className="ob-lines"><span className="sk w70"></span><span className="sk w40"></span></span>
        </div>
        <div className="ob-mid">
          <span className="ob-pill">
            <span className="ob-chip-ico dark">{csIco.bag}</span>
            <span className="ob-plus">+</span>
            <span className="ob-chip-ico gold">{csIco.gift}</span>
          </span>
        </div>
        <div className="ob-node">
          <span className="ob-thumb" style={{ background: "linear-gradient(135deg,#e7cba6,#c79f6a)" }}></span>
          <span className="ob-lines"><span className="sk w70"></span><span className="sk w40"></span></span>
        </div>
      </div>
      <div className="ob-bump">
        <div className="ob-bump-top">
          <span className="ob-check"></span>
          <span className="ob-bump-label">Adicionado ao carrinho</span>
        </div>
        <div className="ob-prod">
          <span className="ob-prod-thumb" style={{ background: "linear-gradient(135deg,#cfd8e8,#aab6cf)" }}></span>
          <div className="ob-prod-info">
            <div className="ob-price-row">
              <span className="ob-price-old">R$ 2.550,90</span>
              <span className="ob-price-now">R$ 1.799,90</span>
              <span className="ob-badge">Mais vendido</span>
            </div>
            <span className="sk w85"></span>
            <span className="sk w55"></span>
          </div>
        </div>
      </div>
    </div>
  );
}

const BR_SWATCHES = ["#7B2FBE", "#1f9d5b", "#e23d4b", "#2f6fd6", "#e08a1e"];
function BrandArt() {
  return (
    <div className="cko-art">
      <div className="br-preview">
        <div className="br-bar">
          <span className="br-logo" style={{ color: "#7B2FBE" }}>SUA MARCA</span>
          <span className="br-secure">{csIco.lock} Pagamento seguro</span>
        </div>
        <span className="br-field"></span>
        <span className="br-field"></span>
        <span className="br-cta" style={{ background: "#7B2FBE" }}>Finalizar compra</span>
        <div className="br-swatches">
          {BR_SWATCHES.map((c, i) => (
            <span key={c} className={"br-sw" + (i === 0 ? " is-active" : "")} style={{ background: c }}></span>
          ))}
        </div>
      </div>
    </div>
  );
}

function IntegraArt() {
  return (
    <div className="cko-art ig-art">
      <div className="ig-sources">
        <div className="ig-src">
          <div className="ig-src-head">
            <span className="ig-src-ico ec">{csIco.cart}</span>
            <span className="ig-src-tag">E-commerce</span>
          </div>
          <span className="ig-thumb"></span>
          <span className="sk w70"></span>
        </div>
        <div className="ig-src">
          <div className="ig-src-head">
            <span className="ig-src-ico lp">{csIco.layout}</span>
            <span className="ig-src-tag">Landing page</span>
          </div>
          <span className="ig-thumb"></span>
          <span className="sk w70"></span>
        </div>
      </div>
      <div className="ig-connect">
        <span className="ig-pipe"></span>
        <span className="ig-pipe"></span>
      </div>
      <div className="ig-checkout">
        <span className="ig-checkout-ico"><img src={R["logo-navbar"]} alt="" /></span>
        <span className="ig-checkout-lbl">Checkout TURBO</span>
      </div>
    </div>
  );
}

function AntiFraudeArt() {
  return (
    <div className="cko-art">
      <div className="af-stack">
        <div className="af-row">
          <span className="af-avatar"></span>
          <span className="ob-lines"><span className="sk w70 tall"></span><span className="sk w40"></span></span>
          <span className="af-flag">Risco de fraude alta</span>
        </div>
        <div className="af-connect"></div>
        <div className="af-cols">
          <div className="af-col">
            <span className="af-ico ai">{csIco.sparkle}</span>
            <span className="sk w70"></span>
            <span className="sk w85"></span>
            <span className="sk w55"></span>
          </div>
          <span className="af-swap">{csIco.swap}</span>
          <div className="af-col">
            <span className="af-ico brand">U</span>
            <span className="sk w70"></span>
            <span className="sk w85"></span>
            <span className="sk w55"></span>
          </div>
        </div>
      </div>
    </div>
  );
}

const TK_SATS = [
  { angle: -90, color: "#1877F2" },
  { angle: -30, color: "#E60023" },
  { angle: 30, color: "#0A66C2" },
  { angle: 90, color: "#15131d" },
  { angle: 150, color: "#E1306C" },
  { angle: 210, color: "#E37400" },
];
function TrackeamentoArt() {
  const r = 72;
  return (
    <div className="cko-art">
      <div className="tk-hub">
        {TK_SATS.map((s, i) => {
          const rad = (s.angle * Math.PI) / 180;
          const x = Math.cos(rad) * r;
          const y = Math.sin(rad) * r;
          return (
            <React.Fragment key={i}>
              <span className="tk-line" style={{ width: r + "px", transform: `rotate(${s.angle}deg)` }}></span>
              <span className="tk-sat" style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`, transform: "translate(-50%,-50%)" }}>
                <span className="tk-dot" style={{ background: s.color }}></span>
              </span>
            </React.Fragment>
          );
        })}
        <span className="tk-core"><img src={R["logo-navbar"]} alt="" /></span>
      </div>
    </div>
  );
}

const CKO_ITEMS = [
  { t: "Checkout customizado com sua marca", d: "Logo, cores e domínio próprio. Seus clientes compram numa experiência 100% com a sua identidade.", art: <BrandArt /> },
  { t: "Integre com seu e-commerce ou Landing Page", d: "Plugue o Checkout TURBO na sua loja Shopify, WordPress, VTEX ou numa landing page. Sem migrar de plataforma.", art: <IntegraArt /> },
  { t: "Aumente o ticket médio com Order Bump", d: "Ofereça produtos complementares direto no checkout e aumente o valor de cada venda, sem fricção para o cliente.", art: null },
  { t: "Evite fraudes com o Anti-Fraude IA+", d: "Inteligência artificial reforçada por mesa de análise humana: bloqueia só o que é fraude e mantém sua aprovação lá no alto.", art: <AntiFraudeArt /> },
  { t: "Trackeamento com Dados & Analytics", d: "Monitore a jornada do consumidor com dados claros através de todos os Dashboards da Unbox e integrados as suas ferramentas de marketing.", art: <TrackeamentoArt /> },
];

function CheckoutShowcase() {
  const [open, setOpen] = React.useState(0);
  const items = CKO_ITEMS.map((it) => ({
    ...it,
    art: it.art || <div className="cko-art cko-art--photo"><img src={R["feat-upsell"]} alt="Order Bump no checkout" loading="lazy" /></div>,
  }));
  return (
    <section className="section recursos">
      <div className="recursos-aura"></div>
      <div className="container recursos-grid">
        <div className="recursos-visual reveal">
          <div className="cko-vis">
            {items.map((it, i) => (
              <div className={"cko-pane" + ((open === i || (open === -1 && i === 0)) ? " is-active" : "")} key={i}>
                {it.art}
              </div>
            ))}
          </div>
        </div>
        <div className="recursos-copy">
          <p className="recursos-eyebrow reveal">O Checkout TURBO por dentro</p>
          <h2 className="recursos-h2 reveal" style={{ transitionDelay: "60ms" }}>
            Um checkout com a cara<br />da <em className="accent-em">sua marca</em>.
          </h2>
          <div className="recursos-list reveal" style={{ transitionDelay: "120ms" }}>
            {items.map((it, i) => (
              <div className={"recursos-item" + (open === i ? " is-open" : "")} key={i}>
                <button className="recursos-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                  <span className="recursos-sign">{open === i ? "–" : "+"}</span>
                  <span className="recursos-label">{it.t}</span>
                </button>
                <div className="recursos-a-wrap"><p className="recursos-a">{it.d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const PAY_TX = [
  { status: "pend", label: "Pendente", val: "R$ 24.400,50" },
  { status: "ok", label: "Concluído", val: "R$ 35.000,00" },
  { status: "ok", label: "Concluído", val: "R$ 800.520,89" },
];
const PAY_BENEFITS = [
  { icon: "wallet", t: "Saque ágil e sem custo", d: "Saques realizados em até 2 dias úteis, sem taxas ocultas e sem burocracia." },
  { icon: "shield", t: "Segurança total na UnboxPay", d: "Criptografia de ponta avançada e proteção total dos seus dados." },
  { icon: "settings", t: "Controle total do seu dinheiro", d: "Acompanhe saldos, saques e recebimentos em tempo real, num só lugar." },
  { icon: "headset", t: "Gerente de contas exclusivo", d: "Conte com um gerente exclusivo só seu, disponível em horário comercial." },
];

function PaymentsSection() {
  return (
    <section className="section section--alt">
      <div className="container pay-split">
        <div className="pay-phone-wrap reveal">
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
              {PAY_TX.map((t, i) => (
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

        <div className="pay-copy">
          <h2 className="h2 reveal" style={{ transitionDelay: "60ms" }}>Receba seu dinheiro em até <em className="accent-em">2 dias úteis</em>.</h2>
          <p className="lede block-lede reveal" style={{ transitionDelay: "120ms", marginTop: 20 }}>
            Chega de esperar prazos longos ou burocracia. Tenha previsibilidade financeira, melhor fluxo de caixa e crescimento acelerado com saques rápidos, sem custo e descomplicados.
          </p>
          <div className="pay-benefits">
            {PAY_BENEFITS.map((b, i) => (
              <div className="reveal" key={b.t} style={{ transitionDelay: 160 + i * 60 + "ms" }}>
                <h3 className="pay-benefit-h"><span className="pay-benefit-ico"><FIcon name={b.icon} size={18} /></span>{b.t}</h3>
                <p className="pay-benefit-b">{b.d}</p>
              </div>
            ))}
          </div>
          <div className="reveal" style={{ transitionDelay: "420ms", marginTop: 34 }}>
            <a href={URLS.demo} className="btn btn--primary">Fale com a equipe de vendas →</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export { CheckoutShowcase, PaymentsSection };
