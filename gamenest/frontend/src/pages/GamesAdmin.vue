<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { api } from '@/api'
import type { Game } from '@/types'
import GamesAdminTableItem from '@/components/GamesAdminTableItem.vue';

const jogos = ref([] as Game[])

const gameToDelete = ref<Game | undefined>(undefined)

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

function askDeleteGame(id: number) {
    gameToDelete.value = jogos.value.find(jogo => jogo.id === id)
}

function close() {
    gameToDelete.value = undefined
}
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
                <GamesAdminTableItem v-for="jogo in jogos" :key="jogo.id" :Nome="jogo.Nome" :Preco="jogo.Preco"
                    :Capa="jogo.Capa" :id="jogo.id" @delete="askDeleteGame" />
            </tbody>
        </table>
    </div>

    <div v-if="gameToDelete" class="modal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Deletar jogo</h5>
                </div>
                <div class="modal-body">
                    <p>Você tem certeza que deseja remover "<strong>{{ gameToDelete.Nome }}</strong>"?</p>
                </div>
                <div class="modal-footer">
                    <button @click="close" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Não</button>
                    <button type="button" class="btn btn-danger">Sim</button>
                </div>
            </div>
        </div>
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

    td,
    th {
        font-size: 1.1rem;
        vertical-align: middle;
    }

    .modal {
        display: block;
        position: fixed;
        z-index: 1050;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);
    }
</style>