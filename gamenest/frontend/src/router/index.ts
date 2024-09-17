import { createRouter, createWebHistory } from 'vue-router'
import PublicHome from '@/pages/PublicHome.vue'
import LoginPage from '@/pages/LoginPage.vue'
import GamePage from '@/pages/GameInDetails.vue'
import Cart from '@/components/Cart.vue'
import GamesAdmin from '@/pages/GamesAdmin.vue'

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
      path: '/admin/games',
      name: 'adminGamesPage',
      component: GamesAdmin
    },
    {
      path: '/games/:id',
      name: 'gamePage',
      component: GamePage
    },
    {
      path: '/cart',
      name: 'cartPage',
      component: Cart
    },
  ]
})

export default router
