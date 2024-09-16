<script setup lang="ts">
    import {BASE_URL} from '@/api';
    defineProps(['Nome', 'Preco', 'Capa', 'id']);
</script>

<template>
    <div class="col-12 col-md-6 col-xl-3">
        <div class="card h-100" style="width: 18rem;">
            <router-link :to="`/games/${id}`">
                <img :src="`${BASE_URL}${Capa.url}`" class="card-img-top" :alt="`capa do jogo ${Nome}`">
            </router-link>
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">{{ Nome }}</h5>
                <p class="preco-jogo">R${{ Preco }}</p>
                <a href="#" class="btn btn-primary mt-auto">Comprar</a>
            </div>
        </div>

    </div>
</template>

<style scoped>
    img {
        transition: 0.3s;
    }

    img:hover {
        filter: brightness(120%);
        cursor: pointer;
    }
</style>