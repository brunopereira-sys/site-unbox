import React from 'react';
import Head from 'next/head';
import CreatorsPage from '../components/CreatorsPage';

export default function AfiliadosPage() {
  return (
    <React.Fragment>
      <Head>
        <title>Creators & Afiliados · Unbox</title>
        <meta name="description" content="Transforme afiliados e creators em canal de vendas. Rede integrada ao checkout, com cupons e rastreamento nativos. Você só paga quando a venda acontece." />
        <link rel="canonical" href="https://www.unbox.com.br/afiliados" />
        <meta property="og:url" content="https://www.unbox.com.br/afiliados" />
        <meta property="og:title" content="Creators & Afiliados · Unbox" />
        <meta property="og:description" content="Transforme afiliados e creators em canal de vendas. Rede integrada ao checkout, com cupons e rastreamento nativos." />
        <meta property="og:image" content="https://www.unbox.com.br/img/og-image.png" />
      </Head>
      <CreatorsPage />
    </React.Fragment>
  );
}
