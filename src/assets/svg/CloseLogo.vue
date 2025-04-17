<script setup lang="ts">
  import { useThemeStore } from '@/stores/theme-store'
  import { storeToRefs } from 'pinia'

  const themeStore = useThemeStore()
  const { darkTheme } = storeToRefs(themeStore)
</script>

<template>
  <svg width="32" height="32" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M4.11 2.697L2.698 4.11 6.586 8l-3.89 3.89 1.415 1.413L8 9.414l3.89 3.89 1.413-1.415L9.414 8l3.89-3.89-1.415-1.413L8 6.586l-3.89-3.89z"
      :fill="darkTheme ? '#FFFFFF' : '#000000'"
    />
  </svg>
</template>
