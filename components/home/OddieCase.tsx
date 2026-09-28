import Link from 'next/link';
import { ODDIE, ROUTES } from './content';
import ShotImage from './ShotImage';
import StoreBrowserChrome from './StoreBrowserChrome';

/**
 * Bloco 5 — OddieCase. Hierarquia máxima da home: dark band, visual maior que
 * qualquer outro tile. Qualitativo — zero métrica não validada.
 */
export default function OddieCase() {
  return (
    <section id="case-oddie" className="ub-section" style={{ background: 'var(--dark)', color: '#fff' }}>
      <div className="mx-auto max-w-content px-5">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,.82fr)_minmax(0,1.18fr)] lg:gap-14">
          <div>
            <span className="ub-tag ub-tag-client">{ODDIE.badge}</span>
            <h2 className="mt-5" style={{ fontSize: 'clamp(34px, 5vw, 56px)', lineHeight: 1, fontWeight: 800 }}>
              {ODDIE.h2}
            </h2>
            <p className="mt-4 max-w-[46ch]" style={{ fontSize: 17.5, lineHeight: 1.55, color: 'rgba(255,255,255,.74)' }}>
              {ODDIE.lead}
            </p>

            <ul className="mt-7 space-y-3.5">
              {ODDIE.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-[3px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full"
                    style={{ background: 'var(--lime)', color: 'var(--lime-ink)', fontSize: 10.5, fontWeight: 800 }}
                  >
                    ✓
                  </span>
                  <span style={{ fontSize: 15.5, lineHeight: 1.5, color: 'rgba(255,255,255,.86)' }}>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href={ROUTES.caseOddie} prefetch={false} className="ub-btn ub-btn-lime">
                {ODDIE.ctaPrimary}
              </Link>
              <a
                href={ROUTES.oddieExterno}
                target="_blank"
                rel="noopener noreferrer"
                className="ub-btn ub-btn-ghost-dark"
              >
                {ODDIE.linkExterno}
              </a>
            </div>
          </div>

          <div>
            <StoreBrowserChrome url={ODDIE.chromeUrl} tone="dark">
              <ShotImage
                src="/img/home-ai/oddie-hero"
                alt="Oddie Supply — loja no ar com Unbox AI"
                sizes="(max-width: 1023px) 92vw, 640px"
              />
            </StoreBrowserChrome>

            <div className="mt-5 grid grid-cols-2 gap-5">
              <StoreBrowserChrome url={ODDIE.chromeUrl} tone="dark">
                <ShotImage
                  src="/img/home-ai/oddie-scroll-1"
                  alt="Oddie Supply — loja no ar com Unbox AI"
                  sizes="(max-width: 1023px) 45vw, 310px"
                />
              </StoreBrowserChrome>
              <StoreBrowserChrome url={ODDIE.chromeUrl} tone="dark">
                <ShotImage
                  src="/img/home-ai/oddie-scroll-2"
                  alt="Oddie Supply — loja no ar com Unbox AI"
                  sizes="(max-width: 1023px) 45vw, 310px"
                />
              </StoreBrowserChrome>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
