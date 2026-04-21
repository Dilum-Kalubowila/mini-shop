<template>
  <div class="group overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
    <RouterLink :to="`/product/${product.id}`" class="block">
      <div class="overflow-hidden rounded-xl bg-slate-100">
        <img
          :src="product.thumbnail"
          :alt="product.title"
          class="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
    </RouterLink>

    <div class="mt-4 space-y-2">
      <RouterLink :to="`/product/${product.id}`">
        <h2 class="line-clamp-1 text-lg font-bold text-slate-900">
          {{ product.title }}
        </h2>
      </RouterLink>

      <p class="text-sm text-slate-500">
        {{ product.brand }}
      </p>

      <p class="text-base font-semibold text-slate-800">
        {{ formatCurrency(product.price) }}
      </p>

      <div class="mt-4 flex gap-3">
        <RouterLink
          :to="`/product/${product.id}`"
          class="flex-1 rounded-xl border border-slate-200 px-4 py-2 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          Details
        </RouterLink>

        <button
          type="button"
          @click="cart.addToCart(product)"
          class="flex-1 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Add
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { useCartStore } from "../stores/cart"
import type { Product } from "../types/product"
import { formatCurrency } from "../utils/format"

defineProps<{
  product: Product
}>()

const cart = useCartStore()
</script>