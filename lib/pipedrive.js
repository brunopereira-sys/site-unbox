const PIPEDRIVE_TOKEN = process.env.PIPEDRIVE_API_TOKEN || process.env.PIPEDRIVE_API_KEY
const BASE_URL = 'https://api.pipedrive.com/v1'
const CARGO_FIELD = '36f1613fc3e1b25d95debd52a4eb9941e2606a64'

// Creates a Pipedrive person + note + deal for a waitlist signup.
// Non-blocking: any failure (incl. missing token) returns null and is swallowed.
export async function createPipedrivePerson(params) {
  if (!PIPEDRIVE_TOKEN) return null
  try {
    const res = await fetch(`${BASE_URL}/persons?api_token=${PIPEDRIVE_TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: params.brand,
        email: [{ value: params.email, label: 'work', primary: true }],
        phone: [{ value: params.wpp, label: 'mobile', primary: true }],
        [CARGO_FIELD]: params.role,
      }),
    })
    const data = await res.json()
    if (!data.success || !data.data) return null

    const personId = data.data.id

    // Add a note with the referral code and source
    await fetch(`${BASE_URL}/notes?api_token=${PIPEDRIVE_TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `🚀 AI Foundry Waitlist\n\nMarca: ${params.brand}\nCargo: ${params.role}\nCódigo de indicação: ${params.refCode}\nFonte: unbox.com.br/ai`,
        person_id: personId,
      }),
    })

    // Create a deal in "Novos Leads" (stage 1)
    await fetch(`${BASE_URL}/deals?api_token=${PIPEDRIVE_TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: `${params.brand} — AI Foundry Waitlist`,
        person_id: personId,
        stage_id: 1,
        status: 'open',
      }),
    })

    return { id: personId, name: params.brand }
  } catch {
    return null
  }
}
