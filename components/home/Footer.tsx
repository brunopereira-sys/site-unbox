import Link from 'next/link';
import { FOOTER, ROUTES } from './content';

/** Footer. Developers (CLI/Foundry/MCP) vive AQUI — nunca no tip/nav/hero/meio do scroll. */
export default function Footer() {
  return (
    <footer style={{ background: 'var(--dark)', color: '#fff', borderTop: '1px solid rgba(255,255,255,.10)' }}>
      <div className="mx-auto flex max-w-content flex-col gap-7 px-5 py-11 md:flex-row md:items-start md:justify-between">
        <div>
          <Link href={ROUTES.home} className="flex items-baseline gap-1.5">
            <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.035em' }}>unbox</span>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.08em', color: 'var(--lime)' }}>AI</span>
          </Link>
          <p className="mt-2.5 max-w-[34ch]" style={{ fontSize: 14, lineHeight: 1.5, color: 'rgba(255,255,255,.6)' }}>
            {FOOTER.tagline}
          </p>
        </div>

        <ul className="flex flex-wrap gap-x-7 gap-y-3">
          {FOOTER.links.map((l) => (
            <li key={l.label}>
              <Link
                href={l.href}
                prefetch={false}
                className="transition-colors hover:text-[var(--lime)]"
                style={{ fontSize: 14.5, color: 'rgba(255,255,255,.8)' }}
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
