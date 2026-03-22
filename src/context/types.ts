import { createContext } from 'react'

export type ToastType = 'info' | 'success' | 'warning' | 'error'

export interface Toast {
    id: number
    message: string
    type: ToastType
}

export interface ToastContextType {
    show: (message: string, type: ToastType) => void
    success: (message: string) => void
    error: (message: string) => void
    info: (message: string) => void
    warning: (message: string) => void
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined)
