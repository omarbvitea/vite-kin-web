import type { ErrorResponse } from '../types'

import { HTTPError } from 'ky'

export const toErrorResponse = async (error: unknown): Promise<ErrorResponse> => {
    if (error instanceof HTTPError) {
        const { response } = error
        const contentType = response.headers.get('content-type')
        let extra = {}

        if (contentType?.includes('application/json')) {
            try {
                extra = await response.clone().json()
            } catch {}
        }

        return {
            ...extra,
            success: false,
            error: {
                httpStatusCode: response.status,
                name: 'HTTPERROR',
                message: (response.statusText || `HTTP ${response.status}`).toUpperCase(),
            },
        }
    }

    if (error instanceof Error) {
        return {
            success: false,
            error: {
                httpStatusCode: 0,
                name: (error.name || 'NETWORKERROR').toUpperCase(),
                message: (error.message || 'NETWORK REQUEST FAILED').toUpperCase(),
            },
        }
    }

    return {
        success: false,
        error: {
            httpStatusCode: 0,
            name: 'UNKNOWNERROR',
            message: 'AN UNEXPECTED ERROR OCCURRED',
        },
    }
}
