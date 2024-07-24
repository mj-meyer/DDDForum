import Axios, { InternalAxiosRequestConfig } from 'axios'

import { toast } from 'sonner'
import { env } from '@/config/env'
import { ErrorMessages, ServerErrors } from './api-error-messages'

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = 'application/json'
  }

  // config.withCredentials = true
  return config
}

export const api = Axios.create({
  baseURL: env.VITE_API_URL,
})

api.interceptors.request.use(authRequestInterceptor)
api.interceptors.response.use(
  response => {
    return response.data.data
  },
  error => {
    const message = error.response?.data?.error || error.message

    toast.error(ErrorMessages[message as ServerErrors] || 'An error occurred')

    if (error.response?.status === 401) {
      const searchParams = new URLSearchParams()
      const redirectTo = searchParams.get('redirectTo')
      window.location.href = `/login?redirectTo=${redirectTo}`
    }

    return Promise.reject(error)
  }
)
