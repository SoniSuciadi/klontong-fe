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
      />

      <template v-slot:actions>
        <v-btn text="Cancel" variant="plain" @click="closeDialog"></v-btn>
        <v-btn text="Apply Filter" @click="applyFilter"></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { useCategoryStore } from '@/stores/productStore'

export default {
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
  },
  methods: {
    openDialog() {
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
    },
    async applyFilter() {
      const filterQuery = this.selectedFilters.join(',')
      this.$router.push({ query: { ...this.$route.query, filter: filterQuery } })

      console.log('Applied Filters:', this.selectedFilters)
      this.closeDialog()
    },
  },
  async mounted() {
    await this.categoriesStore.fetchCategories()
  },
}
</script>

<style scoped>
.pa-4 {
  padding: 16px !important;
}
</style>
