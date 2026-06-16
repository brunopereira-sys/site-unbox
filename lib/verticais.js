// verticais.js — conteúdo das landing pages por segmento (vertical).
// Cada chave é um slug acessível em /<slug> (ex.: /wellness). Para criar uma
// nova vertical, adicione outro objeto seguindo o mesmo schema — a página
// /<slug> é gerada automaticamente (pages/[vertical].jsx).
//
// Seções (todas opcionais, renderizadas nesta ordem):
//   hero       : { badge, title, lede, chips: [str], cta, problema: { title, rows: [{label, value, bad}] } }
//   familiar   : { title, sub, items: [{ icon, quote }] }            // dores em 1ª pessoa
//   conta      : { eyebrow, title, sub, rows: [{label, value}], total: {label, value}, note }
//   solucao    : { eyebrow, title, lede, items: [{icon, t, d}] }
//   categorias : { eyebrow, title, lede, items: [{icon, name}] }
//   prova      : { eyebrow, title, lede, stats: [{num, unit, label, sub}] }
//   comparativo: { title, sub, caption, colA, colB, rows: [{label, a, b}] }
//   cta        : { title, sub }
//
// Em title/quote/note use **texto** para destacar em roxo.
// icon = nome de um ícone do FIcon (ver components/PageKit.jsx).

export const VERTICAIS = {
  wellness: {
    nome: "Wellness",
    seo: {
      title: "Unbox para Wellness · Pare de vender uma vez só",
      description:
        "Suplemento e skincare são consumo recorrente — mas sua loja trata cada venda como a primeira. A Unbox transforma recompra em receita recorrente: assinatura, checkout que converte e crédito, tudo nativo.",
    },

    hero: {
      badge: "Unbox para Wellness",
      title: "Sua marca de wellness vende uma vez. E **perde o cliente** pra sempre.",
      lede:
        "Suplemento e skincare são consumo recorrente. Mas sua loja trata cada venda como se fosse a primeira — e deixa dinheiro na mesa todo mês.",
      chips: [
        "Até 3× mais LTV com assinatura",
        "4× mais conversão no checkout",
        "Recompra no automático",
      ],
      cta: "Quero vender com recorrência",
      problema: {
        title: "Sua operação hoje",
        rows: [
          { label: "Taxa de recompra", value: "~8%", bad: true },
          { label: "Receita previsível", value: "R$ 0", bad: true },
          { label: "Abandono no checkout", value: "68%", bad: true },
          { label: "Apps pra dar conta", value: "5+", bad: true },
        ],
      },
    },

    familiar: {
      title: "Isso soa familiar?",
      sub: "Se você se identificou com alguma dessas, a Unbox foi feita pra sua marca.",
      items: [
        { icon: "repeat", quote: "Faço uma venda boa, mas o cliente **some** no mês seguinte. Minha recompra é uma loteria." },
        { icon: "tag", quote: "Meu checkout **derruba venda**: carrinho abandonado, Pix que não converte, e quem compra leva só 1 unidade." },
        { icon: "plug", quote: "Pra ter assinatura, upsell e bundle eu pago **5 apps** que brigam entre si." },
        { icon: "chart", quote: "Quero escalar os ads, mas **sem recompra** meu CAC come toda a margem." },
      ],
    },

    conta: {
      eyebrow: "A conta não fecha",
      title: "O que você paga hoje só pra ter o **básico** funcionando.",
      sub: "Stack típico de uma marca de wellness — tudo que a Unbox já entrega nativo, num só lugar:",
      rows: [
        { label: "App de assinatura / recorrência", value: "R$ 2.000/mês" },
        { label: "App de checkout de alta conversão", value: "R$ 497/mês" },
        { label: "App de upsell + order bump", value: "R$ 400/mês" },
        { label: "App de bundles e kits", value: "R$ 100/mês" },
        { label: "Gateway + régua de frete", value: "R$ 150/mês" },
      ],
      total: { label: "Antes de vender a primeira unidade", value: "R$ 3.000+/mês" },
      note: "Na Unbox, **tudo isso é nativo** — sem apps brigando, sem conta surpresa.",
    },

    solucao: {
      eyebrow: "Como a Unbox resolve",
      title: "Tudo que transforma **recompra em recorrência** — nativo.",
      lede: "Sem app de terceiro, sem agência, sem improviso. Na ordem que mais importa pra wellness:",
      items: [
        { icon: "repeat", t: "Assinatura nativa", d: "Compra única e recorrência no mesmo carrinho. Reposição automática que vira receita previsível mês a mês." },
        { icon: "zap", t: "Checkout que converte", d: "1-clique, Pix otimizado, order bump e upsell nativos. Menos abandono, ticket maior no mesmo tráfego." },
        { icon: "wallet", t: "Crédito UnboxPay", d: "Capital no ritmo das vendas pra financiar estoque e produção sem travar o seu caixa." },
        { icon: "layers", t: "Tudo num só lugar", d: "Loja, checkout, assinatura, pagamentos e creators integrados. Um fornecedor responsável pelo seu resultado." },
      ],
    },

    categorias: {
      eyebrow: "Feita pro seu produto",
      title: "Do suplemento ao skincare, a Unbox entende o seu segmento.",
      lede: "Marcas de wellness que crescem com a gente:",
      items: [
        { icon: "box", name: "Suplementos & nutracêuticos" },
        { icon: "sparkle", name: "Cosméticos & skincare" },
        { icon: "hand", name: "Beleza & cuidados pessoais" },
        { icon: "shield", name: "Saúde & bem-estar" },
      ],
    },

    prova: {
      eyebrow: "Resultados reais",
      title: "Marcas que **escalam** com a Unbox.",
      stats: [
        { num: "690", unit: "%", label: "crescimento médio", sub: "de vendas no primeiro ano" },
        { num: "4", unit: "×", label: "mais conversão", sub: "de 1,1% para até 4,2%" },
        { num: "+15", unit: " mil", label: "lojas ativas", sub: "na plataforma" },
      ],
    },

    comparativo: {
      title: "Unbox vs. **stack de apps**",
      sub: "Tudo integrado. Nada externo. Nada brigando.",
      caption: "O que sua marca precisa",
      colA: "Stack de apps",
      colB: "Unbox",
      rows: [
        { label: "Assinatura no mesmo carrinho", a: false, b: true },
        { label: "Checkout pensado pro Brasil", a: false, b: true },
        { label: "Upsell & order bump nativos", a: false, b: true },
        { label: "Bundles e kits nativos", a: false, b: true },
        { label: "Crédito pra financiar estoque", a: false, b: true },
        { label: "Um só fornecedor responsável", a: false, b: true },
      ],
    },

    cta: {
      title: "Pare de vender uma vez. Comece a **faturar todo mês**.",
      sub: "Migração assistida · Suporte humano · Tudo em um só lugar",
    },
  },
};
