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

    <v-row>
      <v-col cols="12" md="5" class="d-flex justify-center">
        <v-img
          :src="product.image"
          alt="Product Image"
          aspect-ratio="1"
          contain
          class="rounded-xl shadow-2xl"
        ></v-img>
      </v-col>

      <v-col cols="12" md="7">
        <v-card class="elevation-4 rounded-xl">
          <v-card-title class="headline text-center">{{ product.name }}</v-card-title>
          <v-card-subtitle class="text-center text-muted">{{
            product.categoryName
          }}</v-card-subtitle>
          <v-divider class="my-4"></v-divider>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>SKU</v-list-item-title>
                    <v-list-item-subtitle>{{ product.sku }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Description</v-list-item-title>
                    <v-list-item-subtitle>{{ product.description }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>

              <v-col cols="12" sm="6">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Dimensions</v-list-item-title>
                    <v-list-item-subtitle
                      >{{ product.length }} x {{ product.width }} x
                      {{ product.height }} cm</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Weight</v-list-item-title>
                    <v-list-item-subtitle>{{ product.weight }} g</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Price</v-list-item-title>
                    <v-list-item-subtitle
                      >Rp {{ product.price.toLocaleString() }}</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
export default {
  data() {
    return {
      product: {
        id: 86,
        CategoryId: 14,
        categoryName: 'Snacks',
        sku: 'MHZVTK',
        name: 'Ciki ciki',
        description: 'Delicious Ciki ciki, only at our general store',
        weight: 500,
        width: 5,
        length: 5,
        height: 5,
        image: 'https://cf.shopee.co.id/file/7cb930d1bd183a435f4fb3e5cc4a896b',
        price: 30000,
      },
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    deleteProduct() {
      alert('Product Deleted')
    },
    updateProduct() {
      alert('Navigate to update page')
    },
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
