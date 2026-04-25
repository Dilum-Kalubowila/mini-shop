import { computed, ref } from "vue"

const THEME_KEY = "theme"
const isDarkState = ref(false)

function applyTheme() {
  document.documentElement.classList.toggle("dark", isDarkState.value)
}

export function useDarkMode() {
  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY)

    if (savedTheme === "dark") {
      isDarkState.value = true
    } else {
      isDarkState.value = false
    }

    applyTheme()
  }

  function toggleDark() {
    isDarkState.value = !isDarkState.value
    localStorage.setItem(THEME_KEY, isDarkState.value ? "dark" : "light")
    applyTheme()
  }

  return {
    isDark: computed(() => isDarkState.value),
    initTheme,
    toggleDark
  }
}