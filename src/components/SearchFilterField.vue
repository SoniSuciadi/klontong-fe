<template>
  <v-text-field
    class="mx-auto"
    hide-details="auto"
    :label="label"
    variant="outlined"
    v-model="searchQuery"
    @input="onSearchInput"
  >
    <template v-slot:append-inner>
      <v-icon-btn
        :opacity="dialogVisible ? 1 : 0.32"
        :icon="icon"
        @click.stop="openDialog"
        @mousedown.stop
      >
        <v-icon>{{ icon }}</v-icon>
      </v-icon-btn>
    </template>

    <FilterDialog ref="filterDialog" />
  </v-text-field>
</template>

<script lang="ts">
import FilterDialog from './FilterDialog.vue'

export default {
  name: 'SearchBar',
  components: {
    FilterDialog,
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: 'mdi-filter-outline',
    },
  },
  data() {
    return {
      dialogVisible: false,
      searchQuery: '',
      debounceTimeout: null,
    }
  },
  methods: {
    onSearchInput() {
      clearTimeout(this.debounceTimeout)

      this.debounceTimeout = setTimeout(() => {
        this.updateURL()
      }, 500)
    },

    updateURL() {
      this.$router.push({ query: { search: this.searchQuery } })
    },

    openDialog() {
      this.$refs.filterDialog.openDialog()
    },
  },
}
</script>

<style scoped></style>
