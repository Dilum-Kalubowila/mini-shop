<template>
  <div class="min-h-screen bg-gray-100">
    <Header />

    <main class="max-w-7xl mx-auto p-6">
      <h2 class="text-2xl font-bold text-blue-600 mb-6">
        Product Collection
      </h2>

      <div class="mb-6">
        <SearchBar
          :searchTerm="searchTerm"
          @update:searchTerm="searchTerm = $event"
        />
      </div>

      <FilterBar
        :categories="categories"
        :selectedCategory="selectedCategory"
        :sortOption="sortOption"
        @update:selectedCategory="selectedCategory = $event"
        @update:sortOption="sortOption = $event"
      />

      <div v-if="loading" class="text-lg text-gray-600">
        Loading products...
      </div>

      <div v-else-if="error" class="text-red-600 font-semibold">
        {{ error }}
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div class="lg:col-span-3">
          <div v-if="filteredProducts.length === 0" class="text-gray-600 text-lg">
            No products found.
          </div>

          <ProductList v-else :products="filteredProducts" />
        </div>

        <div class="lg:col-span-1">
          <CartSidebar />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import Header from "../components/Header.vue"
import ProductList from "../components/ProductList.vue"
import SearchBar from "../components/SearchBar.vue"
import FilterBar from "../components/FilterBar.vue"
import CartSidebar from "../components/CartSidebar.vue"
import { getProducts } from "../services/productService"
import type { Product } from "../types/product"

const products = ref<Product[]>([])
const loading = ref<boolean>(true)
const error = ref<string>("")
const searchTerm = ref<string>("")
const selectedCategory = ref<string>("all")
const sortOption = ref<string>("default")

async function loadProducts() {
  try {
    loading.value = true
    error.value = ""

    const data = await getProducts()
    products.value = data.products
  } catch (err) {
    error.value = "Failed to load products. Please try again."
    console.error(err)
  } finally {
    loading.value = false
  }
}

const categories = computed(() => {
  const categoryList = products.value.map((product) => product.category)
  return [...new Set(categoryList)]
})

const filteredProducts = computed(() => {
  let filtered = products.value.filter((product) => {
    const search = searchTerm.value.toLowerCase()

    const matchesSearch =
      product.title.toLowerCase().includes(search) ||
      product.brand.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search)

    const matchesCategory =
      selectedCategory.value === "all" ||
      product.category === selectedCategory.value

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

onMounted(() => {
  loadProducts()
})
</script>