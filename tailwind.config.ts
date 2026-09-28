import type { Config } from 'tailwindcss';

/**
 * Tokens do BRIEFING-BUILD-CLAUDE-HOME-V1 §2.
 * Os valores vivem como CSS vars em app/globals.css; aqui só mapeamos
 * para classes utilitárias, para o token continuar sendo fonte única.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/home/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: 'var(--cream)',
        'cream-deep': 'var(--cream-deep)',
        'cream-card': 'var(--cream-card)',
        ink: 'var(--ink)',
        'ink-soft': 'var(--ink-soft)',
        muted: 'var(--muted)',
        line: 'var(--line)',
        purple: 'var(--purple)',
        'purple-deep': 'var(--purple-deep)',
        'purple-soft': 'var(--purple-soft)',
        lime: 'var(--lime)',
        'lime-ink': 'var(--lime-ink)',
        dark: 'var(--dark)',
        'dark-card': 'var(--dark-card)',
      },
      borderRadius: { token: 'var(--radius)' },
      spacing: { nav: 'var(--nav-h)' },
      maxWidth: { content: '1180px' },
      fontFamily: { sans: 'var(--font)' },
    },
  },
  plugins: [],
};

export default config;
