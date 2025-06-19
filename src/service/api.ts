import axios, { type AxiosInstance } from 'axios'
import { useCookies } from 'vue3-cookies'

const baseURL = import.meta.env.VITE_API_BASE_URL

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

const { cookies } = useCookies()

const getRefreshToken = () => cookies.get('refreshToken')

let refreshing: Promise<string> | undefined = undefined

const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken()
  if (!refreshToken) {
    throw new Error('No refresh token available in cookie')
  }

  try {
    const response = await axios.get(`${baseURL}/auth/refresh`, { withCredentials: true })
    const result = response.data
    return result.data.accessToken
  } catch (error) {
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
