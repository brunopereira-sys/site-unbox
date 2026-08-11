import React from 'react';
import { URLS, LEADS } from '../lib/config';

const FATURAMENTO_OPTS = [
  "Ainda não vendo / vou começar",
  "Até R$ 50 mil/mês",
  "R$ 50 mil a R$ 200 mil/mês",
  "R$ 200 mil a R$ 1 milhão/mês",
  "Acima de R$ 1 milhão/mês",
];

// Formulário de captura de lead reutilizável. Envia para /api/demo-lead
// (Pipedrive) no mesmo formato do DemoModal, com backup local.
export default function LeadForm({ title, sub, button, note }) {
  const [sent, setSent] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [form, setForm] = React.useState({ nome: "", whatsapp: "", email: "", faturamento: "" });

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
      loja: "",
      faturamento: form.faturamento,
      origem: typeof location !== "undefined" ? location.href : "",
      data: new Date().toISOString(),
    };

    try {
      const prev = JSON.parse(localStorage.getItem("unbox_demo_leads") || "[]");
      prev.push(lead);
      localStorage.setItem("unbox_demo_leads", JSON.stringify(prev));
    } catch (_) {}

    const hook = LEADS.sheetWebhook || "";
    if (hook) {
      try {
        await fetch(hook, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(lead) });
      } catch (_) {}
    }

    try {
      await fetch("/api/demo-lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(lead) });
    } catch (_) {}

    setSaving(false);
    setSent(true);
  };

  const firstName = (form.nome.trim().split(" ")[0]) || "";

  if (sent) {
    return (
      <div className="vp-form vp-form--sent">
        <div className="vp-form-check">✓</div>
        <h3>Recebido{firstName ? ", " + firstName : ""}!</h3>
        <p>Nossa equipe vai te chamar no WhatsApp em até 1 dia útil pra marcar sua demo com diagnóstico gratuito.</p>
        <a href={URLS.whatsapp} target="_blank" rel="noreferrer" className="btn btn--primary" style={{ width: "100%", justifyContent: "center" }}>Adiantar pelo WhatsApp →</a>
      </div>
    );
  }

  return (
    <div className="vp-form">
      {title ? <h3 className="vp-form-title">{title}</h3> : null}
      {sub ? <p className="vp-form-sub">{sub}</p> : null}
      <form onSubmit={submit}>
        <label className="vp-field">
          <span>Nome *</span>
          <input type="text" value={form.nome} onChange={set("nome")} placeholder="Seu nome" required />
        </label>
        <label className="vp-field">
          <span>WhatsApp *</span>
          <input type="tel" value={form.whatsapp} onChange={set("whatsapp")} placeholder="(11) 99999-9999" required />
        </label>
        <label className="vp-field">
          <span>E-mail</span>
          <input type="email" value={form.email} onChange={set("email")} placeholder="voce@email.com" />
        </label>
        <label className="vp-field">
          <span>Faturamento mensal *</span>
          <select value={form.faturamento} onChange={set("faturamento")} required>
            <option value="" disabled>Selecione uma faixa</option>
            {FATURAMENTO_OPTS.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </label>
        <button type="submit" className="btn btn--primary vp-form-submit" disabled={!valid || saving}>
          {saving ? "Enviando..." : (button || "Falar com especialista →")}
        </button>
        {note ? <p className="vp-form-note">{note}</p> : null}
      </form>
    </div>
  );
}
