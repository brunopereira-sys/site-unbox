# Site Unbox

Site institucional da Unbox — e-commerce D2C para marcas de alto crescimento.
Site estático em HTML, sem etapa de build. Os componentes são escritos em JSX e
transpilados **no navegador** via Babel (`<script type="text/babel">`).

---

## 🚀 Como rodar localmente

Como é site estático, basta servir a pasta com qualquer servidor HTTP. **Não abra
os arquivos com `file://`** — o React/Babel precisa de `http://`.

```bash
# opção 1 (Python)
python3 -m http.server 5173

# opção 2 (Node)
npx serve .
```

Depois abra `http://localhost:5173`.

> Durante o desenvolvimento local, os links internos usam os arquivos `.html`
> (ex: `Unbox - Features.html`). Em produção, o `vercel.json` reescreve para URLs
> limpas (`/recursos`). Os dois funcionam.

---

## 📁 Estrutura

```
site/
├── Unbox - Home.html         # Home (servida em "/")
├── Unbox - Features.html     # Recursos      → /recursos
├── Unbox - Checkout.html     # Turbo Checkout → /checkout
├── Unbox - Assinatura.html   # Assinatura    → /assinatura
├── Unbox - Creators.html     # Afiliados     → /afiliados
├── Unbox - Credito.html      # Crédito       → /credito
├── Unbox - Industrias.html   # Indústrias    → /industrias
│
├── js/                       # Componentes React (JSX)
│   ├── Nav.jsx               # Header / menu
│   ├── Hero.jsx, HeroPreview.jsx
│   ├── Sections.jsx, DashboardSection.jsx, Recursos.jsx, Narrative.jsx
│   ├── Closing.jsx           # Footer + CTA final
│   ├── FeaturesPage.jsx, FeaturesData.jsx
│   ├── CheckoutPage.jsx, AssinaturaPage.jsx, CreatorsPage.jsx
│   ├── CreditoPage.jsx, IndustriasPage.jsx
│   ├── DemoModal.jsx         # Modal "Agendar demo"
│   └── tweaks-panel.jsx      # Painel de ajustes (cores/densidade)
│
├── img/                      # Imagens, logos, vídeos
│   ├── favicon.png, apple-touch-icon.png, og-image.png
│   └── ...
│
├── site.css, sections.css    # Estilos globais
├── features.css, checkout.css, credito.css, assinatura.css, industrias.css
│
├── vercel.json               # URLs limpas + redirects + cache
├── robots.txt
└── sitemap.xml
```

### Como as páginas carregam
Cada `.html` tem no `<head>`: meta tags de SEO, ícones, verificações de domínio e
analytics. No `<body>` há um `<div id="root">` e, no final, os `<script type="text/babel" src="js/...">`
que renderizam a página. **Para editar conteúdo/layout, mexa nos arquivos `js/*.jsx`.**

---

## ✏️ Onde editar cada coisa

| O quê | Onde |
|---|---|
| Texto/seções de uma página | arquivo `js/*.jsx` correspondente |
| Menu de navegação | `js/Nav.jsx` (array `NAV_LINKS`) |
| Rodapé | `js/Closing.jsx` (array `FOOTER_COLS`) |
| Links de WhatsApp / demo / login | bloco `window.UNBOX_URLS` no topo de cada `.html` |
| Título / descrição (SEO) | `<title>` e `<meta name="description">` no `<head>` de cada `.html` |
| Imagem de compartilhamento | `img/og-image.png` |

> ⚠️ `window.UNBOX_URLS` está repetido em cada `.html` — se mudar uma URL central
> (ex: WhatsApp), atualize em **todas** as páginas.

---

## 🔎 SEO e Analytics

- **Open Graph / Twitter Cards**, `canonical`, favicon e `theme-color`: no `<head>` de cada página.
- **Verificações de domínio** (Google, Facebook, Pinterest): no `<head>`.
- **Analytics**: Google Tag Manager (`GTM-TH8FMZR`), Meta Pixel (`2774102732703722`),
  Microsoft Clarity (`ftpnn17p83`), HubSpot (`7711381`) e Tolstoy.
  Eles **só disparam em `unbox.com.br` e `*.vercel.app`** — não rodam em localhost,
  pra não poluir as métricas com tráfego de teste.

---

## 🌐 URLs e redirects (`vercel.json`)

- URLs limpas: `/recursos`, `/checkout`, `/assinatura`, `/afiliados`, `/credito`, `/industrias`.
- Redirects 301 das URLs antigas do site anterior (`/planos`, `/unbox-pay`, `/features`, etc.).
- Se surgirem outras URLs antigas pra preservar, adicione em `redirects`.

---

## ☁️ Deploy na Vercel

**Com GitHub (recomendado — deploy automático):**
1. Suba esta pasta para um repositório no GitHub.
2. Em [vercel.com](https://vercel.com): **Add New → Project** → selecione o repo.
3. Framework **Other**, Build Command **vazio**, Output **vazio** → **Deploy**.
4. A partir daí, todo `git push` republica o site automaticamente.

**Sem GitHub (Vercel CLI):**
```bash
npm i -g vercel
vercel          # primeira vez: login + configuração
vercel --prod   # publica em produção
```

> Para publicar como **www.unbox.com.br**, aponte o domínio para a Vercel em
> *Project → Settings → Domains*. Só depois disso os redirects e os analytics
> de produção passam a valer.

---

## 🔁 Fluxo de edição recomendado

```
edita local (Claude Code)  →  git commit + git push  →  Vercel republica sozinha
```

O site publicado nunca é editado direto: você sempre edita a fonte local e
republica. O GitHub é a fonte da verdade.
