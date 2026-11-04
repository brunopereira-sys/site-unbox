import Link from 'next/link';
import { RAILS } from './content';

/** Bloco 4 — RailsGrid. Qualitativo: sem 4×, 98%, "zero chargeback", sem chips de métrica. */
export default function RailsGrid() {
  return (
    <section id="plataforma" className="ub-section" style={{ background: 'var(--cream-deep)' }}>
      <div className="mx-auto max-w-content px-5">
        <div className="max-w-[62ch]">
          <span className="ub-eyebrow">{RAILS.eyebrow}</span>
          <h2 className="mt-3" style={{ fontSize: 'clamp(30px, 4.4vw, 52px)', lineHeight: 1.05, fontWeight: 800 }}>
            {RAILS.h2}
          </h2>
          <p className="mt-3" style={{ fontSize: 18.5, lineHeight: 1.6, color: 'var(--ub-texto-2)' }}>
            {RAILS.lead}
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {RAILS.cards.map((c) => (
            <li key={c.title} className="ub-card flex flex-col p-6">
              <span
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded-full"
                style={{ background: 'var(--ub-roxo-soft)', color: 'var(--ub-roxo-escuro)', fontSize: 15, fontWeight: 700 }}
              >
                {c.n}
              </span>
              <h3 className="mt-4" style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.2 }}>
                {c.title}
              </h3>
              <p className="mt-2.5 flex-1" style={{ fontSize: 16, lineHeight: 1.55, color: 'var(--ub-texto-2)' }}>
                {c.body}
              </p>
              {'anchor' in c && c.anchor ? (
                <Link
                  href={c.anchor}
                  className="mt-4 inline-flex w-fit items-center gap-1.5 transition-colors hover:text-[var(--ub-roxo)]"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 500, color: 'var(--ub-roxo-escuro)' }}
                >
                  {c.micro}
                </Link>
              ) : (
                <p className="mt-4" style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 500, color: 'var(--ub-texto-3)' }}>
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
