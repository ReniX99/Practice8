<script setup lang="ts">
  import { type ITask } from '@/types/ITask'
  import ActionButton from './ActionButton.vue'
  import PriorityTag from './PriorityTag.vue'
  import { useModalStore } from '@/stores/modal-store'
  import { useTasksStore } from '@/stores/tasks-store'
  import { useThemeStore } from '@/stores/theme-store'
  import { storeToRefs } from 'pinia'

  defineProps<{
    task: ITask
  }>()

  const modalStore = useModalStore()
  const tasksStore = useTasksStore()

  const themeStore = useThemeStore()
  const { darkTheme } = storeToRefs(themeStore)
</script>

<template>
  <div
    class="flex h-[280px] flex-col justify-between rounded-xl border-1 border-[#8e948e] p-[12px] shadow-lg"
    :class="{ 'bg-[#d3d2d4]': !task.isActive }"
  >
    <div class="jusitfy-between flex gap-[8px]">
      <div class="flex flex-1 flex-col gap-[10px]">
        <h2
          class="mb-[12px] text-[18px]"
          :class="[darkTheme && task.isActive ? 'text-white' : 'text-[#272729]']"
        >
          {{ task.title }}
        </h2>
        <PriorityTag :priority="task.priority">{{ task.priority }}</PriorityTag>
      </div>
      <div class="flex flex-col gap-[20px]">
        <ActionButton
          v-if="task.isActive"
          @click="modalStore.open('edit', task)"
          :id="task.id"
          purpose="edit"
          class="bg-orange-400"
        />
        <ActionButton v-if="task.isActive" :id="task.id" purpose="delete" class="bg-red-500" />
      </div>
    </div>
    <button
      @click="tasksStore.completeTask(task)"
      class="mt-[20px] rounded-[8px] p-[10px] text-[16px] text-white"
      :class="[
        task.isActive
          ? 'cursor-pointer bg-[#d26eeb] transition hover:scale-102 active:bg-[#a95bbd]'
          : 'cursor-default bg-[#b2afb3]',
      ]"
    >
      {{ task.isActive ? 'Завершить' : 'Завершено' }}
    </button>
  </div>
</template>
