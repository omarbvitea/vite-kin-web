import { createBrowserRouter, redirect } from 'react-router'
import Home from '@/pages/Home'
import Auth from '@/pages/Auth'

const router = createBrowserRouter([
    {
        path: '/auth',
        element: <Auth />,
    },
    {
        path: '/home',
        element: <Home />,
    },
    {
        path: '*',
        loader: () => {
            const sessionToken = sessionStorage.getItem('sessionToken')
            return redirect(sessionToken ? '/home' : '/auth')
        },
    },
])

export default router
