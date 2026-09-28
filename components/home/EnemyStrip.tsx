import { ENEMY } from './content';

/** Bloco 3 — EnemyStrip. Inimigo = template + plugin. Sem tabela competitiva. */
export default function EnemyStrip() {
  return (
    <section id="problema" className="ub-section" style={{ background: 'var(--cream)' }}>
      <div className="mx-auto max-w-content px-5">
        <div className="grid gap-8 md:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] md:gap-14">
          <div>
            <span className="ub-eyebrow">{ENEMY.eyebrow}</span>
            <h2 className="mt-3" style={{ fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.08, fontWeight: 800 }}>
              {ENEMY.h2a}
              <br />
              {ENEMY.h2b}
            </h2>
          </div>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--ink-soft)' }}>{ENEMY.lead}</p>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {ENEMY.bullets.map((b) => {
            const good = b.icon === '✓';
            return (
              <li
                key={b.title}
                className="p-6"
                style={{
                  borderRadius: 'var(--radius)',
                  background: good ? 'var(--ink)' : 'var(--cream-card)',
                  border: `1px solid ${good ? 'var(--ink)' : 'var(--line)'}`,
                  color: good ? '#fff' : 'var(--ink)',
                }}
              >
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 items-center justify-center rounded-full"
                  style={{
                    background: good ? 'var(--lime)' : 'rgba(26,21,32,.06)',
                    color: good ? 'var(--lime-ink)' : 'var(--muted)',
                    fontSize: 15,
                    fontWeight: 700,
                  }}
                >
                  {b.icon}
                </span>
                <h3 className="mt-4" style={{ fontSize: 17.5, fontWeight: 700, lineHeight: 1.25 }}>
                  {b.title}
                </h3>
                <p
                  className="mt-2.5"
                  style={{ fontSize: 15, lineHeight: 1.55, color: good ? 'rgba(255,255,255,.76)' : 'var(--ink-soft)' }}
                >
                  {b.body}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
