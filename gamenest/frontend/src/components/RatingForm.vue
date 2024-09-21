<script setup lang="ts">
import { ref } from 'vue'
import { isAxiosError } from 'axios'
import { api } from '@/api'
import type { ApplicationError, Avaliacao } from '@/types'
import { isApplicationError } from '@/composables/useApplicationError'
import { useUserStore } from '@/stores/userStore'

const props = defineProps<{
  gameId: number
  userId: number
}>()

const corpo = ref('')
const feedback = ref<boolean | null>(null)
const error = ref<ApplicationError | null>(null)
const loading = ref(false)
const rating = ref<Avaliacao | null>(null)
const userStore = useUserStore()

function setFeedback(value: boolean) {
  feedback.value = feedback.value === value ? null : value
}

async function submitRating() {
  try {
    loading.value = true

    const newRating = {
      data: {
        Corpo: corpo.value,
        Feedback: feedback.value,
        usuario: {
          id: props.userId
        },
        jogo: {
          id: props.gameId
        }
      }
    }

    console.log(userStore.jwt)

    const { data } = await api.post('/avaliacaos', newRating, {
      headers: {
        Authorization: `Bearer ${userStore.jwt}`
      }
    })

    corpo.value = ''
    feedback.value = null
    rating.value = data.data
  } catch (e) {
    if (isAxiosError(e) && isApplicationError(e.response?.data)) {
      error.value = e.response?.data
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form @submit.prevent="submitRating">
    <div class="mb-3 col-7">
      <label for="corpoInput" class="form-label">Escreva a sua avaliação</label>
      <textarea v-model="corpo" id="corpoInput" class="form-control" required> </textarea>
    </div>
    <div class="mb-3">
      <label class="form-label">Gostou do jogo?</label>
      <div class="d-flex justify-content-between col-7">
        <div>
          <button
            type="button"
            class="btn me-2"
            :class="feedback === true ? 'btn-success selected' : 'btn-outline-success'"
            @click="setFeedback(true)"
            :disabled="loading"
          >
            Sim
            <i class="bi bi-hand-thumbs-up fs-5"></i>
            <i class="bi bi-hand-thumbs-up-fill fs-5"></i>
          </button>
          <button
            type="button"
            class="btn"
            :class="feedback === false ? 'btn-danger selected' : 'btn-outline-danger'"
            @click="setFeedback(false)"
            :disabled="loading"
          >
            Não
            <i class="bi bi-hand-thumbs-down fs-5"></i>
            <i class="bi bi-hand-thumbs-down-fill fs-5"></i>
          </button>
        </div>
        <button type="submit" class="btn btn-primary" :disabled="loading || feedback === null">
          <span
            v-if="loading"
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          Publicar
          <i class="bi bi-send fs-5"></i>
          <i class="bi bi-send-fill fs-5"></i>
        </button>
      </div>
    </div>
  </form>
  <div v-if="error" class="alert alert-danger mt-3" role="alert">
    {{ error.error.message }}
  </div>
  <div v-if="rating" class="alert alert-success mt-3" role="alert">Avaliação publicada!</div>
</template>

<style scoped>
.btn-success:hover .bi-hand-thumbs-up,
.btn-outline-success:hover .bi-hand-thumbs-up,
.btn-success.selected .bi-hand-thumbs-up {
  display: none;
}

.btn-success:hover .bi-hand-thumbs-up-fill,
.btn-outline-success:hover .bi-hand-thumbs-up-fill,
.btn-success.selected .bi-hand-thumbs-up-fill {
  display: inline;
}

.btn-danger:hover .bi-hand-thumbs-down,
.btn-outline-danger:hover .bi-hand-thumbs-down,
.btn-danger.selected .bi-hand-thumbs-down {
  display: none;
}

.btn-danger:hover .bi-hand-thumbs-down-fill,
.btn-outline-danger:hover .bi-hand-thumbs-down-fill,
.btn-danger.selected .bi-hand-thumbs-down-fill {
  display: inline;
}

.btn-primary:hover .bi-send {
  display: none;
}

.btn-primary:hover .bi-send-fill {
  display: inline;
}

.bi-hand-thumbs-up-fill,
.bi-hand-thumbs-down-fill,
.bi-send-fill {
  display: none;
}
</style>
