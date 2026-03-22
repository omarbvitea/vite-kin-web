import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { EyeIcon, EyeSlashIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

import { loginSchema, type LoginFormValues } from '@/schemas/auth'
import { useToast } from '@/hooks/use-toast'

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false)
    const toast = useToast()

    const {
        register: loginForm,
        handleSubmit: handleLoginSubmit,
        formState: { errors: loginErrors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: '', password: '' },
    })

    const onLogin = async (data: LoginFormValues) => {
        toast.info('La funcionalidad de login se implementará pronto.')
        console.log('Login data:', data)
    }

    return (
        <form className="space-y-1" onSubmit={handleLoginSubmit(onLogin)}>
            <fieldset className="fieldset">
                <legend className="fieldset-legend font-semibold">Correo Electrónico</legend>
                <input
                    type="text"
                    className={`input h-12 w-full ${loginErrors.email ? 'input-error' : 'input-bordered'}`}
                    placeholder="nombre@ejemplo.com"
                    {...loginForm('email')}
                />
                {loginErrors.email && (
                    <p className="text-error text-xs mt-1">{loginErrors.email.message}</p>
                )}
            </fieldset>

            <fieldset className="fieldset">
                <legend className="fieldset-legend font-semibold">Contraseña</legend>
                <div className="relative w-full">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        className={`input w-full h-12 ${loginErrors.password ? 'input-error' : 'input-bordered'}`}
                        placeholder="••••••••"
                        {...loginForm('password')}
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

                {loginErrors.password && (
                    <p className="text-error text-xs mt-1">{loginErrors.password.message}</p>
                )}
            </fieldset>

            <div className="space-y-6 mt-8">
                <button
                    type="submit"
                    className="btn btn-primary w-full h-14 rounded-xl shadow-lg shadow-primary/20 text-lg flex items-center justify-center gap-2 group hover:cursor-pointer"
                >
                    <span>Entrar</span>
                    <ArrowRightIcon className="size-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-sm text-base-content/60 text-center">
                    ¿Aún no tienes una cuenta?
                    <a className="font-bold text-primary hover:underline ml-1 hover:cursor-pointer">
                        Crea una aquí
                    </a>
                </p>
            </div>
        </form>
    )
}

export default LoginForm
