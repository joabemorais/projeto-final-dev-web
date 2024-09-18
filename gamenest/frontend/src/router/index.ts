import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

import PublicHome from '@/pages/PublicHome.vue'
import LoginPage from '@/pages/LoginPage.vue'
import GamePage from '@/pages/GameInDetails.vue'
import Cart from '@/components/Cart.vue'
import GamesAdmin from '@/pages/Admin/GamesAdmin.vue'

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
      path: '/admin',
      name: 'adminGamesPage',
      component: GamesAdmin,
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
  console.log(userStore.isAuthenticated)
  if(to.meta.requiresAuth && !userStore.isAuthenticated) {
    return '/login'
  }
})