// O lead do site vai para a Central do Lead (leads.myunbox.com.br), não para o Pipedrive (desligado em 03/11/2026). O contrato está
// em central/INBOUND.md no repositório unbox-plus/unbox-esteira. A chave fica só no servidor (CENTRAL_API_CHAVE, sensível na Vercel).
// Nunca trava quem está no site: falhou, fica no log (só o status, sem nome, e-mail ou telefone) e a página segue.
export async function enviarACentral(corpo) {
  const url = process.env.CENTRAL_API_URL
  const chave = process.env.CENTRAL_API_CHAVE
  if (!url || !chave) {
    console.warn('CENTRAL_API_URL/CENTRAL_API_CHAVE ausentes: o lead não foi para a Central', corpo.formulario)
    return { enviado: false, motivo: 'sem_chave' }
  }
  try {
    const r = await fetch(`${url}/api/v1/inbound`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${chave}` },
      body: JSON.stringify(corpo),
      signal: AbortSignal.timeout(8000),
    })
    const j = await r.json().catch(() => ({}))
    if (!r.ok) {
      console.error('Central recusou o inbound', corpo.formulario, r.status, j.erro)
      return { enviado: false, motivo: `central_${r.status}` }
    }
    console.log('Inbound na Central', corpo.formulario, j.resultado, j.id)
    return { enviado: true, id: j.id ?? null }
  } catch (err) {
    console.error('Central não respondeu ao inbound', corpo.formulario, err?.name)
    return { enviado: false, motivo: 'central_falhou' }
  }
}
