<template>
  <div>
    <AppHeader />
    <CartSidebar />

    <main>
      <!-- HERO -->
      <section class="relative overflow-hidden bg-[#f7efe7] dark:bg-slate-950">
        <div class="absolute left-[-120px] top-[-120px] h-80 w-80 rounded-full bg-pink-300/40 blur-3xl dark:bg-fuchsia-700/20"></div>
        <div class="absolute bottom-[-140px] right-[-120px] h-96 w-96 rounded-full bg-amber-300/50 blur-3xl dark:bg-cyan-700/20"></div>

        <div class="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div>
            <p class="mb-5 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-black text-slate-700 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900/80 dark:text-slate-200 dark:ring-slate-800">
              ✨ Global Beauty & Lifestyle Store
            </p>

            <h1 class="max-w-2xl text-5xl font-black leading-tight tracking-tight text-slate-950 dark:text-white sm:text-6xl">
              Discover products that match your style.
            </h1>

            <p class="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Browse premium products, filter faster, compare prices, and add your favorites to a smart shopping cart.
            </p>

            <div class="mt-8 flex flex-wrap gap-4">
              <a
                href="#products"
                class="rounded-2xl bg-slate-950 px-7 py-4 text-sm font-black text-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl dark:bg-white dark:text-slate-950"
              >
                Shop Collection
              </a>

              <button
                type="button"
                @click="cart.openCart()"
                class="rounded-2xl border border-slate-300 bg-white/70 px-7 py-4 text-sm font-black text-slate-900 shadow-sm transition hover:-translate-y-1 hover:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              >
                View Cart
              </button>
            </div>

            <div class="mt-10 grid max-w-xl grid-cols-3 gap-4">
              <div class="rounded-3xl bg-white/80 p-5 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                <p class="text-3xl font-black text-slate-950 dark:text-white">
                  {{ products.length }}
                </p>
                <p class="mt-1 text-xs font-bold text-slate-500">Products</p>
              </div>

              <div class="rounded-3xl bg-white/80 p-5 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                <p class="text-3xl font-black text-slate-950 dark:text-white">
                  {{ categories.length }}
                </p>
                <p class="mt-1 text-xs font-bold text-slate-500">Categories</p>
              </div>

              <div class="rounded-3xl bg-slate-950 p-5 text-white shadow-sm dark:bg-white dark:text-slate-950">
                <p class="text-3xl font-black">{{ cart.totalItems }}</p>
                <p class="mt-1 text-xs font-bold opacity-70">In Cart</p>
              </div>
            </div>
          </div>

          <!-- RIGHT SIDE SHOP INFO CARD -->
          <div class="relative">
            <div class="rounded-[2.5rem] bg-white/90 p-6 shadow-2xl ring-1 ring-slate-200 backdrop-blur dark:bg-slate-900/90 dark:ring-slate-800">
              <div class="mb-6">
                <p class="text-sm font-black uppercase tracking-wider text-rose-500">
                  Why customers choose us
                </p>

                <h2 class="mt-2 text-3xl font-black text-slate-950 dark:text-white">
                  A better way to shop online
                </h2>

                <p class="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Mini Shop Pro gives customers a smooth, fast, and comfortable shopping experience with smart search, filters, cart, and dark mode.
                </p>
              </div>

              <div class="grid gap-4 sm:grid-cols-2">
                <div class="rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200 dark:bg-slate-950 dark:ring-slate-800">
                  <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-2xl">
                    🔎
                  </div>

                  <h3 class="text-lg font-black text-slate-950 dark:text-white">
                    Easy Search
                  </h3>

                  <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    Customers can quickly find products by name, brand, or category.
                  </p>
                </div>

                <div class="rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200 dark:bg-slate-950 dark:ring-slate-800">
                  <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-2xl">
                    🛒
                  </div>

                  <h3 class="text-lg font-black text-slate-950 dark:text-white">
                    Smart Cart
                  </h3>

                  <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    Add, remove, and update product quantities with a clean cart panel.
                  </p>
                </div>

                <div class="rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200 dark:bg-slate-950 dark:ring-slate-800">
                  <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-2xl">
                    ⚡
                  </div>

                  <h3 class="text-lg font-black text-slate-950 dark:text-white">
                    Fast Experience
                  </h3>

                  <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    Responsive layout for mobile, tablet, and desktop customers.
                  </p>
                </div>

                <div class="rounded-3xl bg-slate-950 p-5 text-white dark:bg-white dark:text-slate-950">
                  <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-2xl dark:bg-slate-100">
                    🌙
                  </div>

                  <h3 class="text-lg font-black">
                    Dark Mode
                  </h3>

                  <p class="mt-2 text-sm opacity-70">
                    A modern theme option for a comfortable shopping experience.
                  </p>
                </div>
              </div>

              <div class="mt-6 rounded-3xl bg-gradient-to-r from-rose-500 to-orange-400 p-5 text-white shadow-lg">
                <div class="flex items-center justify-between gap-4">
                  <div>
                    <p class="text-sm font-bold text-white/80">
                      Customer Experience
                    </p>

                    <h3 class="mt-1 text-2xl font-black">
                      Modern, simple, reliable.
                    </h3>
                  </div>

                  <a
                    href="#products"
                    class="rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-950"
                  >
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- TRUST SECTION -->
      <section
        id="features"
        class="mx-auto grid max-w-7xl gap-4 px-4 py-8 sm:px-6 md:grid-cols-3 lg:px-8"
      >
        <div class="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
          <p class="text-3xl">🚚</p>
          <h3 class="mt-3 text-lg font-black">Fast browsing</h3>
          <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Search and filter products smoothly.
          </p>
        </div>

        <div class="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
          <p class="text-3xl">🛒</p>
          <h3 class="mt-3 text-lg font-black">Smart cart</h3>
          <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Cart saves items after refresh.
          </p>
        </div>

        <div class="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
          <p class="text-3xl">🌙</p>
          <h3 class="mt-3 text-lg font-black">Dark mode</h3>
          <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Modern light and dark experience.
          </p>
        </div>
      </section>

      <!-- PRODUCTS -->
      <section id="products" class="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div class="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p class="text-sm font-black uppercase tracking-wider text-rose-500">
              Shop now
            </p>

            <h2 class="mt-1 text-4xl font-black tracking-tight text-slate-950 dark:text-white">
              Featured Products
            </h2>

            <p class="mt-2 text-slate-500 dark:text-slate-400">
              Type letters in the search box to instantly filter matching products.
            </p>
          </div>

          <div class="rounded-full bg-white px-5 py-3 text-sm font-black text-slate-600 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:ring-slate-800">
            Showing {{ filteredProducts.length }} item(s)
          </div>
        </div>

        <div class="mb-6 space-y-4">
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
        </div>

        <div
          v-if="loading"
          class="rounded-3xl bg-white p-10 text-center font-black shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800"
        >
          Loading products...
        </div>

        <div
          v-else-if="error"
          class="rounded-3xl bg-red-50 p-10 text-center font-black text-red-600"
        >
          {{ error }}
        </div>

        <div
          v-else-if="filteredProducts.length === 0"
          class="rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800"
        >
          <p class="text-5xl">🔎</p>
          <h3 class="mt-3 text-xl font-black">No products found</h3>
          <p class="mt-2 text-slate-500">Try another keyword or category.</p>
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
  return [...new Set(products.value.map((product) => product.category))]
})

const formattedCategories = computed(() =>
  categories.value.map((category) => titleCase(category))
)

const filteredProducts = computed(() => {
  const search = searchTerm.value.toLowerCase().trim()

  let filtered = products.value.filter((product) => {
    const title = product.title?.toLowerCase() || ""
    const brand = product.brand?.toLowerCase() || ""
    const category = product.category?.toLowerCase() || ""
    const description = product.description?.toLowerCase() || ""

    const matchesSearch =
      search === "" ||
      title.includes(search) ||
      brand.includes(search) ||
      category.includes(search) ||
      description.includes(search)

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