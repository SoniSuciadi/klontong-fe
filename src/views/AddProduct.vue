<template>
  <div class="add-product-page">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8" lg="6">
          <v-card class="elevation-6">
            <v-card-title class="headline text-primary">Add New Product</v-card-title>
            <v-card-subtitle>Please fill out the details of the product</v-card-subtitle>

            <v-form v-model="valid" ref="form" @submit.prevent="submitForm">
              <v-card-text>
                <v-text-field
                  v-model="product.name"
                  label="Product Name"
                  :rules="[rules.required]"
                  required
                  variant="outlined"
                  class="mb-4"
                  prepend-inner-icon="mdi-tag"
                  clearable
                />
                <v-autocomplete
                  clearable
                  chips
                  label="Category"
                  :items="categoriesStore.categories"
                  variant="outlined"
                  v-model="product.category"
                  :loading="categoriesStore.loading"
                  item-title="name"
                  item-value="id"
                  class="mb-4"
                />
                <v-textarea
                  v-model="product.description"
                  label="Description"
                  :rules="[rules.required]"
                  required
                  variant="outlined"
                  class="mb-4"
                  prepend-inner-icon="mdi-text"
                  rows="3"
                  auto-grow
                />

                <v-row class="mb-4">
                  <v-col cols="6">
                    <v-text-field
                      v-model="product.weight"
                      label="Weight (kg)"
                      type="number"
                      :rules="[rules.required, rules.number]"
                      required
                      variant="outlined"
                      prepend-inner-icon="mdi-weight-kilogram"
                    />
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="product.price"
                      label="Price ($)"
                      type="number"
                      :rules="[rules.required, rules.number]"
                      required
                      variant="outlined"
                      prepend-inner-icon="mdi-currency-usd"
                    />
                  </v-col>
                </v-row>

                <v-row class="mb-4">
                  <v-col cols="6">
                    <v-text-field
                      v-model="product.width"
                      label="Width (cm)"
                      type="number"
                      :rules="[rules.required, rules.number]"
                      required
                      variant="outlined"
                      prepend-inner-icon="mdi-arrow-left-right"
                    />
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="product.length"
                      label="Length (cm)"
                      type="number"
                      :rules="[rules.required, rules.number]"
                      required
                      variant="outlined"
                      prepend-inner-icon="mdi-arrow-expand-horizontal"
                    />
                  </v-col>
                </v-row>

                <v-text-field
                  v-model="product.height"
                  label="Height (cm)"
                  type="number"
                  :rules="[rules.required, rules.number]"
                  required
                  variant="outlined"
                  class="mb-4"
                  prepend-inner-icon="mdi-arrow-up-down"
                />

                <!-- Image Upload -->
                <div class="mb-6">
                  <div class="d-flex justify-space-between align-center mb-2">
                    <v-label class="text-caption">Product Image</v-label>
                    <v-btn
                      v-if="previewImage"
                      size="small"
                      variant="text"
                      color="error"
                      @click="removeImage"
                    >
                      Remove Image
                    </v-btn>
                  </div>

                  <v-file-input
                    v-model="product.image"
                    accept="image/*"
                    :rules="[rules.required, rules.image]"
                    prepend-icon=""
                    prepend-inner-icon="mdi-camera"
                    variant="outlined"
                    show-size
                    :clearable="false"
                    @change="handleFileChange"
                    ref="fileInput"
                  >
                    <template v-slot:selection="{ fileNames }">
                      <div class="text-truncate">
                        {{ fileNames[0] }}
                      </div>
                    </template>
                  </v-file-input>

                  <div class="d-flex justify-center mt-4" v-if="previewImage">
                    <v-img
                      :src="previewImage"
                      max-height="200"
                      max-width="300"
                      contain
                      class="elevation-2 rounded-lg"
                    />
                  </div>
                  <div v-else class="text-center grey lighten-4 py-8 rounded-lg">
                    <v-icon size="64" color="grey">mdi-image</v-icon>
                    <p class="text-grey">No image selected</p>
                  </div>
                </div>
              </v-card-text>

              <v-card-actions class="px-4 pb-4">
                <v-btn variant="outlined" color="grey-darken-2" @click="cancel" class="mr-2">
                  Cancel
                </v-btn>
                <v-spacer />
                <v-btn :disabled="!valid" color="primary" type="submit" :loading="loading">
                  Submit Product
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script lang="ts">
import { useCategoryStore } from '@/stores/categoryStore'
import { useProductStore } from '@/stores/productStore'
import { defineComponent } from 'vue'
import type { VForm } from 'vuetify/components'

export default defineComponent({
  name: 'AddProductPage',

  data() {
    return {
      valid: false,
      loading: false,
      previewImage: null as string | null,
      product: {
        name: '',
        description: '',
        weight: null,
        width: null,
        length: null,
        height: null,
        image: null,
        price: null,
        category: null,
      },
      rules: {
        required: (value: unknown) => !!value || 'This field is required',
        number: (value: string | number) =>
          (value && !isNaN(Number(value))) || 'Must be a valid number',
        image: (value: File | null) => {
          if (!value) return 'Image is required'
          const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
          if (!validTypes.includes(value.type)) {
            return 'Only images (JPG, PNG, GIF, WEBP) are allowed'
          }
          if (value.size > 5 * 1024 * 1024) {
            return 'Image size must be less than 5MB'
          }
          return true
        },
      },
    }
  },
  methods: {
    cancel() {
      this.$router.push('/products')
    },

    submitForm() {
      const { submitProduct } = useProductStore()
      submitProduct(this.product)
    },

    handleFileChange(event: Event) {
      const input = event.target as HTMLInputElement
      if (!input.files || input.files.length === 0) {
        this.previewImage = null
        this.product.image = null
        return
      }

      const file = input.files[0]
      this.product.image = file

      const reader = new FileReader()
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (typeof e.target?.result == 'string') {
          this.previewImage = e.target?.result
        }
      }
      reader.readAsDataURL(file)
    },

    removeImage() {
      this.product.image = null
      this.previewImage = null
      const fileInput = this.$refs.fileInput
      if (fileInput) {
        fileInput.reset()
      }
    },
    resetForm() {
      const form = this.$refs.form as VForm
      form?.reset()
      this.product = {
        name: '',
        description: '',
        weight: null,
        width: null,
        length: null,
        height: null,
        image: null,
        price: null,
      }
      this.previewImage = null
    },
  },
  async mounted() {
    await this.categoriesStore.fetchCategories()
  },
  computed: {
    categoriesStore() {
      return useCategoryStore()
    },
  },
})
</script>

<style scoped>
.add-product-page {
  padding: 32px 0;
  background-color: #f5f7fa;
}

.headline {
  font-weight: 700;
  letter-spacing: -0.5px;
}

.v-card {
  border-radius: 12px;
  overflow: hidden;
}

.v-card-title {
  padding: 24px 24px 8px;
}

.v-card-subtitle {
  padding: 0 24px 16px;
  color: #5f6368;
}

.v-card-text {
  padding: 16px 24px;
}

.v-card-actions {
  padding: 16px 24px;
}

.text-primary {
  color: #1976d2;
}

.image-preview-container {
  transition: all 0.3s ease;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
