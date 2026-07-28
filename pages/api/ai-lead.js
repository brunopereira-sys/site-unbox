// Lead capture for the /ai-unbox landing page → Pipedrive CRM.
// Uses the same Pipedrive key already configured for the demo form.
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { nome, email, perfil, faturamento, origem } = req.body || {};

  if (!nome || !email || !/.+@.+\..+/.test(email)) {
    return res.status(400).json({ error: 'invalid_fields' });
  }

  const apiToken = process.env.PIPEDRIVE_API_TOKEN || process.env.PIPEDRIVE_API_KEY;
  if (!apiToken) {
    console.warn('PIPEDRIVE token not set — lead not persisted:', { nome, email, perfil });
    // Don't block the user; the LP still shows success.
    return res.status(200).json({ ok: true, skipped: true });
  }

  const base = 'https://api.pipedrive.com/v1';
  const h = { 'Content-Type': 'application/json' };
  const q = `api_token=${apiToken}`;

  try {
    // 1. Find "Leads Site" stage (same pipeline as the demo form)
    let stage = null;
    try {
      const stagesJson = await (await fetch(`${base}/stages?${q}`)).json();
      stage = stagesJson.data?.find((s) => (s.name || '').toLowerCase().includes('leads site'));
    } catch { /* stage lookup is best-effort */ }

    // 2. Create person
    const personPayload = { name: nome };
    if (email) personPayload.email = [{ value: email, primary: true }];
    const personRes = await fetch(`${base}/persons?${q}`, {
      method: 'POST', headers: h, body: JSON.stringify(personPayload),
    });
    const personId = (await personRes.json()).data?.id;

    // 3. Create deal
    const dealPayload = {
      title: `${nome} — AI Foundry (lista de espera)`,
      ...(personId ? { person_id: personId } : {}),
      ...(stage?.id ? { stage_id: stage.id } : {}),
      ...(stage?.pipeline_id ? { pipeline_id: stage.pipeline_id } : {}),
    };
    const dealId = (await fetch(`${base}/deals?${q}`, {
      method: 'POST', headers: h, body: JSON.stringify(dealPayload),
    }).then((r) => r.json())).data?.id;

    // 4. Pinned note with context
    const lines = [
      '🚀 Unbox AI Foundry — Lista de espera',
      perfil && `👤 Perfil: ${perfil}`,
      faturamento && `💰 Faturamento: ${faturamento}`,
      `🔗 Origem: ${origem || 'LP /ai-unbox'}`,
    ].filter(Boolean).join('<br>');

    if (dealId) {
      await fetch(`${base}/notes?${q}`, {
        method: 'POST', headers: h,
        body: JSON.stringify({ content: lines, deal_id: dealId, pinned_to_deal_flag: 1 }),
      });
    } else if (personId) {
      await fetch(`${base}/notes?${q}`, {
        method: 'POST', headers: h,
        body: JSON.stringify({ content: lines, person_id: personId }),
      });
    }

    return res.status(200).json({ ok: true, dealId });
  } catch (err) {
    console.error('ai-lead error:', err);
    // Non-blocking for the user experience.
    return res.status(200).json({ ok: true, warning: 'pipedrive_failed' });
  }
}
