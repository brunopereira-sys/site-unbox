import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,400..900;1,14..32,400..900&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <link rel="icon" type="image/png" href="/img/favicon.png" />
        <link rel="apple-touch-icon" href="/img/apple-touch-icon.png" />
        <meta name="theme-color" content="#7B2FBE" />
        <meta name="robots" content="index, follow" />
        <meta name="google-site-verification" content="pYYds3FLNQBOFC-a8LSWtraTFEYfeS4fvpVxn898g6g" />
        <meta name="facebook-domain-verification" content="b52bqvsbp6ltwa7zy1r3c5l4pjsw5t" />
        <meta name="p:domain_verify" content="78e5b2f9af15f9ade7f88231710a9a9b" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Unbox" />
        <meta property="og:locale" content="pt_BR" />
      </Head>
      <body>
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TH8FMZR" height="0" width="0" style={{display:'none',visibility:'hidden'}} />
        </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
