import React from 'react';
import '../styles/site.css';
import '../styles/sections.css';
import '../styles/features.css';
import '../styles/checkout.css';
import '../styles/assinatura.css';
import '../styles/credito.css';
import '../styles/industrias.css';

export default function App({ Component, pageProps }) {
  React.useEffect(() => {
    const h = (typeof window !== 'undefined' && window.location && window.location.hostname) || '';
    const allow = /(^|\.)unbox\.com\.br$/.test(h) || /\.vercel\.app$/.test(h);
    if (!allow) return;

    // Google Tag Manager
    (function (w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
      var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
      j.async = true;
      j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', 'GTM-TH8FMZR');

    // Meta Pixel
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init','2774102732703722');
    window.fbq('track','PageView');

    // Microsoft Clarity
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', 'ftpnn17p83');

    // HubSpot
    const hs = document.createElement('script');
    hs.id = 'hs-script-loader';
    hs.async = true;
    hs.defer = true;
    hs.src = '//js.hs-scripts.com/7711381.js';
    document.head.appendChild(hs);

    // Tolstoy
    window.tolstoyAppKey = '4a7d3b2f-ca05-4fd1-982a-0d7916ab8b15';
    const tol = document.createElement('script');
    tol.async = true;
    tol.src = 'https://widget.gotolstoy.com/widget/widget.js';
    document.head.appendChild(tol);
  }, []);

  return <Component {...pageProps} />;
}
