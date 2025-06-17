<template>
  <v-container fluid>
    <SearchFilterField label="Search " icon="mdi-filter-outline" />

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
  </v-container>
</template>

<script lang="ts">
import ProductCard from '../components/ProductCard.vue'
import SearchFilterField from '../components/SearchFilterField.vue'

export default {
  name: 'App',
  components: {
    ProductCard,
    SearchFilterField,
  },
  data() {
    return {
      products: [
        {
          id: 86,
          categoryName: 'Snacks',
          name: 'Ciki ciki',
          image: 'https://cf.shopee.co.id/file/7cb930d1bd183a435f4fb3e5cc4a896b',
          price: 30000,
        },
        {
          id: 87,
          categoryName: 'Snacks',
          name: 'Oreo',
          image: 'https://cf.shopee.co.id/file/8cb930d1bd183a435f4fb3e5cc4a897b',
          price: 25000,
        },
        {
          id: 87,
          categoryName: 'Snacks',
          name: 'Oreo',
          image: 'https://cf.shopee.co.id/file/8cb930d1bd183a435f4fb3e5cc4a897b',
          price: 25000,
        },
        {
          id: 87,
          categoryName: 'Snacks',
          name: 'Oreo',
          image: 'https://cf.shopee.co.id/file/8cb930d1bd183a435f4fb3e5cc4a897b',
          price: 25000,
        },
        {
          id: 87,
          categoryName: 'Snacks',
          name: 'Oreo',
          image: 'https://cf.shopee.co.id/file/8cb930d1bd183a435f4fb3e5cc4a897b',
          price: 25000,
        },
        {
          id: 87,
          categoryName: 'Snacks',
          name: 'Oreo',
          image: 'https://cf.shopee.co.id/file/8cb930d1bd183a435f4fb3e5cc4a897b',
          price: 25000,
        },
        {
          id: 87,
          categoryName: 'Snacks',
          name: 'Oreo',
          image: 'https://cf.shopee.co.id/file/8cb930d1bd183a435f4fb3e5cc4a897b',
          price: 25000,
        },
        // Add more products as needed
      ],
    }
  },
}
</script>

<style scoped></style>
