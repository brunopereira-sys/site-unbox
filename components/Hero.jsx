import React from 'react';
import { URLS, R } from '../lib/config';

function Hero({ variant = "split" }) {
  return (
    <section className={"hero" + (variant === "centered" ? " hero--centered" : "")} id="top">
      <div className="hero-aura hero-aura-1"></div>
      <div className="hero-aura hero-aura-2"></div>

      <div className="container hero-grid">
        <div className="hero-copy">
          <h1 className="h1 reveal" style={{ transitionDelay: "60ms" }}>
            E-commerce D2C<br />para marcas de<br /><em className="accent-em">Alto Crescimento</em>.
          </h1>
          <p className="lede reveal hero-sub" style={{ transitionDelay: "120ms" }}>
            A plataforma de e-commerce de <strong>alta conversão</strong> para iniciar ou escalar
            suas vendas online, com tudo em um só lugar.
          </p>
          <div className="hero-ctas reveal" style={{ transitionDelay: "180ms" }}>
            <a href={URLS.demo} className="btn btn--primary">Agendar demo →</a>
            <a href={URLS.signup} className="btn btn--secondary">Comece agora</a>
          </div>
          <div className="hero-badges reveal" style={{ transitionDelay: "240ms" }}>
            <span className="badge badge--turbo">⚡ TURBO Checkout</span>
            <span className="badge badge--nativo">Assinatura Nativa</span>
            <span className="badge badge--integrado">100% Integrado</span>
          </div>
          <ul className="hero-trust reveal" style={{ transitionDelay: "300ms" }}>
            {["Migração assistida gratuita", "Suporte humano via WhatsApp"].map((t) => (
              <li className="hero-trust-item" key={t}>
                <span className="hero-trust-check">
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l2.6 2.6L9 1" stroke="#00E5A0" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-visual reveal" style={{ transitionDelay: "200ms" }}>
          <div className="hero-glow"></div>
          <div className="hero-mock-frame">
            <div className="hero-mock-bar">
              <span className="dot" style={{ background: "#FF5F56" }}></span>
              <span className="dot" style={{ background: "#FFBD2E" }}></span>
              <span className="dot" style={{ background: "#27C93F" }}></span>
              <span className="hero-mock-url">admin.unbox.com.br</span>
            </div>
            <img src={R["print-menu"]} alt="Painel administrativo da Unbox" className="hero-mock-img" />
          </div>
          <div className="hero-float-stat">
            <span className="hero-float-num">+98%</span>
            <span className="hero-float-lbl">aprovação de<br />pagamentos</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
