/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import { URLS } from '../lib/config'

/* ─────────────────────────────────────────────────────────────
   Unbox · Home v7 — a era do CLI público.
   Base: todas as decisões conquistadas na v6 (hero ditado, faixa de
   logos, painel de abas, antes/depois no alto, 3 guarda-chuvas,
   crédito rebaixado, comparativo em âmbar).
   Fontes do conteúdo novo: Deck Set 26, README do @unbox-plus/cli e
   o Painel Unbox (admin) — nada além disso.
   Escopo #hv7 / h7-*.
   ───────────────────────────────────────────────────────────── */

const V = '?v=r26'
const CLI_CMD = 'npx --package=@unbox-plus/cli create-unbox-store'
const NPM_URL = 'https://www.npmjs.com/package/@unbox-plus/cli'
/* Decisão de negócio: publicar os planos do Deck Set 26 na home. */
const SHOW_PLANOS = true

const SHOW = [
  { key: 'loja', label: 'Loja', icon: 'layout', tint: 'sky', title: 'Sua loja, do seu jeito. Sem template.', body: 'Layouts 100% customizáveis, mobile-first, com SEO e performance de ponta. Crie do zero pelo CLI, importe do Figma ou migre de onde estiver.', ai: 'Gerada pelo CLI e personalizada pelo agente de Branding', img: '/img/loja-olea.png', alt: 'Loja Olea rodando na Unbox', href: '#loja' },
  { key: 'checkout', label: 'Checkout', icon: 'bolt', tint: 'lime', title: 'Checkout em modo TURBO.', body: '3 etapas, sem redirecionamento, sem fricção. Pix, cartão em até 12× e boleto no mesmo fluxo. 4× mais conversão e +98% de aprovação.', ai: 'Anti-Fraude IA+ analisando cada pedido em tempo real', img: '/img/checkout-dash.png', alt: 'Checkout TURBO da Unbox', href: '#checkout' },
  { key: 'assinatura', label: 'Assinatura', icon: 'repeat', tint: 'lavender', title: 'Recorrência que nasce no carrinho.', body: 'Assinatura 100% nativa, da página de produto ao checkout. Múltiplas frequências, gestão de falhas automática e cohort de LTV.', ai: 'Planos e regras de assinatura criados por texto, via MCP', img: '/img/assinatura2.png', alt: 'Assinatura nativa no carrinho', href: '#recorrencia' },
  { key: 'pay', label: 'Unbox Pay', icon: 'card', tint: 'mint', title: 'Pagamento nativo, com as melhores taxas.', body: 'Gateway próprio com 98% de aprovação, multi provedores e retentativa automática. 1% no Pix e cartão a partir de 2,99%, sem taxa de saque.', ai: 'Gateway turbinado por AI para aprovar mais e custar menos', mock: 'pay', href: '#planos' },
  { key: 'ai', label: 'Unbox AI', icon: 'sparkle', tint: 'lavender', title: 'A loja começa com um comando.', body: 'O Unbox CLI gera o storefront com a sua marca aplicada. O MCP opera catálogo, pedidos e campanhas por texto. Agentes cuidam de branding, CRO, SEO e deploy.', ai: 'CLI público no npm · funciona com Claude, ChatGPT e Cursor', mock: 'ai', href: '#cli' },
]

const GROUPS = [
  { id: 'loja', tint: 'sky', icon: 'layout', tab: 'Loja e operação', eye: 'SUA LOJA E SUA OPERAÇÃO',
    title: 'A vitrine e o back-office no mesmo painel.',
    body: 'Layouts customizáveis com prévia ao vivo, promoções que você monta em minutos, frete calculado dentro do checkout e os números que importam. Sem app externo, sem planilha e sem BI à parte.',
    subs: [
      { icon: 'layout', t: 'Loja virtual', feats: ['Editor com prévia desktop e mobile', 'Header, menus, páginas e footer', 'SEO por página'] },
      { icon: 'tag', t: 'Promoções e bundles', feats: ['Brinde no carrinho por faixa de valor', 'Bundles e combos nativos', 'Cupons com relatório de vendas'] },
      { icon: 'truck', t: 'Envios e ERP', feats: ['Frete calculado no checkout', 'Intelipost, Correios e Total Express', 'Pedidos e NFs pendentes do ERP'] },
      { icon: 'chart', t: 'Dados e insights', feats: ['Curva ABC e cobertura de estoque', 'Clientes e recompra', 'Carrinhos abandonados'] },
    ],
    ai: { h: 'Da vitrine ao estoque, por texto', d: 'O agente de Branding personaliza a loja antes de publicar. Depois, catálogo, preço, estoque e campanha saem de uma frase — a AI prepara, você confirma.' },
    link: { href: '/recursos', t: 'Ver recursos da plataforma' }, visual: 'store' },

  { id: 'checkout', tint: 'lime', icon: 'bolt', tab: 'Conversão', eye: 'SUA CONVERSÃO',
    title: 'O checkout que mais converte no Brasil.',
    body: 'Nativo, transparente e em 3 etapas, sem redirecionamento — com o pagamento na mesma casa. 4× mais conversão, +98% de aprovação e as melhores taxas de cartão do e-commerce.',
    subs: [
      { icon: 'bolt', t: 'Checkout TURBO', feats: ['3 etapas, sem redirecionamento', 'Order Bump e Upsell', 'Carrinho pronto vendido por link'] },
      { icon: 'card', t: 'Unbox Pay', feats: ['1% no Pix · cartão a partir de 2,99%', 'Antifraude com análise ativa', 'Sem taxa de saque'] },
    ],
    ai: { h: 'Anti-Fraude IA+ em cada pedido', d: 'Análise e cruzamento de dados em tempo real, com retentativa inteligente entre provedores. Aprova mais, bloqueia fraude e protege o seu caixa.' },
    link: { href: '/checkout', t: 'Conhecer o Checkout TURBO' }, visual: 'checkout' },

  { id: 'recorrencia', tint: 'lavender', icon: 'repeat', tab: 'Recorrência', eye: 'SUA RECORRÊNCIA',
    title: 'Vender de novo para quem já comprou.',
    body: 'Assinatura que nasce no próprio carrinho e uma rede de creators ligada ao checkout. Duas formas de transformar a primeira venda em receita que volta todo mês.',
    subs: [
      { icon: 'repeat', t: 'Assinatura nativa', feats: ['Assina direto no carrinho', 'Upsell e cancelamento integrados', 'Previsão de estoque pelas assinaturas'] },
      { icon: 'users', t: 'Creators', feats: ['Base de creators pronta', 'Rastreamento nativo no checkout', 'Você só paga quando vende'] },
    ],
    math: { a: '25–40%', al: 'do faturamento vai para mídia paga', b: '~15%', bl: 'de custo total por venda com creators Unbox' },
    ai: { h: 'Planos e resultados por texto', d: 'Crie regras de assinatura pela sua AI, via MCP — ela prepara, você confirma. E pergunte quem vendeu mais no mês: ela lê os pedidos e responde.' },
    link: { href: '/assinatura', t: 'Conhecer a Assinatura' }, visual: 'sub' },
]

/* Transcrição do wizard real (README do @unbox-plus/cli). Valores de exemplo. */
const CLI_LINES = [
  { k: 'q', t: 'Nome da pasta/projeto', v: 'minha-marca' },
  { k: 'q', t: 'Nome de exibição da loja', v: 'Minha Marca' },
  { k: 'q', t: 'Cor primária (hex)', v: '#8F28F6' },
  { k: 'q', t: 'Cor de destaque/CTA (hex)', v: '#1FBF5A' },
  { k: 'q', t: 'Site atual da marca', v: 'minhamarca.com.br' },
  { k: 'q', t: 'Instagram da marca', v: '@minhamarca' },
  { k: 'q', t: 'Objetivo da loja em uma frase', v: 'clube de café por assinatura' },
  { k: 'q', t: 'Estilo visual', v: 'Editorial (sugerido pelo objetivo)' },
  { k: 'q', t: 'Já tem as credenciais da loja?', v: 'não, subir em modo mockup' },
  { k: 'q', t: 'Checkout', v: 'padrão hospedado da Unbox' },
  { k: 'ok', t: 'storefront gerado: catálogo, carrinho, checkout e área do cliente' },
  { k: 'ok', t: 'briefing salvo em marca/briefing.json' },
  { k: 'cmd', t: 'cd minha-marca && claude' },
  { k: 'ai', t: 'Agente de Branding: vamos personalizar antes de você ver a loja.' },
]
const ESTILOS = [
  { t: 'Essencial', d: 'Completo e equilibrado.' },
  { t: 'Promocional', d: 'Oferta em primeiro plano.' },
  { t: 'Editorial', d: 'Clube, assinatura, tipografia de revista.' },
  { t: 'Boutique', d: 'Minimal premium.' },
]
const GERA = ['Next.js 15', 'Tailwind v4', 'Catálogo', 'Carrinho', 'Checkout', 'Área do cliente com login OTP', 'Assinaturas', 'PWA', 'SEO e dados estruturados', 'Editor visual por chat e painel']
/* Agentes do pacote @unbox-plus/cli 0.21.6, na ordem recomendada pelo MANAGER.md. */
const AGENTES = [
  { n: '15', t: 'Branding', d: 'Conduz o briefing e personaliza a loja antes de você ver a versão padrão.' },
  { n: '16', t: 'QA Visual', d: 'O gate de pronto: todo frame visto e avaliado antes de chegar ao cliente.' },
  { n: '13', t: 'CRO', d: '10 módulos: prova social, frete grátis, upsell, kits, brindes, sticky CTA e mais.' },
  { n: '14', t: 'SEO', d: 'Breadcrumbs, FAQ schema, Open Graph por produto e títulos por página.' },
  { n: '17', t: 'AEO', d: 'Prepara a loja para ser citada por ChatGPT, Claude, Perplexity e AI Overviews.' },
  { n: '12', t: 'Deploy', d: 'Da prévia ao ar, com o checklist de publicação resolvido.' },
]

/* Painel Unbox — áreas reais do admin. Telas ilustrativas. */
const PAINEL = [
  { key: 'passo', label: 'Próximo passo', icon: 'sparkle', beta: true, title: 'Da ideia de campanha ao passo a passo.', body: 'Escreva o que quer fazer — “Dia das Mães com brinde” — ou escolha um caminho: aumentar conversão, aumentar ticket médio ou montar a campanha passo a passo com cupom, brinde, kit, frete e Pix.', feats: ['Assistente de campanhas no Painel (beta)', 'Caminhos para conversão e ticket médio', 'Cupom, brinde, kit, frete e Pix'] },
  { key: 'dados', label: 'Dados', icon: 'chart', title: 'Receita, recompra e estoque sem planilha.', body: 'KPIs globais, clientes e recompra e KPIs de produtos num dashboard só — com relatórios de pedidos, cupons e carrinhos abandonados para exportar.', feats: ['KPIs globais em tempo real', 'Curva ABC e catálogo parado', 'Relatório de carrinhos abandonados'] },
  { key: 'assinaturas', label: 'Assinaturas', icon: 'repeat', title: 'MRR, churn e erros sob controle.', body: 'KPIs de assinatura, relatório de assinantes e uma fila de assinaturas com erro para recuperar. E a previsão de estoque calculada a partir das próximas cobranças.', feats: ['KPIs de assinatura', 'Assinaturas com erro', 'Previsão de estoque'] },
  { key: 'carrinho', label: 'Carrinho por link', icon: 'link', title: 'Um carrinho pronto, vendido por link.', body: 'Monte o carrinho no Painel, defina validade e compartilhe. Funciona no WhatsApp, no direct e com creators — e cada link mostra quantas vendas gerou.', feats: ['Carrinho Unbox com validade', 'Vendas por link', 'Link PagEnvie para cobranças avulsas'] },
  { key: 'personalizacao', label: 'Personalização', icon: 'layout', title: 'Edite a loja vendo a loja.', body: 'Barra de anúncio, header, menus, páginas, footer e checkout com prévia desktop e mobile lado a lado. SEO geral e por página no mesmo menu.', feats: ['Prévia desktop e mobile', 'Header, menus e footer', 'SEO por página'] },
]

const CMP_COLS = ['Unbox', 'Shopify', 'Nuvemshop', 'Wake', 'VTEX']
/* Legenda: 'y' nativo · 'p' via app/módulo/parceiro · 'n' não oferece.
   Toda célula de concorrente precisa de validação do time antes de ir ao ar. */
const CMP_ROWS = [
  { t: 'Loja criada por AI', d: 'Do zero por briefing, importando do Figma ou migrando de outra plataforma.', v: ['y', 'n', 'n', 'n', 'n'] },
  { t: 'Operar por texto na sua AI', d: 'Servidor MCP aberto: catálogo, pedidos e campanhas pelo Claude, ChatGPT ou Cursor.', v: ['y', 'p', 'n', 'n', 'n'], note: 'Shopify tem assistente próprio no admin' },
  { t: 'Agentes de CRO, SEO e AEO', d: 'Embarcados no projeto da loja, rodam quando você quiser.', v: ['y', 'n', 'n', 'n', 'n'] },
  { t: 'Bundles e combos nativos', d: 'Kits com desconto progressivo montados no painel, sem instalar nada.', v: ['y', 'p', 'p', 'p', 'p'] },
  { t: 'Order Bump e Upsell no checkout', d: 'Oferta adicional dentro do próprio fluxo de pagamento.', v: ['y', 'p', 'p', 'p', 'p'] },
  { t: 'Assinatura e recorrência', d: 'Do produto ao checkout, sem depender de app de terceiro.', v: ['y', 'p', 'p', 'p', 'p'] },
  { t: 'Checkout e gateway na mesma casa', d: 'Checkout de 3 etapas e pagamento próprio, sem integração externa.', v: ['y', 'p', 'y', 'p', 'p'], note: 'Shopify Payments não opera no Brasil: gateway via parceiro' },
  { t: 'Cobrança e suporte em real', d: 'Mensalidade em BRL e equipe brasileira acompanhando a migração.', v: ['y', 'n', 'y', 'y', 'y'], note: 'Shopify precifica em US$ no Brasil' },
]

const INTEGRATIONS = [
  { g: 'Canais de venda', items: [{ n: 'Instagram Shopping', k: 'instagram' }, { n: 'Facebook & Meta', k: 'meta' }, { n: 'WhatsApp', k: 'whatsapp' }, { n: 'Google Shopping', k: 'google' }] },
  { g: 'Operação e logística', items: [{ n: 'Bling', k: 'bling' }, { n: 'Intelipost', k: 'intelipost' }, { n: 'Correios', k: 'correios' }, { n: 'Total Express', k: 'totalexpress' }] },
  { g: 'Rastreio e dados', items: [{ n: 'Google Analytics', k: 'ga' }, { n: 'Tag Manager', k: 'gtm' }, { n: 'TikTok', k: 'tiktok' }, { n: 'Pinterest', k: 'pinterest' }] },
  { g: 'AI (via MCP e CLI)', items: [{ n: 'Claude', k: 'claude' }, { n: 'ChatGPT', k: 'openai' }, { n: 'Cursor', k: 'cursor' }, { n: 'Claude Code', k: 'claude' }, { n: 'Figma', k: 'figma' }] },
]

