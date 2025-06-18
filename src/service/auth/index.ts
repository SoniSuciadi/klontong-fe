import { type AxiosResponse, type AxiosError } from 'axios'
import axiosInstance from '../api'
import type { LoginPayload, LoginResponse, RegisterPayload, RegisterResponse } from './types'
import type { Data } from '../types'

export const userLogin = async (
  data: LoginPayload,
): Promise<AxiosResponse<Data<LoginResponse>>> => {
  try {
    return await axiosInstance.post('/auth/login', data)
  } catch (error) {
    throw error as AxiosError
  }
}

export const userRegister = async (
  data: RegisterPayload,
): Promise<AxiosResponse<Data<RegisterResponse>>> => {
  try {
    return await axiosInstance.post('/auth/register', data)
  } catch (error) {
    throw error as AxiosError
  }
}
