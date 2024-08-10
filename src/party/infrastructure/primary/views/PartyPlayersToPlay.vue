<template>
  <div class="party-players-to-play" v-if="party">`
    <div class="party-board">
      <h1>Party #{{ partyId }}</h1>
      <h3>Round #1</h3>
      <BoardCard :board="party.getBoard()" />
    </div>
    <PlayersList :players="party.getPlayers()"/>
  </div>
</template>

<script lang="ts" setup>
import { inject, ref } from 'vue'
import { useRoute } from 'vue-router'
import type { Party } from '@/party/domain/Party'
import { PartiesApplicationService } from '@/party/application/PartiesApplicationService'
import BoardCard from '@/party/infrastructure/primary/components/BoardCard.vue'
import PlayersList from '@/party/infrastructure/primary/components/PlayersList.vue'

const partyId = ref<string | null>(null)
const party = ref<Party>()

const partyHandler = inject('partyApplicationService') as PartiesApplicationService

const route = useRoute()

const fetchParty = () => {
  partyId.value = (route.params.id as string | undefined) ?? null
  party.value = partyHandler.getParties()[0]
}

fetchParty()

</script>

<style scoped>
.party-players-to-play {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
