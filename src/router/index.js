import OrderDetailsPage from '@/pages/OrderDetailsPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/orders-details/1',
    },
    {
      path: '/orders-details/:id',
      component: OrderDetailsPage,
      name: 'order-details'
    }
  ],
})

export default router
