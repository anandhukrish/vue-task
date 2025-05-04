<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import { useField, useFieldArray, useForm } from 'vee-validate'
import * as z from 'zod'

import FormGroup from '@/components/FormGroup.vue'
import InputCheckbox from '@/components/ui/InputCheckbox.vue'
import InputFileupload from '@/components/ui/InputFileupload.vue'
import RadioInput from '@/components/ui/RadioInput.vue'
import Multiselect from 'vue-multiselect'
import VueDatePicker from '@vuepic/vue-datepicker'

import 'vue-multiselect/dist/vue-multiselect.css'
import '@vuepic/vue-datepicker/dist/main.css'
import { toTypedSchema } from '@vee-validate/zod'
import api from '@/axios/api'
import { ref } from 'vue'
import { AxiosError } from 'axios'
import ProfileTable from '@/components/ProfileTable.vue'
import ErrorComponent from '@/components/ErrorComponent.vue'
import InputRow from '@/components/InputRow.vue'

// initial values
const initialValues = {
  groups: [
    { name: '', email: '', mobile: '', id: uuidv4() },
    { name: '', email: '', mobile: '', id: uuidv4() },
  ],
  birthDate: undefined,
  gender: '',
  languages: [],
  city: [],
  file: null,
}

//cities list
const cities = [
  { value: 'nyc', label: 'New York City' },
  { value: 'la', label: 'Los Angeles' },
  { value: 'chicago', label: 'Chicago' },
  { value: 'houston', label: 'Houston' },
  { value: 'phoenix', label: 'Phoenix' },
  { value: 'philadelphia', label: 'Philadelphia' },
  { value: 'san_antonio', label: 'San Antonio' },
  { value: 'san_diego', label: 'San Diego' },
  { value: 'dallas', label: 'Dallas' },
  { value: 'san_jose', label: 'San Jose' },
]

// Phone number validation regex
const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/

// Email validation regex
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

// Form validation schema
const schema = z.object({
  groups: z
    .array(
      z.object({
        name: z.string().min(1, 'Name is required'),
        email: z.string().min(1, 'Email is required').regex(emailRegex, 'Invalid email format'),
        mobile: z
          .string()
          .min(1, 'Mobile number is required')
          .regex(phoneRegex, 'Invalid phone format. Example: (844) 448-0110'),
        id: z.string().min(1),
      }),
    )
    .min(2, 'At least 2 person groups are required'),

  birthDate: z.custom<Date>().refine((val) => !!val, { message: 'Birth date is required' }),

  gender: z.string().min(1, 'Gender is required'),

  languages: z.array(z.string()).min(1, 'At least one language must be selected'),

  city: z
    .array(z.any()) // or z.object({ value: z.string(), label: z.string() }) for stricter typing
    .min(1, 'At least one city must be selected'),

  file: z
    .custom<File | null>()
    .refine((val) => !!val, {
      message: 'File is required',
    })
    .refine((val) => !val || ['image/jpeg', 'application/pdf'].includes((val as File).type), {
      message: 'File must be JPEG or PDF',
    }),
})

type ZodSchema = z.infer<typeof schema>

const { errors, handleSubmit } = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues,
})

//field values
const { value: gender } = useField<ZodSchema['gender']>('gender')
const { value: birthDate } = useField<ZodSchema['birthDate']>('birthDate')
const { value: languages } = useField<ZodSchema['languages']>('languages')
const { value: city } = useField<ZodSchema['city']>('city')
const { value: file } = useField<ZodSchema['file']>('file')

//field array for dynamic groups
const { fields, push, remove } = useFieldArray('groups')

const submittedData = ref(null)
const error = ref('')
const loading = ref(false)

// submit handler
const onSubmit = handleSubmit(async (values) => {
  const newValues: typeof values & { fileName: string } = { ...values, fileName: '' }
  newValues.city = values.city.map((c) => c.label)
  newValues.fileName = values.file.name
  loading.value = false
  error.value = ''
  try {
    const response = await api.post('/user', JSON.stringify(newValues))
    submittedData.value = response.data.data
  } catch (e) {
    console.log(e)
    if (e instanceof AxiosError) {
      error.value = 'Something went wrong'
    }
  }
})

