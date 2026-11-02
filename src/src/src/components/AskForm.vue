<script setup>
import { ref, computed } from 'vue'
import FormField from './FormField.vue'

const email = ref('')
const question = ref('')
const touched = ref(false) // 按過送出後才顯示錯誤提示
const sent = ref(false)

const emailOk = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value))
const left = computed(() => 200 - question.value.length)
const emailError = computed(() => (touched.value && !emailOk.value ? '請輸入正確的 Email。' : ''))
const questionError = computed(() => (touched.value && !question.value.trim() ? '請寫下你的問題。' : ''))
const canSubmit = computed(() => emailOk.value && question.value.trim().length > 0 && left.value >= 0)

function submit() {
  touched.value = true
  if (!canSubmit.value) return
  sent.value = true // 沒有資料庫，不儲存，只顯示感謝訊息
}

function again() {
  question.value = ''
  touched.value = false
  sent.value = false
}
</script>

<template>
  <form v-if="!sent" class="askform" novalidate @submit.prevent="submit">
    <FormField id="email" label="Email" type="email" required autocomplete="email" v-model="email" :error="emailError" />
    <FormField
      id="question"
      label="你的問題"
      multiline
      required
      v-model="question"
      :error="questionError"
      :hint="'還可以輸入 ' + left + ' 字'"
    />
    <button type="submit" class="submit-btn" :disabled="touched && !canSubmit">送出問題</button>
  </form>

  <div v-else class="thanks" role="status" aria-live="polite">
    <h3>謝謝你的提問！</h3>
    <p>我會用 {{ email }} 回覆你。</p>
    <button type="button" class="submit-btn" @click="again">再問一題</button>
  </div>
</template>
