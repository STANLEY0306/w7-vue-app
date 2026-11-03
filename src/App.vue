<script setup>
import { ref, onMounted } from 'vue'
import SiteNav from './components/SiteNav.vue'
import ResourceCard from './components/ResourceCard.vue'
import PracticeLog from './components/PracticeLog.vue'
import TabBar from './components/TabBar.vue'
import TrickSection from './components/TrickSection.vue'
import AskForm from './components/AskForm.vue'
import AskMagic from './components/AskMagic.vue'
import { initCardTrick21, initNumberTrick, initBirthdayTrick } from './tricks.js'

/* ===== 模擬資料：每個陣列都用 v-for 傳給對應的元件 ===== */
const links = [
  { href: '#table', text: '試玩魔術' },
  { href: '#practice', text: '學習與練習' },
  { href: '#ask', text: '提問' },
  { href: '#ai', text: '問老師' },
]

const resources = [
  {
    id: 1,
    title: '推薦學習的地方',
    text: '想學魔術，可以到這個 YouTube 頻道看看，跟著影片一步一步練。',
    href: 'https://www.youtube.com/@magicchani',
    linkText: '前往 @magicchani 頻道',
  },
]

// 練習紀錄可選的手法（傳給 PracticeLog 當選項）
const moves = [
  { id: 'shuffle', name: '洗牌' },
  { id: 'cut', name: '切牌' },
  { id: 'switch', name: '換牌' },
  { id: 'fan', name: '展牌' },
]

const tricks = [
  { id: 'trick', prefix: 'trick', name: '心電感應猜牌', tag: '21 張牌', title: '心電感應猜牌', lead: '不用說出你選了哪一張，我來猜猜看。' },
  { id: 'number', prefix: 'num', name: '心靈猜數字', tag: '1 到 63', title: '心靈猜數字', lead: '想一個數字，我不問你是多少，也猜得到。' },
  { id: 'birthday', prefix: 'bd', name: '猜你的生日', tag: '月與日', title: '猜你的生日', lead: '不用告訴我你的生日，我先猜月份，再猜日期。' },
]

const active = ref('trick') // 目前選中的魔術，由 TabBar 用 v-model 綁定

// 三個魔術的畫面由 TrickSection 畫出空殼（用 v-show 保持在 DOM），畫面就緒後啟動各自的邏輯
onMounted(() => {
  initCardTrick21()
  initNumberTrick()
  initBirthdayTrick()
})
</script>

