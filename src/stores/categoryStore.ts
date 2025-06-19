import { getCategories } from '@/service/product'
import type { Data } from '@/service/types'
import type { AxiosError, AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useSnackbarStore } from './snackbarStore'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref<string[]>([])
  const loading = ref<boolean>(false)
  const error = ref<AxiosError | null>(null)
  const { showSnackbar } = useSnackbarStore()
  const fetchCategories = async () => {
    loading.value = true
    error.value = null
    try {
      const response: AxiosResponse<Data<string[]>> = await getCategories()
      categories.value = response.data.data
    } catch (err) {
      showSnackbar('error', 'Failed to get categories')
      error.value = err as AxiosError
    } finally {
      loading.value = false
    }
  }

  return {
    categories,
    loading,
    error,
    fetchCategories,
  }
})
