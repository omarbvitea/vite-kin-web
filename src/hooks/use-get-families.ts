import { useQuery, useQueryClient } from '@tanstack/react-query'

import { getFamilies } from '@/services/get-families'

export const useGetFamilies = () => {
    const queryClient = useQueryClient()

    const { data, isLoading } = useQuery({
        queryKey: ['families'],
        queryFn: () => getFamilies(),
    })

    const invalidate = async () => {
        await queryClient.invalidateQueries({ queryKey: ['families'] })
    }

    return {
        isLoading,
        families: data?.families ?? [],
        meta: data?.total ?? { total: 0 },
        invalidate,
    }
}
