export const attachToken = (request: Request) => {
    const token = sessionStorage.getItem('sessionToken')
    const isAuthEndpoint = request.url.includes('api/auth/login')

    if (token && !isAuthEndpoint) {
        request.headers.set('Authorization', `Bearer ${token}`)
    } else {
        localStorage.clear()
    }
}
