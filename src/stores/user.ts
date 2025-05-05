import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/axios/api'
import { AxiosError } from 'axios'

type UserData = {
  groups: {
    name: string
    email: string
    mobile: string
    id: string
  }[]
  birthDate: Date
  gender: string
  languages: string[]
  city: string[]
  file: unknown
  fileName: string
}

export const useUserStore = defineStore('user', () => {
  const loading = ref(false)
  const error = ref('')
  const data = ref<UserData | null>(null)
  async function addUserData(userDetails: UserData) {
    try {
      loading.value = true
      const response = await api.post('/user', JSON.stringify(userDetails))
      console.log('store', response.data)
      data.value = response.data.data
    } catch (e) {
      console.log(e)
      if (e instanceof AxiosError) {
        error.value = 'Something went wrong'
      }
    } finally {
      loading.value = false
    }
  }

  return { loading, error, addUserData, data }
})
