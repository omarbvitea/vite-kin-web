import type { FamilyGroupApiResponse } from '@/types/responses'

export const mapFamilyGroupsFromApi = (data: FamilyGroupApiResponse[]) => {
    return data.map((item: FamilyGroupApiResponse) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        created_at: item.created_at,
        created_by_id: item.created_by_id,
    }))
}
