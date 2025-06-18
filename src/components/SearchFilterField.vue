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
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useDebounce } from '@/hooks/useDebounce'
import FilterDialog from './FilterDialog.vue'

export default {
  data: function () {
    return {
      dialogVisible: false,
    }
  },
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
  setup() {
    const searchQuery = ref('')

    const { debounce } = useDebounce()

    const router = useRouter()

    const updateURL = () => {
      router.push({ query: { search: searchQuery.value } })
    }

    const onSearchInput = () => {
      debounce(updateURL, 500)
    }

    return {
      searchQuery,
      onSearchInput,
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

<style scoped></style>
