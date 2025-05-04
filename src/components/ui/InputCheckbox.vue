<script setup lang="ts">
import { computed } from 'vue'

type Props = {
  label?: string
  modelValue: string[] | boolean
  placeholder?: string
  id: string
  value?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[] | boolean): void
}>()

const model = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})
</script>
<template>
  <div class="flex gap-5">
    <input :id="id" :placeholder="placeholder" :value="value" type="checkbox" v-model="model" />
    <label :for="id" v-if="label">{{ label }}</label>
  </div>
</template>
