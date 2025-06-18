<template>
  <v-container fluid>
    <!-- Search and Filter Component -->
    <SearchFilterField label="Search" icon="mdi-filter-outline" />

    <!-- Product List -->
    <v-row align="center" wrap>
      <v-col
        v-for="product in products.values()"
        :key="product.id"
        cols="6"
        sm="4"
        md="3"
        lg="2"
        class="my-4"
      >
        <ProductCard
          :image="product.image"
          :name="product.name"
          :price="product.price"
          :category="product.categoryName"
        />
      </v-col>
    </v-row>

    <!-- Infinite Scroll Spinner -->
    <div v-if="hasMore" ref="loadMore" class="text-center">
      <v-progress-circular v-if="loading" indeterminate color="primary" />
    </div>
  </v-container>
</template>

<script lang="ts">
import { ref, onMounted, watch } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import SearchFilterField from '../components/SearchFilterField.vue'
import { useProductStore } from '@/stores/useProductStore'

export default {
  name: 'App',
  components: {
    ProductCard,
    SearchFilterField,
  },
  setup() {
    const productStore = useProductStore()
    const { products, loading, fetchProducts, cursor, hasMore } = productStore

    const loadMoreRef = ref(null)

    onMounted(() => {
      fetchProducts()

      const observer = new IntersectionObserver(
        async (entries) => {
          const entry = entries[0]
          if (entry.isIntersecting && !loading && hasMore) {
            await fetchProducts(cursor || '')
          }
        },
        { threshold: 1.0 },
      )

      if (loadMoreRef.value) {
        observer.observe(loadMoreRef.value)
      }
    })

    watch(
      () => productStore.cursor,
      (newCursor) => {
        if (newCursor) {
          fetchProducts(newCursor)
        }
      },
    )

    return {
      products,
      loading,
      fetchProducts,
      cursor,
      hasMore,
      loadMoreRef,
    }
  },
}
</script>

<style scoped>
.pa-4 {
  padding: 16px !important;
}
</style>
