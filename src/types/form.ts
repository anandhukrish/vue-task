export interface UserFormGroup {
  name: string
  email: string
  mobile: string
  id: string
}

export interface UserFormData {
  groups: UserFormGroup[]
  birthDate: string
  gender: string
  languages: string[]
  city: string[]
  file: File | null
}
