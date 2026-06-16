// verticais.js — conteúdo das landing pages por segmento (vertical).
// Cada chave é um slug acessível em /<slug> (ex.: /wellness). Para criar uma
// nova vertical, adicione outro objeto seguindo o mesmo schema — a página
// /<slug> é gerada automaticamente (pages/[vertical].jsx).
//
// Estrutura adaptada da landing de referência (Enviagora), seção por seção:
//   hero          : { badge, title, lede, chips:[str], cta, problema:{title, rows:[{label,value,bad}]} }
//   familiar      : { title, sub, items:[{icon, quote}] }              // "Isso soa familiar?"
//   especializacao: { title, lede, items:[{icon, t, d}] }             // "Especializada em:"
//   passos        : { eyebrow, title, sub, steps:[{icon, t, d}] }     // "em 3 passos" (#como-funciona)
//   mecanismo     : { eyebrow, title, body, from:{value,label}, to:{value,label}, note }  // ecossistema
//   metrics       : { eyebrow, title, lede, items:[{num, unit, label, sub}] }
//   integracoes   : { eyebrow, title, lede, groups:[{icon, title, items:[str]}] }
//   capacidades   : { eyebrow, title, lede, items:[{icon, t, d}] }    // grid de 9
//   cta           : { title, sub, button }
//
// Em title/quote/body/note use **texto** para destacar em roxo.
// icon = nome de um ícone do FIcon (ver components/PageKit.jsx).

