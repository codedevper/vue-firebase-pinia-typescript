<template>
  <div>
    <div v-if="$auth.user">
      <button @click="$router.back()">Go back</button>
      <h2>Update Profile</h2>
      <UpdateProfile />
      <br />
      <UpdatePhoto />
    </div>
  </div>
</template>

<script lang="ts" setup>
import UpdateProfile from './partials/UpdateProfile.vue'
import UpdatePhoto from './partials/UpdatePhoto.vue'
</script>

<style scoped>
/** */
</style>
