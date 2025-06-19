<template>
  <v-card @click="navigateDetail">
    <v-img :src="image" height="200px" cover></v-img>
    <v-card-title>{{ name }}</v-card-title>
    <v-card-subtitle>{{ formatCurrency(price) }}</v-card-subtitle>

    <v-card-actions>
      <template v-if="cartItem">
        <v-btn
          icon="mdi-minus"
          variant="text"
          color="primary"
          :disabled="cartItem.quantity <= 1"
          @click.stop="decreaseQuantity"
        ></v-btn>

        <span class="mx-2">{{ cartItem.quantity }}</span>

        <v-btn icon="mdi-plus" variant="text" color="primary" @click.stop="addToCart"></v-btn>
      </template>

      <v-btn v-else color="primary" @click="addToCart">
        <v-icon>mdi-cart-plus</v-icon>
        Tambah ke Keranjang
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import router from '@/router'
import { useCartStore } from '@/stores/cartStore'
import { formatCurrency } from '@/utils/rupiahFormat'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const props = defineProps({
  id: { type: [String, Number], required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, default: 'https://via.placeholder.com/50' },
})

const cartStore = useCartStore()
const { items } = storeToRefs(cartStore)
const { updateQuantity, addItem } = cartStore

const cartItem = computed(() => {
  return items.value.find((item) => item.id === props.id)
})

const addToCart = () => {
  addItem({
    id: props.id,
    name: props.name,
    price: props.price,
    image: props.image,
    quantity: 1,
  })
}

const navigateDetail = () => {
  router.push(`/detail/${props.id}`)
}
const decreaseQuantity = () => {
  if (cartItem.value) {
    updateQuantity(props.id, cartItem.value.quantity - 1)
  }
}
</script>

<style scoped>
.v-card-actions {
  justify-content: center;
  padding: 16px;
}
</style>
