<script setup lang="ts">
import { useSearchStore } from "@/stores/searchStore";

const searchStore = useSearchStore();
</script>

<template>
  <div class="search-results">
    <button @clicl="searchStore.fetchRestaurants" :disabled="searchStore.loading">
      {{ searchStore.loading ? "Loading..." : "Fetch Restaurants" }}
    </button>

    <p v-if="searchStore.error" class="error">{{ searchStore.error }}</p>

    <ul v-if="searchStore.restaurants.length > 0">
      <li v-for="restaurant in searchStore.restaurants" :key="restaurant.slug">
        <h3>{{ restaurant.name }} (Score: {{ restaurant.score }})</h3>
        <p v-if="restaurant.recommended.length > 0">
          Recommended: {{ restaurant.recommended[0].text }} at {{ restaurant.recommended[0].time }}
        </p>
      </li>
    </ul>

    <p v-else>No results found.</p>
  </div>
</template>

<style scoped>
.search-results {
  margin-top: 20px;
}

.error {
  color: red;
}
</style>
