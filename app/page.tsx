import DemoGallery from '@/components/home/DemoGallery';
import EnemyStrip from '@/components/home/EnemyStrip';
import FAQ from '@/components/home/FAQ';
import FinalCTA from '@/components/home/FinalCTA';
import Footer from '@/components/home/Footer';
import GestoEditor from '@/components/home/GestoEditor';
import Hero from '@/components/home/Hero';
import OddieCase from '@/components/home/OddieCase';
import Paths from '@/components/home/Paths';
import RailsGrid from '@/components/home/RailsGrid';
import StickyNav from '@/components/home/StickyNav';
import TrustLite from '@/components/home/TrustLite';
import { FAQ_ITEMS } from '@/components/home/content';

/**
 * Home `/` — BRIEFING-BUILD-CLAUDE-HOME-V1.
 * Uma história: do briefing à loja no ar — e depois o lojista edita falando.
 *
 * 0 StickyNav · 1 Hero · 2 DemoGallery · 2.5 GestoEditor (P1-01) · 3 EnemyStrip
 * 4 RailsGrid · 5 OddieCase · 6 Paths · 7 TrustLite · 8 FAQ + FinalCTA · Footer
 *
 * Server Component: o HTML do H1 e dos CTAs chega pronto no primeiro byte.
 * O único componente client é a StickyNav (menu mobile).
 */

// §6 opcional: FAQPage JSON-LD com as 5 Q&A.
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((i) => ({
    '@type': 'Question',
    name: i.q,
    acceptedAnswer: { '@type': 'Answer', text: i.a },
  })),
};

export default function HomePage() {
  return (
    <>
      <StickyNav />
      <main>
        <Hero />
        <DemoGallery />
        <GestoEditor />
        <EnemyStrip />
        <RailsGrid />
        <OddieCase />
        <Paths />
        <TrustLite />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
