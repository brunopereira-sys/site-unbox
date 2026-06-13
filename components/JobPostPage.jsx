import React from 'react';
import Nav from './Nav';
import { FIcon, useReveal } from './PageKit';
import { FinalCTA, Footer, WhatsAppFloater } from './Closing';
import DemoModal from './DemoModal';

export default function JobPostPage({ job }) {
  useReveal();

  if (!job) {
    return (
      <React.Fragment>
        <Nav />
        <main>
          <section className="article-hero">
            <div className="article-hero-aura"></div>
            <div className="container">
              <div className="article-head">
                <h1 className="article-title">Vaga não encontrada</h1>
                <p className="article-overview">Esta vaga não existe mais ou foi preenchida.</p>
                <div style={{ marginTop: "28px" }}>
                  <a href="/carreiras" className="btn btn--primary">← Ver vagas abertas</a>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
        <WhatsAppFloater />
      </React.Fragment>
    );
  }

  const applyBtn = (
    <a href={job.apply} target="_blank" rel="noreferrer" className="btn btn--primary">Candidatar-se →</a>
  );

  return (
    <React.Fragment>
      <Nav />
      <main>
        <article>
          <section className="article-hero">
            <div className="article-hero-aura"></div>
            <div className="container">
              <a href="/carreiras" className="article-back">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                Carreiras
              </a>
              <div className="article-head">
                <div className="job-card-tags" style={{ justifyContent: "center" }}>
                  {job.novo ? <span className="job-tag job-tag--new">Nova</span> : null}
                  {job.local ? <span className="job-tag">{job.local}</span> : null}
                </div>
                <h1 className="article-title" style={{ marginTop: "18px" }}>{job.name}</h1>
                {job.overview ? <p className="article-overview">{job.overview}</p> : null}
                <div style={{ marginTop: "28px" }}>{applyBtn}</div>
              </div>
            </div>
          </section>

          <section className="section" style={{ paddingTop: "56px" }}>
            <div className="container">
              <div
                className="article-body"
                dangerouslySetInnerHTML={{ __html: job.body || "<p>Descrição indisponível.</p>" }}
              />
              <div style={{ maxWidth: "720px", margin: "8px auto 0", textAlign: "center" }}>
                <div className="jobs-empty" style={{ marginTop: "40px" }}>
                  <span className="icon-chip"><FIcon name="hand" size={24} /></span>
                  <h3>Curtiu a vaga?</h3>
                  <p>Faça parte de um time que tira o sonho de milhares de marcas da caixa.</p>
                  {applyBtn}
                </div>
              </div>
            </div>
          </section>
        </article>

        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppFloater />
      <DemoModal />
    </React.Fragment>
  );
}
