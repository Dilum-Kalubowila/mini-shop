<template>
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>

<script setup lang="ts">
import ProductCard from "./ProductCard.vue"
import type { Product } from "../types/product"

defineProps<{
  products: Product[]
}>()
</script>