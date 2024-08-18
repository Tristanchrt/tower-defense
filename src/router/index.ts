import PartyView from '@/party/infrastructure/primary/views/PartyView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import PartyPlayingView from '@/party/infrastructure/primary/views/PartyPlayingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/parties',
      name: 'parties',
      component: PartyView
    },
    {
      path: '/parties/:id',
      name: 'party',
      component: PartyPlayingView
    }
  ]
})

export default router
