<template>
  <div>
    <form @submit.prevent="updateUserProfile">
      <div>
        <label for="displayName">Display Name</label>
        <input v-model="displayName" type="text" id="displayName" />
      </div>
      <button type="submit">Update</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useAccountStore } from '@/stores/accountStore'

const accountStore = useAccountStore()

const displayName = ref<string | null>(null)
//const errorMessage = ref<string | null>(null)

const updateUserProfile = async () => {
  try {
    await accountStore.updateUserProfile(displayName.value)
  } catch (error: any) {
    console.error('Update Profile error:', error)
  }
}

onMounted(() => {
  displayName.value = accountStore.displayName
})
</script>

<style scoped>
/** */
</style>
