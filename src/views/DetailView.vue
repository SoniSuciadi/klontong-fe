<template>
  <v-container fluid>
    <!-- Header with product name, delete and update buttons -->
    <v-row justify="space-between" align="center" class="mb-4">
      <v-col>
        <v-btn text @click="goBack">
          <v-icon left>mdi-arrow-left</v-icon>
          Back
        </v-btn>
      </v-col>
      <v-col class="text-right">
        <v-btn color="red" @click="deleteProduct" icon>
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-btn color="primary" @click="updateProduct" icon>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <!-- Product Details Section -->
    <v-row v-if="productDetail && !loading">
      <v-col cols="12" md="5" class="d-flex justify-center">
        <v-img
          :src="productDetail.image"
          alt="Product Image"
          aspect-ratio="1"
          contain
          class="rounded-xl shadow-2xl"
        ></v-img>
      </v-col>

      <v-col cols="12" md="7">
        <v-card class="elevation-4 rounded-xl">
          <v-card-title class="headline text-center">{{ productDetail.name }}</v-card-title>
          <v-card-subtitle class="text-center text-muted">{{
            productDetail.categoryName
          }}</v-card-subtitle>
          <v-divider class="my-4"></v-divider>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>SKU</v-list-item-title>
                    <v-list-item-subtitle>{{ productDetail.sku }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Description</v-list-item-title>
                    <v-list-item-subtitle>{{ productDetail.description }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>

              <v-col cols="12" sm="6">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Dimensions</v-list-item-title>
                    <v-list-item-subtitle>
                      {{ productDetail.length }} x {{ productDetail.width }} x
                      {{ productDetail.height }} cm
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Weight</v-list-item-title>
                    <v-list-item-subtitle>{{ productDetail.weight }} g</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Price</v-list-item-title>
                    <v-list-item-subtitle>{{ formattedPrice }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Loading Spinner -->
    <v-row v-else-if="loading">
      <v-col cols="12" class="text-center">
        <v-progress-circular indeterminate color="primary" size="50" />
      </v-col>
    </v-row>

    <!-- Error Message -->
    <v-row v-else>
      <v-col cols="12" class="text-center">
        <v-alert type="error">Failed to load product details. Please try again later.</v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { useRoute } from 'vue-router'
import { computed, onMounted } from 'vue'
import { useProductStore } from '@/stores/productStore'
import { storeToRefs } from 'pinia'

export default {
  name: 'ProductDetail',
  setup() {
    const route = useRoute()
    const productStore = useProductStore()

    const { productDetail, loading } = storeToRefs(productStore)

    const productId = route.params.id as string

    onMounted(() => {
      productStore.fetchProductDetail(productId)
    })

    const goBack = () => {
      window.history.back()
    }

    const deleteProduct = () => {
      alert('Product Deleted')
    }

    const updateProduct = () => {
      alert('Navigate to update page')
    }

    const formattedPrice = computed(() => {
      return productDetail
        ? new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
          }).format(productDetail.value?.price || 0)
        : ''
    })

    return {
      productDetail,
      loading,
      goBack,
      deleteProduct,
      updateProduct,
      formattedPrice,
    }
  },
}
</script>

<style scoped>
.v-img {
  max-width: 100%;
  border-radius: 20px;
}
.v-card {
  padding: 16px;
}
.v-divider {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
