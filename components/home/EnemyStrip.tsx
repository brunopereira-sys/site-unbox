import { ENEMY } from './content';

/** Bloco 3 — EnemyStrip. Inimigo = template + plugin. Sem tabela competitiva. */
export default function EnemyStrip() {
  return (
    <section id="problema" className="ub-section" style={{ background: 'var(--cream)' }}>
      <div className="mx-auto max-w-content px-5">
        {/* coluna do H2 ≥ 536px: "Sem pilha de plugin." mede 515px a 52px e não pode quebrar */}
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,.9fr)] md:gap-14">
          <div>
            <span className="ub-eyebrow">{ENEMY.eyebrow}</span>
            <h2 className="mt-3" style={{ fontSize: 'clamp(30px, 4.4vw, 52px)', lineHeight: 1.05, fontWeight: 800 }}>
              {ENEMY.h2a}
              <br />
              {ENEMY.h2b}
            </h2>
          </div>
          <p style={{ fontSize: 18.5, lineHeight: 1.6, color: 'var(--ub-texto-2)' }}>{ENEMY.lead}</p>
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
                  background: good ? 'var(--ub-preto)' : 'var(--cream-card)',
                  border: `1px solid ${good ? 'var(--ub-preto)' : 'var(--line)'}`,
                  color: good ? '#fff' : 'var(--ub-preto)',
                }}
              >
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 items-center justify-center rounded-full"
                  style={{
                    background: good ? 'var(--ub-verde-turbo)' : 'rgba(34,36,42,.06)',
                    color: good ? 'var(--ub-preto)' : 'var(--ub-texto-3)',
                    fontSize: 15,
                    fontWeight: 700,
                  }}
                >
                  {b.icon}
                </span>
                <h3 className="mt-4" style={{ fontSize: 19.5, fontWeight: 700, lineHeight: 1.25 }}>
                  {b.title}
                </h3>
                <p
                  className="mt-2.5"
                  style={{ fontSize: 16, lineHeight: 1.55, color: good ? 'rgba(255,255,255,.78)' : 'var(--ub-texto-2)' }}
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
