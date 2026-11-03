<script setup>
import { ref, computed } from 'vue'
import FormField from './FormField.vue'

// 本地 AI：透過 Ollama 在自己電腦上執行的模型
const OLLAMA_URL = 'http://localhost:11434/api/chat'
const MODEL = 'qwen2.5:3b'

// 提示工程：用 system prompt 設定角色、語言與回答長度
const SYSTEM_PROMPT =
  '你是一位友善的魔術老師，專門教撲克牌魔術與練習方法。請用繁體中文回答，簡短清楚（不超過 150 字），不要揭露任何真實表演的秘密道具細節。'

const question = ref('')
const answer = ref('')
const loading = ref(false)
const error = ref('')

const canAsk = computed(() => question.value.trim().length > 0 && !loading.value)

async function ask() {
  if (!canAsk.value) return
  loading.value = true
  error.value = ''
  answer.value = ''
  try {
    const res = await fetch(OLLAMA_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL,
        stream: false,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: question.value.trim() },
        ],
      }),
    })
    if (!res.ok) throw new Error('HTTP ' + res.status)
    const data = await res.json()
    answer.value = data.message.content
  } catch (e) {
    error.value = '連不上本地 AI。請確認 Ollama 已開啟，並已下載 ' + MODEL + '。'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="askmagic">
    <form class="askform" novalidate @submit.prevent="ask">
      <FormField id="ai-question" label="想問魔術老師什麼？" multiline v-model="question" :hint="'例如：新手要怎麼練洗牌？'" />
      <button type="submit" class="submit-btn" :disabled="!canAsk">
        {{ loading ? '老師思考中…' : '問老師' }}
      </button>
    </form>

    <p v-if="error" class="err" role="alert">{{ error }}</p>
    <div v-if="answer" class="thanks" role="status" aria-live="polite">
      <h3>老師說</h3>
      <p>{{ answer }}</p>
    </div>
  </div>
</template>
