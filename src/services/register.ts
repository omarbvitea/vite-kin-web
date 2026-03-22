import { httpClient } from '@/lib/http'
import { API_REGISTER } from '@/types/api'
import type { RegisterRequest } from '@/types/requests'

export const register = async (values: RegisterRequest): Promise<boolean> => {
    const response = await httpClient.post<{ success: boolean; message: string }>(API_REGISTER, {
        body: {
            email: values.email,
            password: values.password,
            full_name: values.full_name,
        },
    })

    return response.success
}
