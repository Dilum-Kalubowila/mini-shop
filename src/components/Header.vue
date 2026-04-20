<template>
  <header class="bg-blue-600 text-white py-4 shadow-md">
    <div class="max-w-7xl mx-auto px-4 flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold">Mini Shop</h1>
        <p class="text-sm mt-1">Day 9 - Shopping Cart with Pinia</p>
      </div>

      <div class="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold">
        Cart: {{ cart.totalItems }}
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useCartStore } from "../stores/cart"

const cart = useCartStore()
</script>