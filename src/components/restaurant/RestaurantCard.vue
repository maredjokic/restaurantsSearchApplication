<script setup lang="ts">
import { defineProps } from 'vue';
import type { Restaurant } from '@/types/restaurant';
import { RESTAURANT_CARD_WIDTH } from '@/config/constants';
import { formatTimeStringAddColon } from '@/composables/formatTimeString';

defineProps<{ restaurant: Restaurant }>();
</script>

<template>
  <div class="restaurant-card">
    <div class="restaurant-details">
      <div>
        <h3 class="restaurant-name">{{ restaurant.name }}</h3>
        <h6 class="restaurant-score">Score: ({{ restaurant.score.toFixed(2) }})</h6>
      </div>
      <ul class="recommendations">
        <button :title="rec.text" v-for="rec in restaurant.recommended" :key="restaurant.name + rec.text + rec.time"
          class="recommendation-item">
          {{ formatTimeStringAddColon(rec.time) }} - {{ rec.text }}
        </button>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.restaurant-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  width: v-bind(RESTAURANT_CARD_WIDTH);
  transition: transform 0.2s;
}

.restaurant-card:hover {
  transform: translateY(-5px);
}

.restaurant-details {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 15px;
}

.restaurant-name {
  font-size: 2em;
  margin-bottom: 10px;
}

.restaurant-score {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.recommendations {
  display: flex;
  flex-direction: row;
  list-style: none;
  padding: 0;
  margin: 0;
  border-radius: 4px;
  gap: 5px;
}

.recommendation-item {
  width: 100px;
  background-color: transparent;
  border-radius: 4px;
  padding: 5px;
  margin: 10px;
  height: 80px;
  width: 120px;
  overflow: clip;
}

@media (max-width: 768px) {
  .restaurant-details {
    flex-direction: column;
    align-items: center;
  }

  .restaurant-card {
    width: 100%;
  }
}

.button {
  background: linear-gradient(135deg, #4facfe, #00f2fe);
  color: white;
  font-size: 16px;
  font-weight: bold;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
}
</style>
