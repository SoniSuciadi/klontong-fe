<template>
  <v-card class="product-card" elevation="0" hover @click="handleCardClick">
    <v-img :src="image" height="200" contain class="product-image"></v-img>
    <v-card-text class="product-content">
      <div class="product-category">{{ category }}</div>
      <h3 class="product-name">{{ name }}</h3>
      <div class="product-price">{{ formattedPrice }}</div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'

export default {
  name: 'ProductCard',
  props: {
    image: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter()

    const handleCardClick = () => {
      router.push(`/detail/${props.id}`)
    }

    return {
      handleCardClick,
    }
  },
  computed: {
    formattedPrice(): string {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      }).format(this.price)
    },
  },
}
</script>

<style scoped>
.product-card {
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  border: 1px solid #f0f0f0;
  transition: all 0.3s ease;
  max-width: 200px;
  margin: 8px;
}

.product-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-4px);
}

.product-image {
  background-color: #f9f9f9;
  padding: 16px;
}

.product-content {
  padding: 16px;
}

.product-category {
  font-size: 0.75rem;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}

.product-name {
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-price {
  font-size: 1rem;
  font-weight: 600;
  color: #000;
}

@media (max-width: 600px) {
  .product-card {
    max-width: 160px;
  }

  .product-image {
    height: 140px;
    padding: 12px;
  }

  .product-content {
    padding: 12px;
  }

  .product-name {
    font-size: 0.875rem;
    -webkit-line-clamp: 2;
  }

  .product-price {
    font-size: 0.875rem;
  }
}
</style>
