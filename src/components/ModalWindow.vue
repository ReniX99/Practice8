<script setup lang="ts">
  import CloseLogo from '@/assets/svg/CloseLogo.vue'
  import { useModalStore } from '@/stores/modal-store'
  import { useTasksStore } from '@/stores/tasks-store'
  import { useThemeStore } from '@/stores/theme-store'
  import type { ITask } from '@/types/ITask'
  import { storeToRefs } from 'pinia'
  import { ref } from 'vue'
  import DateInput from './DateInput.vue'
  import { useWebNotification, type UseWebNotificationOptions } from '@vueuse/core'
  import { useWebPushStore } from '@/stores/web-push-store'

  const modalStore = useModalStore()
  const { purpose, task: incomingTask } = storeToRefs(modalStore)

  const formData = ref({
    title: modalStore.task?.title || '',
    date: modalStore.task?.date || '',
    priority: modalStore.task?.priority || '',
  })

  async function handleForm() {
    if (formData.value.title === '' || formData.value.date === '' || formData.value.priority === '')
      return

    const tasksStore = useTasksStore()

    if (modalStore.purpose === 'add') {
      const newTask: ITask = {
        id: 0,
        isActive: true,
        ...formData.value,
      }

      await tasksStore.addTask(newTask)

      const webPushStore = useWebPushStore()
      const { isSubscribed } = storeToRefs(webPushStore)

      if (isSubscribed.value) {
        const options: UseWebNotificationOptions = {
          title: 'Новая задача',
          body: `${formData.value.title}\nДата выполнения: ${formData.value.date}`,
          dir: 'auto',
          lang: 'ru',
          renotify: true,
          tag: 'test',
        }

        const { show } = useWebNotification(options)
        show()
      }
    } else if (modalStore.purpose === 'edit') {
      if (incomingTask.value === undefined) return

      const editTask: ITask = {
        id: incomingTask.value.id,
        isActive: incomingTask.value.isActive,
        ...formData.value,
      }

      await tasksStore.editTask(editTask)
    }

    modalStore.close()

    formData.value = {
      title: '',
      date: '',
      priority: '',
    }
  }

  const themeStore = useThemeStore()
  const { darkTheme } = storeToRefs(themeStore)
</script>

<template>
  <div class="fixed inset-0 z-10 bg-[rgba(0,0,0,0.2)] px-[20px]">
    <div
      class="mx-auto mt-[40px] w-[320px] rounded-[8px] shadow-lg sm:w-[480px]"
      :class="[darkTheme ? 'bg-[#272729] text-white' : 'bg-white text-[#272729]']"
    >
      <div class="flex justify-end border-b-2 border-[rgba(0,0,0,0.1)] p-[8px] sm:p-[4px]">
        <button
          @click="modalStore.close"
          class="cursor-pointer transition-transform hover:scale-110"
        >
          <CloseLogo />
        </button>
      </div>
      <h2 class="mt-[10px] text-center text-[24px]">
        {{ purpose === 'add' ? 'Новая задача' : 'Редактировать' }}
      </h2>
      <form class="mt-[20px] flex flex-col gap-[40px] px-[20px]">
        <div class="flex flex-col gap-[6px]">
          <label for="title">Название</label>
          <input
            v-model="formData.title"
            type="text"
            name="title"
            class="rounded-[6px] border-1 border-[#8e948e] p-[4px] text-[18px]"
          />
        </div>
        <div class="flex flex-col justify-between gap-[40px] sm:flex-row sm:items-center">
          <div class="flex flex-col gap-[6px] sm:flex-1/2">
            <label for="date">Дата</label>
            <DateInput v-model="formData.date" />
          </div>
          <div class="flex flex-col gap-[6px] sm:flex-1/2">
            <label for="priotity">Приоритет</label>
            <select
              v-model="formData.priority"
              type="date"
              name="priority"
              class="rounded-[6px] border-1 border-[#8e948e] p-[4px] text-[18px]"
            >
              <option class="text-[#272729]" value="Высокий">Высокий</option>
              <option class="text-[#272729]" value="Средний">Средний</option>
              <option class="text-[#272729]" value="Низкий">Низкий</option>
            </select>
          </div>
        </div>
        <button
          @click.prevent="handleForm"
          class="mx-auto my-[30px] w-[200px] cursor-pointer rounded-[6px] bg-[#1ce522] p-[8px] text-white transition-transform hover:scale-102 active:bg-[#12a617]"
        >
          {{ purpose === 'add' ? 'Создать' : 'Редактировать' }}
        </button>
      </form>
    </div>
  </div>
</template>
