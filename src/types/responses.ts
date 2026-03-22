import type { BaseApiEntity, ApiResponse } from './http'

export interface FamilyGroupApiResponse extends BaseApiEntity {
    name: string
    description: string
    created_by_id: number
}

export type FamilyGroupsApiResponse = ApiResponse<FamilyGroupApiResponse[]>
