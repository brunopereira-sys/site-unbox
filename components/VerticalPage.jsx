import React from 'react';
import Nav from './Nav';
import DemoModal from './DemoModal';
import { Footer, WhatsAppFloater } from './Closing';
import { FIcon, FeatGrid, useReveal } from './PageKit';
import { URLS } from '../lib/config';

const arrow = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

// Destaca **trechos** com <em class="accent-em"> sem usar dangerouslySetInnerHTML.
function Emph({ text }) {
  const parts = String(text).split(/\*\*(.+?)\*\*/g);
  return (
    <React.Fragment>
      {parts.map((p, i) => (i % 2 === 1 ? <em className="accent-em" key={i}>{p}</em> : <React.Fragment key={i}>{p}</React.Fragment>))}
    </React.Fragment>
  );
}

function VertHero({ hero }) {
  return (
    <section className="car-hero">
      <div className="car-hero-aura"></div>
      <div className="container car-hero-grid">
        <div>
          {hero.badge ? <span className="fpage-hero-badge reveal">{hero.badge}</span> : null}
          <h1 className="h1 reveal"><Emph text={hero.title} /></h1>
          <p className="lede car-hero-lede reveal" style={{ transitionDelay: "120ms" }}>{hero.lede}</p>
          <div className="car-hero-ctas reveal" style={{ transitionDelay: "180ms" }}>
            <a href={URLS.demo} className="btn btn--primary">Agendar demo {arrow}</a>
            <a href={URLS.whatsapp} target="_blank" rel="noreferrer" className="btn btn--secondary">Falar no WhatsApp</a>
          </div>
        </div>
        {hero.stats && hero.stats.length ? (
          <div className="car-hero-panel reveal" style={{ transitionDelay: "220ms" }}>
            {hero.stats.map((s) => (
              <div className="car-stat" key={s.label}>
                <div className="car-stat-num">{s.num}<em>{s.unit}</em></div>
                <div className="car-stat-lbl">{s.label}</div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function VertDores({ dores }) {
  return (
    <section className="crd-section crd-alt">
      <div className="container">
        <div className="crd-head reveal">
          {dores.eyebrow ? <span className="crd-eyebrow">{dores.eyebrow}</span> : null}
          <h2 className="crd-h2"><Emph text={dores.title} /></h2>
          {dores.lede ? <p className="crd-lede">{dores.lede}</p> : null}
        </div>
        <FeatGrid items={dores.items} four />
      </div>
    </section>
  );
}

function VertPilares({ pilares }) {
  return (
    <section className="crd-section">
      <div className="container">
        <div className="crd-head reveal">
          {pilares.eyebrow ? <span className="crd-eyebrow">{pilares.eyebrow}</span> : null}
          <h2 className="crd-h2"><Emph text={pilares.title} /></h2>
          {pilares.lede ? <p className="crd-lede">{pilares.lede}</p> : null}
        </div>
        <FeatGrid items={pilares.items} four />
      </div>
    </section>
  );
}

function VertCategorias({ categorias }) {
  return (
    <section className="crd-section crd-alt">
      <div className="container">
        <div className="crd-head reveal">
          {categorias.eyebrow ? <span className="crd-eyebrow">{categorias.eyebrow}</span> : null}
          <h2 className="crd-h2"><Emph text={categorias.title} /></h2>
          {categorias.lede ? <p className="crd-lede">{categorias.lede}</p> : null}
        </div>
        <div className="ind-cats">
          {categorias.items.map((c, i) => (
            <div className="ind-cat reveal" key={c.name} style={{ transitionDelay: i * 60 + "ms" }}>
              <div className="ind-cat-ico"><FIcon name={c.icon} /></div>
              <h3>{c.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function VertComo({ como }) {
  return (
    <section className="crd-section" id="como-funciona">
      <div className="container">
        <div className="crd-head reveal">
          {como.eyebrow ? <span className="crd-eyebrow">{como.eyebrow}</span> : null}
          <h2 className="crd-h2"><Emph text={como.title} /></h2>
        </div>
        <div className="crd-grid4">
          {como.steps.map((s, i) => (
            <div className="crd-step reveal" key={s.title} style={{ transitionDelay: i * 70 + "ms" }}>
              <span className="crd-step-num">{i + 1}</span>
              <div className="crd-step-ico"><FIcon name={s.icon} /></div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function VertMetrics({ metrics }) {
  return (
    <section className="crd-section crd-alt">
      <div className="container">
        <div className="crd-head reveal">
          <span className="crd-eyebrow">Ecossistema Unbox</span>
          <h2 className="crd-h2">Números de quem já vende com a gente</h2>
          <p className="crd-lede">E-commerce + Pagamentos + Assinatura + Crédito, tudo integrado para marcas D2C.</p>
        </div>
        <div className="crd-stats-grid">
          {metrics.map((s, i) => (
            <div className="crd-stat reveal" key={s.label} style={{ transitionDelay: i * 70 + "ms" }}>
              {s.icon ? <span className="ico"><FIcon name={s.icon} /></span> : null}
              <div>
                <p className="num">{s.num}<span className="metric-unit">{s.unit}</span></p>
                <p className="lbl">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function VertCTA({ cta }) {
  return (
    <section className="final-cta">
      <div className="container">
        <div className="final-banner reveal">
          <div className="final-banner-aura"></div>
          <div className="final-banner-text">
            <h2 className="final-banner-h2"><Emph text={cta.title} /></h2>
            {cta.sub ? <p className="final-banner-sub">{cta.sub}</p> : null}
          </div>
          <div className="final-banner-btns">
            <a href={URLS.demo} className="btn btn--primary">Agendar demo →</a>
            <a href={URLS.whatsapp} target="_blank" rel="noreferrer" className="btn btn--secondary">Chamar no Whats</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function VerticalPage({ data }) {
  useReveal();
  if (!data) return null;
  return (
    <React.Fragment>
      <Nav />
      <main>
        <VertHero hero={data.hero} />
        {data.dores ? <VertDores dores={data.dores} /> : null}
        {data.pilares ? <VertPilares pilares={data.pilares} /> : null}
        {data.categorias ? <VertCategorias categorias={data.categorias} /> : null}
        {data.como ? <VertComo como={data.como} /> : null}
        {data.metrics && data.metrics.length ? <VertMetrics metrics={data.metrics} /> : null}
        {data.cta ? <VertCTA cta={data.cta} /> : null}
      </main>
      <Footer />
      <WhatsAppFloater />
      <DemoModal />
    </React.Fragment>
  );
}
