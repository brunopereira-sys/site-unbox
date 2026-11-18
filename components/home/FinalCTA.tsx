import { CALENDLY, FINAL_CTA } from './content';

/** Bloco 8b — FinalCTA em dark band. Ban: link Projeto 10×; H2 "Unbox faz a venda". */
export default function FinalCTA() {
  return (
    <section id="cta-final" className="ub-section" style={{ background: 'var(--ub-preto)', color: '#fff' }}>
      <div className="mx-auto max-w-content px-5 text-center">
        <h2
          className="mx-auto max-w-[22ch]"
          style={{ fontSize: 'clamp(30px, 4.4vw, 50px)', lineHeight: 1.06, fontWeight: 800 }}
        >
          {FINAL_CTA.h2}
        </h2>
        <p
          className="mx-auto mt-5 max-w-[60ch]"
          style={{ fontSize: 18.5, lineHeight: 1.55, color: 'rgba(255,255,255,.78)' }}
        >
          {FINAL_CTA.sub}
        </p>
        <div className="mt-8">
          <a href={CALENDLY} className="ub-btn ub-btn-turbo" style={{ padding: '16px 30px', fontSize: 16 }}>
            {FINAL_CTA.button}
          </a>
        </div>
        <p className="mt-4" style={{ fontSize: 14, color: 'rgba(255,255,255,.62)' }}>
          {FINAL_CTA.micro}
        </p>
      </div>
    </section>
  );
}
