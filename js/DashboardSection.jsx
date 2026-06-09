// DashboardSection.jsx, "Dados em tempo real": acordeão de módulos + preview de dashboard
// que troca conforme o módulo aberto. Usa window.Icon (Sections.jsx, carregado antes).

const DD_BRL = (n) => "R$ " + n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/* ---------- chrome do painel ---------- */
function DdChrome({ children, title }) {
  return (
    <div className="dd-panel">
      <div className="dd-panel-glow"></div>
      <div className="dd-bar">
        <span className="dd-bar-title">{title}</span>
        <div className="dd-bar-filters">
          <span className="dd-filter">Últimos 28 dias</span>
          <span className="dd-filter">Cupom</span>
          <span className="dd-live"><span className="dd-live-dot"></span>tempo real</span>
        </div>
      </div>
      <div className="dd-canvas">{children}</div>
    </div>);

}

/* ---------- peças reutilizáveis ---------- */
function DdKpi({ label, value, delta, up = true }) {
  return (
    <div className="dd-kpi">
      <span className="dd-kpi-lbl">{label}</span>
      <strong className="dd-kpi-val">{value}</strong>
      {delta &&
      <span className={"dd-kpi-delta" + (up ? " is-up" : " is-down")}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            {up ? <path d="M6 15l6-6 6 6" /> : <path d="M6 9l6 6 6-6" />}
          </svg>
          {delta}
        </span>}
    </div>);

}

function DdDonut({ segments, total }) {
  let acc = 0;
  const stops = segments.map((s) => {
    const from = acc; acc += s.v;
    return `${s.c} ${from}% ${acc}%`;
  }).join(", ");
  return (
    <div className="dd-donut-wrap">
      <div className="dd-donut" style={{ background: `conic-gradient(${stops})` }}>
        <div className="dd-donut-hole">
          <strong>{total}</strong>
          <span>total</span>
        </div>
      </div>
      <ul className="dd-legend">
        {segments.map((s) =>
        <li key={s.t}><span className="dd-dot" style={{ background: s.c }}></span>{s.t}<b>{s.v.toLocaleString("pt-BR")}%</b></li>
        )}
      </ul>
    </div>);

}

function DdBars({ rows, suffix = "%" }) {
  const max = Math.max(...rows.map((r) => r.v));
  return (
    <ul className="dd-bars">
      {rows.map((r, i) =>
      <li key={r.t} style={{ "--w": (r.v / max * 100) + "%", "--d": i * 60 + "ms" }}>
          <span className="dd-bar-lbl">{r.t}</span>
          <span className="dd-bar-track"><span className="dd-bar-fill" style={{ background: r.c || "var(--accent)" }}></span></span>
          <span className="dd-bar-val">{r.v.toLocaleString("pt-BR")}{suffix}</span>
        </li>
      )}
    </ul>);

}

/* ---------- views por módulo ---------- */
function ViewOverview() {
  // duas séries ascendentes (mês anterior x mês atual)
  const prev = [4, 9, 14, 18, 24, 31, 36, 42, 49, 56, 62, 70];
  const cur = [3, 7, 12, 17, 22, 28, 35, 41, 48, 55, 63, 71];
  const pts = (a) => a.map((v, i) => `${(i / (a.length - 1) * 300).toFixed(1)},${(120 - v / 75 * 104).toFixed(1)}`).join(" ");
  return (
    <div className="dd-view dd-view--ov">
      <div className="dd-kpis">
        <DdKpi label="GMV Total" value="R$ 726.535,77" delta="18,4%" />
        <DdKpi label="# Pedidos" value="2.686" delta="12,1%" />
        <DdKpi label="Ticket Médio" value="R$ 270,49" delta="5,6%" />
      </div>
      <div className="dd-chart">
        <div className="dd-chart-head">
          <span className="dd-chart-title">Evolução de GMV diário</span>
          <span className="dd-chart-legend">
            <i><span className="dd-dot" style={{ background: "var(--ub-ouro)" }}></span>Mês anterior</i>
            <i><span className="dd-dot" style={{ background: "var(--ub-roxo-claro)" }}></span>Mês atual</i>
          </span>
        </div>
        <svg viewBox="0 0 300 122" className="dd-svg" preserveAspectRatio="none">
          {[0, 30, 60, 90].map((y) => <line key={y} x1="0" x2="300" y1={y} y2={y} className="dd-grid" />)}
          <polyline className="dd-line dd-line--prev" points={pts(prev)} />
          <polyline className="dd-line dd-line--cur" points={pts(cur)} />
        </svg>
      </div>
    </div>);

}

