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
    <section id="hero" className="relative">
      <div className="mx-auto grid max-w-content items-center gap-x-10 gap-y-10 px-5 pb-10 pt-12 md:grid-cols-[minmax(0,1.24fr)_minmax(0,1fr)] md:pb-12 md:pt-16">
        <div>
          <span className="ub-eyebrow">{HERO.kicker}</span>

          <h1 className="mt-4" style={{ fontSize: 'clamp(40px, 6.2vw, 68px)', lineHeight: 1.02, fontWeight: 800 }}>
            <span style={{ color: 'var(--ub-roxo)', display: 'block' }}>{HERO.h1Cat}</span>
            <span style={{ display: 'block' }}>{HERO.h1Line}</span>
          </h1>

          <p
            className="mt-5 max-w-[46ch]"
            style={{ fontSize: 'clamp(17px, 1.6vw, 20px)', lineHeight: 1.55, color: 'var(--ub-texto-2)' }}
          >
            {HERO.sub}
          </p>

          {/* Sora é mais larga que Inter: coluna 1.24fr + px-5 mantêm os 2 CTAs lado a lado em 1440 */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a href={CALENDLY} className="ub-btn ub-btn-primary px-5">
              {HERO.ctaPrimary}
            </a>
            <a href={ROUTES.migrar} className="ub-btn ub-btn-secondary px-5">
              {HERO.ctaSecondary}
            </a>
          </div>

          {/* playbook: itens de confiança em verde (verde turbo oficial, check na cor da marca) */}
          <p className="mt-4 flex items-center gap-2" style={{ fontSize: 14, color: 'var(--ub-texto-2)' }}>
            <span
              aria-hidden="true"
              className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full"
              style={{ background: 'var(--ub-verde-turbo)', color: 'var(--ub-preto)', fontSize: 11, fontWeight: 800 }}
            >
              ✓
            </span>
            {HERO.microTrust}
          </p>

          <div
            className="mt-8 flex max-w-[52ch] items-start gap-3 pt-6"
            style={{ borderTop: '1px solid var(--line)' }}
          >
            <span className="ub-tag ub-tag-client mt-0.5 shrink-0">{HERO.proofBadge}</span>
            <p style={{ fontSize: 15.5, lineHeight: 1.5, color: 'var(--ub-texto-2)' }}>
              <strong style={{ fontWeight: 700, color: 'var(--ub-preto)' }}>{HERO.proofBrand}</strong>
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
            style={{ border: '1px solid var(--ub-preto)' }}
          >
            {HERO.frameLabel}
          </span>
        </div>
      </div>
    </section>
  );
}
