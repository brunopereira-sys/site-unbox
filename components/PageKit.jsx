import React from 'react';
import { URLS, R } from '../lib/config';

function FIcon({ name, size = 22 }) {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
  const paths = {
    layout: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></>,
    zap: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
    repeat: <><path d="m17 2 4 4-4 4" /><path d="M3 11v-1a4 4 0 0 1 4-4h14" /><path d="m7 22-4-4 4-4" /><path d="M21 13v1a4 4 0 0 1-4 4H3" /></>,
    gauge: <><path d="m12 14 4-4" /><path d="M3.34 19a10 10 0 1 1 17.32 0" /></>,
    settings: <><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" /></>,
    chart: <><path d="M3 3v18h18" /><path d="m7 14 3-3 3 3 5-5" /></>,
    headset: <><path d="M3 14v-3a9 9 0 0 1 18 0v3" /><path d="M21 16a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2ZM3 16a2 2 0 0 0 2 2h1v-5H5a2 2 0 0 0-2 2Z" /><path d="M18 18a4 4 0 0 1-4 3h-2" /></>,
    box: <><path d="M21 8 12 3 3 8v8l9 5 9-5Z" /><path d="m3 8 9 5 9-5M12 13v8" /></>,
    tag: <><path d="M12.6 2.6 21 11a2 2 0 0 1 0 2.8l-7.2 7.2a2 2 0 0 1-2.8 0L2.6 12.6A2 2 0 0 1 2 11.2V4a2 2 0 0 1 2-2h7.2a2 2 0 0 1 1.4.6Z" /><circle cx="7.5" cy="7.5" r="1" /></>,
    hand: <><path d="M18 11V6a2 2 0 0 0-4 0M14 10V4a2 2 0 0 0-4 0v2" /><path d="M10 10.5V6a2 2 0 0 0-4 0v8" /><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" /></>,
    sparkle: <><path d="M12 3v4M12 17v4M3 12h4M17 12h4" /><path d="m6.3 6.3 2.4 2.4M15.3 15.3l2.4 2.4M17.7 6.3l-2.4 2.4M8.7 15.3l-2.4 2.4" /></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></>,
    bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    check: <path d="m5 12 4.5 4.5L19 7" />,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
    truck: <><path d="M14 18V6a1 1 0 0 0-1-1H2v13h2" /><path d="M14 9h4l3 3v6h-3" /><path d="M10 18h2" /><circle cx="6" cy="18.5" r="2" /><circle cx="17" cy="18.5" r="2" /></>,
    card: <><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></>,
    pin: <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></>,
    file: <><path d="M14 3v5h5" /><path d="M19 21H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h9l5 5v11a1 1 0 0 1-1 1Z" /></>,
    plug: <><path d="M9 2v6M15 2v6" /><path d="M7 8h10v3a5 5 0 0 1-10 0V8Z" /><path d="M12 16v6" /></>,
    store: <><path d="M3 9 4 4h16l1 5" /><path d="M4 9v11h16V9" /><path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" /></>,
    lock: <><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" /></>,
    wallet: <><rect x="3" y="6" width="18" height="14" rx="2" /><path d="M3 10h18M16 14h2" /></>,
    layers: <><path d="M12 2 2 7l10 5 10-5-10-5Z" /><path d="m2 17 10 5 10-5" /><path d="m2 12 10 5 10-5" /></>,
  };
  return <svg {...p}>{paths[name] || paths.box}</svg>;
}

function FeatCard({ icon, t, d, delay }) {
  return (
    <article className="card feat-card reveal" style={{ transitionDelay: (delay || 0) + "ms" }}>
      <div className="icon-chip"><FIcon name={icon} /></div>
      <h3 className="feat-card-h">{t}</h3>
      <p className="feat-card-b">{d}</p>
    </article>
  );
}

function FeatGrid({ items, four }) {
  return (
    <div className={"feat-grid" + (four ? " feat-grid--4" : "")}>
      {items.map((it, i) => <FeatCard key={it.t} {...it} delay={(i % 4) * 60} />)}
    </div>
  );
}

function SubList({ items }) {
  return (
    <ul className="sub-list">
      {items.map((it, i) => (
        <li className="sub-item reveal" key={it.t} style={{ transitionDelay: 120 + i * 60 + "ms" }}>
          <span className="sub-item-icon"><FIcon name={it.icon} size={18} /></span>
          <div>
            <h3 className="sub-item-title">{it.t}</h3>
            <p className="sub-item-body">{it.d}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function PageHero({ eyebrow, badge, title, lede, ctaPrimary, ctaSecondary, img, imgAlt, children }) {
  return (
    <section className="fpage-hero">
      <div className="fpage-hero-aura"></div>
      <div className="container fpage-hero-split">
        <div className="fpage-hero-copy">
          {badge ? <span className="fpage-hero-badge reveal">{badge}</span> : null}
          <h1 className="h1 reveal">{title}</h1>
          <p className="lede fpage-hero-lede reveal" style={{ transitionDelay: "120ms" }}>{lede}</p>
          <div className="fpage-hero-ctas reveal" style={{ transitionDelay: "180ms" }}>
            {ctaPrimary}
            {ctaSecondary}
          </div>
        </div>
        <div className="fpage-hero-side reveal" style={{ transitionDelay: "220ms" }}>
          {children ? children : <img className="fpage-hero-img" src={img} alt={imgAlt} loading="lazy" />}
        </div>
      </div>
    </section>
  );
}

function useReveal() {
  React.useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach((el) => el.classList.add("in")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach((el) => io.observe(el));
    const fb = setTimeout(() => els.forEach((el) => el.classList.add("in")), 1600);
    return () => { io.disconnect(); clearTimeout(fb); };
  }, []);
}

function CrossSellBanner({ icon, title, sub, bullets, cta }) {
  return (
    <section className="section">
      <div className="container">
        <div className="upx-fraud reveal">
          <div className="upx-fraud-glow" aria-hidden="true"></div>
          <div className="upx-fraud-head">
            <span className="upx-fraud-ico"><FIcon name={icon} size={26} /></span>
            <div>
              <h3 className="upx-fraud-h">{title}</h3>
              <p className="upx-fraud-sub">{sub}</p>
            </div>
          </div>
          <ul className="upx-fraud-list">
            {bullets.map((b, i) => (
              <li key={i}><span className="upx-fraud-check"><FIcon name="check" size={14} /></span><span>{b}</span></li>
            ))}
          </ul>
          {cta ? <div className="upx-fraud-tag">{cta}</div> : null}
        </div>
      </div>
    </section>
  );
}

export { FIcon, FeatCard, FeatGrid, SubList, PageHero, useReveal, CrossSellBanner };
