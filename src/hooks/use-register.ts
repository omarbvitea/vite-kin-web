import { useMutation } from '@tanstack/react-query'

import { useToast } from '@/hooks/use-toast'
import { register } from '@/services/register'
import type { RegisterRequest } from '@/types/requests'

export const useRegister = () => {
    const toast = useToast()

    const mutation = useMutation({
        mutationFn: (values: RegisterRequest) => register(values),
        onSuccess: () => {
            toast.success('Iniciaste sesion exitosamente.')
        },
        onError: () => {
            toast.error('Ocurrio un error inesperado.')
        },
    })

    return {
        isLoading: mutation.isPending,
        register: mutation.mutateAsync,
    }
}
