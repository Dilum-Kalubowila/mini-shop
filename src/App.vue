<template>
  <div class="min-h-screen bg-gray-100">
    <Header />

    <main class="max-w-7xl mx-auto p-6">
      <h2 class="text-2xl font-bold text-blue-600 mb-6">
        Product Collection
      </h2>

      <SearchBar
        :searchTerm="searchTerm"
        @update:searchTerm="searchTerm = $event"
      />

      <div v-if="loading" class="text-lg text-gray-600">
        Loading products...
      </div>

      <div v-else-if="error" class="text-red-600 font-semibold">
        {{ error }}
      </div>

      <div v-else-if="filteredProducts.length === 0" class="text-gray-600 text-lg">
        No products found.
      </div>

      <ProductList v-else :products="filteredProducts" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import Header from "./components/Header.vue"
import ProductList from "./components/ProductList.vue"
import SearchBar from "./components/SearchBar.vue"
import { getProducts } from "./services/productService"
import type { Product } from "./types/product"

const products = ref<Product[]>([])
const loading = ref<boolean>(true)
const error = ref<string>("")
const searchTerm = ref<string>("")

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

const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    const search = searchTerm.value.toLowerCase()

    return (
      product.title.toLowerCase().includes(search) ||
      product.brand.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search)
    )
  })
})

onMounted(() => {
  loadProducts()
})
</script>