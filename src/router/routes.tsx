import { createBrowserRouter } from 'react-router'
import Home from '@/pages/Home'
import Auth from '@/pages/Auth'
import { requireAuth, requireGuest, redirectRoot } from '@/router/loaders'
import { AUTH_ROUTE, HOME_ROUTE } from './constants'

const router = createBrowserRouter([
    {
        path: AUTH_ROUTE,
        loader: requireGuest,
        element: <Auth />,
    },
    {
        path: HOME_ROUTE,
        loader: requireAuth,
        element: <Home />,
    },
    {
        path: '*',
        loader: redirectRoot,
    },
])

export default router
