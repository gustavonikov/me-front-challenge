import OrderDetailsPage from '@/pages/OrderDetailsPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/orders/1',
    },
    {
      path: '/orders/:id',
      component: OrderDetailsPage,
      name: 'order-details'
    }
  ],
})

export default router
