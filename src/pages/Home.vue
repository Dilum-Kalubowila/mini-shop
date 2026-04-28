<template>
  <div>
    <AppHeader />
    <CartSidebar />

    <main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section class="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div class="grid gap-8 p-6 md:grid-cols-2 lg:p-10">
          <div class="flex flex-col justify-center">
            <p class="mb-4 w-fit rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              ✨ New collection available
            </p>

            <h2 class="text-4xl font-black tracking-tight text-slate-950 dark:text-white md:text-5xl">
              Shop smarter with a modern Vue store.
            </h2>

            <p class="mt-4 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
              Search, filter, view product details, add to cart, and enjoy a smooth dark mode shopping experience.
            </p>

            <div class="mt-6 flex flex-wrap gap-3">
              <div class="rounded-2xl bg-slate-50 px-5 py-4 dark:bg-slate-950">
                <p class="text-xs text-slate-500 dark:text-slate-400">Products</p>
                <p class="text-2xl font-black">{{ products.length }}</p>
              </div>

              <div class="rounded-2xl bg-slate-50 px-5 py-4 dark:bg-slate-950">
                <p class="text-xs text-slate-500 dark:text-slate-400">Categories</p>
                <p class="text-2xl font-black">{{ categories.length }}</p>
              </div>

              <div class="rounded-2xl bg-slate-50 px-5 py-4 dark:bg-slate-950">
                <p class="text-xs text-slate-500 dark:text-slate-400">Cart Items</p>
                <p class="text-2xl font-black">{{ cart.totalItems }}</p>
              </div>
            </div>
          </div>

          <div class="rounded-[2rem] bg-gradient-to-br from-slate-900 to-slate-700 p-6 text-white dark:from-slate-800 dark:to-slate-950">
            <div class="rounded-[1.5rem] bg-white/10 p-6 backdrop-blur">
              <p class="text-sm text-white/70">Featured Experience</p>
              <h3 class="mt-2 text-3xl font-black">Fast, clean, responsive.</h3>
              <p class="mt-3 text-white/70">
                Built with Vue 3, TypeScript, Pinia, Vue Router, Tailwind CSS, and DummyJSON API.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="mt-8 space-y-5">
        <SearchBar
          :searchTerm="searchTerm"
          @update:searchTerm="searchTerm = $event"
        />

        <FilterBar
          :categories="formattedCategories"
          :selectedCategory="selectedCategory"
          :sortOption="sortOption"
          @update:selectedCategory="selectedCategory = $event"
          @update:sortOption="sortOption = $event"
        />
      </section>

      <section class="mt-8">
        <div v-if="loading" class="rounded-3xl border border-slate-200 bg-white p-10 text-center text-lg font-bold text-slate-500 dark:border-slate-800 dark:bg-slate-900">
          Loading products...
        </div>

        <div v-else-if="error" class="rounded-3xl border border-red-200 bg-red-50 p-10 text-center font-bold text-red-600">
          {{ error }}
        </div>

        <ProductList v-else :products="filteredProducts" />
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import AppHeader from "../components/AppHeader.vue"
import CartSidebar from "../components/CartSidebar.vue"
import FilterBar from "../components/FilterBar.vue"
import ProductList from "../components/ProductList.vue"
import SearchBar from "../components/SearchBar.vue"
import { getProducts } from "../services/productService"
import { useCartStore } from "../stores/cart"
import type { Product } from "../types/product"
import { titleCase } from "../utils/format"

const cart = useCartStore()

const products = ref<Product[]>([])
const loading = ref(true)
const error = ref("")
const searchTerm = ref("")
const selectedCategory = ref("all")
const sortOption = ref("default")

async function loadProducts() {
  try {
    loading.value = true
    error.value = ""
    const data = await getProducts()
    products.value = data.products
  } catch (err) {
    console.error(err)
    error.value = "Failed to load products."
  } finally {
    loading.value = false
  }
}

const categories = computed(() => {
  const list = products.value.map((product) => product.category)
  return [...new Set(list)]
})

const formattedCategories = computed(() =>
  categories.value.map((category) => titleCase(category))
)

const filteredProducts = computed(() => {
  const search = searchTerm.value.toLowerCase().trim()

  let filtered = products.value.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(search) ||
      product.brand.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search)

    const matchesCategory =
      selectedCategory.value === "all" ||
      titleCase(product.category) === selectedCategory.value

    return matchesSearch && matchesCategory
  })

  if (sortOption.value === "price-low") {
    filtered = [...filtered].sort((a, b) => a.price - b.price)
  } else if (sortOption.value === "price-high") {
    filtered = [...filtered].sort((a, b) => b.price - a.price)
  } else if (sortOption.value === "rating-high") {
    filtered = [...filtered].sort((a, b) => b.rating - a.rating)
  } else if (sortOption.value === "title-az") {
    filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title))
  }

  return filtered
})

onMounted(loadProducts)
</script>