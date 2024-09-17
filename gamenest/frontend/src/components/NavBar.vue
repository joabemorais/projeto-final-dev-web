<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();
</script>

<template>
  <div class="container-fluid px-0">
    <header
      class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom px-2"
    >
      <!-- <a href="/" class="d-inline-flex link-body-emphasis text-decoration-none">
          <svg class="bi" width="40" height="32" role="img" aria-label="Bootstrap">
            <use xlink:href="#bootstrap"></use>
          </svg>
        </a> -->
      <div class="col-md-3 mb-2 mb-md-0">
        <router-link to="/" class="my-auto nome mx-3 no-link-style">
          <h3 class="game-nest-text">GameNest</h3>
        </router-link>
      </div>

      <p>
        <span v-if="userStore.username" class="me-2">
          {{ userStore.username }}
        </span>
      </p>
      <div class="col-md-3 text-end mx-3">
        <button type="button" class="btn btn-outline-primary me-2">Login</button>
        <button type="button" class="btn btn-primary">Sign-up</button>
      </div>
    </header>
  </div>
</template>

<style scoped>
.no-link-style {
  text-decoration: none;
  color: inherit;
  margin: 0;
  padding: 0;
}

.nome {
  font-family: 'Tiny5';
}

.game-nest-text {
  margin: 0;
  padding: 0;
  line-height: 1; /* Adjust line-height if needed */
  display: inline;
}
</style>
