<script setup lang="ts">
import { RouterView } from 'vue-router'
import { v4 as uuidv4 } from 'uuid'

localStorage.setItem('token', uuidv4())
</script>

<template>
  <RouterView />
</template>
