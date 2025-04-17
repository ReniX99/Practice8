import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWebPushStore = defineStore(
  'web-push',
  () => {
    const isSubscribed = ref<boolean>(false)

    const toggleSubscription = () => {
      isSubscribed.value = !isSubscribed.value
    }

    return { isSubscribed, toggleSubscription }
  },
  { persist: true },
)
