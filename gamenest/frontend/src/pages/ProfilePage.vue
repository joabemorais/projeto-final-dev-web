<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { api } from '@/api'
import type { User } from '@/types'

const userStore = useUserStore()
const user = ref<User | null>(null)
const error = ref<string | null>(null)

const fetchUserProfile = async () => {
  try {
    const response = await api.get('/users/me', {
      headers: {
        Authorization: `Bearer ${userStore.jwt}`
      }
    })
    user.value = response.data
  } catch (err) {
    error.value = 'Failed to fetch user profile.'
  }
}

const updateUserProfile = async () => {
  try {
    const response = await api.put('/users/me', user.value, {
      headers: {
        Authorization: `Bearer ${userStore.jwt}`
      }
    })
    user.value = response.data
    error.value = 'Profile updated successfully.'
  } catch (err) {
    error.value = 'Failed to update profile.'
  }
}

onMounted(() => {
  fetchUserProfile()
})
</script>

<template>
  <div class="profile-page container">
    <h1>Profile Page</h1>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <div v-if="user" class="profile-info">
      <!-- <img :src="user.profilePicture" alt="Profile Picture" class="profile-picture" /> -->
      <p><strong>Username:</strong> {{ user.username }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <form @submit.prevent="updateUserProfile">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="user.username" class="form-control" />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="user.email" class="form-control" />
        </div>
        <!-- <div class="form-group">
          <label for="profilePicture">Profile Picture URL</label>
          <input type="text" id="profilePicture" v-model="user.profilePicture" class="form-control" />
        </div> -->
        <button type="submit" class="btn btn-primary">Update Profile</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.profile-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.profile-info {
  text-align: center;
}

.profile-picture {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.alert {
  margin-bottom: 20px;
}
</style>