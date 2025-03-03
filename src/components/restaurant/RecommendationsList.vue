<script setup lang="ts">
import { formatTimeStringAddColon } from '@/composables/formatTimeString';

defineProps<{ recommendations: { text: string; time: string }[] }>();
</script>

<template>
  <div class="recommendations">
    <button
      :title="rec.text"
      v-for="rec in recommendations"
      :key="rec.text + rec.time"
      class="recommendation-item">
      {{ formatTimeStringAddColon(rec.time) }} - {{ rec.text }}
    </button>
  </div>
</template>

<style scoped>
.recommendations {
  display: flex;
  flex-direction: row;
  list-style: none;
  padding: 0;
  margin: 10px;
  border-radius: 4px;
  gap: 5px;
  animation: fadeIn 1.5s ease-out;
}

.recommendation-item {
  width: 100px;
  background-color: transparent;
  border-radius: 4px;
  padding: 5px;
  margin: 10px;
  height: 80px;
  width: 120px;
  overflow: clip;
}
</style>
