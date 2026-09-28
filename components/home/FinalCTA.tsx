import { CALENDLY, FINAL_CTA } from './content';

/** Bloco 8b — FinalCTA em dark band. Ban: link Projeto 10×; H2 "Unbox faz a venda". */
export default function FinalCTA() {
  return (
    <section id="cta-final" className="ub-section" style={{ background: 'var(--dark)', color: '#fff' }}>
      <div className="mx-auto max-w-content px-5 text-center">
        <h2
          className="mx-auto max-w-[22ch]"
          style={{ fontSize: 'clamp(30px, 4.4vw, 50px)', lineHeight: 1.06, fontWeight: 800 }}
        >
          {FINAL_CTA.h2}
        </h2>
        <p
          className="mx-auto mt-5 max-w-[60ch]"
          style={{ fontSize: 17, lineHeight: 1.55, color: 'rgba(255,255,255,.72)' }}
        >
          {FINAL_CTA.sub}
        </p>
        <div className="mt-8">
          <a href={CALENDLY} className="ub-btn ub-btn-lime" style={{ padding: '16px 30px', fontSize: 16 }}>
            {FINAL_CTA.button}
          </a>
        </div>
        <p className="mt-4" style={{ fontSize: 13, color: 'rgba(255,255,255,.55)' }}>
          {FINAL_CTA.micro}
        </p>
      </div>
    </section>
  );
}
