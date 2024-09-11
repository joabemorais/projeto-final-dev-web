<script setup lang="ts">
import {onMounted, ref} from 'vue';
import { api } from '@/api';
import GameCard from './GameCard.vue';
import type {Game} from '@/types';

const jogos = ref([] as Game[]);

const fetchGames = async () => {
    try {
        const response = await api.get('/jogos');
        jogos.value = response.data.data;
        console.log(jogos.value);
    }
    catch (error) {
        console.error(error);
    }
}

onMounted(() => {
    fetchGames();
})
</script>

<template>
    <h1 class="container text-center my-3 my-xl-5">Jogos em destaque</h1>
    <div class="container row mx-auto g-4">    
        <GameCard v-for="jogo in jogos" :title="jogo.title" />
    </div>
</template>