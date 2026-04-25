<template>
  <header class="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
      
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-3">
        <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900">
          MS
        </div>

        <div>
          <h1 class="text-xl font-bold text-slate-900 dark:text-white">
            Mini Shop Pro
          </h1>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            Modern beauty store
          </p>
        </div>
      </RouterLink>

      <!-- Right side buttons -->
      <div class="flex items-center gap-3">

        <!-- DARK MODE BUTTON -->
        <button
          @click="toggleDark"
          class="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800"
        >
          {{ isDark ? "☀️ Light" : "🌙 Dark" }}
        </button>

        <!-- CART -->
        <button
          @click="cart.toggleCart()"
          class="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-slate-900"
        >
          🛒 {{ cart.totalItems }}
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