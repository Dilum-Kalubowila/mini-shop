<template>
  <div class="grid grid-cols-1 gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:grid-cols-3">
    <div>
      <label class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">
        Category
      </label>

      <select
        :value="selectedCategory"
        @change="updateCategory"
        class="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 font-medium text-slate-900 outline-none transition focus:ring-4 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-slate-800"
      >
        <option value="all">All Categories</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
    </div>

    <div>
      <label class="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">
        Sort by
      </label>

      <select
        :value="sortOption"
        @change="updateSort"
        class="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 font-medium text-slate-900 outline-none transition focus:ring-4 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-slate-800"
      >
        <option value="default">Default</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="rating-high">Rating: High to Low</option>
        <option value="title-az">Title: A to Z</option>
      </select>
    </div>

    <div class="flex items-end">
      <div class="w-full rounded-2xl bg-slate-50 p-4 text-sm font-medium text-slate-500 dark:bg-slate-950 dark:text-slate-300">
        Use search, category, and sorting together to quickly find products.
      </div>
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