/**
 * Logo oficial da Unbox — nunca redesenhado nem recolorido.
 *
 * Segue a REGRA DAS VARIANTES definida pela Unbox (a mesma do selo
 * "Powered by Unbox" das lojas, em components/powered-by-unbox.tsx):
 *   · superfície CLARA  → neon sobre placa preta   (powered-by-fundo-preto.png)
 *   · superfície ESCURA → neon transparente        (logo-navbar.png / powered-by-transparente.png)
 * Arquivos em /public/img/brand, só convertidos para WebP.
 *
 * O "AI" é o sufixo do guarda-chuva "Unbox AI" (briefing §1/§4: `unbox` + soft `AI`),
 * renderizado como texto AO LADO da marca — não fundido nela.
 */
export default function UnboxLogo({
  surface,
  height = 34,
  mobileHeight,
}: {
  surface: 'light' | 'dark';
  height?: number;
  /** altura abaixo de md (768px) — no nav de 375px a placa precisa encolher */
  mobileHeight?: number;
}) {
  const isLight = surface === 'light';
  const src = isLight ? '/img/brand/unbox-fundo-preto.webp' : '/img/brand/unbox-neon.webp';
  const ratio = isLight ? 328 / 108 : 560 / 190;

  const mh = mobileHeight ?? height;

  return (
    <span
      className="ub-logo inline-flex items-center gap-1.5 md:gap-2"
      style={{ ['--lh' as string]: `${height}px`, ['--lh-m' as string]: `${mh}px` }}
    >
      <img
        src={src}
        alt="Unbox"
        width={Math.round(height * ratio)}
        height={height}
        decoding="async"
        className="ub-logo-img block w-auto"
        style={{ borderRadius: isLight ? 8 : 0 }}
      />
      <span
        className="ub-logo-ai"
        style={{
          fontWeight: 600,
          letterSpacing: '.02em',
          color: isLight ? 'var(--ub-roxo)' : 'var(--ub-roxo-claro)',
        }}
      >
        AI
      </span>
    </span>
  );
}