const CASES = [
  { name: 'Oddie Supply', seg: 'Alimentos funcionais', logo: '/img/cases/logo-oddie.webp', before: '/img/cases/case-oddie-antes.jpg', after: '/img/cases/case-oddie-depois.jpg', note: 'Energia e hidratação em pó. A loja inteira foi remontada em torno de um produto só e de uma jornada de assinatura.' },
  { name: 'Pamela Concept', seg: 'Cuidado capilar', logo: '/img/cases/logo-pamela.png', dark: true, before: '/img/cases/case-pamela-antes.jpg', after: '/img/cases/case-pamela-depois.jpg', note: 'Cada problema (queda, caspa, brilho) virou um caminho claro dentro da loja, em vez de uma prateleira de frascos.' },
  { name: 'Badia', seg: 'Temperos e especiarias', logo: '/img/cases/logo-badia.svg', before: '/img/cases/case-badia-antes.jpg', after: '/img/cases/case-badia-depois.jpg', note: 'Catálogo enorme. O desafio foi fazer centenas de SKUs virarem uma jornada simples de comprar.' },
]

const METRICS = [
  { num: 15, prefix: '+', suffix: ' mil', label: 'lojas cadastradas na Unbox' },
  { num: 5.9, prefix: '+', suffix: '×', label: 'crescimento médio de vendas', decimals: 1 },
  { num: 4, prefix: '', suffix: '×', label: 'mais conversão com o Checkout TURBO' },
  { num: 98, prefix: '', suffix: '%', label: 'de aprovação no Unbox Pay' },
]

const MARCAS = [
  { name: 'Bhava', logo: '/img/home7/marca-bhava.png', h: 22 }, { name: 'Alter Nativ', logo: '/img/home7/marca-alternativ.png', h: 34 },
  { name: 'Sunrize', logo: '/img/home7/marca-sunrize.png', h: 24 }, { name: 'Wish', logo: '/img/home7/marca-wish.png', h: 34 },
  { name: 'Pudim Beauty', logo: '/img/home7/marca-pudim.png', h: 34 }, { name: 'Badia', logo: '/img/badia-logo.svg', h: 30, dim: true },
  { name: 'Oddie Supply', logo: '/img/cases/logo-oddie.webp', h: 26, dim: true }, { name: 'Pamela Concept', logo: '/img/cases/logo-pamela.png', h: 26, dim: true },
]

const PLANOS = [
  { n: 'GO!', tag: 'Recomendado', feats: ['Template + 3 componentes', 'Home, categoria e produto padrão', 'Checkout Unbox + área logada', 'Módulo de assinatura', '3h de desenvolvimento por mês'], impl: 'R$ 11.390', mensal: '12x R$ 699,90', fee: '1,99%' },
  { n: 'Start', feats: ['Template + 10 componentes', 'Até 5 páginas de produto customizadas', 'Checkout + pedido realizado', 'Módulo de assinatura', '5h de desenvolvimento por mês'], impl: 'R$ 16.980', mensal: '12x R$ 1.027,90', fee: '1,50%' },
  { n: 'Collab', feats: ['Layout 100% customizável', 'Até 15 páginas de produto', 'Carrinho + checkout + pedido', 'Módulo de assinatura', '10h de desenvolvimento por mês'], impl: 'R$ 35.410', mensal: '12x R$ 2.599,90', fee: '1,00%' },
]
const TAXAS = [
  { r: 'Cartão à vista (30 dias)', a: '2,99%', b: '3,79%' },
  { r: 'Cartão de 2x a 6x', a: '3,79%', b: '4,29%' },
  { r: 'Cartão de 7x a 12x', a: '4,29%', b: '4,69%' },
  { r: 'Pix', a: '1,00%', b: '1,00%' },
  { r: 'Boleto', a: 'R$ 2,50', b: 'R$ 2,50' },
]

const FAQ = [
  { q: 'Como eu começo uma loja com AI?', a: 'Pelo Unbox CLI, que é público no npm. Com o Node.js instalado, rode ' + CLI_CMD + '. Ele pergunta nome, cores, site atual, Instagram, objetivo e estilo visual, e gera o storefront completo. Sem as credenciais da loja ainda, o projeto sobe em modo mockup para você ver tudo antes.' },
  { q: 'Preciso saber programar?', a: 'Não para operar. O único pré-requisito técnico é ter o Node.js instalado para rodar o comando. Depois, o agente de Branding conduz o briefing em português e personaliza a loja antes de você ver a versão padrão. CRO, SEO e deploy têm agentes próprios.' },
  { q: 'A AI inventa números ou avaliações na minha loja?', a: 'Não. A loja gerada não traz prova social falsa: sem avaliação real, o bloco simplesmente não aparece. E o comando unbox:honestidade lista qualquer número ou promessa que entrar sem lastro.' },
  { q: 'A AI vai mexer na minha loja sem eu saber?', a: 'Não. Leituras são diretas; qualquer escrita (preço, cupom, campanha, regra de assinatura) passa por duas etapas: preparar e confirmar. Tudo fica registrado.' },
  ...(SHOW_PLANOS ? [{ q: 'Quanto custa?', a: 'O plano GO! tem implementação de R$ 11.390, plano anual em 12x de R$ 699,90 e Unbox Fee de 1,99%. Start e Collab trazem mais componentes, páginas e horas de desenvolvimento, com fee de 1,50% e 1,00%.' }] : []),
  { q: 'A Unbox substitui a minha plataforma inteira?', a: 'Sim. Loja, checkout, pagamento, assinatura, promoções, creators, envios e dados são nativos e ficam no mesmo painel. Nossa equipe acompanha a migração com você.' },
  { q: 'Existe limite de produtos ou de visitas?', a: 'Não. Nenhum plano cobra a mais por acessos ou por catálogo: produtos e visitas ilimitados, com estabilidade de 1 a 1 milhão de visitantes.' },
]

function Icon({ name, size = 18 }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }
  switch (name) {
    case 'layout': return <svg {...p}><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M3 9h18M9 21V9" /></svg>
    case 'bolt': return <svg {...p}><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" /></svg>
    case 'card': return <svg {...p}><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M3 10h18M7 15h3" /></svg>
    case 'sparkle': return <svg {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" /></svg>
    case 'arrow': return <svg {...p}><path d="M7 17 17 7M8 7h9v9" /></svg>
    case 'check': return <svg {...p}><path d="m5 12 4 4L19 6" /></svg>
    case 'plus': return <svg {...p}><path d="M12 5v14M5 12h14" /></svg>
    case 'terminal': return <svg {...p}><path d="m5 7 5 5-5 5M12 17h7" /></svg>
    case 'repeat': return <svg {...p}><path d="M17 2v6h-6M7 22v-6h6" /><path d="M20 12a8 8 0 0 0-14-5M4 12a8 8 0 0 0 14 5" /></svg>
    case 'tag': return <svg {...p}><path d="M3 12V4h8l9 9-8 8-9-9Z" /><circle cx="7.5" cy="8.5" r="1.3" /></svg>
    case 'users': return <svg {...p}><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M21.5 20a6.5 6.5 0 0 0-4.5-6.2" /></svg>
    case 'truck': return <svg {...p}><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7z" /><circle cx="7" cy="18" r="1.8" /><circle cx="17" cy="18" r="1.8" /></svg>
    case 'chart': return <svg {...p}><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></svg>
    case 'link': return <svg {...p}><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" /><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" /></svg>
    case 'gift': return <svg {...p}><rect x="3" y="8" width="18" height="13" rx="2" /><path d="M3 12h18M12 8v13M12 8S10.5 3 8 3.8C6 4.5 7 8 12 8Zm0 0s1.5-5 4-4.2C18 4.5 17 8 12 8Z" /></svg>
    case 'megaphone': return <svg {...p}><path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1Z" /><path d="M15 9a3.5 3.5 0 0 1 0 6M18 6a8 8 0 0 1 0 12" /></svg>
    case 'monitor': return <svg {...p}><rect x="2.5" y="4" width="19" height="13" rx="2" /><path d="M8 21h8M12 17v4" /></svg>
    case 'phone': return <svg {...p}><rect x="6.5" y="2.5" width="11" height="19" rx="2.5" /><path d="M11 18h2" /></svg>
    case 'copy': return <svg {...p}><rect x="8" y="8" width="13" height="13" rx="2" /><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" /></svg>
    case 'quote': return <svg {...p}><path d="M9 7H5v6h4V7ZM9 13c0 2.5-1.5 4-4 4M19 7h-4v6h4V7ZM19 13c0 2.5-1.5 4-4 4" /></svg>
    default: return null
  }
}

function Logo({ light }) {
  return <a href="/" className={'h7-logo' + (light ? ' is-light' : '')} aria-label="Unbox"><img src={'/img/simbolo-unbox.png' + V} alt="" /><span>unbox</span></a>
}

const BRANDS_CREATE = [{ k: 'claude', name: 'Claude' }, { k: 'openai', name: 'OpenAI' }, { k: 'figma', name: 'Figma' }]
const BRANDS_MIGRATE = [{ k: 'shopify', name: 'Shopify' }, { k: 'nuvemshop', name: 'Nuvemshop' }, { k: 'woo', name: 'WooCommerce' }]

/* Logos oficiais em /public/img/brands. `wm` = arquivo já traz o nome (chip
   não repete o texto) e guarda a proporção largura/altura. */
const LOGOS = {
  claude: { f: 'claude.svg' }, figma: { f: 'figma.svg' }, shopify: { f: 'shopify.svg' },
  woo: { f: 'woocommerce.png' }, cursor: { f: 'cursor.svg' }, instagram: { f: 'instagram.svg' },
  whatsapp: { f: 'whatsapp.svg' }, meta: { f: 'meta.svg' }, google: { f: 'google.svg' },
  ga: { f: 'googleanalytics.svg' }, gtm: { f: 'googletagmanager.svg' }, openai: { f: 'openai.svg' },
  tiktok: { f: 'tiktok.svg' }, pinterest: { f: 'pinterest.svg' },
  nuvemshop: { f: 'nuvemshop.svg', wm: 4 }, bling: { f: 'bling.svg', wm: 2.06 },
  correios: { f: 'correios.svg', wm: 4.88 }, intelipost: { f: 'intelipost.svg', wm: 4.89 },
  totalexpress: { f: 'totalexpress.svg', wm: 2.57, hs: 1.3 },
}
function BrandMark({ k, size = 20 }) {
  const l = LOGOS[k]
  if (!l) return null
  const h = size * (l.hs || 1)
  return <img className="h7-lg" src={'/img/brands/' + l.f} alt="" aria-hidden="true" style={{ height: h, width: l.wm ? h * l.wm : h }} />
}
function BrandChip({ b, size = 20 }) {
  const wm = LOGOS[b.k] && LOGOS[b.k].wm
  return <span className="h7-blogo"><BrandMark k={b.k} size={size} />{!wm && <b>{b.name}</b>}</span>
}
function AiTag({ children = 'AI' }) { return <span className="h7-aitag"><Icon name="sparkle" size={11} />{children}</span> }

function CopyCmd({ dark }) {
  const [ok, setOk] = useState(false)
  const copy = () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(CLI_CMD)
      setOk(true); setTimeout(() => setOk(false), 1800)
    } catch (e) { setOk(false) }
  }
  return (
    <button type="button" className={'h7-cmd' + (dark ? ' is-dark' : '')} onClick={copy} aria-label="Copiar o comando do Unbox CLI">
      <span className="h7-cmd-p">$</span><code>{CLI_CMD}</code>
      <span className="h7-cmd-c"><Icon name={ok ? 'check' : 'copy'} size={14} />{ok ? 'Copiado' : 'Copiar'}</span>
    </button>
  )
}

/* O HTML do servidor já sai com o número final (sem JS nunca aparece "0").
   No cliente, zera antes da seção ser revelada e conta ao entrar na tela. */
function useCountUp(target, decimals = 0, run) {
  const [val, setVal] = useState(target)
  const reduced = useRef(false)
  useEffect(() => {
    reduced.current = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    if (!reduced.current && !run) setVal(0)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!run) return
    if (reduced.current) { setVal(target); return }
    let raf; const t0 = performance.now(); const dur = 1400
    const tick = (t) => { const k = Math.min(1, Math.max(0, (t - t0) / dur)); const e = 1 - Math.pow(1 - k, 3); setVal(Number((target * e).toFixed(decimals))); if (k < 1) raf = requestAnimationFrame(tick) }
    raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf)
  }, [target, decimals, run])
  return val
}
function Metric({ m, run }) {
  const v = useCountUp(m.num, m.decimals || 0, run)
  const shown = (m.decimals ? v.toFixed(m.decimals) : Math.round(v)).toString().replace('.', ',')
  return <div className="h7-metric"><div className="h7-metric-n">{m.prefix}{shown}<span>{m.suffix}</span></div><div className="h7-metric-l">{m.label}</div></div>
}

/* ── Hero: painel com abas (conquistado na v6) ─────────────── */
function Showcase() {
  const [tab, setTab] = useState(0)
  const [prog, setProg] = useState(0)
  const paused = useRef(false); const pr = useRef(0)
  useEffect(() => {
    const id = setInterval(() => { if (paused.current) return; pr.current += 1 / 160; if (pr.current >= 1) { pr.current = 0; setTab((t) => (t + 1) % SHOW.length) } setProg(pr.current) }, 40)
    return () => clearInterval(id)
  }, [])
  useEffect(() => { const q = new URLSearchParams(window.location.search).get('tab'); if (q !== null) { paused.current = true; setTab(Math.min(SHOW.length - 1, Math.max(0, Number(q) || 0))) } }, [])
  const T = SHOW[tab]
  return (
    <div className={'h7-panel tint-' + T.tint} onMouseEnter={() => { paused.current = true }} onMouseLeave={() => { paused.current = false }}>
      <div className="h7-ptabs" role="tablist">
        {SHOW.map((t, i) => (
          <button key={t.key} role="tab" aria-selected={i === tab} className={'h7-ptab' + (i === tab ? ' is-on' : '')} onClick={() => { pr.current = 0; setProg(0); setTab(i) }}>
            <span className="h7-ptab-ico"><Icon name={t.icon} size={16} /></span><span className="h7-ptab-lbl">{t.label}</span>
            {i === tab && <i className="h7-ptab-prog" style={{ transform: `scaleX(${prog})` }} />}
          </button>
        ))}
      </div>
      <div className="h7-showcase" key={T.key}>
        <div className="h7-showcase-copy">
          <span className="h7-chip"><Icon name={T.icon} size={14} /> {T.label}</span>
          <h3>{T.title}</h3>
          <p>{T.body}</p>
          <div className="h7-showcase-ai"><AiTag /><span>{T.ai}</span></div>
          <a href={T.href} className="h7-textlink">Saiba mais <Icon name="arrow" size={16} /></a>
        </div>
        <div className={'h7-showcase-media' + (T.mock ? ' is-mock' : '')}>
          {T.img ? <img src={T.img} alt={T.alt} /> : <Mock kind={T.mock} />}
        </div>
      </div>
    </div>
  )
}

