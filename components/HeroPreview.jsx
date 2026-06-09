import React from 'react';
import { URLS, R } from '../lib/config';

function HPIcon({ name }) {
  const s = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "instagram": return <svg {...s}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" /></svg>;
    case "whatsapp": return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.1-.7.2-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.5-.9-.7-1.4-1.7-1.6-1.9-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.6-1.5-.9-2.1-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .2.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.4zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.4 5L2 22l5-1.4c1.5.8 3.2 1.3 5 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2z" /></svg>;
    case "pix": return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"><path d="M8 8 4 12l4 4M16 8l4 4-4 4M9.5 5.5 12 3l2.5 2.5M9.5 18.5 12 21l2.5-2.5" /></svg>;
    case "bling": return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M9 8v8M9 8h3.5a2 2 0 0 1 0 4H9m0 0h4a2 2 0 0 1 0 4H9" /></svg>;
    case "analytics": return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M5 20V10M12 20V4M19 20v-7" /></svg>;
    case "gift": return <svg {...s}><rect x="3" y="8" width="18" height="4" /><path d="M12 8v13M5 12v9h14v-9M12 8C12 5 10 3 8 3a2 2 0 0 0 0 4h4M12 8c0-3 2-5 4-5a2 2 0 0 1 0 4h-4" /></svg>;
    case "cart": return <svg {...s}><circle cx="9" cy="20" r="1.4" /><circle cx="18" cy="20" r="1.4" /><path d="M2 3h2.5l2 12h11l2-8H6" /></svg>;
    case "wallet": return <svg {...s}><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M3 10h18M16 14h2" /></svg>;
    case "zap": return <svg {...s}><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" /></svg>;
    case "repeat": return <svg {...s}><path d="m17 2 4 4-4 4" /><path d="M3 11v-1a4 4 0 0 1 4-4h14" /><path d="m7 22-4-4 4-4" /><path d="M21 13v1a4 4 0 0 1-4 4H3" /></svg>;
    case "users": return <svg {...s}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13A4 4 0 0 1 16 11" /></svg>;
    case "expand": return <svg {...s}><path d="M15 3h6v6M21 3l-8 8M9 21H3v-6M3 21l8-8" /></svg>;
    case "layout": return <svg {...s}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>;
    case "bolt": return <svg {...s}><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" /></svg>;
    case "card": return <svg {...s}><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>;
    case "truck": return <svg {...s}><path d="M14 18V6a1 1 0 0 0-1-1H2v13h2" /><path d="M14 9h4l3 3v6h-3" /><path d="M10 18h2" /><circle cx="6" cy="18.5" r="2" /><circle cx="17" cy="18.5" r="2" /></svg>;
    case "headset": return <svg {...s}><path d="M3 14v-3a9 9 0 0 1 18 0v3" /><path d="M21 16a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2ZM3 16a2 2 0 0 0 2 2h1v-5H5a2 2 0 0 0-2 2Z" /><path d="M18 18a4 4 0 0 1-4 3h-2" /></svg>;
    case "box": return <svg {...s}><path d="M21 8 12 3 3 8v8l9 5 9-5Z" /><path d="m3 8 9 5 9-5M12 13v8" /></svg>;
    case "check": return <svg {...s}><path d="m5 12 4.5 4.5L19 7" /></svg>;
    default: return null;
  }
}

const BUBBLES = [
  { type: "wordmark", name: "Badia", logo: R["logo-badia"], x: 27, y: 13, speed: 0.18 },
  { type: "photo", img: R["hero-bhava"], x: 50, y: 13, w: 188, h: 128, front: true, speed: 0 },
  { type: "wordmark", name: "Wish", logo: R["logo-wish"], x: 73, y: 13, speed: -0.18 },
  { type: "photo", img: R["dicapri-foto"], x: 11, y: 35, w: 188, h: 128, speed: 0 },
  { type: "wordmark", name: "Pudim beauty", logo: R["logo-pudim"], x: 12, y: 52, speed: 0.16 },
  { type: "photo", img: R["hero-popai"], x: 11, y: 69, w: 188, h: 128, speed: 0 },
  { type: "photo", img: R["OLEA"], x: 89, y: 35, w: 188, h: 128, front: true, speed: 0 },
  { type: "wordmark", name: "Sunrize", logo: R["logo-sunrize"], x: 88, y: 52, speed: -0.16 },
  { type: "photo", img: R["hero-pudim"], x: 89, y: 70, w: 188, h: 128, front: true, speed: 0 },
  { type: "message", label: "E-commerce de alta conversão", title: "E-commerce de alta conversão", icon: "cart", x: 11, y: 90, w: 210, h: 88, speed: 0 },
  { type: "message", label: "Checkout TURBO", title: "Checkout TURBO", icon: "zap", x: 30.5, y: 90, w: 210, h: 88, speed: 0 },
  { type: "message", label: "Assinatura nativa", title: "Venda por Assinatura", icon: "repeat", x: 50, y: 90, w: 210, h: 88, speed: 0 },
  { type: "message", label: "Venda com Afiliados", title: "Venda com Afiliados", icon: "users", x: 69.5, y: 90, w: 210, h: 88, speed: 0 },
  { type: "message", label: "UnboxPay + Crédito", title: "UnboxPay + Crédito", icon: "wallet", x: 89, y: 90, w: 210, h: 88, speed: 0 },
];

