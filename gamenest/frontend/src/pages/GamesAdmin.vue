<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { api } from '@/api'
import type { Game } from '@/types'
import GamesAdminTableItem from '@/components/GamesAdminTableItem.vue';

const jogos = ref([] as Game[])

const fetchGames = async () => {
  try {
    const response = await api.get('/jogos?populate=Capa')
    jogos.value = response.data.data
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  fetchGames()
})
</script>

<template>
    <h2 class="my-5 text-center">Lista de Jogos:</h2>
    <div class="tabela">
        <table class="table table-striped">
        <thead>
            <tr>
                <th>id</th>
                <th>Capa</th>
                <th>Jogo</th>
                <th>Preço</th>
                <th>Ação</th>
            </tr>
        </thead>
        <tbody>
            <GamesAdminTableItem v-for="jogo in jogos" :key="jogo.id" :Nome="jogo.Nome" :Preco="jogo.Preco" :Capa="jogo.Capa" :id="jogo.id" />
        </tbody>
        </table>
    </div>
</template>

<style>
.tabela {
    display: flex;
    justify-content: center;
}

.table {
    width: 80%;
    border: 1px solid #dee2e6;
}

tbody {
    border: 1px solid #dee2e6;
}

td, th {
    font-size: 1.1rem;
    vertical-align: middle;
}
</style>