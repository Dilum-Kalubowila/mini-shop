<template>
  <div>
    <input
      :value="searchTerm"
      @input="updateSearch"
      type="text"
      placeholder="Search by title, brand, or category..."
      class="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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