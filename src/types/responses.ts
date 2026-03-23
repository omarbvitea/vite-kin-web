import type { BaseApiEntity, ApiResponse } from './http'

export type LoginApiResponse = ApiResponse<{ access_token: string }>

export interface FamilyGroupApiResponse extends BaseApiEntity {
    name: string
    description: string
    created_by_id: number
}

export type FamilyGroupsApiResponse = ApiResponse<FamilyGroupApiResponse[]>
