import { neon } from '@neondatabase/serverless'

function getSQL() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL
  if (!url) throw new Error('DATABASE_URL is not set')
  return neon(url)
}

export async function initDB() {
  const sql = getSQL()
  await sql`
    CREATE TABLE IF NOT EXISTS waitlist (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email TEXT UNIQUE NOT NULL,
      brand TEXT NOT NULL,
      wpp TEXT NOT NULL,
      role TEXT NOT NULL,
      ref_code TEXT UNIQUE NOT NULL,
      referred_by TEXT,
      referral_count INT DEFAULT 0,
      base_position INT NOT NULL,
      pipedrive_person_id TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `
}

export async function getWaitlistCount() {
  const sql = getSQL()
  const rows = await sql`SELECT COUNT(*) as count FROM waitlist`
  return parseInt(String(rows[0].count), 10)
}

export async function insertEntry(params) {
  const sql = getSQL()
  const rows = await sql`
    INSERT INTO waitlist (email, brand, wpp, role, ref_code, referred_by, base_position, pipedrive_person_id)
    VALUES (
      ${params.email}, ${params.brand}, ${params.wpp}, ${params.role},
      ${params.refCode}, ${params.referredBy}, ${params.basePosition}, ${params.pipedrivePersonId}
    )
    ON CONFLICT (email) DO NOTHING
    RETURNING id, ref_code, base_position, referral_count
  `
  return rows[0] || null
}

export async function incrementReferralCount(refCode) {
  const sql = getSQL()
  const rows = await sql`
    UPDATE waitlist
    SET referral_count = referral_count + 1
    WHERE ref_code = ${refCode}
    RETURNING referral_count
  `
  return rows[0] ? rows[0].referral_count : null
}
