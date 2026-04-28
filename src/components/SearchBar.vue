<template>
  <div class="relative">
    <span class="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-lg">
      🔎
    </span>

    <input
      :value="searchTerm"
      @input="updateSearch"
      type="text"
      placeholder="Search products, brands, or categories..."
      class="w-full rounded-3xl border border-slate-200 bg-white px-5 py-4 pl-14 text-slate-900 outline-none shadow-sm transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-slate-800"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  searchTerm: string
}>()

const emit = defineEmits<{
  (e: "update:searchTerm", value: string): void
}>()

function updateSearch(event: Event) {
  const target = event.target as HTMLInputElement
  emit("update:searchTerm", target.value)
}
</script>