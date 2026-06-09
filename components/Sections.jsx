import React from 'react';
import { URLS, R } from '../lib/config';

/* ---- Lucide-style stroke icons ---- */
function Icon({ name, size = 22 }) {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
  const paths = {
    layout: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></>,
    zap: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
    repeat: <><path d="m17 2 4 4-4 4" /><path d="M3 11v-1a4 4 0 0 1 4-4h14" /><path d="m7 22-4-4 4-4" /><path d="M21 13v1a4 4 0 0 1-4 4H3" /></>,
    gauge: <><path d="m12 14 4-4" /><path d="M3.34 19a10 10 0 1 1 17.32 0" /></>,
    settings: <><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" /></>,
    chart: <><path d="M3 3v18h18" /><path d="m7 14 3-3 3 3 5-5" /></>,
    headset: <><path d="M3 14v-3a9 9 0 0 1 18 0v3" /><path d="M21 16a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2ZM3 16a2 2 0 0 0 2 2h1v-5H5a2 2 0 0 0-2 2Z" /><path d="M18 18a4 4 0 0 1-4 3h-2" /></>,
    box: <><path d="M21 8 12 3 3 8v8l9 5 9-5Z" /><path d="m3 8 9 5 9-5M12 13v8" /></>,
    tag: <><path d="M12.6 2.6 21 11a2 2 0 0 1 0 2.8l-7.2 7.2a2 2 0 0 1-2.8 0L2.6 12.6A2 2 0 0 1 2 11.2V4a2 2 0 0 1 2-2h7.2a2 2 0 0 1 1.4.6Z" /><circle cx="7.5" cy="7.5" r="1" /></>,
    hand: <><path d="M18 11V6a2 2 0 0 0-4 0M14 10V4a2 2 0 0 0-4 0v2" /><path d="M10 10.5V6a2 2 0 0 0-4 0v8" /><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" /></>,
    sparkle: <><path d="M12 3v4M12 17v4M3 12h4M17 12h4" /><path d="m6.3 6.3 2.4 2.4M15.3 15.3l2.4 2.4M17.7 6.3l-2.4 2.4M8.7 15.3l-2.4 2.4" /></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></>,
    bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    check: <path d="m5 12 4.5 4.5L19 7" />,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
    truck: <><path d="M14 18V6a1 1 0 0 0-1-1H2v13h2" /><path d="M14 9h4l3 3v6h-3" /><path d="M10 18h2" /><circle cx="6" cy="18.5" r="2" /><circle cx="17" cy="18.5" r="2" /></>,
    card: <><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></>,
    pin: <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>,
  };
  return <svg {...p}>{paths[name] || paths.box}</svg>;
}

const STORES = [
  { img: R["Bhava"], name: "Bhava", seg: "Wellness" },
  { img: R["loja-pudim"], name: "Pudim Beauty", seg: "Cosméticos" },
  { img: R["Sunrize"], name: "Sunrize", seg: "Wellness" },
  { img: R["loja-popai"], name: "Popai", seg: "Wellness" },
  { img: R["loja-vistapere"], name: "Vista Perê", seg: "Moda" },
  { img: R["loja-olea"], name: "Olea", seg: "Alimentos" },
  { img: R["loja-dicapri"], name: "diCapri", seg: "Bebidas" },
  { img: R["Glow"], name: "Glow", seg: "Colágeno" },
  { img: R["Badia"], name: "Badia", seg: "Alimentos" },
];

