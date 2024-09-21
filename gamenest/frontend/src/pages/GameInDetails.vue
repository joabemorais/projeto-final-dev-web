<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { api, BASE_URL } from '@/api';
import type { ApplicationError } from '@/types'
import { isAxiosError } from 'axios'
import { isApplicationError } from '@/composables/useApplicationError';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import type { Game } from '@/types';

const userStore = useUserStore()

const error = ref<ApplicationError>()
const feedback = ref('')

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

async function addToCart() {
  try {
    const carrinho = userStore.user.carrinho.jogos
    carrinho.push(jogo.value)

    await api.put(`/carrinhos/${userStore.user.carrinho.id}`, 
    {
      data: {jogos: carrinho}
    }, {
      headers: {
        Authorization: `Bearer ${userStore.jwt}`
      }
    })
  }
  catch (e) {
    if (isAxiosError(e) && isApplicationError(e.response?.data)) {
      error.value = e.response?.data
      feedback.value = error.value.error.message
    }
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
                        <button v-if="userStore.user.carrinho.jogos.includes(jogo)" href="#" class="btn btn-success">Adicionado ao carrinho! <i class="bi bi-cart-fill"></i></button>
                        <button v-else @click="addToCart" href="#" class="btn btn-primary">Adicionar ao carrinho <i class="bi bi-cart-fill"></i></button>
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