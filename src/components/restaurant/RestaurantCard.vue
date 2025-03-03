<script setup lang="ts">
import { defineProps } from 'vue';
import type { Restaurant } from '@/types/restaurant';
import RestaurantDetails from '@/components/restaurant/RestaurantDetails.vue';
import RecommendationsList from '@/components/restaurant/RecommendationsList.vue';
import { RESTAURANT_CARD_WIDTH } from '@/config/constants';

defineProps<{ restaurant: Restaurant }>();
</script>

<template>
  <div class="restaurant-card">
    <RestaurantDetails :restaurant="restaurant" />
    <RecommendationsList :recommendations="restaurant.recommended" />
  </div>
</template>

<style scoped>
.restaurant-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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

@media (max-width: 768px) {
  .restaurant-card {
    flex-direction: column;
    align-items: center;
  }

  .restaurant-card {
    width: 100%;
  }
}
</style>
