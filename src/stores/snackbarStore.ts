import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSnackbarStore = defineStore('snackbar', () => {
  const snackbarVisible = ref(false)
  const snackbarVariant = ref<'success' | 'error' | 'text'>('success')
  const snackbarText = ref('')

  const showSnackbar = (variant: 'success' | 'error' | 'text', text: string) => {
    snackbarVariant.value = variant
    snackbarText.value = text
    snackbarVisible.value = true

    setTimeout(() => {
      snackbarVisible.value = false
    }, 3000)
  }

  const hideSnackbar = () => {
    snackbarVisible.value = false
  }

  return {
    snackbarVisible,
    snackbarVariant,
    snackbarText,
    showSnackbar,
    hideSnackbar,
  }
})
