// verticais.js — conteúdo das landing pages por segmento (vertical).
// Cada chave é um slug acessível em /<slug> (ex.: /wellness). Para criar uma
// nova vertical, adicione outro objeto seguindo o mesmo schema — a página
// /<slug> é gerada automaticamente (pages/[vertical].jsx).
//
// Estrutura lead-gen (estilo V4), seção por seção:
//   hero        : { qualifier, title, lede, benefits:[str], form:{title,sub,button,note} }
//   depoimentos : { eyebrow, title, lede, items:[{metric, quote, name, role, placeholder}] }
//   familiar    : { eyebrow, title, sub, items:[{icon, title, quote}] }   // diagnóstico de dores
//   comparativo : { title, sub, caption, colA, colB, rows:[{label, a, b}] }
//   capacidades : { eyebrow, title, lede, items:[{icon, t, d}] }
//   metrics     : { eyebrow, title, lede, items:[{num, unit, label, sub}] }
//   faq         : { eyebrow, title, items:[{q, a}] }
//   cta         : { title, sub, button, anchor }
//
// Em title/quote use **texto** para destacar em roxo.
// icon = nome de um ícone do FIcon (ver components/PageKit.jsx).

export const VERTICAIS = {
  wellness: {
    nome: "Wellness",
    seo: {
      title: "Unbox para Wellness · Transforme recompra em receita recorrente",
      description:
        "Suplementos, cosméticos e beleza são consumo recorrente. A Unbox faz seu cliente voltar todo mês: assinatura nativa, checkout que converte 4× mais e kits. Fale com um especialista.",
    },

    // 1. HERO + FORMULÁRIO
    hero: {
      qualifier: "Para marcas de suplementos, cosméticos e beleza",
      title: "Sua marca de wellness vende uma vez e perde o cliente. A Unbox transforma cada venda em **recorrência**.",
      lede: "Suplemento, skincare e beleza são consumo recorrente — mas sua loja trata cada venda como a primeira. A Unbox foi feita pra você vender mais, fidelizar no automático e crescer com previsibilidade.",
      benefits: [
        "Assinatura nativa que vira **receita previsível** todo mês",
        "Checkout que converte **até 4× mais** — feito pro Brasil",
        "+15 mil marcas e **690% de crescimento médio** no 1º ano",
      ],
      form: {
        title: "Fale com um especialista em wellness",
        sub: "Diagnóstico gratuito da sua operação, sem compromisso.",
        button: "Quero vender com recorrência →",
        note: "O cadastro leva 2 minutos.",
      },
    },

    // 2. DEPOIMENTOS — substituir pelos cases reais
    depoimentos: {
      eyebrow: "Prova social",
      title: "Marcas de wellness que **escalam** com a Unbox.",
      lede: "De suplementos a skincare, marcas que transformaram recompra em receita recorrente.",
      items: [
        { metric: "+187%", quote: "Migramos a marca de suplementos e o checkout sozinho já mudou o jogo. Em 4 meses quase triplicamos a conversão.", name: "Nome do cliente", role: "CEO · Marca de suplementos", placeholder: true },
        { metric: "52% recorrente", quote: "A assinatura nativa virou nossa receita previsível. Hoje mais da metade do faturamento de skincare é recorrente.", name: "Nome do cliente", role: "Head de E-commerce · Skincare", placeholder: true },
        { metric: "4,2% conv.", quote: "Saímos de 1,1% pra 4,2% de conversão sem aumentar o tráfego. Kits e upsell aumentaram o ticket na hora.", name: "Nome do cliente", role: "Fundadora · Marca de beleza", placeholder: true },
      ],
    },

    // 3. DIAGNÓSTICO DE DORES (wellness)
    familiar: {
      eyebrow: "Diagnóstico",
      title: "No wellness, o ouro está na recompra. Você está **deixando passar**?",
      sub: "Se você se identificou com alguma dessas situações, a Unbox foi feita pra sua marca.",
      items: [
        { icon: "repeat", title: "Cliente compra uma vez e some", quote: "Seu produto é de uso contínuo, mas o cliente não volta sozinho. Sua recompra é uma loteria." },
        { icon: "chart", title: "Todo mês começa do zero", quote: "Sem assinatura nem reposição automática, não existe receita previsível — e o LTV fica lá embaixo." },
        { icon: "zap", title: "O checkout derruba venda", quote: "Pix que não converte, carrinho abandonado e quem compra leva só uma unidade, sem kit nem upsell." },
        { icon: "plug", title: "Um Frankenstein de apps", quote: "Pra ter assinatura, kit e upsell você junta 5 apps que brigam entre si e ainda paga em dólar." },
      ],
    },

    // 4. COMPARATIVO — o que uma marca de wellness precisa
    comparativo: {
      title: "O que uma marca de wellness precisa — **nativo**, não em 5 apps.",
      sub: "Tudo integrado. Nada externo. Nada brigando.",
      caption: "Sua marca de wellness precisa de",
      colA: "Stack de apps",
      colB: "Unbox",
      rows: [
        { label: "Assinatura e reposição automática", a: false, b: true },
        { label: "Kits, combos e bundles nativos", a: false, b: true },
        { label: "Upsell e order bump pra subir o ticket", a: false, b: true },
        { label: "Checkout de alta conversão pro Brasil", a: false, b: true },
        { label: "Crédito pra financiar estoque e produção", a: false, b: true },
        { label: "LTV e recompra num só painel", a: false, b: true },
        { label: "Sem custo em dólar, um só fornecedor", a: false, b: true },
      ],
    },

    // 5. O QUE A UNBOX FAZ — capacidades com viés wellness
    capacidades: {
      eyebrow: "O que a Unbox faz pela sua marca",
      title: "Tudo pra transformar **recompra em recorrência** — sem montar um Frankenstein de apps.",
      items: [
        { icon: "repeat", t: "Assinatura & reposição", d: "Clube de assinatura e reposição automática: o cliente de suplemento volta todo mês, no automático." },
        { icon: "zap", t: "Checkout de alta conversão", d: "1-clique, Pix otimizado e fluxo pensado pro consumidor brasileiro." },
        { icon: "box", t: "Kits, combos e bundles", d: "Monte combos de skincare e kits de suplemento que vendem mais por pedido." },
        { icon: "tag", t: "Upsell & order bump", d: "Aumente o ticket médio na hora da compra, sem app pago." },
        { icon: "wallet", t: "Pagamentos + crédito", d: "Venda, receba e financie estoque e produção no mesmo lugar." },
        { icon: "users", t: "Creators & afiliados", d: "Rede de creators integrada ao checkout — essencial pra beleza e wellness." },
        { icon: "layout", t: "Páginas customizadas", d: "Landing pages e PDPs de alta conversão pros seus lançamentos, sem dev." },
        { icon: "chart", t: "LTV & recompra no painel", d: "Acompanhe recompra, LTV e conversão em tempo real, num só lugar." },
        { icon: "headset", t: "Consultoria de growth", d: "Aqui alguém é responsável pelo seu resultado — não só pelo suporte." },
      ],
    },

    // 6. NÚMEROS
    metrics: {
      eyebrow: "Resultados reais",
      title: "Números de quem já vende com a gente.",
      items: [
        { num: "690", unit: "%", label: "crescimento médio", sub: "de vendas no 1º ano" },
        { num: "4", unit: "×", label: "mais conversão", sub: "de 1,1% para até 4,2%" },
        { num: "+15", unit: " mil", label: "lojas ativas", sub: "na plataforma" },
        { num: "98", unit: "%", label: "de aprovação", sub: "nos pagamentos UnboxPay" },
      ],
    },

    // 7. FAQ (wellness)
    faq: {
      eyebrow: "Dúvidas",
      title: "Tire suas dúvidas antes de começar.",
      items: [
        { q: "A Unbox serve pra marca de suplementos / cosméticos / beleza?", a: "Sim — esse é exatamente o nosso foco. Recorrência, kits, reposição automática e checkout de alto volume são onde a Unbox mais brilha pra marcas de wellness." },
        { q: "Como funciona a assinatura e a reposição automática?", a: "É nativo: o cliente assina direto no carrinho, escolhe a frequência e a recompra acontece sozinha. Você ganha receita previsível e o cliente nunca fica sem o produto." },
        { q: "Dá pra montar kits e combos de produtos?", a: "Sim. Você cria kits de suplementos, combos de skincare e bundles promocionais nativamente — sem app de terceiro — pra subir o ticket médio." },
        { q: "Já tenho minha loja. Como funciona a migração?", a: "A migração é assistida de ponta a ponta: trazemos catálogo, clientes e histórico sem perder vendas nem ranqueamento. Você não toca em código." },
        { q: "Quanto tempo até ver resultado na recompra?", a: "O ganho de conversão aparece já nas primeiras semanas após ativar checkout e assinatura. Recompra e LTV crescem de forma consistente nos primeiros meses." },
        { q: "Minha marca é pequena. A Unbox atende quem está começando?", a: "Sim. Atendemos desde quem está estruturando a marca até quem fatura milhões/mês. A plataforma cresce junto com você." },
      ],
    },

    // 8. CTA FINAL
    cta: {
      title: "Pronto pra fazer seu cliente de wellness **voltar todo mês**?",
      sub: "Migração assistida · Diagnóstico gratuito · Sem compromisso",
      button: "Falar com especialista",
      anchor: "#form",
    },
  },
};
