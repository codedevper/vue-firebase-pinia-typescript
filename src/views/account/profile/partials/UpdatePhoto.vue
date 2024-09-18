<template>
  <div>
    <form>
      <div>
        <img :src="`${photoURL}`" style="height: 150px" />
        <br />
        <input type="file" @change="onFileSelected" />
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useAccountStore } from '@/stores/accountStore'
import { useUploadAvatarImage } from '@/composables/useUploadAvatarImage'

const accountStore = useAccountStore()
const { uploadAvatarImage } = useUploadAvatarImage()

const photoURL = ref<string | null>(null)

const onFileSelected = async (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    const downloadURL = await uploadAvatarImage(file)

    if (downloadURL) {
      console.log('Image uploaded successfully:', downloadURL)
      await accountStore.updateUserPhoto(downloadURL)
      photoURL.value = downloadURL
    } else {
      console.error('Failed to upload image')
    }
  }
}

onMounted(() => {
  photoURL.value = accountStore.photoURL
})
</script>

<style scoped>
/** */
</style>
