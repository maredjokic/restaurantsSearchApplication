<script setup lang="ts">
import { useDateOptions } from '@/composables/useDateOptions';

const { dateOptions } = useDateOptions();
const selectedDate = defineModel<string | null>();
</script>

<template>
  <select v-model="selectedDate">
    <option value="" disabled selected>Date</option>
    <option v-for="date in dateOptions" :key="date" :value="date">
      {{ date }}
    </option>
  </select>
</template>

<style scoped>
</style>

