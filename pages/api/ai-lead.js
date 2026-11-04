// O lead da página /ai-unbox vai para a Central do Lead (lib/central.js), com a origem "Inbound · Página AI (site)".
import { enviarACentral } from '../../lib/central'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { nome, email, whatsapp, perfil, faturamento, origem, utm, referencia } = req.body || {};

  const digits = String(whatsapp || '').replace(/\D/g, '');
  if (!nome || !email || !/.+@.+\..+/.test(email) || digits.length < 10) {
    return res.status(400).json({ error: 'invalid_fields' });
  }

  const r = await enviarACentral({
    formulario: 'ai-lead', nome, email, whatsapp, faturamento, pagina: origem, utm, referencia,
    ...(perfil ? { extra: { perfil } } : {}),
  });
  // a página mostra o sucesso mesmo se a Central falhar (como antes com o Pipedrive)
  return res.status(200).json({ ok: true, ...(r.enviado ? { id: r.id } : { warning: r.motivo }) });
}
