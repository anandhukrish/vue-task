import * as z from 'zod'

// Phone number validation regex
const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/

// Email validation regex
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

// Form validation schema
export const schema = z.object({
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

  city: z.array(z.any()).min(1, 'At least one city must be selected'),

  file: z
    .custom<File | null>()
    .refine((val) => !!val, {
      message: 'File is required',
    })
    .refine((val) => !val || ['image/jpeg', 'application/pdf'].includes((val as File).type), {
      message: 'File must be JPEG or PDF',
    }),
})

// schema type
export type ZodSchema = z.infer<typeof schema>
