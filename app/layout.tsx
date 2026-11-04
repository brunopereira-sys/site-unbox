import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono, Sora } from 'next/font/google';
import SiteAnalytics from '@/components/home/SiteAnalytics';
import './globals.css';

// Tipografia da marca Unbox (a mesma do site: Sora + JetBrains Mono).
// Self-hosted via next/font: sem request bloqueante no critical path (§6 first-paint).
const sora = Sora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sora',
});

const jbMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-jbmono',
});

// §6 SEO / meta
const TITLE = 'Unbox AI — AI Commerce no Brasil';
const DESCRIPTION =
  'Do briefing à loja no ar — e depois o lojista edita falando. Plataforma de AI Commerce no Brasil.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Unbox AI',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
  icons: {
    icon: '/img/favicon.png?v=r26',
    apple: '/img/apple-touch-icon.png?v=r26',
  },
};

export const viewport: Viewport = {
  themeColor: '#f6f1e8',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${sora.variable} ${jbMono.variable}`}>
      <body>
        {children}
        <SiteAnalytics />
      </body>
    </html>
  );
}
