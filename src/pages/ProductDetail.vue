<template>
  <div>
    <AppHeader />
    <CartSidebar />

    <main class="p-10">
      <div v-if="loading">Loading...</div>

      <div v-else-if="product" class="max-w-3xl">
        <RouterLink to="/" class="mb-6 inline-block text-blue-600">
          ← Back to products
        </RouterLink>

        <h1 class="text-3xl font-bold">{{ product.title }}</h1>

        <img
          :src="product.thumbnail"
          :alt="product.title"
          class="mt-4 w-full max-w-md rounded-xl"
        />

        <p class="mt-4 text-slate-600">
          {{ product.description }}
        </p>

        <p class="mt-4 text-xl font-bold">
          {{ formatCurrency(product.price) }}
        </p>

        <button
          @click="handleAddToCart"
          class="mt-6 rounded bg-black px-4 py-2 text-white"
        >
          Add to Cart
        </button>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import { RouterLink, useRoute } from "vue-router"
import AppHeader from "../components/AppHeader.vue"
import CartSidebar from "../components/CartSidebar.vue"
import { getProductById } from "../services/productService"
import { useCartStore } from "../stores/cart"
import type { Product } from "../types/product"
import { formatCurrency } from "../utils/format"

const route = useRoute()
const cart = useCartStore()

const product = ref<Product | null>(null)
const loading = ref(true)

async function loadProduct() {
  const id = route.params.id as string
  const data = await getProductById(id)
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