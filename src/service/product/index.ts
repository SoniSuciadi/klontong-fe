import type { AxiosError, AxiosResponse } from 'axios'
import type { Data } from '../types'
import axiosInstance from '../api'

export const getCategories = async (): Promise<AxiosResponse<Data<string[]>>> => {
  try {
    return await axiosInstance.get('/product/categories')
  } catch (error) {
    throw error as AxiosError
  }
}
