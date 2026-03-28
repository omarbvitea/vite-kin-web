import { redirect } from 'react-router'
import { AUTH_ROUTE, HOME_ROUTE } from './constants'

const getSession = () => sessionStorage.getItem('sessionToken')

export const requireAuth = () => (getSession() ? null : redirect(AUTH_ROUTE))

export const requireGuest = () => (getSession() ? redirect(HOME_ROUTE) : null)

export const redirectRoot = () => redirect(getSession() ? HOME_ROUTE : AUTH_ROUTE)
