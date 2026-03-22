export type Method = 'get' | 'post' | 'put' | 'patch' | 'delete'

export class HttpError extends Error {
    httpStatusCode: number

    constructor(message: string, statusCode: number, name: string = 'HttpError') {
        super(message)
        this.name = name
        this.httpStatusCode = statusCode
        Object.setPrototypeOf(this, HttpError.prototype)
    }
}

export interface ErrorResponse {
    success: false
    error: HttpError
    [key: string]: unknown
}

export interface RequestOptions {
    params?: URLSearchParams
    body?: unknown
    headers?: Record<string, string>
    timeout?: number
}
