<script setup>
const model = defineModel({ type: [String, Number], default: '' }) // 搭配 v-model 使用
defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  type: { type: String, default: 'text' },
  min: { type: [String, Number], default: undefined },
  required: { type: Boolean, default: false },
  multiline: { type: Boolean, default: false },
  hint: { type: String, default: '' },
  error: { type: String, default: '' },
  autocomplete: { type: String, default: undefined },
})
</script>

<template>
  <div class="field">
    <label :for="id">
      {{ label }}
      <span v-if="required" class="req" aria-hidden="true">*</span>
    </label>
    <textarea v-if="multiline" :id="id" :name="id" rows="5" v-model="model"></textarea>
    <input
      v-else
      :id="id"
      :name="id"
      :type="type"
      v-model="model"
      :autocomplete="autocomplete"
      :min="min"
      :aria-invalid="error ? 'true' : undefined"
    />
    <span v-if="error" class="err">{{ error }}</span>
    <span v-else-if="hint" class="hint">{{ hint }}</span>
  </div>
</template>
