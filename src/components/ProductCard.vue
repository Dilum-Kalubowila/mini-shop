<template>
  <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
    <RouterLink :to="`/product/${product.id}`">
      <img
        :src="product.thumbnail"
        :alt="product.title"
        class="w-full h-48 object-cover"
      />
    </RouterLink>

    <div class="p-4">
      <h2 class="text-xl font-bold text-gray-800 mb-2">
        {{ product.title }}
      </h2>

      <p class="text-sm text-gray-500 mb-2">
        {{ product.brand }} | {{ product.category }}
      </p>

      <p class="text-gray-600 text-sm mb-4">
        {{ product.description }}
      </p>

      <div class="flex items-center justify-between mb-3">
        <span class="text-lg font-bold text-blue-600">
          ${{ product.price }}
        </span>
        <span class="text-sm text-yellow-500 font-medium">
          ⭐ {{ product.rating }}
        </span>
      </div>

      <p class="text-sm text-gray-500 mb-4">
        Stock: {{ product.stock }}
      </p>

      <div class="flex gap-2">
        <RouterLink
          :to="`/product/${product.id}`"
          class="flex-1 text-center bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
        >
          View
        </RouterLink>

        <button
          @click="cart.addToCart(product)"
          class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { useCartStore } from "../stores/cart"
import type { Product } from "../types/product"

defineProps<{
  product: Product
}>()

const cart = useCartStore()
</script>