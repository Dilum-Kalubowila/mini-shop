<template>
  <header class="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
      <RouterLink to="/" class="flex items-center gap-3">
        <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-lg font-bold text-white">
          MS
        </div>
        <div>
          <h1 class="text-xl font-bold text-slate-900">Mini Shop Pro</h1>
          <p class="text-xs text-slate-500">Modern beauty store</p>
        </div>
      </RouterLink>

      <button
        type="button"
        @click="cart.toggleCart()"
        class="relative rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      >
        🛒 Cart
        <span
          class="ml-2 rounded-full bg-white px-2 py-0.5 text-xs font-bold text-slate-900"
        >
          {{ cart.totalItems }}
        </span>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { useCartStore } from "../stores/cart"

const cart = useCartStore()
</script>