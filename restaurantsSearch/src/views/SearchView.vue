<script setup lang="ts">
import { onMounted } from 'vue';
import { useSearchStore } from "@/stores/searchStore";
import SearchForm from '@/components/Search/SearchForm.vue';
import RestaurantList from "@/components/Restaurant/RestaurantList.vue";

const searchStore = useSearchStore();

const handleScroll = () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
    if (!searchStore.loading) {
      searchStore.fetchRestaurants();
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});
</script>

<template>
  <div>
    <SearchForm />
    <RestaurantList />
  </div>
</template>
