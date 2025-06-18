<template>
  <v-snackbar v-model="snackbarVisible" :color="variantColor" :timeout="3000">
    {{ snackbarText }}
  </v-snackbar>
</template>

<script lang="ts">
import { computed } from 'vue'
import { useSnackbarStore } from '@/stores/snackbarStore'

export default {
  name: 'SnackbarToast',

  setup() {
    const snackbarStore = useSnackbarStore()

    const snackbarVisible = computed(() => snackbarStore.snackbarVisible)
    const snackbarText = computed(() => snackbarStore.snackbarText)
    const snackbarVariant = computed(() => snackbarStore.snackbarVariant)

    const variantColor = computed(() => {
      switch (snackbarVariant.value) {
        case 'success':
          return 'green'
        case 'error':
          return 'red'

        default:
          return 'white'
      }
    })

    const hideSnackbar = () => {
      snackbarStore.hideSnackbar()
    }

    return {
      snackbarVisible,
      snackbarText,
      variantColor,
      hideSnackbar,
    }
  },
}
</script>
