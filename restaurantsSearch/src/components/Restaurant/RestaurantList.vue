<script setup lang="ts">
import { useSearchStore } from "@/stores/searchStore";
import RestaurantCard from "@/components/Restaurant/RestaurantCard.vue";
import ProgressBar from "@/components/Loader/ProgressBar.vue";

const searchStore = useSearchStore();
</script>

<template>
  <div class="search-results">
    <ProgressBar v-if="searchStore.loading && searchStore.restaurants.length === 0" />
    <div v-if="searchStore.loading && searchStore.restaurants.length === 0">Loading...</div>
    <div v-else-if="searchStore.error">{{ searchStore.error }}</div>
    <div v-else-if="searchStore.restaurants.length === 0">No restaurants found.</div>

    <div v-else class="restaurant-list">
      <RestaurantCard v-for="restaurant in searchStore.restaurants" :key="restaurant.slug" :restaurant="restaurant" />
    </div>
    <ProgressBar v-if="searchStore.loading && searchStore.restaurants.length > 0" />
    <div v-if="searchStore.loading && searchStore.restaurants.length > 0">Loading...</div>
  </div>
</template>


<style scoped>
.search-results {
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  align-items: center;
}

.restaurant-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px 15px;
  margin-bottom: 10px;
}
</style>
