import { GALLERY, GALLERY_CARDS } from './content';
import ShotImage from './ShotImage';
import StoreBrowserChrome from './StoreBrowserChrome';

/**
 * Bloco 2 — DemoGallery.
 * Regra ética dura: Oddie é o único "Cliente". Punch/OTO/SEDE são sempre
 * "Demo · criado com Unbox AI" e não fingem URL de cliente.
 */
export default function DemoGallery() {
  // mesmo fundo do hero: topo curto pra não abrir faixa creme sobrando (playbook: seções emendadas)
  return (
    <section id="galeria" className="ub-section !pt-10 md:!pt-12" style={{ background: 'var(--cream)' }}>
      <div className="mx-auto max-w-content px-5">
        {/* H2 em largura total: a linha 1 do §4 ("Lojas reais. Universos diferentes.")
            mede 834px a 52px e precisa caber inteira — quebra ditada é literal.
            A nota lateral desce e alinha à direita. */}
        <div>
          <span className="ub-eyebrow">{GALLERY.eyebrow}</span>
          <h2 className="mt-3" style={{ fontSize: 'clamp(30px, 4.4vw, 52px)', lineHeight: 1.05, fontWeight: 800 }}>
            {GALLERY.h2a}
            <br />
            <span style={{ color: 'var(--ub-roxo)' }}>{GALLERY.h2b}</span>
          </h2>
          <p className="mt-5 md:ml-auto md:max-w-[440px]" style={{ fontSize: 16.5, lineHeight: 1.55, color: 'var(--ub-texto-2)' }}>
            <strong style={{ fontWeight: 700, color: 'var(--ub-preto)' }}>{GALLERY.noteStrong}</strong>
            {GALLERY.noteRest}
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {GALLERY_CARDS.map((c) => {
            const frame = (
              <>
                <StoreBrowserChrome url={c.chromeUrl}>
                  <ShotImage
                    src={c.src.replace(/\.png$/, '')}
                    alt={c.alt}
                    sizes="(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 270px"
                  />
                </StoreBrowserChrome>
                <div className="mt-3.5 flex flex-wrap items-center gap-2">
                  <span className={`ub-tag ${c.kind === 'client' ? 'ub-tag-client' : 'ub-tag-demo'}`}>{c.tag}</span>
                </div>
                <p className="mt-2" style={{ fontSize: 17, fontWeight: 700 }}>
                  {c.name}
                </p>
              </>
            );

            return (
              <li key={c.name}>
                {c.href ? (
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block transition-transform hover:-translate-y-1"
                  >
                    {frame}
                  </a>
                ) : (
                  <div>{frame}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
