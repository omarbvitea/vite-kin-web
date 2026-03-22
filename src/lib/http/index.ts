import type { RequestOptions } from './types'

import ky, { type Options } from 'ky'

import { attachToken } from './interceptors/attach-token'
import { authGuard } from './interceptors/auth-guard'
import { toErrorResponse } from './interceptors/enrich-error'
import { HttpError, type Method } from './types'

const createHttpClient = (kyInstance: typeof ky) => {
    const request = async <T>(
        method: Method,
        url: string,
        { params, body, headers, timeout }: RequestOptions = {},
    ): Promise<T> => {
        try {
            const options: Options = {
                method,
                searchParams: params,
                headers,
                timeout,
            }

            if (body && method !== 'get') {
                options.json = body
            }

            const res = await kyInstance(url, options)
            return await res.json<T>()
        } catch (error) {
            const errorResponse = await toErrorResponse(error)
            throw new HttpError(
                errorResponse.error.message,
                errorResponse.error.httpStatusCode,
                errorResponse.error.name,
            )
        }
    }

    return {
        get: <T>(url: string, options?: Omit<RequestOptions, 'body'>) =>
            request<T>('get', url, options),
        post: <T>(url: string, options?: RequestOptions) => request<T>('post', url, options),
        put: <T>(url: string, options?: RequestOptions) => request<T>('put', url, options),
        patch: <T>(url: string, options?: RequestOptions) => request<T>('patch', url, options),
        delete: <T>(url: string, options?: RequestOptions) => request<T>('delete', url, options),
    }
}

const salesApi = ky.create({
    prefixUrl: import.meta.env.VITE_API_KIN,
    hooks: {
        beforeRequest: [attachToken],
        afterResponse: [authGuard],
    },
})

export const httpClient = createHttpClient(salesApi)
