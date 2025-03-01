<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from "vue";
import { useAuthStore } from "@/stores/authStore";
import HeaderBar from "@/components/HeaderBar.vue";

const authStore = useAuthStore();

onMounted(() => {
  if (!authStore.token) {
    authStore.loginAnonymously();
  }
});

</script>

<template>
  <div>
    <HeaderBar />
    <RouterView />
  </div>
</template>

<style scoped></style>
