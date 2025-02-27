<script setup lang="ts">
import { ref } from 'vue';
import { useSearchStore } from "@/stores/searchStore";

const searchStore = useSearchStore();

const date = ref("");
const time = ref("");
const size = ref("");

const handleSearch = () => {
  if (!date.value || !time.value || !size.value) {
    alert("Please fill in all fields");
    return;
  }

  searchStore.createSearchToken(date.value, time.value, size.value);
}
</script>


<template>
  <div class="search-form">
    <input v-model="size" type="text" placeholder="Number of Guests" />
    <input v-model="date" type="text" placeholder="YYYYMMDD" />
    <input v-model="time" type="text" placeholder="HHMM" />
    <button @click="handleSearch" :disabled="searchStore.loading">
      {{ searchStore.loading ? "Searching..." : "Search" }}
    </button>

    <p v-if="searchStore.error">{{ searchStore.error }}</p>
    <p v-if="searchStore.searchId">Search ID: {{ searchStore.searchId }}</p>
  </div>
</template>

<style scoped>
.search-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 300px;
}
</style>
