import Link from 'next/link';
import { PATHS } from './content';

/**
 * Bloco 6 — Paths. Três caminhos com o MESMO peso visual.
 * Ban: card Projeto 10×; ofertas empilhadas.
 */
export default function Paths() {
  return (
    <section id="paths" className="ub-section" style={{ background: 'var(--cream)' }}>
      <div className="mx-auto max-w-content px-5">
        <div className="max-w-[60ch]">
          <span className="ub-eyebrow">{PATHS.eyebrow}</span>
          <h2 className="mt-3" style={{ fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.08, fontWeight: 800 }}>
            {PATHS.h2}
          </h2>
          <p className="mt-3" style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--ink-soft)' }}>
            {PATHS.lead}
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {PATHS.cards.map((c) => (
            <li key={c.label} className="ub-card flex flex-col p-6">
              <span
                style={{
                  fontSize: 11.5,
                  fontWeight: 700,
                  letterSpacing: '.12em',
                  color: 'var(--purple-deep)',
                }}
              >
                {c.label}
              </span>
              <h3 className="mt-3" style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.2 }}>
                {c.h3}
              </h3>
              <p className="mt-2.5 flex-1" style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--ink-soft)' }}>
                {c.body}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                {c.href.startsWith('/') ? (
                  <Link href={c.href} prefetch={false} className="font-semibold transition-colors hover:text-[var(--purple)]" style={{ fontSize: 14.5 }}>
                    {c.linkLabel}
                  </Link>
                ) : (
                  <a href={c.href} className="font-semibold transition-colors hover:text-[var(--purple)]" style={{ fontSize: 14.5 }}>
                    {c.linkLabel}
                  </a>
                )}
                {'hrefSecondary' in c && c.hrefSecondary ? (
                  <Link
                    href={c.hrefSecondary}
                    prefetch={false}
                    className="transition-colors hover:text-[var(--purple)]"
                    style={{ fontSize: 13.5, color: 'var(--muted)', textDecoration: 'underline', textUnderlineOffset: 3 }}
                  >
                    Developers
                  </Link>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
