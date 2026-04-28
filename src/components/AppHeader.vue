<template>
  <header class="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
      <RouterLink to="/" class="flex items-center gap-3">
        <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-lg font-black text-white shadow-lg dark:bg-white dark:text-slate-950">
          MS
        </div>

        <div>
          <h1 class="text-xl font-black tracking-tight text-slate-950 dark:text-white">
            Mini Shop Pro
          </h1>
          <p class="text-xs font-bold text-slate-500 dark:text-slate-400">
            Global shopping experience
          </p>
        </div>
      </RouterLink>

      <nav class="hidden items-center gap-7 text-sm font-black text-slate-600 dark:text-slate-300 md:flex">
        <RouterLink to="/" class="transition hover:text-rose-500">Home</RouterLink>
        <a href="#products" class="transition hover:text-rose-500">Products</a>
        <a href="#features" class="transition hover:text-rose-500">Why us</a>
      </nav>

      <div class="flex items-center gap-3">
        <button
          type="button"
          @click="toggleDark"
          class="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        >
          {{ isDark ? "☀️ Light" : "🌙 Dark" }}
        </button>

        <button
          type="button"
          @click="cart.toggleCart()"
          class="rounded-2xl bg-slate-950 px-4 py-2 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-rose-500 hover:shadow-xl dark:bg-white dark:text-slate-950"
        >
          🛒 Cart
          <span class="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-xs dark:bg-slate-200">
            {{ cart.totalItems }}
          </span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { useCartStore } from "../stores/cart"
import { useDarkMode } from "../composables/useDarkMode"

const cart = useCartStore()
const { isDark, toggleDark } = useDarkMode()
</script>