const HP_ECO = [
  { icon: "layout", t: "Loja Virtual" },
  { icon: "bolt", t: "Checkout TURBO" },
  { icon: "repeat", t: "Assinatura" },
  { icon: "card", t: "UnboxPay" },
  { core: true },
  { icon: "truck", t: "Unbox Envios" },
  { icon: "users", t: "Meta & Instagram" },
  { icon: "headset", t: "WhatsApp" },
  { icon: "box", t: "Bling & Google" },
];

function EcoMini() {
  return (
    <div className="hp-eco-grid">
      {HP_ECO.map((e) => e.core ? (
        <div className="eco-tile eco-core" key="core"><img src={R["logo-navbar"]} alt="Unbox" /></div>
      ) : (
        <div className="eco-tile" key={e.t}>
          <span className="icon-chip"><HPIcon name={e.icon} /></span>
          <span className="eco-tile-label">{e.t}</span>
        </div>
      ))}
    </div>
  );
}

function CheckoutMini() {
  const ck = {
    lock: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="11" width="16" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>,
    card: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2.5" /><path d="M2 10h20" /></svg>,
    check: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>,
  };
  return (
    <div className="hp-ck-art">
      <div className="hp-ck-shot"><img src={R["checkout-hero"]} alt="Checkout TURBO da Unbox" /></div>
      <div className="hp-ck-chip hp-ck-chip--tr"><span className="hp-ck-chip-ico hp-ck-ico--green">{ck.lock}</span><span className="hp-ck-chip-lbl">100%<br />seguro</span></div>
      <div className="hp-ck-chip hp-ck-chip--bl"><span className="hp-ck-chip-ico hp-ck-ico--roxo">{ck.card}</span><span className="hp-ck-chip-lbl">Meio de<br />pagamento</span></div>
      <div className="hp-ck-toast"><span className="hp-ck-toast-ico">{ck.check}</span><div className="hp-ck-toast-txt"><p className="t">Venda aprovada · <strong>R$100,60</strong></p><p className="s">Camila Souza · São Paulo · SP</p></div></div>
    </div>
  );
}

function CreatorsMini() {
  const check = <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>;
  const bars = [{ lbl: "ana", h: 86 }, { lbl: "joao", h: 64 }, { lbl: "chico", h: 44 }, { lbl: "maria", h: 32 }];
  return (
    <div className="hp-cr-art">
      <div className="hp-cr-card">
        <div className="hp-cr-top">
          <span className="hp-cr-ico"><HPIcon name="users" /></span>
          <span className="hp-cr-handle">Vendas por creator<small>atribuição por cupom</small></span>
          <span className="hp-cr-live"><i></i>ao vivo</span>
        </div>
        <div className="hp-cr-metrics">
          <div className="hp-cr-metric"><span>GMV gerado</span><strong>R$ 21.480</strong></div>
          <div className="hp-cr-metric"><span>Comissão</span><strong>R$ 2.578</strong></div>
        </div>
        <div className="hp-cr-bars">
          {bars.map((b) => (
            <div className="hp-cr-bar" key={b.lbl}>
              <span className="hp-cr-bar-fill" style={{ height: b.h + "%" }}></span>
              <span className="hp-cr-bar-lbl">{b.lbl}</span>
            </div>
          ))}
        </div>
      </div>
      <span className="hp-cr-chip hp-cr-chip--1">ANA10</span>
      <span className="hp-cr-chip hp-cr-chip--2">JOAO15</span>
      <div className="hp-cr-toast"><span className="hp-cr-toast-ico">{check}</span><div><p className="t">Venda via @ana.lima · <strong>R$ 189,90</strong></p><p className="s">cupom ANA10 · rastreada</p></div></div>
    </div>
  );
}

