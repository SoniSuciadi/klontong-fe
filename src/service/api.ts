import router from '@/router'
import axios, { type AxiosInstance } from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

let refreshing: Promise<string> | undefined = undefined

const refreshAccessToken = async () => {
  try {
    const response = await axios.get(`${baseURL}/auth/refresh`, { withCredentials: true })
    const result = response.data
    return result.data.accessToken
  } catch (error) {
    window.localStorage.clear()
    router.push({ name: 'login' })
    console.error(error)
    throw new Error('Failed to refresh token')
  }
}

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        if (!refreshing) {
          refreshing = refreshAccessToken()
        }

        const newAccessToken = await refreshing
        refreshing = undefined
        window.localStorage.setItem('accessToken', newAccessToken)

        axiosInstance.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`

        return axiosInstance(originalRequest)
      } catch (refreshError) {
        console.error(refreshError)
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export default axiosInstance
