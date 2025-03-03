<script setup lang="ts">
import { defineProps } from 'vue';
import type { Restaurant } from '@/types/restaurant';

defineProps<{ restaurant: Restaurant }>();
</script>

<template>
  <div class="restaurant-details">
    <div>
      <div class="restaurant-name">{{ restaurant.name }}</div>
      <div class="restaurant-score">Score: ({{ restaurant.score.toFixed(2) }})</div>
    </div>
  </div>
</template>

<style scoped>
.restaurant-details {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 15px;
  animation: fadeIn 1.5s ease-out;
}

.restaurant-name {
  font-size: 2em;
  margin-bottom: 10px;
}

.restaurant-score {
  font-size: 1.5em;
  margin-bottom: 10px;
}

</style>
