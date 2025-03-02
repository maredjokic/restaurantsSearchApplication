<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderBar from "@/components/header/HeaderBar.vue";
import { useAuth } from '@/composables/useAuth';

useAuth();
</script>

<template>
  <HeaderBar />
  <RouterView />
</template>
