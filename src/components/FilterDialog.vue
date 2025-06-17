<template>
  <v-dialog v-model="dialog" min-width="400" max-width="600">
    <v-card title="Filter Products">
      <v-autocomplete
        clearable
        chips
        label="Autocomplete"
        :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
        multiple
        variant="outlined"
        v-model="selectedFilters"
        class="pa-4"
      />

      <template v-slot:actions>
        <v-btn text="Cancel" variant="plain" @click="closeDialog"></v-btn>
        <v-btn text="Apply Filter" @click="applyFilter"></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
export default {
  name: 'FilterDialog',
  data() {
    return {
      dialog: false,
      selectedFilters: [] as string[],
    }
  },
  methods: {
    openDialog() {
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
    },
    applyFilter() {
      const filterQuery = this.selectedFilters.join(',')
      this.$router.push({ query: { filter: filterQuery } })
      this.closeDialog()
    },
  },
}
</script>

<style scoped>
.pa-4 {
  padding: 16px !important;
}
</style>