const DETAILS = {
  "E-commerce de alta conversão": {
    img: R["feat-ecommerce"], eyebrow: "Plataforma", href: "/recursos", art: <EcoMini />,
    body: "Sua loja nasce profissional, rápida e sob medida pra sua marca. Layout customizável, otimizado com técnicas de CRO e pronto pra escalar do primeiro pedido aos milhões.",
    bullets: ["Layout 100% customizável", "Performance e SEO de ponta", "Mobile-first, alta conversão"],
  },
  "Venda com Afiliados": {
    img: R["feat-creators"], eyebrow: "Unbox Growth", href: "/afiliados", art: <CreatorsMini />,
    body: "Transforme creators em canal de aquisição. Rede integrada ao checkout, com cupons e rastreamento nativos, você só paga quando a venda acontece.",
    bullets: ["Creators integrados ao checkout", "Cupons e rastreamento nativos", "100% performance: pague por venda"],
  },
  "Assinatura nativa": {
    img: R["feat-assinatura"], eyebrow: "Recorrência", href: "/assinatura",
    body: "A única plataforma com assinatura 100% nativa. Da página de produto ao checkout, a recorrência que realmente funciona, e retém.",
    bullets: ["Recorrência nativa, sem app externo", "Fácil de assinar e gerenciar", "Unbox Magic: sistema de retentativas"],
  },
  "Dados em tempo real": {
    img: R["checkout-dash"], eyebrow: "Operação",
    body: "Acompanhe tudo num só painel, pedidos, assinantes e métricas em tempo real, integrados ao seu ERP e à logística. Aguenta de 1 a 1 milhão de acessos.",
    bullets: ["Dashboards em tempo real", "Integração com ERP e logística", "Sem limite de visitas"],
  },
  "Checkout TURBO": {
    img: R["feat-checkout"], eyebrow: "Unbox Pay · Checkout", href: "/checkout", art: <CheckoutMini />,
    body: "Checkout nativo de 3 etapas, sem redirecionamento. +98% de aprovação e 4× mais conversão, otimizado para o mercado brasileiro.",
    bullets: ["+98% de aprovação", "4× mais conversão", "Pix, cartão e boleto, em até 12×"],
  },
  "UnboxPay + Crédito": {
    img: R["feat-unboxpay"], eyebrow: "Pagamento + Capital", href: "/credito",
    body: "Gateway próprio com as melhores taxas do mercado e antifraude por IA. E mais: crédito de até R$500k amortizado pelas suas próprias vendas, direto pela plataforma.",
    bullets: ["Melhores taxas de pagamento do e-commerce", "Nativo e 100% integrado na plataforma", "Seguro e no ar: 24h por dia, 7 dias por semana"],
  },
};

const MOB_TABS = [
  { key: "E-commerce de alta conversão", short: "E-commerce", icon: "cart", title: "E-commerce de alta conversão" },
  { key: "Checkout TURBO", short: "Checkout", icon: "zap", title: "Checkout TURBO" },
  { key: "Assinatura nativa", short: "Assinatura", icon: "repeat", title: "Venda por Assinatura" },
  { key: "Venda com Afiliados", short: "Afiliados", icon: "users", title: "Venda com Afiliados" },
  { key: "UnboxPay + Crédito", short: "Unbox Pay", icon: "wallet", title: "UnboxPay + Crédito" },
];
const MOB_LOGOS = [
  { logo: R["logo-wish"], name: "Wish" },
  { name: "diCapri" },
  { logo: R["logo-pudim"], name: "Pudim beauty" },
  { name: "Noway" },
  { logo: R["logo-sunrize"], name: "Sunrize" },
  { name: "Badia" },
  { name: "Glow" },
];

