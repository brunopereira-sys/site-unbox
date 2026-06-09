import React from 'react';
import Head from 'next/head';
import FeaturesPage from '../components/FeaturesPage';

export default function RecursosPage() {
  return (
    <React.Fragment>
      <Head>
        <title>Recursos · Unbox</title>
        <meta name="description" content="Fácil para quem está começando, completa para quem quer ir mais longe. A plataforma de e-commerce pronta para começar a vender agora." />
        <link rel="canonical" href="https://www.unbox.com.br/recursos" />
        <meta property="og:url" content="https://www.unbox.com.br/recursos" />
        <meta property="og:title" content="Recursos · Unbox" />
        <meta property="og:description" content="Fácil para quem está começando, completa para quem quer ir mais longe." />
        <meta property="og:image" content="https://www.unbox.com.br/img/og-image.png" />
      </Head>
      <FeaturesPage />
    </React.Fragment>
  );
}
