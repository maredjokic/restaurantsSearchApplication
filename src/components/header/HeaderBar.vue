<script setup lang="ts">
import AuthIndicator from './AuthIndicator.vue';
</script>

<template>
  <div class="header-bar">
    <AuthIndicator />
    <img src="/logo.svg" alt="my-logo" />
  </div>
</template>

<style scoped>
.header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f5f5f5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