function HeroPreview() {
  const stageRef = React.useRef(null);
  const [active, setActive] = React.useState(null);
  const [arrange, setArrange] = React.useState(false);
  const [mobTab, setMobTab] = React.useState(0);
  const [tabTouched, setTabTouched] = React.useState(false);
  const selectTab = (i) => { setMobTab(i); setTabTouched(true); };
  const [pos, setPos] = React.useState(() => {
    return BUBBLES.map((b) => ({ x: b.x, y: b.y }));
  });

  React.useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("hpPos_v1") || "null");
      if (Array.isArray(saved) && saved.length === BUBBLES.length) {
        setPos(saved);
      }
    } catch (e) {}
  }, []);

  const dragRef = React.useRef(null);

  const onTileMove = React.useCallback((e) => {
    const d = dragRef.current;
    if (!d) return;
    d.moved = true;
    const x = Math.max(2, Math.min(98, ((e.clientX - d.rect.left) / d.rect.width) * 100));
    const y = Math.max(2, Math.min(98, ((e.clientY - d.rect.top) / d.rect.height) * 100));
    setPos((prev) => { const n = prev.slice(); n[d.i] = { x: +x.toFixed(2), y: +y.toFixed(2) }; return n; });
  }, []);

  const onTileUp = React.useCallback(() => {
    window.removeEventListener("pointermove", onTileMove);
    window.removeEventListener("pointerup", onTileUp);
    setPos((prev) => { try { localStorage.setItem("hpPos_v1", JSON.stringify(prev)); } catch (e) {} return prev; });
    setTimeout(() => { dragRef.current = null; }, 0);
  }, [onTileMove]);

  const onTileDown = React.useCallback((e, i) => {
    if (!stageRef.current) return;
    e.preventDefault();
    const rect = stageRef.current.getBoundingClientRect();
    dragRef.current = { i, rect, moved: false };
    window.addEventListener("pointermove", onTileMove);
    window.addEventListener("pointerup", onTileUp);
  }, [onTileMove, onTileUp]);

  const resetPos = React.useCallback(() => {
    try { localStorage.removeItem("hpPos_v1"); } catch (e) {}
    setPos(BUBBLES.map((b) => ({ x: b.x, y: b.y })));
  }, []);

  React.useEffect(() => {
    if (!active) return;
    const onKey = (e) => { if (e.key === "Escape") setActive(null); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [active]);

  React.useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const bubbles = Array.from(stage.querySelectorAll(".hp-bubble"));
    let raf = null;
    const update = () => {
      raf = null;
      const r = stage.getBoundingClientRect();
      const rel = (r.top + r.height / 2) - window.innerHeight / 2;
      bubbles.forEach((b) => {
        const sp = parseFloat(b.dataset.speed) || 0;
        b.style.transform = `translate(-50%, calc(-50% + ${(-rel * sp).toFixed(1)}px))`;
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  return (
    <section className="hero-preview" id="top">
      <div className="hp-aura hp-aura-1"></div>
      <div className="hp-aura hp-aura-2"></div>

      <div className={"hp-stage" + (arrange ? " is-arrange" : "")} ref={stageRef}>
        {BUBBLES.map((b, i) => {
          const style = { left: pos[i].x + "%", top: pos[i].y + "%" };
          const dragDown = (e) => { if (arrange) onTileDown(e, i); };
          if (b.type === "photo") {
            return (
              <div className={"hp-bubble hp-photo hp-photo-decor" + (b.front ? " hp-front" : "")} key={i} data-speed={b.speed} style={style} onPointerDown={dragDown}>
                <div className="hp-bubble-inner" style={{ width: b.w || b.size, height: b.h || b.size }}>
                  <div className="hp-photo-img" style={{ backgroundImage: "url(" + b.img + ")" }}></div>
                </div>
              </div>
            );
          }
          if (b.type === "wordmark") {
            return (
              <div className="hp-bubble hp-wordmark" key={i} data-speed={b.speed} style={style} onPointerDown={dragDown}>
                <div className="hp-bubble-inner">
                  {b.logo
                    ? <img className="hp-wordmark-img" src={b.logo} alt={b.name} />
                    : <span>{b.name}</span>}
                </div>
              </div>
            );
          }
          if (b.type === "message") {
            return (
              <div className={"hp-bubble hp-msg hp-clickable" + (b.front ? " hp-front" : "")} key={i} data-speed={b.speed} style={style} onPointerDown={dragDown} onClick={() => { if (!arrange) setActive(b.label); }} role="button" tabIndex={0}>
                <div className="hp-bubble-inner" style={{ width: b.w, height: b.h }}>
                  <span className="hp-zoom" aria-hidden="true"><HPIcon name="expand" /></span>
                  <span className="hp-msg-ico"><HPIcon name={b.icon} /></span>
                  <strong className="hp-msg-title">{b.title}</strong>
                </div>
              </div>
            );
          }
          return null;
        })}

        <div className="hp-center">
          <h2 className="hp-h2">A plataforma com tudo que sua marca precisa <span className="hp-h2-accent">para escalar.</span></h2>
          <p className="hp-sub">Inicie ou escale suas vendas online com a mesma operação das grandes marcas. Tudo em um só lugar.</p>
          <div className="hp-ctas">
            <a href={URLS.demo} className="btn btn--primary">Agendar demo →</a>
            <a href={URLS.signup} className="btn btn--secondary">Comece agora</a>
          </div>
        </div>
      </div>

      <div className="hp-mobile">
        <div className="hpm-hero">
          <h2 className="hpm-h2">A plataforma com tudo que sua marca precisa <span className="hp-h2-accent">para escalar.</span></h2>
          <p className="hpm-sub">Inicie ou escale suas vendas online com a mesma operação das grandes marcas. Tudo em um só lugar.</p>
          <div className="hpm-ctas">
            <a href={URLS.demo} className="btn btn--primary">Agendar demo →</a>
            <a href={URLS.signup} className="btn btn--secondary">Comece agora</a>
          </div>
        </div>

        <div className="hpm-marquee">
          <div className="hpm-track">
            {[...MOB_LOGOS, ...MOB_LOGOS].map((l, i) => (
              <span className="hpm-logo" key={i}>
                {l.logo
                  ? <img src={l.logo} alt={l.name} />
                  : <span className="hpm-logo-txt">{l.name}</span>}
              </span>
            ))}
          </div>
        </div>

        <div className="hpm-explorer">
          <div className="hpm-tabs" role="tablist">
            {MOB_TABS.map((t, i) => (
              <button key={t.key} role="tab" aria-selected={mobTab === i}
                className={"hpm-tab" + (mobTab === i ? " is-active" : "")}
                onClick={() => selectTab(i)}>
                <HPIcon name={t.icon} />
                <span>{t.short}</span>
                {!tabTouched && i === 1 && (
                  <span className="hpm-poke" aria-hidden="true">
                    <span className="hpm-poke-ring"></span>
                    <svg className="hpm-poke-cursor" width="26" height="26" viewBox="0 0 24 24"><path d="M5 2.5 5.2 18.2 9 14.6 11.6 19.8 13.9 18.7 11.3 13.5 16.8 13.3z" fill="#fff" stroke="#111" strokeWidth="1.1" strokeLinejoin="round" /></svg>
                  </span>
                )}
              </button>
            ))}
          </div>
          <div className="hpm-panel" key={mobTab}>
            {DETAILS[MOB_TABS[mobTab].key].art
              ? <div className="hpm-panel-media hpm-panel-media--art">{DETAILS[MOB_TABS[mobTab].key].art}</div>
              : <div className="hpm-panel-media" style={{ backgroundImage: "url(" + DETAILS[MOB_TABS[mobTab].key].img + ")" }}></div>}
            <div className="hpm-panel-body">
              <h3 className="hpm-panel-title">{MOB_TABS[mobTab].title}</h3>
              <p className="hpm-panel-text">{DETAILS[MOB_TABS[mobTab].key].body}</p>
              <ul className="hpm-panel-list">
                {DETAILS[MOB_TABS[mobTab].key].bullets.map((b) => (
                  <li key={b}><span className="hpm-check">✓</span>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {active && DETAILS[active] && (
        <div className="hp-modal" onClick={() => setActive(null)}>
          <div className="hp-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="hp-modal-close" onClick={() => setActive(null)} aria-label="Fechar">✕</button>
            {DETAILS[active].art
              ? <div className="hp-modal-media hp-modal-media--art">{DETAILS[active].art}</div>
              : <div className="hp-modal-media" style={{ backgroundImage: "url(" + DETAILS[active].img + ")" }}></div>}
            <div className="hp-modal-body">
              <h3 className="hp-modal-title">{active}</h3>
              <p className="hp-modal-text">{DETAILS[active].body}</p>
              <ul className="hp-modal-list">
                {DETAILS[active].bullets.map((bt) => (
                  <li key={bt}><span className="hp-modal-check">✓</span>{bt}</li>
                ))}
              </ul>
              <div className="hp-modal-ctas">
                {DETAILS[active].href
                  ? <a href={DETAILS[active].href} className="btn btn--primary">Saiba mais →</a>
                  : <a href={URLS.demo} className="btn btn--primary">Agendar demo →</a>}
                <a href={URLS.signup} className="btn btn--secondary">Comece agora</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default HeroPreview;
