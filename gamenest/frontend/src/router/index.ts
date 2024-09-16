import { createRouter, createWebHistory } from 'vue-router'
import PublicHome from '../views/PublicHome.vue'
import Login from '@/components/Login.vue'
import GamePage from '@/components/GamePage.vue'

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
      name: 'login',
      component: Login
    },
    {
      path: '/games/:id',
      name: 'gamePage',
      component: GamePage
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
