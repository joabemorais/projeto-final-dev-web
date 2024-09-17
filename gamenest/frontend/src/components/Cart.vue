<script setup lang="ts">
import { ref, computed } from 'vue';
import { onMounted } from 'vue';
import { api } from '@/api';
import CartItem from './CartItem.vue';
import type { Game } from '@/types'

const jogos = ref([] as Game[])

const precoFinal = ref(0)
const precoFormatado = computed(() => precoFinal.value.toFixed(2))

const fetchGames = async () => {
  try {
    const response = await api.get('/jogos?populate=Capa')
    jogos.value = response.data.data
    precoFinal.value = total()
  } catch (error) {
    console.error(error)
  }
}
onMounted(() => {
  fetchGames()
})

function total() {
    let total = 0
    jogos.value.forEach(jogo => {
        total += jogo.Preco
    })
    return total
}

function remove(id: number) {
    jogos.value = jogos.value.filter(jogo => jogo.id !== id)
    precoFinal.value = total()
}
</script>

<template>
    <h2 class="my-5 text-center">Carrinho de Compras</h2>
    <div class="geral">
        <div class="cart">
            <CartItem v-for="jogo in jogos" :Nome="jogo.Nome" :Preco="jogo.Preco" :Capa="jogo.Capa" :id="jogo.id" @remove="remove"/>
        </div>
        <div class="cart-review">
            <h5>Resumo</h5>
            <p>Total estimado: <span style="font-weight: bold; color: green;">R${{ precoFormatado }}</span></p>
            <button type="button" class="btn btn-primary w-100">Realizar pagamento</button>
        </div>
    </div>
    
</template>

<style>
    .geral {
        display: flex;
        justify-content: center;
        gap: 3rem;
    }

    .cart {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1rem;
    }

    .cart-review {
        border: 1px solid rgb(219, 219, 219);
        border-radius: 5px;
        width: 300px;
        height: fit-content;
        padding: 15px;
    }

</style>