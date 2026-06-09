import React from 'react';
import Head from 'next/head';
import IndustriasPage from '../components/IndustriasPage';

export default function IndustriasPageRoute() {
  return (
    <React.Fragment>
      <Head>
        <title>Para Indústrias · Crédito UnboxPay · Unbox</title>
        <meta name="description" content="Maximize o sell-out da sua indústria e deixe seu fluxo de caixa mais saudável. Financiamos sua cadeia produtiva com crédito alinhado ao ciclo de vendas." />
        <link rel="canonical" href="https://www.unbox.com.br/industrias" />
        <meta property="og:url" content="https://www.unbox.com.br/industrias" />
        <meta property="og:title" content="Para Indústrias · Crédito UnboxPay · Unbox" />
        <meta property="og:description" content="Maximize o sell-out da sua indústria e deixe seu fluxo de caixa mais saudável." />
        <meta property="og:image" content="https://www.unbox.com.br/img/og-image.png" />
      </Head>
      <IndustriasPage />
    </React.Fragment>
  );
}
