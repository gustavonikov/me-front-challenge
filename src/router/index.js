import OrderDetailsPage from '@/pages/OrderDetailsPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: OrderDetailsPage
    }
  ],
})

export default router
