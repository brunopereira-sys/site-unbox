import { CALENDLY, HERO, ROUTES } from './content';
import ShotImage from './ShotImage';
import StoreBrowserChrome from './StoreBrowserChrome';

/**
 * Bloco 1 — Hero.
 * §6 first-paint: H1 e CTAs são HTML estático sem entrance — nada de fade que
 * esconda copy. Nenhuma animação de entrada nesta seção, por decisão de briefing.
 * P1-02: quando existir o loop MP4/WebM ≤8s do scroll da Oddie, ele entra dentro
 * deste mesmo chrome com a URL oddiesupply.com.br; por ora, shot estático.
 */
export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden">
      {/* halo roxo sutil — sem full-bleed "AI purple SaaS" (§1 ban craft) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-60"
        style={{ background: 'radial-gradient(closest-side, rgba(107,60,255,.10), transparent)' }}
      />

      <div className="mx-auto grid max-w-content items-center gap-x-12 gap-y-10 px-5 pb-14 pt-12 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:pb-20 md:pt-16">
        <div>
          <span className="ub-eyebrow">{HERO.kicker}</span>

          <h1 className="mt-4" style={{ fontSize: 'clamp(40px, 6.2vw, 68px)', lineHeight: 1.02, fontWeight: 800 }}>
            <span style={{ color: 'var(--purple)', display: 'block' }}>{HERO.h1Cat}</span>
            <span style={{ display: 'block' }}>{HERO.h1Line}</span>
          </h1>

          <p
            className="mt-5 max-w-[46ch]"
            style={{ fontSize: 'clamp(16px, 1.55vw, 18.5px)', lineHeight: 1.55, color: 'var(--ink-soft)' }}
          >
            {HERO.sub}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a href={CALENDLY} className="ub-btn ub-btn-primary">
              {HERO.ctaPrimary}
            </a>
            <a href={ROUTES.migrar} className="ub-btn ub-btn-secondary">
              {HERO.ctaSecondary}
            </a>
          </div>

          <p className="mt-4" style={{ fontSize: 13, color: 'var(--muted)' }}>
            {HERO.microTrust}
          </p>

          <div
            className="mt-8 flex max-w-[52ch] items-start gap-3 pt-6"
            style={{ borderTop: '1px solid var(--line)' }}
          >
            <span className="ub-tag ub-tag-client mt-0.5 shrink-0">{HERO.proofBadge}</span>
            <p style={{ fontSize: 14.5, lineHeight: 1.5, color: 'var(--ink-soft)' }}>
              <strong style={{ fontWeight: 700, color: 'var(--ink)' }}>{HERO.proofBrand}</strong>
              {HERO.proofRest}
            </p>
          </div>
        </div>

        <div className="relative">
          <StoreBrowserChrome url={HERO.chromeUrl} className="md:rotate-[1.2deg]">
            <ShotImage
              src="/img/home-ai/oddie-hero"
              alt={HERO.alt}
              priority
              sizes="(max-width: 767px) 92vw, 560px"
            />
          </StoreBrowserChrome>
          <span
            className="ub-tag ub-tag-client absolute -bottom-3 left-4 md:left-6"
            style={{ boxShadow: '0 6px 18px -8px rgba(26,21,32,.45)' }}
          >
            {HERO.frameLabel}
          </span>
        </div>
      </div>
    </section>
  );
}
