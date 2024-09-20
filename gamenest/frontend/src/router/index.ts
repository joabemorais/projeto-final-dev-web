import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

import PublicHome from '@/pages/PublicHome.vue'
import LoginPage from '@/pages/LoginPage.vue'
import GamePage from '@/pages/GameInDetails.vue'
import Cart from '@/pages/Cart.vue'
import GamesAdmin from '@/pages/Admin/GamesAdmin.vue'
<<<<<<< HEAD
import GameForm from '@/pages/Admin/GameForm.vue'
=======
import RegisterPage from '@/pages/RegisterPage.vue'
>>>>>>> 9395747e58c0a6f8ac2a6e365d96d7ad1b638cda

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PublicHome
    },
    {
      path: '/login',
      name: 'loginPage',
      component: LoginPage
    },

    {
      path: '/register',
      name: 'registerPage',
      component: RegisterPage
    },
    {
      path: '/admin',
      name: 'adminGamesPage',
      component: GamesAdmin,
      meta: {
        requiresAuth: true
      }
    },

    {
      path: '/games/create',
      name: 'createGamePage',
      component: GameForm,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/games/edit/:id',
      name: 'editGamePage',
      component: GameForm,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/games/:id',
      name: 'gamePage',
      component: GamePage,
    },

    {
      path: '/cart',
      name: 'cartPage',
      component: Cart,
      meta: {
        requiresAuth: true
      }
    },
  ]
})

export default router

router.beforeEach((to, from) => {
  const userStore = useUserStore()
  if(to.meta.requiresAuth && !userStore.isAuthenticated) {
    return '/login'
  }
})