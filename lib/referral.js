import { randomBytes } from 'crypto'

export function generateRefCode(brand) {
  const slug = (brand || '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .slice(0, 5)
  const rand = randomBytes(4).toString('hex')
  return (slug || 'unbox') + rand
}
