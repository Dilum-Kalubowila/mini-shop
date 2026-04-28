<template>
  <header class="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/85">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
      <RouterLink to="/" class="flex items-center gap-3">
        <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 text-lg font-black text-white shadow-lg dark:from-white dark:to-slate-300 dark:text-slate-950">
          MS
        </div>

        <div>
          <h1 class="text-xl font-black tracking-tight text-slate-900 dark:text-white">
            Mini Shop Pro
          </h1>
          <p class="text-xs font-medium text-slate-500 dark:text-slate-400">
            Premium shopping experience
          </p>
        </div>
      </RouterLink>

      <div class="flex items-center gap-3">
        <button
          type="button"
          @click="toggleDark"
          class="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        >
          {{ isDark ? "☀️ Light" : "🌙 Dark" }}
        </button>

        <button
          type="button"
          @click="cart.toggleCart()"
          class="rounded-2xl bg-slate-950 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-slate-300/40 transition hover:-translate-y-0.5 hover:shadow-xl dark:bg-white dark:text-slate-950 dark:shadow-none"
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