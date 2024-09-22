<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { api, BASE_URL } from '@/api'
import type { ApplicationError } from '@/types'
import { isAxiosError } from 'axios'
import { isApplicationError } from '@/composables/useApplicationError'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import type { Game, Avaliacao } from '@/types'

import RatingForm from '@/components/RatingForm.vue'
import RatingCard from '@/components/RatingCard.vue'

const error = ref<ApplicationError>()
const feedback = ref('')

const route = useRoute()
const router = useRouter()

const ownedGames = ref([] as Game[])

const jogo = ref({} as Game)
let precoFormatado = ref('')

const avaliacoes = ref<Avaliacao[]>([])
const loading = ref(false)

const userStore = useUserStore()

// const fetchRatings = async () => {
//   try {
//     loading.value = true
//     const response = await api.get(`/avaliacoes?jogo=${route.params.id}`)
//     avaliacoes.value = response.data.data
//   } catch (error) {
//     if (isApplicationError(error.response?.data)) {
//       error.value = error.response?.data as ApplicationError
//     }
//   }
// }

const fetchGame = async () => {
  try {
    const response = await api.get(`/jogos/${route.params.id}?populate=Capa`)
    jogo.value = response.data.data
    precoFormatado = computed(() => jogo.value.Preco.toFixed(2))
  } catch (error) {
    console.error(error)
  }
}

const getOwnedGames = async () => {
  if (!userStore.isAuthenticated) return

  try {
    const { data } = await api.get(`users/${userStore.user.id}/?populate=jogos`, {
      headers: {
        Authorization: `Bearer ${userStore.jwt}`
      }
    })
    ownedGames.value = data.jogos
  } catch (e) {
    if (isAxiosError(e) && isApplicationError(e.response?.data)) {
      error.value = e.response?.data
      feedback.value = error.value.error.message
    }
  }
}

async function addToCart() {
  if (!userStore.isAuthenticated) {
    feedback.value = 'Faça login para adicionar jogos ao carrinho.'
    router.push({ path: '/login', query: { message: feedback.value } })
    return
  }

  try {
    const carrinho = userStore.user.carrinho.jogos
    carrinho.push(jogo.value)

    await api.put(
      `/carrinhos/${userStore.user.carrinho.id}`,
      {
        data: { jogos: carrinho }
      },
      {
        headers: {
          Authorization: `Bearer ${userStore.jwt}`
        }
      }
    )
  } catch (e) {
    if (isAxiosError(e) && isApplicationError(e.response?.data)) {
      error.value = e.response?.data
      feedback.value = error.value.error.message
    }
  }
}

onMounted(() => {
  fetchGame()
  getOwnedGames()
})
</script>

<template>
  <div class="container col-xl-8 my-5">
    <div class="card mb-3">
      <div class="row g-0">
        <div class="col-md-4">
          <img
            :src="`${BASE_URL}${jogo.Capa?.url}`"
            class="img-fluid rounded-start"
            :alt="`capa do jogo ${jogo.Nome}`"
          />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h2 class="card-title">{{ jogo.Nome }}</h2>
            <hr />
            <p class="card-text">{{ jogo.Descricao }}</p>
            <p class="card-text">Desenvolvedor: {{ jogo.Desenvolvedora }}</p>
            <p class="card-text">
              Preço: <span style="color: green; font-weight: bold">R${{ precoFormatado }}</span>
            </p>
            <button
              v-if="
                userStore.isAuthenticated &&
                userStore.user.carrinho.jogos.some((j) => j.id === jogo.id)
              "
              href="#"
              class="btn btn-success"
            >
              Adicionado ao carrinho! <i class="bi bi-cart-fill"></i>
            </button>
            <button
              v-else-if="ownedGames.some((j) => j.id === jogo.id)"
              href="#"
              class="btn btn-secondary"
            >
              Na biblioteca <i class="bi bi-collection"></i>
            </button>
            <button v-else @click="addToCart" href="#" class="btn btn-primary">
              Adicionar ao carrinho <i class="bi bi-cart-fill"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container col-xl-8 my-5">
    <h2>Avaliações</h2>
    <hr />

    <RatingForm :gameId="Number(route.params.id)" :userId="Number(userStore.user.id)" />
    <div v-if="avaliacoes.length" class="mt-4">
      <div v-for="avaliacao in avaliacoes" :key="avaliacao.id">
        <RatingCard :rating="avaliacao" />
      </div>
    </div>
  </div>
</template>

<style scoped>
p {
  font-size: 1.1rem;
}
</style>
