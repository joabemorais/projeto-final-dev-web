<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { api } from '@/api'
import { useUserStore } from '@/stores/userStore'
import type { ApplicationError } from '@/types'
import { isAxiosError } from 'axios'
import { isApplicationError } from '@/composables/useApplicationError'
import CartItem from '@/components/CartItem.vue'
import type { Game } from '@/types'

const userStore = useUserStore()

const error = ref<ApplicationError>()
const feedback = ref('')

const cartId = ref(0)
const jogos = ref([] as Game[])

const precoFinal = ref(0)
const precoFormatado = computed(() => precoFinal.value.toFixed(2))

console.log(userStore.jwt)

const fetchGames = async () => {
  try {
    const { data } = await api.get('/users/me', {
      headers: {
        Authorization: `Bearer ${userStore.jwt}`
      },
      params: {
        populate: {
          carrinho: {
            populate: {
              jogos: {
                populate: 'Capa'
              }
            }
          }
        }
      }
    })

    cartId.value = data.carrinho.id
    jogos.value = data.carrinho.jogos

    precoFinal.value = total()
  } catch (e) {
    if (isAxiosError(e) && isApplicationError(e.response?.data)) {
      error.value = e.response?.data
      feedback.value = error.value.error.message
    }
  }
}
onMounted(() => {
  fetchGames()
})

function total() {
  let total = 0
  jogos.value.forEach((jogo) => {
    total += jogo.Preco
  })
  return total
}

function remove(id: number) {
  try {
    jogos.value = jogos.value.filter((jogo) => jogo.id !== id)

    const newCart = {
      data: {
        jogos: jogos.value
      }
    }

    api.put(`/carrinhos/${cartId.value}`, newCart, {
      headers: {
        Authorization: `Bearer ${userStore.jwt}`
      }
    })

    precoFinal.value = total()
  } catch (e) {
    if (isAxiosError(e) && isApplicationError(e.response?.data)) {
      error.value = e.response?.data
      feedback.value = error.value.error.message
    }
  }
}
</script>

<template>
  <div v-if="feedback" class="d-flex justify-content-center">
    <div
      class="col-4 alert alert-dismissible fade show"
      :class="{ 'alert-danger': error, 'alert-success': !error }"
      role="alert"
    >
      {{ feedback }}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  </div>
  <h2 class="my-5 text-center">Carrinho de Compras</h2>
  <div class="geral">
    <div class="cart">
      <CartItem
        v-for="jogo in jogos"
        :Nome="jogo.Nome"
        :Preco="jogo.Preco"
        :Capa="jogo.Capa"
        :id="jogo.id"
        @remove="remove"
      />
    </div>
    <div class="cart-review">
      <h5>Resumo</h5>
      <p>
        Total estimado: <span style="font-weight: bold; color: green">R${{ precoFormatado }}</span>
      </p>
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
