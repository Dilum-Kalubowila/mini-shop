<template>
  <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
    <img
      :src="product.thumbnail"
      :alt="product.title"
      class="w-full h-48 object-cover"
    />

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

      <div class="flex items-center justify-between">
        <span class="text-lg font-bold text-blue-600">
          ${{ product.price }}
        </span>
        <span class="text-sm text-yellow-500 font-medium">
          ⭐ {{ product.rating }}
        </span>
      </div>

      <p class="text-sm text-gray-500 mt-2">
        Stock: {{ product.stock }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from "../types/product"

defineProps<{
  product: Product
}>()
</script>