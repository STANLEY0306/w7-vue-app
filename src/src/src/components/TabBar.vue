<script setup>
// v-model 綁定目前選中的分頁 id
const model = defineModel({ type: String, required: true })
defineProps({ tabs: { type: Array, default: () => [] } })
</script>

<template>
  <div class="tabbar" role="tablist" aria-label="選擇魔術">
    <button
      v-for="t in tabs"
      :key="t.id"
      type="button"
      role="tab"
      class="tab"
      :aria-selected="model === t.id"
      :class="{ on: model === t.id }"
      @click="model = t.id"
    >
      <span class="tab-name">{{ t.name }}</span>
      <span class="tab-tag">{{ t.tag }}</span>
    </button>
  </div>
</template>
