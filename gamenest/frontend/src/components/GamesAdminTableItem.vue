<script setup lang="ts">
import { BASE_URL } from '@/api'
import { defineProps, computed } from 'vue'

const props = defineProps<{
  Nome: string
  Preco: number
  Capa: { url: string }
  id: string | number
}>()

const precoFormatado = computed(() => props.Preco.toFixed(2))

const emit = defineEmits(['delete'])

function deleteGame() {
    emit('delete', props.id)
}
</script>

<template>
    <tr>
        <th scope="row">{{ id }}</th>
        <td><img :src="`${BASE_URL}${Capa.url}`" :alt="`capa do jogo ${Nome}`"/></td>
        <td>{{ Nome }}</td>
        <td><span style="font-weight: bold; color: green;">R${{ precoFormatado }}</span></td>
        <td>
            <i class="bi bi-pencil-square edit"></i>
            <i class="bi bi-trash3 px-1 delete" @click="deleteGame"></i>
        </td>
    </tr>
</template>

<style scoped>

img {
    width: 50px;
    border-radius: 5px;
}
.edit {
    color: #007bff;
    cursor: pointer;
}
.delete {
    color: #dc3545;
    cursor: pointer;
}
</style>