function ViewMoney() {
  return (
    <div className="dd-view dd-view--money">
      <div className="dd-money-top">
        <div className="dd-card-mini">
          <span className="dd-mini-title">GMV por meio de pagamento</span>
          <DdDonut total="726,5k" segments={[
          { t: "Crédito", v: 68.6, c: "var(--accent)" },
          { t: "Pix", v: 31.4, c: "var(--ub-verde-turbo)" }]
          } />
        </div>
        <div className="dd-card-mini">
          <span className="dd-mini-title">GMV por parcela</span>
          <DdDonut total="726,5k" segments={[
          { t: "2×", v: 52.1, c: "var(--ub-roxo-claro)" },
          { t: "1×", v: 47.9, c: "var(--accent)" }]
          } />
        </div>
      </div>
      <div className="dd-card-mini">
        <span className="dd-mini-title">GMV por cupom de desconto</span>
        <DdBars rows={[
        { t: "ANA10", v: 17.67 },
        { t: "JOAO15", v: 15.82, c: "var(--ub-roxo-claro)" },
        { t: "CHICO10", v: 8.38 },
        { t: "MARIA10", v: 5.05, c: "var(--ub-roxo-claro)" }]
        } />
      </div>
    </div>);

}

function ViewGeo() {
  return (
    <div className="dd-view dd-view--geo">
      <div className="dd-card-mini">
        <span className="dd-mini-title">GMV por estado</span>
        <DdBars rows={[
        { t: "SP", v: 44.28 },
        { t: "RJ", v: 12.86, c: "var(--ub-roxo-claro)" },
        { t: "MG", v: 8.54 },
        { t: "GO", v: 6.11, c: "var(--ub-roxo-claro)" },
        { t: "RS", v: 5.32 },
        { t: "SC", v: 4.26, c: "var(--ub-roxo-claro)" }]
        } />
      </div>
      <div className="dd-card-mini">
        <span className="dd-mini-title">Top cidades</span>
        <ul className="dd-rank">
          {[
          ["São Paulo", "20,32%"], ["Rio de Janeiro", "9,70%"],
          ["Jundiaí", "5,62%"], ["Belo Horizonte", "3,29%"],
          ["Brasília", "2,98%"], ["Porto Alegre", "2,52%"]].
          map(([c, v], i) =>
          <li key={c}><span className="dd-rank-n">{i + 1}</span><span className="dd-rank-c">{c}</span><b>{v}</b></li>
          )}
        </ul>
      </div>
    </div>);

}

function ViewRecompra() {
  // cohort: linhas = safras, colunas = Mês 1..6, valor 0–35 → opacidade
  const cohort = [
  [27, 19, 19, 8, 33, 6],
  [8, 8, 10, 24, 6, 2],
  [11, 2, 9, 0, 2, 4],
  [5, 14, 1, 2, 1, 5],
  [6, 3, 6, 3, 6, 5],
  [12, 10, 8, 6, 7, 7]];

  const safras = ["06/20", "07/20", "08/20", "09/20", "10/20", "11/20"];
  return (
    <div className="dd-view dd-view--rec">
      <div className="dd-kpis dd-kpis--3">
        <DdKpi label="Taxa de recompra" value="38,89%" />
        <DdKpi label="Recorrentes" value="65,78%" />
        <DdKpi label="Compras únicas" value="34,22%" />
      </div>
      <div className="dd-card-mini">
        <span className="dd-mini-title">Cohort de recompra <em>· retenção mês a mês</em></span>
        <div className="dd-cohort">
          <div className="dd-cohort-head">
            <span></span>
            {["M1", "M2", "M3", "M4", "M5", "M6"].map((m) => <span key={m}>{m}</span>)}
          </div>
          {cohort.map((row, ri) =>
          <div className="dd-cohort-row" key={ri}>
              <span className="dd-cohort-safra">{safras[ri]}</span>
              {row.map((v, ci) =>
            <span className="dd-cohort-cell" key={ci} style={{ background: `rgba(157,78,221,${(v / 35 * 0.9 + 0.06).toFixed(2)})` }}>{v}%</span>
            )}
            </div>
          )}
        </div>
      </div>
    </div>);

}

