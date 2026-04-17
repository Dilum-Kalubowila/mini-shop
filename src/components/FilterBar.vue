<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Category
      </label>
      <select
        :value="selectedCategory"
        @change="updateCategory"
        class="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="all">All Categories</option>
        <option
          v-for="category in categories"
          :key="category"
          :value="category"
        >
          {{ category }}
        </option>
      </select>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Sort By
      </label>
      <select
        :value="sortOption"
        @change="updateSort"
        class="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="default">Default</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="rating-high">Rating: High to Low</option>
        <option value="title-az">Title: A to Z</option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  categories: string[]
  selectedCategory: string
  sortOption: string
}>()

const emit = defineEmits<{
  (e: "update:selectedCategory", value: string): void
  (e: "update:sortOption", value: string): void
}>()

function updateCategory(event: Event) {
  const target = event.target as HTMLSelectElement
  emit("update:selectedCategory", target.value)
}

function updateSort(event: Event) {
  const target = event.target as HTMLSelectElement
  emit("update:sortOption", target.value)
}
</script>