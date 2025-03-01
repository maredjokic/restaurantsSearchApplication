<script setup lang="ts">
const dateOptions = Array.from({ length: 7 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() + i);
  return date.toISOString().split('T')[0];
});
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
select {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 150px;
}
</style>
