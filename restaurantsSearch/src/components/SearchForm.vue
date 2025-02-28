<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useSearchStore } from "@/stores/searchStore";

const searchStore = useSearchStore();

const date = ref("20250228");
const time = ref("2000");
const size = ref("2");

const handleSearch = async () => {
  if (!date.value || !time.value || !size.value) {
    alert("Please fill in all fields");
    return;
  }

  await searchStore.createSearchToken(date.value, time.value, size.value);
  await searchStore.fetchRestaurants();
}

const handleScroll = () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
    searchStore.fetchRestaurants();
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});
</script>


<template>
  <div class="search-form">
    <input v-model="size" type="text" placeholder="Number of Guests" />
    <input v-model="date" type="text" placeholder="YYYYMMDD" />
    <input v-model="time" type="text" placeholder="HHMM" />
    <button @click="handleSearch" :disabled="searchStore.loading">
      {{ searchStore.loading ? "Finding..." : "Find" }}
    </button>

    <p v-if="searchStore.error">{{ searchStore.error }}</p>
    <!-- <p v-if="searchStore.searchId">Search ID: {{ searchStore.searchId }}</p> -->
  </div>
</template>

<style scoped>
.search-form {
  background-color: #cce6ff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  height: 250px;
  width: 100%;
}
</style>
