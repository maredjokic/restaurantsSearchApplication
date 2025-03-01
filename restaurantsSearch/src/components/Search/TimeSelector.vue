<script setup lang="ts">
const timeOptions = Array.from({ length: 9 }, (_, i) => {
  const hour = 12 + i;
  return `${hour.toString().padStart(2, '0')}:00`;
});
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
select {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 150px;
}
</style>
