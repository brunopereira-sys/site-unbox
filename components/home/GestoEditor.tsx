import { GESTO } from './content';

/**
 * Bloco 2.5 — GestoEditor (P1-01, craft obrigatório).
 * Antídoto visual "AI não publica sozinha": fala → confirma → publica.
 * Três frames: chat cream (NUNCA terminal), preview/diff, botão Confirmar.
 * Bans: terminal, npm, Foundry, MCP, CLI.
 *
 * NOTA: o §4 define só eyebrow/H2/lead/micro deste bloco. A microcopy dentro
 * dos 3 frames (mensagens do chat, linhas do diff, label do botão) é ilustrativa
 * e foi escrita aqui — Bruno precisa aprovar ou ditar. Deliberadamente genérica,
 * sem citar marca de cliente numa cena fictícia.
 */
export default function GestoEditor() {
  return (
    <section id="gesto-editor" className="ub-section" style={{ background: 'var(--cream-deep)' }}>
      <div className="mx-auto max-w-content px-5">
        <div className="max-w-[58ch]">
          <span className="ub-eyebrow">{GESTO.eyebrow}</span>
          <h2 className="mt-3" style={{ fontSize: 'clamp(30px, 4.4vw, 52px)', lineHeight: 1.05, fontWeight: 800 }}>
            {GESTO.h2}
          </h2>
          <p className="mt-3" style={{ fontSize: 18.5, lineHeight: 1.55, color: 'var(--ub-texto-2)' }}>
            {GESTO.lead}
          </p>
        </div>

        <ol className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-3">
          {/* 1 — fala do lojista, chat UI cream */}
          <li className="ub-card flex flex-col p-5">
            <Step n={1} label="Fala" />
            <div className="mt-4 flex-1">
              <div
                className="ml-auto max-w-[92%] px-4 py-3"
                style={{
                  background: 'var(--ub-roxo)',
                  color: '#fff',
                  borderRadius: '16px 16px 4px 16px',
                  fontSize: 15.5,
                  lineHeight: 1.45,
                }}
              >
                Troca o banner da home pela campanha de assinatura e destaca o combo de 3 meses.
              </div>
              <div
                className="mt-2.5 max-w-[92%] px-4 py-3"
                style={{
                  background: 'rgba(34,36,42,.05)',
                  borderRadius: '16px 16px 16px 4px',
                  fontSize: 14.5,
                  lineHeight: 1.45,
                  color: 'var(--ub-texto-2)',
                }}
              >
                Preparei a mudança. Quer ver antes de publicar?
              </div>
            </div>
          </li>

          {/* 2 — preview / diff */}
          <li className="ub-card flex flex-col p-5">
            <Step n={2} label="Confirma" />
            <div className="mt-4 flex-1">
              <div className="overflow-hidden" style={{ border: '1px solid var(--line)', borderRadius: 12 }}>
                <DiffRow kind="out" text="Banner: “Novidades da estação”" />
                <DiffRow kind="in" text="Banner: “Assinatura — 3 meses”" />
                <DiffRow kind="in" text="Bloco combo destacado na home" />
              </div>
              <p className="mt-3" style={{ fontSize: 14, color: 'var(--ub-texto-3)' }}>
                2 alterações em rascunho · nada publicado ainda
              </p>
            </div>
          </li>

          {/* 3 — publica */}
          <li className="ub-card flex flex-col p-5">
            <Step n={3} label="Publica" />
            <div className="mt-4 flex flex-1 flex-col justify-between">
              <div
                className="px-4 py-3"
                style={{ background: 'var(--ub-roxo-soft)', borderRadius: 12, fontSize: 14.5, lineHeight: 1.45, color: 'var(--ub-texto-2)' }}
              >
                Revisado por você. A publicação só acontece no clique.
              </div>
              <div className="mt-4">
                <span className="ub-btn ub-btn-turbo w-full" aria-hidden="true">
                  Confirmar
                </span>
                <p className="mt-3 text-center" style={{ fontSize: 13.5, color: 'var(--ub-texto-3)' }}>
                  {GESTO.micro}
                </p>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}

function Step({ n, label }: { n: number; label: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className="flex h-6 w-6 items-center justify-center rounded-full"
        style={{ background: 'var(--ub-roxo-soft)', color: 'var(--ub-roxo-escuro)', fontSize: 12.5, fontWeight: 700 }}
      >
        {n}
      </span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 500, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--ub-texto-3)' }}>
        {label}
      </span>
    </div>
  );
}

function DiffRow({ kind, text }: { kind: 'in' | 'out'; text: string }) {
  const isIn = kind === 'in';
  return (
    <div
      className="flex items-start gap-2 px-3 py-2.5"
      style={{
        background: isIn ? 'rgba(57,255,20,.16)' : 'rgba(34,36,42,.035)',
        borderBottom: '1px solid var(--line)',
        fontSize: 14.5,
        lineHeight: 1.4,
        color: isIn ? 'var(--ub-preto)' : 'var(--ub-texto-3)',
        textDecoration: isIn ? 'none' : 'line-through',
      }}
    >
      <span aria-hidden="true" style={{ fontWeight: 700, color: isIn ? 'var(--ub-preto)' : 'var(--ub-texto-3)' }}>
        {isIn ? '+' : '−'}
      </span>
      <span>{text}</span>
    </div>
  );
}
