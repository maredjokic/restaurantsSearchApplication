<script setup lang="ts">
import { useSearchStore } from "@/stores/searchStore";

const searchStore = useSearchStore();
</script>

<template>
  <div class="search-results">
    <div v-if="searchStore.loading && searchStore.restaurants.length === 0">Loading...</div>
    <div v-else-if="searchStore.error">{{ searchStore.error }}</div>
    <div v-else-if="searchStore.restaurants.length === 0">No restaurants found.</div>

    <div v-else class="restaurant-list">
      <div v-for="restaurant in searchStore.restaurants" :key="restaurant.slug" class="restaurant-card">
        <div class="restaurant-details">
          <h3 class="restaurant-name">{{ restaurant.name }} (Score: {{ restaurant.score }})</h3>
          <ul class="recommendations">
            <li v-for="rec in restaurant.recommended" :key="rec.time" class="recommendation-item">
              {{ rec.text }} : {{ rec.time }}
            </li>
          </ul>
        </div>
      </div>
    </div>
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
}

.restaurant-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  width: 500px;
  transition: transform 0.2s;
}

.restaurant-card:hover {
  transform: translateY(-5px);
}

.restaurant-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.restaurant-details {
  padding: 15px;
}

.restaurant-name {
  font-size: 2em;
  margin-bottom: 10px;
}

.recommendations {
  list-style: none;
  padding: 0;
  margin: 0;
}

.recommendation-item {
  background-color: #f8f8f8;
  border-radius: 4px;
  padding: 5px;
  margin-bottom: 5px;
}

@media (max-width: 768px) {
  .restaurant-card {
    width: 100%;
  }
}
</style>
