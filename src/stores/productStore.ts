import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getProductList, getProductDetail } from '@/service/product'
import type { Product, ProductDetail } from '@/service/types'

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([])
  const productDetail = ref<ProductDetail | null>(null)
  const loading = ref<boolean>(false)
  const cursor = ref<string | null>(null)
  const hasMore = ref<boolean>(true)

  const searchQuery = ref<string>('')
  const categoryFilter = ref<string>('')

  const fetchProducts = async (reset: boolean = false) => {
    if (loading.value) return

    loading.value = true

    try {
      const response = await getProductList(
        reset ? '' : cursor.value?.toString(),
        10,
        searchQuery.value,
        categoryFilter.value,
      )

      const newProducts = response.data.data

      if (reset || !cursor.value) {
        products.value = newProducts
      } else {
        products.value = [...products.value, ...newProducts]
      }

      cursor.value = newProducts.length > 0 ? newProducts[newProducts.length - 1].id : null
      hasMore.value = newProducts.length > 0
    } finally {
      loading.value = false
    }
  }

  const setSearchQuery = (query: string) => {
    searchQuery.value = query
    fetchProducts(true)
  }

  const setCategoryFilter = (category: string) => {
    categoryFilter.value = category
    fetchProducts(true)
  }

  const fetchProductDetail = async (id: string) => {
    loading.value = true
    try {
      const response = await getProductDetail(id)
      productDetail.value = response.data.data
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    productDetail,
    loading,
    setSearchQuery,
    setCategoryFilter,
    fetchProducts,
    fetchProductDetail,
    cursor,
    hasMore,
    searchQuery,
    categoryFilter,
  }
})
