'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CALENDLY, NAV_CTA, NAV_LINKS, ROUTES } from './content';
import UnboxLogo from './UnboxLogo';

/** Bloco 0 — StickyNav. Sem tip bar, sem "No automático"/"Receita", sem CLI/Foundry. */
export default function StickyNav() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: 'rgba(246,241,232,0.88)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <nav
        className="mx-auto flex max-w-content items-center gap-3 px-4 md:gap-6 md:px-5"
        style={{ height: 'var(--nav-h)' }}
        aria-label="Principal"
      >
        <Link href={ROUTES.home} className="flex shrink-0 items-center" aria-label="Unbox AI — início">
          <UnboxLogo surface="light" height={34} mobileHeight={28} />
        </Link>

        <ul className="ml-2 hidden flex-1 items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                prefetch={false}
                className="transition-colors hover:text-[var(--ub-roxo)]"
                style={{ fontSize: 15, fontWeight: 500, color: 'var(--ub-texto-2)' }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2">
          {/* nowrap + escala menor no mobile: em 375px o label quebrava em 2 linhas
              e estourava a altura de --nav-h */}
          <a
            href={CALENDLY}
            className="ub-btn ub-btn-primary ub-nav-cta whitespace-nowrap px-3.5 py-2.5 text-[13px] md:px-[18px] md:text-sm"
          >
            {NAV_CTA}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="nav-mobile"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            className="flex h-10 w-10 items-center justify-center rounded-full md:hidden"
            style={{ border: '1px solid var(--line)' }}
          >
            <span aria-hidden="true" className="relative block h-[11px] w-[17px]">
              {[0, 5, 10].map((t) => (
                <span
                  key={t}
                  className="absolute left-0 block h-[1.6px] w-full"
                  style={{ top: t, background: 'var(--ub-preto)', borderRadius: 2 }}
                />
              ))}
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="nav-mobile"
          className="md:hidden"
          style={{ borderTop: '1px solid var(--line)', background: 'var(--cream)' }}
        >
          <ul className="mx-auto max-w-content px-5 py-2">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  prefetch={false}
                  onClick={() => setOpen(false)}
                  className="block py-3"
                  style={{ fontSize: 16, fontWeight: 600, borderBottom: '1px solid var(--line)' }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
