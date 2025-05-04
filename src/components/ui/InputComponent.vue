<script setup lang="ts">
import { computed } from 'vue'

type Props = {
  label?: string
  modelValue: string
  placeholder?: string
  type?: string
  id: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

function handleInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}

const safeValue = computed(() => props.modelValue ?? '')
</script>
<template>
  <div class="flex items-center gap-5">
    <label :for="id" v-if="label">{{ label }}</label>
    <input
      :id="id"
      :placeholder="placeholder"
      :value="safeValue"
      :type="type || 'text'"
      @input="handleInput"
      class="w-full border border-gray-500/30 p-1.5 outline-none rounded-l"
    />
  </div>
</template>
