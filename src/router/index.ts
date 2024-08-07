import PartyView from '@/party/infrastructure/primary/views/PartyView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/parties',
      name: 'party',
      component: PartyView
    }
  ]
})

export default router
