import React from 'react';
import Nav from './Nav';
import { FIcon, FeatGrid, useReveal } from './PageKit';
import { FinalCTA, Footer, WhatsAppFloater } from './Closing';
import DemoModal from './DemoModal';
import { URLS } from '../lib/config';

const BENEFITS = [
  { icon: "globe", t: "Empresa remota", d: "Trabalhe de onde você for mais feliz e produtivo, com um time distribuído por todo o Brasil." },
  { icon: "shield", t: "Plano de saúde", d: "Cuidamos de você: plano de saúde para cuidar do que mais importa." },
  { icon: "users", t: "Ambiente diverso", d: "Um time plural, onde cada pessoa pode ser quem é de verdade." },
  { icon: "gauge", t: "Wellhub (Gympass)", d: "Acesso a milhares de academias e apps de bem-estar para a sua saúde física e mental." },
  { icon: "clock", t: "Flexibilidade de horários", d: "Autonomia para organizar o seu dia em torno do que gera mais resultado." },
  { icon: "bolt", t: "Crescimento acelerado", d: "Uma empresa que cresce rápido abre espaço para você crescer junto." },
];

function JobsSection({ jobs }) {
  if (jobs.length) {
    return (
      <div className="jobs-list">
        {jobs.map((j, i) => (
          <a key={j.slug || i} className="job-card reveal" href={`/carreiras/${j.slug}`} style={{ transitionDelay: i * 60 + "ms" }}>
            <div className="job-card-main">
              <h3 className="job-card-title">{j.name}</h3>
              <div className="job-card-tags">
                {j.novo ? <span className="job-tag job-tag--new">Nova</span> : null}
                {j.local ? <span className="job-tag">{j.local}</span> : null}
              </div>
            </div>
            <span className="job-card-arrow">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </span>
          </a>
        ))}
      </div>
    );
  }
  return (
    <div className="jobs-empty reveal">
      <span className="icon-chip"><FIcon name="search" size={24} /></span>
      <h3>Sem vagas abertas no momento</h3>
      <p>
        Estamos sem novas posições agora, mas com certeza teremos novidades em breve.
        Deixe seu currículo com a gente — quando surgir a vaga certa, a gente te chama. 💜
      </p>
      <a href="mailto:ola@unbox.com.br?subject=Candidatura%20espont%C3%A2nea%20-%20Unbox" className="btn btn--primary">Enviar candidatura espontânea</a>
    </div>
  );
}

export default function CarreirasPage({ jobs = [] }) {
  useReveal();

  return (
    <React.Fragment>
      <Nav />
      <main>
        {/* HERO */}
        <section className="car-hero">
          <div className="car-hero-aura"></div>
          <div className="container car-hero-grid">
            <div>
              <span className="fpage-hero-badge reveal">Carreiras na Unbox</span>
              <h1 className="h1 reveal">
                Nosso sonho é grande: tornar o empreendedorismo <em className="accent-em">possível</em>.
              </h1>
              <p className="lede car-hero-lede reveal" style={{ transitionDelay: "120ms" }}>
                A gente conhece o desafio que é empreender. Por isso, construímos uma
                plataforma que tira o sonho de milhares de marcas da caixa — e queremos
                você com a gente nessa missão.
              </p>
              <div className="car-hero-ctas reveal" style={{ transitionDelay: "180ms" }}>
                <a href="#vagas" className="btn btn--primary">Ver vagas abertas →</a>
                <a href={URLS.whatsapp} target="_blank" rel="noreferrer" className="btn btn--secondary">Falar com a gente</a>
              </div>
            </div>
            <div className="car-hero-panel reveal" style={{ transitionDelay: "220ms" }}>
              <div className="car-stat">
                <div className="car-stat-num">+15<em> mil</em></div>
                <div className="car-stat-lbl">marcas já vendem com a Unbox</div>
              </div>
              <div className="car-stat">
                <div className="car-stat-num"><em>100%</em></div>
                <div className="car-stat-lbl">remoto, com time em todo o Brasil</div>
              </div>
              <div className="car-stat car-stat--wide">
                <span className="icon-chip"><FIcon name="hand" size={22} /></span>
                <div>
                  <div className="car-stat-num" style={{ fontSize: "22px" }}>Gente inquieta</div>
                  <div className="car-stat-lbl">que se importa de verdade com quem empreende</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MISSÃO */}
        <section className="section section--alt">
          <div className="container car-mission-grid">
            <div className="car-mission-card reveal">
              <div className="car-mission-card-glow" aria-hidden="true"></div>
              <p className="car-mission-quote">
                “Criamos uma solução democrática e sob medida para brasileiras e brasileiros.
                Além da tecnologia, estamos <em className="accent-em">ao lado de quem empreende</em>.”
              </p>
              <div className="car-mission-by">— Time Unbox</div>
            </div>
            <div className="car-mission-copy">
              <h2 className="h2 reveal" style={{ marginBottom: "24px" }}>
                Somos pessoas <em className="accent-em">inquietas</em>.
              </h2>
              <p className="reveal" style={{ transitionDelay: "80ms" }}>
                Na Unbox conhecemos de perto o desafio que é empreender. Foi por isso que
                nascemos: para criar uma solução democrática e sob medida para quem quer
                vender com a própria marca.
              </p>
              <p className="reveal" style={{ transitionDelay: "140ms" }}>
                Hoje, nossa plataforma já empodera milhares de marcas incríveis por todo o
                país — e esse é apenas o começo. Para ir além, a gente precisa de gente
                boa, curiosa e que não tem medo de construir o novo.
              </p>
            </div>
          </div>
        </section>

        {/* BENEFÍCIOS — oculto por enquanto a pedido.
        <section className="section">
          <div className="container">
            <div className="block-head block-head--center reveal">
              <h2 className="h2">Benefícios de <em className="accent-em">ser Unbox</em>.</h2>
              <p className="lede block-lede">Mais do que um trabalho: um lugar para crescer cuidando de você.</p>
            </div>
            <FeatGrid items={BENEFITS} />
          </div>
        </section>
        */}

        {/* VAGAS */}
        <section className="section section--alt" id="vagas">
          <div className="container">
            <div className="block-head block-head--center reveal">
              <h2 className="h2">Vem construir esse sonho <em className="accent-em">com a gente</em>!</h2>
              <p className="lede block-lede">Confira as posições abertas — ou deixe sua candidatura para as próximas.</p>
            </div>
            <JobsSection jobs={jobs} />
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppFloater />
      <DemoModal />
    </React.Fragment>
  );
}
