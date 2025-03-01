<script setup lang="ts">
import { ref } from 'vue';
import { useSearchStore } from "@/stores/searchStore";

const searchStore = useSearchStore();

const guestOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const dateOptions = Array.from({ length: 7 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() + i);
  return date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
});

// Opcije za vreme (primer: svakih sat vremena od 12:00 do 20:00)
const timeOptions = Array.from({ length: 9 }, (_, i) => {
  const hour = 12 + i;
  return `${hour.toString().padStart(2, '0')}:00`; // Format: HH:MM
});

// Reaktivne promenljive za odabrane vrednosti
const selectedSize = ref<number | null>(null);
const selectedDate = ref<string | null>(null);
const selectedTime = ref<string | null>(null);

const handleSearch = async () => {
  if (!selectedSize.value || !selectedDate.value || !selectedTime.value) {
    alert("Please fill in all fields!");
    return;
  }

  await searchStore.createSearchToken(
    selectedDate.value.replace(/-/g, ''),
    selectedTime.value.replace(':', ''),
    selectedSize.value.toString()
  );
  await searchStore.fetchRestaurants();
};
</script>

<template>
  <div class="search-form">
    <select v-model="selectedSize">
      <option value="" disabled selected>People</option>
      <option v-for="size in guestOptions" :key="size" :value="size">
        {{ size }}
      </option>
    </select>

    <select v-model="selectedDate">
      <option value="" disabled selected>Date</option>
      <option v-for="date in dateOptions" :key="date" :value="date">
        {{ date }}
      </option>
    </select>

    <select v-model="selectedTime">
      <option value="" disabled selected>Time</option>
      <option v-for="time in timeOptions" :key="time" :value="time">
        {{ time }}
      </option>
    </select>

    <button @click="handleSearch" :disabled="searchStore.loading">
      {{ searchStore.loading ? "Finding..." : "Find" }}
    </button>

    <p v-if="searchStore.error">{{ searchStore.error }}</p>
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

select,
button {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  background-color: #000000;
  color: white;
  cursor: pointer;
  width: 100px;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .search-form {
    flex-direction: column;
  }
}
</style>
