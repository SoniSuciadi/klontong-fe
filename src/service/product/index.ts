import type { AxiosError, AxiosResponse } from 'axios'
import type { Data, Product } from '../types'
import axiosInstance from '../api'

export const getCategories = async (): Promise<AxiosResponse<Data<string[]>>> => {
  try {
    return await axiosInstance.get('/product/categories')
  } catch (error) {
    throw error as AxiosError
  }
}
export const getProductList = async (
  cursor?: string,
  limit: number = 10,
  search?: string,
  category?: string,
): Promise<AxiosResponse<Data<Product[]>>> => {
  try {
    const response = await axiosInstance.get('/product', {
      params: {
        cursor,
        limit,
        search,
        filter: category,
      },
    })
    return response
  } catch (error) {
    throw error as AxiosError
  }
}
