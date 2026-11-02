<script setup>
defineProps({
  id: { type: String, required: true },
  prefix: { type: String, required: true },
  title: { type: String, required: true },
  lead: { type: String, default: '' },
})
</script>

<template>
  <section class="trick" :id="id" :aria-labelledby="id + '-heading'">
    <h3 :id="id + '-heading'">{{ title }}</h3>
    <p class="lead">{{ lead }}</p>
    <div class="trick-stage">
      <p class="trick-msg" :id="prefix + '-msg'" role="status" aria-live="polite"></p>
      <div :id="prefix + '-board'"></div>
      <div class="trick-actions" :id="prefix + '-actions'"></div>
    </div>
  </section>
</template>
