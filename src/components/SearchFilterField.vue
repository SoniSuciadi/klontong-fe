<template>
  <v-text-field
    class="mx-auto"
    hide-details="auto"
    :label="label"
    variant="outlined"
    :model-value="searchQuery"
    @update:model-value="onSearchInput"
    @keydown.enter="triggerSearchImmediately"
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

    <FilterDialog ref="filterDialog" @filter="handleFilter" />
  </v-text-field>
</template>

<script lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductStore } from '@/stores/productStore'
import { useDebounce } from '@/hooks/useDebounce'
import FilterDialog from './FilterDialog.vue'

export default {
  name: 'SearchFilterField',
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
  emits: ['filter'],
  setup(props, { emit }) {
    const productStore = useProductStore()
    const { searchQuery } = storeToRefs(productStore)

    const { setSearchQuery, fetchProducts } = productStore
    const { debounce } = useDebounce()
    const dialogVisible = ref(false)

    const triggerSearch = (value: string) => {
      setSearchQuery(value)
      fetchProducts(true)
    }

    const onSearchInput = (value: string) => {
      debounce(() => triggerSearch(value), 500)
    }

    const triggerSearchImmediately = (event: Event) => {
      const value = (event.target as HTMLInputElement).value
      triggerSearch(value)
    }

    const handleFilter = (category: string) => {
      emit('filter', category)
    }

    return {
      searchQuery,
      onSearchInput,
      triggerSearchImmediately,
      handleFilter,
      dialogVisible,
    }
  },
  methods: {
    openDialog() {
      const filterDialog = this.$refs.filterDialog as InstanceType<typeof FilterDialog>
      filterDialog.openDialog()
    },
  },
}
</script>
