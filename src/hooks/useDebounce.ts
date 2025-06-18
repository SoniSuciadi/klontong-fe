import { ref } from 'vue'

export function useDebounce() {
  const timeoutId = ref<ReturnType<typeof setTimeout> | null>(null)

  const debounce = (callback: () => void, delay: number) => {
    if (timeoutId.value) {
      clearTimeout(timeoutId.value)
    }

    timeoutId.value = setTimeout(callback, delay)
  }

  return { debounce }
}
