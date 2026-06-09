import React from 'react';
import Head from 'next/head';
import Nav from '../components/Nav';
import HeroPreview from '../components/HeroPreview';
import DemoModal from '../components/DemoModal';
import { Metrics, FinalCTA, Footer, WhatsAppFloater } from '../components/Closing';
import { Showcase, Platform, Subscription, Checkout } from '../components/Sections';
import DadosDashboard from '../components/DashboardSection';
import Recursos from '../components/Recursos';
import { Problema, Ecossistema, ProvaSocial, Projeto10x, Migracao, FAQ } from '../components/Narrative';

export default function HomePage() {
  React.useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    els.forEach((el) => io.observe(el));
    const fallback = setTimeout(() => els.forEach((el) => el.classList.add('in')), 1600);
    return () => { io.disconnect(); clearTimeout(fallback); };
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Unbox, E-commerce D2C para marcas de Alto Crescimento</title>
        <meta name="description" content="A plataforma de e-commerce de alta conversão para iniciar ou escalar suas vendas online com tudo em um só lugar." />
        <link rel="canonical" href="https://www.unbox.com.br/" />
        <meta property="og:url" content="https://www.unbox.com.br/" />
        <meta property="og:title" content="Unbox, E-commerce D2C para marcas de Alto Crescimento" />
        <meta property="og:description" content="A plataforma de e-commerce de alta conversão para iniciar ou escalar suas vendas online com tudo em um só lugar." />
        <meta property="og:image" content="https://www.unbox.com.br/img/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Unbox, E-commerce D2C para marcas de Alto Crescimento" />
        <meta name="twitter:description" content="A plataforma de e-commerce de alta conversão para iniciar ou escalar suas vendas online com tudo em um só lugar." />
        <meta name="twitter:image" content="https://www.unbox.com.br/img/og-image.png" />
      </Head>
      <Nav />
      <main>
        <HeroPreview />
        <Metrics />
        <Showcase />
        <Ecossistema />
        <Platform />
        <Subscription />
        <Checkout />
        <DadosDashboard />
        <Recursos />
        <Problema />
        <ProvaSocial />
        <Projeto10x />
        <Migracao />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppFloater />
      <DemoModal />
    </React.Fragment>
  );
}
