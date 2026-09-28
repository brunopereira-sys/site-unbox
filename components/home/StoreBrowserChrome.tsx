import type { ReactNode } from 'react';

/**
 * Chrome de navegador realista (dots + URL bar) — §2 "browser chrome realista
 * em toda prova de loja". Reusado em Hero, DemoGallery e OddieCase.
 */
export default function StoreBrowserChrome({
  url,
  children,
  tone = 'light',
  className = '',
}: {
  url: string;
  children: ReactNode;
  tone?: 'light' | 'dark';
  className?: string;
}) {
  const isDark = tone === 'dark';

  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{
        borderRadius: 'var(--radius)',
        background: isDark ? 'var(--dark-card)' : 'var(--cream-card)',
        border: `1px solid ${isDark ? 'rgba(255,255,255,.12)' : 'var(--line)'}`,
        boxShadow: isDark
          ? '0 24px 60px -24px rgba(0,0,0,.6)'
          : '0 18px 44px -20px rgba(26,21,32,.28)',
      }}
    >
      <div
        className="flex items-center gap-2.5 px-3.5"
        style={{
          height: 38,
          borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,.10)' : 'var(--line)'}`,
          background: isDark ? 'rgba(255,255,255,.03)' : 'rgba(26,21,32,.02)',
        }}
      >
        <div className="flex shrink-0 gap-1.5" aria-hidden="true">
          {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
            <span key={c} className="block h-[10px] w-[10px] rounded-full" style={{ background: c }} />
          ))}
        </div>
        <div
          className="flex min-w-0 flex-1 items-center truncate px-3"
          style={{
            height: 22,
            borderRadius: 999,
            fontSize: 11.5,
            color: isDark ? 'rgba(255,255,255,.62)' : 'var(--muted)',
            background: isDark ? 'rgba(255,255,255,.07)' : 'rgba(26,21,32,.05)',
          }}
        >
          <span className="truncate">{url}</span>
        </div>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
