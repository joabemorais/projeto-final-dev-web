<script setup lang="ts">
import { ref } from 'vue'
import { isAxiosError } from 'axios'
import { api } from '@/api'
import { useUpload } from '@/composables/useUpload'
import { useUserStore } from '@/stores/userStore'
import type { ApplicationError, Game } from '@/types'
import { isApplicationError } from '@/composables/useApplicationError'
import { RouterLink, useRoute } from 'vue-router'

const id = ref(0)
const nome = ref('')
const capa = ref<File>()
const capaURL = ref('')
const descricao = ref('')
const desenvovedora = ref('')
const preco = ref<number>()

const userStore = useUserStore()

const loading = ref(false)
const feedback = ref('')
const error = ref<ApplicationError>()

const route = useRoute()

async function getGame() {
  try {
    const { data } = await api.get(`/games/${route.params.id}`, {
      params: {
        populate: 'cover'
      }
    })
    const game = data.data as Game
    id.value = Number(route.params.id)
    nome.value = game.Nome
    preco.value = game.Preco
    descricao.value = game.Descricao
    desenvovedora.value = game.Desenvolvedora
    capaURL.value = game.Capa.url
  } catch (e) {
    if (isAxiosError(e) && isApplicationError(e.response?.data)) {
      error.value = e.response?.data
    }
  } finally {
    loading.value = false
  }
}

function handleUpload(event: Event) {
  const inputEvent = event as InputEvent
  const target = inputEvent.target as HTMLInputElement
  capa.value = target.files?.item(0) as File
}

async function createGame() {
  try {
    loading.value = true
    const formData = new FormData()
    formData.append('files.cover', capa.value as File)
    formData.append(
      'data',
      JSON.stringify({
        Nome: nome.value,
        Preco: preco.value,
        Descricao: descricao.value,
        Desenvovedora: desenvovedora.value
      })
    )

    const { data } = await api.post('/games', formData, {
      headers: {
        Authorization: `Bearer ${userStore.jwt}`
      }
    })

    console.log(data.data)
    feedback.value = 'Jogo criado com sucesso.'
  } catch (e) {
    if (isAxiosError(e) && isApplicationError(e.response?.data)) {
      error.value = e.response?.data
      feedback.value = error.value.error.message
    }
  } finally {
    loading.value = false
  }
}

async function updateGame() {
  try {
    loading.value = true

    if (capa.value) {
      const formData = new FormData()
      formData.append('files.cover', capa.value as File)
      formData.append(
        'data',
        JSON.stringify({
          Nome: nome.value,
          Preco: preco.value,
          Descricao: descricao.value,
          Desenvovedora: desenvovedora.value
        })
      )

      const { data } = await api.put(`/games/${id.value}`, formData, {
        headers: {
          Authorization: `Bearer ${userStore.jwt}`
        }
      })

      console.log(data.data)
      feedback.value = 'Jogo atualizado com sucesso.'
    } else {
      const { data } = await api.put(
        `/games/${id.value}`,
        {
          data: {
            Nome: nome.value,
            Preco: preco.value,
            Descricao: descricao.value,
            Desenvovedora: desenvovedora.value
          }
        },
        {
          headers: {
            Authorization: `Bearer ${userStore.jwt}`
          }
        }
      )
      await getGame()
      feedback.value = `Jogo ${data.data.title} atualizado com sucesso.`
    }
  } catch (e) {
    if (isAxiosError(e) && isApplicationError(e.response?.data)) {
      error.value = e.response?.data
      feedback.value = error.value.error.message
    }
  } finally {
    loading.value = false
  }
}

if (route.params.id) {
  getGame()
}
</script>

<template>
  <div v-if="loading" class="text-center">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <div
    v-if="feedback"
    class="col-12 alert alert-dismissible fade show"
    :class="{ 'alert-danger': error, 'alert-success': !error }"
    role="alert"
  >
    {{ feedback }}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
  <form @submit.prevent="handleUpload">
    <img class="col-auto" v-if="capaURL" :src="useUpload()(capaURL)" />
    <div class="row text-start">
      <div class="col-12 mb-3">
        <label for="coverInput" class="form-label">Game cover</label>
        <input
          @change="handleUpload"
          type="file"
          id="coverInput"
          accept="image/*"
          class="form-control"
        />
      </div>
      <div class="col-12 mb-3">
        <label for="titleInput" class="form-label">Game name</label>
        <input
          v-model="nome"
          type="text"
          id="titleInput"
          class="form-control"
          placeholder="an awesome title"
        />
      </div>
      <div class="col-3 mb-3">
        <label for="numberInput" class="form-label">Game price</label>
        <input
          v-model="preco"
          type="number"
          id="numberInput"
          class="form-control"
          placeholder="00.00"
        />
      </div>
      <div class="col-2 mb-3">
        <label for="priceInput" class="form-label">Game description</label>
        <input
          v-model="descricao"
          type="text"
          id="priceInput"
          class="form-control"
          placeholder="descrição"
        />
      </div>
      <div class="col-2 mb-3">
        <label for="priceInput" class="form-label">Game developer</label>
        <input
          v-model="desenvovedora"
          type="text"
          id="priceInput"
          class="form-control"
          placeholder="desenvolvedora"
        />
      </div>
    </div>
    <RouterLink to="/admin" class="btn btn-danger">Cancel</RouterLink>
    <input v-if="id" type="submit" class="btn btn-primary" value="Edit" />
    <input v-else type="submit" class="btn btn-success" value="Create" />
  </form>
</template>
