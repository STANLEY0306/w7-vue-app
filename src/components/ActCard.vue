<script setup>
defineProps({
  title: { type: String, required: true },
  text: { type: String, default: '' },
})
</script>

<template>
  <article class="act">
    <h2>{{ title }}</h2>
    <p>{{ text }}</p>
  </article>
</template>
