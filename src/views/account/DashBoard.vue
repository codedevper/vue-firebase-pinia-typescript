<template>
  <div>
    <div v-if="$auth.user">
      <h2>Welcome, {{ $auth.user.email }}</h2>
      <button @click="$router.push('/account/profile')">Settings</button>
      <button @click="handleLogout">Logout</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = async () => {
  try {
    await authStore.logout()
    router.push({ name: 'auth-signin' })
  } catch (error) {
    console.error('Logout error:', error)
  }
}
</script>

<style scoped>
/** */
</style>
