import React from 'react';
import { R } from '../lib/config';

const RECURSOS = [
  { t: "Promoções avançadas", d: "Cupons, frete grátis, preços promocionais e vouchers por valor fixo, tudo configurável.", img: "feat-promocoes" },
  { t: "Envio de Sampling", d: "Inclua amostras e brindes nos pedidos para encantar, fidelizar e gerar recompra.", img: "feat-sampling" },
  { t: "Link do Creator", d: "Creators integrados ao checkout, com rastreamento e cupons nativos. Você paga por venda.", img: "feat-creator-link" },
  { t: "Venda por Assinatura", d: "Recorrência 100% nativa, da página de produto ao checkout. A assinatura que funciona.", img: "feat-assinatura-sq" },
  { t: "Bundles & Combos", d: "Monte kits e ofereça mais unidades com desconto progressivo na própria página de produto. O jeito nativo de aumentar o ticket médio.", img: "feat-bundle" },
  { t: "Upsell & Order Bump", d: "Aumente o ticket no checkout com ofertas e upsell em um clique, sem fricção.", img: "feat-upsell" },
];

function Recursos() {
  const [open, setOpen] = React.useState(0);
  return (
    <section className="section recursos">
      <div className="recursos-aura"></div>
      <div className="container recursos-grid">
        <div className="recursos-visual reveal">
          <div className="recursos-frame">
            <div className="recursos-frame-stage">
              {RECURSOS.map((r, i) => (
                <img
                  key={i}
                  src={R[r.img]}
                  alt={r.t + " na Unbox"}
                  className={"recursos-shot" + ((open === i || (open === -1 && i === 0)) ? " is-active" : "")}
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="recursos-copy">
          <h2 className="recursos-h2 reveal" style={{ transitionDelay: "60ms" }}>
            Funcionalidades essenciais<br />para o <em className="accent-em">seu e-commerce</em>.
          </h2>
          <div className="recursos-list reveal" style={{ transitionDelay: "120ms" }}>
            {RECURSOS.map((r, i) => (
              <div className={"recursos-item" + (open === i ? " is-open" : "")} key={i}>
                <button className="recursos-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                  <span className="recursos-sign">{open === i ? "–" : "+"}</span>
                  <span className="recursos-label">{r.t}</span>
                </button>
                <div className="recursos-a-wrap"><p className="recursos-a">{r.d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Recursos;
