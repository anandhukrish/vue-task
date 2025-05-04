<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  data: {
    groups: {
      name: string
      email: string
      mobile: string
      id: string
    }[]
    birthDate: string
    gender: string
    languages: string[]
    city: string[]
    file: unknown
    fileName: string
  }
}>()

const formattedDate = computed(() =>
  new Date(props.data.birthDate).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }),
)
</script>

<template>
  <div class="bg-white p-6 rounded-xl shadow-lg space-y-6">
    <h2 class="text-2xl font-bold text-center">User Profile Summary</h2>

    <!-- Group Table -->
    <div class="overflow-auto">
      <table class="min-w-full table-auto border-collapse border border-gray-300">
        <thead class="bg-gray-100">
          <tr>
            <th class="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Email</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Mobile</th>
            <th class="border border-gray-300 px-4 py-2 text-left">ID</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(group, index) in props.data.groups" :key="index" class="hover:bg-gray-50">
            <td class="border border-gray-300 px-4 py-2">{{ group.name }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ group.email }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ group.mobile }}</td>
            <td class="border border-gray-300 px-4 py-2 break-all">{{ group.id }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Other Fields -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
      <div><span class="font-semibold">Birth Date:</span> {{ formattedDate }}</div>
      <div><span class="font-semibold">Gender:</span> {{ props.data.gender }}</div>
      <div><span class="font-semibold">Languages:</span> {{ props.data.languages.join(', ') }}</div>
      <div>
        <span class="font-semibold">Cities:</span>
        {{ data.city.map((c) => c).join(', ') }}
      </div>
      <div>
        <span class="font-semibold">File Uploaded:</span> {{ props.data.fileName || 'None' }}
      </div>
    </div>
  </div>
</template>
