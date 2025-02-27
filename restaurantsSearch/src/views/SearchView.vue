<script setup lang="ts">
import SearchForm from '@/components/SearchForm.vue';

//import { ref } from "vue";
import { useSearchStore } from "@/stores/searchStore";
import RestaurantList from "@/components/RestaurantList.vue";

const searchStore = useSearchStore();

// const date = ref("");
// const time = ref("");
// const size = ref("");

const searchRestaurants = async () => {
  //wait searchStore.createSearchToken(date.value, time.value, size.value);
  await searchStore.fetchRestaurants();
};
</script>

<template>
  <div>
    <h1>Restaurant Search</h1>


    <SearchForm />

    <form @submit.prevent="searchRestaurants">
      <!-- <label>
        Date:
        <input type="text" v-model="date" placeholder="YYYYMMDD" required />
      </label>
      <label>
        Time:
        <input type="text" v-model="time" placeholder="HHMM" required />
      </label>
      <label>
        Size:
        <input type="text" v-model="size" min="1" required />
      </label> -->
      <button type="submit">Search</button>
    </form>

    <RestaurantList />
  </div>
</template>
