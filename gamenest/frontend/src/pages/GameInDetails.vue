<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { api, BASE_URL } from '@/api';
import { useRoute } from 'vue-router';
import type { Game } from '@/types';

const route = useRoute()

const jogo = ref({} as Game)
let precoFormatado = ref('')

const fetchGame = async () => {
  try {
    const response = await api.get(`/jogos/${route.params.id}?populate=Capa`)
    jogo.value = response.data.data
    precoFormatado = computed(() => jogo.value.Preco.toFixed(2))
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  fetchGame()
})
</script>

<template>
    <div class="container col-xl-8 my-5">
        <div class="card mb-3">
            <div class="row g-0">
                <div class="col-md-4">
                    <img :src="`${BASE_URL}${jogo.Capa?.url}`" class="img-fluid rounded-start" :alt="`capa do jogo ${jogo.Nome}`">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h2 class="card-title">{{ jogo.Nome }}</h2>
                        <hr>
                        <p class="card-text">{{ jogo.Descricao }}</p>
                        <p class="card-text">Desenvolvedor: {{ jogo.Desenvolvedora }}</p>
                        <p class="card-text">Preço: <span style="color: green; font-weight: bold;">R${{ precoFormatado }}</span></p>
                        <a href="#" class="btn btn-primary">Adicionar ao carrinho <i class="bi bi-cart-fill"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
p {
    font-size: 1.1rem;
}
</style>