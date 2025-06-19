<template>
  <v-container fluid>
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

    <v-row v-if="loading">
      <v-col cols="12" class="text-center">
        <v-progress-circular indeterminate color="primary" size="50" />
        <p class="mt-4 text-body-1">Loading product details...</p>
      </v-col>
    </v-row>

    <v-row v-else-if="productDetail">
      <v-col cols="12" md="5" class="d-flex justify-center">
        <v-img
          :src="productDetail.image"
          :alt="productDetail.name"
          aspect-ratio="1"
          contain
          class="rounded-xl shadow-2xl"
          max-height="400"
          transition="scale-transition"
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
                    <v-list-item-title class="font-weight-bold">SKU</v-list-item-title>
                    <v-list-item-subtitle class="text-body-1">{{
                      productDetail.sku || 'N/A'
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="font-weight-bold">Description</v-list-item-title>
                    <v-list-item-subtitle class="text-body-1">{{
                      productDetail.description || 'No description available'
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>

              <v-col cols="12" sm="6">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="font-weight-bold">Dimensions</v-list-item-title>
                    <v-list-item-subtitle class="text-body-1">
                      {{ productDetail.length || 0 }} x {{ productDetail.width || 0 }} x
                      {{ productDetail.height || 0 }} cm
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="font-weight-bold">Weight</v-list-item-title>
                    <v-list-item-subtitle class="text-body-1"
                      >{{ productDetail.weight || 0 }} g</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="font-weight-bold">Price</v-list-item-title>
                    <v-list-item-subtitle class="text-body-1">{{
                      formattedPrice
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col cols="12" class="text-center">
        <v-alert type="error" class="mx-auto" max-width="600">
          Failed to load product details. Please try again later.
          <div class="mt-3">
            <v-btn color="error" @click="retryLoading">Retry</v-btn>
          </div>
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '@/stores/productStore'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'ProductDetail',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const productStore = useProductStore()

    const { productDetail, loading } = storeToRefs(productStore)
    const productId = ref<string>(route.params.id as string)

    onMounted(() => {
      productStore.fetchProductDetail(productId.value)
    })

    const goBack = () => {
      router.push('/')
    }

    const deleteProduct = async () => {
      if (confirm('Are you sure you want to delete this product?')) {
        await productStore.delProduct(productId.value)
        productStore.fetchProducts(true)
        router.push('/')
      }
    }

    const updateProduct = () => {
      router.push(`/product/${productId.value}`)
    }

    const retryLoading = () => {
      productStore.fetchProductDetail(productId.value)
    }

    const formattedPrice = computed(() => {
      if (!productDetail.value) return ''
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      }).format(productDetail.value.price || 0)
    })

    return {
      productDetail: productDetail,
      loading,
      goBack,
      deleteProduct,
      updateProduct,
      formattedPrice,
      retryLoading,
    }
  },
})
</script>

<style scoped>
.v-img {
  max-width: 100%;
  border-radius: 20px;
  transition: transform 0.3s ease;
}

.v-img:hover {
  transform: scale(1.03);
}

.v-card {
  padding: 16px;
  border-radius: 12px;
}

.v-divider {
  margin-top: 10px;
  margin-bottom: 10px;
}

.headline {
  font-weight: 700;
  font-size: 1.8rem;
  letter-spacing: -0.5px;
}

.text-muted {
  color: #6c757d;
}

.v-list-item {
  padding: 12px 0;
}

.v-list-item-title {
  font-size: 1.1rem;
}

.v-list-item-subtitle {
  font-size: 1rem;
  color: #495057;
}
</style>
