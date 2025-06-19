<template>
  <v-dialog v-model="dialog" min-width="400" max-width="600">
    <v-card title="Filter Products">
      <v-autocomplete
        clearable
        chips
        label="Select Categories"
        :items="categoriesStore.categories"
        multiple
        variant="outlined"
        v-model="selectedFilters"
        class="pa-4"
        :loading="categoriesStore.loading"
        item-title="name"
        item-value="id"
      />

      <template v-slot:actions>
        <v-btn text="Cancel" variant="plain" @click="closeDialog"></v-btn>
        <v-btn
          text="Apply Filter"
          color="primary"
          @click="applyFilter"
          :loading="productStore.loading"
        ></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { useCategoryStore } from '@/stores/categoryStore'
import { useProductStore } from '@/stores/productStore'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FilterDialog',
  data() {
    return {
      dialog: false,
      selectedFilters: [] as string[],
    }
  },
  computed: {
    categoriesStore() {
      return useCategoryStore()
    },
    productStore() {
      return useProductStore()
    },
  },
  methods: {
    openDialog() {
      this.selectedFilters = this.productStore.categoryFilter.split(',').filter((el) => !!el)
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
    },

    async applyFilter() {
      this.productStore.setCategoryFilter(this.selectedFilters.join(','))
      await this.productStore.fetchProducts(true)
      this.closeDialog()
    },
  },
  async mounted() {
    await this.categoriesStore.fetchCategories()
  },
})
</script>

<style scoped>
.pa-4 {
  padding: 16px !important;
}
</style>
