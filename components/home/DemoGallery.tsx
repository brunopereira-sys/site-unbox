import { GALLERY, GALLERY_CARDS } from './content';
import ShotImage from './ShotImage';
import StoreBrowserChrome from './StoreBrowserChrome';

/**
 * Bloco 2 — DemoGallery.
 * Regra ética dura: Oddie é o único "Cliente". Punch/OTO/SEDE são sempre
 * "Demo · criado com Unbox AI" e não fingem URL de cliente.
 */
export default function DemoGallery() {
  return (
    <section id="galeria" className="ub-section" style={{ background: 'var(--cream)' }}>
      <div className="mx-auto max-w-content px-5">
        <div className="grid items-end gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,380px)]">
          <div>
            <span className="ub-eyebrow">{GALLERY.eyebrow}</span>
            <h2 className="mt-3" style={{ fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.08, fontWeight: 800 }}>
              {GALLERY.h2a}
              <br />
              <span style={{ color: 'var(--purple)' }}>{GALLERY.h2b}</span>
            </h2>
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--ink-soft)' }}>
            <strong style={{ fontWeight: 700, color: 'var(--ink)' }}>{GALLERY.noteStrong}</strong>
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
                <p className="mt-2" style={{ fontSize: 15.5, fontWeight: 700 }}>
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
