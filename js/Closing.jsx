// Closing.jsx, métricas, CTA final, WhatsApp e footer

const METRICS = [
  { num: "+15", unit: " mil", lbl: "lojas já cadastradas na Unbox" },
  { num: "+5,9", unit: "×", lbl: "crescimento médio de vendas" },
  { num: "4", unit: "×", lbl: "mais conversão no seu site" },
  { num: "98", unit: "%", lbl: "de aprovação UnboxPay" },
];

function Metrics() {
  return (
    <section className="metrics">
      <div className="container metrics-grid">
        {METRICS.map((m, i) => (
          <div className="metric-cell reveal" key={i} style={{ transitionDelay: i * 70 + "ms" }}>
            <div className="metric-num">{m.num}<span className="metric-unit">{m.unit}</span></div>
            <div className="metric-lbl">{m.lbl}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
window.Metrics = Metrics;

function FinalCTA() {
  return (
    <section className="final-cta" id="cta">
      <div className="container">
        <div className="final-banner reveal">
          <div className="final-banner-aura"></div>
          <div className="final-banner-text">
            <h2 className="final-banner-h2">Vamos dar o <em>primeiro passo</em>?</h2>
            <p className="final-banner-sub">Migração assistida · Suporte humano</p>
          </div>
          <div className="final-banner-btns">
            <a href={window.UNBOX_URLS.demo} className="btn btn--primary">Agendar demo →</a>
            <a href={window.UNBOX_URLS.whatsapp} target="_blank" rel="noreferrer" className="btn btn--secondary">Chamar no Whats</a>
          </div>
        </div>
      </div>
    </section>
  );
}
window.FinalCTA = FinalCTA;

const FOOTER_COLS = [
  { h: "Unbox", items: [["Como funciona?", "#plataforma"], ["Recursos", "Unbox - Features.html"], ["Blog Venda Mais!", "#"], ["Carreiras", "#"]] },
  { h: "Produto", items: [["Turbo Checkout", "Unbox - Checkout.html"], ["Crédito UnboxPay", "Unbox - Credito.html"], ["Para indústrias", "Unbox - Industrias.html"], ["Assinatura", "Unbox - Assinatura.html"], ["Creators", "Unbox - Creators.html"]] },
  { h: "Ajuda", items: [["Perguntas frequentes", "#"], ["Central de ajuda", "https://intercom.help/unbox-central-ajuda/pt-BR/"], ["Termos de uso", "#"], ["Privacidade", "#"]] },
];

const SOCIAL = [
  { src: window.__resources["instagram"], href: "https://www.instagram.com/unbox.online/", label: "Instagram" },
  { src: window.__resources["youtube"], href: "https://www.youtube.com/channel/UCjq_9OlLGMdStIGUIDkdj7Q/about", label: "YouTube" },
  { src: window.__resources["facebook"], href: "https://www.facebook.com/minhaunbox", label: "Facebook" },
  { src: window.__resources["linkedin"], href: "https://www.linkedin.com/company/unboxplus/", label: "LinkedIn" },
];

function Footer() {
  const homeBase = (typeof window !== "undefined" && window.UNBOX_HOME) || "";
  const fHref = (h) => (h && h.charAt(0) === "#" ? homeBase + h : h);
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src={window.__resources["logo-navbar"]} alt="Unbox" className="footer-logo" />
            <p className="footer-tagline">
              Plataforma de Alto Crescimento para marcas D2C.
              Tudo em um só lugar.
            </p>
            <div className="footer-social">
              {SOCIAL.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="footer-social-link">
                  <img src={s.src} alt={s.label} />
                </a>
              ))}
            </div>
          </div>
          {FOOTER_COLS.map((c) => (
            <div className="footer-col" key={c.h}>
              <h4 className="footer-heading">{c.h}</h4>
              <ul className="footer-list">
                {c.items.map((it) => (
                  <li key={it[0]}><a href={fHref(it[1])} className="footer-link">{it[0]}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-legal">
          <p>A UnboxPay, marca da UNBOX TECNOLOGIA DA INFORMAÇÃO LTDA - CNPJ: 33.840.057/0001-58, não é banco, instituição financeira, instituição de pagamento, operadora de cartões de crédito, nem integrante de arranjos de pagamento (adquirente ou subadquirente). A UnboxPay, por meio da plataforma Unbox, oferece soluções tecnológicas e de integração, incluindo checkout e orquestração de serviços financeiros exclusivamente por meio de parceiros terceiros devidamente autorizados.</p>
          <p>A UnboxPay não solicita qualquer tipo de depósito, pagamento ou valor antecipado para análise cadastral ou aprovação de proposta comercial. Em caso de dúvidas, entre em contato exclusivamente pelos nossos canais oficiais: <a href="mailto:ola@unbox.com.br">ola@unbox.com.br</a></p>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Unbox · unbox.com.br</span>
          <span>São Paulo · Brasil</span>
        </div>
      </div>
    </footer>
  );
}
window.Footer = Footer;

function WhatsAppFloater() {
  const onClick = (e) => {
    const url = window.UNBOX_URLS.whatsapp;
    const w = window.open(url, "_blank", "noopener,noreferrer");
    // Se o popup for bloqueado (ex.: dentro do preview), navega na própria aba.
    if (!w) { e.preventDefault(); window.top.location.href = url; }
  };
  return (
    <a href={window.UNBOX_URLS.whatsapp} onClick={onClick} target="_blank" rel="noreferrer" aria-label="Fale no WhatsApp" className="wa-floater">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="#0D0D0D">
        <path d="M17.5 14.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.1-.7.2-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.5-.9-.7-1.4-1.7-1.6-1.9-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.6-1.5-.9-2.1-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .2.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.4zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.4 5L2 22l5-1.4c1.5.8 3.2 1.3 5 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
      </svg>
    </a>
  );
}
window.WhatsAppFloater = WhatsAppFloater;
