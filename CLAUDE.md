# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Site institucional da Unbox — plataforma D2C para marcas de alto crescimento. Site **estático em HTML puro**, sem etapa de build. Os componentes são escritos em JSX e transpilados **no navegador** via Babel (`<script type="text/babel">`). React e ReactDOM são carregados via CDN (unpkg).

## Rodar localmente

**Não abra os arquivos com `file://`** — o Babel/React precisa de `http://`. Sirva a pasta raiz do repositório:

```bash
python3 -m http.server 5173
# abra http://localhost:5173
```

## Arquitetura

Cada página é um arquivo `.html` independente. O `vercel.json` reescreve URLs limpas (`/recursos`, `/checkout`, etc.) para esses arquivos. Em dev local, use os nomes de arquivo diretamente.

```
/
├── Unbox - Home.html         → /
├── Unbox - Features.html     → /recursos
├── Unbox - Checkout.html     → /checkout
├── Unbox - Assinatura.html   → /assinatura
├── Unbox - Creators.html     → /afiliados
├── Unbox - Credito.html      → /credito
├── Unbox - Industrias.html   → /industrias
├── js/                       # Componentes React (JSX)
├── img/                      # Imagens, vídeos, ícones, OG
├── site.css, sections.css    # Estilos globais
├── features.css, checkout.css, credito.css, assinatura.css, industrias.css
├── vercel.json               # URLs limpas + redirects + cache headers
├── robots.txt
└── sitemap.xml
```

### Como as páginas funcionam

Cada `.html` contém no final do `<body>`:
1. Um bloco `<script>` com `window.UNBOX_URLS` (WhatsApp, demo, signup, login) e `window.UNBOX_LEADS` (webhook para leads).
2. Tags `<script type="text/babel" src="js/...">` que carregam os componentes.
3. Um `<script type="text/babel">` inline que monta o `<App />` e chama `ReactDOM.createRoot(...).render(...)`.

**Para editar conteúdo ou layout, mexa nos arquivos `js/*.jsx`**, não nos `.html`.

### Componentes compartilhados

- `Nav.jsx` — header e menu (array `NAV_LINKS` no topo do arquivo)
- `Closing.jsx` — footer + CTA final (array `FOOTER_COLS`)
- `DemoModal.jsx` — modal "Agendar demo" com envio para Google Sheets via `window.UNBOX_LEADS.sheetWebhook`
- `tweaks-panel.jsx` — painel lateral de ajuste de cor/densidade (só visível em dev/staging)
- `PageKit.jsx` — utilitários compartilhados entre páginas internas

### URLs centrais

`window.UNBOX_URLS` está **repetido em cada `.html`**. Para mudar WhatsApp, demo ou login, atualize em **todas as páginas**.

## Analytics

Os scripts (GTM, Meta Pixel, Clarity, HubSpot, Tolstoy) disparam apenas em `unbox.com.br` e `*.vercel.app`. Em localhost não carregam.

## Deploy na Vercel

1. Suba esta pasta para um repositório GitHub.
2. No Vercel: **Add New → Project** → selecione o repo → Framework **Other**, Build Command **vazio**, Output Directory **vazio** → **Deploy**.
3. Todo `git push` republica automaticamente.

Para mapear o domínio `www.unbox.com.br`, vá em *Project → Settings → Domains* no Vercel.
