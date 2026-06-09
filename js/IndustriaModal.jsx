// IndustriaModal.jsx, popup "Habilitar minha indústria".
// Mesma lógica do DemoModal (backup local + webhook de planilha + tela de
// confirmação), reaproveitando as classes .demo-* de estilo.
// Abre em qualquer link que aponte para window.UNBOX_URLS.industriaApply
// ou ao chamar window.openIndustriaModal().

const SETOR_OPTS = [
  "Suplementos e bebidas",
  "Cosméticos e beleza",
  "Moda e private label",
  "Bens de consumo recorrente",
  "Alimentos",
  "Outro",
];

const IND_PROXIMOS = [
  "Validamos o fit da sua indústria com o modelo Crédito UnboxPay",
  "Conversa com nosso time de crédito (~30 min)",
  "Estruturação da parceria, sem compromisso",
];

window.getIndustriaLeads = function () {
  try { return JSON.parse(localStorage.getItem("unbox_industria_leads") || "[]"); }
  catch (_) { return []; }
};

function IndustriaModal() {
  const [open, setOpen] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [form, setForm] = React.useState({ nome: "", telefone: "", email: "", industria: "", setor: "" });

  React.useEffect(() => {
    const openHandler = () => { setSent(false); setSaving(false); setOpen(true); };
    window.openIndustriaModal = openHandler;
    window.addEventListener("open-industria-modal", openHandler);

    const target = (window.UNBOX_URLS && window.UNBOX_URLS.industriaApply) || "";
    const clickHandler = (e) => {
      const a = e.target.closest && e.target.closest("a");
      if (!a) return;
      if (target && a.getAttribute("href") === target) {
        e.preventDefault();
        openHandler();
      }
    };
    document.addEventListener("click", clickHandler);

    return () => {
      window.removeEventListener("open-industria-modal", openHandler);
      document.removeEventListener("click", clickHandler);
    };
  }, []);

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    if (open) document.addEventListener("keydown", onKey);
    document.body.style.overflow = open ? "hidden" : "";
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const valid = form.nome.trim() && form.telefone.trim() && form.email.trim() && form.industria.trim() && form.setor;

  const submit = async (e) => {
    e.preventDefault();
    if (!valid || saving) return;
    setSaving(true);

    const lead = {
      tipo: "industria",
      nome: form.nome.trim(),
      telefone: form.telefone.trim(),
      email: form.email.trim(),
      industria: form.industria.trim(),
      setor: form.setor,
      origem: location.href,
      data: new Date().toISOString(),
    };

    try {
      const prev = window.getIndustriaLeads();
      prev.push(lead);
      localStorage.setItem("unbox_industria_leads", JSON.stringify(prev));
    } catch (_) {}

    const hook = (window.UNBOX_LEADS && window.UNBOX_LEADS.sheetWebhook) || "";
    if (hook) {
      try {
        await fetch(hook, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(lead),
        });
      } catch (_) {}
    }

    setSaving(false);
    setSent(true);
  };

  const firstName = (form.nome.trim().split(" ")[0]) || "";

  return (
    <div className="demo-modal" onMouseDown={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
      <div className="demo-modal-card" role="dialog" aria-modal="true" aria-label="Habilitar minha indústria">
        <button className="demo-modal-close" aria-label="Fechar" onClick={() => setOpen(false)}>✕</button>

        {sent ? (
          <div className="demo-modal-success">
            <div className="demo-modal-success-icon">✓</div>
            <h3 className="demo-modal-title">Pedido recebido{firstName ? ", " + firstName : ""}!</h3>
            <p className="demo-modal-text">Já registramos sua solicitação. Nosso time de crédito vai entrar em contato em até 1 dia útil para estruturar a parceria.</p>
            <ol className="demo-next">
              {IND_PROXIMOS.map((p, i) => (
                <li key={i}><span className="demo-next-num">{i + 1}</span>{p}</li>
              ))}
            </ol>
            <a href={window.UNBOX_URLS.whatsapp} target="_blank" rel="noreferrer" className="btn btn--primary demo-modal-wa-btn">
              Adiantar pelo WhatsApp →
            </a>
            <button className="demo-modal-textlink" onClick={() => setOpen(false)}>Fechar</button>
          </div>
        ) : (
          <React.Fragment>
            <div className="demo-modal-head">
              <span className="demo-modal-eyebrow">Para indústrias</span>
              <h3 className="demo-modal-title">Habilitar minha indústria</h3>
              <p className="demo-modal-text">Preencha seus dados e nossa equipe entrará em contato.</p>
            </div>

            <form className="demo-form" onSubmit={submit}>
              <label className="demo-field">
                <span>Nome *</span>
                <input type="text" value={form.nome} onChange={set("nome")} placeholder="Seu nome completo" required />
              </label>
              <label className="demo-field">
                <span>Telefone *</span>
                <input type="tel" value={form.telefone} onChange={set("telefone")} placeholder="(11) 99999-9999" required />
              </label>
              <label className="demo-field">
                <span>Email *</span>
                <input type="email" value={form.email} onChange={set("email")} placeholder="seu@email.com" required />
              </label>
              <label className="demo-field">
                <span>Nome da Indústria *</span>
                <input type="text" value={form.industria} onChange={set("industria")} placeholder="Nome da sua empresa" required />
              </label>
              <label className="demo-field">
                <span>Setor *</span>
                <select value={form.setor} onChange={set("setor")} required>
                  <option value="" disabled>Selecione o setor</option>
                  {SETOR_OPTS.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </label>

              <button type="submit" className="btn btn--primary demo-form-submit" disabled={!valid || saving}>
                {saving ? "Enviando..." : "Enviar"}
              </button>
            </form>

            <div className="demo-modal-foot">
              <span>Prefere falar agora?</span>
              <a href={window.UNBOX_URLS.whatsapp} target="_blank" rel="noreferrer" className="demo-modal-walink">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.1-.7.2-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.5-.9-.7-1.4-1.7-1.6-1.9-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.6-1.5-.9-2.1-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .2.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.4zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.4 5L2 22l5-1.4c1.5.8 3.2 1.3 5 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2z" /></svg>
                Chamar no WhatsApp
              </a>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
window.IndustriaModal = IndustriaModal;
