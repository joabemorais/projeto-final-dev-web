<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
const userStore = useUserStore();
</script>

<template>
  <div class="container-fluid px-0">
    <header
      class="d-flex flex-wrap align-items-center justify-content-between py-3 mb-4 border-bottom px-2">
      <div class="col-md-3 ms-3 d-flex">
        <router-link to="/" class="nome mx-3 no-link-style">
          <h3 class="game-nest-text">GameNest</h3>
        </router-link>
      </div>

      <div v-if="userStore.username==''" class="col-md-3 text-end mx-3">
        <button type="button" class="btn btn-outline-primary me-2">Login</button>
        <button type="button" class="btn btn-primary">Sign-up</button>
      </div>

      <div v-else class="col-md-3 text-end me-3 d-flex justify-content-end align-items-center">
        <span style="font-size: 1.1rem;">{{ userStore.username }}</span>

        <!-- Utilizando o ícone de triângulo existente -->
        <div class="dropdown ms-1">
          <div
            class="drop-button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="bi bi-caret-down-fill"></i>
          </div>
          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
            <li><a class="dropdown-item" href="#"><i class="bi bi-person"></i> Perfil</a></li>
            <li><a class="dropdown-item" href="#"><i class="bi bi-collection"></i> Biblioteca</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#"><i class="bi bi-box-arrow-right"></i> Logout</a></li>
          </ul>
        </div>
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
  padding-top: 5px;
}

.game-nest-text {
  margin: 0;
  padding: 0;
  line-height: 1;
  display: inline;
}

.drop-button {
  cursor: pointer;
  padding-top: 4px;
}

.dropdown-menu {
  min-width: 150px; /* Tamanho customizado */
  max-width: 250px; /* Para não ficar grande demais */
  font-size: 1rem; /* Tamanho do texto */
}
</style>
