import React from 'react';
import Nav from './Nav';
import DemoModal from './DemoModal';
import LeadForm from './LeadForm';
import { Footer, WhatsAppFloater } from './Closing';
import { FIcon, FeatGrid, useReveal } from './PageKit';
import { URLS } from '../lib/config';

const iCheck = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 4.5 4.5L19 7" /></svg>;
const iBigCheck = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 4.5 4.5L19 7" /></svg>;
const iX = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>;
const iPlus = <svg className="vp-faq-ico" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>;

// Destaca **trechos** com <em class="accent-em"> sem dangerouslySetInnerHTML.
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

function VertHero({ hero }) {
  return (
    <section className="car-hero">
      <div className="car-hero-aura"></div>
      <div className="container car-hero-grid">
        <div>
          {hero.qualifier ? <span className="vp-qualifier reveal">{hero.qualifier}</span> : null}
          {hero.badge ? <span className="fpage-hero-badge reveal">{hero.badge}</span> : null}
          <h1 className="h1 reveal"><Emph text={hero.title} /></h1>
          <p className="lede car-hero-lede reveal" style={{ transitionDelay: "120ms" }}>{hero.lede}</p>
          {hero.benefits && hero.benefits.length ? (
            <ul className="vp-benefits reveal" style={{ transitionDelay: "150ms" }}>
              {hero.benefits.map((b) => <li key={b}>{iCheck}<span><Emph text={b} /></span></li>)}
            </ul>
          ) : null}
          {!hero.form ? (
            <div className="car-hero-ctas reveal" style={{ transitionDelay: "180ms" }}>
              <a href={URLS.demo} className="btn btn--primary">{hero.cta || "Agendar demo"} →</a>
              <a href={URLS.whatsapp} target="_blank" rel="noreferrer" className="btn btn--secondary">Falar no WhatsApp</a>
            </div>
          ) : null}
        </div>
        {hero.form ? (
          <div className="reveal" style={{ transitionDelay: "220ms" }} id="form">
            <LeadForm title={hero.form.title} sub={hero.form.sub} button={hero.form.button} note={hero.form.note} />
          </div>
        ) : hero.problema ? (
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

function VertDepoimentos({ depoimentos }) {
  return (
    <section className="crd-section" id="depoimentos">
      <div className="container">
        <Head eyebrow={depoimentos.eyebrow} title={depoimentos.title} lede={depoimentos.lede} />
        <div className="vp-depo-grid">
          {depoimentos.items.map((d, i) => (
            <div className="vp-depo reveal" key={i} style={{ transitionDelay: (i % 3) * 70 + "ms" }}>
              {d.placeholder ? <span className="vp-depo-tag">exemplo</span> : null}
              {d.metric ? <div className="vp-depo-metric">{d.metric}</div> : null}
              <p className="vp-depo-quote">“{d.quote}”</p>
              <div className="vp-depo-by">
                <span className="vp-depo-avatar">{(d.name || "?").charAt(0)}</span>
                <div>
                  <div className="vp-depo-name">{d.name}</div>
                  <div className="vp-depo-role">{d.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function VertFamiliar({ familiar }) {
  return (
    <section className="crd-section crd-alt" id="problemas">
      <div className="container">
        <Head eyebrow={familiar.eyebrow} title={familiar.title} lede={familiar.sub} />
        <div className="vp-familiar-grid">
          {familiar.items.map((it, i) => (
            <div className="vp-quote reveal" key={i} style={{ transitionDelay: (i % 2) * 60 + "ms" }}>
              <span className="vp-quote-ico"><FIcon name={it.icon} size={22} /></span>
              <p>{it.title ? <strong style={{ display: "block", marginBottom: 6 }}>{it.title}</strong> : null}<Emph text={it.quote} /></p>
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

function VertCapacidades({ capacidades }) {
  return (
    <section className="crd-section crd-alt" id="o-que-faz">
      <div className="container">
        <Head eyebrow={capacidades.eyebrow} title={capacidades.title} lede={capacidades.lede} />
        <FeatGrid items={capacidades.items} four />
      </div>
    </section>
  );
}

function VertMetrics({ metrics }) {
  return (
    <section className="crd-section">
      <div className="container">
        <Head eyebrow={metrics.eyebrow} title={metrics.title} lede={metrics.lede} />
        <div className="vp-stats">
          {metrics.items.map((s, i) => (
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

function VertFaq({ faq }) {
  const [open, setOpen] = React.useState(-1);
  return (
    <section className="crd-section crd-alt" id="faq">
      <div className="container">
        <Head eyebrow={faq.eyebrow} title={faq.title} />
        <div className="vp-faq reveal">
          {faq.items.map((it, i) => (
            <div className={"vp-faq-item" + (open === i ? " is-open" : "")} key={i}>
              <button className="vp-faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                <span>{it.q}</span>{iPlus}
              </button>
              <div className="vp-faq-a"><p>{it.a}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function VertCTA({ cta }) {
  return (
    <section className="final-cta" id="cta">
      <div className="container">
        <div className="final-banner reveal">
          <div className="final-banner-aura"></div>
          <div className="final-banner-text">
            <h2 className="final-banner-h2"><Emph text={cta.title} /></h2>
            {cta.sub ? <p className="final-banner-sub">{cta.sub}</p> : null}
          </div>
          <div className="final-banner-btns">
            <a href={cta.anchor || URLS.demo} className="btn btn--primary">{cta.button || "Agendar demo"} →</a>
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
        {data.depoimentos ? <VertDepoimentos depoimentos={data.depoimentos} /> : null}
        {data.familiar ? <VertFamiliar familiar={data.familiar} /> : null}
        {data.comparativo ? <VertComparativo comparativo={data.comparativo} /> : null}
        {data.capacidades ? <VertCapacidades capacidades={data.capacidades} /> : null}
        {data.metrics ? <VertMetrics metrics={data.metrics} /> : null}
        {data.faq ? <VertFaq faq={data.faq} /> : null}
        {data.cta ? <VertCTA cta={data.cta} /> : null}
      </main>
      <Footer />
      <WhatsAppFloater />
      <DemoModal />
    </React.Fragment>
  );
}
