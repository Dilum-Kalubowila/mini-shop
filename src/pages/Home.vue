<template>
  <div>
    <AppHeader />
    <CartSidebar />

    <main class="p-10 space-y-6">
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

      <div v-if="loading" class="text-lg">Loading products...</div>
      <div v-else-if="error" class="text-red-500">{{ error }}</div>
      <ProductList v-else :products="filteredProducts" />
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
import type { Product } from "../types/product"
import { titleCase } from "../utils/format"

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