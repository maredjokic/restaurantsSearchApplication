<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();
</script>

<template>
  <div>
    <p v-if="authStore.loading">Logging in...</p>
    <p v-else-if="authStore.error">{{ authStore.error }}</p>
    <p v-else-if="authStore.token">Logged in with token!</p>
  </div>
</template>

<style scoped></style>
