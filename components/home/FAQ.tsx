import { FAQ_HEAD, FAQ_ITEMS } from './content';

/** Bloco 8a — FAQ com <details>/<summary> nativos: acessível e sem JS. */
export default function FAQ() {
  return (
    <section id="faq" className="ub-section" style={{ background: 'var(--cream)' }}>
      <div className="mx-auto grid max-w-content gap-8 px-5 md:grid-cols-[minmax(0,.7fr)_minmax(0,1.3fr)] md:gap-14">
        <div>
          <span className="ub-eyebrow">{FAQ_HEAD.eyebrow}</span>
          <h2 className="mt-3" style={{ fontSize: 'clamp(30px, 4.4vw, 52px)', lineHeight: 1.05, fontWeight: 800 }}>
            {FAQ_HEAD.h2}
          </h2>
        </div>

        <div style={{ borderTop: '1px solid var(--line)' }}>
          {FAQ_ITEMS.map((item) => (
            <details key={item.q} className="group" style={{ borderBottom: '1px solid var(--line)' }}>
              <summary
                className="flex cursor-pointer list-none items-center justify-between gap-4 py-5"
                style={{ fontSize: 18.5, fontWeight: 650 }}
              >
                <span>{item.q}</span>
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-transform group-open:rotate-45"
                  style={{ background: 'var(--ub-roxo-soft)', color: 'var(--ub-roxo-escuro)', fontSize: 17, lineHeight: 1 }}
                >
                  +
                </span>
              </summary>
              <p className="max-w-[64ch] pb-5" style={{ fontSize: 16.5, lineHeight: 1.6, color: 'var(--ub-texto-2)' }}>
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
