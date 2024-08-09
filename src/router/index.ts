import PartyView from '@/party/infrastructure/primary/views/PartyView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import PartyPlayersToPlay from '@/party/infrastructure/primary/views/PartyPlayersToPlay.vue'

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
      component: PartyPlayersToPlay
    }
  ]
})

export default router
