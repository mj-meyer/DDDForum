import { createBrowserRouter } from 'react-router-dom'
import { AppRoot } from './root'

type Router = () => ReturnType<typeof createBrowserRouter>

export const createRouter: Router = () =>
  createBrowserRouter([
    {
      path: '/',
      element: <AppRoot />,
      children: [
        {
          path: '',
          lazy: async () => {
            const { LandingRoute } = await import('./landing')
            return { Component: LandingRoute }
          },
        },
        {
          path: '/register',
          lazy: async () => {
            const { RegisterRoute } = await import('./auth/register')
            return { Component: RegisterRoute }
          },
        },
      ],
    },
    {
      path: '*',
      lazy: async () => {
        const { NotFoundRoute } = await import('./not-found')
        return { Component: NotFoundRoute }
      },
    },
  ])
