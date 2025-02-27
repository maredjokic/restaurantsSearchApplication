<script setup lang="ts">
import { useSearchStore } from "@/stores/searchStore";

const searchStore = useSearchStore();
</script>

<template>
  <div>
    <div v-if="searchStore.loading">Loading...</div>
    <div v-else-if="searchStore.error">{{ searchStore.error }}</div>
    <div v-else-if="searchStore.restaurants.length === 0">No restaurants found.</div>

    <ul v-else>
      <li v-for="restaurant in searchStore.restaurants" :key="restaurant.slug">
        <h3>{{ restaurant.name }} (Score: {{ restaurant.score }})</h3>
        <ul>
          <li v-for="rec in restaurant.recommended" :key="rec.time">
            {{ rec.text }} at {{ rec.time }}
          </li>
        </ul>
      </li>
    </ul>

    <button v-if="searchStore.restaurants.length < searchStore.total" @click="searchStore.fetchRestaurants()">
      Load More
    </button>
  </div>
</template>


<style scoped></style>
