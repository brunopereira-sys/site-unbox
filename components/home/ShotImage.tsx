/**
 * §2 pede `next/image` "ou equivalente otimizado".
 * `next.config.js` do repo tem `images.unoptimized: true` (global, usado pelas
 * páginas existentes), então next/image não geraria srcSet aqui — viraria um
 * <img> simples servindo o arquivo cheio. Em vez de mudar config global,
 * os shots foram convertidos para WebP (3,2 MB → 464 KB) em duas larguras
 * e servidos com srcSet/sizes nativos.
 */
export default function ShotImage({
  src,
  alt,
  priority = false,
  sizes,
  className = '',
}: {
  /** caminho sem extensão, ex.: /img/home-ai/oddie-hero */
  src: string;
  alt: string;
  priority?: boolean;
  sizes: string;
  className?: string;
}) {
  return (
    <img
      src={`${src}.webp`}
      srcSet={`${src}@640.webp 640w, ${src}.webp 1024w`}
      sizes={sizes}
      alt={alt}
      width={1024}
      height={640}
      decoding={priority ? 'sync' : 'async'}
      loading={priority ? 'eager' : 'lazy'}
      // @ts-expect-error fetchpriority ainda não está nos tipos de React 18
      fetchpriority={priority ? 'high' : undefined}
      className={`block h-auto w-full ${className}`}
    />
  );
}
