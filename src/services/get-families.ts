import type { FamilyGroup } from '@/types/domain'
import type { FamilyGroupsApiResponse } from '@/types/responses'

import { API_FAMILY_GROUPS } from '@/types/api'
import { mapFamilyGroupsFromApi } from '@/mappers/family-groups'
import { httpClient } from '@/lib/http'

export const getFamilies = async (): Promise<{ families: FamilyGroup[]; total: number }> => {
    const response = await httpClient.get<FamilyGroupsApiResponse>(API_FAMILY_GROUPS)

    return { families: mapFamilyGroupsFromApi(response.data), total: response.meta?.total ?? 0 }
}
