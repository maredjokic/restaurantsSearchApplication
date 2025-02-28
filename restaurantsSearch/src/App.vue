<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted, useTemplateRef } from "vue";
import { useAuthStore } from "@/stores/authStore";

const el = useTemplateRef<HTMLElement>('el');

const authStore = useAuthStore();

onMounted(() => {
  if (!authStore.token) {
    authStore.loginAnonymously();
    console.log(authStore);
  }
});

</script>

<template>
  <div ref="el">
    <div class="wrapper">
      <p v-if="authStore.loading">Logging in...</p>
      <p v-else-if="authStore.error">{{ authStore.error }}</p>
      <p v-else-if="authStore.token">Logged in with token!</p>
    </div>

    <RouterView />
  </div>
</template>

<style scoped></style>
