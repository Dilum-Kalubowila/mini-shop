<template>
  <div class="p-10">
    <h1 class="text-3xl font-bold text-blue-600 mb-6">
      Mini Shop - Day 3 🚀
    </h1>

    <button
      @click="loadProducts"
      class="bg-blue-600 text-white px-4 py-2 rounded mb-6"
    >
      Load Products
    </button>

    <div v-if="products.length > 0">
      <h2 class="text-xl font-bold mb-4">Products:</h2>

      <ul>
        <li
          v-for="product in products"
          :key="product.id"
          class="mb-2"
        >
          {{ product.title }} - ${{ product.price }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { getProducts } from "./services/productService"
import type { Product } from "./types/product"

const products = ref<Product[]>([])

async function loadProducts() {
  const data = await getProducts()
  products.value = data.products
}
</script>