export interface EntityWithId {
    id: number
}

export interface EntityWithTimestamps {
    created_at: string
    updated_at: string
}

export type BaseApiEntity = EntityWithId & EntityWithTimestamps

export interface ApiPaginationMeta {
    total: number
    page: number
    limit: number
    total_pages: number
}

export type ApiResponse<T> = {
    success: boolean
    message: string
    data: T
    meta: ApiPaginationMeta
}
