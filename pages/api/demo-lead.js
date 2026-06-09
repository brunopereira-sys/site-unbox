export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { nome, email, whatsapp, loja, faturamento, origem } = req.body || {};
  const apiToken = process.env.PIPEDRIVE_API_KEY;

  if (!apiToken) {
    console.warn('PIPEDRIVE_API_KEY not set — skipping Pipedrive');
    return res.status(200).json({ ok: true, skipped: true });
  }

  const base = 'https://api.pipedrive.com/v1';
  const h = { 'Content-Type': 'application/json' };
  const q = `api_token=${apiToken}`;

  try {
    // 1. Find pipeline stage "Leads Site"
    const stagesRes = await fetch(`${base}/stages?${q}`);
    const stagesJson = await stagesRes.json();
    const stage = stagesJson.data?.find(
      (s) => s.name.toLowerCase().includes('leads site')
    );

    // 2. Create person
    const personPayload = { name: nome };
    if (whatsapp) personPayload.phone = [{ value: whatsapp, primary: true }];
    if (email)    personPayload.email = [{ value: email,    primary: true }];

    const personRes = await fetch(`${base}/persons?${q}`, {
      method: 'POST', headers: h,
      body: JSON.stringify(personPayload),
    });
    const personId = (await personRes.json()).data?.id;

    // 3. Create deal in "Leads Site" stage
    const dealPayload = {
      title: `${nome} — Demo Unbox`,
      ...(personId    ? { person_id:  personId         } : {}),
      ...(stage?.id   ? { stage_id:   stage.id         } : {}),
      ...(stage?.pipeline_id ? { pipeline_id: stage.pipeline_id } : {}),
    };
    const dealRes = await fetch(`${base}/deals?${q}`, {
      method: 'POST', headers: h,
      body: JSON.stringify(dealPayload),
    });
    const dealId = (await dealRes.json()).data?.id;

    // 4. Add pinned note with full context
    if (dealId) {
      const lines = [
        loja        && `🏪 Loja: ${loja}`,
        faturamento && `💰 Faturamento: ${faturamento}`,
        origem      && `🔗 Origem: ${origem}`,
      ].filter(Boolean).join('<br>');

      await fetch(`${base}/notes?${q}`, {
        method: 'POST', headers: h,
        body: JSON.stringify({ content: lines, deal_id: dealId, pinned_to_deal_flag: 1 }),
      });
    }

    res.status(200).json({ ok: true, dealId });
  } catch (err) {
    console.error('Pipedrive error:', err);
    res.status(200).json({ ok: true, warning: 'pipedrive_failed' });
  }
}
