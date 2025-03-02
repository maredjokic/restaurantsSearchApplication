<script setup lang="ts">
import { ref } from 'vue';
import { useSearch } from "@/composables/useSearch";
import GuestSelector from './GuestSelector.vue';
import DateSelector from './DateSelector.vue';
import TimeSelector from './TimeSelector.vue';
import SearchButton from './SearchButton.vue';
import { useSearchStore } from '@/stores/searchStore';

const searchStore = useSearchStore();
const { searchRestaurants, error } = useSearch();
const selectedSize = ref<number | null | undefined>(null);
const selectedDate = ref<string | null | undefined>(null);
const selectedTime = ref<string | null | undefined>(null);

const handleSearch = async () => {
  searchRestaurants(selectedDate.value, selectedTime.value, selectedSize.value);
};
</script>

<template>
  <div class="search-form">
    <GuestSelector v-model="selectedSize" />
    <DateSelector v-model="selectedDate" />
    <TimeSelector v-model="selectedTime" />
    <SearchButton :onClick="handleSearch" :loading="searchStore.loading" />
    <p v-if="error">{{ error }}</p>
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
  padding: 20px;
  height: 250px;
  width: 100%;
}

@media (max-width: 768px) {
  .search-form {
    flex-direction: column;
  }
}
</style>
