<script setup lang="ts">
import { useInfiniteScroll } from '@/composables/useInfiniteScroll';
import SearchForm from '@/components/search/SearchForm.vue';
import RestaurantList from "@/components/restaurant/RestaurantList.vue";

useInfiniteScroll();
</script>

<template>
  <SearchForm />
  <RestaurantList />
</template>
