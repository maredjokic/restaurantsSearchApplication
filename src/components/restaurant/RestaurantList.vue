<script setup lang="ts">
import { computed } from "vue";
import { useSearchStore } from "@/stores/searchStore";
import RestaurantCard from "@/components/restaurant/RestaurantCard.vue";
import ProgressBar from "@/components/loader/ProgressBar.vue";

const searchStore = useSearchStore();

const isInitialLoading = computed(() => searchStore.loading && searchStore.restaurants.length === 0);
const isFetchingMore = computed(() => searchStore.loading && searchStore.restaurants.length > 0);
const isError = computed(() => searchStore.error);
const noResults = computed(() => !searchStore.loading && searchStore.restaurants.length === 0 && searchStore.searchId !== null);
const isInitialState = computed(() => searchStore.searchId === null && searchStore.restaurants.length === 0 && !searchStore.loading);
</script>

<template>
  <div class="search-results">
    <div v-if="isError">{{ searchStore.error }}</div>

    <div v-else-if="noResults">No restaurants found.</div>

    <div v-else-if="isInitialState">Start your search to see results!</div>

    <div v-else class="restaurant-list">
      <RestaurantCard v-for="restaurant in searchStore.restaurants" :key="restaurant.slug" :restaurant="restaurant" />
    </div>

    <div v-if="isInitialLoading || isFetchingMore">
      <ProgressBar />
      <p>Loading...</p>
    </div>
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
  gap: 15px;
  margin-bottom: 10px;
}
</style>
