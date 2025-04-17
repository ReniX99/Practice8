<script setup lang="ts">
  import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
  import TaskList from './components/TaskList.vue'
  import ModalWindow from './components/ModalWindow.vue'
  import ArrowButton from './components/ArrowButton.vue'
  import { useModalStore } from './stores/modal-store'
  import { storeToRefs } from 'pinia'
  import { useThemeStore } from './stores/theme-store'
  import DateInput from './components/DateInput.vue'
  import { useDateStore } from './stores/date-store'
  import { useTasksStore } from './stores/tasks-store'
  import { useWebNotification, type UseWebNotificationOptions } from '@vueuse/core'
  import { useWebPushStore } from './stores/web-push-store'

  const tasksStore = useTasksStore()
  const { sortOption, countActiveTasks } = storeToRefs(tasksStore)

  const modalStore = useModalStore()
  const { isOpen: isOpenModal } = storeToRefs(modalStore)

  const themeStore = useThemeStore()
  const { darkTheme } = storeToRefs(themeStore)

  const dateStore = useDateStore()
  const { date } = storeToRefs(dateStore)

  onMounted(async () => {
    const currentDate = new Date().toISOString().split('T')[0]
    date.value = currentDate
  })

  onBeforeUnmount(() => {
    if (intervalId.value) clearInterval(intervalId.value)
  })

  const webPushStore = useWebPushStore()
  const { isSubscribed } = storeToRefs(webPushStore)
  const intervalId = ref<number | null>(null)

  const options: UseWebNotificationOptions = {
    title: 'Важное уведомление',
    body: `У вас есть невыполненные задачи!!!`,
    dir: 'auto',
    lang: 'ru',
    renotify: true,
    tag: 'test',
  }

  watch(isSubscribed, (newValue) => {
    if (newValue) {
      intervalId.value = setInterval(() => {
        const { show } = useWebNotification(options)
        show()
      }, 10000)
    } else {
      if (intervalId.value) {
        clearInterval(intervalId.value)
        intervalId.value = null
      }
    }
  })

  watch(countActiveTasks, (newValue) => {
    if (newValue === 0) {
      if (intervalId.value) {
        clearInterval(intervalId.value)
        intervalId.value = null
      }
    } else {
      if (isSubscribed.value && !intervalId.value) {
        intervalId.value = setInterval(() => {
          const { show } = useWebNotification(options)
          show()
        }, 10000)
      }
    }
  })
</script>

<template>
  <main class="min-h-screen py-[40px]" :class="[darkTheme ? 'bg-[#292727]' : 'bg-white']">
    <div class="mx-auto max-w-[1200px] px-[48px] pb-[40px] sm:px-[32px]">
      <h1
        class="font-roboto mb-[60px] text-center text-3xl"
        :class="[darkTheme ? 'text-white' : 'text-[#292727]']"
      >
        Самый ОБЫЧНЫЙ To-Do List
      </h1>
      <button
        @click="webPushStore.toggleSubscription"
        class="absolute top-[40px] right-[60px] cursor-pointer rounded-[8px] px-[12px] py-[8px] opacity-0 lg:opacity-100"
        :class="[darkTheme ? 'bg-white text-[#292727]' : 'bg-[#292727] text-white']"
      >
        Уведомления {{ isSubscribed ? 'включены' : 'отключены' }}
      </button>
      <section class="relative mb-[40px] flex flex-col items-center gap-[30px]">
        <div class="mx-auto flex items-center gap-[20px]">
          <ArrowButton @click="dateStore.changeDate(-1)" />
          <DateInput v-model:date="date" />
          <ArrowButton class="rotate-180" @click="dateStore.changeDate(1)" />
        </div>
        <button
          @click="modalStore.open('add')"
          class="cursor-pointer rounded-[8px] bg-[#1ce522] px-[12px] py-[8px] text-white transition duration-300 hover:scale-103 active:bg-[#12a617] md:absolute md:left-0"
        >
          Добавить задачу
        </button>
        <select
          v-model="sortOption"
          class="absolute right-0 cursor-pointer rounded-[8px] border-2 border-[#1ce522] px-[12px] py-[9px] text-black focus:outline-none"
        >
          <option value="all">Все</option>
          <option value="active">Активные</option>
          <option value="complete">Завершённые</option>
        </select>
      </section>
      <TaskList />
      <Transition name="modal">
        <ModalWindow v-if="isOpenModal" />
      </Transition>
    </div>
  </main>
</template>

<style>
  .modal-enter-active,
  .modal-leave-active {
    transition: opacity 0.3s ease;
  }

  .modal-enter-from,
  .modal-leave-to {
    opacity: 0;
  }

  input[type='date']::-webkit-calendar-picker-indicator {
    filter: invert(1) brightness(100%) saturate(0%);
  }
</style>
