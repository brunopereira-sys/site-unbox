import Link from 'next/link';
import { RAILS } from './content';

/** Bloco 4 — RailsGrid. Qualitativo: sem 4×, 98%, "zero chargeback", sem chips de métrica. */
export default function RailsGrid() {
  return (
    <section id="plataforma" className="ub-section" style={{ background: 'var(--cream-deep)' }}>
      <div className="mx-auto max-w-content px-5">
        <div className="max-w-[62ch]">
          <span className="ub-eyebrow">{RAILS.eyebrow}</span>
          <h2 className="mt-3" style={{ fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.08, fontWeight: 800 }}>
            {RAILS.h2}
          </h2>
          <p className="mt-3" style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--ink-soft)' }}>
            {RAILS.lead}
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {RAILS.cards.map((c) => (
            <li key={c.title} className="ub-card flex flex-col p-6">
              <span
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded-full"
                style={{ background: 'var(--purple-soft)', color: 'var(--purple-deep)', fontSize: 15, fontWeight: 700 }}
              >
                {c.n}
              </span>
              <h3 className="mt-4" style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.2 }}>
                {c.title}
              </h3>
              <p className="mt-2.5 flex-1" style={{ fontSize: 14.8, lineHeight: 1.55, color: 'var(--ink-soft)' }}>
                {c.body}
              </p>
              {'anchor' in c && c.anchor ? (
                <Link
                  href={c.anchor}
                  className="mt-4 inline-flex w-fit items-center gap-1.5 transition-colors hover:text-[var(--purple)]"
                  style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--purple-deep)' }}
                >
                  {c.micro}
                </Link>
              ) : (
                <p className="mt-4" style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--muted)' }}>
                  {c.micro}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
