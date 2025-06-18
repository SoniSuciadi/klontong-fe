import axios, { type AxiosInstance } from 'axios'
import { useCookies } from 'vue3-cookies'
const baseURL = 'http://localhost:8080/api/v1'
const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

const { cookies } = useCookies()

const getRefreshToken = () => cookies.get('refreshToken')

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
    if (error.response.status === 401) {
      console.log('oi')
      originalRequest._retry = true

      try {
        const newAccessToken = await refreshAccessToken()

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`

        return axiosInstance(originalRequest)
      } catch (refreshError) {
        console.log(refreshError)
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export default axiosInstance