function Showcase() {
  const loop = [...STORES, ...STORES];
  return (
    <section className="section showcase" id="cases">
      <div className="container showcase-head">
        <div>
          <h2 className="h2 reveal" style={{ transitionDelay: "60ms" }}>
            Marcas que já vendem<br />todo dia <em className="accent-em">com a Unbox</em>.
          </h2>
        </div>
        <p className="lede reveal showcase-lede" style={{ transitionDelay: "120ms" }}>
          Loja customizada e de alta performance para refletir a experiência da sua
          marca. Checkout e Venda por Assinatura nativamente integrados.
        </p>
      </div>
      <div className="marquee" aria-hidden="false">
        <div className="marquee-track">
          {loop.map((s, i) => (
            <figure className="store-card" key={i}>
              <div className="store-shot">
                <img src={s.img} alt={"Loja " + s.name} loading="lazy" />
              </div>
              <figcaption className="store-meta">
                <span className="store-name">{s.name}</span>
                <span className="store-seg">{s.seg}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Platform() {
  return (
    <section className="section platform" id="plataforma">
      <div className="container">
        <div className="block-head reveal">
          <h2 className="h2">Uma plataforma,<br /><em className="accent-em">tudo que você precisa</em>.</h2>
          <p className="lede block-lede">
            Esqueça integrações complexas. Com a Unbox, seu e-commerce já nasce
            pronto para escalar, da vitrine ao checkout.
          </p>
        </div>
        <div className="platform-grid">
          <article className="card platform-card platform-card--lead reveal">
            <div className="platform-card-head">
              <div className="icon-chip"><Icon name="layout" /></div>
              <h3 className="h3">Layout customizado</h3>
            </div>
            <p className="lede platform-body">
              E-commerce customizado para refletir sua experiência de marca e
              otimizado para escalar. Autonomia total para personalizar seu conteúdo.
            </p>
            <div className="platform-shot platform-shot--admin">
              <div className="admin-frame">
                <img src={R["feat-layout-admin"]} alt="Painel de personalização da loja na Unbox" loading="lazy" />
              </div>
              <div className="admin-perf">
                <img src={R["feat-lighthouse"]} alt="Performance 96, Acessibilidade 100, Boas práticas 100, SEO 100" loading="lazy" />
              </div>
            </div>
          </article>
          <article className="card platform-card reveal" style={{ transitionDelay: "80ms" }}>
            <div className="platform-card-head">
              <div className="icon-chip"><Icon name="tag" /></div>
              <h3 className="h3">Promoções <em className="accent-em">Avançadas</em></h3>
            </div>
            <p className="lede platform-body">
              Cupons, descontos progressivos, brindes e ofertas por tempo limitado.
              Tudo nativo, sem depender de apps externos.
            </p>
            <div className="platform-shot platform-shot--free">
              <img src={R["feat-promocoes"]} alt="Promoções avançadas na Unbox" loading="lazy" />
            </div>
          </article>
          <article className="card platform-card reveal" style={{ transitionDelay: "160ms" }}>
            <div className="platform-card-head">
              <div className="icon-chip"><Icon name="settings" /></div>
              <h3 className="h3">Totalmente <em className="accent-em">integrado</em></h3>
            </div>
            <p className="lede platform-body">
              Pagamento, ERP, logística e transportadoras conectados nativamente.
              Sua operação de ponta a ponta, funcionando no automático.
            </p>
            <div className="platform-eco">
              <div className="integ-grid">
                {[
                  { icon: "layout", t: "Loja virtual" },
                  { icon: "card", t: "Pagamentos" },
                  { icon: "truck", t: "Logística" },
                  { icon: "bolt", t: "Checkout" },
                  { core: true },
                  { icon: "repeat", t: "Recorrência" },
                  { icon: "chart", t: "Analytics" },
                  { icon: "box", t: "ERP" },
                  { icon: "tag", t: "Promoções" },
                ].map((it, i) => (
                  it.core ? (
                    <div className="integ-tile integ-core" key="core">
                      <img src={R["logo-navbar"]} alt="Unbox" />
                    </div>
                  ) : (
                    <div className="integ-tile" key={it.t}>
                      <span className="icon-chip"><Icon name={it.icon} size={15} /></span>
                      <span className="integ-lbl">{it.t}</span>
                    </div>
                  )
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

const GROWTH = [
  { icon: "gauge", title: "Alta performance", body: "Cresça sem limitações com a plataforma mais rápida do mercado, otimizada com técnicas de CRO para conversão máxima." },
  { icon: "settings", title: "Otimize sua operação", body: "Plataforma integrada de ponta a ponta, com pagamento nativo conectado ao seu ERP e logística. Escale no automático." },
  { icon: "chart", title: "Dashboards avançados", body: "Acompanhe seu negócio em tempo real. Decida com base em métricas e insights que realmente importam." },
  { icon: "headset", title: "Suporte estratégico", body: "Atendimento humano via WhatsApp, chat e e-mail com especialistas que conhecem a sua operação." },
];

function Growth() {
  return (
    <section className="section growth">
      <div className="growth-aura"></div>
      <div className="container">
        <div className="block-head block-head--center reveal">
          <h2 className="h2">Growth que vai além<br />da <em className="accent-em">tecnologia</em>.</h2>
        </div>
        <div className="growth-grid">
          {GROWTH.map((g, i) => (
            <article className="card growth-card reveal" key={g.title} style={{ transitionDelay: i * 70 + "ms" }}>
              <div className="icon-chip"><Icon name={g.icon} /></div>
              <h3 className="h3">{g.title}</h3>
              <p className="lede growth-body">{g.body}</p>
            </article>
          ))}
        </div>
        <div className="growth-cta reveal">
          <a href={URLS.demo} className="btn btn--primary">Fale conosco</a>
        </div>
      </div>
    </section>
  );
}

const SUB_ITEMS = [
  { icon: "repeat", title: "Totalmente integrado", body: "Fluxo de assinatura nativo conectado de ponta a ponta: da página do produto ao checkout, no mesmo ambiente." },
  { icon: "box", title: "Criado para produtos físicos", body: "Ideal para marcas que vendem bens de consumo com estoque. Gestão fácil de pedidos e envios." },
  { icon: "tag", title: "Sistema promocional", body: "Ofereça descontos e benefícios para assinantes. Frete grátis e cupons para primeira compra ou ciclos." },
  { icon: "hand", title: "Fácil de assinar e gerenciar", body: "Assinar se tornou tão fácil quanto comprar. Uma experiência fluida para assinar e gerenciar." },
  { icon: "sparkle", title: "Unbox Magic: Retentativas", body: "Sistema inteligente que recupera assinaturas no momento certo, mais recorrência, mais receita." },
];

function Subscription() {
  const [open, setOpen] = React.useState(0);
  return (
    <section className="section subscription" id="assinatura">
      <div className="container subscription-grid">
        <div className="subscription-visual reveal">
          <div className="subscription-glow"></div>
          <img src={R["feat-assinatura-sq"]} alt="Lojas de assinatura na Unbox" className="subscription-img" loading="lazy" />
        </div>
        <div className="subscription-copy">
          <h2 className="h2 reveal" style={{ transitionDelay: "60ms" }}>
            Transforme seu e-commerce com <em className="accent-em">venda por assinatura</em>.
          </h2>
          <p className="lede block-lede reveal" style={{ transitionDelay: "120ms" }}>
            O sistema de recorrência mais poderoso do mercado. Com a Unbox,
            assinar se tornou tão fácil quanto comprar.
          </p>
          <div className="sub-acc reveal" style={{ transitionDelay: "160ms" }}>
            {SUB_ITEMS.map((it, i) => (
              <div className={"sub-acc-item" + (open === i ? " is-open" : "")} key={it.title}>
                <button className="sub-acc-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                  <span className="sub-item-icon"><Icon name={it.icon} size={18} /></span>
                  <h3 className="sub-acc-title">{it.title}</h3>
                  <span className="sub-acc-sign">{open === i ? "–" : "+"}</span>
                </button>
                <div className="sub-acc-wrap"><p className="sub-acc-body">{it.body}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const CHECKOUT_PTS = [
  { icon: "bolt", text: "Converta 4x mais com o TURBO Checkout by Unbox" },
  { icon: "check", text: "Pagamentos com +98% de aprovação para 80% dos clientes" },
  { icon: "shield", text: "Antifraude turbinado com IA e reforçado por mesa de análise" },
  { icon: "repeat", text: "Totalmente adaptado para vendas por assinatura" },
  { icon: "zap", text: "Compra TURBO: autopreenchimento para usuários logados" },
  { icon: "clock", text: "Receba em 2, 14 ou 30 dias com as melhores taxas do mercado" },
];

function Checkout() {
  return (
    <section className="section checkout" id="checkout">
      <div className="container subscription-grid checkout-grid">
        <div className="subscription-copy">
          <h2 className="h2 reveal" style={{ transitionDelay: "60ms" }}>
            Seu checkout em modo <em className="accent-em">TURBO</em>.
          </h2>
          <p className="lede block-lede reveal" style={{ transitionDelay: "120ms" }}>
            Checkout de 3 etapas totalmente integrado ao meio de pagamento e ao seu
            e-commerce. Otimizado para o mercado brasileiro.
          </p>
          <ul className="check-list">
            {CHECKOUT_PTS.map((p, i) => (
              <li className="check-item reveal" key={i} style={{ transitionDelay: 140 + i * 50 + "ms" }}>
                <span className="check-bullet"><Icon name={p.icon} size={16} /></span>
                <span>{p.text}</span>
              </li>
            ))}
          </ul>
          <p className="pay-note meta">Sem taxa de saque · todas as bandeiras · parcela em até 12×</p>
        </div>
        <div className="checkout-visual reveal">
          <div className="subscription-glow"></div>
          <img src={R["checkout-dash"]} alt="Checkout em etapas da Unbox" className="checkout-img" loading="lazy" />
        </div>
      </div>
    </section>
  );
}

export { Icon, Showcase, Platform, Growth, Subscription, Checkout };
