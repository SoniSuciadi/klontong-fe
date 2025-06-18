import { getProductList } from '@/service/product'
import type { Data } from '@/service/types'
import type { Product } from '@/service/types'
import type { AxiosError, AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([])
  const loading = ref<boolean>(false)
  const error = ref<AxiosError | null>(null)
  const cursor = ref<string | null>(null)
  const hasMore = ref<boolean>(true)
  const route = useRoute()

  const fetchProducts = async (cursorParam?: string) => {
    loading.value = true
    error.value = null

    const search = route.query.search?.toString() || ''
    const category = route.query.category?.toString() || ''

    try {
      const response: AxiosResponse<Data<Product[]>> = await getProductList(
        cursorParam,
        10,
        search,
        category,
      )
      const newProducts = response.data.data

      if (cursorParam) {
        products.value = [...products.value, ...newProducts]
      } else {
        products.value = newProducts
      }

      cursor.value = newProducts.length > 0 ? newProducts[newProducts.length - 1].id : null
      hasMore.value = !!cursor.value
    } catch (err) {
      error.value = err as AxiosError
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    loading,
    error,
    fetchProducts,
    cursor,
    hasMore,
  }
})
