import { useMutation } from '@tanstack/react-query'

import { useToast } from '@/hooks/use-toast'
import { login } from '@/services/login'
import type { LoginRequest } from '@/types/requests'
import { useNavigate } from 'react-router'

export const useLogin = () => {
    const toast = useToast()
    const navigate = useNavigate()

    const mutation = useMutation({
        mutationFn: (values: LoginRequest) => login(values),
        onSuccess: () => {
            toast.success('Iniciaste sesion exitosamente.')
            navigate('/home')
        },
        onError: () => {
            toast.error('Ocurrio un error inesperado.')
        },
    })

    return {
        isLoading: mutation.isPending,
        login: mutation.mutateAsync,
    }
}
