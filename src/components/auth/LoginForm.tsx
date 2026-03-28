import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { EyeIcon, EyeSlashIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

import { loginSchema, type LoginFormValues } from '@/schemas/auth'
import { useLogin } from '@/hooks/use-login'

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false)

    const { login, isLoading } = useLogin()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: '', password: '' },
    })

    const onLogin = handleSubmit(async (data: LoginFormValues) => {
        await login({
            email: data.email,
            password: data.password,
        })
    })

    return (
        <form className="space-y-1" onSubmit={onLogin}>
            <fieldset className="fieldset">
                <legend className="fieldset-legend font-semibold">Correo Electrónico</legend>
                <input
                    type="text"
                    className={`input h-12 w-full ${errors.email ? 'input-error' : 'input-bordered'}`}
                    placeholder="nombre@ejemplo.com"
                    {...register('email')}
                />
                {errors.email && <p className="text-error text-xs mt-1">{errors.email.message}</p>}
            </fieldset>

            <fieldset className="fieldset">
                <legend className="fieldset-legend font-semibold">Contraseña</legend>
                <div className="relative w-full">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        className={`input w-full h-12 ${errors.password ? 'input-error' : 'input-bordered'}`}
                        placeholder="••••••••"
                        {...register('password')}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-primary transition-colors hover:cursor-pointer"
                    >
                        {showPassword ? (
                            <EyeSlashIcon className="size-5" />
                        ) : (
                            <EyeIcon className="size-5" />
                        )}
                    </button>
                </div>

                {errors.password && (
                    <p className="text-error text-xs mt-1">{errors.password.message}</p>
                )}
            </fieldset>

            <div className="space-y-6 mt-8">
                <button
                    type="submit"
                    className={`btn btn-primary w-full h-14 rounded-xl text-lg flex items-center justify-center gap-2 group ${isLoading ? 'btn-disabled' : ''}`}
                >
                    {isLoading ? (
                        <span className="loading loading-spinner" />
                    ) : (
                        <>
                            <span>Entrar</span>
                            <ArrowRightIcon className="size-5 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
            </div>
        </form>
    )
}

export default LoginForm
