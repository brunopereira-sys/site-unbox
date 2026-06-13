import React from 'react';
import Nav from './Nav';
import { useReveal } from './PageKit';
import { FinalCTA, Footer, WhatsAppFloater } from './Closing';
import DemoModal from './DemoModal';

function MoreCard({ post }) {
  return (
    <a className="blog-card reveal" href={`/blog/${post.slug}`}>
      <div className="blog-card-media">
        {post.image ? <img src={post.image} alt={post.name} loading="lazy" /> : null}
      </div>
      <div className="blog-card-body">
        <span className="blog-chip">{post.category}</span>
        <h3 className="blog-card-title">{post.name}</h3>
        <div className="blog-card-meta">
          <span>{post.author}</span><span className="dot"></span><span>{post.date}</span>
        </div>
      </div>
    </a>
  );
}

export default function BlogPostPage({ post, body, more = [] }) {
  useReveal();

  if (!post) {
    return (
      <React.Fragment>
        <Nav />
        <main>
          <section className="article-hero">
            <div className="article-hero-aura"></div>
            <div className="container">
              <div className="article-head">
                <h1 className="article-title">Artigo não encontrado</h1>
                <p className="article-overview">O artigo que você procura não existe ou foi movido.</p>
                <div style={{ marginTop: "28px" }}>
                  <a href="/blog" className="btn btn--primary">← Voltar ao blog</a>
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

  return (
    <React.Fragment>
      <Nav />
      <main>
        <article>
          <section className="article-hero">
            <div className="article-hero-aura"></div>
            <div className="container">
              <a href="/blog" className="article-back">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                Blog Venda Mais!
              </a>
              <div className="article-head">
                <span className="blog-chip" style={{ display: "inline-flex" }}>{post.category}</span>
                <h1 className="article-title">{post.name}</h1>
                {post.overview ? <p className="article-overview">{post.overview}</p> : null}
                <div className="article-meta">
                  <span>{post.author}</span><span className="dot"></span><span>{post.date}</span>
                </div>
              </div>
              {post.image ? (
                <div className="article-cover reveal">
                  <img src={post.image} alt={post.name} />
                </div>
              ) : null}
            </div>
          </section>

          <section className="section" style={{ paddingTop: 0 }}>
            <div className="container">
              <div
                className="article-body"
                dangerouslySetInnerHTML={{ __html: body || "<p>Conteúdo indisponível.</p>" }}
              />
            </div>
          </section>
        </article>

        {more.length ? (
          <section className="section article-more">
            <div className="container">
              <div className="block-head block-head--center reveal">
                <h2 className="h2">Continue <em className="accent-em">lendo</em>.</h2>
              </div>
              <div className="blog-grid">
                {more.map((p) => <MoreCard key={p.slug} post={p} />)}
              </div>
            </div>
          </section>
        ) : null}

        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppFloater />
      <DemoModal />
    </React.Fragment>
  );
}
