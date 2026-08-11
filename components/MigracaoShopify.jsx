import React from 'react';
import Nav from './Nav';
import DemoModal from './DemoModal';
import { Footer, WhatsAppFloater } from './Closing';
import { FIcon, FeatGrid, useReveal } from './PageKit';
import { URLS } from '../lib/config';

const iBigCheck = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 4.5 4.5L19 7" /></svg>;
const iX = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>;
const iPlus = <svg className="vp-faq-ico" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>;
const arrow = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;

function Emph({ text }) {
  const parts = String(text).split(/\*\*(.+?)\*\*/g);
  return <React.Fragment>{parts.map((p, i) => (i % 2 === 1 ? <em className="accent-em" key={i}>{p}</em> : <React.Fragment key={i}>{p}</React.Fragment>))}</React.Fragment>;
}

function Head({ eyebrow, title, lede }) {
  return (
    <div className="crd-head reveal">
      {eyebrow ? <span className="crd-eyebrow">{eyebrow}</span> : null}
      <h2 className="crd-h2"><Emph text={title} /></h2>
      {lede ? <p className="crd-lede">{lede}</p> : null}
    </div>
  );
}

// ---- dados (adaptados do deck "vs Shopify" + narrativa shopnaofunciona) ----
const CAMBIO = [
  { label: "Mensalidade do plano", value: "US$ / mês" },
  { label: "Taxa por venda no gateway", value: "+ % em US$" },
  { label: "Cada app extra instalado", value: "US$ a mais" },
];
const CONVERSAO = [
  { icon: "globe", t: "Checkout gringo", d: "Pensado pro mercado de fora, não pro brasileiro." },
  { icon: "plug", t: "Pix de terceiro", d: "Pix e boleto dependem de app pra funcionar bem." },
  { icon: "card", t: "Sem parcelamento BR", d: "Parcelamento em real nunca foi prioridade deles." },
  { icon: "tag", t: "Carrinho abandonado", d: "Mais etapas e redirecionamentos = mais abandono." },
];
const APPS = [
  { label: "Assinatura / recorrência", value: "+ US$" },
  { label: "Upsell e order bump", value: "+ US$" },
  { label: "Checkout customizado", value: "+ US$" },
  { label: "Pix com baixa automática", value: "+ US$" },
];
const COMPARE = [
  "Cobrança em real",
  "Pix nativo, com baixa automática",
  "Checkout pensado pro Brasil",
  "Assinatura inclusa",
  "Upsell e order bump nativos",
  "Parcelamento em real",
  "Suporte em português",
];
const VIRADA = [
  { icon: "pin", t: "Feita no Brasil", d: "Pra quem vende, cobra e entrega no Brasil." },
  { icon: "zap", t: "Pix nativo", d: "Baixa automática, sem app de terceiro." },
  { icon: "wallet", t: "Preço em real", d: "Custo previsível, sem susto com o câmbio." },
  { icon: "layers", t: "Tudo incluso", d: "Assinatura, upsell e checkout, sem app pago." },
  { icon: "headset", t: "Suporte em português", d: "Gente de verdade, no seu fuso." },
  { icon: "truck", t: "Migração assistida", d: "Nosso time traz sua loja sem dor de cabeça." },
];
const BADIA = [
  { num: "+40", unit: "%", label: "de LTV médio", sub: "com assinatura nativa" },
  { num: "0", unit: "", label: "apps pagos", sub: "pro básico funcionar" },
  { num: "100", unit: "%", label: "em real", sub: "sem surpresa de câmbio" },
];
const NUMEROS = [
  { num: "690", unit: "%", label: "crescimento médio", sub: "de vendas no 1º ano" },
  { num: "4", unit: "×", label: "mais conversão", sub: "de 1,1% para até 4,2%" },
  { num: "+15", unit: " mil", label: "lojas ativas", sub: "na plataforma" },
  { num: "98", unit: "%", label: "de aprovação", sub: "nos pagamentos UnboxPay" },
];
const FAQ = [
  { q: "Vou perder vendas ou ranqueamento na migração?", a: "Não. A migração é assistida de ponta a ponta: preservamos URLs, SEO e histórico. Você troca de plataforma sem parar de vender." },
  { q: "Quanto tempo leva pra migrar do Shopify?", a: "Depende do tamanho do catálogo, mas a maioria das marcas migra em poucos dias. Nosso time cuida da parte técnica pra você." },
  { q: "Preciso de time técnico ou agência pra migrar?", a: "Não. A Unbox foi feita pra você operar crescimento, não ferramentas. A migração e a configuração são feitas com o nosso time." },
  { q: "E os apps que eu já pago no Shopify?", a: "A maior parte deles vira nativo na Unbox: assinatura, upsell, order bump, checkout customizado e Pix já vêm inclusos — sem conta de apps no fim do mês." },
  { q: "A Unbox tem Pix e parcelamento nativos?", a: "Sim. Pix com baixa automática, boleto e parcelamento em real são nativos e pensados pro consumidor brasileiro — sem depender de app de terceiro." },
  { q: "Como funciona o suporte?", a: "Suporte humano em português, no seu fuso, com consultoria de growth. Aqui alguém é responsável pelo seu resultado." },
];

