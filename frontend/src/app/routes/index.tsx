import { createBrowserRouter } from 'react-router-dom'

type Router = () => ReturnType<typeof createBrowserRouter>

export const createRouter: Router = () =>
  createBrowserRouter([
    {
      path: '/',
      lazy: async () => {
        const { LandingRoute } = await import('./landing')
        return { Component: LandingRoute }
      },
    },
    {
      path: '*',
      lazy: async () => {
        const { NotFoundRoute } = await import('./not-found')
        return { Component: NotFoundRoute }
      },
    },
  ])
