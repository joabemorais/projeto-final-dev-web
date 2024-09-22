<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { api } from '@/api'
import { useUserStore } from '@/stores/userStore'
import GameCardLibrary from '@/components/GameCardLibrary.vue'
import type { Game } from '@/types'

const userStore = useUserStore();
const jogos = ref([] as Game[])

const fetchGames = async () => {
  try {
    const {data} = await api.get(`/users/${userStore.user.id}`, {
      headers: {
        Authorization: `Bearer ${userStore.jwt}`
      },
      params: {
        populate: {
          jogos: {
            populate: 'Capa'
          }
        }
      }
    })
    jogos.value = data.jogos
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  fetchGames()
})
</script>

<template>
  <h1 class="container text-center my-3 my-xl-5">Seus jogos</h1>
  <div class="container row mx-auto g-4 my-4">
    <GameCardLibrary
      v-for="jogo in jogos"
      :Nome="jogo.Nome"
      :Preco="jogo.Preco"
      :Capa="jogo.Capa"
      :id="jogo.id"
    />
  </div>
</template>
