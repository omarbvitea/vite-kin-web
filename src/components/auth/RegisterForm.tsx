import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    EnvelopeIcon,
    LockClosedIcon,
    UserIcon,
    EyeIcon,
    EyeSlashIcon,
    ArrowRightIcon,
} from '@heroicons/react/24/outline'

import { registerSchema, type RegisterFormValues } from '@/schemas/auth'
import { useRegister } from '@/hooks/use-register'

const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState(false)
    const { register: registerAction, isLoading: isRegisterLoading } = useRegister()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: { full_name: '', email: '', password: '' },
    })

    const onRegister = async (data: RegisterFormValues) => {
        await registerAction({
            email: data.email,
            password: data.password,
            full_name: data.full_name,
        })
    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit(onRegister)}>
            <label className="fieldset">
                <legend className="fieldset-legend font-semibold">Nombre Completo</legend>
                <div className="relative w-full">
                    <UserIcon className="size-5 absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
                    <input
                        type="text"
                        className={`input w-full pl-12 rounded-xl h-12 ${errors.full_name ? 'input-error' : 'input-bordered'}`}
                        placeholder="Juan Pérez"
                        {...register('full_name')}
                    />
                </div>
                {errors.full_name && (
                    <p className="text-error text-xs mt-1">{errors.full_name.message}</p>
                )}
            </label>

            <label className="fieldset">
                <legend className="fieldset-legend font-semibold">Correo Electrónico</legend>
                <div className="relative w-full">
                    <EnvelopeIcon className="size-5 absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
                    <input
                        type="email"
                        className={`input w-full pl-12 rounded-xl h-12 ${errors.email ? 'input-error' : 'input-bordered'}`}
                        placeholder="nombre@ejemplo.com"
                        {...register('email')}
                    />
                </div>
                {errors.email && <p className="text-error text-xs mt-1">{errors.email.message}</p>}
            </label>

            <label className="fieldset">
                <legend className="fieldset-legend font-semibold">Contraseña</legend>
                <div className="relative w-full">
                    <LockClosedIcon className="size-5 absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
                    <input
                        type={showPassword ? 'text' : 'password'}
                        className={`input w-full pl-12 pr-12 rounded-xl h-12 ${errors.password ? 'input-error' : 'input-bordered'}`}
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
            </label>

            <button
                type="submit"
                disabled={isRegisterLoading}
                className="btn btn-primary w-full h-14 rounded-xl shadow-lg shadow-primary/20 text-lg flex items-center justify-center gap-2 group mt-4 hover:cursor-pointer"
            >
                {isRegisterLoading ? (
                    <span className="loading loading-spinner"></span>
                ) : (
                    <>
                        <span>Crear Cuenta</span>
                        <ArrowRightIcon className="size-5 group-hover:translate-x-1 transition-transform" />
                    </>
                )}
            </button>
        </form>
    )
}

export default RegisterForm
