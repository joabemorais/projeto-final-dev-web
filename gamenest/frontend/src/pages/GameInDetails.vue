<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { api, BASE_URL } from '@/api'
import { useRoute } from 'vue-router'
import type { Game, ApplicationError, Avaliacao } from '@/types'
import { isApplicationError } from '@/composables/useApplicationError'
import RatingForm from '@/components/RatingForm.vue'
import RatingCard from '@/components/RatingCard.vue'
import { useUserStore } from '@/stores/userStore'

const route = useRoute()

const jogo = ref({} as Game)
let precoFormatado = ref('')

const avaliacoes = ref<Avaliacao[]>([])
const error = ref<ApplicationError>()
const loading = ref(false)

const userStore = useUserStore()
console.log(userStore.jwt)

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

onMounted(() => {
  fetchGame()
  // fetchRatings()
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
            <a href="#" class="btn btn-primary"
              >Adicionar ao carrinho <i class="bi bi-cart-fill"></i
            ></a>
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
