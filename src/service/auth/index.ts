import { type AxiosResponse, type AxiosError } from 'axios'
import axiosInstance from '../api'
import type { LoginPayload, LoginResponse, RegisterPayload, RegisterResponse } from './types'
import type { Data } from '../types'

export const userLogin = async (
  data: LoginPayload,
): Promise<AxiosResponse<Data<LoginResponse>>> => {
  try {
    const response = await axiosInstance.post('/auth/login', data)
    axiosInstance.defaults.headers.common['Authorization'] =
      `Bearer ${response.data.data.accessToken}`

    return response
  } catch (error) {
    throw error as AxiosError
  }
}

export const userRegister = async (
  data: RegisterPayload,
): Promise<AxiosResponse<Data<RegisterResponse>>> => {
  try {
    return axiosInstance.post('/auth/register', data)
  } catch (error) {
    throw error as AxiosError
  }
}

export const refreshToken = async (): Promise<AxiosResponse<Data<{ accessToken: string }>>> => {
  try {
    return await axiosInstance.post('/auth/refresh', {}, { withCredentials: true })
  } catch (error) {
    throw error as AxiosError
  }
}
