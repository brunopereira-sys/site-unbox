import React from 'react';
import { URLS, LEADS } from '../lib/config';

const FATURAMENTO_OPTS = [
  "Ainda não vendo / vou começar",
  "Até R$ 50 mil/mês",
  "R$ 50 mil a R$ 200 mil/mês",
  "R$ 200 mil a R$ 1 milhão/mês",
  "Acima de R$ 1 milhão/mês",
];

const PROXIMOS_PASSOS = [
  "Confirmamos o melhor horário com você pelo WhatsApp",
  "Demo + diagnóstico gratuito da sua operação (~30 min)",
  "Proposta sob medida, sem compromisso",
];

function DemoModal() {
  const [open, setOpen] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [form, setForm] = React.useState({ nome: "", email: "", whatsapp: "", loja: "", faturamento: "" });

  React.useEffect(() => {
    const getDemoLeads = function () {
      try { return JSON.parse(localStorage.getItem("unbox_demo_leads") || "[]"); }
      catch (_) { return []; }
    };
    window.getDemoLeads = getDemoLeads;

    const openHandler = () => { setSent(false); setSaving(false); setOpen(true); };
    window.openDemoModal = openHandler;
    window.addEventListener("open-demo-modal", openHandler);

    // Intercepta cliques em qualquer link que aponte para a URL de demo.
    const clickHandler = (e) => {
      const a = e.target.closest && e.target.closest("a");
      if (!a) return;
      const demo = URLS.demo || "";
      if (demo && a.getAttribute("href") === demo) {
        e.preventDefault();
        openHandler();
      }
    };
    document.addEventListener("click", clickHandler);

    return () => {
      window.removeEventListener("open-demo-modal", openHandler);
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
  const valid = form.nome.trim() && form.whatsapp.trim() && form.faturamento;

  const submit = async (e) => {
    e.preventDefault();
    if (!valid || saving) return;
    setSaving(true);

    const lead = {
      nome: form.nome.trim(),
      whatsapp: form.whatsapp.trim(),
      email: form.email.trim(),
      loja: form.loja.trim(),
      faturamento: form.faturamento,
      origem: location.href,
      data: new Date().toISOString(),
    };

    // 1) Backup local (sempre)
    try {
      const prev = window.getDemoLeads ? window.getDemoLeads() : [];
      prev.push(lead);
      localStorage.setItem("unbox_demo_leads", JSON.stringify(prev));
    } catch (_) {}

    // 2) Envia pra planilha (Google Apps Script)
    const hook = LEADS.sheetWebhook || "";
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

    // 3) Envia pro Pipedrive via API route (server-side)
    try {
      await fetch("/api/demo-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
    } catch (_) {}

    setSaving(false);
    setSent(true);
  };

  const firstName = (form.nome.trim().split(" ")[0]) || "";

  return (
    <div className="demo-modal" onMouseDown={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
      <div className="demo-modal-card" role="dialog" aria-modal="true" aria-label="Agendar demo">
        <button className="demo-modal-close" aria-label="Fechar" onClick={() => setOpen(false)}>✕</button>

        {sent ? (
          <div className="demo-modal-success">
            <div className="demo-modal-success-icon">✓</div>
            <h3 className="demo-modal-title">Pedido recebido{firstName ? ", " + firstName : ""}!</h3>
            <p className="demo-modal-text">Já registramos sua solicitação. Nossa equipe vai te chamar no WhatsApp em até 1 dia útil pra marcar a demo no melhor horário.</p>
            <ol className="demo-next">
              {PROXIMOS_PASSOS.map((p, i) => (
                <li key={i}><span className="demo-next-num">{i + 1}</span>{p}</li>
              ))}
            </ol>
            <a href={URLS.whatsapp} target="_blank" rel="noreferrer" className="btn btn--primary demo-modal-wa-btn">
              Adiantar pelo WhatsApp →
            </a>
            <button className="demo-modal-textlink" onClick={() => setOpen(false)}>Fechar</button>
          </div>
        ) : (
          <React.Fragment>
            <div className="demo-modal-head">
              <span className="demo-modal-eyebrow">Agendar demo</span>
              <h3 className="demo-modal-title">Vamos conhecer sua operação</h3>
              <p className="demo-modal-text">Conte rapidinho sobre seu negócio e a gente marca uma demonstração com diagnóstico gratuito. Sem compromisso.</p>
            </div>

            <form className="demo-form" onSubmit={submit}>
              <label className="demo-field">
                <span>Nome *</span>
                <input type="text" value={form.nome} onChange={set("nome")} placeholder="Seu nome" required />
              </label>
              <div className="demo-field-row">
                <label className="demo-field">
                  <span>WhatsApp *</span>
                  <input type="tel" value={form.whatsapp} onChange={set("whatsapp")} placeholder="(11) 99999-9999" required />
                </label>
                <label className="demo-field">
                  <span>E-mail</span>
                  <input type="email" value={form.email} onChange={set("email")} placeholder="voce@email.com" />
                </label>
              </div>
              <label className="demo-field">
                <span>Loja / site (opcional)</span>
                <input type="text" value={form.loja} onChange={set("loja")} placeholder="sualoja.com.br" />
              </label>
              <label className="demo-field">
                <span>Faturamento mensal *</span>
                <select value={form.faturamento} onChange={set("faturamento")} required>
                  <option value="" disabled>Selecione uma faixa</option>
                  {FATURAMENTO_OPTS.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </label>

              <button type="submit" className="btn btn--primary demo-form-submit" disabled={!valid || saving}>
                {saving ? "Enviando..." : "Solicitar minha demo →"}
              </button>
            </form>

            <div className="demo-modal-foot">
              <span>Prefere falar agora?</span>
              <a href={URLS.whatsapp} target="_blank" rel="noreferrer" className="demo-modal-walink">
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

export default DemoModal;
