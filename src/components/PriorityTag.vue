<script setup lang="ts">
  function getClasses(priority: string): string {
    switch (priority) {
      case 'Высокий':
        return 'bg-red-500'
      case 'Средний':
        return 'bg-orange-400'
      case 'Низкий':
        return 'bg-lime-400'
    }

    return ''
  }

  defineProps<{
    priority: string
  }>()
</script>

<template>
  <p :class="getClasses(priority)" class="w-max rounded-[4px] px-[10px] py-[1px] text-[16px]">
    <slot></slot>
  </p>
</template>
