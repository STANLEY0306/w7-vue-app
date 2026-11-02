<script setup>
import { ref } from 'vue'
defineProps({
  brand: { type: String, required: true },
  links: { type: Array, default: () => [] },
})
const open = ref(false) // 手機版選單是否展開
</script>

<template>
  <nav class="sitenav" aria-label="頁內導覽">
    <div class="navbar-inner">
      <a class="brand" href="#top">{{ brand }}</a>
      <button class="burger" type="button" :aria-expanded="open" aria-controls="navlinks" aria-label="選單" @click="open = !open">
        <span></span><span></span><span></span>
      </button>
      <div id="navlinks" class="navlinks" :class="{ open }">
        <a v-for="l in links" :key="l.href" :href="l.href" @click="open = false">{{ l.text }}</a>
      </div>
    </div>
  </nav>
</template>
