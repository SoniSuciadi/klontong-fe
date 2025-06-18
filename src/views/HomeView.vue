<template>
  <v-container fluid>
    <SearchFilterField label="Search" icon="mdi-filter-outline" />

    <v-row align="center" wrap>
      <v-col
        v-for="product in products"
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

    <div v-if="showLoader" ref="loadMoreRef" class="text-center">
      <v-progress-circular v-if="loading" indeterminate color="primary" size="50" />
      <div v-else style="height: 50px"></div>
    </div>
  </v-container>
</template>

<script lang="ts">
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import ProductCard from '../components/ProductCard.vue'
import SearchFilterField from '../components/SearchFilterField.vue'
import { useProductStore } from '@/stores/productStore'

export default {
  name: 'ProductList',
  components: {
    ProductCard,
    SearchFilterField,
  },
  setup() {
    const debug = ref(import.meta.env.MODE === 'development')
    const productStore = useProductStore()
    const { fetchProducts } = productStore
    const { products, loading, cursor, hasMore } = storeToRefs(productStore)

    const loadMoreRef = ref<HTMLElement | null>(null)
    let observer: IntersectionObserver | null = null

    const showLoader = computed(() => hasMore.value)

    const handleIntersection = async (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0]
      console.log('Intersection event:', {
        isIntersecting: entry.isIntersecting,
        loading: loading.value,
        hasMore: hasMore.value,
        cursor: cursor.value,
      })

      if (entry.isIntersecting && !loading.value && hasMore.value) {
        console.log('Fetching more products...')
        await fetchProducts(cursor.value || '')
      }
    }

    onMounted(async () => {
      if (products.value.length === 0) {
        await fetchProducts()
      }

      await nextTick()

      observer = new IntersectionObserver(handleIntersection, {
        root: null,
        rootMargin: '200px',
        threshold: 0.01,
      })

      if (loadMoreRef.value) {
        observer.observe(loadMoreRef.value)
        console.log('Observer started on:', loadMoreRef.value)
      } else {
        console.error('Failed to initialize observer - loadMoreRef is null')
      }

      window.addEventListener('scroll', handleScrollFallback)
    })

    onUnmounted(() => {
      if (observer) {
        observer.disconnect()
      }
      window.removeEventListener('scroll', handleScrollFallback)
    })

    const handleScrollFallback = () => {
      if (!loadMoreRef.value || loading.value || !hasMore.value) return

      const rect = loadMoreRef.value.getBoundingClientRect()
      const triggerPoint = window.innerHeight + 300

      if (rect.top <= triggerPoint) {
        console.log('Scroll fallback triggered')
        fetchProducts(cursor.value || '')
      }
    }

    return {
      products,
      loading,
      cursor,
      hasMore,
      loadMoreRef,
      debug,
      showLoader,
    }
  },
}
</script>
