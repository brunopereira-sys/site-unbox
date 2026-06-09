// FeaturesData.jsx, ícones + dados de conteúdo da página de Recursos.

/* ---- Lucide-style stroke icons (mesmo set da home) ---- */
function FIcon({ name, size = 22 }) {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
  const paths = {
    layout: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></>,
    zap: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
    repeat: <><path d="m17 2 4 4-4 4" /><path d="M3 11v-1a4 4 0 0 1 4-4h14" /><path d="m7 22-4-4 4-4" /><path d="M21 13v1a4 4 0 0 1-4 4H3" /></>,
    gauge: <><path d="m12 14 4-4" /><path d="M3.34 19a10 10 0 1 1 17.32 0" /></>,
    settings: <><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" /></>,
    chart: <><path d="M3 3v18h18" /><path d="m7 14 3-3 3 3 5-5" /></>,
    headset: <><path d="M3 14v-3a9 9 0 0 1 18 0v3" /><path d="M21 16a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2ZM3 16a2 2 0 0 0 2 2h1v-5H5a2 2 0 0 0-2 2Z" /><path d="M18 18a4 4 0 0 1-4 3h-2" /></>,
    box: <><path d="M21 8 12 3 3 8v8l9 5 9-5Z" /><path d="m3 8 9 5 9-5M12 13v8" /></>,
    tag: <><path d="M12.6 2.6 21 11a2 2 0 0 1 0 2.8l-7.2 7.2a2 2 0 0 1-2.8 0L2.6 12.6A2 2 0 0 1 2 11.2V4a2 2 0 0 1 2-2h7.2a2 2 0 0 1 1.4.6Z" /><circle cx="7.5" cy="7.5" r="1" /></>,
    hand: <><path d="M18 11V6a2 2 0 0 0-4 0M14 10V4a2 2 0 0 0-4 0v2" /><path d="M10 10.5V6a2 2 0 0 0-4 0v8" /><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" /></>,
    sparkle: <><path d="M12 3v4M12 17v4M3 12h4M17 12h4" /><path d="m6.3 6.3 2.4 2.4M15.3 15.3l2.4 2.4M17.7 6.3l-2.4 2.4M8.7 15.3l-2.4 2.4" /></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></>,
    bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    check: <path d="m5 12 4.5 4.5L19 7" />,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
    truck: <><path d="M14 18V6a1 1 0 0 0-1-1H2v13h2" /><path d="M14 9h4l3 3v6h-3" /><path d="M10 18h2" /><circle cx="6" cy="18.5" r="2" /><circle cx="17" cy="18.5" r="2" /></>,
    card: <><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></>,
    pin: <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></>,
    file: <><path d="M14 3v5h5" /><path d="M19 21H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h9l5 5v11a1 1 0 0 1-1 1Z" /></>,
    layers: <><path d="M12 2 2 7l10 5 10-5-10-5Z" /><path d="m2 17 10 5 10-5" /><path d="m2 12 10 5 10-5" /></>,
    plug: <><path d="M9 2v6M15 2v6" /><path d="M7 8h10v3a5 5 0 0 1-10 0V8Z" /><path d="M12 16v6" /></>,
  };
  return <svg {...p}>{paths[name] || paths.box}</svg>;
}
window.FIcon = FIcon;

// Ecossistema do hero (núcleo Unbox no centro, capacidades + integrações ao redor)
window.FP_ECO = [
  { icon: "layout", t: "Loja Virtual" },
  { icon: "bolt", t: "Checkout TURBO" },
  { icon: "repeat", t: "Assinatura" },
  { icon: "card", t: "UnboxPay" },
  { core: true },
  { icon: "truck", t: "Unbox Envios" },
  { icon: "users", t: "Meta & Instagram" },
  { icon: "headset", t: "WhatsApp" },
  { icon: "box", t: "Bling & Google" },
];

// Formas de vender
window.FP_WAYS = [
  { icon: "layout", t: "Loja Virtual", d: "Sua loja online profissional. Crie um site de alta performance, otimizado para conversão." },
  { icon: "zap", t: "Link PagEnvie", d: "O link de pagamento com logística integrada. O jeito mais rápido de vender online." },
  { icon: "users", t: "Venda pelas redes", d: "Feita para negócios que vendem por Instagram, Facebook e WhatsApp." },
  { icon: "bolt", t: "Turbo Checkout", d: "Checkout nativo de 3 etapas, sem redirecionamento. +98% de aprovação e 4× mais conversão." },
];

// Integrações
window.FP_INTEGRATIONS = [
  { icon: "users", t: "Facebook & Meta", d: "Integre contas do Facebook, Instagram e WhatsApp, instale seu pixel e o Business Manager." },
  { icon: "tag", t: "Sacolinha do Instagram", d: "Instale o catálogo do Instagram Shopping e venda na principal rede social do Brasil." },
  { icon: "headset", t: "Botão do WhatsApp", d: "O canal direto entre clientes e empresa, com o ícone do Whats no seu site." },
  { icon: "chart", t: "Google Shopping", d: "Seus produtos na maior vitrine virtual do mundo, com anúncios no Shopping." },
  { icon: "gauge", t: "Google Analytics", d: "Colete dados de visitantes, meça campanhas e os produtos mais acessados." },
  { icon: "bolt", t: "Google Tag Manager", d: "Instale ferramentas na loja e avalie a atividade e dados avançados de e-commerce." },
  { icon: "box", t: "ERP Bling", d: "Unifique cadastro de produtos, emissões e notas fiscais com a integração Bling." },
  { icon: "truck", t: "Transportadoras", d: "Correios, Total Express ou a sua própria. Integramos os melhores meios de envio." },
  { icon: "settings", t: "Domínio e SSL grátis", d: "Domínio gratuito ou o seu próprio (.com.br), com certificado SSL já configurado." },
];

