<template>
  <article class="group overflow-hidden rounded-[2rem] bg-white p-4 shadow-sm ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-2xl dark:bg-slate-900 dark:ring-slate-800">
    <RouterLink :to="`/product/${product.id}`" class="block">
      <div class="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-950">
        <img
          :src="product.thumbnail"
          :alt="product.title"
          class="h-60 w-full object-cover transition duration-500 group-hover:scale-110"
        />

        <span class="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-slate-700 shadow-sm dark:bg-slate-950/90 dark:text-white">
          {{ product.category }}
        </span>

        <span class="absolute right-3 top-3 rounded-full bg-amber-400 px-3 py-1 text-xs font-black text-slate-950 shadow-sm">
          ⭐ {{ product.rating }}
        </span>
      </div>
    </RouterLink>

    <div class="mt-5">
      <RouterLink :to="`/product/${product.id}`">
        <h2 class="line-clamp-1 text-lg font-black text-slate-950 transition hover:text-rose-500 dark:text-white">
          {{ product.title }}
        </h2>
      </RouterLink>

      <p class="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">
        {{ product.brand || "Premium Brand" }}
      </p>

      <div class="mt-4 flex items-center justify-between">
        <div>
          <p class="text-xs font-bold text-slate-400">Price</p>
          <p class="text-2xl font-black text-slate-950 dark:text-white">
            {{ formatCurrency(product.price) }}
          </p>
        </div>

        <p class="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
          {{ product.stock }} left
        </p>
      </div>

      <div class="mt-5 grid grid-cols-2 gap-3">
        <RouterLink
          :to="`/product/${product.id}`"
          class="rounded-2xl border border-slate-200 px-4 py-3 text-center text-sm font-black text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Details
        </RouterLink>

        <button
          type="button"
          @click="cart.addToCart(product)"
          class="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white transition hover:bg-rose-500 dark:bg-white dark:text-slate-950"
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