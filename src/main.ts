import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { RestPartiesRepository } from '@/party/infrastructure/secondary/RestPartiesRepository'
import { PartiesApplicationService } from '@/party/application/PartiesApplicationService'
import { RestPartyEventsRepository } from '@/party/infrastructure/secondary/RestPartyEventsRepository'

const app = createApp(App)

app.use(router)

const partyApplicationService = new PartiesApplicationService(
  new RestPartiesRepository(),
  new RestPartyEventsRepository()
)
app.provide('partyApplicationService', partyApplicationService)

app.mount('#app')
