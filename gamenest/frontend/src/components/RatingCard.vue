<script setup lang="ts">
import type { Rating } from '@/types'
import { defineProps } from 'vue'

const props = defineProps<{
  rating: Rating
}>()

const getThumbsIconClass = (feedback: boolean) => {
  return feedback ? 'bi-hand-thumbs-up' : 'bi-hand-thumbs-down'
}

const getButtonClass = (feedback: boolean) => {
  return feedback ? 'btn-success' : 'btn-danger'
}
</script>

<template>
  <div class="card mb-3 d-flex flex-row justify-content-between align-items-center">
    <div class="card-body">
      <p class="card-text">{{ props.rating.Feedback }}</p>
      <p class="card-text">
        <small class="text-muted">{{ props.rating.Corpo }}</small>
      </p>
    </div>
    <div class="thumbs-icon">
      <button type="button" :class="`btn ${getButtonClass(props.rating.Feedback)} me-3`">
        <i :class="`bi ${getThumbsIconClass(props.rating.Feedback)} fs-2`"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.thumbs-icon {
  margin-left: 1rem;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem; /* Adjust the size as needed */
  height: 3rem; /* Adjust the size as needed */
  padding: 0;
  border-radius: 0.25rem;
}

.btn i {
  font-size: 1.5rem; /* Adjust the icon size as needed */
}
</style>