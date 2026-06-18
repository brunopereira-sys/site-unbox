import React from 'react';
import Head from 'next/head';
import MigracaoShopify from '../../components/MigracaoShopify';

export default function MigracaoShopifyPage() {
  const title = "Migrar do Shopify para a Unbox · Plataforma feita pro Brasil";
  const desc = "O Shopify cobra em dólar, converte menos no Brasil e deixa o básico pago à parte. Veja por que marcas trocam o Shopify pela Unbox: Pix nativo, cobrança em real e tudo incluso.";
  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href="https://www.unbox.com.br/migracao/shopify" />
        <meta property="og:url" content="https://www.unbox.com.br/migracao/shopify" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:image" content="https://www.unbox.com.br/img/og-image.png" />
      </Head>
      <MigracaoShopify />
    </React.Fragment>
  );
}
