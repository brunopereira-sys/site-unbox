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
const iArrowR = <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
const iDown = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7" /></svg>;

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
          {hero.badge ? <span className="fpage-hero-badge reveal">{hero.badge}</span> : null}
          <h1 className="h1 reveal"><Emph text={hero.title} /></h1>
          <p className="lede car-hero-lede reveal" style={{ transitionDelay: "120ms" }}>{hero.lede}</p>
          {hero.chips && hero.chips.length ? (
            <div className="vp-chips reveal" style={{ transitionDelay: "150ms" }}>
              {hero.chips.map((c) => <span className="vp-chip" key={c}>{iCheck}{c}</span>)}
            </div>
          ) : null}
          <div className="car-hero-ctas reveal" style={{ transitionDelay: "180ms" }}>
            <a href={URLS.demo} className="btn btn--primary">{hero.cta || "Agendar demo"} {arrow}</a>
            <a href={URLS.whatsapp} target="_blank" rel="noreferrer" className="btn btn--secondary">Falar no WhatsApp</a>
          </div>
          <div className="reveal" style={{ transitionDelay: "210ms" }}>
            <a href="#como-funciona" className="vp-hero-alt">ou veja como funciona {iDown}</a>
          </div>
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

function VertEspecializacao({ especializacao }) {
  return (
    <section className="crd-section">
      <div className="container">
        <Head title={especializacao.title} lede={especializacao.lede} />
        <div className="vp-spec">
          {especializacao.items.map((c, i) => (
            <div className="vp-spec-card reveal" key={c.t} style={{ transitionDelay: i * 70 + "ms" }}>
              <span className="vp-spec-ico"><FIcon name={c.icon} size={26} /></span>
              <h3>{c.t}</h3>
              <p>{c.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function VertPassos({ passos }) {
  return (
    <section className="crd-section crd-alt" id="como-funciona">
      <div className="container">
        <Head eyebrow={passos.eyebrow} title={passos.title} lede={passos.sub} />
        <div className="crd-grid4" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          {passos.steps.map((s, i) => (
            <div className="crd-step reveal" key={s.t} style={{ transitionDelay: i * 70 + "ms" }}>
              <span className="crd-step-num">{i + 1}</span>
              <div className="crd-step-ico"><FIcon name={s.icon} /></div>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function VertMecanismo({ mecanismo }) {
  const m = mecanismo;
  return (
    <section className="crd-section">
      <div className="container">
        <Head eyebrow={m.eyebrow} title={m.title} />
        <div className="vp-mech reveal">
          {m.body ? <p className="vp-mech-body"><Emph text={m.body} /></p> : null}
          <div className="vp-mech-compare">
            <div className="vp-mech-box">
              <div className="v">{m.from.value}</div>
              <div className="l">{m.from.label}</div>
            </div>
            <span className="vp-mech-arrow">{iArrowR}</span>
            <div className="vp-mech-box is-hi">
              <div className="v">{m.to.value}</div>
              <div className="l">{m.to.label}</div>
            </div>
          </div>
          {m.note ? <p className="vp-mech-note"><Emph text={m.note} /></p> : null}
        </div>
      </div>
    </section>
  );
}

function VertMetrics({ metrics }) {
  return (
    <section className="crd-section crd-alt">
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

function VertIntegracoes({ integracoes }) {
  return (
    <section className="crd-section">
      <div className="container">
        <Head eyebrow={integracoes.eyebrow} title={integracoes.title} lede={integracoes.lede} />
        <div className="vp-integra">
          {integracoes.groups.map((g, i) => (
            <div className="vp-integra-card reveal" key={g.title} style={{ transitionDelay: i * 70 + "ms" }}>
              <h3><FIcon name={g.icon} size={18} />{g.title}</h3>
              <div className="vp-integra-chips">
                {g.items.map((it) => <span className="vp-integra-chip" key={it}>{it}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function VertCapacidades({ capacidades }) {
  return (
    <section className="crd-section crd-alt">
      <div className="container">
        <Head eyebrow={capacidades.eyebrow} title={capacidades.title} lede={capacidades.lede} />
        <FeatGrid items={capacidades.items} four />
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
            <a href={URLS.demo} className="btn btn--primary">{cta.button || "Agendar demo"} →</a>
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
        {data.especializacao ? <VertEspecializacao especializacao={data.especializacao} /> : null}
        {data.passos ? <VertPassos passos={data.passos} /> : null}
        {data.mecanismo ? <VertMecanismo mecanismo={data.mecanismo} /> : null}
        {data.metrics ? <VertMetrics metrics={data.metrics} /> : null}
        {data.integracoes ? <VertIntegracoes integracoes={data.integracoes} /> : null}
        {data.capacidades ? <VertCapacidades capacidades={data.capacidades} /> : null}
        {data.cta ? <VertCTA cta={data.cta} /> : null}
      </main>
      <Footer />
      <WhatsAppFloater />
      <DemoModal />
    </React.Fragment>
  );
}
