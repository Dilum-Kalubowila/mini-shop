import { computed, ref } from "vue"

const THEME_STORAGE_KEY = "mini-shop-theme"
const isDark = ref(false)
let initialized = false

function applyTheme(value: boolean) {
  document.documentElement.classList.toggle("dark", value)
}

export function useDarkMode() {
  function initTheme() {
    if (initialized) return

    try {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

      isDark.value = savedTheme ? savedTheme === "dark" : prefersDark
      applyTheme(isDark.value)
      initialized = true
    } catch (error) {
      console.error("Dark mode init error:", error)
    }
  }

  function toggleDarkMode() {
    try {
      isDark.value = !isDark.value
      applyTheme(isDark.value)
      localStorage.setItem(THEME_STORAGE_KEY, isDark.value ? "dark" : "light")
    } catch (error) {
      console.error("Dark mode toggle error:", error)
    }
  }

  return {
    isDark: computed(() => isDark.value),
    initTheme,
    toggleDarkMode
  }
}