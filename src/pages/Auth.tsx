import { useState } from 'react'
import LoginForm from '@/components/auth/LoginForm'
import RegisterForm from '@/components/auth/RegisterForm'

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true)

    return (
        <div className="min-h-screen bg-base-100 flex flex-col font-sans">
            <main className="flex-1 flex flex-col lg:flex-row">
                <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary/5">
                    <div className="absolute inset-0 z-10 bg-linear-to-tr from-black/60 via-transparent to-transparent"></div>
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform hover:scale-105 duration-1000"
                        style={{
                            backgroundImage:
                                "url('https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp')",
                        }}
                    />
                    <div className="relative z-20 flex flex-col justify-end p-20 h-full">
                        <h1 className="text-5xl font-extrabold text-white leading-tight mb-6">
                            Cada familia tiene una historia
                            <br />
                            <span className="text-primary-content bg-primary px-2">
                                Ayúdala a vivir por siempre
                            </span>
                        </h1>
                        <p className="text-white/80 text-lg max-w-md">
                            Únete a miles de familias que preservan su herencia y descubren sus
                            raíces.
                        </p>
                        <div className="mt-10 flex gap-4">
                            <div className="avatar-group -space-x-4 rtl:space-x-reverse">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="avatar">
                                        <div className="w-10">
                                            <img
                                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                                alt={`Avatar ${i}`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p className="text-white/60 text-sm flex items-center">
                                50k+ personas explorando su historia
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 flex items-center lg:items-start lg:pt-40 justify-center p-6 md:p-12 lg:p-20 bg-base-100">
                    <div className="flex flex-col w-full max-w-md gap-6">
                        <div className="text-center lg:text-left">
                            <h2 className="text-3xl font-black tracking-tight mb-2 text-base-content">
                                {isLogin ? 'Bienvenido de nuevo' : 'Crea tu cuenta'}
                            </h2>
                            <p className="text-base-content/60">
                                {isLogin
                                    ? 'Por favor ingresa tus datos para acceder a tu archivo familiar.'
                                    : 'Empieza a documentar tu historia familiar hoy mismo.'}
                            </p>
                        </div>

                        <div className="flex flex-col gap-6">
                            <div className="tabs tabs-box w-fit">
                                <button
                                    role="tab"
                                    className={`tab font-bold ${isLogin ? 'tab-active' : ''}`}
                                    onClick={() => setIsLogin(true)}
                                >
                                    Iniciar Sesión
                                </button>
                                <button
                                    role="tab"
                                    className={`tab font-bold ${!isLogin ? 'tab-active' : ''}`}
                                    onClick={() => setIsLogin(false)}
                                >
                                    Registrarse
                                </button>
                            </div>

                            {isLogin ? <LoginForm /> : <RegisterForm />}
                        </div>

                        <div className="text-center">
                            <p className="text-sm text-base-content/60">
                                {isLogin ? '¿Aún no tienes una cuenta?' : '¿Ya tienes una cuenta?'}
                                <button
                                    className="font-bold text-primary hover:underline ml-1 hover:cursor-pointer"
                                    onClick={() => setIsLogin(!isLogin)}
                                >
                                    {isLogin ? 'Crea una aquí' : 'Inicia sesión aquí'}
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Auth
