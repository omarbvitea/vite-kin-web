import * as z from 'zod'

export const loginSchema = z.object({
    email: z.email('Correo electrónico no válido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
})

export const registerSchema = z.object({
    email: z.email('Correo electrónico no válido'),
    full_name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
})

export type LoginFormValues = z.infer<typeof loginSchema>
export type RegisterFormValues = z.infer<typeof registerSchema>
