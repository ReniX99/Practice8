<script setup lang="ts">
  import DeleteLogo from '@/assets/svg/DeleteLogo.vue'
  import EditLogo from '@/assets/svg/EditLogo.vue'
  import { useTasksStore } from '@/stores/tasks-store'

  const props = defineProps<{
    id: number
    purpose: string
  }>()

  async function clickAction() {
    if (props.purpose === 'delete') {
      const store = useTasksStore()

      await store.deleteTask(props.id)
    }
  }
</script>

<template>
  <button
    @click="clickAction"
    class="cursor-pointer rounded-[8px] p-[2px] transition-transform hover:scale-105"
  >
    <EditLogo v-if="purpose === 'edit'" />
    <DeleteLogo v-else-if="purpose === 'delete'" />
  </button>
</template>
