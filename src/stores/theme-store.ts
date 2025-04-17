import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore(
  'theme',
  () => {
    const darkTheme = ref(false)

    function toggleTheme() {
      darkTheme.value = !darkTheme.value
    }

    return { darkTheme, toggleTheme }
  },
  { persist: true },
)
