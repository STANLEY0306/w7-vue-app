<script setup>
defineProps({
  title: { type: String, required: true },
  text: { type: String, default: '' },
  href: { type: String, required: true },
  linkText: { type: String, default: '前往' },
})
</script>

<template>
  <article class="resource">
    <h3>{{ title }}</h3>
    <p>{{ text }}</p>
    <a class="resource-link" :href="href" target="_blank" rel="noopener noreferrer">{{ linkText }}</a>
  </article>
</template>
