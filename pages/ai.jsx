import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState, useCallback } from 'react'

const CLIP_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>`

const WA_ICON = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.21c5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm0 18.15c-1.52 0-3.01-.41-4.3-1.18l-.31-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.35c0-4.54 3.7-8.23 8.24-8.23 4.54 0 8.24 3.69 8.24 8.23 0 4.54-3.7 8.23-8.24 8.23z"/></svg>`
const LI_ICON = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 9.5H5.67V18h2.67V9.5zM7 6.13a1.55 1.55 0 1 0 0 3.1 1.55 1.55 0 0 0 0-3.1zM18.33 18v-4.67c0-2.5-1.34-3.66-3.13-3.66-1.44 0-2.09.79-2.45 1.35V9.5h-2.67V18h2.67v-4.42c0-.23.02-.47.09-.64.18-.47.61-.95 1.33-.95.94 0 1.31.71 1.31 1.76V18h2.62z"/></svg>`

const COUNTRIES = [
  { n: 'Brasil', f: '🇧🇷', d: '+55' },
  { n: 'Estados Unidos', f: '🇺🇸', d: '+1' },
  { n: 'Portugal', f: '🇵🇹', d: '+351' },
  { n: 'Argentina', f: '🇦🇷', d: '+54' },
  { n: 'México', f: '🇲🇽', d: '+52' },
  { n: 'Espanha', f: '🇪🇸', d: '+34' },
  { n: 'Reino Unido', f: '🇬🇧', d: '+44' },
  { n: 'Colômbia', f: '🇨🇴', d: '+57' },
  { n: 'Chile', f: '🇨🇱', d: '+56' },
]

const BLOG = [
  ['<b>Unbox AI Foundry</b> conectado · lendo SDK', 8],
  ['interpretando a marca e o catálogo', 26],
  ['gerando storefront React <b>totalmente customizado</b>', 44],
  ['montando carrinho, estoque e assinatura', 62],
  ['orquestrando dados via <b>MCP</b>', 78],
  ['conectando <b>checkout customizado</b>', 91],
  ['__OK__loja no ar — sua, sem template', 100],
]

const STEPS = [
  { key: 'brand', q: 'qual o nome da sua marca?' },
  { key: 'email', q: 'qual o melhor email pra te avisar?' },
  { key: 'wpp', q: 'e seu WhatsApp? é por onde liberamos os lotes primeiro.', isPhone: true },
  { key: 'role', q: 'você é...', roles: true },
]

const ROLES = ['founder / CEO', 'head de marketing', 'head de e-commerce', 'desenvolvedor(a)', 'designer', 'outros']

const PROMPT_TEXT = '/mcp unbox crie um e-commerce para minha marca de acordo com esse design'

const LOGO = '/img/logo-navbar.png?v=r26'

function escHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function maskBR(v) {
  v = v.replace(/\D/g, '').slice(0, 11)
  if (v.length <= 2) return v.length ? '(' + v : ''
  if (v.length <= 7) return '(' + v.slice(0, 2) + ') ' + v.slice(2)
  return '(' + v.slice(0, 2) + ') ' + v.slice(2, 7) + '-' + v.slice(7)
}

