// verticais.js — conteúdo das landing pages por segmento (vertical).
// Cada chave é um slug acessível em /<slug> (ex.: /wellness). Para criar uma
// nova vertical, basta adicionar outro objeto seguindo o mesmo schema — a
// página /<slug> é gerada automaticamente (pages/[vertical].jsx).
//
// Schema de uma vertical:
//   nome        : rótulo curto do segmento
//   seo         : { title, description }
//   hero        : { badge, title, lede, ctaPrimary?, stats: [{num, unit, label}] }
//   dores       : { eyebrow, title, lede, items: [{icon, t, d}] }
//   pilares     : { eyebrow, title, lede, items: [{icon, t, d}] }
//   categorias  : { eyebrow, title, lede, items: [{icon, name}] }
//   como        : { eyebrow, title, steps: [{icon, title, desc}] }
//   metrics     : [{num, unit, label}]
//   cta         : { title, sub }
//
// Em title/cta.title use **texto** para destacar trechos em roxo.
// icon = nome de um ícone do FIcon (ver components/PageKit.jsx).

export const VERTICAIS = {
  wellness: {
    nome: "Wellness",
    seo: {
      title: "Unbox para Wellness · E-commerce para suplementos, cosméticos e beleza",
      description:
        "A plataforma de e-commerce feita para marcas de wellness: assinatura e recorrência, checkout de alta conversão e crédito — tudo integrado para vender mais e reter mais.",
    },
    hero: {
      badge: "Unbox para Wellness",
      title: "No wellness, quem **recompra** é quem cresce.",
      lede:
        "A plataforma de e-commerce feita para marcas de suplementos, cosméticos e beleza. Assinatura, checkout de alta conversão e crédito — tudo integrado para você vender mais e transformar cada cliente em receita recorrente.",
      stats: [
        { num: "+15", unit: " mil", label: "marcas já vendem com a Unbox" },
        { num: "+5,9", unit: "×", label: "crescimento médio de vendas" },
        { num: "98", unit: "%", label: "de aprovação no UnboxPay" },
      ],
    },
    dores: {
      eyebrow: "O desafio",
      title: "Marca de wellness não vive de **primeira compra**.",
      lede:
        "Seu produto é de consumo recorrente — mas a operação não foi feita para isso. É aí que a margem escapa:",
      items: [
        { icon: "repeat", t: "Cliente compra uma vez e some", d: "Sem assinatura nem recompra automática, cada venda recomeça do zero e o LTV fica baixo." },
        { icon: "tag", t: "Carrinho abandonado no checkout", d: "Checkout lento, sem 1-clique nem upsell — e quem chega a pagar leva só uma unidade." },
        { icon: "box", t: "Capital preso em estoque", d: "Reposição de SKU e produção travam o caixa justo quando a demanda cresce." },
        { icon: "plug", t: "Mil ferramentas desconectadas", d: "Loja, checkout, assinatura e pagamento em sistemas separados que não conversam." },
      ],
    },
    pilares: {
      eyebrow: "A plataforma",
      title: "Tudo para transformar **recompra em recorrência**.",
      lede:
        "Os pilares da Unbox, na ordem que mais importa para uma marca de wellness:",
      items: [
        { icon: "repeat", t: "Assinatura & recorrência", d: "Clube de assinatura e reposição automática: previsibilidade de receita e LTV maior em quem já compra com você." },
        { icon: "zap", t: "Checkout de alta conversão", d: "Turbo Checkout com 1-clique, order bump e upsell — menos abandono e ticket maior no mesmo tráfego." },
        { icon: "wallet", t: "Crédito UnboxPay", d: "Capital alinhado ao ciclo de vendas para financiar estoque e produção sem travar o seu caixa." },
        { icon: "layers", t: "Tudo-em-um integrado", d: "Loja, checkout, assinatura, pagamentos e creators num só lugar — sem amarrar várias ferramentas." },
      ],
    },
    categorias: {
      eyebrow: "Feita para o seu segmento",
      title: "Do suplemento ao skincare, a Unbox entende o seu produto.",
      lede: "Marcas de wellness que crescem com a gente:",
      items: [
        { icon: "box", name: "Suplementos & nutracêuticos" },
        { icon: "sparkle", name: "Cosméticos & skincare" },
        { icon: "hand", name: "Beleza & cuidados pessoais" },
        { icon: "shield", name: "Saúde & bem-estar" },
      ],
    },
    como: {
      eyebrow: "Como começar",
      title: "Da migração ao crescimento, no seu ritmo.",
      steps: [
        { icon: "truck", title: "Migração assistida", desc: "Trazemos sua loja atual para a Unbox sem dor de cabeça e sem perder vendas." },
        { icon: "repeat", title: "Ative assinatura + checkout", desc: "Configure o clube de recorrência e o Turbo Checkout para vender mais por cliente." },
        { icon: "wallet", title: "Destrave capital e creators", desc: "Ative o crédito UnboxPay e a rede de creators para acelerar o crescimento." },
        { icon: "chart", title: "Escale com dados", desc: "Acompanhe recompra, LTV e conversão num só painel e tome decisões na hora certa." },
      ],
    },
    metrics: [
      { icon: "store", num: "+15", unit: " mil", label: "lojas cadastradas" },
      { icon: "chart", num: "+5,9", unit: "×", label: "crescimento médio" },
      { icon: "zap", num: "4", unit: "×", label: "mais conversão" },
      { icon: "shield", num: "98", unit: "%", label: "aprovação UnboxPay" },
    ],
    cta: {
      title: "Pronto para transformar recompra em **recorrência**?",
      sub: "Migração assistida · Suporte humano · Tudo em um só lugar",
    },
  },
};
