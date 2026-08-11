import React from 'react';
import Head from 'next/head';
import VerticalPage from '../components/VerticalPage';
import { VERTICAIS } from '../lib/verticais';

export default function Vertical({ slug, data }) {
  const seo = data?.seo || {};
  return (
    <React.Fragment>
      <Head>
        <title>{seo.title || `Unbox para ${data?.nome || ''}`}</title>
        <meta name="description" content={seo.description || ''} />
        <link rel="canonical" href={`https://www.unbox.com.br/${slug}`} />
        <meta property="og:url" content={`https://www.unbox.com.br/${slug}`} />
        <meta property="og:title" content={seo.title || `Unbox para ${data?.nome || ''}`} />
        <meta property="og:description" content={seo.description || ''} />
        <meta property="og:image" content="https://www.unbox.com.br/img/og-image.png" />
      </Head>
      <VerticalPage data={data} />
    </React.Fragment>
  );
}

export function getStaticPaths() {
  return {
    paths: Object.keys(VERTICAIS).map((slug) => ({ params: { vertical: slug } })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const data = VERTICAIS[params.vertical] || null;
  if (!data) return { notFound: true };
  return { props: { slug: params.vertical, data } };
}
