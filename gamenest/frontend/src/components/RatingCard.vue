<script setup lang="ts">
import type { Avaliacao } from '@/types'
import { defineProps } from 'vue'

const props = defineProps<{
  rating: Avaliacao
}>()
</script>

<template>
  <div class="card mb-3">
    <div class="card-body">
      <p class="card-text">{{ rating.Corpo }}</p>
      <p class="card-text">
        <small class="text-muted">{{ rating.Feedback }}</small>
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>
