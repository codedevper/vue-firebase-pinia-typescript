<template>
  <div>
    <h1>Sign Up</h1>
    <div v-if="errorMessage">{{ errorMessage }}</div>
    <form @submit.prevent="handleRegister">
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const email = ref<string>('')
const password = ref<string>('')
const errorMessage = ref<string | null>(null)

const handleRegister = async () => {
  try {
    await authStore.register(email.value, password.value)
    router.push({ name: 'account' })
  } catch (error: any) {
    console.error('Login error:', error)
    switch (error.code) {
      case 'auth/invalid-email':
        errorMessage.value = 'Invalid email'
        break
      case 'auth/missing-password':
        errorMessage.value = 'Missing password.'
        break
      case 'auth/email-already-in-use':
        errorMessage.value = 'Email already in use'
        break
      case 'auth/weak-password':
        errorMessage.value = 'Password should be at least 6 characters'
        break
      case 'auth/internal-error':
        errorMessage.value = 'Internal Error'
        break
      default:
        errorMessage.value = 'Something went wrong.'
        break
    }
  }
}
</script>

<style scoped>
/** */
</style>
