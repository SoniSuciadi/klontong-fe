import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  interface CartItem {
    id: string | number
    name: string
    price: number
    quantity: number
    image?: string
  }

  const total = computed(() => {
    return items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  })

  const itemCount = computed(() => {
    return items.value.length
  })

  const addItem = (product: CartItem) => {
    const existingIndex = items.value.findIndex((item) => item.id === product.id)

    if (existingIndex !== -1) {
      const newItems = [...items.value]
      newItems[existingIndex] = {
        ...newItems[existingIndex],
        quantity: newItems[existingIndex].quantity + 1,
      }
      items.value = newItems
    } else {
      items.value = [...items.value, { ...product }]
    }
  }

  const updateQuantity = (id: string | number, quantity: number) => {
    const existingIndex = items.value.findIndex((item) => item.id === id)
    if (existingIndex === -1) return

    if (quantity < 1) {
      removeItem(id)
      return
    }

    const newItems = [...items.value]
    newItems[existingIndex] = {
      ...newItems[existingIndex],
      quantity,
    }
    items.value = newItems
  }

  const removeItem = (id: string | number) => {
    items.value = items.value.filter((item) => item.id !== id)
  }

  const clearCart = () => {
    items.value = []
  }

  return {
    items,
    total,
    itemCount,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  }
})