function Chat({ who, lines }) {
  return (
    <div className="h7-chat">
      <div className="h7-chat-h"><AiTag>Unbox MCP</AiTag><span>{who}</span></div>
      {lines.map((l, i) => <div className={'h7-bub ' + l.r} key={i}>{l.r !== 'u' && <Icon name="check" size={13} />}{l.t}</div>)}
    </div>
  )
}
function Mock({ kind }) {
  switch (kind) {
    case 'store': return (
      <div className="h7-mock h7-m-store">
        <div className="h7-m-phone"><div className="h7-phone-top" /><img src="/img/cases/case-oddie-depois.jpg" alt="Loja Oddie Supply na Unbox" /></div>
        <div className="h7-m-agents">
          <div className="h7-m-agents-h"><AiTag>Agentes</AiTag><span>embarcados no projeto da loja</span></div>
          {[['15 · Branding', 'briefing e personalização da marca'], ['13 · CRO', 'kits, brindes, upsell e frete grátis'], ['14 · SEO', 'dados estruturados por página'], ['12 · Deploy', 'da prévia ao ar']].map(([a, b]) => <div className="h7-m-agent" key={a}><Icon name="check" size={14} /><div><b>{a}</b><span>{b}</span></div></div>)}
        </div>
      </div>)
    case 'checkout': return (
      <div className="h7-mock h7-m-checkout">
        <div className="h7-m-frame"><img src="/img/ai-prova-checkout.png" alt="Checkout TURBO da Temperos Badia com cupom BRUNINHO10 aplicado" /></div>
        <div className="h7-m-float fl1"><AiTag>Anti-Fraude IA+</AiTag><b>Pedido aprovado</b><span>análise em tempo real</span></div>
        <div className="h7-m-float fl2"><b>3 etapas</b><span>sem redirecionamento</span></div>
      </div>)
    case 'pay': return (
      <div className="h7-mock h7-m-pay">
        <div className="h7-m-stat"><span>Aprovação</span><b>98%</b><em>multi provedores + retentativa</em></div>
        <div className="h7-m-stat"><span>Pix</span><b>1%</b><em>cartão a partir de 2,99%</em></div>
        <div className="h7-m-stat"><span>Saque</span><b>R$ 0</b><em>sem taxa de saque</em></div>
        <div className="h7-m-strip"><AiTag /><b>Antifraude com análise ativa</b><span>cartão, boleto e Pix integrados</span></div>
      </div>)
    case 'ai': return (
      <div className="h7-mock h7-m-ai">
        <div className="h7-term">
          <div className="h7-term-cmd"><span>$</span> {CLI_CMD}</div>
          <div className="h7-term-line">? Estilo visual › Editorial</div>
          <div className="h7-term-line">? Checkout › padrão hospedado da Unbox</div>
          <div className="h7-term-line ok">✓ storefront gerado com a sua marca</div>
        </div>
        <Chat who="você · Claude" lines={[{ r: 'u', t: 'cria o cupom VOLTA10 com 10% e frete grátis acima de R$ 150' }, { r: 'a', t: 'Plano: VOLTA10 · 10% · frete grátis ≥ R$ 150. Confirmar?' }, { r: 'u', t: 'confirma' }, { r: 'a ok', t: 'Criado e publicado.' }]} />
      </div>)
    case 'sub': return (
      <div className="h7-mock h7-m-shot">
        <img className="h7-m-shot-img" src="/img/assinatura2.png" alt="Assinatura nativa no carrinho da Unbox" />
        <div className="h7-m-shot-float"><Chat who="você · Cursor" lines={[{ r: 'u', t: 'cria um plano de assinatura mensal com 15% de desconto para o Kit Cabelo' }, { r: 'a', t: 'Plano: mensal · 15% · Kit Cabelo. Confirmar?' }, { r: 'u', t: 'confirma' }, { r: 'a ok', t: 'Plano publicado no carrinho.' }]} /></div>
      </div>)
    default: return null
  }
}

/* ── Painel Unbox: telas ilustrativas das áreas reais do admin ── */
function PainelScreen({ kind }) {
  const bar = (t) => <div className="h7-pm-bar"><span className="h7-pm-dots"><i /><i /><i /></span><span>Painel Unbox · {t}</span></div>
  switch (kind) {
    case 'passo': return (
      <div className="h7-pm">{bar('Principal')}
        <div className="h7-pm-body">
          <div className="h7-pm-ask">
            <div className="h7-pm-ask-h"><Icon name="sparkle" size={15} /> Qual seu próximo passo para crescer? <em>BETA</em></div>
            <div className="h7-pm-input"><span>Dia das Mães com brinde</span><i><Icon name="arrow" size={14} /></i></div>
            <div className="h7-pm-paths"><span>Aumentar conversão</span><span>Aumentar ticket médio</span><span>Criar nova campanha</span></div>
          </div>
          <div className="h7-pm-plan">
            <div className="h7-pm-plan-h"><AiTag>Passo a passo</AiTag><span>monte e revise antes de ativar</span></div>
            {[['gift', 'Brinde no carrinho', 'a partir de um valor de compra'], ['megaphone', 'Barra de anúncio', 'Dia das Mães: ganhe um brinde'], ['tag', 'Cupom da campanha', 'com relatório de vendas'], ['link', 'Carrinho Unbox', 'kit pronto para o WhatsApp']].map(([ic, t, d]) => (
              <div className="h7-pm-row" key={t}><span className="h7-pm-ico"><Icon name={ic} size={15} /></span><div><b>{t}</b><span>{d}</span></div><Icon name="check" size={15} /></div>
            ))}
            <div className="h7-pm-btn">Revisar campanha</div>
          </div>
        </div>
      </div>)
    case 'dados': return (
      <div className="h7-pm">{bar('Dashboard')}
        <div className="h7-pm-body">
          <div className="h7-pm-kpis">
            {[['GMV', 'R$ 184 mil', '+12%'], ['Pedidos', '1.284', '+8%'], ['Ticket médio', 'R$ 143', '+4%'], ['Recompra', '31%', '+3 p.p.']].map(([l, v, d]) => <div className="h7-pm-kpi" key={l}><span>{l}</span><b>{v}</b><em>{d}</em></div>)}
          </div>
          <div className="h7-pm-card">
            <div className="h7-pm-card-h"><b>KPIs de Produtos</b><span>últimos 30 dias</span></div>
            {[['Curva A', 'produtos que puxam a receita', 78], ['Cobertura de estoque', 'dias até acabar', 54], ['Catálogo parado', 'sem venda no período', 18]].map(([t, d, w]) => <div className="h7-pm-meter" key={t}><div><b>{t}</b><span>{d}</span></div><i><span style={{ width: w + '%' }} /></i></div>)}
          </div>
        </div>
      </div>)
    case 'assinaturas': return (
      <div className="h7-pm">{bar('Assinaturas')}
        <div className="h7-pm-body">
          <div className="h7-pm-kpis is-3">
            {[['MRR', 'R$ 42 mil', '+6%'], ['Assinantes ativos', '1.212', '+48'], ['Churn', '3,4%', '−0,6 p.p.']].map(([l, v, d]) => <div className="h7-pm-kpi" key={l}><span>{l}</span><b>{v}</b><em>{d}</em></div>)}
          </div>
          <div className="h7-pm-split">
            <div className="h7-pm-card">
              <div className="h7-pm-card-h"><b>Assinaturas com erro</b><span>esta semana</span></div>
              <div className="h7-pm-err"><b>18</b><span>com falha de cobrança</span></div>
              <div className="h7-pm-err ok"><b>11</b><span>já recuperadas</span></div>
            </div>
            <div className="h7-pm-card">
              <div className="h7-pm-card-h"><b>Previsão de estoque</b><span>próximas cobranças</span></div>
              {[['Kit Mensal', 82], ['Refil 500 g', 57], ['Kit Trimestral', 31]].map(([t, w]) => <div className="h7-pm-meter is-tight" key={t}><div><b>{t}</b></div><i><span style={{ width: w + '%' }} /></i></div>)}
            </div>
          </div>
        </div>
      </div>)
    case 'carrinho': return (
      <div className="h7-pm">{bar('Carrinho Unbox')}
        <div className="h7-pm-body">
          <div className="h7-pm-card is-flush">
            <div className="h7-pm-table">
              <div className="h7-pm-tr is-head"><span>Título</span><span>Valor total</span><span>Vendas</span><span>Status</span></div>
              {[['Kit Dia das Mães', 'R$ 289,90', '42'], ['Reposição mensal', 'R$ 149,00', '18'], ['Kit creator', 'R$ 219,70', '9']].map(([t, v, n]) => <div className="h7-pm-tr" key={t}><span><b>{t}</b></span><span>{v}</span><span>{n}</span><span className="h7-pm-on">Ativo</span></div>)}
            </div>
          </div>
          <div className="h7-pm-share">
            <div><b>Kit Dia das Mães</b><span>validade: período ilimitado</span></div>
            <span className="h7-pm-share-b"><Icon name="copy" size={14} /> Copiar link</span>
            <span className="h7-pm-share-b is-wa"><BrandMark k="whatsapp" size={15} /> Enviar no WhatsApp</span>
          </div>
        </div>
      </div>)
    case 'personalizacao': return (
      <div className="h7-pm">{bar('Personalização')}
        <div className="h7-pm-body h7-pm-editor">
          <div className="h7-pm-menu">
            {[['Template'], ['Barra de anúncio'], ['Header', 1], ['Menus', 1], ['Páginas'], ['Footer', 1], ['Checkout', 1], ['SEO por página']].map(([t, novo], i) => <span key={t} className={i === 2 ? 'is-on' : ''}>{t}{novo && <em>Novo</em>}</span>)}
          </div>
          <div className="h7-pm-preview">
            <div className="h7-pm-preview-h"><span className="h7-pm-pub"><i /> Publicado</span><span className="h7-pm-dev"><Icon name="monitor" size={15} /><Icon name="phone" size={15} /></span></div>
            <img src="/img/loja-olea.png" alt="Prévia da loja Olea no editor da Unbox" />
          </div>
        </div>
      </div>)
    default: return null
  }
}
function Painel() {
  const [tab, setTab] = useState(0)
  useEffect(() => { const q = new URLSearchParams(window.location.search).get('painel'); if (q !== null) setTab(Math.min(PAINEL.length - 1, Math.max(0, Number(q) || 0))) }, [])
  const P = PAINEL[tab]
  return (
    <div className="h7-painel">
      <div className="h7-painel-tabs" role="tablist">
        {PAINEL.map((t, i) => (
          <button key={t.key} role="tab" aria-selected={i === tab} className={'h7-painel-tab' + (i === tab ? ' is-on' : '')} onClick={() => setTab(i)}>
            <Icon name={t.icon} size={15} />{t.label}{t.beta && <em>Beta</em>}
          </button>
        ))}
      </div>
      <div className="h7-painel-grid" key={P.key}>
        <div className="h7-painel-copy">
          <h3>{P.title}</h3>
          <p>{P.body}</p>
          <ul>{P.feats.map((f) => <li key={f}><Icon name="check" size={15} />{f}</li>)}</ul>
        </div>
        <div className="h7-painel-screen"><PainelScreen kind={P.key} /></div>
      </div>
    </div>
  )
}

/* ── Antes/depois com divisor (classes h7-ba, sem colidir com a tabela) ── */
function Compare({ c }) {
  const [x, setX] = useState(50)
  return (
    <div className="h7-case">
      <div className="h7-case-head"><img src={c.logo} alt={c.name} className={'h7-case-logo' + (c.dark ? ' is-dark' : '')} /><span className="h7-case-seg">{c.seg}</span></div>
      <div className="h7-ba" style={{ '--x': x + '%' }}>
        <img src={c.before} alt={`${c.name} antes`} className="h7-ba-img" />
        <div className="h7-ba-after"><img src={c.after} alt={`${c.name} depois`} className="h7-ba-img" /></div>
        <div className="h7-ba-bar"><i /></div>
        <span className="h7-ba-tag l">Antes</span><span className="h7-ba-tag r">Depois · Unbox</span>
        <input type="range" min="2" max="98" value={x} onChange={(e) => setX(Number(e.target.value))} aria-label="Comparar antes e depois" />
      </div>
      <p className="h7-case-note">{c.note}</p>
    </div>
  )
}

