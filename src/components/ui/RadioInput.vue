<script setup lang="ts">
type Props = {
  label?: string
  modelValue: string
  placeholder?: string
  id: string
  value: string
  name: string
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

function handleInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>
<template>
  <div class="flex items-center">
    <input
      :id="id"
      :placeholder="placeholder"
      :value="value"
      :checked="modelValue === value"
      type="radio"
      :name="name"
      @change="handleInput"
    />
    <label :for="id" v-if="label" class="ml-3">{{ label }}</label>
  </div>
</template>
