import React from 'react';
import Nav from './Nav';
import DemoModal from './DemoModal';
import { Footer, WhatsAppFloater } from './Closing';
import { FIcon, FeatGrid, useReveal } from './PageKit';
import { URLS } from '../lib/config';

const arrow = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
const iCheck = <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 4.5 4.5L19 7" /></svg>;
const iBigCheck = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 4.5 4.5L19 7" /></svg>;
const iX = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>;

// Destaca **trechos** com <em class="accent-em"> sem dangerouslySetInnerHTML.
function Emph({ text }) {
  const parts = String(text).split(/\*\*(.+?)\*\*/g);
  return <React.Fragment>{parts.map((p, i) => (i % 2 === 1 ? <em className="accent-em" key={i}>{p}</em> : <React.Fragment key={i}>{p}</React.Fragment>))}</React.Fragment>;
}

function Head({ eyebrow, title, lede, center }) {
  return (
    <div className={"crd-head reveal" + (center ? "" : "")}>
      {eyebrow ? <span className="crd-eyebrow">{eyebrow}</span> : null}
      <h2 className="crd-h2"><Emph text={title} /></h2>
      {lede ? <p className="crd-lede">{lede}</p> : null}
    </div>
  );
}

function CtaRow({ primaryLabel }) {
  return (
    <div className="car-hero-ctas reveal" style={{ transitionDelay: "180ms" }}>
      <a href={URLS.demo} className="btn btn--primary">{primaryLabel || "Agendar demo"} {arrow}</a>
      <a href={URLS.whatsapp} target="_blank" rel="noreferrer" className="btn btn--secondary">Falar no WhatsApp</a>
    </div>
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
          {hero.chips && hero.chips.length ? (
            <div className="vp-chips reveal" style={{ transitionDelay: "150ms" }}>
              {hero.chips.map((c) => <span className="vp-chip" key={c}>{iCheck}{c}</span>)}
            </div>
          ) : null}
          <CtaRow primaryLabel={hero.cta} />
        </div>
        {hero.problema ? (
          <div className="vp-prob reveal" style={{ transitionDelay: "220ms" }}>
            <div className="vp-prob-head"><span className="vp-prob-dot"></span>{hero.problema.title}</div>
            {hero.problema.rows.map((r) => (
              <div className="vp-prob-row" key={r.label}>
                <span className="vp-prob-label">{r.label}</span>
                <span className={"vp-prob-val" + (r.bad ? " is-bad" : "")}>{r.value}</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function VertFamiliar({ familiar }) {
  return (
    <section className="crd-section crd-alt">
      <div className="container">
        <Head title={familiar.title} lede={familiar.sub} />
        <div className="vp-familiar-grid">
          {familiar.items.map((it, i) => (
            <div className="vp-quote reveal" key={i} style={{ transitionDelay: (i % 2) * 60 + "ms" }}>
              <span className="vp-quote-ico"><FIcon name={it.icon} size={22} /></span>
              <p>“<Emph text={it.quote} />”</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function VertConta({ conta }) {
  return (
    <section className="crd-section">
      <div className="container">
        <Head eyebrow={conta.eyebrow} title={conta.title} lede={conta.sub} />
        <div className="vp-conta reveal">
          {conta.rows.map((r) => (
            <div className="vp-conta-row" key={r.label}>
              <span className="vp-conta-label">{r.label}</span>
              <span className="vp-conta-val">{r.value}</span>
            </div>
          ))}
        </div>
        {conta.total ? (
          <div className="vp-conta-total reveal">
            <span className="lbl">{conta.total.label}</span>
            <span className="val">{conta.total.value}</span>
          </div>
        ) : null}
        {conta.note ? <p className="vp-conta-note reveal"><Emph text={conta.note} /></p> : null}
      </div>
    </section>
  );
}

function VertSolucao({ solucao }) {
  return (
    <section className="crd-section crd-alt">
      <div className="container">
        <Head eyebrow={solucao.eyebrow} title={solucao.title} lede={solucao.lede} />
        <FeatGrid items={solucao.items} four />
      </div>
    </section>
  );
}

function VertCategorias({ categorias }) {
  return (
    <section className="crd-section">
      <div className="container">
        <Head eyebrow={categorias.eyebrow} title={categorias.title} lede={categorias.lede} />
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

function VertProva({ prova }) {
  return (
    <section className="crd-section crd-alt">
      <div className="container">
        <Head eyebrow={prova.eyebrow} title={prova.title} lede={prova.lede} />
        <div className="vp-stats">
          {prova.stats.map((s, i) => (
            <div className="vp-stat reveal" key={s.label} style={{ transitionDelay: i * 70 + "ms" }}>
              <div className="vp-stat-num">{s.num}<span className="u">{s.unit}</span></div>
              <div className="vp-stat-lbl">{s.label}</div>
              {s.sub ? <div className="vp-stat-sub">{s.sub}</div> : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function VertComparativo({ comparativo }) {
  return (
    <section className="crd-section">
      <div className="container">
        <Head title={comparativo.title} lede={comparativo.sub} />
        <div className="vp-compare reveal">
          <div className="vp-compare-row vp-compare-head">
            <div className="vp-c-label">{comparativo.caption || "Recurso"}</div>
            <div className="vp-c-a">{comparativo.colA}</div>
            <div className="vp-c-b">{comparativo.colB}</div>
          </div>
          {comparativo.rows.map((r) => (
            <div className="vp-compare-row" key={r.label}>
              <div className="vp-c-label">{r.label}</div>
              <div className={"vp-c-a " + (r.a ? "vp-ok" : "vp-x")}>{r.a ? iBigCheck : iX}</div>
              <div className={"vp-c-b " + (r.b ? "vp-ok" : "vp-x")}>{r.b ? iBigCheck : iX}</div>
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
        {data.familiar ? <VertFamiliar familiar={data.familiar} /> : null}
        {data.conta ? <VertConta conta={data.conta} /> : null}
        {data.solucao ? <VertSolucao solucao={data.solucao} /> : null}
        {data.categorias ? <VertCategorias categorias={data.categorias} /> : null}
        {data.prova ? <VertProva prova={data.prova} /> : null}
        {data.comparativo ? <VertComparativo comparativo={data.comparativo} /> : null}
        {data.cta ? <VertCTA cta={data.cta} /> : null}
      </main>
      <Footer />
      <WhatsAppFloater />
      <DemoModal />
    </React.Fragment>
  );
}
