<script setup lang="ts">
import { useTimeOptions } from '@/composables/useTimeOptions';

const { timeOptions } = useTimeOptions();
const selectedTime = defineModel<string | null>();
</script>

<template>
  <select v-model="selectedTime">
    <option value="" disabled selected>Time</option>
    <option v-for="time in timeOptions" :key="time" :value="time">
      {{ time }}
    </option>
  </select>
</template>

<style scoped>
</style>
