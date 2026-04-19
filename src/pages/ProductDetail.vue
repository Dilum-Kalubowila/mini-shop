<template>
  <div class="min-h-screen bg-gray-100">
    <Header />

    <main class="max-w-5xl mx-auto p-6">
      <RouterLink
        to="/"
        class="inline-block mb-6 text-blue-600 font-semibold hover:underline"
      >
        ← Back to Products
      </RouterLink>

      <div v-if="loading" class="text-lg text-gray-600">
        Loading product details...
      </div>

      <div v-else-if="error" class="text-red-600 font-semibold">
        {{ error }}
      </div>

      <div
        v-else-if="product"
        class="bg-white rounded-xl shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-6 p-6"
      >
        <div>
          <img
            :src="product.thumbnail"
            :alt="product.title"
            class="w-full rounded-xl object-cover"
          />
        </div>

        <div>
          <h1 class="text-3xl font-bold text-gray-800 mb-4">
            {{ product.title }}
          </h1>

          <p class="text-gray-500 mb-2">
            {{ product.brand }} | {{ product.category }}
          </p>

          <p class="text-gray-700 mb-4">
            {{ product.description }}
          </p>

          <p class="text-2xl font-bold text-blue-600 mb-4">
            ${{ product.price }}
          </p>

          <p class="text-yellow-500 font-medium mb-2">
            ⭐ {{ product.rating }}
          </p>

          <p class="text-gray-600 mb-2">
            Stock: {{ product.stock }}
          </p>

          <p class="text-gray-600">
            Discount: {{ product.discountPercentage }}%
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useRoute, RouterLink } from "vue-router"
import Header from "../components/Header.vue"
import { getProductById } from "../services/productService"
import type { Product } from "../types/product"

const route = useRoute()

const product = ref<Product | null>(null)
const loading = ref<boolean>(true)
const error = ref<string>("")

async function loadProduct() {
  try {
    loading.value = true
    error.value = ""

    const id = route.params.id as string
    const data = await getProductById(id)
    product.value = data
  } catch (err) {
    error.value = "Failed to load product details."
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadProduct()
})
</script>