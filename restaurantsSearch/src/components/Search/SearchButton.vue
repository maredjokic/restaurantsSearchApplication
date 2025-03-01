<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{ onClick: () => void; loading: boolean }>();
</script>

<template>
  <button @click="onClick" :disabled="loading">
    {{ loading ? "Finding..." : "Find" }}
  </button>
</template>

<style scoped>
button {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #000000;
  color: white;
  cursor: pointer;
  width: 150px;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
