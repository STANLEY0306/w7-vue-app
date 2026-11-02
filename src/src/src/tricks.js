// 三個互動魔術的邏輯（原樣保留你原本的做法，改成可匯出的函式）
const $ = (id) => document.getElementById(id)

function el(tag, cls, text) {
  const e = document.createElement(tag)
  if (cls) e.className = cls
  if (text) e.textContent = text
  return e
}

function setActions(box, list) {
  box.innerHTML = ''
  list.forEach((a) => {
    const b = el('button', 'trick-btn', a.label)
    b.type = 'button'
    b.addEventListener('click', a.fn)
    box.appendChild(b)
  })
}

/* ===== 21 張牌：心電感應猜牌 ===== */
export function initCardTrick21() {
  const SUITS = ['♠', '♥', '♦', '♣']
  const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
  const NUM = ['一', '二', '三']
  const PROMPTS = [
    '在心裡選一張牌，記住它，不要告訴我。選好之後，告訴我它在哪一疊。',
    '我把牌重新發了一次。你的牌現在在哪一疊？',
    '最後一次。它現在在哪一疊？',
  ]
  const msg = $('trick-msg')
  const board = $('trick-board')
  const actions = $('trick-actions')
  let deck = []
  let round = 0
  const name = (c) => c.s + c.r

  function intro() {
    board.innerHTML = ''
    msg.textContent = '準備好了嗎？我會發 21 張牌給你看，你只要在心裡選一張，再告訴我它在哪一疊。'
    setActions(actions, [{ label: '開始', fn: start }])
  }

  function start() {
    const all = []
    SUITS.forEach((s) => RANKS.forEach((r) => all.push({ s, r, red: s === '♥' || s === '♦' })))
    for (let i = all.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[all[i], all[j]] = [all[j], all[i]]
    }
    deck = all.slice(0, 21)
    round = 0
    showPick()
  }

  function showPick() {
    const piles = [[], [], []]
    deck.forEach((c, i) => piles[i % 3].push(c))
    board.innerHTML = ''
    const wrap = el('div', 'piles')
    piles.forEach((p, pi) => {
      const col = el('div', 'pile')
      const stack = el('div', 'stack')
      stack.setAttribute('role', 'img')
      stack.setAttribute('aria-label', '第' + NUM[pi] + '疊：' + p.map(name).join('、'))
      p.forEach((c) => {
        const d = el('div', 'pc' + (c.red ? ' red' : ''), name(c))
        d.setAttribute('aria-hidden', 'true')
        stack.appendChild(d)
      })
      const b = el('button', 'pile-btn', '第' + NUM[pi] + '疊')
      b.type = 'button'
      b.addEventListener('click', () => choose(piles, pi))
      col.appendChild(stack)
      col.appendChild(b)
      wrap.appendChild(col)
    })
    board.appendChild(wrap)
    msg.textContent = PROMPTS[round]
    setActions(actions, [])
  }

  // 被選的那疊夾在中間收牌，三輪後那張牌必定是第 11 張
  function choose(piles, pi) {
    deck = piles[(pi + 1) % 3].concat(piles[pi], piles[(pi + 2) % 3])
    round++
    if (round < 3) showPick()
    else showReady()
  }

  function showReady() {
    const c = deck[10]
    board.innerHTML = ''
    const flip = el('div', 'flip')
    const inner = el('div', 'flip-in')
    inner.appendChild(el('div', 'face back'))
    inner.appendChild(el('div', 'face front' + (c.red ? ' red' : ''), name(c)))
    flip.appendChild(inner)
    board.appendChild(flip)
    msg.textContent = '我感應到了……'
    setActions(actions, [
      {
        label: '揭曉',
        fn: () => {
          flip.classList.add('flipped')
          msg.textContent = '是 ' + name(c) + ' 嗎？'
          setActions(actions, [{ label: '再玩一次', fn: intro }])
        },
      },
    ])
  }

  intro()
}

