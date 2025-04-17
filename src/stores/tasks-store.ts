import type { ITask } from '@/types/ITask'
import { defineStore, storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useDateStore } from './date-store'

export const useTasksStore = defineStore(
  'tasks',
  () => {
    const tasks = ref<ITask[]>([])
    const sortOption = ref<string>('all')

    const dateStore = useDateStore()
    const { date } = storeToRefs(dateStore)

    const currentDateTasks = computed(() => {
      const todayTasks = tasks.value.filter((t) => t.date === date.value)

      switch (sortOption.value) {
        case 'all':
          return todayTasks.sort((a, b) => Number(b.isActive) - Number(a.isActive))

        case 'active':
          return todayTasks.filter((t) => t.isActive === true)

        case 'complete':
          return todayTasks.filter((t) => t.isActive === false)

        default:
          return todayTasks.sort((a, b) => Number(b.isActive) - Number(a.isActive))
      }
    })

    const countActiveTasks = computed(() => {
      return tasks.value.filter((t) => t.isActive === true && t.date === date.value).length
    })

    async function addTask(newTask: ITask) {
      let id: number

      if (tasks.value.length === 0) {
        id = 0
      } else {
        id = tasks.value[tasks.value.length - 1].id + 1
      }

      newTask.id = id
      tasks.value.push(newTask)
    }

    async function editTask(editableTask: ITask) {
      tasks.value[tasks.value.findIndex((t) => t.id === editableTask.id)] = editableTask
    }

    async function deleteTask(id: number) {
      tasks.value.splice(
        tasks.value.findIndex((t) => t.id === id),
        1,
      )
    }

    async function completeTask(editableTask: ITask) {
      if ((editableTask.isActive = false)) return

      editableTask.isActive = false
      await editTask(editableTask)
    }

    return {
      tasks,
      currentDateTasks,
      sortOption,
      countActiveTasks,
      addTask,
      editTask,
      deleteTask,
      completeTask,
    }
  },
  { persist: true },
)
