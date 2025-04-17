<script setup lang="ts">
  import VueDatePicker from '@vuepic/vue-datepicker'
  import '@vuepic/vue-datepicker/dist/main.css'
  import { useThemeStore } from '@/stores/theme-store'
  import { formatDate } from '@/utils/format-date'
  import { storeToRefs } from 'pinia'

  const themeStore = useThemeStore()
  const { darkTheme } = storeToRefs(themeStore)

  const date = defineModel<string>('date')
</script>

<template>
  <VueDatePicker
    v-model="date"
    locale="ru"
    cancel-text="Отмена"
    select-text="Выбрать"
    :format="formatDate"
    :dark="darkTheme"
    :clearable="false"
    model-type="yyyy-MM-dd"
    class="text-[20px]"
  />
</template>
