<script setup lang="ts">
  import { useTasksStore } from '@/stores/tasks-store'
  import TaskElement from './TaskElement.vue'
  import { vAutoAnimate } from '@formkit/auto-animate'

  const store = useTasksStore()
</script>

<template>
  <div
    class="grid grid-cols-1 gap-[48px] sm:grid-cols-2 sm:gap-[30px] lg:grid-cols-3 xl:grid-cols-4"
    v-auto-animate
  >
    <TaskElement v-for="task in store.currentDateTasks" :key="task.id" :task="task" />
  </div>
</template>