/* ===== 二進位卡片魔術的共用引擎 ===== */
function cardTrick(cfg) {
  const msg = $(cfg.id + '-msg')
  const board = $(cfg.id + '-board')
  const actions = $(cfg.id + '-actions')
  let si, idx, sums, timer

  function intro() {
    clearTimeout(timer)
    si = 0
    idx = 0
    sums = cfg.stages.map(() => 0)
    board.innerHTML = ''
    msg.textContent = cfg.intro
    setActions(actions, [{ label: '開始', fn: show }])
  }

  function show() {
    const st = cfg.stages[si]
    const card = el('div', 'nm-card')
    card.style.gridTemplateColumns = 'repeat(' + st.cols + ', 1fr)'
    card.style.maxWidth = st.width
    card.setAttribute('role', 'group')
    card.setAttribute('aria-label', (st.name || '') + '第 ' + (idx + 1) + ' 張卡')
    for (let n = 1; n <= st.limit; n++) {
      if (n & st.bits[idx]) card.appendChild(el('span', '', String(n)))
    }
    board.innerHTML = ''
    board.appendChild(card)
    msg.textContent =
      (st.name ? st.name + '・' : '') + '第 ' + (idx + 1) + ' 張（共 ' + st.bits.length + ' 張）：' + st.ask
    setActions(actions, [
      { label: '在', fn: () => { sums[si] += st.bits[idx]; next() } },
      { label: '不在', fn: next },
    ])
  }

  function next() {
    idx++
    if (idx < cfg.stages[si].bits.length) return show()
    si++
    idx = 0
    if (si < cfg.stages.length) show()
    else reveal()
  }

  function reveal() {
    const r = cfg.done(sums)
    board.innerHTML = ''
    if (r.error) {
      msg.textContent = r.error
      setActions(actions, [{ label: '再玩一次', fn: intro }])
      return
    }
    board.appendChild(el('div', 'nm-big', '？'))
    msg.textContent = '我正在讀你的心……'
    setActions(actions, [])
    timer = setTimeout(() => {
      board.innerHTML = ''
      board.appendChild(el('div', 'nm-big', r.big))
      msg.textContent = r.text
      setActions(actions, [{ label: '再玩一次', fn: intro }])
    }, 1400)
  }

  intro()
}

/* ===== 心靈猜數字：1 到 63，六張卡 ===== */
export function initNumberTrick() {
  cardTrick({
    id: 'num',
    intro: '在心裡想一個 1 到 63 之間的數字，不要告訴我。我會給你看六張卡，你只要告訴我數字有沒有在上面。',
    stages: [{ bits: [1, 2, 4, 8, 16, 32], limit: 63, cols: 8, width: '380px', ask: '你想的數字在這張卡上嗎？' }],
    done: (s) => {
      if (s[0] === 0) return { error: '六張卡都沒有你的數字……請選 1 到 63 之間的數字，我們再來一次。' }
      return { big: String(s[0]), text: '你想的是 ' + s[0] + '，對不對？' }
    },
  })
}

/* ===== 猜生日：4 張卡猜月份，5 張卡猜日期 ===== */
export function initBirthdayTrick() {
  cardTrick({
    id: 'bd',
    intro: '不用告訴我你的生日。我會先給你看 4 張卡猜月份，再給你看 5 張卡猜日期，你只要告訴我有沒有。',
    stages: [
      { name: '月份', bits: [1, 2, 4, 8], limit: 12, cols: 6, width: '270px', ask: '你出生的月份在這張卡上嗎？' },
      { name: '日期', bits: [1, 2, 4, 8, 16], limit: 31, cols: 8, width: '380px', ask: '你出生的日期在這張卡上嗎？' },
    ],
    done: (s) => {
      const DAYS = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      const m = s[0]
      const d = s[1]
      if (m < 1 || m > 12) return { error: '月份應該在 1 到 12 之間喔，我們再來一次。' }
      if (d < 1 || d > DAYS[m - 1]) return { error: m + ' 月沒有這一天喔，我們再來一次。' }
      return { big: m + ' / ' + d, text: '你的生日是 ' + m + ' 月 ' + d + ' 日，對不對？' }
    },
  })
}