//asd a feild to the group
function addGroup() {
  push({ name: '', email: '', mobile: '', id: uuidv4() })
}

//removing a fields from thegroup

function removeGroup(index: number) {
  if (fields.value && fields.value.length <= 2) {
    return
  }
  remove(index)
}
</script>

<template>
  <main class="flex h-screen">
    <div class="container mx-auto px-3 md:px-0">
      <div class="max-w-[800px] border border-gray-300/50 rounded-2xl p-5 mx-auto flex flex-col">
        <h1 class="font-extrabold text-3xl text-center uppercase">Profile Completion Form</h1>
        <form action="" @submit.prevent="onSubmit">
          <InputRow>
            <FormGroup
              v-for="(group, index) in fields"
              :key="group.key"
              :index="index"
              @remove="removeGroup(index)"
            />
            <div class="mb-3 flex w-full justify-end">
              <button
                type="button"
                class="px-2 py-2 rounded-lg bg-green-400 hover:bg-green-500 text-base text-white"
                @click="addGroup"
              >
                Add More
              </button>
            </div>
          </InputRow>
          <InputRow>
            <VueDatePicker
              v-model="birthDate"
              placeholder="Enter Birth Date"
              format="MMMM d, yyyy"
              preview-format="MMMM d, yyyy"
              :enable-time-picker="false"
              :input-attr="{
                class: 'placeholder:text-red-500 placeholder:italic',
              }"
            />
            <div v-if="errors.birthDate" class="text-red-500 font-bold text-sm">
              {{ errors.birthDate }}
            </div>
          </InputRow>
          <InputRow>
            <label class="mb-2 font-bold">Gender:</label>
            <div class="flex gap-5">
              <RadioInput label="Male" v-model="gender" id="male" name="gender" value="male" />
              <RadioInput
                label="Female"
                v-model="gender"
                id="female"
                name="gender"
                value="female"
              />
              <RadioInput
                label="Others"
                v-model="gender"
                id="others"
                name="gender"
                value="others"
              />
            </div>
            <div v-if="errors.gender" class="text-red-500 font-bold text-sm">
              {{ errors.gender }}
            </div>
          </InputRow>
          <InputRow>
            <div class="flex items-center gap-5">
              <label class="font-bold">Select Language: </label>
              <InputCheckbox label="React" v-model="languages" id="React" value="React" />
              <InputCheckbox label="Angular" v-model="languages" id="Angular" value="Angular" />
              <InputCheckbox label="Vue" v-model="languages" id="vue" value="Vue" />
            </div>
            <div v-if="errors.languages" class="text-red-500 font-bold text-sm">
              {{ errors.languages }}
            </div>
          </InputRow>
          <InputRow>
            <Multiselect
              v-model="city"
              :options="cities"
              :multiple="true"
              :searchable="true"
              track-by="value"
              label="label"
              placeholder="Select Cities"
            />
            <div v-if="errors.city" class="text-red-500 font-bold text-sm">
              {{ errors.city }}
            </div>
          </InputRow>
          <div>
            <InputFileupload label="File" v-model="file" id="file" />
            <span>{{ file?.name }}</span>
            <div v-if="errors.file" class="text-red-500 font-bold text-sm">
              {{ errors.file }}
            </div>
          </div>

          <div class="flex">
            <button
              type="submit"
              class="px-8 py-2 rounded-lg bg-green-400 hover:bg-green-500 text-base text-white mt-5 ml-auto"
              :disabled="loading"
            >
              {{ loading ? 'Submiting...' : 'Submit' }}
            </button>
          </div>
        </form>
        <div v-if="submittedData" class="mt-8">
          <ProfileTable :data="submittedData" />
        </div>
        <ErrorComponent message="Something Went Wrong Please Try again Later" v-if="error" />
      </div>
    </div>
  </main>
</template>
