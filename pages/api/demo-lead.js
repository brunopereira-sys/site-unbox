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

  try {
    // 1. Find or create label "site"
    const labelsRes = await fetch(`${base}/leadLabels?api_token=${apiToken}`);
    const labelsJson = await labelsRes.json();
    let labelId = labelsJson.data?.find((l) => l.name.toLowerCase() === 'site')?.id;

    if (!labelId) {
      const newLabelRes = await fetch(`${base}/leadLabels?api_token=${apiToken}`, {
        method: 'POST', headers: h,
        body: JSON.stringify({ name: 'site', color: 'green' }),
      });
      labelId = (await newLabelRes.json()).data?.id;
    }

    // 2. Create person
    const personPayload = { name: nome };
    if (whatsapp) personPayload.phone = [{ value: whatsapp, primary: true }];
    if (email)    personPayload.email = [{ value: email,    primary: true }];

    const personRes = await fetch(`${base}/persons?api_token=${apiToken}`, {
      method: 'POST', headers: h,
      body: JSON.stringify(personPayload),
    });
    const personId = (await personRes.json()).data?.id;

    // 3. Create lead
    const leadPayload = {
      title: `${nome} — Demo Unbox`,
      ...(personId  ? { person_id:  personId  } : {}),
      ...(labelId   ? { label_ids:  [labelId] } : {}),
    };
    const leadRes = await fetch(`${base}/leads?api_token=${apiToken}`, {
      method: 'POST', headers: h,
      body: JSON.stringify(leadPayload),
    });
    const leadId = (await leadRes.json()).data?.id;

    // 4. Add note with full context
    if (leadId) {
      const lines = [
        loja        && `🏪 Loja: ${loja}`,
        faturamento && `💰 Faturamento: ${faturamento}`,
        origem      && `🔗 Origem: ${origem}`,
      ].filter(Boolean).join('<br>');

      await fetch(`${base}/notes?api_token=${apiToken}`, {
        method: 'POST', headers: h,
        body: JSON.stringify({ content: lines, lead_id: leadId, pinned_to_lead_flag: 1 }),
      });
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Pipedrive error:', err);
    // Não bloqueia o usuário se o Pipedrive falhar
    res.status(200).json({ ok: true, warning: 'pipedrive_failed' });
  }
}
