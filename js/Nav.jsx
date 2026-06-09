// Nav.jsx, header glass-pill flutuante com menu mobile
const NAV_LINKS = [
  { label: "Recursos", href: "Unbox - Features.html" },
  { label: "Turbo Checkout", href: "Unbox - Checkout.html" },
  { label: "Assinatura", href: "Unbox - Assinatura.html" },
  { label: "Afiliados", href: "Unbox - Creators.html" },
  { label: "Crédito", href: "Unbox - Credito.html", children: [
    { label: "Para marcas", href: "Unbox - Credito.html" },
    { label: "Para indústrias", href: "Unbox - Industrias.html" },
  ] },
];

const navCaret = (
  <svg className="nav-caret" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
);

function Nav() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  // Em páginas internas, os links de âncora apontam de volta para a home.
  const homeBase = (typeof window !== "undefined" && window.UNBOX_HOME) || "";
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
        <a href={navHref("#top")} className="nav-brand" aria-label="Unbox">
          <img src={window.__resources["logo-navbar"]} alt="Unbox" />
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
          <a href={window.UNBOX_URLS.login} className="btn btn--ghost btn--sm nav-login">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>
            Login
          </a>
          <a href={window.UNBOX_URLS.demo} className="btn btn--primary btn--sm" style={{ boxShadow: "none" }}>Agendar demo</a>
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
          {NAV_LINKS.map((l) => (
            <React.Fragment key={l.label}>
              <a href={navHref(l.href)} className="nav-sheet-link" onClick={() => setOpen(false)}>{l.label}</a>
              {l.children && l.children.map((c) => (
                <a key={c.label} href={navHref(c.href)} className="nav-sheet-link nav-sheet-link--sub" onClick={() => setOpen(false)}>{c.label}</a>
              ))}
            </React.Fragment>
          ))}
          <div className="nav-sheet-cta">
            <a href={window.UNBOX_URLS.login} className="btn btn--secondary" onClick={() => setOpen(false)}>Login</a>
            <a href={window.UNBOX_URLS.demo} className="btn btn--primary" onClick={() => setOpen(false)}>Agendar demo</a>
          </div>
        </div>
      </div>
    </header>
  );
}
window.Nav = Nav;
