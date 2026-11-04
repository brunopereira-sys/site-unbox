// O "Agendar demonstração" vai para a Central do Lead (leads.myunbox.com.br), não mais para o Pipedrive. O contrato está em
// central/INBOUND.md no repositório unbox-plus/unbox-esteira. A chave fica só aqui, no servidor (CENTRAL_API_CHAVE, sensível na
// Vercel); nunca no navegador.
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const url = process.env.CENTRAL_API_URL;
  const chave = process.env.CENTRAL_API_CHAVE;
  if (!url || !chave) {
    console.warn('CENTRAL_API_URL/CENTRAL_API_CHAVE ausentes: o lead não foi para a Central');
    return res.status(200).json({ ok: true, skipped: true });
  }

  const { nome, email, whatsapp, loja, faturamento, origem, data, utm, referencia } = req.body || {};
  const corpo = { formulario: 'agendar-demonstracao', nome, email, whatsapp, loja, faturamento,
    pagina: origem, data, utm, referencia };

  try {
    const r = await fetch(`${url}/api/v1/inbound`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${chave}` },
      body: JSON.stringify(corpo),
      signal: AbortSignal.timeout(8000),
    });
    const j = await r.json().catch(() => ({}));
    // no log, só o status e o código da ficha: nome, e-mail e telefone são dado de pessoa
    if (!r.ok) console.error('Central recusou o inbound', r.status, j.erro);
    else console.log('Inbound na Central', j.resultado, j.id);
    return res.status(200).json({ ok: true, id: j.id ?? null });
  } catch (err) {
    console.error('Central não respondeu ao inbound', err?.name);
    return res.status(200).json({ ok: true, warning: 'central_falhou' });
  }
}
