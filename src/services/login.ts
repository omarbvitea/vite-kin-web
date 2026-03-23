import { httpClient } from '@/lib/http'
import { API_LOGIN } from '@/types/api'
import type { LoginRequest } from '@/types/requests'
import type { LoginApiResponse } from '@/types/responses'

export const login = async (values: LoginRequest) => {
    const response = await httpClient.post<LoginApiResponse>(API_LOGIN, {
        body: {
            email: values.email,
            password: values.password,
        },
    })

    sessionStorage.setItem('sessionToken', response.data.access_token)

    return response
}
