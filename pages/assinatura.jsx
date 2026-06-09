import React from 'react';
import Head from 'next/head';
import '../styles/assinatura.css';
import AssinaturaPage from '../components/AssinaturaPage';

export default function AssinaturaPageRoute() {
  return (
    <React.Fragment>
      <Head>
        <title>Venda por Assinatura · Unbox</title>
        <meta name="description" content="O sistema de recorrência mais poderoso do mercado, 100% nativo, sem app de terceiros. Assinar virou tão fácil quanto comprar." />
        <link rel="canonical" href="https://www.unbox.com.br/assinatura" />
        <meta property="og:url" content="https://www.unbox.com.br/assinatura" />
        <meta property="og:title" content="Venda por Assinatura · Unbox" />
        <meta property="og:description" content="O sistema de recorrência mais poderoso do mercado, 100% nativo, sem app de terceiros." />
        <meta property="og:image" content="https://www.unbox.com.br/img/og-image.png" />
      </Head>
      <AssinaturaPage />
    </React.Fragment>
  );
}
