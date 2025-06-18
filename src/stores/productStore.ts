import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getProductList } from '@/service/product'
import type { Product } from '@/service/types'

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([])
  const loading = ref<boolean>(false)
  const cursor = ref<string | null>(null)
  const hasMore = ref<boolean>(true)

  const fetchProducts = async (cursorParam: string | null = null) => {
    if (loading.value) return

    loading.value = true

    try {
      const response = await getProductList(cursorParam || '')
      const newProducts = response.data.data

      if (cursorParam === null) {
        products.value = newProducts
      } else {
        products.value = [...products.value, ...newProducts]
      }

      if (newProducts.length > 0) {
        cursor.value = newProducts[newProducts.length - 1].id
        hasMore.value = true
      } else {
        hasMore.value = false
      }
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    loading,
    fetchProducts,
    cursor,
    hasMore,
  }
})
