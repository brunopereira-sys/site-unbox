import Link from 'next/link';
import { FOOTER, ROUTES } from './content';
import UnboxLogo from './UnboxLogo';

/** Footer. Developers (CLI/Foundry/MCP) vive AQUI — nunca no tip/nav/hero/meio do scroll. */
export default function Footer() {
  return (
    <footer style={{ background: 'var(--ub-preto)', color: '#fff', borderTop: '1px solid rgba(255,255,255,.10)' }}>
      <div className="mx-auto flex max-w-content flex-col gap-7 px-5 py-11 md:flex-row md:items-start md:justify-between">
        <div>
          <Link href={ROUTES.home} className="inline-flex" aria-label="Unbox AI — início">
            <UnboxLogo surface="dark" height={40} />
          </Link>
          <p className="mt-2.5 max-w-[34ch]" style={{ fontSize: 15, lineHeight: 1.5, color: 'rgba(255,255,255,.66)' }}>
            {FOOTER.tagline}
          </p>
        </div>

        <ul className="flex flex-wrap gap-x-7 gap-y-3">
          {FOOTER.links.map((l) => (
            <li key={l.label}>
              <Link
                href={l.href}
                prefetch={false}
                className="transition-colors hover:text-[var(--ub-verde-turbo)]"
                style={{ fontSize: 15, color: 'rgba(255,255,255,.82)' }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
