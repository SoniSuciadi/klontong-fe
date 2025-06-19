import type { AxiosError, AxiosResponse } from 'axios'
import type { Data, Product, ProductDetail } from '../types'
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
        category,
      },
    })
    return response
  } catch (error) {
    throw error as AxiosError
  }
}

export const getProductDetail = async (id: string): Promise<AxiosResponse<Data<ProductDetail>>> => {
  try {
    const response = await axiosInstance.get(`/product/detail/${id}`)
    return response
  } catch (error) {
    throw error as AxiosError
  }
}
export const createProduct = async (formData: FormData) => {
  try {
    return await axiosInstance.post('/product', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  } catch (error) {
    throw error
  }
}
export const updateProduct = async (formData: FormData, id: string) => {
  try {
    return await axiosInstance.patch(`/product/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  } catch (error) {
    throw error
  }
}

export const deleteProduct = async (id: string) => {
  console.log('👻 ~ deleteProduct ~ id:', id)
  try {
    return await axiosInstance.delete(`/product/${id}`)
  } catch (error) {
    throw error
  }
}
