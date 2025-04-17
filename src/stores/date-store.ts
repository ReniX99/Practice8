import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDateStore = defineStore(
  'date',
  () => {
    const date = ref<string>('')

    const changeDate = (step: number) => {
      const tempDate = new Date(date.value)
      tempDate.setDate(tempDate.getDate() + step)

      date.value = tempDate.toISOString().split('T')[0]
    }

    return { date, changeDate }
  },
  { persist: true },
)
