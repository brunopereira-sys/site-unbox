import React from 'react';
import { URLS, R } from '../lib/config';

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Recursos", href: "/recursos" },
  { label: "Turbo Checkout", href: "/checkout" },
  { label: "Assinatura", href: "/assinatura" },
  { label: "Afiliados", href: "/afiliados" },
  { label: "Crédito", href: "/credito", children: [
    { label: "Para marcas", href: "/credito" },
    { label: "Para indústrias", href: "/industrias" },
  ] },
];

const navCaret = (
  <svg className="nav-caret" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
);

function Nav() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  // Em páginas internas, os links de âncora apontam de volta para a home.
  const homeBase = "";
  const navHref = (h) => (h && h.charAt(0) === "#" ? homeBase + h : h);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className="nav-wrap">
      <nav className={"nav-pill" + (scrolled ? " is-scrolled" : "")}>
        <a href="/" className="nav-brand" aria-label="Unbox">
          <img src={R["logo-navbar"]} alt="Unbox" />
        </a>

        <div className="nav-links">
          {NAV_LINKS.map((l) =>
            l.children ? (
              <div className="nav-dd" key={l.label}>
                <a href={navHref(l.href)} className="nav-link nav-link--dd">{l.label}{navCaret}</a>
                <div className="nav-dd-menu">
                  {l.children.map((c) => (
                    <a key={c.label} href={navHref(c.href)} className="nav-dd-item">{c.label}</a>
                  ))}
                </div>
              </div>
            ) : (
              <a key={l.label} href={navHref(l.href)} className="nav-link">{l.label}</a>
            )
          )}
        </div>

        <div className="nav-actions">
          <a href={URLS.login} className="btn btn--ghost btn--sm nav-login">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>
            Login
          </a>
          <a href={URLS.demo} className="btn btn--primary btn--sm" style={{ boxShadow: "none" }}>Agendar demo</a>
          <button
            className={"nav-burger" + (open ? " is-open" : "")}
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      <div className={"nav-sheet" + (open ? " is-open" : "")}>
        <div className="nav-sheet-inner">
          <button
            className="nav-sheet-close"
            aria-label="Fechar menu"
            onClick={() => setOpen(false)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
          {NAV_LINKS.map((l) => (
            <React.Fragment key={l.label}>
              <a href={navHref(l.href)} className="nav-sheet-link" onClick={() => setOpen(false)}>{l.label}</a>
              {l.children && l.children.map((c) => (
                <a key={c.label} href={navHref(c.href)} className="nav-sheet-link nav-sheet-link--sub" onClick={() => setOpen(false)}>{c.label}</a>
              ))}
            </React.Fragment>
          ))}
          <div className="nav-sheet-cta">
            <a href={URLS.login} className="btn btn--secondary" onClick={() => setOpen(false)}>Login</a>
            <a href={URLS.demo} className="btn btn--primary" onClick={() => setOpen(false)}>Agendar demo</a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Nav;