function ViewCart() {
  const rows = [
  ["Marina A.", "marina.a@email.com", "(11) 9•••• ••32", "R$ 318,90"],
  ["Rafael M.", "rafael.m@email.com", "(21) 9•••• ••08", "R$ 254,00"],
  ["Júlia S.", "julia.s@email.com", "(31) 9•••• ••71", "R$ 189,90"],
  ["Pedro C.", "pedro.c@email.com", "(11) 9•••• ••44", "R$ 142,50"],
  ["Ana L.", "ana.l@email.com", "(41) 9•••• ••19", "R$ 97,00"]];

  return (
    <div className="dd-view dd-view--cart">
      <div className="dd-card-mini">
        <span className="dd-mini-title">Carrinhos abandonados <em>· prontos para a régua</em></span>
        <table className="dd-table">
          <thead><tr><th>Cliente</th><th>Contato</th><th className="ta-r">Valor</th></tr></thead>
          <tbody>
            {rows.map((r) =>
            <tr key={r[0]}>
                <td><b>{r[0]}</b></td>
                <td className="dd-td-contact"><span>{r[1]}</span><span className="dd-td-faint">{r[2]}</span></td>
                <td className="ta-r dd-td-val">{r[3]}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>);

}

function ViewCanal() {
  const rows = [
  ["loja.principal", 1284, "R$ 412.880,12"],
  ["creator/ana", 312, "R$ 86.420,00"],
  ["link-pagamento", 98, "R$ 41.207,55"],
  ["creator/joao", 156, "R$ 38.910,30"],
  ["vendedor/02", 74, "R$ 19.640,88"]];

  const max = 412880.12;
  return (
    <div className="dd-view dd-view--canal">
      <div className="dd-card-mini">
        <span className="dd-mini-title">Performance por canal / origem</span>
        <table className="dd-table">
          <thead><tr><th>Canal</th><th className="ta-r"># Pedidos</th><th className="ta-r">GMV</th></tr></thead>
          <tbody>
            {rows.map((r) =>
            <tr key={r[0]}>
                <td><span className="dd-canal-name"><span className="dd-canal-bar" style={{ width: (parseFloat(String(r[2]).replace(/[^\d,]/g, "").replace(",", ".")) / max * 60 + 18) + "px" }}></span>{r[0]}</span></td>
                <td className="ta-r">{r[1].toLocaleString("pt-BR")}</td>
                <td className="ta-r dd-td-val">{r[2]}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>);

}

const DD_MODULES = [
{ icon: "chart", t: "Visão geral de vendas", d: "GMV, pedidos e ticket médio, os três números que definem o seu dia, com comparativo do mês anterior e evolução diária em gráfico.", View: ViewOverview },
{ icon: "card", t: "De onde vem o seu dinheiro", d: "GMV por meio de pagamento (Pix x crédito), por parcela e por cupom. Descubra o que converte e quais campanhas geram receita de verdade, não só cliques.", View: ViewMoney },
{ icon: "pin", t: "Onde estão seus clientes", d: "GMV por cidade e por estado, em mapa e tabela. Saiba onde concentrar logística, onde abrir estoque e onde investir em mídia regional.", View: ViewGeo },
{ icon: "repeat", t: "Recompra e LTV", d: "Taxa de recompra global, únicos vs. recorrentes e o cohort de retenção e de LTV mês a mês. A métrica que separa quem cresce de quem apenas fatura.", View: ViewRecompra },
{ icon: "users", t: "Carrinhos abandonados", d: "Nome, e-mail e telefone de quem chegou ao carrinho e não finalizou, com data e valor. Pronto para uma régua de recuperação.", View: ViewCart }];


const DD_PAINS = [
{ t: "Google Analytics conta sessão, não receita", d: "Você precisa saber quem comprou, quanto pagou e se voltou." },
{ t: "Planilha é trabalho manual, todo dia", d: "Exportar pedidos, cruzar cupons, calcular ticket, toda semana." },
{ t: "BI externo é caro e demora", d: "Meses de setup e ~R$2.000/mês que deviam estar no seu marketing." }];


function DadosDashboard() {
  const [open, setOpen] = React.useState(0);
  const Active = DD_MODULES[open] ? DD_MODULES[open].View : DD_MODULES[0].View;
  return (
    <section className="section dados" id="dados">
      <div className="dados-aura"></div>
      <div className="container">
        <div className="block-head block-head--center reveal">
          <h2 className="h2">Seu negócio em <em className="accent-em">tempo real</em>.<br />Sem planilha, sem achismo.</h2>
          <p className="lede block-lede">
            Um dashboard construído para marcas D2C tomarem decisões rápidas.
          </p>
        </div>

        <div className="dados-pains reveal">
          {DD_PAINS.map((p) =>
          <div className="dados-pain" key={p.t}>
              <span className="dados-pain-x" aria-hidden="true">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
              </span>
              <div>
                <h3 className="dados-pain-t">{p.t}</h3>
                <p className="dados-pain-d">{p.d}</p>
              </div>
            </div>
          )}
        </div>

        <div className="dados-grid reveal" style={{ transitionDelay: "80ms" }}>
          <div className="dados-acc">
            {DD_MODULES.map((m, i) =>
            <div className={"sub-acc-item dados-acc-item" + (open === i ? " is-open" : "")} key={m.t}>
                <button className="sub-acc-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                  <span className="sub-item-icon"><window.Icon name={m.icon} size={18} /></span>
                  <h3 className="sub-acc-title">{m.t}</h3>
                  <span className="sub-acc-sign">{open === i ? "–" : "+"}</span>
                </button>
                <div className="sub-acc-wrap"><p className="sub-acc-body">{m.d}</p></div>
              </div>
            )}
          </div>

          <div className="dados-preview">
            <DdChrome title={open >= 0 ? DD_MODULES[open].t : "Dashboard"} key={open}>
              <Active />
            </DdChrome>
          </div>
        </div>

        <div className="dados-cta reveal">
          <a href={window.UNBOX_URLS ? window.UNBOX_URLS.demo : "#"} className="btn btn--primary">Ver o dashboard ao vivo →</a>
          <a href={window.UNBOX_URLS ? window.UNBOX_URLS.signup : "#"} className="btn btn--secondary">Começar grátis</a>
        </div>
      </div>
    </section>);

}
window.DadosDashboard = DadosDashboard;
