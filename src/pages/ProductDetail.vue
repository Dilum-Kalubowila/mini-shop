<template>
  <div>
    <AppHeader />
    <CartSidebar />

    <main class="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <RouterLink
        to="/"
        class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
      >
        ← Back to products
      </RouterLink>

      <div v-if="loading" class="mt-6 rounded-3xl border border-slate-200 bg-white p-10 text-center text-lg font-bold text-slate-500 dark:border-slate-800 dark:bg-slate-900">
        Loading product details...
      </div>

      <div v-else-if="error" class="mt-6 rounded-3xl border border-rose-200 bg-rose-50 p-10 text-center font-bold text-rose-600">
        {{ error }}
      </div>

      <section
        v-else-if="product"
        class="mt-6 grid gap-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:grid-cols-[1.1fr_0.9fr] lg:p-8"
      >
        <div class="space-y-4">
          <div class="overflow-hidden rounded-[2rem] bg-slate-100 dark:bg-slate-950">
            <img
              :src="selectedImage"
              :alt="product.title"
              class="h-[420px] w-full object-cover"
            />
          </div>

          <div class="grid grid-cols-4 gap-3">
            <button
              v-for="image in product.images"
              :key="image"
              type="button"
              @click="selectedImage = image"
              class="overflow-hidden rounded-2xl border-2 transition"
              :class="selectedImage === image ? 'border-slate-950 dark:border-white' : 'border-transparent'"
            >
              <img :src="image" :alt="product.title" class="h-24 w-full object-cover" />
            </button>
          </div>
        </div>

        <div>
          <p class="mb-3 inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {{ categoryLabel }}
          </p>

          <h1 class="text-3xl font-black tracking-tight text-slate-950 dark:text-white md:text-4xl">
            {{ product.title }}
          </h1>

          <div class="mt-4 flex flex-wrap items-center gap-3 text-sm">
            <span class="rounded-full bg-amber-50 px-3 py-2 font-bold text-amber-700">
              ⭐ {{ product.rating }} rating
            </span>

            <span class="rounded-full bg-slate-100 px-3 py-2 font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              Brand: {{ product.brand }}
            </span>

            <span class="rounded-full bg-emerald-50 px-3 py-2 font-bold text-emerald-700">
              {{ product.stock }} in stock
            </span>
          </div>

          <p class="mt-6 text-base leading-8 text-slate-600 dark:text-slate-300">
            {{ product.description }}
          </p>

          <div class="mt-8 rounded-[2rem] bg-slate-50 p-6 dark:bg-slate-950">
            <div class="flex items-end justify-between gap-4 border-b border-slate-200 pb-5 dark:border-slate-800">
              <div>
                <p class="text-sm font-bold text-slate-500 dark:text-slate-400">Price</p>
                <p class="text-4xl font-black text-slate-950 dark:text-white">
                  {{ formatCurrency(product.price) }}
                </p>
              </div>

              <div class="text-right">
                <p class="text-sm font-bold text-slate-500 dark:text-slate-400">Discount</p>
                <p class="text-lg font-black text-rose-500">
                  {{ product.discountPercentage }}% OFF
                </p>
              </div>
            </div>

            <div class="mt-5 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                @click="handleAddToCart"
                class="rounded-2xl bg-slate-950 px-5 py-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:shadow-xl dark:bg-white dark:text-slate-950"
              >
                Add to Cart
              </button>

              <RouterLink
                to="/"
                class="rounded-2xl border border-slate-200 px-5 py-4 text-center text-sm font-black text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Continue Shopping
              </RouterLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { RouterLink, useRoute } from "vue-router"
import AppHeader from "../components/AppHeader.vue"
import CartSidebar from "../components/CartSidebar.vue"
import { getProductById } from "../services/productService"
import { useCartStore } from "../stores/cart"
import type { Product } from "../types/product"
import { formatCurrency, titleCase } from "../utils/format"

const route = useRoute()
const cart = useCartStore()

const product = ref<Product | null>(null)
const selectedImage = ref("")
const loading = ref(true)
const error = ref("")

const categoryLabel = computed(() =>
  product.value ? titleCase(product.value.category) : ""
)

async function loadProduct() {
  try {
    loading.value = true
    error.value = ""

    const id = route.params.id as string
    const data = await getProductById(id)
    product.value = data
    selectedImage.value = data.images[0] || data.thumbnail
  } catch (err) {
    console.error(err)
    error.value = "Failed to load product details."
  } finally {
    loading.value = false
  }
}

function handleAddToCart() {
  if (!product.value) return
  cart.addToCart(product.value)
  cart.openCart()
}

onMounted(loadProduct)
</script>