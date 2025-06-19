<template>
  <div class="fab-container">
    <v-badge v-if="itemCount > 0" :content="itemCount" color="red" floating bordered
      ><v-btn
        color="primary"
        icon="mdi-cart"
        size="x-large"
        elevation="8"
        class="fab"
        @click="cartOpen = !cartOpen"
      >
      </v-btn
    ></v-badge>

    <v-menu
      v-model="cartOpen"
      location="top"
      :close-on-content-click="false"
      :close-on-click="false"
      transition="slide-y-transition"
    >
      <template v-slot:activator="{ props }">
        <div class="activator" v-bind="props"></div>
      </template>

      <v-card min-width="400" class="cart-card">
        <v-toolbar color="primary" density="compact" class="cart-header">
          <v-toolbar-title class="d-flex align-center">
            <v-icon icon="mdi-cart" class="mr-2"></v-icon>
            <span class="font-weight-bold">Keranjang</span>
          </v-toolbar-title>
          <v-btn icon="mdi-close" variant="text" @click="cartOpen = false"></v-btn>
        </v-toolbar>

        <v-divider></v-divider>

        <v-list v-if="items.length > 0" class="py-0">
          <v-list-item v-for="item in items" :key="item.id" class="cart-item py-3">
            <template v-slot:prepend>
              <v-avatar rounded="lg" size="60">
                <v-img :src="item.image || 'https://via.placeholder.com/100'" cover></v-img>
              </v-avatar>
            </template>

            <div class="d-flex flex-column ml-3" style="flex: 1">
              <v-list-item-title class="font-weight-bold text-wrap">
                {{ item.name }}
              </v-list-item-title>

              <div class="d-flex align-center mt-2">
                <v-text-field
                  type="number"
                  min="1"
                  :model-value="item.quantity"
                  @update:modelValue="updateQuantity(item.id, +$event)"
                  density="compact"
                  variant="outlined"
                  hide-details
                  style="max-width: 80px"
                  class="quantity-input"
                ></v-text-field>

                <div class="d-flex flex-column ml-3">
                  <span class="text-caption text-grey">Harga Satuan</span>
                  <span>{{ formatCurrency(item.price) }}</span>
                </div>

                <div class="d-flex flex-column ml-4">
                  <span class="text-caption text-grey">Subtotal</span>
                  <span class="font-weight-bold">
                    {{ formatCurrency(item.price * item.quantity) }}
                  </span>
                </div>
              </div>
            </div>

            <template v-slot:append>
              <v-btn
                icon="mdi-delete-outline"
                variant="text"
                color="error"
                @click="removeItem(item.id)"
                class="ml-2"
              ></v-btn>
            </template>
          </v-list-item>
        </v-list>

        <v-card-text v-else class="text-center py-8 d-flex flex-column align-center">
          <v-icon icon="mdi-cart-off" size="60" color="grey-lighten-1"></v-icon>
          <p class="mt-4 text-grey">Keranjang belanja kosong</p>
        </v-card-text>

        <v-divider />

        <v-card-actions v-if="items.length > 0" class="pa-4">
          <div class="d-flex justify-space-between align-center w-100">
            <div class="d-flex flex-column">
              <span class="text-caption text-grey">Total Belanja</span>
              <span class="text-h6 font-weight-bold text-primary">
                {{ formatCurrency(total) }}
              </span>
            </div>
            <v-btn color="primary" @click="checkout" size="large" prepend-icon="mdi-check">
              Checkout
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cartStore'
import { formatCurrency } from '@/utils/rupiahFormat'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const cartStore = useCartStore()
const { items, total, itemCount } = storeToRefs(cartStore)
const { removeItem, updateQuantity, clearCart } = cartStore

const cartOpen = ref(false)

const checkout = () => {
  clearCart()
  cartOpen.value = false
}
</script>

<style scoped>
.fab-container {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 999;
}

.activator {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 56px;
  height: 56px;
  pointer-events: none;
}

.cart-card {
  border-radius: 12px !important;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.cart-header {
  background: linear-gradient(135deg, #1976d2, #0d47a1);
}

.cart-item {
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  transition: background-color 0.3s;
}

.cart-item:hover {
  background-color: #f5f9ff;
}

.quantity-input :deep(input) {
  text-align: center;
  font-weight: bold;
}

.v-list-item__append {
  align-self: center;
}
</style>