// Personalização
window.FP_CUSTOM = [
  { icon: "settings", t: "Design", d: "Edite cores, aplique o logo da sua marca e dê personalidade. Performance e liberdade para criar." },
  { icon: "box", t: "Produto", d: "Crie categorias, suba imagens e vídeos. As principais ferramentas de e-commerce a serviço da conversão." },
  { icon: "gauge", t: "Alta conversão", d: "Layout funcional e profissional. Fluxo de compra fácil e intuitivo para turbinar suas vendas." },
];

// Recursos para turbinar
window.FP_BOOST = [
  { icon: "layers", t: "Bundles & Combos", d: "Monte kits e ofereça mais unidades com desconto progressivo na página de produto. Aumente o ticket médio de forma nativa." },
  { icon: "tag", t: "Cupons de desconto", d: "Personalize por valor fixo, porcentagem ou frete para surpreender seus clientes." },
  { icon: "gauge", t: "SEO e performance", d: "Alta velocidade garantindo a relevância do site em buscadores como o Google." },
  { icon: "truck", t: "Frete grátis e flexível", d: "Frete grátis, retirada na loja, valores promocionais por CEP e muito mais." },
  { icon: "card", t: "Preços promocionais", d: "Aplique preços promocionais na vitrine, uma das formas mais eficientes de fechar vendas." },
  { icon: "bolt", t: "Voucher promocional", d: "Além dos cupons em porcentagem, ofereça vouchers com desconto por valor fixo." },
];

// UnboxPay
window.FP_PAY = [
  { icon: "tag", t: "As melhores taxas do mercado", d: "A partir de 2,99% no cartão e 1% no Pix. Receba em 2, 14 ou 30 dias, sem taxa de saque." },
  { icon: "card", t: "Meios de pagamento e parcelamento", d: "Todas as bandeiras, Pix e boleto, com parcelamento em até 12×." },
  { icon: "check", t: "Checkout seguro e transparente", d: "Todo o processo de compra acontece na sua loja, com registro do cliente e da logística." },
  { icon: "shield", t: "Antifraude com IA", d: "Análise de pedidos, cruzamento de dados e barreiras antirroubo protegem sua loja." },
];

// Unbox Envios
window.FP_SHIP = [
  { icon: "truck", t: "Cálculo de frete automático", d: "O cliente vê o valor do frete na hora, informando só o CEP de destino." },
  { icon: "pin", t: "Rastreie suas vendas", d: "Acompanhe onde está e quando chega cada pedido com o rastreio inteligente." },
  { icon: "box", t: "Retire na loja e meios próprios", d: "Cadastre pontos de retirada ou entrega via motoboy como opção de logística." },
  { icon: "tag", t: "Valores personalizados", d: "Crie condições de prazo e custo por CEP. Use o frete a favor das suas vendas." },
  { icon: "file", t: "Impressão de etiquetas", d: "Imprima suas etiquetas com os dados dos pedidos e agilize a logística." },
  { icon: "plug", t: "Totalmente integrado ao checkout", d: "O frete já aparece no checkout da Unbox, sem integrações externas nem retrabalho." },
];
window.FP_SHIP_TAGS = [
  { icon: "truck", t: "Frete até 50% mais barato" },
  { icon: "check", t: "Sem contrato" },
  { icon: "file", t: "Etiquetas em um clique" },
  { icon: "shield", t: "Logística sem custos extras" },
];

// Gestão de pedidos e estoque
window.FP_MANAGE = [
  { icon: "box", t: "Produtos ilimitados", d: "Venda quantos produtos quiser, sem limite de tamanhos, variações ou modelos." },
  { icon: "gauge", t: "Visitas ilimitadas", d: "Nenhum plano cobra a mais por acessos. Estabilidade de 1 a 1 milhão de visitantes." },
  { icon: "headset", t: "WhatsApp com o cliente", d: "Dados do comprador e link direto para o Whats na própria gestão de pedidos." },
  { icon: "layout", t: "Gestão no Painel Unbox", d: "Produtos, pedidos e vendas em um só lugar, sem vender o que não tem em estoque." },
  { icon: "tag", t: "Categorias e variações", d: "Registre variações, tamanhos, medidas e unidades disponíveis em estoque." },
  { icon: "repeat", t: "Exporte catálogo XML", d: "Exporte seu catálogo para editar em arquivo e integrar com redes sociais." },
];

// Suporte
window.FP_SUPPORT = [
  { icon: "headset", t: "Suporte nota 10", d: "Avaliado entre os lojistas. Sempre on para facilitar sua experiência de vendas." },
  { icon: "chart", t: "Acompanhamento de vendas", d: "Reuniões de performance com dicas para turbinar conversões e resultados." },
  { icon: "users", t: "Múltiplos canais", d: "Atendimento por WhatsApp, chat, e-mail ou FAQ em horário estendido." },
  { icon: "sparkle", t: "Comunidade empreendedora", d: "Eventos, lives e promoções exclusivas da Unbox." },
];

// Trilha de aprendizado
window.FP_LEARN = [
  { icon: "zap", t: "Loja em poucos passos", d: "Trilha intuitiva de cadastro. Em 5 minutos sua loja já está pronta para vender." },
  { icon: "check", t: "Checklist Venda Mais", d: "O guia de marketing e e-commerce da Unbox, gratuito no seu Painel." },
  { icon: "chart", t: "Blog Venda Mais", d: "Artigos, passo a passo, materiais e aulas de como vender mais online." },
  { icon: "sparkle", t: "Unbox Ensina & Café", d: "Aula semanal em vídeo e a newsletter com as notícias do mercado." },
];
