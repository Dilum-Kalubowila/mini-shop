<template>
  <div class="min-h-screen bg-white text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue"
import { RouterView } from "vue-router"
import { useDarkMode } from "./composables/useDarkMode"

const { initTheme } = useDarkMode()

onMounted(() => {
  initTheme()
})
</script>