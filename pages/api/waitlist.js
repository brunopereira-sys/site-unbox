import { insertEntry, getWaitlistCount, incrementReferralCount, initDB } from '../../lib/db'
import { createPipedrivePerson } from '../../lib/pipedrive'
import { generateRefCode } from '../../lib/referral'

let dbInitialized = false

async function ensureDB() {
  if (!dbInitialized) {
    await initDB()
    dbInitialized = true
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    await ensureDB()

    const { brand, email, wpp, role, ref } = req.body || {}

    if (!brand || !email || !wpp || !role) {
      return res.status(400).json({ error: 'Missing fields' })
    }

    if (!/.+@.+\..+/.test(email)) {
      return res.status(400).json({ error: 'Invalid email' })
    }

    const count = await getWaitlistCount()
    const basePosition = count + 1
    const refCode = generateRefCode(brand)

    // Create Pipedrive contact (non-blocking for user — errors are swallowed)
    const pipedriveResult = await createPipedrivePerson({ brand, email, wpp, role, refCode })

    const entry = await insertEntry({
      email,
      brand,
      wpp,
      role,
      refCode,
      referredBy: ref || null,
      basePosition,
      pipedrivePersonId: pipedriveResult ? String(pipedriveResult.id) : null,
    })

    if (!entry) {
      // Email already in waitlist
      return res.status(409).json({ error: 'already_registered' })
    }

    // If referred by someone, increment their count
    if (ref) {
      await incrementReferralCount(ref)
    }

    return res.status(200).json({
      position: basePosition,
      refCode: entry.ref_code,
    })
  } catch (err) {
    console.error('Waitlist API error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
