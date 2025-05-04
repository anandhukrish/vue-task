<script setup lang="ts">
type Props = {
  modelValue: File | null
  placeholder?: string
  id: string
  value?: string
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: File | null): void
}>()

function handleChange(e: Event) {
  const files = (e.target as HTMLInputElement).files
  emit('update:modelValue', files && files[0] ? files[0] : null)
}
</script>
<template>
  <input
    :id="id"
    :placeholder="placeholder"
    :value="value"
    type="file"
    @change="handleChange"
    accept=".jpeg, .jpg, .pdf"
    class="border border-gray-500/20 w-full rounded-lg file:mr-4 file:rounded-full file:border-0 file:bg-green-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-green-400"
  />
</template>