export default function HomeV7() {
  const [faq, setFaq] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)
  const [metricsOn, setMetricsOn] = useState(false)
  const [active, setActive] = useState(GROUPS[0].id)
  const metricsRef = useRef(null)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8)
    on(); window.addEventListener('scroll', on, { passive: true })
    const qs = new URLSearchParams(window.location.search)
    const only = qs.get('only')
    if (only) {
      const root = document.getElementById('hv7')
      Array.from(root.children).forEach((el) => { if (el.id !== only && !el.classList.contains('h7-nav')) el.style.display = 'none' })
    }
    if (qs.get('rv') || only) { document.querySelectorAll('#hv7 [data-rv]').forEach((el) => el.classList.add('h7-in')); setMetricsOn(true) }
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => {
    const els = document.querySelectorAll('#hv7 [data-rv]')
    if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('h7-in')); setMetricsOn(true); return }
    const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('h7-in'); io.unobserve(en.target) } }), { threshold: 0.12 })
    els.forEach((e) => io.observe(e))
    let mo
    if (metricsRef.current) { mo = new IntersectionObserver((es) => { if (es[0].isIntersecting) { setMetricsOn(true); mo.disconnect() } }, { threshold: 0.2 }); mo.observe(metricsRef.current) }
    const fb = setTimeout(() => setMetricsOn(true), 1800)
    const to = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) setActive(en.target.id) }), { rootMargin: '-35% 0px -55% 0px' })
    document.querySelectorAll('#hv7 [data-prod]').forEach((e) => to.observe(e))
    return () => { io.disconnect(); mo && mo.disconnect(); to.disconnect(); clearTimeout(fb) }
  }, [])

  const NAV = [['#plataforma', 'Plataforma'], ['#cli', 'Unbox CLI'], ['#painel', 'Painel'], ['#cases', 'Cases'], ...(SHOW_PLANOS ? [['#planos', 'Planos']] : [])]

  return (
    <>
      <Head>
        <title>Unbox — AI Commerce: seu ecommerce no automático</title>
        <meta name="description" content="Crie, gerencie e escale sua marca com AI. Loja gerada pelo Unbox CLI em um comando, Checkout TURBO, assinatura nativa, Unbox Pay e um painel que sugere o próximo passo." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </Head>

      <div id="hv7">
        <a className="h7-announce" href="#cli"><span className="h7-announce-dot" /> Novo: o Unbox CLI é público no npm. Crie sua loja com um comando. <b>Ver como →</b></a>

        <header className={'h7-nav' + (scrolled ? ' is-scrolled' : '')}>
          <div className="h7-wrap h7-nav-in">
            <Logo />
            <nav className="h7-links">{NAV.map(([h, t]) => <a key={h} href={h}>{t}</a>)}</nav>
            <div className="h7-nav-cta">
              <a href={URLS.login} className="h7-btn h7-btn-ghost">Login</a>
              <a href="/ai-unbox" className="h7-btn h7-btn-dark">Criar minha loja com AI</a>
              <button className="h7-burger" aria-label="Menu" onClick={() => setMenu((v) => !v)}><span /><span /><span /></button>
            </div>
          </div>
          {menu && <div className="h7-sheet">{NAV.map(([h, t]) => <a key={h} href={h} onClick={() => setMenu(false)}>{t}</a>)}<a href="/ai-unbox" className="h7-btn h7-btn-dark">Criar minha loja com AI</a></div>}
        </header>

        {/* HERO */}
        <section className="h7-hero" id="hero">
          <div className="h7-wrap">
            <div className="h7-hero-copy" data-rv>
              <h1><em>AI Commerce</em><br />Seu ecommerce no automático</h1>
              <p className="h7-lead">Crie, gerencie e escale sua marca com AI.</p>
              <div className="h7-cta-row">
                <a href="/ai-unbox" className="h7-btn h7-btn-dark h7-btn-lg">Criar minha loja com AI</a>
                <a href="#plataforma" className="h7-btn h7-btn-white h7-btn-lg">Conhecer a plataforma</a>
              </div>
              <div className="h7-hero-cmd"><CopyCmd /></div>
              <p className="h7-micro">Migração acompanhada · Produtos e visitas ilimitados · Suporte humano</p>
            </div>
            <div className="h7-logos" data-rv>
              <div className="h7-logos-g">
                <span className="h7-logos-l">Você cria com</span>
                <div className="h7-logos-row">{BRANDS_CREATE.map((b) => <BrandChip b={b} key={b.k} />)}</div>
              </div>
              <div className="h7-logos-g">
                <span className="h7-logos-l">Ou migra de</span>
                <div className="h7-logos-row">{BRANDS_MIGRATE.map((b) => <BrandChip b={b} key={b.k} />)}</div>
              </div>
            </div>
            <div data-rv><Showcase /></div>
          </div>
        </section>

        {/* PROVA */}
        <section className="h7-sec h7-sec-alt h7-prova" id="prova" ref={metricsRef}>
          <div className="h7-wrap">
            <div className="h7-head h7-center" data-rv>
              <span className="h7-eye"><i className="h7-dot" />QUEM ESTÁ COM A UNBOX</span>
              <h2>A infraestrutura por trás das principais marcas D2C do Brasil.</h2>
            </div>
            <div className="h7-marcas" data-rv>
              {MARCAS.map((m) => <img key={m.name} src={m.logo} alt={m.name} className={m.dim ? 'is-dim' : ''} style={{ height: m.h }} />)}
            </div>
            <div className="h7-metrics-grid" data-rv>{METRICS.map((m) => <Metric key={m.label} m={m} run={metricsOn} />)}</div>
            <div className="h7-backers" data-rv>
              <div className="h7-backer is-wide">
                <span className="h7-backer-l">Apoiada por</span>
                <div className="h7-backer-imgs"><img src="/img/home7/investidores-a.png" alt="Maya Capital, Bertha Capital e Century Oak Ventures" /><img src="/img/home7/investidores-b.png" alt="GV Angels, WeImpact e Latitud" /></div>
              </div>
              <div className="h7-backer">
                <span className="h7-backer-l">Acelerada por</span>
                <div className="h7-backer-imgs"><img src="/img/home7/aceleradoras.png" alt="Endeavor ScaleUp, Meta e Plug and Play" /></div>
              </div>
            </div>
            <figure className="h7-press" data-rv>
              <span className="h7-press-ico"><Icon name="quote" size={20} /></span>
              <blockquote>Startup capta R$ 15 milhões para evitar que marcas de saúde e beleza colapsem.</blockquote>
              <figcaption>Exame</figcaption>
            </figure>
          </div>
        </section>

        {/* CASES */}
        <section className="h7-sec" id="cases">
          <div className="h7-wrap">
            <div className="h7-head h7-center" data-rv>
              <span className="h7-eye"><i className="h7-dot" />CASES REAIS</span>
              <h2>Marcas que viraram a chave com a Unbox.</h2>
            </div>
            <div className="h7-spot" data-rv>
              <div className="h7-spot-who">
                <img src="/img/home7/camila-pudim.png" alt="Camila Pudim, fundadora da Pudim Beauty" />
                <div><b>Camila Pudim</b><span>Fundadora, Pudim Beauty</span></div>
              </div>
              <div className="h7-spot-main">
                <h3>O volume de acesso de um ano em 3 meses.</h3>
                <p>Canal digital lançado com jornada de compra bem definida, checkout estável para absorver picos de acesso e integração com os canais de aquisição para trazer tráfego qualificado.</p>
              </div>
              <div className="h7-spot-stats">
                <div><b>3 meses</b><span>para o volume de acesso de um ano</span></div>
                <div><b>+2,5%</b><span>de conversão, acima da média do mercado de beleza</span></div>
              </div>
            </div>
            <p className="h7-cases-l" data-rv>Arraste para comparar como a loja era e como ficou.</p>
            <div className="h7-cases" data-rv>{CASES.map((c) => <Compare c={c} key={c.name} />)}</div>
          </div>
        </section>

        {/* CLI */}
        <section className="h7-sec h7-band" id="cli">
          <div className="h7-wrap">
            <div className="h7-head h7-center" data-rv>
              <span className="h7-eye light"><i className="h7-dot" />UNBOX CLI · PÚBLICO NO NPM</span>
              <h2>Sua loja começa com um comando.</h2>
              <p>O Unbox CLI gera um storefront Next.js completo, integrado à API da Unbox e já com a sua marca aplicada. Depois, a sua AI assume: o agente de Branding conduz o briefing e personaliza tudo antes de você ver a loja padrão.</p>
              <div className="h7-band-cmd"><CopyCmd dark /><a href={NPM_URL} target="_blank" rel="noopener noreferrer" className="h7-textlink light">Ver no npm <Icon name="arrow" size={15} /></a></div>
            </div>
            <div className="h7-cli-grid" data-rv>
              <div className="h7-cli-term">
                <div className="h7-cli-term-h"><i /><i /><i /><span>terminal</span></div>
                <div className="h7-cli-term-b">
                  <div className="h7-tl cmd"><span>$</span> {CLI_CMD}</div>
                  {CLI_LINES.map((l, i) => (
                    <div key={i} className={'h7-tl ' + l.k} style={{ animationDelay: `${0.3 + i * 0.22}s` }}>
                      {l.k === 'q' && <><span className="q">?</span> {l.t} <span className="v">› {l.v}</span></>}
                      {l.k === 'ok' && <>✓ {l.t}</>}
                      {l.k === 'cmd' && <><span>$</span> {l.t}</>}
                      {l.k === 'ai' && <><Icon name="sparkle" size={13} /> {l.t}</>}
                    </div>
                  ))}
                </div>
              </div>
              <div className="h7-cli-side">
                <div className="h7-cli-block">
                  <span className="h7-cli-l">4 estilos de partida</span>
                  <div className="h7-estilos">{ESTILOS.map((e) => <div className="h7-estilo" key={e.t}><b>{e.t}</b><span>{e.d}</span></div>)}</div>
                </div>
                <div className="h7-cli-block">
                  <span className="h7-cli-l">O que já sai pronto</span>
                  <div className="h7-gera">{GERA.map((g) => <span key={g}>{g}</span>)}</div>
                </div>
              </div>
            </div>
            <div className="h7-agentes" data-rv>
              {AGENTES.map((a) => <div className="h7-agente" key={a.t}><span className="h7-agente-n">{a.n}</span><b>{a.t}</b><p>{a.d}</p></div>)}
            </div>
            <div className="h7-band-foot" data-rv>
              <span><Icon name="check" size={15} /> Sem credenciais ainda? O projeto sobe em modo mockup.</span>
              <span><Icon name="check" size={15} /> O unbox:honestidade aponta qualquer número ou promessa sem lastro.</span>
              <span><Icon name="check" size={15} /> A loja nasce editável, por chat e painel visual.</span>
              <span><Icon name="check" size={15} /> Depois, opere por texto via MCP.</span>
            </div>
          </div>
        </section>

        {/* PLATAFORMA */}
        <div id="plataforma">
          <section className="h7-sec h7-plat-head">
            <div className="h7-wrap">
              <div className="h7-head h7-center" data-rv>
                <span className="h7-eye"><i className="h7-dot" />A PLATAFORMA</span>
                <h2>Uma plataforma. Tudo para vender, receber, entregar e crescer.</h2>
                <p>Sem stack de apps quebrando, sem integração manual. Loja, checkout, pagamento, assinatura e creators nascem conectados desde o primeiro dia.</p>
              </div>
            </div>
          </section>
          <div className="h7-tour">
            <div className="h7-wrap h7-tour-in">
              <span className="h7-tour-l">A plataforma</span>
              <div className="h7-tour-tabs">{GROUPS.map((p) => <a href={'#' + p.id} className={'h7-tab' + (active === p.id ? ' is-on' : '')} key={p.id}><span className="h7-tab-ico"><Icon name={p.icon} size={13} /></span>{p.tab}</a>)}</div>
            </div>
          </div>
          {GROUPS.map((p, i) => (
            <section className={'h7-prod tint-' + p.tint + (i % 2 ? ' is-rev' : '')} id={p.id} data-prod key={p.id}>
              <div className="h7-wrap h7-prod-grid">
                <div className="h7-prod-copy">
                  <span className="h7-eye" data-rv><i className="h7-dot" />{p.eye}</span>
                  <h2 data-rv>{p.title}</h2>
                  <p className="h7-sub" data-rv>{p.body}</p>
                  <div className="h7-subs" data-rv>
                    {p.subs.map((sb) => (
                      <div className="h7-sub-card" key={sb.t}>
                        <span className="h7-sub-h"><span className="h7-sub-ico"><Icon name={sb.icon} size={15} /></span>{sb.t}</span>
                        <ul>{sb.feats.map((f) => <li key={f}><Icon name="check" size={14} />{f}</li>)}</ul>
                      </div>
                    ))}
                  </div>
                  {p.math && (
                    <div className="h7-math" data-rv>
                      <div className="h7-math-a"><b>{p.math.a}</b><span>{p.math.al}</span></div>
                      <span className="h7-math-arrow">→</span>
                      <div className="h7-math-b"><b>{p.math.b}</b><span>{p.math.bl}</span></div>
                    </div>
                  )}
                  <div className="h7-ai" data-rv>
                    <div className="h7-ai-h"><AiTag>AI EM DESTAQUE</AiTag></div>
                    <b>{p.ai.h}</b><p>{p.ai.d}</p>
                  </div>
                  <a href={p.link.href} className="h7-textlink" data-rv>{p.link.t} <Icon name="arrow" size={15} /></a>
                </div>
                <div className="h7-prod-visual" data-rv><div className="h7-visual-bg"><Mock kind={p.visual} /></div></div>
              </div>
            </section>
          ))}
        </div>

        {/* PAINEL */}
        <section className="h7-sec h7-sec-alt" id="painel">
          <div className="h7-wrap">
            <div className="h7-head h7-center" data-rv>
              <span className="h7-eye"><i className="h7-dot" />PAINEL UNBOX</span>
              <h2>O painel que já sugere o próximo passo.</h2>
              <p>Dados, assinaturas, campanhas e personalização no mesmo lugar. E um assistente que parte da sua ideia de campanha e mostra o caminho para montá-la.</p>
            </div>
            <div data-rv><Painel /></div>
            <p className="h7-caption" data-rv>Telas ilustrativas das áreas do Painel Unbox.</p>
          </div>
        </section>

        {/* COMPARATIVO */}
        <section className="h7-sec" id="comparativo">
          <div className="h7-wrap">
            <div className="h7-head h7-center" data-rv>
              <span className="h7-eye"><i className="h7-dot" />COMPARATIVO</span>
              <h2>Tudo nativo. Inclusive a AI.</h2>
              <p>Todas resolvem vitrine, catálogo e pedido. A diferença aparece no que já vem pronto na plataforma — e no que vira app, módulo ou projeto à parte.</p>
            </div>
            <div className="h7-vs-wrap" data-rv>
              <table className="h7-vs">
                <thead><tr><th /> {CMP_COLS.map((c, i) => <th key={c} className={i === 0 ? 'is-us' : ''}>{c}</th>)}</tr></thead>
                <tbody>
                  {CMP_ROWS.map((r) => (
                    <tr key={r.t}>
                      <th scope="row"><b>{r.t}</b><span>{r.d}</span>{r.note && <em>{r.note}</em>}</th>
                      {r.v.map((v, i) => (
                        <td key={i} data-l={CMP_COLS[i]} className={(i === 0 ? 'is-us ' : '') + 'v-' + v}>
                          <span className="h7-vs-mark" aria-label={v === 'y' ? 'nativo' : v === 'p' ? 'via app ou módulo' : 'não oferece'}>{v === 'y' ? <Icon name="check" size={16} /> : v === 'p' ? '~' : '—'}</span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="h7-vs-legend" data-rv>
              <span><i className="l-y"><Icon name="check" size={12} /></i> nativo na plataforma</span>
              <span><i className="l-p">~</i> via app, módulo ou parceiro</span>
              <span><i className="l-n">—</i> não oferece</span>
            </p>
          </div>
        </section>

        {/* INTEGRAÇÕES */}
        <section className="h7-sec h7-sec-alt" id="integracoes">
          <div className="h7-wrap h7-split">
            <div className="h7-split-copy">
              <span className="h7-eye" data-rv><i className="h7-dot" />INTEGRAÇÕES</span>
              <h2 data-rv>Conecta com o que você já usa. Inclusive a sua AI.</h2>
              <p className="h7-sub" data-rv>Canais de venda, ERP, logística e rastreio nativos. E, pelo MCP e pelo CLI, a AI que você já usa vira parte da operação da loja.</p>
              <a href="/recursos" className="h7-textlink" data-rv>Ver todas as integrações <Icon name="arrow" size={15} /></a>
            </div>
            <div className="h7-int" data-rv>
              {INTEGRATIONS.map((g) => <div className="h7-int-g" key={g.g}><span className="h7-int-l">{g.g}</span><div className="h7-int-items">{g.items.map((it) => <span className={'h7-int-item' + (g.g.startsWith('AI') ? ' is-ai' : '')} key={it.n}><BrandMark k={it.k} size={16} />{!(LOGOS[it.k] && LOGOS[it.k].wm) && it.n}</span>)}</div></div>)}
            </div>
          </div>
        </section>

        {/* PLANOS */}
        {SHOW_PLANOS && (
          <section className="h7-sec" id="planos">
            <div className="h7-wrap">
              <div className="h7-head h7-center" data-rv>
                <span className="h7-eye"><i className="h7-dot" />PLANOS E TAXAS</span>
                <h2>Escolha o ritmo da sua operação.</h2>
                <p>Os custos à vista, sem letra miúda: implementação, plano anual, Unbox Fee e as taxas do Unbox Pay.</p>
              </div>
              <div className="h7-planos" data-rv>
                {PLANOS.map((pl) => (
                  <div className={'h7-plano' + (pl.tag ? ' is-rec' : '')} key={pl.n}>
                    <div className="h7-plano-h"><b>{pl.n}</b>{pl.tag && <span>{pl.tag}</span>}</div>
                    <ul>{pl.feats.map((f) => <li key={f}><Icon name="check" size={15} />{f}</li>)}</ul>
                    <div className="h7-plano-math">
                      <div><span>Implementação</span><b>{pl.impl}</b></div>
                      <div><span>Plano anual</span><b>{pl.mensal}</b></div>
                      <div className="is-fee"><span>Unbox Fee</span><b>{pl.fee}</b></div>
                    </div>
                    <a href={URLS.demo} className={'h7-btn h7-btn-full ' + (pl.tag ? 'h7-btn-dark' : 'h7-btn-white')}>Falar com especialista</a>
                  </div>
                ))}
              </div>
              <div className="h7-taxas" data-rv>
                <div className="h7-taxas-copy">
                  <span className="h7-eye"><i className="h7-dot" />UNBOX PAY</span>
                  <h3>O meio mais seguro de vender online.</h3>
                  <div className="h7-taxas-pills"><span><Icon name="check" size={14} /> Cartão, boleto e Pix 100% integrados</span><span><Icon name="check" size={14} /> Antifraude com análise ativa</span><span><Icon name="check" size={14} /> Sem taxa de saque</span></div>
                </div>
                <div className="h7-taxas-wrap">
                  <table className="h7-taxas-t">
                    <thead><tr><th>Sem antecipação</th><th>Master · Visa · Hiper</th><th>Amex · Elo</th></tr></thead>
                    <tbody>{TAXAS.map((t) => <tr key={t.r}><th scope="row">{t.r}</th><td>{t.a}</td><td>{t.b}</td></tr>)}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="h7-sec h7-sec-alt" id="faq">
          <div className="h7-wrap h7-narrow">
            <div className="h7-head" data-rv><span className="h7-eye"><i className="h7-dot" />DÚVIDAS</span><h2>Tudo que você precisa saber.</h2></div>
            <div className="h7-faq" data-rv>
              {FAQ.map((f, i) => (
                <div className={'h7-faq-item' + (faq === i ? ' is-open' : '')} key={i}>
                  <button className="h7-faq-q" onClick={() => setFaq(faq === i ? -1 : i)}><span>{f.q}</span><i><Icon name="plus" size={16} /></i></button>
                  <div className="h7-faq-a"><p>{f.a}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL */}
        <section className="h7-final-wrap" id="final">
          <div className="h7-wrap">
            <div className="h7-final" data-rv>
              <h2>Você faz a marca.<br /><em>A Unbox faz a venda.</em></h2>
              <p>Crie a loja com a sua AI em um comando, ou fale com a gente para migrar a sua operação.</p>
              <div className="h7-cta-row"><a href="/ai-unbox" className="h7-btn h7-btn-white h7-btn-lg">Criar minha loja com AI</a><a href={URLS.demo} className="h7-btn h7-btn-ghost-light h7-btn-lg">Falar com especialista</a></div>
              <div className="h7-final-cmd"><CopyCmd dark /></div>
            </div>
          </div>
        </section>

        <footer className="h7-footer">
          <div className="h7-wrap h7-footer-grid">
            <div className="h7-footer-brand"><Logo /><p>A camada de vendas AI-native para marcas D2C escalarem no digital, do primeiro pedido aos milhões em vendas.</p></div>
            <div><h4>Plataforma</h4><a href="/recursos">Recursos</a><a href="/checkout">Checkout TURBO</a><a href="/assinatura">Assinatura</a><a href="/credito">Unbox Pay</a><a href="/afiliados">Creators</a></div>
            <div><h4>AI</h4><a href={NPM_URL} target="_blank" rel="noopener noreferrer">Unbox CLI no npm</a><a href="/ai-unbox">AI Foundry</a><a href="/ai">Demo do MCP</a></div>
            <div><h4>Empresa</h4><a href="/industrias">Indústrias</a><a href="/blog">Blog</a><a href="/carreiras">Carreiras</a><a href={URLS.whatsapp}>Contato</a></div>
          </div>
          <div className="h7-wrap h7-footer-bottom">© {new Date().getFullYear()} Unbox. Todos os direitos reservados.</div>
        </footer>
      </div>

      <style jsx global>{`
        html, body { margin: 0; background: #FBFAF6; }
        #hv7 {
          --bg: #FBFAF6; --ink: #16161C; --ink-2: #4A4A55; --mut: #7A7A86; --line: rgba(22,22,28,.09);
          --roxo: #8F28F6; --roxo-2: #5612AB; --verde: #1FBF5A; --neon: #39FF14; --ambar: #F5B33C;
          --sky: #E6F0FF; --sky-2: #C3DFFE; --lime: #F1FBDF; --lime-2: #DBEE9F; --lavender: #EEE6FF; --lavender-2: #D4C2FF; --mint: #E4FAF3; --mint-2: #BAF0EC;
          --mono: 'JetBrains Mono', ui-monospace, Menlo, monospace;
          font-family: 'Sora', system-ui, -apple-system, sans-serif; color: var(--ink); background: var(--bg); -webkit-font-smoothing: antialiased; line-height: 1.5; overflow-x: clip;
        }
        #hv7 *, #hv7 *::before, #hv7 *::after { box-sizing: border-box; }
        #hv7 a { color: inherit; text-decoration: none; }
        #hv7 code { font-family: var(--mono); }
        #hv7 .h7-wrap { max-width: 1180px; margin: 0 auto; padding: 0 24px; }
        #hv7 .h7-narrow { max-width: 820px; }
        #hv7 [data-rv] { opacity: 0; transform: translateY(16px); transition: opacity .7s ease, transform .7s cubic-bezier(.2,.7,.2,1); }
        #hv7 [data-rv].h7-in { opacity: 1; transform: none; }
        #hv7 .tint-sky { --t: var(--sky); --t2: var(--sky-2); } #hv7 .tint-lime { --t: var(--lime); --t2: var(--lime-2); }
        #hv7 .tint-lavender { --t: var(--lavender); --t2: var(--lavender-2); } #hv7 .tint-mint { --t: var(--mint); --t2: var(--mint-2); }

        #hv7 .h7-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; font-weight: 600; font-size: 15px; border-radius: 12px; padding: 12px 20px; border: 1px solid transparent; transition: transform .15s ease, box-shadow .2s, background .2s, border-color .2s; white-space: nowrap; cursor: pointer; font-family: inherit; }
        #hv7 .h7-btn-lg { padding: 16px 26px; font-size: 16px; border-radius: 14px; }
        #hv7 .h7-btn-full { width: 100%; }
        #hv7 .h7-btn-dark { background: var(--ink); color: #fff; } #hv7 .h7-btn-dark:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(22,22,28,.22); }
        #hv7 .h7-btn-white { background: #fff; color: var(--ink); border-color: var(--line); } #hv7 .h7-btn-white:hover { border-color: rgba(22,22,28,.25); transform: translateY(-2px); }
        #hv7 .h7-btn-ghost { background: transparent; color: var(--ink); } #hv7 .h7-btn-ghost:hover { background: rgba(22,22,28,.05); }
        #hv7 .h7-btn-ghost-light { background: rgba(255,255,255,.12); color: #fff; border-color: rgba(255,255,255,.28); }
        #hv7 .h7-textlink { display: inline-flex; align-items: center; gap: 6px; font-weight: 600; color: var(--roxo-2); } #hv7 .h7-textlink:hover { gap: 10px; }
        #hv7 .h7-textlink.light { color: #fff; }
        #hv7 .h7-eye { display: inline-flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 700; letter-spacing: .18em; color: var(--roxo-2); }
        #hv7 .h7-eye.light { color: #C9A8FF; }
        #hv7 .h7-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--verde); box-shadow: 0 0 0 3px rgba(31,191,90,.18); flex-shrink: 0; }
        #hv7 .h7-aitag { display: inline-flex; align-items: center; gap: 5px; font-size: 10.5px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: #fff; background: linear-gradient(135deg, var(--roxo), #B06BFF); border-radius: 999px; padding: 4px 9px; white-space: nowrap; }

        /* comando copiável */
        #hv7 .h7-cmd { display: inline-flex; align-items: center; gap: 10px; max-width: 100%; background: #fff; border: 1px solid var(--line); border-radius: 12px; padding: 7px 7px 7px 14px; font-family: var(--mono); font-size: 13.5px; color: var(--ink); cursor: pointer; transition: border-color .2s; text-align: left; }
        #hv7 .h7-cmd:hover { border-color: rgba(143,40,246,.45); }
        #hv7 .h7-cmd code { font-size: inherit; min-width: 0; overflow-wrap: anywhere; }
        #hv7 .h7-cmd-p { color: var(--verde); font-weight: 600; }
        #hv7 .h7-cmd-c { display: inline-flex; align-items: center; gap: 6px; flex-shrink: 0; font-family: 'Sora', system-ui, sans-serif; font-size: 12.5px; font-weight: 600; background: var(--ink); color: #fff; border-radius: 8px; padding: 7px 11px; }
        #hv7 .h7-cmd.is-dark { background: rgba(255,255,255,.06); border-color: rgba(255,255,255,.16); color: #fff; }
        #hv7 .h7-cmd.is-dark .h7-cmd-p { color: var(--neon); } #hv7 .h7-cmd.is-dark .h7-cmd-c { background: #fff; color: var(--ink); }

        #hv7 .h7-announce { display: flex; align-items: center; justify-content: center; gap: 8px; background: var(--lavender); font-size: 13.5px; padding: 9px 16px; text-align: center; }
        #hv7 .h7-announce b { font-weight: 600; color: var(--roxo-2); }
        #hv7 .h7-announce-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--roxo); box-shadow: 0 0 0 3px rgba(143,40,246,.18); flex-shrink: 0; }
        #hv7 .h7-nav { position: sticky; top: 0; z-index: 50; background: rgba(251,250,246,.86); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border-bottom: 1px solid transparent; transition: border-color .2s, box-shadow .2s; }
        #hv7 .h7-nav.is-scrolled { border-bottom-color: var(--line); box-shadow: 0 6px 24px rgba(22,22,28,.05); }
        #hv7 .h7-nav-in { display: flex; align-items: center; justify-content: space-between; height: 72px; gap: 24px; }
        #hv7 .h7-logo { display: inline-flex; align-items: center; gap: 8px; font-weight: 700; font-size: 24px; letter-spacing: -.03em; color: var(--ink); }
        #hv7 .h7-logo img { width: 30px; height: 30px; object-fit: contain; }
        #hv7 .h7-links { display: flex; gap: 26px; font-weight: 500; font-size: 15px; color: var(--ink-2); } #hv7 .h7-links a:hover { color: var(--ink); }
        #hv7 .h7-nav-cta { display: flex; align-items: center; gap: 8px; }
        #hv7 .h7-burger { display: none; width: 40px; height: 40px; border: 1px solid var(--line); border-radius: 10px; background: #fff; flex-direction: column; justify-content: center; gap: 4px; align-items: center; cursor: pointer; }
        #hv7 .h7-burger span { width: 16px; height: 2px; background: var(--ink); border-radius: 2px; }
        #hv7 .h7-sheet { display: flex; flex-direction: column; gap: 6px; padding: 12px 24px 20px; border-top: 1px solid var(--line); background: var(--bg); } #hv7 .h7-sheet a { padding: 10px 0; font-weight: 500; }

        /* hero */
        #hv7 .h7-hero { padding: 72px 0 40px; }
        #hv7 .h7-hero-copy { text-align: center; max-width: 880px; margin: 0 auto 36px; }
        #hv7 h1 { font-size: clamp(38px, 5.2vw, 64px); font-weight: 700; letter-spacing: -.04em; line-height: 1.04; margin: 0 0 20px; }
        #hv7 h1 em, #hv7 .h7-final h2 em { font-style: normal; background: linear-gradient(90deg, var(--roxo), #B06BFF); -webkit-background-clip: text; background-clip: text; color: transparent; }
        #hv7 .h7-lead { font-size: clamp(18px, 1.7vw, 22px); color: var(--ink-2); line-height: 1.5; max-width: 640px; margin: 0 auto; }
        #hv7 .h7-cta-row { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; margin-top: 28px; }
        #hv7 .h7-hero-cmd { margin-top: 18px; display: flex; justify-content: center; }
        #hv7 .h7-micro { font-size: 13px; color: var(--mut); margin: 12px auto 0; }
        #hv7 .h7-logos { display: grid; grid-template-columns: auto auto; gap: 10px 18px; justify-content: center; align-items: center; margin: 0 auto 32px; }
        #hv7 .h7-logos-g { display: flex; align-items: center; gap: 14px; }
        #hv7 .h7-logos-l { font-size: 11.5px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--mut); white-space: nowrap; }
        #hv7 .h7-logos-row { display: flex; align-items: center; gap: 9px; flex-wrap: wrap; }
        #hv7 .h7-blogo { display: inline-flex; align-items: center; gap: 8px; background: #fff; border: 1px solid var(--line); border-radius: 999px; padding: 8px 15px 8px 10px; }
        #hv7 .h7-blogo b { font-size: 14.5px; font-weight: 600; letter-spacing: -.01em; color: var(--ink); white-space: nowrap; }
        #hv7 .h7-lg { display: block; object-fit: contain; flex-shrink: 0; }
        #hv7 .h7-panel { border-radius: 32px; padding: 28px 28px 0; background: linear-gradient(180deg, var(--t2), var(--t) 60%, #fff 140%); transition: background .6s ease; box-shadow: inset 0 1px 0 rgba(255,255,255,.6); }
        #hv7 .h7-ptabs { display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; margin-bottom: 26px; }
        #hv7 .h7-ptab { position: relative; display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,.55); border: 1px solid rgba(255,255,255,.7); color: var(--ink-2); border-radius: 999px; padding: 8px 16px 8px 8px; font-family: inherit; font-weight: 600; font-size: 14.5px; cursor: pointer; overflow: hidden; transition: background .2s, color .2s; }
        #hv7 .h7-ptab.is-on { background: #fff; color: var(--ink); box-shadow: 0 8px 22px rgba(22,22,28,.08); }
        #hv7 .h7-ptab-ico { width: 30px; height: 30px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; background: var(--t); color: var(--ink); }
        #hv7 .h7-ptab.is-on .h7-ptab-ico { background: var(--ink); color: #fff; }
        #hv7 .h7-ptab-prog { position: absolute; left: 0; bottom: 0; height: 2px; width: 100%; background: var(--ink); transform-origin: left; }
        #hv7 .h7-showcase { display: grid; grid-template-columns: .9fr 1.1fr; gap: 28px; background: #fff; border-radius: 24px 24px 0 0; padding: 36px 36px 0; align-items: center; animation: h7fade .5s ease; }
        @keyframes h7fade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        #hv7 .h7-chip { display: inline-flex; align-items: center; gap: 7px; font-size: 13px; font-weight: 600; color: var(--ink); background: var(--t, var(--sky)); border-radius: 999px; padding: 6px 12px 6px 9px; }
        #hv7 .h7-showcase-copy { padding-bottom: 32px; }
        #hv7 .h7-showcase-copy h3 { font-size: clamp(24px, 2.6vw, 34px); font-weight: 700; letter-spacing: -.03em; line-height: 1.1; margin: 14px 0 12px; }
        #hv7 .h7-showcase-copy p { color: var(--ink-2); font-size: 16px; line-height: 1.6; margin: 0 0 16px; }
        #hv7 .h7-showcase-ai { display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--ink-2); background: var(--bg); border: 1px solid var(--line); border-radius: 12px; padding: 10px 12px; margin-bottom: 18px; }
        #hv7 .h7-showcase-media { align-self: end; border-radius: 16px 16px 0 0; overflow: hidden; background: var(--t); padding: 16px 16px 0; }
        #hv7 .h7-showcase-media img { display: block; width: 100%; height: 340px; object-fit: cover; object-position: top; border-radius: 12px 12px 0 0; box-shadow: 0 -10px 40px rgba(22,22,28,.12); }
        #hv7 .h7-showcase-media.is-mock { align-self: center; border-radius: 16px; padding: 18px; margin-bottom: 32px; }

        /* chat e terminal curtos */
        #hv7 .h7-chat { background: #fff; border-radius: 18px; padding: 14px; box-shadow: 0 20px 50px rgba(22,22,28,.12); display: grid; gap: 8px; width: 100%; }
        #hv7 .h7-chat-h { display: flex; align-items: center; justify-content: space-between; gap: 8px; font-size: 11.5px; color: var(--mut); padding-bottom: 8px; border-bottom: 1px solid var(--line); }
        #hv7 .h7-bub { max-width: 90%; padding: 9px 12px; border-radius: 12px; font-size: 13px; line-height: 1.4; opacity: 0; transform: translateY(6px); animation: h7bub .45s ease forwards; }
        #hv7 .h7-bub.u { margin-left: auto; background: var(--ink); color: #fff; border-bottom-right-radius: 4px; }
        #hv7 .h7-bub.a { background: var(--sky); color: var(--ink); border-bottom-left-radius: 4px; } #hv7 .h7-bub.a svg { vertical-align: -2px; margin-right: 5px; color: var(--verde); }
        #hv7 .h7-bub.a.ok { background: var(--lime); }
        #hv7 .h7-bub:nth-child(2) { animation-delay: .9s } #hv7 .h7-bub:nth-child(3) { animation-delay: 1.6s } #hv7 .h7-bub:nth-child(4) { animation-delay: 2.3s } #hv7 .h7-bub:nth-child(5) { animation-delay: 2.9s }
        @keyframes h7bub { to { opacity: 1; transform: none; } }
        #hv7 .h7-term { background: #0D0D12; border: 1px solid rgba(255,255,255,.08); border-radius: 12px; padding: 12px 14px; font-family: var(--mono); font-size: 12px; color: #a6a6b3; line-height: 1.8; }
        #hv7 .h7-term-cmd { color: #fff; overflow-wrap: anywhere; } #hv7 .h7-term-cmd span { color: var(--neon); margin-right: 6px; } #hv7 .h7-term-line.ok { color: var(--neon); }
        #hv7 .h7-m-ai { display: grid; gap: 12px; }
        #hv7 .h7-phone-top { position: absolute; top: 14px; left: 50%; transform: translateX(-50%); width: 70px; height: 18px; border-radius: 999px; background: #0D0D12; z-index: 2; }

        /* seções */
        #hv7 .h7-sec { padding: 88px 0; }
        #hv7 .h7-sec-alt { background: #fff; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
        #hv7 .h7-head { max-width: 800px; margin-bottom: 40px; } #hv7 .h7-head.h7-center { margin-left: auto; margin-right: auto; text-align: center; }
        #hv7 h2 { font-size: clamp(32px, 4.1vw, 50px); font-weight: 700; letter-spacing: -.04em; line-height: 1.06; margin: 14px 0 0; }
        #hv7 .h7-head p, #hv7 .h7-sub { color: var(--ink-2); font-size: 17px; line-height: 1.6; margin: 18px 0 0; }
        #hv7 .h7-caption { text-align: center; font-size: 12.5px; color: var(--mut); margin: 18px 0 0; }

        /* prova */
        #hv7 .h7-prova { padding-top: 72px; padding-bottom: 72px; }
        #hv7 .h7-marcas { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 22px 48px; padding: 6px 0 36px; border-bottom: 1px solid var(--line); }
        #hv7 .h7-marcas img { width: auto; max-width: 160px; object-fit: contain; }
        #hv7 .h7-marcas img.is-dim { filter: brightness(0); opacity: .82; }
        #hv7 .h7-metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); border-bottom: 1px solid var(--line); }
        #hv7 .h7-metric { padding: 30px 24px; border-left: 1px solid var(--line); }
        #hv7 .h7-metric:first-child { border-left: 0; padding-left: 0; }
        #hv7 .h7-metric-n { font-size: clamp(36px, 4vw, 52px); font-weight: 700; letter-spacing: -.04em; line-height: 1; } #hv7 .h7-metric-n span { font-size: .6em; color: var(--roxo); margin-left: 2px; }
        #hv7 .h7-metric-l { color: var(--ink-2); font-size: 14.5px; margin-top: 10px; }
        #hv7 .h7-backers { display: grid; grid-template-columns: 2fr 1fr; gap: 16px; margin-top: 32px; }
        #hv7 .h7-backer { border: 1px solid var(--line); border-radius: 18px; padding: 16px 20px 18px; background: #fff; }
        #hv7 .h7-backer-l { display: block; font-size: 11px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: var(--mut); margin-bottom: 10px; }
        #hv7 .h7-backer-imgs { display: flex; align-items: center; }
        #hv7 .h7-backer-imgs img { display: block; height: 46px; width: auto; max-width: 100%; }
        #hv7 .h7-backer.is-wide .h7-backer-imgs img { max-width: 50%; }
        #hv7 .h7-press { margin: 16px 0 0; display: flex; align-items: center; gap: 16px; border: 1px solid var(--line); border-radius: 18px; padding: 18px 22px; background: var(--bg); }
        #hv7 .h7-press-ico { width: 40px; height: 40px; border-radius: 12px; background: var(--lavender); color: var(--roxo-2); display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
        #hv7 .h7-press blockquote { margin: 0; flex: 1; font-size: 17px; font-weight: 600; letter-spacing: -.01em; line-height: 1.4; }
        #hv7 .h7-press figcaption { font-size: 13px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--mut); }

        /* cases */
        #hv7 .h7-spot { display: grid; grid-template-columns: auto 1.4fr 1fr; gap: 32px; align-items: center; background: var(--ink); color: #fff; border-radius: 26px; padding: 30px 34px; background-image: radial-gradient(60% 120% at 100% 0%, rgba(143,40,246,.45), transparent 60%); }
        #hv7 .h7-spot-who { display: flex; flex-direction: column; align-items: flex-start; gap: 12px; }
        #hv7 .h7-spot-who img { width: 92px; height: 92px; border-radius: 50%; }
        #hv7 .h7-spot-who b { display: block; font-size: 16px; } #hv7 .h7-spot-who span { font-size: 13px; color: rgba(255,255,255,.65); }
        #hv7 .h7-spot-main h3 { margin: 0; font-size: clamp(24px, 2.5vw, 32px); letter-spacing: -.03em; line-height: 1.12; }
        #hv7 .h7-spot-main p { margin: 12px 0 0; color: rgba(255,255,255,.72); font-size: 15px; line-height: 1.6; }
        #hv7 .h7-spot-stats { display: grid; gap: 14px; }
        #hv7 .h7-spot-stats div { border-left: 2px solid var(--neon); padding-left: 16px; }
        #hv7 .h7-spot-stats b { display: block; font-size: 34px; letter-spacing: -.04em; line-height: 1; }
        #hv7 .h7-spot-stats span { display: block; margin-top: 6px; font-size: 13.5px; color: rgba(255,255,255,.7); line-height: 1.45; }
        #hv7 .h7-cases-l { text-align: center; color: var(--ink-2); font-size: 15px; margin: 34px 0 16px; }
        #hv7 .h7-cases { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        #hv7 .h7-case { background: #fff; border: 1px solid var(--line); border-radius: 22px; padding: 18px; }
        #hv7 .h7-case-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 14px; }
        #hv7 .h7-case-logo { height: 26px; width: auto; max-width: 140px; object-fit: contain; } #hv7 .h7-case-logo.is-dark { filter: brightness(0); }
        #hv7 .h7-case-seg { font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--mut); }
        #hv7 .h7-ba { position: relative; height: 360px; border-radius: 14px; overflow: hidden; background: #eee; user-select: none; }
        #hv7 .h7-ba-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: top; }
        #hv7 .h7-ba-after { position: absolute; inset: 0; clip-path: inset(0 0 0 var(--x)); }
        #hv7 .h7-ba-bar { position: absolute; top: 0; bottom: 0; left: var(--x); width: 2px; background: #fff; box-shadow: 0 0 0 1px rgba(0,0,0,.15); pointer-events: none; }
        #hv7 .h7-ba-bar i { position: absolute; top: 50%; left: 50%; width: 34px; height: 34px; border-radius: 50%; background: var(--ink); transform: translate(-50%,-50%); box-shadow: 0 6px 16px rgba(0,0,0,.25); }
        #hv7 .h7-ba-bar i::before { content: "‹ ›"; color: #fff; font-size: 14px; font-weight: 700; position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; letter-spacing: 1px; }
        #hv7 .h7-ba-tag { position: absolute; top: 12px; font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; padding: 5px 10px; border-radius: 999px; background: rgba(22,22,28,.75); color: #fff; pointer-events: none; }
        #hv7 .h7-ba-tag.l { left: 12px; } #hv7 .h7-ba-tag.r { right: 12px; background: var(--verde); }
        #hv7 .h7-ba input[type=range] { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0; cursor: ew-resize; margin: 0; }
        #hv7 .h7-case-note { margin: 14px 0 0; font-size: 14px; color: var(--ink-2); line-height: 1.55; }

        /* banda do CLI */
        #hv7 .h7-band { background: radial-gradient(60% 70% at 85% 0%, rgba(143,40,246,.42), transparent 60%), radial-gradient(40% 50% at 0% 100%, rgba(57,255,20,.12), transparent 60%), #0F0F14; color: #fff; }
        #hv7 .h7-band .h7-head { max-width: 900px; } #hv7 .h7-band .h7-head p { color: rgba(255,255,255,.72); }
        #hv7 .h7-band .h7-dot { background: var(--neon); box-shadow: 0 0 0 3px rgba(57,255,20,.2); }
        #hv7 .h7-band-cmd { display: flex; align-items: center; justify-content: center; gap: 18px; flex-wrap: wrap; margin-top: 26px; }
        #hv7 .h7-cli-grid { display: grid; grid-template-columns: 1.15fr .85fr; gap: 16px; }
        #hv7 .h7-cli-term { background: #09090D; border: 1px solid rgba(255,255,255,.1); border-radius: 20px; overflow: hidden; }
        #hv7 .h7-cli-term-h { display: flex; align-items: center; gap: 6px; padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,.08); }
        #hv7 .h7-cli-term-h i { width: 10px; height: 10px; border-radius: 50%; background: #34343d; } #hv7 .h7-cli-term-h span { margin-left: 8px; font-size: 12px; color: #7d7d8a; font-family: var(--mono); }
        #hv7 .h7-cli-term-b { padding: 18px 20px 22px; font-family: var(--mono); font-size: 13px; line-height: 1.95; color: #b9b9c6; }
        #hv7 .h7-tl { overflow-wrap: anywhere; opacity: 0; animation: h7bub .4s ease forwards; }
        #hv7 .h7-tl.cmd { color: #fff; opacity: 1; animation: none; } #hv7 .h7-tl.cmd span, #hv7 .h7-tl.cmd > span:first-child { color: var(--neon); }
        #hv7 .h7-tl .q { color: #C9A8FF; font-weight: 600; } #hv7 .h7-tl .v { color: #fff; }
        #hv7 .h7-tl.ok { color: var(--neon); } #hv7 .h7-tl.ai { color: #E9DCFF; } #hv7 .h7-tl.ai svg { vertical-align: -2px; color: #C9A8FF; }
        #hv7 .h7-cli-side { display: grid; gap: 16px; }
        #hv7 .h7-cli-block { background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1); border-radius: 20px; padding: 20px; }
        #hv7 .h7-cli-l { display: block; font-size: 11px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: #C9A8FF; margin-bottom: 12px; }
        #hv7 .h7-estilos { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        #hv7 .h7-estilo { border: 1px solid rgba(255,255,255,.12); border-radius: 14px; padding: 12px 14px; }
        #hv7 .h7-estilo b { display: block; font-size: 16px; letter-spacing: -.01em; } #hv7 .h7-estilo span { display: block; font-size: 13px; color: rgba(255,255,255,.66); margin-top: 3px; line-height: 1.4; }
        #hv7 .h7-gera { display: flex; flex-wrap: wrap; gap: 7px; }
        #hv7 .h7-gera span { font-size: 13px; padding: 6px 11px; border-radius: 999px; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.1); }
        #hv7 .h7-agentes { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 16px; }
        #hv7 .h7-agente { background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1); border-radius: 18px; padding: 18px; }
        #hv7 .h7-agente-n { display: inline-flex; align-items: center; justify-content: center; min-width: 34px; height: 26px; padding: 0 8px; border-radius: 8px; background: rgba(143,40,246,.3); color: #E9DCFF; font-family: var(--mono); font-size: 12.5px; font-weight: 600; }
        #hv7 .h7-agente b { display: block; font-size: 17px; margin-top: 12px; letter-spacing: -.01em; } #hv7 .h7-agente p { margin: 6px 0 0; font-size: 13.5px; line-height: 1.5; color: rgba(255,255,255,.7); }
        #hv7 .h7-band-foot { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px 28px; margin-top: 26px; font-size: 14.5px; color: rgba(255,255,255,.82); }
        #hv7 .h7-band-foot span { display: inline-flex; align-items: center; gap: 8px; } #hv7 .h7-band-foot svg { color: var(--neon); flex-shrink: 0; }

        /* plataforma */
        #hv7 .h7-plat-head { padding-bottom: 40px; }
        #hv7 .h7-tour { position: sticky; top: 72px; z-index: 40; background: rgba(251,250,246,.92); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
        #hv7 .h7-tour-in { display: flex; align-items: center; gap: 18px; height: 54px; }
        #hv7 .h7-tour-l { font-size: 11px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: var(--mut); white-space: nowrap; }
        #hv7 .h7-tour-tabs { display: flex; gap: 4px; overflow-x: auto; scrollbar-width: none; } #hv7 .h7-tour-tabs::-webkit-scrollbar { display: none; }
        #hv7 .h7-tab { display: inline-flex; align-items: center; gap: 7px; padding: 5px 12px 5px 5px; border-radius: 999px; font-size: 13.5px; font-weight: 500; color: var(--ink-2); white-space: nowrap; transition: background .2s, color .2s; }
        #hv7 .h7-tab-ico { width: 26px; height: 26px; border-radius: 50%; background: rgba(22,22,28,.06); display: inline-flex; align-items: center; justify-content: center; }
        #hv7 .h7-tab:hover { background: rgba(22,22,28,.05); } #hv7 .h7-tab.is-on { background: var(--ink); color: #fff; } #hv7 .h7-tab.is-on .h7-tab-ico { background: rgba(255,255,255,.16); }
        #hv7 .h7-prod { padding: 80px 0; scroll-margin-top: 130px; border-bottom: 1px solid var(--line); }
        #hv7 .h7-prod-grid { display: grid; grid-template-columns: 1fr 1.15fr; gap: 64px; align-items: center; }
        #hv7 .h7-prod.is-rev .h7-prod-copy { order: 1; }
        #hv7 .h7-prod h2 { font-size: clamp(30px, 3.4vw, 44px); }
        #hv7 .h7-subs { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 24px; }
        #hv7 .h7-sub-card { background: #fff; border: 1px solid var(--line); border-radius: 16px; padding: 16px 18px; }
        #hv7 .h7-sub-h { display: flex; align-items: center; gap: 9px; font-size: 15.5px; font-weight: 600; letter-spacing: -.01em; }
        #hv7 .h7-sub-ico { width: 28px; height: 28px; border-radius: 9px; background: var(--t); color: var(--ink); display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
        #hv7 .h7-sub-card ul { list-style: none; margin: 12px 0 0; padding: 0; display: grid; gap: 6px; }
        #hv7 .h7-sub-card li { display: flex; align-items: flex-start; gap: 7px; font-size: 14px; color: var(--ink-2); line-height: 1.45; }
        #hv7 .h7-sub-card li svg { color: var(--verde); flex-shrink: 0; margin-top: 2px; }
        #hv7 .h7-math { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 14px; margin-top: 12px; border: 1px solid var(--line); border-radius: 16px; background: #fff; padding: 16px 18px; }
        #hv7 .h7-math b { display: block; font-size: 30px; letter-spacing: -.04em; line-height: 1; }
        #hv7 .h7-math div span { display: block; font-size: 13px; color: var(--ink-2); margin-top: 6px; line-height: 1.4; }
        #hv7 .h7-math-a b { color: var(--mut); } #hv7 .h7-math-b b { color: var(--verde); }
        #hv7 .h7-math-arrow { font-size: 22px; color: var(--mut); }
        #hv7 .h7-ai { margin-top: 12px; border-radius: 16px; padding: 18px 20px; background: #fff; border: 1px solid rgba(143,40,246,.28); position: relative; }
        #hv7 .h7-ai::before { content: ""; position: absolute; left: 0; top: 14px; bottom: 14px; width: 3px; border-radius: 3px; background: linear-gradient(180deg, var(--roxo), #B06BFF); }
        #hv7 .h7-ai-h { margin-bottom: 8px; } #hv7 .h7-ai b { display: block; font-size: 16.5px; letter-spacing: -.01em; } #hv7 .h7-ai p { margin: 6px 0 0; font-size: 14.5px; color: var(--ink-2); line-height: 1.55; }
        #hv7 .h7-prod-copy .h7-textlink { margin-top: 22px; }
        #hv7 .h7-visual-bg { border-radius: 28px; background: linear-gradient(160deg, var(--t2), var(--t)); padding: 28px; min-height: 460px; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; }
        #hv7 .h7-mock { position: relative; width: 100%; }
        #hv7 .h7-m-phone { width: 210px; height: 420px; border-radius: 28px; background: #0D0D12; padding: 9px; box-shadow: 0 30px 60px rgba(22,22,28,.25); position: relative; overflow: hidden; flex-shrink: 0; }
        #hv7 .h7-m-phone img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: top; border-radius: 20px; }
        #hv7 .h7-m-store { display: flex; gap: 22px; align-items: center; justify-content: center; }
        #hv7 .h7-m-agents { background: #fff; border-radius: 18px; padding: 16px; box-shadow: 0 20px 50px rgba(22,22,28,.12); width: 270px; display: grid; gap: 10px; }
        #hv7 .h7-m-agents-h { display: flex; flex-direction: column; align-items: flex-start; gap: 6px; font-size: 11.5px; color: var(--mut); padding-bottom: 8px; border-bottom: 1px solid var(--line); }
        #hv7 .h7-m-agent { display: flex; gap: 10px; align-items: flex-start; } #hv7 .h7-m-agent svg { color: var(--verde); margin-top: 3px; flex-shrink: 0; }
        #hv7 .h7-m-agent b { display: block; font-size: 13.5px; } #hv7 .h7-m-agent span { font-size: 12px; color: var(--mut); }
        #hv7 .h7-m-frame { border-radius: 16px; overflow: hidden; background: #fff; box-shadow: 0 24px 60px rgba(22,22,28,.18); }
        #hv7 .h7-m-frame img { display: block; width: 100%; height: auto; }
        #hv7 .h7-m-float { position: absolute; background: #fff; border: 1px solid var(--line); border-radius: 14px; padding: 10px 14px; box-shadow: 0 14px 34px rgba(22,22,28,.14); font-size: 12.5px; display: grid; gap: 2px; }
        #hv7 .h7-m-float b { font-size: 13.5px; } #hv7 .h7-m-float > span:not(.h7-aitag) { color: var(--mut); } #hv7 .h7-m-float .h7-aitag { justify-self: start; margin-bottom: 4px; }
        #hv7 .h7-m-float.fl1 { right: -8px; bottom: 26px; } #hv7 .h7-m-float.fl2 { left: -8px; top: -16px; }
        #hv7 .h7-m-pay { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        #hv7 .h7-m-stat { background: #fff; border-radius: 16px; padding: 16px; box-shadow: 0 14px 34px rgba(22,22,28,.1); display: grid; gap: 4px; }
        #hv7 .h7-m-stat span { font-size: 11.5px; color: var(--mut); } #hv7 .h7-m-stat b { font-size: 26px; letter-spacing: -.03em; line-height: 1.05; } #hv7 .h7-m-stat em { font-style: normal; font-size: 11.5px; color: var(--ink-2); }
        #hv7 .h7-m-strip { grid-column: 1 / -1; display: flex; align-items: center; gap: 10px; flex-wrap: wrap; background: #fff; border: 1px solid var(--line); border-radius: 14px; padding: 12px 14px; font-size: 13px; } #hv7 .h7-m-strip > span:last-child { color: var(--mut); margin-left: auto; }
        #hv7 .h7-m-shot { position: relative; padding: 0 0 96px; } #hv7 .h7-m-shot-img { display: block; width: 78%; border-radius: 14px; box-shadow: 0 20px 50px rgba(22,22,28,.14); } #hv7 .h7-m-shot-float { position: absolute; right: -6px; bottom: 0; width: 300px; }

        /* painel */
        #hv7 .h7-painel { border: 1px solid var(--line); border-radius: 28px; background: var(--bg); padding: 22px; }
        #hv7 .h7-painel-tabs { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; padding-bottom: 20px; border-bottom: 1px solid var(--line); }
        #hv7 .h7-painel-tab { display: inline-flex; align-items: center; gap: 8px; font-family: inherit; font-size: 14.5px; font-weight: 600; color: var(--ink-2); background: #fff; border: 1px solid var(--line); border-radius: 999px; padding: 9px 16px; cursor: pointer; transition: background .2s, color .2s, border-color .2s; }
        #hv7 .h7-painel-tab:hover { border-color: rgba(22,22,28,.25); }
        #hv7 .h7-painel-tab.is-on { background: var(--ink); color: #fff; border-color: var(--ink); }
        #hv7 .h7-painel-tab em { font-style: normal; font-size: 10px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; background: var(--neon); color: var(--ink); border-radius: 999px; padding: 2px 7px; }
        #hv7 .h7-painel-grid { display: grid; grid-template-columns: .8fr 1.2fr; gap: 32px; align-items: center; padding-top: 24px; animation: h7fade .45s ease; }
        #hv7 .h7-painel-copy h3 { margin: 0; font-size: clamp(24px, 2.4vw, 32px); letter-spacing: -.03em; line-height: 1.12; }
        #hv7 .h7-painel-copy p { margin: 12px 0 0; color: var(--ink-2); font-size: 16px; line-height: 1.6; }
        #hv7 .h7-painel-copy ul { list-style: none; margin: 18px 0 0; padding: 0; display: grid; gap: 9px; }
        #hv7 .h7-painel-copy li { display: flex; align-items: flex-start; gap: 9px; font-size: 15px; color: var(--ink); } #hv7 .h7-painel-copy li svg { color: var(--verde); flex-shrink: 0; margin-top: 3px; }
        #hv7 .h7-pm { background: #fff; border: 1px solid var(--line); border-radius: 18px; overflow: hidden; }
        #hv7 .h7-pm-bar { display: flex; align-items: center; gap: 10px; padding: 11px 14px; border-bottom: 1px solid var(--line); font-size: 12px; color: var(--mut); background: #fcfcfd; }
        #hv7 .h7-pm-dots { display: inline-flex; gap: 5px; } #hv7 .h7-pm-dots i { width: 9px; height: 9px; border-radius: 50%; background: #e2e2e8; }
        #hv7 .h7-pm-body { padding: 16px; display: grid; gap: 12px; }
        #hv7 .h7-pm-ask { background: var(--ink); color: #fff; border-radius: 14px; padding: 14px; }
        #hv7 .h7-pm-ask-h { display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; } #hv7 .h7-pm-ask-h svg { color: #C9A8FF; }
        #hv7 .h7-pm-ask-h em { font-style: normal; font-size: 10px; font-weight: 700; letter-spacing: .1em; background: var(--neon); color: var(--ink); border-radius: 999px; padding: 2px 7px; }
        #hv7 .h7-pm-input { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: 10px; background: #fff; color: var(--ink); border-radius: 10px; padding: 9px 9px 9px 12px; font-size: 13.5px; }
        #hv7 .h7-pm-input i { width: 28px; height: 28px; border-radius: 50%; background: var(--roxo); color: #fff; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
        #hv7 .h7-pm-paths { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; } #hv7 .h7-pm-paths span { font-size: 12px; padding: 5px 10px; border-radius: 999px; border: 1px solid rgba(255,255,255,.2); color: rgba(255,255,255,.85); }
        #hv7 .h7-pm-plan { border: 1px solid var(--line); border-radius: 14px; padding: 12px; display: grid; gap: 8px; }
        #hv7 .h7-pm-plan-h { display: flex; align-items: center; justify-content: space-between; gap: 8px; font-size: 12px; color: var(--mut); padding-bottom: 8px; border-bottom: 1px solid var(--line); }
        #hv7 .h7-pm-row { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 10px; font-size: 13px; } #hv7 .h7-pm-row b { display: block; font-size: 13.5px; } #hv7 .h7-pm-row div span { color: var(--mut); font-size: 12px; } #hv7 .h7-pm-row > svg { color: var(--verde); }
        #hv7 .h7-pm-ico { width: 30px; height: 30px; border-radius: 9px; background: var(--lavender); color: var(--roxo-2); display: inline-flex; align-items: center; justify-content: center; }
        #hv7 .h7-pm-btn { margin-top: 4px; text-align: center; background: var(--ink); color: #fff; font-size: 13px; font-weight: 600; border-radius: 10px; padding: 9px; }
        #hv7 .h7-pm-kpis { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; } #hv7 .h7-pm-kpis.is-3 { grid-template-columns: repeat(3, 1fr); }
        #hv7 .h7-pm-kpi { border: 1px solid var(--line); border-radius: 12px; padding: 10px 12px; } #hv7 .h7-pm-kpi span { display: block; font-size: 11px; color: var(--mut); } #hv7 .h7-pm-kpi b { display: block; font-size: 18px; letter-spacing: -.02em; margin-top: 2px; } #hv7 .h7-pm-kpi em { font-style: normal; font-size: 11.5px; font-weight: 600; color: var(--verde); }
        #hv7 .h7-pm-card { border: 1px solid var(--line); border-radius: 14px; padding: 12px; display: grid; gap: 10px; } #hv7 .h7-pm-card.is-flush { padding: 0; overflow: hidden; }
        #hv7 .h7-pm-card-h { display: flex; justify-content: space-between; align-items: center; gap: 8px; font-size: 12px; color: var(--mut); } #hv7 .h7-pm-card-h b { color: var(--ink); font-size: 13.5px; }
        #hv7 .h7-pm-meter { display: grid; grid-template-columns: 1fr 1.2fr; align-items: center; gap: 12px; } #hv7 .h7-pm-meter b { display: block; font-size: 13px; } #hv7 .h7-pm-meter span { font-size: 11.5px; color: var(--mut); }
        #hv7 .h7-pm-meter i { display: block; height: 8px; border-radius: 999px; background: var(--lavender); overflow: hidden; } #hv7 .h7-pm-meter i span { display: block; height: 100%; border-radius: 999px; background: linear-gradient(90deg, var(--roxo), #B06BFF); }
        #hv7 .h7-pm-meter.is-tight { grid-template-columns: .9fr 1.1fr; }
        #hv7 .h7-pm-split { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        #hv7 .h7-pm-err { display: flex; align-items: baseline; gap: 8px; } #hv7 .h7-pm-err b { font-size: 26px; letter-spacing: -.03em; } #hv7 .h7-pm-err span { font-size: 12.5px; color: var(--ink-2); } #hv7 .h7-pm-err.ok b { color: var(--verde); }
        #hv7 .h7-pm-table { display: grid; }
        #hv7 .h7-pm-tr { display: grid; grid-template-columns: 1.6fr 1fr .6fr .7fr; gap: 8px; align-items: center; padding: 11px 14px; font-size: 13px; border-top: 1px solid var(--line); }
        #hv7 .h7-pm-tr.is-head { border-top: 0; font-size: 11px; font-weight: 600; letter-spacing: .04em; color: var(--mut); background: #fcfcfd; }
        #hv7 .h7-pm-on { display: inline-flex; align-items: center; gap: 6px; font-weight: 600; color: var(--verde); } #hv7 .h7-pm-on::before { content: ""; width: 8px; height: 8px; border-radius: 50%; background: var(--verde); }
        #hv7 .h7-pm-share { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; border: 1px solid var(--line); border-radius: 14px; padding: 12px; }
        #hv7 .h7-pm-share > div { flex: 1; min-width: 150px; } #hv7 .h7-pm-share b { display: block; font-size: 13.5px; } #hv7 .h7-pm-share div span { font-size: 12px; color: var(--mut); }
        #hv7 .h7-pm-share-b { display: inline-flex; align-items: center; gap: 6px; font-size: 12.5px; font-weight: 600; border: 1px solid var(--line); border-radius: 10px; padding: 8px 11px; } #hv7 .h7-pm-share-b.is-wa { background: #EAF9EF; border-color: #CBEFD7; color: #13733A; }
        #hv7 .h7-pm-editor { grid-template-columns: 150px 1fr; }
        #hv7 .h7-pm-menu { display: grid; gap: 2px; align-content: start; } #hv7 .h7-pm-menu span { display: flex; align-items: center; justify-content: space-between; gap: 6px; font-size: 12.5px; color: var(--ink-2); padding: 7px 9px; border-radius: 8px; }
        #hv7 .h7-pm-menu span.is-on { background: var(--lavender); color: var(--roxo-2); font-weight: 600; }
        #hv7 .h7-pm-menu em { font-style: normal; font-size: 9.5px; font-weight: 700; color: #fff; background: var(--verde); border-radius: 999px; padding: 1px 6px; }
        #hv7 .h7-pm-preview { border: 1px solid var(--line); border-radius: 12px; overflow: hidden; }
        #hv7 .h7-pm-preview-h { display: flex; align-items: center; justify-content: space-between; padding: 8px 10px; border-bottom: 1px solid var(--line); font-size: 12px; }
        #hv7 .h7-pm-pub { display: inline-flex; align-items: center; gap: 6px; font-weight: 600; color: var(--verde); } #hv7 .h7-pm-pub i { width: 7px; height: 7px; border-radius: 50%; background: var(--verde); }
        #hv7 .h7-pm-dev { display: inline-flex; gap: 8px; color: var(--mut); }
        #hv7 .h7-pm-preview img { display: block; width: 100%; height: 230px; object-fit: cover; object-position: top left; }

        /* comparativo (classes h7-vs, sem colisão com o slider) */
        #hv7 .h7-vs-wrap { overflow-x: auto; }
        #hv7 .h7-vs { width: 100%; min-width: 760px; border-collapse: separate; border-spacing: 0; }
        #hv7 .h7-vs th, #hv7 .h7-vs td { text-align: center; padding: 14px 10px; }
        #hv7 .h7-vs thead th { font-size: 14px; font-weight: 600; color: var(--ink-2); border-bottom: 1px solid var(--line); }
        #hv7 .h7-vs thead th.is-us { color: var(--ink); font-weight: 700; background: var(--lavender); border-radius: 14px 14px 0 0; }
        #hv7 .h7-vs tbody th { text-align: left; width: 38%; padding: 16px 18px 16px 0; border-bottom: 1px solid var(--line); font-weight: 400; }
        #hv7 .h7-vs tbody th b { display: block; font-size: 16px; font-weight: 600; letter-spacing: -.01em; }
        #hv7 .h7-vs tbody th span { display: block; font-size: 13.5px; color: var(--ink-2); line-height: 1.5; margin-top: 4px; }
        #hv7 .h7-vs tbody th em { display: block; font-style: normal; font-size: 12px; color: var(--mut); margin-top: 6px; }
        #hv7 .h7-vs tbody td { border-bottom: 1px solid var(--line); }
        #hv7 .h7-vs tbody td.is-us { background: var(--lavender); }
        #hv7 .h7-vs tbody tr:last-child td.is-us { border-radius: 0 0 14px 14px; }
        #hv7 .h7-vs-mark { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 50%; font-weight: 700; font-size: 15px; }
        #hv7 .h7-vs .v-y .h7-vs-mark { background: var(--verde); color: #fff; }
        #hv7 .h7-vs .v-p .h7-vs-mark { background: var(--ambar); color: #5C3D00; }
        #hv7 .h7-vs .v-n .h7-vs-mark { color: var(--mut); }
        #hv7 .h7-vs-legend { display: flex; gap: 22px; flex-wrap: wrap; justify-content: center; margin: 22px 0 0; font-size: 13px; color: var(--ink-2); }
        #hv7 .h7-vs-legend span { display: inline-flex; align-items: center; gap: 7px; }
        #hv7 .h7-vs-legend i { display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; border-radius: 50%; font-style: normal; font-weight: 700; font-size: 12px; }
        #hv7 .h7-vs-legend .l-y { background: var(--verde); color: #fff; } #hv7 .h7-vs-legend .l-p { background: var(--ambar); color: #5C3D00; } #hv7 .h7-vs-legend .l-n { color: var(--mut); }

        /* integrações */
        #hv7 .h7-split { display: grid; grid-template-columns: 1fr 1.15fr; gap: 64px; align-items: center; }
        #hv7 .h7-split-copy h2 { font-size: clamp(30px, 3.4vw, 44px); } #hv7 .h7-split-copy .h7-textlink { margin-top: 22px; }
        #hv7 .h7-int { display: grid; gap: 18px; }
        #hv7 .h7-int-l { display: block; font-size: 11px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: var(--mut); margin-bottom: 8px; }
        #hv7 .h7-int-items { display: flex; flex-wrap: wrap; gap: 8px; }
        #hv7 .h7-int-item { display: inline-flex; align-items: center; gap: 8px; background: var(--bg); border: 1px solid var(--line); border-radius: 999px; padding: 9px 14px; font-size: 14px; font-weight: 500; color: var(--ink-2); }
        #hv7 .h7-int-item.is-ai { color: var(--ink); border-color: rgba(143,40,246,.35); background: #fff; }

        /* planos e taxas */
        #hv7 .h7-planos { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        #hv7 .h7-plano { display: flex; flex-direction: column; background: #fff; border: 1px solid var(--line); border-radius: 22px; padding: 24px; }
        #hv7 .h7-plano.is-rec { border-color: rgba(143,40,246,.45); box-shadow: 0 0 0 3px rgba(143,40,246,.1); }
        #hv7 .h7-plano-h { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
        #hv7 .h7-plano-h b { font-size: 30px; letter-spacing: -.04em; }
        #hv7 .h7-plano-h span { font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; background: var(--neon); color: var(--ink); border-radius: 999px; padding: 5px 10px; }
        #hv7 .h7-plano ul { list-style: none; margin: 18px 0 0; padding: 0; display: grid; gap: 8px; flex: 1; }
        #hv7 .h7-plano li { display: flex; align-items: flex-start; gap: 8px; font-size: 14.5px; color: var(--ink-2); line-height: 1.45; } #hv7 .h7-plano li svg { color: var(--verde); flex-shrink: 0; margin-top: 2px; }
        #hv7 .h7-plano-math { margin: 20px 0 18px; border-top: 1px solid var(--line); }
        #hv7 .h7-plano-math div { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; padding: 11px 0; border-bottom: 1px solid var(--line); font-size: 14px; }
        #hv7 .h7-plano-math span { color: var(--ink-2); } #hv7 .h7-plano-math b { font-size: 17px; letter-spacing: -.01em; }
        #hv7 .h7-plano-math .is-fee b { color: var(--roxo-2); font-size: 22px; }
        #hv7 .h7-taxas { display: grid; grid-template-columns: .8fr 1.2fr; gap: 28px; align-items: center; margin-top: 16px; background: #fff; border: 1px solid var(--line); border-radius: 22px; padding: 24px; }
        #hv7 .h7-taxas-copy h3 { margin: 12px 0 0; font-size: 26px; letter-spacing: -.03em; line-height: 1.15; }
        #hv7 .h7-taxas-pills { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
        #hv7 .h7-taxas-pills span { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; border: 1px solid var(--line); border-radius: 999px; padding: 7px 12px; background: var(--bg); } #hv7 .h7-taxas-pills svg { color: var(--verde); }
        #hv7 .h7-taxas-wrap { overflow-x: auto; }
        #hv7 .h7-taxas-t { width: 100%; min-width: 440px; border-collapse: collapse; font-size: 14.5px; }
        #hv7 .h7-taxas-t th, #hv7 .h7-taxas-t td { padding: 11px 12px; border-bottom: 1px solid var(--line); text-align: right; }
        #hv7 .h7-taxas-t thead th { font-size: 12px; font-weight: 700; letter-spacing: .06em; color: var(--mut); text-transform: uppercase; }
        #hv7 .h7-taxas-t th:first-child { text-align: left; } #hv7 .h7-taxas-t tbody th { font-weight: 500; color: var(--ink-2); }
        #hv7 .h7-taxas-t td { font-weight: 700; font-variant-numeric: tabular-nums; }

        /* faq, final, footer */
        #hv7 .h7-faq-item { border-top: 1px solid var(--line); } #hv7 .h7-faq-item:last-child { border-bottom: 1px solid var(--line); }
        #hv7 .h7-faq-q { width: 100%; display: flex; justify-content: space-between; align-items: center; gap: 16px; background: none; border: 0; padding: 22px 0; text-align: left; cursor: pointer; font-family: inherit; color: var(--ink); font-weight: 600; font-size: 17px; }
        #hv7 .h7-faq-q i { width: 30px; height: 30px; border-radius: 50%; border: 1px solid var(--line); display: inline-flex; align-items: center; justify-content: center; transition: transform .25s, background .2s; flex-shrink: 0; }
        #hv7 .h7-faq-item.is-open .h7-faq-q i { transform: rotate(45deg); background: var(--ink); color: #fff; border-color: var(--ink); }
        #hv7 .h7-faq-a { max-height: 0; overflow: hidden; transition: max-height .35s ease; } #hv7 .h7-faq-item.is-open .h7-faq-a { max-height: 340px; }
        #hv7 .h7-faq-a p { margin: 0 0 22px; color: var(--ink-2); font-size: 15.5px; line-height: 1.6; overflow-wrap: anywhere; }
        #hv7 .h7-final-wrap { padding: 72px 0; }
        #hv7 .h7-final { border-radius: 32px; padding: 72px 40px; text-align: center; color: #fff; background: radial-gradient(70% 90% at 80% 0%, rgba(143,40,246,.6), transparent 60%), radial-gradient(50% 70% at 10% 100%, rgba(57,255,20,.22), transparent 60%), var(--ink); }
        #hv7 .h7-final h2 { margin: 0; font-size: clamp(34px, 4.6vw, 58px); }
        #hv7 .h7-final p { color: rgba(255,255,255,.75); font-size: 18px; margin: 18px auto 0; max-width: 600px; } #hv7 .h7-final .h7-cta-row { margin-top: 30px; justify-content: center; }
        #hv7 .h7-final-cmd { margin-top: 20px; display: flex; justify-content: center; }
        #hv7 .h7-footer { padding: 56px 0 28px; border-top: 1px solid var(--line); }
        #hv7 .h7-footer-grid { display: grid; grid-template-columns: 1.6fr 1fr 1fr 1fr; gap: 32px; }
        #hv7 .h7-footer-brand p { color: var(--mut); font-size: 14px; margin-top: 12px; max-width: 300px; }
        #hv7 .h7-footer h4 { margin: 0 0 12px; font-size: 13px; letter-spacing: .1em; text-transform: uppercase; color: var(--mut); }
        #hv7 .h7-footer-grid a { display: block; font-size: 15px; padding: 5px 0; color: var(--ink-2); } #hv7 .h7-footer-grid a:hover { color: var(--ink); }
        #hv7 .h7-footer-bottom { margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--line); color: var(--mut); font-size: 13px; }

        @media (max-width: 1240px) {
          #hv7 .h7-logos { grid-template-columns: 1fr; gap: 8px; justify-items: center; }
        }
        @media (max-width: 980px) {
          #hv7 .h7-links, #hv7 .h7-nav-cta .h7-btn-ghost, #hv7 .h7-nav-cta .h7-btn-dark { display: none; } #hv7 .h7-burger { display: inline-flex; }
          #hv7 .h7-prod-grid, #hv7 .h7-split, #hv7 .h7-cli-grid, #hv7 .h7-painel-grid, #hv7 .h7-taxas { grid-template-columns: 1fr; gap: 28px; }
          #hv7 .h7-showcase { grid-template-columns: 1fr; padding: 26px 22px 0; } #hv7 .h7-showcase-copy { padding-bottom: 8px; }
          #hv7 .h7-prod.is-rev .h7-prod-copy { order: 0; }
          #hv7 .h7-cases, #hv7 .h7-planos { grid-template-columns: 1fr; } #hv7 .h7-metrics-grid { grid-template-columns: repeat(2, 1fr); }
          #hv7 .h7-metric:nth-child(3) { border-left: 0; padding-left: 0; } #hv7 .h7-metric:nth-child(-n+2) { border-bottom: 1px solid var(--line); }
          #hv7 .h7-spot { grid-template-columns: 1fr; gap: 20px; padding: 26px; } #hv7 .h7-spot-who { flex-direction: row; align-items: center; } #hv7 .h7-spot-who img { width: 64px; height: 64px; }
          #hv7 .h7-spot-stats { grid-template-columns: 1fr 1fr; }
          #hv7 .h7-backers { grid-template-columns: 1fr; }
          #hv7 .h7-logos-g { flex-direction: column; gap: 8px; } #hv7 .h7-logos-row { justify-content: center; }
          #hv7 .h7-tour-l { display: none; } #hv7 .h7-prod { padding: 60px 0; scroll-margin-top: 126px; }
          #hv7 .h7-footer-grid { grid-template-columns: 1fr 1fr; } #hv7 .h7-sec { padding: 64px 0; }
          #hv7 .h7-visual-bg { padding: 20px; min-height: 0; }
          #hv7 .h7-painel-tabs { flex-wrap: nowrap; justify-content: flex-start; overflow-x: auto; scrollbar-width: none; margin: 0 -22px; padding: 0 22px 18px; } #hv7 .h7-painel-tabs::-webkit-scrollbar { display: none; }
          #hv7 .h7-painel-tab { flex-shrink: 0; }
        }
        @media (max-width: 640px) {
          #hv7 .h7-wrap { padding: 0 18px; }
          #hv7 .h7-announce { font-size: 12.5px; padding: 8px 14px; } #hv7 .h7-announce b { display: none; }
          #hv7 .h7-hero { padding-top: 48px; }
          #hv7 .h7-cta-row .h7-btn-lg { width: 100%; }
          #hv7 .h7-cmd { font-size: 11.5px; padding: 6px 6px 6px 11px; gap: 8px; } #hv7 .h7-cmd-c { padding: 7px 9px; font-size: 12px; }
          #hv7 .h7-subs, #hv7 .h7-footer-grid, #hv7 .h7-estilos { grid-template-columns: 1fr; }
          #hv7 .h7-agentes { grid-template-columns: 1fr 1fr; }
          #hv7 .h7-ba { height: 300px; }
          #hv7 .h7-m-store { flex-direction: column; } #hv7 .h7-m-pay { grid-template-columns: 1fr 1fr; }
          #hv7 .h7-panel { border-radius: 22px; padding: 18px 14px 0; } #hv7 .h7-ptab-lbl { display: none; } #hv7 .h7-ptab { padding: 6px; } #hv7 .h7-showcase-media img { height: 220px; }
          #hv7 .h7-m-shot { padding-bottom: 0; } #hv7 .h7-m-shot-img { width: 100%; } #hv7 .h7-m-shot-float { position: static; width: 100%; margin-top: 12px; }
          #hv7 .h7-marcas { gap: 18px 30px; } #hv7 .h7-marcas img { max-width: 120px; }
          #hv7 .h7-metric { padding: 22px 0 22px 16px; } #hv7 .h7-metric:nth-child(odd) { padding-left: 0; border-left: 0; }
          #hv7 .h7-backer-imgs { flex-direction: column; align-items: flex-start; gap: 6px; } #hv7 .h7-backer.is-wide .h7-backer-imgs img { max-width: 100%; }
          #hv7 .h7-backer-imgs img { height: auto; width: 100%; }
          #hv7 .h7-press { flex-direction: column; align-items: flex-start; gap: 10px; }
          #hv7 .h7-spot-stats { grid-template-columns: 1fr; }
          #hv7 .h7-math { grid-template-columns: 1fr; gap: 8px; } #hv7 .h7-math-arrow { display: none; }
          #hv7 .h7-painel { padding: 16px; border-radius: 22px; } #hv7 .h7-painel-tabs { margin: 0 -16px; padding: 0 16px 16px; }
          #hv7 .h7-pm-kpis, #hv7 .h7-pm-kpis.is-3, #hv7 .h7-pm-split { grid-template-columns: 1fr 1fr; }
          #hv7 .h7-pm-editor { grid-template-columns: 1fr; } #hv7 .h7-pm-menu { grid-template-columns: 1fr 1fr; }
          #hv7 .h7-pm-tr { grid-template-columns: 1.4fr 1fr .5fr; } #hv7 .h7-pm-tr > span:nth-child(4) { display: none; }
          #hv7 .h7-final { padding: 48px 20px; border-radius: 24px; }
          #hv7 .h7-vs-wrap { overflow: visible; }
          #hv7 .h7-vs { min-width: 0; display: block; }
          #hv7 .h7-vs thead { display: none; }
          #hv7 .h7-vs tbody { display: block; }
          #hv7 .h7-vs tbody tr { display: grid; grid-template-columns: repeat(5, 1fr); gap: 5px; padding: 18px 0; border-bottom: 1px solid var(--line); }
          #hv7 .h7-vs tbody th { grid-column: 1 / -1; width: auto; padding: 0 0 10px; border: 0; }
          #hv7 .h7-vs tbody td { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 9px 2px 8px; border: 0; border-radius: 12px; }
          #hv7 .h7-vs tbody td::after { content: attr(data-l); font-size: 10.5px; font-weight: 600; color: var(--ink-2); letter-spacing: -.01em; }
          #hv7 .h7-vs tbody td.is-us, #hv7 .h7-vs tbody tr:last-child td.is-us { border-radius: 12px; }
          #hv7 .h7-vs tbody td.is-us::after { color: var(--roxo-2); }
          #hv7 .h7-vs-mark { width: 26px; height: 26px; font-size: 14px; }
          #hv7 .h7-taxas { padding: 18px; }
          #hv7 .h7-taxas-t { min-width: 0; font-size: 13px; }
          #hv7 .h7-taxas-t th, #hv7 .h7-taxas-t td { padding: 10px 4px; }
          #hv7 .h7-taxas-t thead th { font-size: 10px; letter-spacing: .02em; line-height: 1.3; }
          #hv7 .h7-taxas-t tbody th { font-size: 12.5px; }
          #hv7 .h7-cli-term-b { font-size: 11.5px; padding: 14px 14px 18px; }
          #hv7 .h7-band-foot { flex-direction: column; align-items: flex-start; gap: 10px; }
          #hv7 .h7-final-wrap { padding: 48px 0; }
        }
        @media (prefers-reduced-motion: reduce) { #hv7 [data-rv] { opacity: 1 !important; transform: none !important; } #hv7 .h7-bub, #hv7 .h7-tl { opacity: 1; animation: none; } #hv7 .h7-showcase, #hv7 .h7-painel-grid { animation: none; } }
      `}</style>
    </>
  )
}
