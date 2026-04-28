<template>
  <article class="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900">
    <RouterLink :to="`/product/${product.id}`" class="block">
      <div class="overflow-hidden rounded-[1.4rem] bg-slate-100 dark:bg-slate-950">
        <img
          :src="product.thumbnail"
          :alt="product.title"
          class="h-56 w-full object-cover transition duration-500 group-hover:scale-110"
        />
      </div>
    </RouterLink>

    <div class="mt-5">
      <div class="mb-3 flex items-center justify-between">
        <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {{ product.category }}
        </span>

        <span class="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-600">
          ⭐ {{ product.rating }}
        </span>
      </div>

      <RouterLink :to="`/product/${product.id}`">
        <h2 class="line-clamp-1 text-lg font-black text-slate-950 transition hover:text-slate-600 dark:text-white">
          {{ product.title }}
        </h2>
      </RouterLink>

      <p class="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">
        {{ product.brand }}
      </p>

      <div class="mt-4 flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-950">
        <div>
          <p class="text-xs text-slate-500 dark:text-slate-400">Price</p>
          <p class="text-xl font-black text-slate-950 dark:text-white">
            {{ formatCurrency(product.price) }}
          </p>
        </div>

        <p class="text-sm font-bold text-green-600">
          {{ product.stock }} left
        </p>
      </div>

      <div class="mt-4 grid grid-cols-2 gap-3">
        <RouterLink
          :to="`/product/${product.id}`"
          class="rounded-2xl border border-slate-200 px-4 py-3 text-center text-sm font-bold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Details
        </RouterLink>

        <button
          type="button"
          @click="cart.addToCart(product)"
          class="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:opacity-90 dark:bg-white dark:text-slate-950"
        >
          Add
        </button>
      </div>
    </div>
  </article>
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