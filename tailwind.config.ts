import type { Config } from 'tailwindcss';

/**
 * Marca Unbox (paleta oficial de styles/site.css) + superfícies claras do briefing §2.
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
        roxo: 'var(--ub-roxo)',
        'roxo-escuro': 'var(--ub-roxo-escuro)',
        'roxo-claro': 'var(--ub-roxo-claro)',
        'roxo-soft': 'var(--ub-roxo-soft)',
        preto: 'var(--ub-preto)',
        'verde-turbo': 'var(--ub-verde-turbo)',
        'surface-1': 'var(--ub-surface-1)',
        'texto-2': 'var(--ub-texto-2)',
        'texto-3': 'var(--ub-texto-3)',
        line: 'var(--line)',
      },
      borderRadius: { token: 'var(--radius)' },
      spacing: { nav: 'var(--nav-h)' },
      maxWidth: { content: '1180px' },
      fontFamily: { sans: 'var(--font)', mono: 'var(--font-mono)' },
    },
  },
  plugins: [],
};

export default config;
