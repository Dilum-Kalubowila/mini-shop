<template>
  <div>
    <AppHeader />
    <CartSidebar />

    <main class="p-10">
      <div v-if="loading">Loading...</div>

      <div v-else-if="product">
        <h1 class="text-2xl font-bold">{{ product.title }}</h1>
        <img :src="product.thumbnail" class="w-64 mt-4" />

        <p class="mt-4">{{ product.description }}</p>

        <p class="mt-4 font-bold">
          {{ formatCurrency(product.price) }}
        </p>

        <button
          @click="handleAddToCart"
          class="mt-4 bg-black text-white px-4 py-2 rounded"
        >
          Add to Cart
        </button>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import AppHeader from "../components/AppHeader.vue"
import CartSidebar from "../components/CartSidebar.vue"
import { useCartStore } from "../stores/cart"
import { getProductById } from "../services/productService"
import { formatCurrency } from "../utils/format"
import type { Product } from "../types/product"

const route = useRoute()
const cart = useCartStore()

const product = ref<Product | null>(null)
const loading = ref(true)

async function loadProduct() {
  const data = await getProductById(route.params.id as string)
  product.value = data
  loading.value = false
}

function handleAddToCart() {
  if (!product.value) return
  cart.addToCart(product.value)
  cart.openCart()
}

onMounted(loadProduct)
</script>