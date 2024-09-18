import { useAuthStore } from '@/stores/authStore'

export default {
  install: (app: any) => {
    const authStore = useAuthStore()

    // Add $auth to globalProperties
    app.config.globalProperties.$auth = authStore

    if (authStore.isLoggedIn) {
      authStore.fetchUser()
    }
  }
}
