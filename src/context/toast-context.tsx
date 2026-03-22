import React, { useState, useCallback } from 'react'
import { type Toast, type ToastType, ToastContext } from './types'

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([])

    const removeToast = useCallback((id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
    }, [])

    const show = useCallback(
        (message: string, type: ToastType) => {
            const id = Date.now()
            setToasts((prev) => [...prev, { id, message, type }])
            setTimeout(() => removeToast(id), 3000)
        },
        [removeToast],
    )

    const success = (msg: string) => show(msg, 'success')
    const error = (msg: string) => show(msg, 'error')
    const info = (msg: string) => show(msg, 'info')
    const warning = (msg: string) => show(msg, 'warning')

    return (
        <ToastContext.Provider value={{ show, success, error, info, warning }}>
            {children}
            {/* daisyUI Toast Container */}
            <div className="toast toast-end toast-bottom z-50">
                {toasts.map((toast) => (
                    <div key={toast.id} className={`alert alert-${toast.type} shadow-lg mb-2`}>
                        <span>{toast.message}</span>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    )
}
