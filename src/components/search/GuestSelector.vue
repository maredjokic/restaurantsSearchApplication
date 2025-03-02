<script setup lang="ts">
const guestOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const selectedSize = defineModel<number | null>();
</script>

<template>
  <select v-model="selectedSize">
    <option value="" disabled selected>People</option>
    <option v-for="size in guestOptions" :key="size" :value="size">
      {{ size }}
    </option>
  </select>
</template>

<style scoped>
</style>
