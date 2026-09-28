import { TRUST_LITE } from './content';

/**
 * Bloco 7 — TrustLite. Uma linha de lastro, sem logo soup, sem badges.
 * §9: Exame R$15M e logos Maya/Bertha/Endeavor/Meta ficam FORA até Bruno validar fonte.
 */
export default function TrustLite() {
  return (
    <section id="lastro" style={{ background: 'var(--cream-deep)', borderBlock: '1px solid var(--line)' }}>
      <div className="mx-auto max-w-content px-5 py-7">
        <p className="max-w-[92ch]" style={{ fontSize: 14.5, lineHeight: 1.6, color: 'var(--muted)' }}>
          {TRUST_LITE}
        </p>
      </div>
    </section>
  );
}
