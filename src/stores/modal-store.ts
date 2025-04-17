import type { ITask } from '@/types/ITask'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModalStore = defineStore('modal', () => {
  const isOpen = ref(false)
  const purpose = ref('')
  const task = ref<ITask>()

  const open = (newPurpose: string, incomingTask?: ITask): void => {
    purpose.value = newPurpose

    if (incomingTask !== undefined) {
      task.value = incomingTask
    }
    isOpen.value = true
  }
  const close = (): void => {
    isOpen.value = false

    task.value = undefined
  }

  return { isOpen, purpose, task, open, close }
})
