import React from 'react';
import Head from 'next/head';
import CarreirasPage from '../components/CarreirasPage';
import { JOBS } from '../lib/jobsData';

export default function Carreiras({ jobs }) {
  return (
    <React.Fragment>
      <Head>
        <title>Carreiras · Unbox</title>
        <meta name="description" content="Venha construir com a Unbox. Empresa 100% remota, time por todo o Brasil. Confira as vagas abertas e nossos benefícios." />
        <link rel="canonical" href="https://www.unbox.com.br/carreiras" />
        <meta property="og:url" content="https://www.unbox.com.br/carreiras" />
        <meta property="og:title" content="Carreiras · Unbox" />
        <meta property="og:description" content="Venha construir com a Unbox. Empresa 100% remota, time por todo o Brasil." />
        <meta property="og:image" content="https://www.unbox.com.br/img/og-image.png" />
      </Head>
      <CarreirasPage jobs={jobs} />
    </React.Fragment>
  );
}

export function getStaticProps() {
  // Cards não usam o corpo da vaga — envia só os metadados.
  const jobs = JOBS.map(({ body, ...meta }) => meta);
  return { props: { jobs } };
}
