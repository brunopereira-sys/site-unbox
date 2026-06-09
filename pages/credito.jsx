import React from 'react';
import Head from 'next/head';
import CreditoPage from '../components/CreditoPage';

export default function CreditoPageRoute() {
  return (
    <React.Fragment>
      <Head>
        <title>Crédito UnboxPay · Unbox</title>
        <meta name="description" content="Crédito para marcas digitais (DNVBs), com amortização automática integrada ao seu e-commerce. Cresça sem diluição de equity." />
        <link rel="canonical" href="https://www.unbox.com.br/credito" />
        <meta property="og:url" content="https://www.unbox.com.br/credito" />
        <meta property="og:title" content="Crédito UnboxPay · Unbox" />
        <meta property="og:description" content="Crédito para marcas digitais (DNVBs), com amortização automática integrada ao seu e-commerce." />
        <meta property="og:image" content="https://www.unbox.com.br/img/og-image.png" />
      </Head>
      <CreditoPage />
    </React.Fragment>
  );
}
