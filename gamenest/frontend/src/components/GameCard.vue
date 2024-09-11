<script setup lang="ts">
import type {Game} from '@/types';
import { BASE_URL } from '@/api';
defineProps<Game>();

</script>

<template>
    <div class="col-12 col-md-6 col-xl-3">
        <div class="card" style="width: 18rem;">
            <img :src="`${BASE_URL}${Capa.url}`" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title">{{ Nome }}</h5>
                <p class="card-text"></p>
                <p class="preco-jogo">R${{ Preco }}</p>
                <a href="#" class="btn btn-primary">Comprar</a>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .card {
        cursor: pointer;
    }

    img {
        transition: 0.3s;
    }

    img:hover {
        filter: brightness(120%);
    }
</style>