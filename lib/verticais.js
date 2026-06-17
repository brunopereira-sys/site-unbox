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
      title: "Unbox para Wellness · A plataforma que te entrega vendas, não ferramentas",
      description:
        "Marcas de suplementos, cosméticos e beleza vendem até 4× mais com a Unbox: checkout de alta conversão, assinatura nativa e crédito — tudo integrado. Fale com um especialista.",
    },

    // 1. HERO + FORMULÁRIO — "para empresas que faturam acima de..."
    hero: {
      qualifier: "Para marcas de wellness que faturam acima de R$ 50 mil/mês",
      title: "Plataformas te entregam ferramentas. A Unbox te entrega **vendas recorrentes**.",
      lede: "Conheça a plataforma de e-commerce que coloca sua marca de suplementos, cosméticos ou beleza pra vender mais e fidelizar no automático.",
      benefits: [
        "Foco em vendas e recompra, não em ferramentas",
        "+15 mil marcas e **690% de crescimento médio** no 1º ano",
        "Transparência total sobre o seu resultado",
      ],
      form: {
        title: "Fale com um especialista",
        sub: "Diagnóstico gratuito da sua operação, sem compromisso.",
        button: "Quero falar com especialista →",
        note: "O cadastro leva 2 minutos.",
      },
    },

    // 2. DEPOIMENTOS — substituir pelos cases reais
    depoimentos: {
      eyebrow: "Prova social",
      title: "O que diz quem **escala** com a Unbox.",
      lede: "Marcas de wellness que transformaram a operação em case de sucesso.",
      items: [
        { metric: "+187%", quote: "Migramos da Shopify e o checkout sozinho já mudou o jogo. Em 4 meses quase triplicamos a conversão.", name: "Nome do cliente", role: "CEO · Marca de suplementos", placeholder: true },
        { metric: "9,5 ROI", quote: "A assinatura nativa virou nossa receita previsível. Hoje metade do faturamento é recorrente.", name: "Nome do cliente", role: "Head de E-commerce · Skincare", placeholder: true },
        { metric: "4,2% conv.", quote: "Saímos de 1,1% pra 4,2% de conversão sem aumentar uma moeda de tráfego. O upsell nativo paga a plataforma.", name: "Nome do cliente", role: "Fundadora · Beleza", placeholder: true },
      ],
    },

    // 3. DIAGNÓSTICO DE DORES — "como saber se sua plataforma te trava"
    familiar: {
      eyebrow: "Diagnóstico",
      title: "Como saber se sua plataforma está **te travando**.",
      sub: "Se você se identificou com alguma dessas situações, a Unbox foi feita pra sua marca.",
      items: [
        { icon: "chart", title: "Você não enxerga o que converte", quote: "Seus relatórios não conversam com o caixa. Você decide no escuro, sem saber LTV nem recompra." },
        { icon: "plug", title: "Refém de apps e agência", quote: "Pra mudar qualquer coisa você depende de 5 apps e de alguém de fora — e nada se integra de verdade." },
        { icon: "wallet", title: "Cresce travado", quote: "Você evita acelerar os ads porque sabe que, sem recompra, o CAC come toda a margem." },
        { icon: "card", title: "Paga caro pelo básico", quote: "Mensalidade em dólar + apps pra ter checkout, assinatura e upsell que já deviam vir nativos." },
      ],
    },

    // 4. COMPARATIVO — amadora vs profissional
    comparativo: {
      title: "Stack improvisado ou **plataforma profissional**?",
      sub: "Tudo integrado. Nada externo. Nada brigando.",
      caption: "O que sua marca precisa",
      colA: "Stack de apps",
      colB: "Unbox",
      rows: [
        { label: "Checkout de alta conversão nativo", a: false, b: true },
        { label: "Assinatura no mesmo carrinho", a: false, b: true },
        { label: "Upsell, order bump e bundles nativos", a: false, b: true },
        { label: "Pagamentos + crédito integrados", a: false, b: true },
        { label: "Dados de LTV e recompra num só painel", a: false, b: true },
        { label: "Sem custo em dólar", a: false, b: true },
        { label: "Um só fornecedor responsável", a: false, b: true },
      ],
    },

    // 5. O QUE A UNBOX FAZ — grid de capacidades
    capacidades: {
      eyebrow: "O que a Unbox faz",
      title: "Uma operação completa de vendas, **sem montar um Frankenstein de apps**.",
      items: [
        { icon: "zap", t: "Checkout de alta conversão", d: "1-clique, Pix otimizado e fluxo pensado pro consumidor brasileiro." },
        { icon: "repeat", t: "Assinatura nativa", d: "Compra única e recorrência no mesmo carrinho." },
        { icon: "tag", t: "Upsell & order bump", d: "Aumente o ticket médio sem depender de apps pagos." },
        { icon: "box", t: "Bundles e kits", d: "Monte combos que vendem mais por pedido." },
        { icon: "wallet", t: "Pagamentos + crédito", d: "Venda, receba e financie crescimento no mesmo lugar." },
        { icon: "users", t: "Creators & afiliados", d: "Rede de creators integrada ao checkout, com rastreio nativo." },
        { icon: "layout", t: "Páginas customizadas", d: "Landing pages e PDPs de alta conversão, sem dev." },
        { icon: "chart", t: "Dashboards & dados", d: "Conversão, LTV e recompra em tempo real, num só painel." },
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

    // 7. FAQ
    faq: {
      eyebrow: "Dúvidas",
      title: "Tire suas dúvidas antes de começar.",
      items: [
        { q: "Qual a diferença real entre a Unbox e Shopify / VTEX?", a: "A Unbox já entrega nativo o que nessas plataformas exige um monte de app pago: checkout de alta conversão, assinatura, upsell, bundles e pagamentos. Sem custo em dólar e sem depender de agência pra fazer o básico funcionar." },
        { q: "Minha marca é pequena. A Unbox atende quem está começando?", a: "Sim. Atendemos desde quem está estruturando a operação até marcas que faturam milhões/mês. A plataforma cresce junto com você." },
        { q: "Já tenho minha loja montada. Como funciona a migração?", a: "A migração é assistida de ponta a ponta: trazemos catálogo, clientes e histórico sem perder vendas nem ranqueamento. Você não toca em código." },
        { q: "Quanto tempo até ver resultado?", a: "Boa parte do ganho de conversão aparece já nas primeiras semanas após ativar o checkout e a assinatura. Recompra e LTV crescem de forma consistente nos primeiros meses." },
        { q: "Como eu sei que vou ter retorno?", a: "Você acompanha conversão, LTV e recompra num painel em tempo real. Mais do que ferramenta, você tem consultoria de growth focada no seu resultado." },
        { q: "A Unbox serve pro meu segmento de wellness?", a: "Sim — suplementos, nutracêuticos, cosméticos, skincare e beleza são o nosso foco. Recorrência, kits e checkout de alto volume são exatamente onde a Unbox brilha." },
      ],
    },

    // 8. CTA FINAL
    cta: {
      title: "Pronto pra transformar sua marca de wellness em **case de sucesso**?",
      sub: "Migração assistida · Diagnóstico gratuito · Sem compromisso",
      button: "Falar com especialista",
      anchor: "#form",
    },
  },
};
