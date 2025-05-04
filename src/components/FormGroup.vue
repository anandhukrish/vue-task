<script setup lang="ts">
import InputComponent from '@/components/ui/InputComponent.vue'
import { useField } from 'vee-validate'
import { watchEffect } from 'vue'

const props = defineProps<{
  index: number
}>()

const emit = defineEmits<{
  (e: 'remove'): void
}>()

watchEffect(() => {
  console.log(props.index)
})
const { value: name, errorMessage: nameError } = useField<string>(`groups[${props.index}].name`)
const { value: email, errorMessage: emailError } = useField<string>(`groups[${props.index}].email`)
const { value: mobile, errorMessage: mobileError } = useField<string>(
  `groups[${props.index}].mobile`,
)
</script>

<template>
  <div class="flex justify-between py-3">
    <h1 class="font-bold">Person {{ index + 1 }}</h1>
    <button
      type="button"
      class="border border-gray-400 hover:bg-gray-500/40 cursor-pointer rounded-full px-3 py-1"
      @click="emit('remove')"
    >
      X
    </button>
  </div>
  <div class="mb-3">
    <div class="flex gap-5 mb-3">
      <div class="flex-1">
        <InputComponent v-model="name" label="Name" id="name" placeholder="Enter Name" />
        <div v-if="nameError" class="text-red-500 font-bold text-sm">
          {{ nameError }}
        </div>
      </div>
      <div class="flex-1">
        <InputComponent v-model="email" label="Email" id="email" placeholder="Enter Email" />
        <div v-if="emailError" class="text-red-500 font-bold text-sm">
          {{ emailError }}
        </div>
      </div>
    </div>
    <div>
      <InputComponent
        v-model="mobile"
        label="Mobile Number"
        type="tel"
        id="phone"
        placeholder="(XXX) XXX-XXXX"
      />
      <div v-if="mobileError" class="text-red-500 font-bold text-sm">
        {{ mobileError }}
      </div>
    </div>
  </div>
</template>
