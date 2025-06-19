<template>
  <div class="add-product-page">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8" lg="6">
          <v-card class="elevation-6">
            <v-card-title class="headline text-primary">{{
              $route.params.id ? 'Edit Product' : 'Add New Product'
            }}</v-card-title>
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
                      label="Price"
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
                    :rules="[imageRequiredRule, rules.image]"
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
                        {{ fileNames[0] || 'No image selected' }}
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
import { defineComponent, ref, reactive, computed, onMounted } from 'vue'
import { useCategoryStore } from '@/stores/categoryStore'
import { useProductStore } from '@/stores/productStore'
import { useRoute, useRouter } from 'vue-router'
import type { VForm, VFileInput } from 'vuetify/components'

interface ProductForm {
  name: string
  description: string
  weight: number | null
  width: number | null
  length: number | null
  height: number | null
  price: number | null
  category: string | null
  image: File | null
  imageUrl: string | null
}

export default defineComponent({
  name: 'FormProductPage',

  setup() {
    const categoriesStore = useCategoryStore()
    const productStore = useProductStore()
    const route = useRoute()
    const router = useRouter()

    const valid = ref(false)
    const loading = ref(false)

    const form = ref<VForm | null>(null)
    const fileInput = ref<VFileInput | null>(null)

    const isEditing = computed(() => !!route.params.id)

    const product = reactive<ProductForm>({
      name: '',
      description: '',
      weight: null,
      width: null,
      length: null,
      height: null,
      price: null,
      category: null,
      image: null,
      imageUrl: null,
    })

    const previewImage = computed(() => {
      if (product.image) {
        return URL.createObjectURL(product.image)
      }
      return product.imageUrl
    })

    const rules = {
      required: (value: unknown) => !!value || 'This field is required',
      number: (value: number | string | null) =>
        (value !== null && !isNaN(Number(value))) || 'Must be a valid number',
      image: (value: File | null) => {
        if (isEditing.value) {
          return true
        }
        if (!value) return 'Image is required'
        if (value.size > 5 * 1024 * 1024) {
          return 'Image size must be less than 5MB'
        }
        return true
      },
    }

    const imageRequiredRule = () => {
      if (product.image || previewImage.value) {
        return true
      }
      return 'Image is required'
    }

    const fetchProductForEdit = async (id: string) => {
      try {
        await productStore.fetchProductDetail(id)
        const fetchedProduct = productStore.productDetail
        if (fetchedProduct) {
          product.name = fetchedProduct.name
          product.description = fetchedProduct.description
          product.weight = fetchedProduct.weight
          product.width = fetchedProduct.width
          product.length = fetchedProduct.length
          product.height = fetchedProduct.height
          product.price = fetchedProduct.price
          product.category = fetchedProduct.categoryName
          product.imageUrl = fetchedProduct.image
          product.image = null
        }
        if (form.value) {
          form.value.validate()
        }
      } catch (error) {
        console.error('Error fetching product detail:', error)
      }
    }

    const resetForm = () => {
      form.value?.reset()
      Object.assign(product, {
        name: '',
        description: '',
        weight: null,
        width: null,
        length: null,
        height: null,
        price: null,
        category: null,
        image: null,
        imageUrl: null,
      })
    }

    const cancel = () => {
      router.back()
    }

    const submitForm = async () => {
      if (!valid.value) return

      loading.value = true
      try {
        if (isEditing.value && route.params.id) {
          await productStore.submitUpdateProduct(product, route.params.id as string)
        } else {
          await productStore.submitProduct(product)
        }

        resetForm()

        productStore.fetchProducts(true)
        router.push({ name: 'home' })
      } catch (error) {
        console.error('Error submitting product:', error)
      } finally {
        loading.value = false
      }
    }

    const handleFileChange = (event: Event) => {
      const input = event.target as HTMLInputElement
      if (!input.files || input.files.length === 0) {
        product.image = null
        return
      }

      const file = input.files[0]
      product.image = file

      const reader = new FileReader()

      reader.readAsDataURL(file)
    }

    const removeImage = () => {
      product.image = null
      if (fileInput.value) {
        fileInput.value = null
      }
    }

    onMounted(() => {
      categoriesStore.fetchCategories()
      const productId = route.params.id as string | undefined
      if (productId) {
        fetchProductForEdit(productId)
      }
    })

    return {
      valid,
      loading,
      previewImage,
      product,
      rules,
      categoriesStore,
      form,
      fileInput,
      isEditing,
      submitForm,
      handleFileChange,
      removeImage,
      cancel,
      imageRequiredRule,
    }
  },
})
</script>