<template>
  <SiteNav brand="變魔術日記" :links="links" />

  <header class="hero" id="top">
    <div class="hero-inner">
      <div class="hero-text">
        <span class="eyebrow-mark" aria-hidden="true">
          <svg viewBox="0 0 34 34" fill="none"><path d="M17 2 L20.5 13.5 L32 17 L20.5 20.5 L17 32 L13.5 20.5 L2 17 L13.5 13.5 Z" fill="currentColor"/></svg>
        </span>
        <h1>我的興趣：變魔術</h1>
        <p class="subtitle">一副撲克牌，就是一整個舞台</p>
        <div class="divider"></div>
        <a class="hero-cta" href="#table">直接來玩一個</a>
      </div>
        <figure class="stagebox">
          <svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="spot" cx="50%" cy="30%" r="65%">
                <stop offset="0%" stop-color="#3d1820" stop-opacity="0.0"/>
                <stop offset="55%" stop-color="#3d1820" stop-opacity="0.35"/>
                <stop offset="100%" stop-color="#3d1820" stop-opacity="0.9"/>
              </radialGradient>
              <linearGradient id="curtainL" x1="0" x2="1" y1="0" y2="0"><stop offset="0%" stop-color="#4a151c"/><stop offset="100%" stop-color="#5e1f27"/></linearGradient>
              <linearGradient id="curtainR" x1="1" x2="0" y1="0" y2="0"><stop offset="0%" stop-color="#4a151c"/><stop offset="100%" stop-color="#5e1f27"/></linearGradient>
            </defs>
            <rect width="640" height="360" fill="#5e1f27"/>
            <rect width="640" height="360" fill="url(#spot)"/>
            <g opacity="0.9">
              <rect x="0" y="0" width="70" height="360" fill="url(#curtainL)"/>
              <rect x="570" y="0" width="70" height="360" fill="url(#curtainR)"/>
              <g stroke="#3d141a" stroke-width="4" opacity="0.55">
                <path d="M12 0 Q30 180 12 360"/><path d="M32 0 Q50 180 32 360"/><path d="M52 0 Q70 180 52 360"/>
                <path d="M588 0 Q606 180 588 360"/><path d="M608 0 Q626 180 608 360"/><path d="M628 0 Q640 180 628 360"/>
              </g>
            </g>
            <line x1="70" y1="300" x2="570" y2="300" stroke="#C79A3D" stroke-width="1" opacity="0.35"/>
            <g fill="#E6C374">
              <path d="M150 90 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4z"/>
              <path d="M470 70 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3z"/>
              <path d="M500 150 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3z"/>
              <path d="M120 180 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3z"/>
            </g>
            <g transform="translate(240,190)">
              <path d="M0 90 C -6 40 4 10 20 -4 C 26 -9 34 -8 34 0 L34 40 C 60 30 66 24 78 6 C 84 -3 96 0 92 12 C 84 34 60 58 34 66 L20 90 Z" fill="#3a231a"/>
            </g>
            <g transform="translate(300,150)">
              <g transform="rotate(-26)"><rect x="0" y="0" width="80" height="112" rx="6" fill="#F6EDE0" stroke="#2E1F17" stroke-width="2"/><circle cx="40" cy="56" r="10" fill="#7E2B34"/></g>
              <g transform="rotate(-9)"><rect x="10" y="-6" width="80" height="112" rx="6" fill="#F6EDE0" stroke="#2E1F17" stroke-width="2"/><path d="M60 24 l-24 44 h48z" fill="#2E1F17"/></g>
              <g transform="rotate(9)"><rect x="20" y="-10" width="80" height="112" rx="6" fill="#F6EDE0" stroke="#2E1F17" stroke-width="2"/><path d="M60 20 L72 42 L60 64 L48 42 Z" fill="#7E2B34"/></g>
              <g transform="rotate(26)"><rect x="30" y="-14" width="80" height="112" rx="6" fill="#F6EDE0" stroke="#2E1F17" stroke-width="2"/><path d="M70 20 l6 12 13 2 -9 9 2 13 -12 -6 -12 6 2 -13 -9 -9 13 -2z" fill="#2E1F17"/></g>
            </g>
          </svg>
          <figcaption class="caption">最喜歡的一刻：牌攤開的那零點五秒</figcaption>
        </figure>
    </div>
  </header>

  <main>
    <div class="stage">
      <section class="table" id="table" aria-labelledby="table-heading">
        <div class="table-side">
          <h2 id="table-heading">魔術桌</h2>
          <p class="lead">三個魔術，選一個來試。你只要在心裡想，剩下的交給我。</p>
          <TabBar v-model="active" :tabs="tricks" />
        </div>
        <div class="table-main">
          <TrickSection
            v-for="t in tricks"
            v-show="active === t.id"
            :key="t.id"
            :id="t.id"
            :prefix="t.prefix"
            :title="t.title"
            :lead="t.lead"
          />
        </div>
      </section>

      <section class="practice" id="practice" aria-labelledby="practice-heading">
        <h2 id="practice-heading">學習與練習</h2>
        <div class="practice-grid">
          <div class="resources">
            <ResourceCard
              v-for="r in resources"
              :key="r.id"
              :title="r.title"
              :text="r.text"
              :href="r.href"
              :link-text="r.linkText"
            />
          </div>
          <PracticeLog :moves="moves" />
        </div>
      </section>

      <section class="ask" id="ask" aria-labelledby="ask-heading">
        <div class="ask-intro">
          <h2 id="ask-heading">有問題，留下來</h2>
          <p class="lead">想知道魔術怎麼練、牌怎麼選，都可以問。留下 Email 和問題，我會回覆你。</p>
        </div>
        <AskForm />
      </section>

      <section class="ask" id="ai" aria-labelledby="ai-heading">
        <div class="ask-intro">
          <h2 id="ai-heading">問問魔術老師</h2>
          <p class="lead">這裡接的是我電腦上的本地 AI（Ollama），問它魔術怎麼練。只有在我的電腦開著 Ollama 時才能回答。</p>
        </div>
        <AskMagic />
      </section>
    </div>
  </main>

  <footer class="sitefooter">
    <div class="footer-inner">祝你，也遇見自己的第一個「怎麼可能」。</div>
  </footer>
</template>
