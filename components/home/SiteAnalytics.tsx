'use client';

import { useEffect } from 'react';

/**
 * Espelha exatamente o bloco de analytics de `pages/_app.jsx`, que o App Router
 * não herda. Sem isto a home nova perderia GTM/Pixel/Clarity que todas as outras
 * páginas do site já carregam. Mesmo allowlist de hostname do original.
 */
export default function SiteAnalytics() {
  useEffect(() => {
    const h = (typeof window !== 'undefined' && window.location && window.location.hostname) || '';
    const allow = /(^|\.)unbox\.com\.br$/.test(h) || /\.vercel\.app$/.test(h);
    if (!allow) return;

    const w = window as unknown as Record<string, any>;

    // Google Tag Manager
    (function (w: any, d: Document, s: string, l: string, i: string) {
      w[l] = w[l] || [];
      w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
      const f = d.getElementsByTagName(s)[0] as HTMLElement;
      const j = d.createElement(s) as HTMLScriptElement;
      const dl = l !== 'dataLayer' ? '&l=' + l : '';
      j.async = true;
      j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
      f.parentNode!.insertBefore(j, f);
    })(w, document, 'script', 'dataLayer', 'GTM-TH8FMZR');

    // Meta Pixel — mesmo stub oficial do _app.jsx, escrito de forma tipável
    if (!w.fbq) {
      const n: any = function (...args: unknown[]) {
        n.callMethod ? n.callMethod.apply(n, args) : n.queue.push(args);
      };
      w.fbq = n;
      if (!w._fbq) w._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = '2.0';
      n.queue = [];
      const t = document.createElement('script');
      t.async = true;
      t.src = 'https://connect.facebook.net/en_US/fbevents.js';
      const s0 = document.getElementsByTagName('script')[0];
      s0.parentNode!.insertBefore(t, s0);
    }
    w.fbq('init', '2774102732703722');
    w.fbq('track', 'PageView');

    // Microsoft Clarity
    (function (c: any, l: Document, a: string, r: string, i: string) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      const t = l.createElement(r) as HTMLScriptElement;
      t.async = true;
      t.src = 'https://www.clarity.ms/tag/' + i;
      const y = l.getElementsByTagName(r)[0] as HTMLElement;
      y.parentNode!.insertBefore(t, y);
    })(w, document, 'clarity', 'script', 'ftpnn17p83');

    // HubSpot
    const hs = document.createElement('script');
    hs.id = 'hs-script-loader';
    hs.async = true;
    hs.defer = true;
    hs.src = '//js.hs-scripts.com/7711381.js';
    document.head.appendChild(hs);

    // Tolstoy
    w.tolstoyAppKey = '4a7d3b2f-ca05-4fd1-982a-0d7916ab8b15';
    const tol = document.createElement('script');
    tol.async = true;
    tol.src = 'https://widget.gotolstoy.com/widget/widget.js';
    document.head.appendChild(tol);
  }, []);

  return null;
}
