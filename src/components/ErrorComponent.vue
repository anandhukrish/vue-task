<template>
  <div
    class="flex items-center justify-center border shadow border-gray-500/20 py-10 px-5 rounded mt-10"
  >
    <h1 class="text-4xl text-bold capitalize">{{ message }}</h1>
  </div>
</template>

<script setup lang="ts">
defineProps<{ message: string }>()
</script>
