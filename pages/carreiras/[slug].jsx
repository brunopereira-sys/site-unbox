import React from 'react';
import Head from 'next/head';
import JobPostPage from '../../components/JobPostPage';
import { JOBS } from '../../lib/jobsData';

export default function Vaga({ job }) {
  const title = job ? `${job.name} — Carreiras Unbox` : 'Vaga — Carreiras Unbox';
  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
        <meta name="description" content={job?.overview || 'Vaga aberta na Unbox. Venha construir com a gente.'} />
        <link rel="canonical" href={`https://www.unbox.com.br/carreiras/${job?.slug || ''}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={job?.overview || 'Vaga aberta na Unbox.'} />
        <meta property="og:image" content="https://www.unbox.com.br/img/og-image.png" />
      </Head>
      <JobPostPage job={job} />
    </React.Fragment>
  );
}

export function getStaticPaths() {
  return {
    paths: JOBS.map((j) => ({ params: { slug: j.slug } })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const job = JOBS.find((j) => j.slug === params.slug) || null;
  if (!job) return { notFound: true };
  return { props: { job } };
}