export default function AiPage() {
  const router = useRouter()
  const refFromUrl = router.query && router.query.ref ? String(router.query.ref) : ''

  const flowRef = useRef(null)
  const termInRef = useRef(null)
  const phoneInRef = useRef(null)
  const composerRef = useRef(null)
  const logoRef = useRef(null)
  const ccListRef = useRef(null)

  const [thinking, setThinking] = useState(false)
  const [inputMode, setInputMode] = useState('text')
  const [phase, setPhase] = useState('prompt')
  const [stepIdx, setStepIdx] = useState(0)
  const [selDial, setSelDial] = useState('+55')
  const [selFlag, setSelFlag] = useState('🇧🇷')
  const [showCcList, setShowCcList] = useState(false)
  const [showChip, setShowChip] = useState(false)
  const [showComposer, setShowComposer] = useState(true)
  const [submitting] = useState(false)

  const dataRef = useRef({ brand: '', email: '', wpp: '', role: '' })
  const phaseRef = useRef('prompt')
  const stepIdxRef = useRef(0)
  const inputModeRef = useRef('text')
  const selDialRef = useRef('+55')

  useEffect(() => { phaseRef.current = phase }, [phase])
  useEffect(() => { stepIdxRef.current = stepIdx }, [stepIdx])
  useEffect(() => { inputModeRef.current = inputMode }, [inputMode])
  useEffect(() => { selDialRef.current = selDial }, [selDial])

  const scrollDown = useCallback(() => {
    setTimeout(() => {
      if (flowRef.current) flowRef.current.scrollTop = flowRef.current.scrollHeight
    }, 50)
  }, [])

  const addLine = useCallback((html, cls) => {
    const div = document.createElement('div')
    div.className = ['fl', cls].filter(Boolean).join(' ')
    div.innerHTML = html
    if (flowRef.current) flowRef.current.appendChild(div)
    scrollDown()
    return div
  }, [scrollDown])

  const aiLine = useCallback((txt, step, then) => {
    setThinking(true)
    if (logoRef.current) logoRef.current.classList.add('thinking')
    const el = addLine(`<span class="typing"><span></span><span></span><span></span></span>`, 'aln')
    setTimeout(() => {
      setThinking(false)
      if (logoRef.current) logoRef.current.classList.remove('thinking')
      el.classList.remove('typing')
      el.innerHTML = txt + (step ? `<span class="step">${step}</span>` : '')
      scrollDown()
      if (then) then()
    }, 650)
  }, [addLine, scrollDown])

  const hideAllInputs = useCallback(() => {
    const termIn = termInRef.current
    const phoneRow = document.getElementById('phoneRow')
    const roleRow = document.getElementById('roleRow')
    if (termIn) termIn.style.display = 'none'
    if (phoneRow) phoneRow.style.display = 'none'
    if (roleRow) roleRow.style.display = 'none'
  }, [])

  const remask = useCallback(() => {
    const phoneIn = phoneInRef.current
    if (!phoneIn) return
    if (selDialRef.current === '+55') {
      phoneIn.value = maskBR(phoneIn.value)
      phoneIn.placeholder = '(11) 91234-5678'
    } else {
      phoneIn.value = phoneIn.value.replace(/[^\d ]/g, '')
      phoneIn.placeholder = 'número'
    }
  }, [])

  const askStep = useCallback((idx) => {
    const s = STEPS[idx]
    aiLine(s.q, `${idx + 1}/4`, () => {
      hideAllInputs()
      if (s.roles) {
        setInputMode('role')
        const roleRow = document.getElementById('roleRow')
        if (roleRow) roleRow.style.display = 'flex'
      } else if (s.isPhone) {
        setInputMode('phone')
        const phoneRow = document.getElementById('phoneRow')
        if (phoneRow) phoneRow.style.display = 'flex'
        remask()
        setTimeout(() => phoneInRef.current && phoneInRef.current.focus(), 700)
      } else {
        setInputMode('text')
        const termIn = termInRef.current
        if (termIn) { termIn.style.display = 'block'; termIn.value = ''; termIn.focus() }
      }
    })
  }, [aiLine, hideAllInputs, remask])

  const showQueue = useCallback(async () => {
    setThinking(true)
    if (logoRef.current) logoRef.current.classList.add('thinking')

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...dataRef.current, ref: refFromUrl }),
      })
      const json = await res.json()

      setThinking(false)
      if (logoRef.current) logoRef.current.classList.remove('thinking')

      if (res.status === 409) {
        addLine('⚠ esse email já está na fila — avisaremos quando seu convite abrir.', 'logline ok')
        return
      }

      const { position, refCode } = json
      const link = `https://www.unbox.com.br/ai?ref=${refCode}`
      const msg = encodeURIComponent(`A Unbox lançou uma forma totalmente nova de criar uma loja virtual, sem templates! ${link}`)

      const q = addLine('', 'q-wrap')
      q.innerHTML =
        `<div class="q-ok">✓ você entrou na fila</div>` +
        `<h2 class="q-title">Você está na fila.</h2>` +
        `<p class="q-sub">avisamos no seu whatsapp e email assim que seu convite abrir.</p>` +
        `<div class="q-pos"><span class="lbl">sua posição</span><span class="num">#${position}</span></div>` +
        `<p class="q-share-lbl"><b>Quer acesso antecipado?</b> cada pessoa que entrar pelo seu link faz você subir na lista.</p>` +
        `<div class="q-link"><input id="q-link" readonly value="${link}" /><button onclick="copyLink(this)">copiar</button></div>` +
        `<div class="q-share-btns">` +
          `<a class="q-wa" target="_blank" href="https://wa.me/?text=${msg}">${WA_ICON}WhatsApp</a>` +
          `<a class="q-li" target="_blank" href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}">${LI_ICON}LinkedIn</a>` +
        `</div>`

      scrollDown()

      setTimeout(() => {
        const c = addLine('', 'closing')
        c.innerHTML =
          `<h2 class="anchor">Seu negócio é único. <em>Livre-se dos templates.</em></h2>` +
          `<div class="sign"><img src="${LOGO}" alt="Unbox"/><span>unbox · AI Foundry</span></div>`
        scrollDown()
      }, 550)
    } catch {
      setThinking(false)
      if (logoRef.current) logoRef.current.classList.remove('thinking')
      addLine('erro ao salvar — tente novamente.', 'logline')
    }
  }, [addLine, scrollDown, refFromUrl])

  const finishConvo = useCallback(() => {
    setShowComposer(false)
    aiLine('✓ pronto! garanti seu lugar na fila.', undefined, () => {
      setTimeout(showQueue, 650)
    })
  }, [aiLine, showQueue])

  const pickRole = useCallback((r) => {
    addLine(`<span class="sl">›</span> ${r}`, 'uln')
    hideAllInputs()
    if (r === 'outros') {
      setPhase('other')
      setInputMode('text')
      const termIn = termInRef.current
      if (termIn) { termIn.style.display = 'block' }
      aiLine('legal — conta rápido o que você faz:', undefined, () => {
        const termIn2 = termInRef.current
        if (termIn2) { termIn2.value = ''; termIn2.focus() }
      })
      return
    }
    dataRef.current.role = r
    finishConvo()
  }, [addLine, hideAllInputs, aiLine, finishConvo])

  const runBuild = useCallback(() => {
    setThinking(true)
    if (logoRef.current) logoRef.current.classList.add('thinking')
    const barWrap = addLine('<div class="bbar"><i id="bbar"></i></div>', '')
    const bbar = barWrap.querySelector('#bbar')
    let j = 0
    function step() {
      let [txt, pct] = BLOG[j]
      const ok = txt.startsWith('__OK__')
      if (ok) txt = txt.replace('__OK__', '')
      addLine((ok ? '✓ ' : '<span style="color:#55555C">→ </span>') + txt, ok ? 'logline ok' : 'logline')
      if (bbar) bbar.style.width = pct + '%'
      j++
      if (j < BLOG.length) setTimeout(step, 440)
      else setTimeout(() => {
        setThinking(false)
        if (logoRef.current) logoRef.current.classList.remove('thinking')
        setPhase('intro')
        const termIn = termInRef.current
        if (termIn) { termIn.value = 'request my invite'; termIn.focus() }
        scrollDown()
      }, 750)
    }
    step()
  }, [addLine, scrollDown])

  const submit = useCallback(() => {
    const im = inputModeRef.current
    const ph = phaseRef.current
    const si = stepIdxRef.current

    if (im === 'phone') {
      const phoneIn = phoneInRef.current
      if (!phoneIn) return
      const digits = phoneIn.value.replace(/\D/g, '')
      if (digits.length < 8) { phoneIn.focus(); return }
      const full = selDialRef.current + ' ' + phoneIn.value
      addLine(`<span class="sl">›</span> ${escHtml(full)}`, 'uln')
      dataRef.current.wpp = full
      phoneIn.value = ''
      const nextIdx = si + 1
      setStepIdx(nextIdx)
      setInputMode('text')
      askStep(nextIdx)
      return
    }

    const termIn = termInRef.current
    if (!termIn) return
    const v = termIn.value.trim()
    if (!v) return

    if (ph === 'prompt') {
      addLine(`<span class="sl">›</span> ${escHtml(v)}`, 'cmdline')
      addLine(CLIP_SVG + ' design-marca.fig anexado', 'attachline')
      termIn.value = ''
      setShowChip(false)
      runBuild()
      return
    }

    if (ph === 'intro') {
      addLine(`<span class="sl">›</span> ${escHtml(v)}`, 'uln')
      termIn.value = ''
      setPhase('collect')
      setStepIdx(0)
      askStep(0)
      return
    }

    if (ph === 'collect') {
      const s = STEPS[si]
      if (s.roles) return
      if (s.key === 'email' && !/.+@.+\..+/.test(v)) {
        addLine(`<span class="sl">›</span> ${escHtml(v)}`, 'uln')
        termIn.value = ''
        aiLine('hmm, esse email parece incompleto — pode confirmar?')
        return
      }
      addLine(`<span class="sl">›</span> ${escHtml(v)}`, 'uln')
      dataRef.current[s.key] = v
      termIn.value = ''
      const nextIdx = si + 1
      setStepIdx(nextIdx)
      askStep(nextIdx)
      return
    }

    if (ph === 'other') {
      addLine(`<span class="sl">›</span> ${escHtml(v)}`, 'uln')
      dataRef.current.role = v
      termIn.value = ''
      finishConvo()
      return
    }
  }, [addLine, askStep, aiLine, runBuild, finishConvo])

  // Type the initial prompt on load
  useEffect(() => {
    let i = 0
    const termIn = termInRef.current
    if (!termIn) return
    const t = setInterval(() => {
      i++
      termIn.value = PROMPT_TEXT.slice(0, i)
      if (i >= PROMPT_TEXT.length) {
        clearInterval(t)
        setTimeout(() => setShowChip(true), 300)
        setTimeout(submit, 1100)
      }
    }, 26)
    return () => clearInterval(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Expose copyLink globally
  useEffect(() => {
    window.copyLink = (btn) => {
      const inp = document.getElementById('q-link')
      if (!inp) return
      if (navigator.clipboard) navigator.clipboard.writeText(inp.value)
      inp.select()
      const orig = btn.textContent
      btn.textContent = 'Copiado ✓'
      setTimeout(() => { btn.textContent = orig }, 1600)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Unbox AI Foundry — request your invite</title>
        <meta name="description" content="Crie um e-commerce personalizado com IA, sem templates. Garanta seu lugar na fila." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Unbox AI Foundry" />
        <meta property="og:description" content="Seu negócio é único. Livre-se dos templates." />
        <meta property="og:url" content="https://www.unbox.com.br/ai" />
        <meta property="og:image" content="https://www.unbox.com.br/img/og-image.png?v=r26" />
        <meta property="og:type" content="website" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div id="aifx">
        <div className="stage">
          <div className="head">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img ref={logoRef} src={LOGO} alt="Unbox" />
            <span>unbox · AI Foundry · {thinking ? 'processando...' : 'pronto'}</span>
          </div>

          <div id="flow" ref={flowRef} />

          {showComposer && (
            <div className="composer" ref={composerRef}>
              <div className="crow">
                <span className="sl">›</span>
                <div className="mid">
                  <textarea
                    ref={termInRef}
                    id="termIn"
                    rows={1}
                    placeholder="descreva sua marca..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit() }
                    }}
                  />

                  <div id="roleRow" style={{ display: 'none', gap: '8px', flexWrap: 'wrap', padding: '4px 0' }}>
                    {ROLES.map((r) => (
                      <button key={r} type="button" onClick={() => pickRole(r)}>{r}</button>
                    ))}
                  </div>

                  <div id="phoneRow" style={{ display: 'none', alignItems: 'center', gap: '8px', position: 'relative', padding: '2px 0' }}>
                    <button
                      type="button"
                      className="cc-btn"
                      onClick={(e) => { e.stopPropagation(); setShowCcList((val) => !val) }}
                    >
                      <span>{selFlag}</span>
                      <span>{selDial}</span>
                      <span className="ar">▾</span>
                    </button>
                    {showCcList && (
                      <div ref={ccListRef} className="cc-list show">
                        {COUNTRIES.map((c) => (
                          <button key={c.d} type="button" onClick={() => {
                            setSelDial(c.d)
                            setSelFlag(c.f)
                            setShowCcList(false)
                            remask()
                            if (phoneInRef.current) phoneInRef.current.focus()
                          }}>
                            <span>{c.f}</span> {c.n}
                            <span className="d">{c.d}</span>
                          </button>
                        ))}
                      </div>
                    )}
                    <input
                      ref={phoneInRef}
                      id="phoneIn"
                      type="tel"
                      placeholder="(11) 91234-5678"
                      onChange={remask}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); submit() } }}
                    />
                  </div>

                  {showChip && (
                    <div className="chip">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                      </svg>
                      <span id="chipName">design-marca.fig</span>
                    </div>
                  )}
                </div>

                <div className="ctools">
                  <button
                    type="button"
                    className="send"
                    disabled={submitting}
                    onClick={submit}
                    aria-label="Enviar"
                  >
                    ↑
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        html, body { margin: 0; }
        body { background: #070708; }
        #aifx {
          --green: #39FF14; --cyan: #18C7E6; --purple: #7A2CFF;
          --grad: linear-gradient(110deg, #39FF14, #18C7E6 48%, #7A2CFF);
          --mono: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
          position: relative; min-height: 100vh; overflow: hidden;
          background: #070708; color: #E6E6E8;
          font-family: 'Sora', system-ui, sans-serif; -webkit-font-smoothing: antialiased;
          display: flex; align-items: center; justify-content: center; padding: 24px 20px;
        }
        #aifx *, #aifx *::before, #aifx *::after { box-sizing: border-box; }
        #aifx::before {
          content: ""; position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background:
            radial-gradient(60% 50% at 85% 8%, rgba(122,44,255,.14), transparent 55%),
            radial-gradient(50% 45% at 10% 96%, rgba(57,255,20,.08), transparent 50%);
        }
        #aifx .stage { position: relative; z-index: 1; width: min(640px, 100%); height: min(700px, 88vh); display: flex; flex-direction: column; }
        #aifx .head { flex-shrink: 0; display: flex; align-items: center; gap: 10px; margin-bottom: 16px; font-size: 12.5px; color: #8A8A92; font-family: var(--mono); letter-spacing: .02em; }
        #aifx .head img { width: 22px; height: 22px; object-fit: contain; transition: filter .3s; }
        @keyframes aifxspin { to { transform: rotate(360deg); } }
        #aifx .head img.thinking { animation: aifxspin 1.1s linear infinite; filter: drop-shadow(0 0 5px rgba(57,255,20,.5)); }
        #aifx #flow { flex: 1; overflow-y: auto; padding-right: 4px; font-family: var(--mono); }
        #aifx #flow::-webkit-scrollbar { width: 6px; }
        #aifx #flow::-webkit-scrollbar-thumb { background: rgba(255,255,255,.1); border-radius: 3px; }
        #aifx .fl { opacity: 0; animation: aifxrise .4s ease forwards; }
        @keyframes aifxrise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        #aifx .cmdline { font-size: 14.5px; line-height: 1.7; color: #E6E6E8; margin-bottom: 2px; }
        #aifx .cmdline .sl { color: var(--purple); }
        #aifx .attachline { font-size: 12px; color: #8A8A92; margin-bottom: 14px; display: flex; align-items: center; gap: 7px; }
        #aifx .attachline svg { width: 13px; height: 13px; }
        #aifx .logline { font-size: 13px; line-height: 2; color: #9A9AA0; }
        #aifx .logline b { color: #C8C8CE; font-weight: 500; }
        #aifx .logline.ok { color: var(--green); }
        #aifx .uln { font-size: 14px; line-height: 1.95; color: #9FE0FF; }
        #aifx .uln .sl { color: var(--purple); }
        #aifx .aln { font-size: 14px; line-height: 1.95; color: #B8B8BE; }
        #aifx .aln .step { color: #55555C; margin-left: 8px; font-size: 12px; }
        #aifx .typing span { display: inline-block; width: 5px; height: 5px; border-radius: 50%; background: #6B6B72; margin-right: 3px; animation: aifxtp 1.2s infinite; }
        #aifx .typing span:nth-child(2) { animation-delay: .2s; }
        #aifx .typing span:nth-child(3) { animation-delay: .4s; }
        @keyframes aifxtp { 0%,60%,100% { opacity: .3; transform: translateY(0); } 30% { opacity: 1; transform: translateY(-3px); } }
        #aifx .bbar { height: 2px; background: rgba(255,255,255,.08); margin: 14px 0 4px; border-radius: 2px; overflow: hidden; }
        #aifx .bbar i { display: block; height: 100%; width: 0; background: var(--grad); transition: width .35s ease; }
        #aifx .q-wrap { margin-top: 24px; }
        #aifx .q-ok { font-family: var(--mono); font-size: 13.5px; color: var(--green); margin-bottom: 16px; }
        #aifx .q-title { font-family: 'Sora', sans-serif; font-size: 21px; font-weight: 700; letter-spacing: -0.02em; margin: 0 0 6px; }
        #aifx .q-sub { font-family: var(--mono); font-size: 12.5px; color: #8A8A92; margin: 0 0 22px; line-height: 1.65; }
        #aifx .q-pos { display: flex; align-items: center; justify-content: space-between; background: #0C0C0E; border: 1px solid rgba(255,255,255,.09); border-radius: 12px; padding: 15px 20px; margin-bottom: 22px; }
        #aifx .q-pos .lbl { font-family: var(--mono); font-size: 11px; color: #8A8A92; letter-spacing: .16em; text-transform: uppercase; }
        #aifx .q-pos .num { font-family: 'Sora', sans-serif; font-size: 30px; font-weight: 800; letter-spacing: -0.02em; background: var(--grad); -webkit-background-clip: text; background-clip: text; color: transparent; }
        #aifx .q-share-lbl { font-family: var(--mono); font-size: 12.5px; color: #C8C8CE; margin-bottom: 12px; line-height: 1.65; }
        #aifx .q-share-lbl b { color: #fff; font-weight: 600; }
        #aifx .q-link { display: flex; gap: 8px; margin-bottom: 12px; }
        #aifx .q-link input { flex: 1; padding: 12px 15px; border-radius: 10px; background: #0C0C0E; border: 1px solid rgba(255,255,255,.09); color: #8A8A92; font-size: 12.5px; font-family: var(--mono); outline: none; }
        #aifx .q-link button { padding: 12px 16px; border-radius: 10px; border: 1px solid rgba(255,255,255,.14); background: transparent; color: #C8C8CE; font-family: var(--mono); font-size: 12.5px; cursor: pointer; white-space: nowrap; transition: all .15s; }
        #aifx .q-link button:hover { border-color: rgba(255,255,255,.32); color: #fff; }
        #aifx .q-share-btns { display: flex; gap: 8px; }
        #aifx .q-share-btns a { flex: 1; padding: 11px; border-radius: 10px; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 8px; font-family: var(--mono); font-weight: 500; font-size: 12.5px; transition: all .15s; border: 1px solid; }
        #aifx .q-share-btns svg { width: 15px; height: 15px; }
        #aifx .q-wa { background: rgba(37,211,102,.09); border-color: rgba(37,211,102,.32); color: #3ddc84; }
        #aifx .q-wa:hover { background: rgba(37,211,102,.16); border-color: rgba(37,211,102,.5); }
        #aifx .q-li { background: rgba(56,140,230,.1); border-color: rgba(56,140,230,.36); color: #5aa3ed; }
        #aifx .q-li:hover { background: rgba(56,140,230,.18); border-color: rgba(56,140,230,.55); }
        #aifx .closing { margin-top: 34px; padding-top: 26px; border-top: 1px solid rgba(255,255,255,.08); text-align: center; }
        #aifx .closing .anchor { font-family: 'Sora', sans-serif; font-size: 25px; font-weight: 800; letter-spacing: -0.02em; line-height: 1.15; margin: 0 0 6px; }
        #aifx .closing .anchor em { font-style: normal; background: var(--grad); -webkit-background-clip: text; background-clip: text; color: transparent; }
        #aifx .closing .sign { display: flex; align-items: center; justify-content: center; gap: 9px; margin-top: 20px; }
        #aifx .closing .sign img { width: 26px; height: 26px; object-fit: contain; }
        #aifx .closing .sign span { font-family: var(--mono); font-size: 12px; color: #8A8A92; letter-spacing: .04em; }
        #aifx .composer { flex-shrink: 0; margin-top: 14px; background: #0F0F11; border: 1px solid rgba(255,255,255,.12); border-radius: 16px; padding: 14px; transition: opacity .4s, border-color .2s, box-shadow .2s; }
        #aifx .composer:focus-within { border-color: rgba(122,44,255,.6); box-shadow: 0 0 0 1px rgba(122,44,255,.22); }
        #aifx .crow { display: flex; align-items: flex-end; gap: 10px; }
        #aifx .crow .sl { color: var(--purple); font-family: var(--mono); font-size: 14.5px; line-height: 1.6; padding-bottom: 7px; flex-shrink: 0; }
        #aifx .mid { flex: 1; min-width: 0; }
        #aifx #termIn { width: 100%; background: transparent; border: none; color: #9FE0FF; font-family: var(--mono); font-size: 14.5px; line-height: 1.6; outline: none; resize: none; overflow-y: auto; padding: 6px 0; max-height: 150px; display: block; }
        #aifx #termIn::placeholder { color: #44444A; }
        #aifx #roleRow { gap: 8px; flex-wrap: wrap; padding: 4px 0; }
        #aifx #phoneRow { align-items: center; gap: 8px; position: relative; padding: 2px 0; }
        #aifx .cc-btn { display: flex; align-items: center; gap: 6px; background: #16161A; border: 1px solid rgba(255,255,255,.12); border-radius: 9px; padding: 8px 10px; color: #C8C8CE; font-family: var(--mono); font-size: 13.5px; cursor: pointer; white-space: nowrap; flex-shrink: 0; }
        #aifx .cc-btn:hover { border-color: rgba(255,255,255,.3); }
        #aifx .cc-btn .ar { color: #6B6B72; font-size: 10px; }
        #aifx .cc-list { position: absolute; bottom: calc(100% + 8px); left: 0; background: #16161A; border: 1px solid rgba(255,255,255,.14); border-radius: 12px; padding: 6px; max-height: 210px; overflow-y: auto; z-index: 20; min-width: 210px; box-shadow: 0 12px 30px rgba(0,0,0,.5); }
        #aifx .cc-list button { display: flex; align-items: center; gap: 9px; width: 100%; background: transparent; border: none; color: #C8C8CE; font-family: var(--mono); font-size: 13px; padding: 8px 10px; border-radius: 8px; cursor: pointer; text-align: left; }
        #aifx .cc-list button:hover { background: rgba(255,255,255,.06); }
        #aifx .cc-list button .d { color: #8A8A92; margin-left: auto; }
        #aifx #phoneIn { flex: 1; min-width: 0; background: transparent; border: none; color: #9FE0FF; font-family: var(--mono); font-size: 14.5px; outline: none; padding: 6px 0; }
        #aifx #phoneIn::placeholder { color: #44444A; }
        #aifx #roleRow button { padding: 9px 16px; border-radius: 9px; background: #16161A; border: 1px solid rgba(255,255,255,.12); color: #C8C8CE; font-size: 13.5px; font-weight: 500; cursor: pointer; font-family: var(--mono); transition: all .15s; }
        #aifx #roleRow button:hover { border-color: rgba(255,255,255,.35); background: #1C1C22; }
        #aifx .chip { display: inline-flex; align-items: center; gap: 7px; background: #16161A; border: 1px solid rgba(255,255,255,.12); border-radius: 9px; padding: 6px 11px; font-size: 12px; color: #C8C8CE; font-family: var(--mono); margin-top: 10px; }
        #aifx .chip svg { width: 13px; height: 13px; color: #8A8A92; }
        #aifx .ctools { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
        #aifx .send { width: 36px; height: 36px; border-radius: 9px; background: var(--grad); border: none; color: #070708; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 17px; font-weight: 700; transition: transform .15s; flex-shrink: 0; }
        #aifx .send:hover { transform: translateY(-2px); }
        @media (max-width: 520px) {
          #aifx .stage { height: 90vh; }
          #aifx .cmdline { font-size: 13.5px; }
          #aifx .q-share-btns { flex-direction: column; }
          #aifx .closing .anchor { font-size: 20px; }
        }
        @media (prefers-reduced-motion: reduce) {
          #aifx .fl { animation: none; opacity: 1; transform: none; }
        }
      `}</style>
    </>
  )
}
