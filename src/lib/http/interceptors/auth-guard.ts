import type { NormalizedOptions } from 'ky'

const UNAUTHORIZED_CODES = [401, 403]

export const authGuard = (_request: Request, _options: NormalizedOptions, response: Response) => {
    if (!UNAUTHORIZED_CODES.includes(response.status)) return

    sessionStorage.clear()
    localStorage.removeItem('authStore')

    const loginUrl = new URL('/auth', window.location.origin)

    if (window.location.pathname !== '/') {
        loginUrl.searchParams.set('redirect', window.location.pathname)
    }

    window.location.href = loginUrl.href

    throw new Error(response.status === 401 ? 'Session expired' : 'Access denied')
}