export const VERTICAIS = {
  wellness: {
    nome: "Wellness",
    seo: {
      title: "Unbox para Wellness · A plataforma que converte e fideliza",
      description:
        "Marcas de suplementos, cosméticos e beleza vendem até 4× mais com a Unbox: checkout de alta conversão, assinatura nativa e crédito — tudo integrado, sem apps e sem dólar.",
    },

    // 1. HERO — "Seu frete custa caro demais. E isso está matando sua margem."
    hero: {
      badge: "Unbox para Wellness",
      title: "Sua plataforma cobra caro e converte de menos. E isso está **matando** seu faturamento.",
      lede:
        "A Unbox é a plataforma de e-commerce de alta conversão do Brasil. Marcas de wellness que migram vendem até 4× mais e transformam tráfego em receita recorrente — sem app, sem dólar, sem agência.",
      chips: [
        "Até 4× mais conversão no checkout",
        "Assinatura nativa que multiplica o LTV",
        "98% de aprovação nos pagamentos",
      ],
      cta: "Quero simular meu crescimento",
      problema: {
        title: "Sua operação hoje",
        rows: [
          { label: "Conversão do checkout", value: "1,1%", bad: true },
          { label: "Custo da plataforma", value: "US$ / mês", bad: true },
          { label: "Apps pra ter o básico", value: "5+", bad: true },
          { label: "Taxa de recompra", value: "~8%", bad: true },
        ],
      },
    },

    // 2. ISSO SOA FAMILIAR? — dores em 1ª pessoa
    familiar: {
      title: "Isso soa familiar?",
      sub: "Se você se identificou com alguma dessas situações, a Unbox foi feita pra sua marca.",
      items: [
        { icon: "card", quote: "Pago caro **em dólar** e ainda preciso de um monte de app pra ter o básico funcionando." },
        { icon: "zap", quote: "Meu checkout **derruba venda**: Pix que não converte, carrinho abandonado e quem compra leva só 1 unidade." },
        { icon: "repeat", quote: "Faço uma venda boa, mas o cliente **some** no mês seguinte. Minha recompra é uma loteria." },
        { icon: "chart", quote: "Gasto fortunas em ads e **68% abandona o carrinho** quando chega no checkout." },
      ],
    },

    // 3. ESPECIALIZADA EM — Suplementos / Beleza
    especializacao: {
      title: "Operação pensada e especializada em:",
      lede: "A Unbox entende o que faz uma marca de wellness crescer — e o que a trava.",
      items: [
        { icon: "box", t: "Suplementos e nutracêuticos", d: "Atendemos marcas que vivem de recompra: assinatura, reposição automática e checkout que aguenta pico de campanha em todo o Brasil." },
        { icon: "sparkle", t: "Beleza e cuidado pessoal", d: "Do skincare ao haircare: páginas customizadas, kits, combos promocionais e upsell pensados para aumentar o ticket e a experiência." },
      ],
    },

    // 4. EM 3 PASSOS — "Do seu estoque ao cliente final em 3 passos"
    passos: {
      eyebrow: "Como funciona",
      title: "Da migração à venda recorrente em 3 passos. Sem você tocar em código.",
      sub: "A gente cuida da parte chata pra você focar no que vende de verdade.",
      steps: [
        { icon: "truck", t: "Migramos sua loja", d: "Trazemos catálogo, clientes e histórico pra Unbox sem perder venda nem ranqueamento. Migração assistida de ponta a ponta." },
        { icon: "settings", t: "Configuramos pra converter", d: "Checkout, assinatura, upsell, order bump e bundles ativados do jeito que sua marca precisa — tudo nativo." },
        { icon: "chart", t: "Você escala com recorrência", d: "Cada cliente vira receita recorrente. Acompanhe conversão, LTV e recompra num só painel e cresça com dados." },
      ],
    },

    // 5. MECANISMO — ecossistema (volume → vantagem). Paralelo ao LogAlliance.
    mecanismo: {
      eyebrow: "Por que funciona",
      title: "Sua marca ganha o poder de quem processa **bilhões**.",
      body:
        "No ecossistema Unbox, sua marca não negocia sozinha. Você herda a escala de mais de 15 mil lojas — em aprovação de pagamento, taxa e infraestrutura — desde o primeiro dia.",
      from: { value: "Sozinho", label: "Aprovação baixa, taxa cara, tudo separado" },
      to: { value: "98%", label: "de aprovação e custo de quem opera em escala" },
      note: "Sem taxa escondida, sem dólar, **sem depender de apps de terceiros**.",
    },

    // 6. MÉTRICAS DE PERFORMANCE
    metrics: {
      eyebrow: "Resultados reais",
      title: "Marcas que **escalam** com a Unbox.",
      items: [
        { num: "690", unit: "%", label: "crescimento médio", sub: "de vendas no primeiro ano" },
        { num: "4", unit: "×", label: "mais conversão", sub: "de 1,1% para até 4,2%" },
        { num: "+15", unit: " mil", label: "lojas ativas", sub: "na plataforma" },
        { num: "98", unit: "%", label: "de aprovação", sub: "nos pagamentos UnboxPay" },
      ],
    },

    // 7. INTEGRAÇÕES
    integracoes: {
      eyebrow: "Integra com tudo que você já usa",
      title: "Conecta com o seu ecossistema em poucos cliques.",
      groups: [
        { icon: "store", title: "Marketplaces", items: ["Mercado Livre", "Amazon", "Shopee", "Magalu"] },
        { icon: "file", title: "ERPs & gestão", items: ["Bling", "Tiny", "Omie"] },
        { icon: "chart", title: "Marketing & dados", items: ["Meta Pixel", "Google Ads", "GA4", "RD Station"] },
      ],
    },

    // 8. GRID DE CAPACIDADES (9)
    capacidades: {
      eyebrow: "Tudo nativo, num só lugar",
      title: "O que a Unbox entrega — sem app, sem improviso.",
      items: [
        { icon: "zap", t: "Checkout de alta conversão", d: "1-clique, Pix otimizado e fluxo pensado pro consumidor brasileiro." },
        { icon: "repeat", t: "Assinatura nativa", d: "Compra única e recorrência no mesmo carrinho." },
        { icon: "tag", t: "Upsell & order bump", d: "Aumente o ticket médio sem depender de apps pagos." },
        { icon: "box", t: "Bundles e kits", d: "Monte combos e kits que vendem mais por pedido." },
        { icon: "wallet", t: "Pagamentos + crédito", d: "Venda, receba e financie o crescimento no mesmo lugar." },
        { icon: "users", t: "Creators & afiliados", d: "Rede de creators integrada ao checkout, com rastreio nativo." },
        { icon: "layout", t: "Páginas customizadas", d: "Landing pages e PDPs de alta conversão, sem dev." },
        { icon: "shield", t: "Antifraude & aprovação", d: "Mais vendas aprovadas com menos chargeback." },
        { icon: "chart", t: "Painel de dados", d: "Conversão, LTV e recompra num só lugar, em tempo real." },
      ],
    },

    // 9. CTA FINAL — "Estamos selecionando marcas..."
    cta: {
      title: "Estamos selecionando marcas de wellness que querem crescer com **recorrência 5 estrelas**.",
      sub: "Migração assistida · Suporte humano · Tudo em um só lugar",
      button: "Quero simular meu crescimento",
    },
  },
};
