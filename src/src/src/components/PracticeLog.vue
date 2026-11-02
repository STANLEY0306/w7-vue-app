<script setup>
import { ref, computed } from 'vue'
import FormField from './FormField.vue'

const records = ref([]) // ref：紀錄陣列（存在記憶體，重新整理會清空）
const moveName = ref('') // v-model：手法名稱（自己打字）
const minutes = ref('') // v-model：分鐘數
let nextId = 1

const minutesNum = computed(() => Number(minutes.value))
const canAdd = computed(() => Number.isFinite(minutesNum.value) && minutesNum.value > 0 && moveName.value.trim() !== '')
const total = computed(() => records.value.reduce((sum, r) => sum + r.minutes, 0)) // computed：累計分鐘
const average = computed(() => (records.value.length ? Math.round(total.value / records.value.length) : 0)) // 平均每次
const hours = computed(() => (total.value / 60).toFixed(1)) // 換算小時

function add() {
  if (!canAdd.value) return
  records.value.unshift({ id: nextId++, move: moveName.value.trim(), minutes: Math.round(minutesNum.value) })
  moveName.value = ''
  minutes.value = ''
}
function remove(id) {
  records.value = records.value.filter((r) => r.id !== id)
}
</script>

<template>
  <div class="plog">
    <h3>今天練了什麼</h3>

    <dl class="stats">
      <div><dt>累計</dt><dd>{{ total }} 分鐘</dd></div>
      <div><dt>平均每次</dt><dd>{{ average }} 分鐘</dd></div>
      <div><dt>約等於</dt><dd>{{ hours }} 小時</dd></div>
    </dl>

    <form class="plog-form" novalidate @submit.prevent="add">
      <FormField id="move" label="練的手法" placeholder="例如：洗牌" v-model="moveName" />
      <FormField id="minutes" label="練了幾分鐘" type="number" :min="1" v-model="minutes" />
      <button type="submit" class="submit-btn" :disabled="!canAdd">新增紀錄</button>
    </form>

    <ul v-if="records.length" class="plog-list">
      <li v-for="r in records" :key="r.id">
        <span>{{ r.move }}　{{ r.minutes }} 分鐘</span>
        <button type="button" class="plog-del" :aria-label="'刪除 ' + r.move + ' 紀錄'" @click="remove(r.id)">刪除</button>
      </li>
    </ul>
    <p v-else class="plog-empty">還沒有紀錄。輸入手法、分鐘數，按「新增紀錄」。</p>
  </div>
</template>