function FaqItem({ q, a, open, onClick }) {
  return (
    <div className={"vp-faq-item" + (open ? " is-open" : "")}>
      <button className="vp-faq-q" onClick={onClick}>{q}{iPlus}</button>
      <div className="vp-faq-a"><p>{a}</p></div>
    </div>
  );
}

export default function MigracaoShopify() {
  useReveal();
  const [faqOpen, setFaqOpen] = React.useState(-1);

  return (
    <React.Fragment>
      <Nav />
      <main>
        {/* HERO */}
        <section className="car-hero">
          <div className="car-hero-aura"></div>
          <div className="container car-hero-grid">
            <div>
              <span className="vp-qualifier reveal">Migração · Shopify → Unbox</span>
              <h1 className="h1 reveal">O Shopify <em className="accent-em">não funciona</em> no Brasil.</h1>
              <p className="lede car-hero-lede reveal" style={{ transitionDelay: "120ms" }}>
                Custo em dólar, checkout que converte pouco e recurso básico pago à parte.
                Te contaram só metade da história — e isso está custando suas vendas.
              </p>
              <div className="car-hero-ctas reveal" style={{ transitionDelay: "180ms" }}>
                <a href={URLS.demo} className="btn btn--primary">Migrar pra Unbox {arrow}</a>
                <a href="#lado-a-lado" className="btn btn--secondary">Ver comparativo</a>
              </div>
            </div>
            <div className="vp-prob reveal" style={{ transitionDelay: "220ms" }}>
              <div className="vp-prob-head"><span className="vp-prob-dot"></span>Sua conta no Shopify</div>
              <div className="vp-prob-row"><span className="vp-prob-label">Mensalidade do plano</span><span className="vp-prob-val is-bad">US$ / mês</span></div>
              <div className="vp-prob-row"><span className="vp-prob-label">Taxa de gateway</span><span className="vp-prob-val is-bad">+ % em US$</span></div>
              <div className="vp-prob-row"><span className="vp-prob-label">Apps pro básico</span><span className="vp-prob-val is-bad">+ US$</span></div>
              <div className="vp-prob-row"><span className="vp-prob-label">Exposição ao câmbio</span><span className="vp-prob-val is-bad">100%</span></div>
            </div>
          </div>
        </section>

        {/* PROBLEMA 01 — CÂMBIO */}
        <section className="crd-section crd-alt">
          <div className="container">
            <Head eyebrow="Problema 01 — Câmbio" title="Você fatura em real. Eles cobram em **dólar**." lede="Toda alta do dólar vira aumento de custo — sem você vender nada a mais." />
            <div className="vp-conta reveal">
              {CAMBIO.map((r) => (
                <div className="vp-conta-row" key={r.label}>
                  <span className="vp-conta-label">{r.label}</span>
                  <span className="vp-conta-val">{r.value}</span>
                </div>
              ))}
            </div>
            <div className="vp-conta-total reveal">
              <span className="lbl">Exposição ao câmbio</span>
              <span className="val">100%</span>
            </div>
            <p className="vp-conta-note reveal">Na Unbox, **cobrança 100% em real** — custo previsível, sem susto no fim do mês.</p>
          </div>
        </section>

        {/* PROBLEMA 02 — CONVERSÃO */}
        <section className="crd-section">
          <div className="container">
            <Head eyebrow="Problema 02 — Conversão" title="Um checkout gringo **converte menos** aqui." lede="Menos conversão é dinheiro deixado na mesa todo dia." />
            <FeatGrid items={CONVERSAO} four />
          </div>
        </section>

        {/* PROBLEMA 03 — APPS PAGOS */}
        <section className="crd-section crd-alt">
          <div className="container">
            <Head eyebrow="Problema 03 — Apps pagos" title="O básico vem **por fora** — e cobrado." lede="No fim do mês, a conta de apps passa da mensalidade do plano." />
            <div className="vp-conta reveal">
              {APPS.map((r) => (
                <div className="vp-conta-row" key={r.label}>
                  <span className="vp-conta-label">{r.label}</span>
                  <span className="vp-conta-val">{r.value}</span>
                </div>
              ))}
            </div>
            <p className="vp-conta-note reveal">Na Unbox, **tudo isso já vem incluso** — sem app de terceiro, sem cobrança extra.</p>
          </div>
        </section>

        {/* LADO A LADO */}
        <section className="crd-section" id="lado-a-lado">
          <div className="container">
            <Head title="A diferença **na real**." lede="O mesmo recurso, dois caminhos bem diferentes." />
            <div className="vp-compare reveal">
              <div className="vp-compare-row vp-compare-head">
                <div className="vp-c-label">Recurso</div>
                <div className="vp-c-a">Shopify</div>
                <div className="vp-c-b">Unbox</div>
              </div>
              {COMPARE.map((label) => (
                <div className="vp-compare-row" key={label}>
                  <div className="vp-c-label">{label}</div>
                  <div className="vp-c-a vp-x">{iX}</div>
                  <div className="vp-c-b vp-ok">{iBigCheck}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* A VIRADA */}
        <section className="crd-section crd-alt">
          <div className="container">
            <Head eyebrow="A virada" title="A Unbox foi feita **pra vender no Brasil**." />
            <FeatGrid items={VIRADA} four />
          </div>
        </section>

        {/* PROVA REAL — BADIA */}
        <section className="crd-section">
          <div className="container">
            <Head eyebrow="Prova real" title="No Brasil, **marcas globais** escolhem a Unbox." lede="badia.com.br — loja real rodando na Unbox." />
            <div className="vp-stats">
              {BADIA.map((s, i) => (
                <div className="vp-stat reveal" key={s.label} style={{ transitionDelay: i * 70 + "ms" }}>
                  <div className="vp-stat-num">{s.num}<span className="u">{s.unit}</span></div>
                  <div className="vp-stat-lbl">{s.label}</div>
                  <div className="vp-stat-sub">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NÚMEROS DA UNBOX */}
        <section className="crd-section crd-alt">
          <div className="container">
            <Head eyebrow="Resultados reais" title="Números de quem já **trocou** o Shopify." />
            <div className="vp-stats" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
              {NUMEROS.map((s, i) => (
                <div className="vp-stat reveal" key={s.label} style={{ transitionDelay: i * 70 + "ms" }}>
                  <div className="vp-stat-num">{s.num}<span className="u">{s.unit}</span></div>
                  <div className="vp-stat-lbl">{s.label}</div>
                  <div className="vp-stat-sub">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="crd-section">
          <div className="container">
            <Head eyebrow="Migração" title="Tudo que você precisa saber pra **trocar de plataforma**." />
            <div className="vp-faq reveal">
              {FAQ.map((f, i) => (
                <FaqItem key={i} q={f.q} a={f.a} open={faqOpen === i} onClick={() => setFaqOpen(faqOpen === i ? -1 : i)} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="final-cta">
          <div className="container">
            <div className="final-banner reveal">
              <div className="final-banner-aura"></div>
              <div className="final-banner-text">
                <h2 className="final-banner-h2">Cansou de pagar em <em>dólar</em>?</h2>
                <p className="final-banner-sub">A migração é mais simples do que parece. Cobrança em real · Pix nativo · tudo incluso · migração assistida.</p>
              </div>
              <div className="final-banner-btns">
                <a href={URLS.demo} className="btn btn--primary">Migrar pra Unbox →</a>
                <a href={URLS.whatsapp} target="_blank" rel="noreferrer" className="btn btn--secondary">Chamar no Whats</a>
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
